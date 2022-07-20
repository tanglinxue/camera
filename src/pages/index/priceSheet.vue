<template>
	<view class="main column-center">
		<view class="boxInner box column-center mgb50">
			<view class="top-title"  v-if="type != 3">活动主题：{{ detail.case_name }}</view>
			<view class="row-between top-title" v-if="type == 1">
				<view>合作方：{{ detail.case_host }}</view>
				<view>联系人：{{ detail.contact_name }}</view>
			</view>
			<view class="top-title borderbottom mgb20">项目收费：</view>
			<view v-for="(item, index) in allPro" :key="index" style="width:100%">
				<template v-if="item.list.length">
					<view class="title">{{ item.name }}</view>
					<view class="row row-between" v-for="(bitem, index) in item.list" :key="bitem.id">
						<view class="left-txt">{{ bitem.beforeName || bitem.name }}</view>
						<view class="right-txt" v-if="!bitem.noNum || !bitem.noDays">
							￥{{ bitem.unit_price }}
							<template v-if="!bitem.noNum">
								*{{ bitem.num }}{{ bitem.unit }}
							</template>
							<template v-if="!bitem.noDays">
								*{{ bitem.days }}天
							</template>
							={{ bitem.price }}元
						</view>
						<view v-else>{{ bitem.price }}元</view>
					</view>
					<view class="price borderbottom red">小计：￥{{ item.price }}</view>
				</template>
			</view>
			<template v-if='type!=3'>
				<view class="total-price black weight">总计：￥{{ total_money }}</view>
				<view class="total-price red weight">结算价：￥{{ detail.real_money }}</view>
				<view class="total-price gray">{{ detail.case_memo }}</view>
				<view class="total-price gray">{{ detail.company_name }}</view>
			</template>
			<view class="total-price red weight" v-else>总计：￥{{ total_money }}</view>
			
		</view>
		<view class="row-center btn-box" v-if='!share'>
			<view class="middle-btn" v-if="type !=3" @click='savePic'>生成图片</view>
			<view class="middle-btn mgl30"  @click="nextStep">{{type==3?"使用模板":"编辑"}}</view>
			<view class="middle-btn mgl30" v-if="type == 1" @click="jump">预定</view>
		</view>
	</view>
</template>
<script>
//finisth
import { mapMutations, mapGetters,mapState } from 'vuex';
export default {
	data() {
		return {
			type: 1,//1为报价单，2为费用清单，3为报价模板
			price_id: '',
			detail: {
				case_name: '', //活动主题
				case_host: '', //主办方
				contact_name: '', //主办方联系人
				real_money: '', //项目结算总价
				case_memo: '', //项目报价备注
				company_name: '', //报价方/报价日期字串
				total_money: ''
			}
		};
	},
	onLoad(options) {
		if (options.type) {
			this.type = options.type;
			if(this.type == 2){
				uni.setNavigationBarTitle({
					title: '费用清单'
				});
			}else if(this.type == 3){
				uni.setNavigationBarTitle({
					title: '报价模板'
				});
			}
			
		}
		this.price_id = options.id;
		this.$methods.showLoading();
		this.getData();
	},
	computed: {
		...mapGetters('service', ['allPro','total_money']),
		...mapState('user',['share'])
	},
	methods: {
		...mapMutations('service', ['updateServiceInfo', 'updateDynamicInfo', 'updateServiceData']),
		jump() {
			const detail = JSON.stringify(this.detail);
			console.log(detail)
			this.$jump(`/pages/order/creatOrder?detail=${detail}&id=${this.price_id}`);
		},
		async getData() {
			const type = this.type
			if(type==3){
				let {item_info} = await this.$API.home.getTemplateById({template_id:this.price_id});
				let {case_item,dynamic_item,kclz_xxxslk, sp_sszm, sp_tcjr, spzz_djs, work_day, zp_cyzt} =item_info
				case_item = JSON.parse(case_item);
				dynamic_item = JSON.parse(dynamic_item);
				this.updateServiceInfo(case_item);
				this.updateDynamicInfo(dynamic_item);
				this.updateServiceData({ kclz_xxxslk, sp_sszm, sp_tcjr, spzz_djs, work_day, zp_cyzt });
			}else{
				let {
					case_name,
					case_host,
					contact_name,
					real_money,
					case_memo,
					company_name,
					total_money,
					case_item,
					dynamic_item,
					kclz_xxxslk,
					sp_sszm,
					sp_tcjr,
					spzz_djs,
					work_day,
					zp_cyzt
				} = await this.$API.home.getPriceById({ price_id: this.price_id });	
				this.detail = {
					case_name,
					case_host,
					contact_name,
					real_money,
					case_memo,
					company_name,
					total_money
				};
				case_item = JSON.parse(case_item);
				dynamic_item = JSON.parse(dynamic_item);
				this.updateServiceInfo(case_item);
				this.updateDynamicInfo(dynamic_item);
				this.updateServiceData({ kclz_xxxslk, sp_sszm, sp_tcjr, spzz_djs, work_day, zp_cyzt });
			}		
			uni.hideLoading();
		},
		nextStep() {
			if(this.type==3){
				this.$jump(`/pages/index/editOfferPrice`);
			}else{
				const detail = JSON.stringify(this.detail);
				this.$jump(`/pages/index/editOfferPrice?detail=${detail}&price_id=${this.price_id}`);
			}
			
		},
		async savePic(){
			let that = this;
			this.$methods.showLoading('画图中...');
			const url = await this.$API.home.savePic({ price_id: this.price_id });	
			uni.hideLoading()
			uni.previewImage({
			  urls:[url]
			});
			// wx.downloadFile({
			// 	url,
			// 	success(res) {
			// 		that.$methods.showToast('生成图片成功');
					
			// 	},
			// 	fail(err) {
			// 		console.log(err);
			// 	}
			// });
	
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/static/scss/index.scss';
.main {
	padding-bottom: 100rpx;
}
.box {
	padding: 30rpx;
	font-size: 28rpx;
	.top-title {
		width: 100%;
		padding-bottom: 30rpx;
		font-size: 32rpx;
	}
	.title {
		width: 100%;
		padding: 10rpx 0;
		text-align: left;
	}
	.row {
		width: 100%;
		padding: 10rpx 0;
		color: $gray;
		font-size: 26rpx;
	}
	.price {
		width: 100%;
		padding: 10rpx 0;
		text-align: right;
		padding-bottom: 30rpx;
		margin-bottom: 20rpx;
	}
	.total-price {
		width: 100%;
		padding: 10rpx 0;
		text-align: right;
		font-size: 28rpx;
	}
}
.btn-box {
	width: 100%;
	padding: 0 30rpx;
	.middle-btn {
		width: 200rpx;
	}
}
</style>

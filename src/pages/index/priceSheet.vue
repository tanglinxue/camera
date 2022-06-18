<template>
	<view class="main column-center">
		<view class="boxInner box column-center mgb50">
			<view class="top-title">活动主题：{{ detail.case_name }}</view>
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
							￥{{ bitem.unit_price }}*
              <template v-if="!bitem.noNum">
                {{ bitem.num }}{{ bitem.unit }}
              </template>
							<template v-if="!bitem.noDays">
								*{{ bitem.days }}天
							</template>
							={{ bitem.price }}元
						</view>
            <view v-else>
              {{ bitem.price }}元
            </view>
					</view>
					<view class="price borderbottom red">小计：￥{{ item.price }}</view>
				</template>
			</view>
			<!-- <view class="row row-between borderbottom pdb30 mgb20">
				<view class="left-txt font30 black">其他自定义临时项目</view>
				<view class="right-txt red weight">￥2000</view>
			</view> -->
			<view class="total-price black weight">总计：￥{{ detail.total_money }}</view>
			<view class="total-price red weight">结算价：￥{{ detail.real_money }}</view>
			<view class="total-price gray">{{ detail.case_memo }}</view>
			<view class="total-price gray">{{ detail.company_name }}</view>
		</view>
		<view class="row-center btn-box">
			<view class="middle-btn">生成图片</view>
			<view class="middle-btn mgl30" v-if="type == 1" @click="nextStep">编辑</view>
			<view class="middle-btn mgl30" @click="jump">预定</view>
		</view>
	</view>
</template>
<script>
//finisth
import { mapMutations, mapGetters } from 'vuex';
export default {
	data() {
		return {
			type: 1,
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
		if (options.type && options.type == 2) {
			this.type = options.type;
			uni.setNavigationBarTitle({
				title: '费用清单'
			});
		}
		this.price_id = options.id;
		this.$methods.showLoading();
		this.getData();
	},
	computed: {
		...mapGetters('service', ['allPro'])
	},
	methods: {
		...mapMutations('service', ['updateServiceInfo', 'updateDynamicInfo', 'updateServiceData']),
		jump() {
			this.$jump(`/pages/order/creatOrder`);
		},
		async getData() {
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
			uni.hideLoading();
		},
		nextStep() {
			const detail = JSON.stringify(this.detail);
			this.$jump(`/pages/index/editOfferPrice?detail=${detail}&price_id=${this.price_id}`);
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

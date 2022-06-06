<template>
	<view class="main column-center">
		<view class="boxInner box column-center mgb50">
			<view class='top-title row-start'>
				<view class='label'>活动主题：</view>
				<view class="input-box row-center"><input type="text" placeholder="活动主题" class="input" v-model="query.case_name"/></view>
			</view>
			<view class="row-between top-title">
				<view class='row-start'>
					<view class='label'>合作方：</view>
					<view class="input-box row-center width200"><input type="text" placeholder="合作方" class="input" v-model="query.case_host"/></view>
				</view>
				<view class='row-start mgl20'>
					<view class='label'>联系人：</view>
					<view class="input-box row-center width160"><input type="text" placeholder="联系人" class="input" v-model="query.contact_name"/></view>
				</view>
			</view>
			<view class='top-title borderbottom mgb20 row-start'><view class='label'>项目收费：</view><view class="small-btn">增减项目</view></view>
			<view class="title">照片</view>
			<view class="row row-between">
				<view class="left-txt">照片直播：</view>
				<view class="right-txt">￥1500*1个*1天=2000元</view>
			</view>
			<view class="row row-between">
				<view class="left-txt">传统摄影：</view>
				<view class="right-txt">￥1500*1个*1天=2000元</view>
			</view>
			<view class="price borderbottom red">小计：￥1500</view>
		<!-- 	<view class="title">站架合影</view>
			<view class="row row-between">
				<view class="left-txt">人数：</view>
				<view class="right-txt">￥1500*1个*1天=2000元</view>
			</view>
			<view class="row row-between">
				<view class="left-txt">冲印：</view>
				<view class="right-txt">￥1500*1个*1天=2000元</view>
			</view>
			<view class="price red borderbottom">小计：￥1500</view> -->
			<view class='top-title borderbottom mgb20 row-start'>
				<view class='label'>其他项目：</view><view class="small-btn">增加项目</view>
			</view>
			<view class='total-price black weight'>总计：￥{{total_money}}</view>
			<view class='total-price  weight row-end'><text class='red'>结算价</text>：
				<view class="input-box row-center width160"><input type="number" class="input" v-model="query.real_money"/></view>
			</view>
		<view class="mgb30 row">
			<view class='left-text mgb20'>备注说明：</view>
			<uni-easyinput type="textarea" placeholder="请填写" class="textarea" :clearable="false" maxlength="200" v-model="query.case_memo"/>
		</view>
		<view class=" row">
			<view class='left-text mgb20'>报价方\报价日期：</view>
			<uni-easyinput type="textarea" placeholder="请填写" class="textarea" :clearable="false" maxlength="200" v-model="query.company_name"/>
		</view>
		</view>
		<view class="row-center btn-box">
			<view class="main-btn" @click='submit'>保存</view>
		</view>
	</view>
</template>

<script>
	import { mapState,mapGetters } from 'vuex';
	export default {
		data(){
			return {
				query:{
					case_name:'',//活动主题
					case_host:'',//主办方
					contact_name:'',//主办方联系人
					real_money:'',//项目结算总价
					case_memo:'',//项目报价备注
					company_name:''//报价方/报价日期字串
				}
			}
		},
		computed:{
			...mapState('service', ['serviceInfo','dynamicInfo','serviceData']),
			...mapGetters('service', ['total_money']),
		},
		methods:{
			async submit(){
				const {query,serviceData,serviceInfo,dynamicInfo} = this;
				this.$methods.showLoading('发布中...');
				const {price_id} = await this.$API.home.publish_price({
					...query,
					...serviceData,
					case_item:JSON.stringify(serviceInfo),
					dynamic_item:JSON.stringify(dynamicInfo),
					total_money:this.total_money
				});
				this.$methods.showToast('发布成功');
			}
		}
	}
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
			font-size: 28rpx;
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

	.input-box {
		font-size: 28rpx;
		padding: 10rpx 30rpx;
		border: 1px solid $border;
		border-radius: 12rpx;
		height: 70rpx;
		flex: 1;

		.input {
			flex: 1;
		}
	}

	.label {
		width: 140rpx;
	}

	.btn-box {
		width: 100%;
		padding: 0 30rpx;

		.middle-btn {
			width: 200rpx;
		}
	}
	.row{
		width:100%;
	}
	.width160{
		width:160rpx;
		flex:none
	}
	.textarea{
		flex:1;
	}
</style>

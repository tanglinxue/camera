<template>
	<view class="main column-center">
		<view class="boxInner box column-center mgb50">
			<view class="main-title mgb20 borderbottom font32">{{title}}</view>
			<view class="title">照片</view>
			<view class="row row-between">
				<view class="left-txt">照片直播：</view>
				<view class="right-txt">￥1500*1个*1天=2000元</view>
			</view>
			<view class="row row-between">
				<view class="left-txt">传统摄影：</view>
				<view class="right-txt">￥1500*1个*1天=2000元</view>
			</view>
			<view class='price borderbottom red'>小计：￥1500</view>
			<view class="title">站架合影</view>
			<view class="row row-between">
				<view class="left-txt">人数：</view>
				<view class="right-txt">￥1500*1个*1天=2000元</view>
			</view>
			<view class="row row-between">
				<view class="left-txt">冲印：</view>
				<view class="right-txt">￥1500*1个*1天=2000元</view>
			</view>
			<view class='price red'>小计：￥1500</view>
			<view class='total-price red'>总计：￥{{total_money}}</view>
		</view>
		<view class="middle-btn">使用模板</view>
	</view>
</template>

<script>
// ok
export default {
	data() {
		return {
			template_id:'',
			title:'',
			total_money:''
		};
	},
	onLoad(options) {
		this.template_id = options.id;
		this.$methods.showLoading();
		this.getData();
	},
	methods: {
		async getData() {
			const {template_name,total_money} = await this.$API.home.getTemplateById({template_id:this.template_id});
			this.title = template_name
			this.total_money = total_money
			uni.hideLoading();
		},
	}
};
</script>

<style lang="scss" scoped>
@import '@/static/scss/index.scss';
.box{
	padding:30rpx;
	font-size: 28rpx;
	.main-title{
		width:100%;
		padding-bottom: 30rpx;
		text-align: center;
	}
	.title{
		width:100%;
		padding:10rpx 0;
		text-align: left;
	}
	.row{
		width:100%;
		padding:10rpx 0;
		color:$gray;
		font-size: 26rpx;
	}
	.price{
		width:100%;
		padding:10rpx 0;
		text-align: right;
		padding-bottom:30rpx;
		margin-bottom: 20rpx;
	}
	.total-price{
		width:100%;
		padding:10rpx 0;
		text-align: right;
		font-weight: bold;
		font-size: 36rpx;
	}
}
</style>

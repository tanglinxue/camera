<template>
	<view class="main column-center">
		<view class="boxInner box column-center mgb50">
			<view class='top-title'>活动主题：绿城新品发布会</view>
			<view class="row-between top-title">
				<view>合作方：经度文化</view>
				<view>联系人：余强</view>
			</view>
			<view class='top-title borderbottom mgb20'>活动主题：绿城新品发布会</view>
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
			<view class="title">站架合影</view>
			<view class="row row-between">
				<view class="left-txt">人数：</view>
				<view class="right-txt">￥1500*1个*1天=2000元</view>
			</view>
			<view class="row row-between">
				<view class="left-txt">冲印：</view>
				<view class="right-txt">￥1500*1个*1天=2000元</view>
			</view>
			<view class="price red borderbottom">小计：￥1500</view>
			<view class="row row-between borderbottom pdb30 mgb20">
				<view class="left-txt font30 black">其他自定义临时项目</view>
				<view class="right-txt red weight">￥2000</view>
			</view>
			<view class='total-price black weight'>总计：￥1500</view>
			<view class='total-price red weight'>结算价：￥1500</view>
			<view class='total-price gray'>浙江小米影视传媒有限公司</view>
			<view class='total-price gray'>报价日期   2022-4-7</view>
		</view>
		<view class="row-between btn-box">
			<view class="middle-btn">生成图片</view>
			<view class="middle-btn">编辑</view>
			<view class="middle-btn">预定</view>
		</view>
	</view>
</template>

<script></script>

<style lang="scss" scoped>
@import '@/static/scss/index.scss';
.main{
	padding-bottom: 100rpx;
}
.box {
	padding: 30rpx;
	font-size: 28rpx;
	.top-title{
		width:100%;
		padding-bottom: 30rpx;
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
		font-size: 32rpx;
	}
}
.btn-box{
	width:100%;
	padding:0 30rpx;
	.middle-btn {
		width: 200rpx;
	}
}

</style>

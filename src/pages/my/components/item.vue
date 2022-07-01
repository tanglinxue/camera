<template>
	<view class="boxOuter">
		<view class='txt borderbottom'>活动名称：<text>{{info.case_name}}</text></view>
		<view class='txt'>主办方：<text>{{info.case_host}}</text></view>
		<view class='txt'>金额：<text>{{info.real_money}}元</text></view>
		<view class='txt'>联系人：<text>{{info.contact_name}}</text></view>
		<view class='txt'>报价时间：<text>{{info.price_date}}</text></view>
	</view>
</template>

<script>
// finish
export default {
	props: {
		info: {
			type: Object,
			default: () => {}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/static/scss/index.scss';
.boxOuter {
	font-size: 26rpx;
	padding:15rpx 20rpx;
	
	.txt{
		padding:5rpx 0;
		&:first-child{
			padding-bottom:15rpx;
		}
		text{
			color:$gray
		}
	}
	
}
</style>

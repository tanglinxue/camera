<template>
	<view class="boxOuter">
		<view class='txt borderbottom'>活动名称：<text>亚运美食街</text></view>
		<view class='txt'>主办方：<text>四库文化</text></view>
		<view class='txt'>金额：<text>3800元</text></view>
		<view class='txt'>联系人：<text>于国华</text></view>
		<view class='txt'>报价时间：<text>2022-05-08 15:36</text></view>
	</view>
</template>

<script>
// ok
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

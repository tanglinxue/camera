<template>
	<view class="row-between info">
		<view class="row-start left-text">
			<text>游戏(机位数)：</text>
			￥1500/个
		</view>
		<uni-number-box />
	</view>
</template>

<script></script>

<style lang="scss" scoped>
@import '@/static/scss/index.scss';

.info {
	background: $grayS;
	padding: 15rpx 20rpx;
	.left-text {
		font-size: 26rpx;
		color: $gray;
		text {
			font-size: 28rpx;
			font-weight: bold;
			color: $mainBlack;
		}
	}
}
</style>

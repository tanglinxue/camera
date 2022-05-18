<template>
	<view>
		<view class="row-between info">
			<view class="row-start left-text">
				<text>{{info.name}}</text>
				<template v-if='info.placeholder'>{{info.placeholder}}</template>
			</view>
			<uni-number-box v-if='!info.hideBtn'/>
		</view>
		<slot name="footer" ></slot>
	</view>
	
</template>

<script>
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

.info {
	background: $grayS;
	padding: 15rpx 20rpx;
	.left-text {
		font-size: 26rpx;
		color: $gray;
		height:70rpx;
		text {
			font-size: 28rpx;
			font-weight: bold;
			color: $mainBlack;
		}
	}
}
</style>

<template>
	<view class='noData column-center' >
		<image src='/static/images/noData.png' mode='widthFix'></image>
		<view class='text'>{{text}}</view>
	</view>
</template>

<script>
	// finished
	export default {
		props:{
			text:{
				type:String,
				default:'暂无数据'
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '@/static/scss/index.scss';
.noData{
	margin-top: 150rpx;
	image{
		width:500rpx;
	}
	.text{
		color: $gray;
		font-size:28rpx;
		margin-top: -20rpx;
		padding-bottom: 150rpx;
	}
}
</style>

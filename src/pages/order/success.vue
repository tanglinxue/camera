<template>
	<view class="main column-center">
		<view class='column-center top'>
			<view class='txt green mgb10 font36'>提交成功</view>
			<view class='txt green'>感谢合作</view>
		</view>
		<view class='column-center center'>
			<image src='/static/images/logo.png' class='code-img mgb20'></image>
			<view class='txt gray'>客服咨询</view>
		</view>
		<view class='column-center bottom'>
			<view class='gray mgb10 font24'>小米影视</view>
			<view class='gray font24'>专业赋能摄像从业者</view>
		</view>

	</view>
</template>
<script>
	// ok
	export default {
		data() {
			return {

			}
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/static/scss/index.scss';

	.main {
		padding:30rpx;
		.top{
			margin-top:100rpx;
			margin-bottom: 100rpx;
		}
		.center{
			margin-bottom: 200rpx;
			.code-img{
				width:200rpx;
				height:200rpx
			}
		}
	}
</style>

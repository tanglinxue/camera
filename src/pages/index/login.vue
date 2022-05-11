<template>
	<view class="main column-center">
		<view class='column-center boxOuter logo'>
			<image src='/static/images/logo.png' class='logo-img mgb20'></image>
			<view class='txt mgb40'>影助理</view>
			<view class='txt2'>活动会议影像从业者的小助理</view>
		</view>
		<view class="main-btn mgb40">微信授权</view>
		
		<view class='bottom-txt'>使用影助理，需要您授权微信呢称和头像</view>

	</view>
</template>
<script>
	// ok
	export default {
		data() {
			return {
				mobile: '',
				canclick: true,
				captcha: '',
				getText: '获取验证码',
				show: false,
				second: 60,
				interval:null
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/static/scss/index.scss';

	.main {
		padding:30rpx;
		.logo{
			padding:100rpx 0;
			margin-bottom: 100rpx;
			.logo-img{
				width:150rpx;
				height:150rpx;
			}
			.txt{
				font-size:36rpx;
			}
			.txt2{
				font-size:28rpx;
				color:$gray
			}
		}
		.main-btn{
			width:300rpx;
			background: $greenColor;
		}
		.bottom-txt{
			color:$gray;
			font-size:24rpx
		}
	}
</style>

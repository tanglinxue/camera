<template>
	<view class="main column-center">
		<view class='boxOuter'>
			<view class="row borderbottom row-between">
				<text class="tit">公司名称</text>
				<input type="text" placeholder="请输入公司名称" class='input'  />
			</view>
			<view class="row borderbottom row-between">
				<text class="tit">LOGO</text>
				<view class='row-start'><image src='/static/images/logo.png' class='img'></image><uni-icons type="upload" size="26" class="icon"></uni-icons></view>
			</view>
			<view class="row borderbottom row-between">
				<text class="tit">公司solgan</text>
				<input type="text" placeholder="请输入公司solgan" class='input'  />
			</view>
			<view class="row borderbottom row-between">
				<text class="tit">联系电话</text>
				<input type="number" placeholder="请输入手机号" class='input'  v-model="mobile"
					maxlength="11" />
			</view>
			<view class="row borderbottom row-between">
				<text class="tit">微信二维码</text>
				<view class='row-start'><text class='mgr15 gray'>请上传微信二维码</text><uni-icons type="upload" size="26" class="icon"></uni-icons></view>
			</view>
			<view class="row row-between">
				<text class="tit">公众号二维码</text>
				<view class='row-start'><text class='mgr15 gray'>公众号二维码</text><uni-icons type="upload" size="26" class="icon"></uni-icons></view>
			</view>
		
		</view>
		<view class='bottom-btn'><view class='main-btn' @click='back'>提交</view></view>
		

	</view>
</template>
<script>
	// ok
	export default {
		data() {
			return {
				myInfo:{}
			}
		},
		methods:{
			async getData(time = 300) {
				const { userinfo, price_count, reserve_count, settled_count, essay_gzh, essay_kefu } = await await this.$API.my.mypage();
				this.userinfo = userinfo;
				this.price_count = price_count;
				this.reserve_count = reserve_count;
				this.settled_count = settled_count;
				this.essay_gzh = essay_gzh;
				this.essay_kefu = essay_kefu;
				setTimeout(() => {
					uni.hideLoading();
				}, time);
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/scss/index.scss';

	.main {
		background: $backColor;
		font-size: 28rpx;

		padding:30rpx;
		.boxOuter {	
			padding:0;
			overflow: hidden;
			background: #ffffff;
			.row {
				position: relative;
				padding: 30rpx;
				background: #fff;
				font-size: 28rpx;
				.input{
					text-align: right;
				}
				.img{
					width:80rpx;
					height:80rpx;
				}
			}
		}

		.bottom-btn {
			width: 100%;
			position: fixed;
			padding: 20rpx;
			bottom: 0;
			left: 0;
			background-color: $white;
		}
	}
</style>

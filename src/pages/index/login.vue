<template>
	<view class="main column-center">
		<view class="column-center boxOuter logo">
			<image src="/static/images/logo.png" class="logo-img mgb20"></image>
			<view class="txt mgb40">影助理</view>
			<view class="txt2">活动会议影像从业者的小助理</view>
		</view>
		<button @tap="tologin" class="main-btn mgb40" @click="getCode" :disabled="!canclick" open-type="getUserInfo">微信授权</button>
		<view class="bottom-txt">使用影助理，需要您授权微信呢称和头像</view>
	</view>
</template>
<script>
// finish
export default {
	data() {
		return {
			canclick: true,
			code: ''
		};
	},
	methods: {
		async getCode() {
			console.log('拉起允许手机号弹窗');
			this.code = await this.$methods.getCode();
		},
		async tologin() {
			this.canclick = false
			let { iv, encryptedData, errMsg } = await this.$methods.getUserProfile();
			if (errMsg.indexOf('fail') > -1) {
				this.$methods.showToast('登录失败');
				this.canclick = true
				return;
			}
			let params = {
				iv,
				encryptedData
			};
			this.login(params);
		},
		async login(params) {
			this.$methods.showLoading('登录中...');
			try{
				let {session_key,token} = await this.$API.home.minilogin({
					code: this.code
				});
				this.$store.dispatch('user/updateToken',token)
				console.log(session_key)
				params['session_key'] = session_key;
				let {nickName,avatarUrl} = await this.$API.home.get_userinfo(params);
				this.$store.dispatch('user/updateuserInfo',{nickName,avatarUrl})
				this.$methods.showToast('登录成功');
				uni.navigateBack()
			}catch(err){
				console.log(err)
				this.canclick = true
			}
			
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/static/scss/index.scss';
.main {
	padding: 30rpx;
	.logo {
		padding: 100rpx 0;
		margin-bottom: 100rpx;
		.logo-img {
			width: 150rpx;
			height: 150rpx;
		}
		.txt {
			font-size: 36rpx;
		}
		.txt2 {
			font-size: 28rpx;
			color: $gray;
		}
	}
	.main-btn {
		width: 300rpx;
		background: $green;
	}
	.bottom-txt {
		color: $gray;
		font-size: 24rpx;
	}
}
</style>

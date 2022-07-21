<template>
	<view class="main column-center">
		<view class="column-center boxOuter logo">
			<image src="/static/images/logo.png" class="logo-img mgb20"></image>
			<view class="txt mgb40">影助理</view>
			<view class="txt2">活动会议影像从业者的小助理</view>
		</view>
		<button @tap="tologin" class="main-btn mgb40" @click="getCode" :disabled="!canclick" open-type="getUserInfo" v-if="status == 1">微信授权</button>
		<button class="main-btn mgb40" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" v-if="status == 2">获取手机号</button>
		<view class="bottom-txt">{{text}}</view>
	</view>
</template>
<script>
// finish
export default {
	data() {
		return {
			canclick: true,
			code: '',
			openid: '',
			status: 1,
			text:'使用影助理，需要您授权微信呢称和头像'
		};
	},
	methods: {
		async getCode() {
			console.log('拉起允许手机号弹窗');
			this.code = await this.$methods.getCode();
		},
		async tologin() {
			this.canclick = false;
			let { iv, encryptedData, errMsg } = await this.$methods.getUserProfile();
			if (errMsg.indexOf('fail') > -1) {
				this.$methods.showToast('授权失败');
				this.canclick = true;
				return;
			}
			let params = {
				iv,
				encryptedData
			};
			this.login(params);
		},
		getPhoneNumber(e) {
			this.canclick = false;
			let code = e.detail.code;
			let params = {
				code,
				openid:this.openid
			}
			this.toBindPhone(params)
		},
		async toBindPhone(params) {
			this.$methods.showLoading('绑定手机中...');
			try {
				params['token'] = this.token;
				await this.$API.home.check_phonenum(params);
				this.$store.dispatch('user/updateToken', this.token);
				this.$methods.showToast('绑定成功');
				setTimeout(()=>{
					uni.navigateBack({
						delta:1
					})
				},1500)
			} catch (err) {
				console.log(err);
				this.canclick = true;
			}
		},
		async login(params) {
			this.$methods.showLoading('授权中...');
			try {
				let { userinfo, token, session_key,phone_msg } = await this.$API.home.minilogin({
					code: this.code
				});
				let { xcx_openid } = userinfo;
				this.token = token;
				params['session_key'] = session_key;
				params['token'] = token;
				let { nickName, avatarUrl } = await this.$API.home.get_userinfo(params);
				this.$store.dispatch('user/updateuserInfo', {
					nickName,
					avatarUrl
				});
				this.openid = xcx_openid;
				this.$methods.showToast('授权成功');
				this.text=phone_msg
				this.status = 2;
				this.canclick = true
			} catch (err) {
				console.log(err);
				this.canclick = true;
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

<template>
	<view class="main column-center-a">
		<view class='title'>登录</view>
		<view class='column-center'>
			<image src='/static/images/my/logo2.png' class='logo-img'></image>
			<view class='logo-txt'>欢迎来到乐享到家</view>
		</view>
		<view class='login-box mgb40'>
			<image src='/static/images/my/phone.png' class='icon1'></image>
			<input type="number" placeholder="请输入手机号" class='input' :inputBorder='false' v-model="mobile"
				maxlength="11" />
		</view>
		<view class='login-box mgb100'>
			<image src='/static/images/my/password.png' class='icon2'></image>
			<input type="number" placeholder="请输入验证码" class='input' :inputBorder='false' v-model="captcha"
				maxlength="6" />
			<view class='code green' :class='{"disable":show}' @click='getCode'>
				{{show?second+'后重新获取':'获取验证码'}}
			</view>
		</view>
		<view class='main-btn' @click='login'>登录</view>

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
		methods: {
			setClock() {
				this.second = 60
				this.interval = setInterval(() => {
					this.second--;
					if (this.second <= 0) {
						this.show = false;
						clearInterval(this.interval);
					}
				}, 1000);
			},
			async getCode() {
				if (this.show) return
				const mobile = this.mobile;
				if (!/(^1[0-9]{10}$)/.test(mobile)) {
					this.$methods.showToast('请输入正确的手机号码');
					return;
				}
				try {
					if (!this.canclick) return
					this.canclick = false
					this.$methods.showLoading(`发送中...`);
					console.log('你好')
					const res = await this.$API.home.getSms({
						mobile
					});
					this.$methods.showToast(`获取验证码成功`);
					this.show = true
					this.setClock()
				} catch (err) {
					console.log(err)
				} finally {
					setTimeout(() => {
						uni.hideLoading()
						this.canclick = true
					}, 600)
				}
			},
			async login() {
				const {
					mobile,
					captcha
				} = this;
				if (!/(^1[0-9]{10}$)/.test(mobile)) {
					this.$methods.showToast('请输入正确的手机号码');
					return;
				}
				if (!captcha) {
					this.$methods.showToast('请先获取验证码');
					return;
				}

				try {
					if (!this.canclick) return
					this.canclick = false
					this.$methods.showLoading(`登录中...`);
					const res = await this.$API.home.login({
						mobile,
						captcha
					});
					this.$methods.showToast(`登录成功`);
					this.$store.dispatch('user/updateToken',res)
					setTimeout(()=>{
						 this.$jump("/pages/index/index", 3);
					},1200)
				} catch (err) {
					console.log(err)
				} finally {
					setTimeout(() => {
						uni.hideLoading()
						this.canclick = true
					}, 600)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/scss/index.scss';

	.main {
		position: fixed;
		width: 100%;
		padding: 40rpx;
		font-size: 28rpx;
		height: 100%;
		background: url(@/static/images/my/login.png);
		background-size: 100% 100%;

		.title {
			font-size: 32rpx;
			font-weight: bold;
			text-align: center;
			padding-top: 50rpx;
			margin-bottom: 80rpx;
		}

		.logo-img {
			width: 130rpx;
			height: 130rpx;
			margin-bottom: 20rpx;
		}

		.logo-txt {
			font-size: 36rpx;
			margin-bottom: 110rpx;
		}

		.login-box {
			padding: 20rpx 30rpx;
			border: 1px solid $border;
			border-radius: 12rpx;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.icon1 {
				width: 26rpx;
				height: 36rpx;
				margin-right: 28rpx;
				position: relative;
				top: -3rpx
			}

			.icon2 {
				width: 34rpx;
				height: 34rpx;
				margin-right: 20rpx;
				position: relative;
				top: -3rpx
			}

			.input {
				flex: 1
			}

			.code {
				padding-left: 30rpx;
				height: 100%;
				line-height: 60rpx;
				border-left: 1px solid $maiBlack;
				margin-left: 10rpx;

				&.disable {
					color: $gray !important;
					border-color: $gray
				}
			}
		}

	}
</style>

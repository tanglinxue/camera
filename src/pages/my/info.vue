<template>
	<view class="main column-center">
		<view class="boxOuter">
			<view class="row borderbottom row-between">
				<text class="tit">公司名称</text>
				<input type="text" placeholder="请输入公司名称" class="input" v-model="form.company_name" />
			</view>
			<view class="row borderbottom row-between">
				<text class="tit">LOGO</text>
				<view class="row-start">
					<image :src="form.logo" class="img" v-if="form.logo"></image>
					<text class="mgr15 gray" v-else>请上传微信二维码</text>
					<uni-icons type="upload" size="26" class="icon" @click="chooseImage('logo')"></uni-icons>
				</view>
			</view>
			<view class="row borderbottom row-between">
				<text class="tit">公司solgan</text>
				<input type="text" placeholder="请输入公司solgan" class="input" v-model="form.solgan" />
			</view>
			<view class="row borderbottom row-between">
				<text class="tit">联系电话</text>
				<input type="number" placeholder="请输入手机号" class="input" v-model="form.mobile" maxlength="11" />
			</view>
			<view class="row borderbottom row-between">
				<text class="tit">微信二维码</text>
				<view class="row-start">
					<image :src="form.wechat_pic" class="img" v-if="form.wechat_pic"></image>
					<text class="mgr15 gray" v-else>请上传微信二维码</text>
					<uni-icons type="upload" size="26" class="icon" @click="chooseImage('wechat_pic')"></uni-icons>
				</view>
			</view>
			<view class="row row-between">
				<text class="tit">公众号二维码</text>
				<view class="row-start">
					<image :src="form.gzh_pic" class="img" v-if="form.gzh_pic"></image>
					<text class="mgr15 gray" v-else>公众号二维码</text>
					<uni-icons type="upload" size="26" class="icon" @click="chooseImage('gzh_pic')"></uni-icons>
				</view>
			</view>
		</view>
		<view class="bottom-btn"><button class="main-btn" @click="submit">提交</button></view>
	</view>
</template>
<script>
// ok
export default {
	data() {
		return {
			form: {
				company_name: '',
				logo: '',
				solgan: '',
				mobile: '', //手机号码
				wechat_pic: '',
				gzh_pic: ''
			},
			canclick: true
		};
	},
	onLoad() {
		this.$methods.showLoading();
		this.getData();
	},
	methods: {
		async getData() {
			const { user_info } = await this.$API.my.getmyinfo();
			for (let key in user_info) {
				if (user_info[key]) {
					this.form[key] = user_info[key];
				}
			}
			uni.hideLoading();
		},
		async submit() {
			const form = this.form;
			if (!/(^1[0-9]{10}$)/.test(form.mobile)) {
				this.$methods.showToast('请输入正确的手机号码');
				return;
			}
			try {
				if (!this.canclick) return;
				this.canclick = false;
				this.$methods.showLoading(`更新信息中...`);
				const data = await this.$API.my.myinfo(this.form);
				this.$methods.showToast('更新成功');
			} catch (err) {
				console.log(err);
			} finally {
				setTimeout(() => {
					uni.hideLoading();
					this.canclick = true
					uni.navigateBack({
						delta:1
					})
				}, 1000);
			}
		},
		async chooseImage(name) {
			let res = await this.$methods.chooseImage();
			const file = res.tempFilePaths[0];
			this.$methods.showLoading('上传中');
			const photo = await this.$API.home.upLoadImg({ imgfile: file });
			this.$methods.showToast('上传成功');
			this.form[name] = photo;
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/static/scss/index.scss';

.main {
	background: $backColor;
	font-size: 28rpx;

	padding: 30rpx;
	.boxOuter {
		padding: 0;
		overflow: hidden;
		background: #ffffff;
		.row {
			position: relative;
			padding: 30rpx;
			background: #fff;
			font-size: 28rpx;
			.input {
				text-align: right;
			}
			.img {
				width: 80rpx;
				height: 80rpx;
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

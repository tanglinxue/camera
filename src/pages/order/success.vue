<template>
	<view class="main column-center">
		<view class="column-center top">
			<view class="txt green mgb10 font36">提交成功</view>
			<view class="txt green">感谢合作</view>
		</view>
		<view class="column-center center" v-if='form.wechat_pic'>
			<image :src="form.wechat_pic" class="code-img mgb20"></image>
			<view class="txt gray">客服咨询</view>
		</view>
		<view class="column-center bottom" v-if='form.company_name || form.solgan'>
			<view class="gray mgb10 font24">{{form.company_name}}</view>
			<view class="gray font24">{{form.solgan}}</view>
		</view>
	</view>
</template>
<script>
// ok
import { mapState } from 'vuex';
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
			}
		};
	},
	computed: {
		...mapState('user',['share'])
	},
	onLoad() {

		if(this.share){
			wx.hideHomeButton();
		}
		this.getData();
	},
	methods:{
		async getData() {
			const { user_info } = await this.$API.my.getmyinfo();
			this.form = user_info
			
		},
	}
};
</script>

<style lang="scss" scoped>
@import '@/static/scss/index.scss';

.main {
	padding: 30rpx;
	position: fixed;
	left:0;
	top:0;
	bottom:0;
	right:0;
	.top {
		margin-bottom: 100rpx;
	}
	.center {
		margin-bottom: 200rpx;
		.code-img {
			width: 200rpx;
			height: 200rpx;
		}
	}
}
</style>

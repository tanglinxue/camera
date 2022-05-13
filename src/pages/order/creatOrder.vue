<template>
	<view class="main column-center">
		<view class="boxOuter">
			<view class="main-title  font32">绿城新品发布会 影像服务</view>
			<view class="mgb30 total-fee row-start">
				<view>
					费用总计 36000（
					<text>36500</text>
					）元
				</view>
				<view class="red row-start fee">
					明细
					<uni-icons type="forward" size="20" color="#f66745" class="icon"></uni-icons>
				</view>
			</view>
			<view class="mgb30">
				<view class="mgb20">
					预付款
					<text class="red">*</text>
				</view>
				<view class="input-box row-center"><input type="number" placeholder="请填写预付款" class="input" :maxlength="11" /></view>
			</view>
			<view class="mgb30">
				<view class="mgb20">
					预定单位
					<text class="red">*</text>
				</view>
				<view class="row-between">
					<view class="input-box row-center flex1"><input type="number" placeholder="请填写预定单位" class="input" :maxlength="11" /></view>
					<uni-icons type="map" size="30" class="mgl20" @click="toMap"></uni-icons>
				</view>
			</view>
			<view class="mgb30">
				<view class="mgb20">
					活动地址
					<text class="red">*</text>
				</view>
				<view class="input-box row-center"><input type="number" placeholder="请填写详细地址" class="input" :maxlength="11" /></view>
			</view>
			<view class="mgb30">
				<view class="mgb20">
					现场人数（预计）
					<text class="red">*</text>
				</view>
				<view class="input-box row-center"><input type="number" placeholder="请填写人数" class="input" :maxlength="11" /></view>
			</view>
			<view class="mgb30">
				<view class="mgb20">
					开始（日期时间）
					<text class="red">*</text>
				</view>
				<view class="time"><uni-datetime-picker type="datetime" return-type="timestamp" /></view>
			</view>
			<view class="mgb30">
				<view class="mgb20">
					结束（日期时间）
					<text class="red">*</text>
				</view>
				<view class="time"><uni-datetime-picker type="datetime" return-type="timestamp" /></view>
			</view>
			<view class="mgb20">
				<view class="mgb20">
					工作餐（摄影师）：
					<text class="red">*</text>
				</view>
				<view class="font24 gray mgb20">为避免影响拍摄，请提供工作餐</view>
				<view class="input-box row-start"><uni-data-checkbox multiple :localdata="hobbys" /></view>
			</view>
			<view class="mgb30">
				<view class="mgb20">
					联系人
					<text class="red">*</text>
				</view>
				<view class="input-box row-center"><input type="number" placeholder="请填写联系人" class="input" :maxlength="11" /></view>
			</view>
			<view class="mgb30">
				<view class="mgb20">
					联系电话
					<text class="red">*</text>
				</view>
				<view class="input-box row-center"><input type="number" placeholder="请填写联系电话" class="input" :maxlength="11" /></view>
			</view>
			<view class="mgb30">
				<view class="mgb20">备注</view>
				<uni-easyinput type="textarea" placeholder="请填写备注" class="textarea" :clearable="false" maxlength="200" />
			</view>
		</view>
		<view class="btn-box"><view class="main-btn">提交</view></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			hobbys: [
				{
					text: '提供',
					value: 4
				},
				{
					text: '无法提供',
					value: 5
				}
			]
		};
	},
	methods: {
		toMap() {
			console.log('地图');
			wx.chooseLocation({
				success: async res => {
					console.log('res', res);
				}
			});
		}
	}
};
</script>
<style lang="scss" scoped>
@import '@/static/scss/index.scss';
.main {
	.input-box {
		font-size: 28rpx;
		padding: 10rpx 30rpx;
		border: 1px solid $border;
		border-radius: 12rpx;
		height: 80rpx;

		.input {
			flex: 1;
		}
	}
	.time {
		width: 400rpx;
	}

	.main-title {
		width: 100%;
		padding-bottom: 30rpx;
		text-align: center;
	}
	.btn-box {
		width: 100%;
		padding: 30rpx;
		background: $white;
	}
	.total-fee {
		text {
			text-decoration: line-through;
			color: $gray;
		}
		.fee {
			margin-left: 50rpx;
			.icon {
				position: relative;
				top: 5rpx;
			}
		}
	}
}
</style>

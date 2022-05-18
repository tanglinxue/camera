<template>
	<view class="main">
		<view class="title">摄影</view>
		<view class="mgb20" v-for="(item, index) in list" :key="index"><reduceCom :info="item" /></view>
		<view class="title">站架合影</view>
		<view class="tips-content row-start"><image class="icon" src="/static/common/icon-tips.png"></image>【服务包含】站架、运输、搭建、拍摄、修图</view>
		<view class="warning mgb30">
			【温馨提示】第一排椅子数
			<text class="red">0</text>
			（预估），客户让酒店提供
		</view>
		<view class="mgb20" v-for="(item, index) in list2" :key="index">
			<reduceCom :info="item">
				<view slot="footer" class="footer">{{ item.footer }}</view>
			</reduceCom>
		</view>
		<view class="row-start box">
			<view class="column-center item" v-for="(item, index) in options" :key="index">
				<view class="name font24">{{ item.name }}</view>
				<view class="tips font20 gray">{{ item.tips }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import reduceCom from './reduceCom';
export default {
	components: {
		reduceCom
	},
	data() {
		return {
			list: [
				{
					name: '照片直播：',
					placeholder: '¥2500/机位'
				},
				{
					name: '传统摄影：',
					placeholder: '¥1500/机位'
				}
			],
			list2: [
				{
					name: '人数：',
					placeholder: '¥10/人',
					footer: '注：200人以内，按200人计费'
				},
				{
					name: '冲印：（张数）',
					footer: '注：50张起步，不足按50张计费，400人以上合影冲印另计'
				}
			],
			options: [
				{
					value: '1',
					name: '塑封',
					tips: '¥25/张',
					price: '25'
				},
				{
					value: '2',
					name: '盒装',
					tips: '¥25/张',
					price: '25'
				},
				{
					value: '3',
					name: '其他',
					tips: '费用另计',
					price: '费用另计'
				}
			]
		};
	}
};
</script>

<style lang="scss" scoped>
@import '@/static/scss/index.scss';

.main {
	background: #fff;
	padding: 30rpx;
	.title {
		font-weight: bold;
		margin-bottom: 20rpx;
	}
	.footer {
		font-size: 24rpx;
		color: $gray;
		margin-top: 10rpx;
		padding-left:20rpx;
	}
	.box {
		grid-gap: 24rpx;
		.item {
			border: 1px solid $border;
			width: 180rpx;
			padding: 16rpx 0;
			border-radius: 8rpx;
		}
	}
	.warning {
		font-size: 22rpx;
	}
	.tips-content {
		padding: 20rpx 32rpx;
		display: flex;
		background: #f8f4dc;
		color: #855d2e;
		border-radius: 8rpx;
		font-size:22rpx;
		margin-bottom: 30rpx;
		.icon {
			width:60rpx;
			height:30rpx;
			margin-top: 3rpx;
		}
	}
}
</style>

<template>
	<view class="main">
		<view class="content">
			<view class="red fee">费用组成：技术服务费+录课人数费</view>
			<view class="tips-content row-start">
				<image class="icon" src="/static/common/icon-tips.png"></image>
				服务包含：固定摄像1个、灯光1组、素材拼剪
			</view>
			<view class="mgb20 listItem" v-for="(item, index) in list" :key="index"><reduceCom :info="item" /></view>
			<view class="row-start checkbox pd30">
				<image src="/static/common/icon-checkbox-sel.png" class="icon"></image>
				<text class="text">线下录课</text>
			</view>
			<view class="mgb20 listItem" v-for="(item, index) in list" :key="index">
				<reduceCom :info="item">
					<view slot="footer" class="footer">{{ item.footer }}</view>
				</reduceCom>
			</view>
		</view>
		<view class="content">
			<view class="row-start checkbox pd30">
				<image src="/static/common/icon-checkbox.png" class="icon"></image>
				<text class="text">线下录课</text>
			</view>
			<view class="mgb20 listItem" v-for="(item, index) in list2" :key="index">
				<reduceCom :info="item">
					<view slot="footer" class="footer">{{ item.footer }}</view>
				</reduceCom>
			</view>
		</view>
		<view class="content">
			<view class="row-start time mgb0 pd30">
				<view class="txt1 mgr15">提前一天进场：</view>
				<view class="radio row-start">
					<image src="/static/common/icon-radio.png" class="icon"></image>
					<text class="txt">是</text>
				</view>
				<view class="radio row-start">
					<image src="/static/common/icon-radio-sel.png" class="icon"></image>
					<text class="txt">否</text>
				</view>
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
			// 单选数据源
			sexs: [
				{
					text: '通用',
					value: 0
				},
				{
					text: '定制',
					value: 1
				}
			],
			list: [
				{
					name: '技术服务费：',
					placeholder: '¥6000',
					hideBtn:true
				},
				{
					name: '录课人数：',
					placeholder: '¥200/人',
					footer: '注：正常每天可录制1-7人，具体以需求为准'
				}
			],
			list2: [
				{
					name: '技术服务费：',
					placeholder: '¥6000',
					hideBtn:true
				},
				{
					name: '录课人数：',
					placeholder: '¥100/人',
					footer: '注：正常每天可录制1-7人，具体以需求为准'
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
	.pd30 {
		padding: 30rpx 0;
	}
	.fee {
		font-size: 24rpx;
		margin-bottom: 20rpx;
	}
	.content {
		background: $white;
		padding: 30rpx;
		margin-bottom: 20rpx;
	}

	.title {
		font-weight: bold;
		margin-bottom: 20rpx;
		text {
			font-weight: normal;
			color: $gray;
			font-size: 26rpx;
		}
	}
	.footer {
		font-size: 24rpx;
		color: $gray;
		margin-top: 10rpx;
		padding-left: 20rpx;
	}
	.time {
		margin-bottom: 20rpx;
		font-size: 28rpx;
		color: $mainBlack;
		font-weight: bold;
		padding-left: 20rpx;
		.radio {
			margin-right: 30rpx;
			.icon {
				width: 26rpx;
				height: 26rpx;
				margin-right: 8rpx;
			}
		}
	}
	.listItem {
		&:last-child {
			margin-bottom: 0 !important;
		}
	}
	.tips-content {
		padding: 20rpx 32rpx;
		display: flex;
		background: #f8f4dc;
		color: #855d2e;
		border-radius: 8rpx;
		font-size: 22rpx;
		margin-bottom: 30rpx;
		.icon {
			width: 60rpx;
			height: 30rpx;
			margin-top: 3rpx;
			margin-right: 10rpx;
		}
	}
	.checkbox {
		font-weight: bold;
		.icon {
			width: 26rpx;
			height: 26rpx;
			margin-right: 16rpx;
		}
	}
}
</style>

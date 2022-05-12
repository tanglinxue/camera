<template>
	<view class="main column-center">
		<view class="row-between top-info">
			<view class="left row-start">
				<view class="imgbox"><image src="https://baikebcs.bdimg.com/解淑萍右侧轮播.png" mode="aspectFill"></image></view>
				<view class="name">堂堂</view>
			</view>
			<view class="column-center-a right">
				<text class="mgb10">等级：免费会员</text>
				<text>截止日期：2022-06-30</text>
			</view>
		</view>
		<view class="boxOuter-box">
			<view class="boxOuter">
				<view class="row-between num-box">
					<view class="item column-center" @click='jump(1)'>
						<view class="text1">报价数</view>
						<view class="text2">333</view>
					</view>
					<view class="item column-center" @click='jump(1)'>
						<view class="text1">预定数</view>
						<view class="text2">333</view>
					</view>
					<view class="item column-center" @click='jump(1)'>
						<view class="text1">成交数</view>
						<view class="text2">333</view>
					</view>
				</view>
			</view>
			<view class="boxOuter">
				<view class="row row-between borderbottom" @click='jump(4)'>
					<view class="row-start">
						<uni-icons type="person" size="26" class="icon"></uni-icons>
						<text class="tit">我的信息</text>
					</view>
				</view>
				<view class="row row-between borderbottom">
					<view class="row-start">
						<uni-icons type="download" size="26" class="icon"></uni-icons>
						<text class="tit">行业报价模版（下载）</text>
					</view>
				</view>
				<view class="row row-between">
					<view class="row-start">
						<uni-icons type="download" size="26" class="icon"></uni-icons>
						<text class="tit">行业合同模版（下载）</text>
					</view>
				</view>
			</view>
			<view class="boxOuter">
				<view class="row row-between borderbottom">
					<view class="row-start">
						<uni-icons type="eye" size="26" class="icon"></uni-icons>
						<text class="tit">关注影助理公众号</text>
					</view>
				</view>
				<view class="row row-between borderbottom">
					<view class="row-start">
						<uni-icons type="headphones" size="26" class="icon"></uni-icons>
						<text class="tit">联系影助理客服</text>
					</view>
				</view>
			</view>
		</view>
	
		<view class='bottom-text column-center'>
			<view class='row-between mgb20'>
				<view class='line'></view>
				<text class='font30 mgl20'>影助理1.0</text>
				<view class='line mgl20'></view>
			</view>
			
			<text>为活动会议影像从业者服务</text>
		</view>
	</view>
</template>

<script>
export default {
	methods: {
		jump(type) {
			if (type == 1) {
				this.$jump(`/pages/my/historyRecord`);
			} else if (type == 4) {
				this.$jump(`/pages/my/info`);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/static/scss/index.scss';

.main {
	padding-bottom: 100rpx;
	.top-info {
		width: 100%;
		padding: 30rpx;
		background: $white;
		position: relative;
		margin-bottom: 20rpx;
		.left {
			.imgbox {
				width: 120rpx;
				height: 120rpx;
				border-radius: 100%;
				margin-right: 50rpx;
				image {
					width: 100%;
					height: 100%;
					border-radius: 100%;
				}
			}
			.name {
				font-weight: bold;
			}
		}
		.right {
			font-size: 26rpx;
		}
	}

	.boxOuter-box {
		width: 100%;
		padding:0 30rpx;
		.num-box {
			padding: 30rpx;
			background: $white;
			.item {
				flex: 1;
				.text1 {
					margin-bottom: 20rpx;
				}
				.text2 {
					font-weight: bold;
				}
			}
		}
	}
	.boxOuter {
		padding:0;
		overflow: hidden;
		.row {
			padding: 30rpx;
			color: $gray;
			.icon{
				margin-right: 20rpx;
			}
		}
	}
	
	.bottom-text {
		font-size: 26rpx;
		color: $gray;
		margin-top: 100rpx;
		.line{
			width:100rpx;
			height:1rpx;
			background: $gray;
		}
	}
}
</style>

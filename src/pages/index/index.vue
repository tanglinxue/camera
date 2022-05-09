<template>
	<view class="main column-center">
		<swiper class="swiper" :indicator-dots="true" :circular="true">
			<swiper-item><image src="https://t15.baidu.com/it/u=3254556675,1617290360&fm=55&app=54&fmt=auto?w=414&h=276" class="img"></image></swiper-item>
			<swiper-item><image src="https://t15.baidu.com/it/u=3254556675,1617290360&fm=55&app=54&fmt=auto?w=414&h=276" class="img"></image></swiper-item>
			<swiper-item><image src="https://t15.baidu.com/it/u=3254556675,1617290360&fm=55&app=54&fmt=auto?w=414&h=276" class="img"></image></swiper-item>
		</swiper>
		<button class="button" type="primary">开始报价</button>
		<uni-section title="卡片+列表" type="line" style='width:100%'>
				<uni-card padding="0" spacing="0">
					<template v-slot:cover>
						<view class="custom-cover">
							
							<view class="cover-content">
								<text class="uni-subtitle uni-white">今日新闻热点</text>
							</view>
						</view>
					</template>
					<uni-list>
						<uni-list-item title="今日新闻" showArrow></uni-list-item>
						<uni-list-item title="今日新闻" showArrow></uni-list-item>
					</uni-list>
					
				</uni-card>
			</uni-section>
	</view>
</template>

<script></script>

<style lang="scss" scoped>
@import '@/static/scss/index.scss';
::v-deep uni-swiper .uni-swiper-dot {
	background: rgba(255, 255, 255, 0.6);
	width: 10rpx;
	height: 10rpx;
}
::v-deep uni-swiper .uni-swiper-dot-active {
	background: #ffffff;
	width: 20rpx;
	height: 10rpx;
	border-radius: 5rpx;
}
.main {
	.swiper {
		width: 100%;
		height: 350rpx;
		.img {
			width: 100%;
			height: 100%;
		}
	}
}
</style>

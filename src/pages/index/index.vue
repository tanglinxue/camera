<template>
	<view class="main column-center">
		<view class="banner">
			<swiper class="swiper" :autoplay="true" :circular="true">
				<swiper-item v-for="(item, index) in list" :key="index"><img :src="item.img" class="img" /></swiper-item>
			</swiper>
			<view class="dots" v-if="list.length > 1">
				<block v-for="(item, index) in list" :key="index"><view class="dot" :class="index == swiperCurrent ? 'active' : ''"></view></block>
			</view>
		</view>
		<view class="btn-box mgb20"><view class="main-btn red-shadow" @click="jump(3)">开始报价</view></view>
		<view class="boxOuter-box">
			<view class="boxOuter" v-if='price_info.length'>
				<view class="title row-between">
					<text class="txt1">最新报价:</text>
					<text @click="jump(1)">更多...</text>
				</view>
				<view class="list">
					<view class="item row-between"  v-for="item in price_info" :key='item.id' @click='jump(4,item.id)'>
						<view class="textElis flex1">{{item.case_name}}</view>
						<view class="date">{{item.create_time}}</view>
					</view>
				</view>
			</view>
			<view class="boxOuter" v-if='temlate_info.length'>
				<view class="title row-between">
					<text class="txt1">报价模板:</text>
					<text @click="jump(2)">更多...</text>
				</view>
				<view class="list">
					<view class="item textElis" v-for="item in temlate_info" :key='item.id' @click='jump(5,item.id)'>{{item.template_name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	onShow() {},
	data() {
		return {
			list: [
				{
					img: 'https://baikebcs.bdimg.com/解淑萍右侧轮播.png'
				},
				{
					img: 'https://baikebcs.bdimg.com/解淑萍右侧轮播.png'
				},
				{
					img: 'https://baikebcs.bdimg.com/解淑萍右侧轮播.png'
				}
			],
			swiperCurrent: 0,
			price_info: [],
			temlate_info: [],
			fristEnter: true
		};
	},
	onShow() {
		if (this.fristEnter) {
			this.$methods.showLoading();
			this.fristEnter = false;
			this.getData();
		} else {
			this.getData();
		}
	},
	methods: {
		async getData(time = 300) {
			const {price_info,temlate_info} = await this.$API.home.get_index_price();
			this.price_info = price_info;
			this.temlate_info = temlate_info
			setTimeout(() => {
				uni.hideLoading();
			}, time);
		},
		jump(type,id) {
			if (type == 1) {
				this.$jump(`/pages/my/historyRecord`);
			} else if (type == 2) {
				this.$jump(`/pages/index/templateRecord`);
			} else if (type == 3) {
				// 开始报价
				this.$jump(`/pages/index/offerPrice`);
			}else if (type == 4) {
				// 报价单
				this.$jump(`/pages/index/priceSheet?id=${id}`);
			} else if (type == 5) {
				// 报价模板
				this.$jump(`/pages/index/priceTemplate?id=${id}`);
			}
		}
	},
	onPullDownRefresh() {
		this.$methods.showLoading('刷新中...');
		this.getData(1000);
		// 上拉刷新
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	}
};
</script>

<style lang="scss" scoped>
@import '@/static/scss/index.scss';

.main {
	.banner {
		width: 100%;
		height: 400rpx;
		position: relative;
		.swiper {
			width: 100%;
			height: 100%;

			swiper-item {
				width: 100%;
				height: 100%;

				.img {
					width: 100%;
					height: 100%;
				}
			}
		}
		.dots {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 30rpx;
			display: flex;
			justify-content: center;
			.dot {
				margin: 0 4rpx;
				width: 40rpx;
				height: 4rpx;
				background: rgba(255, 255, 255, 0.5);
				transition: all 0.6s;
				&.active {
					background: white;
				}
			}
		}
	}
	.btn-box {
		width: 100%;
		background: $white;
		padding: 30rpx;
	}
	.boxOuter-box {
		width: 100%;
		padding: 0 30rpx;
		.title {
			font-size: 26rpx;
			margin-bottom: 20rpx;
			.txt1 {
				font-size: 30rpx;
				font-weight: bold;
			}
		}
		.list {
			padding: 0 0 0 20rpx;
			.item {
				padding: 10rpx 0;
				font-size: 26rpx;
				width: 100%;
				.date {
					text-align: right;
				}
			}
		}
	}
}
</style>

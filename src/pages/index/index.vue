<template>
	<view class="main column-center">
		<view class="banner" v-if='false'>
			<swiper class="swiper" :autoplay="true" :circular="true" @change="swiperChange">
				<swiper-item v-for="(item, index) in banner_info" :key="index"><img :src="item.bannerpic" class="img" /></swiper-item>
			</swiper>
			<view class="dots" v-if="banner_info.length > 1">
				<block v-for="(item, index) in banner_info" :key="index"><view class="dot" :class="index == swiperCurrent ? 'active' : ''"></view></block>
			</view>
		</view>
		<view class="btn-box mgb20"><view class="main-btn red-shadow" @click="jump(3)">开始报价</view></view>
		<view class="boxOuter-box">
			<view class="boxOuter" v-if="price_info.length">
				<view class="title row-between">
					<text class="txt1">最新报价:</text>
					<text @click="jump(1)">更多...</text>
				</view>
				<view class="list">
					<view class="item row-between" v-for="item in price_info" :key="item.id" @click="jump(4, item.id)">
						<view class="textElis flex1">{{ item.case_name }}</view>
						<view class="date">{{ item.create_time }}</view>
					</view>
				</view>
			</view>
			<view class="boxOuter" v-if="temlate_info.length">
				<view class="title row-between">
					<text class="txt1">报价模板:</text>
					<text @click="jump(2)">更多...</text>
				</view>
				<view class="list">
					<view class="item textElis" v-for="item in temlate_info" :key="item.id" @click="jump(5, item.id)">{{ item.template_name }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
//finish
export default {
	data() {
		return {
			banner_info: [],
			swiperCurrent: 0,
			price_info: [], //最新报价
			temlate_info: [], //报价模板
			fristEnter: true
		};
	},
	onShow() {
		if (this.fristEnter) {
			this.$methods.showLoading();
			this.fristEnter = false;
		}
		this.getData();
	},
	methods: {
		async getData(time = 300) {
			const { banner_info,price_info, temlate_info} = await this.$API.home.get_index_price();
			this.price_info = price_info;
			this.temlate_info = temlate_info;
			this.banner_info = banner_info;
			setTimeout(() => {
				uni.hideLoading();
			}, time);
		},
		jump(type, id) {
			if (type == 1) {
				// 历史报价记录
				this.$jump(`/pages/my/historyRecord`);
			} else if (type == 2) {
				// 报价模板
				this.$jump(`/pages/index/templateRecord`);
			} else if (type == 3) {
				// 开始报价
				this.$jump(`/pages/index/offerPrice`);
			} else if (type == 4) {
				// 单个报价单
				this.$jump(`/pages/index/priceSheet?id=${id}`);
			} else if (type == 5) {
				// 单个报价模板
				this.$jump(`/pages/index/priceSheet?id=${id}&type=3`);
			}
		},
		// 滑动banner
		swiperChange(e) {
			this.swiperCurrent = e.detail.current;
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

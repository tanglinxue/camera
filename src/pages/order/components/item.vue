<template>
	<view class="order-item" @click="toDetail">
		<view class="row-between txt txt1 borderbottom">
			<text class="left">{{ $methods.format(info.service_time) }}</text>
			<text class="right" :style="info.order_status == 2 ? 'color:#FF3D2B' : info.order_status == 12 ? 'color:#919191' : ''">{{ order_status_name }}</text>
		</view>
		<view class="row-between txt txt2 ">
			<text class="left weight">项目：{{ info.product_name }}</text>
		</view>
		<view class="row-between txt">
			<text class="left">服务技师</text>
			<text class="right">{{ useInfo.nickname }}</text>
		</view>
		<view class="row-between txt">
			<text class="left">出行费用</text>
			<text class="right">{{ info.traffic_mode == 0 ? '公交地铁' : '出租车' }}（￥{{ info.traffic_fee }}）</text>
		</view>
		<view class="row-between txt">
			<text class="left">订单总额</text>
			<text class="right weight">￥{{ info.order_all_price }}</text>
		</view>
		<view class="row-end">
			<!-- 待评价 -->
			<view class="btn fill-btn" v-if="info.order_status == 8 && !info.feedflg_t" @click.stop="toRating">去评价</view>
		</view>
	</view>
</template>

<script>
// ok
import { mapState } from 'vuex';
export default {
	props: {
		info: {
			type: Object,
			default: () => {}
		}
	},
	computed: {
		...mapState('user', ['useInfo']),
		order_status_name() {
			const { order_status, feedflg_t } = this.info;
			switch (order_status * 1) {
				case 2:
					return '未接单';
				case 3:
					return '已接单';
				case 4:
					return '已出发';
				case 5:
					return '己到达';
				case 6:
					return '服务中';
				case 7:
					return '服务中';
				case 8:
					if (feedflg_t) {
						return '已完成';
					}
					return '待评价';
				case 9:
					return '接单超时';
				case 12:
					return '已取消';
			}
		},
		order_no() {
			return this.info.id;
		}
	},
	methods: {
		toDetail() {
			// 去详情
			this.$jump(`/pages/order/orderDetail?order_no=${this.order_no}`);
		},
		toRating() {
			// 评价
			this.$jump(`/pages/order/rating?order_id=${this.order_no}`);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/static/scss/index.scss';
.order-item {
	width: 710rpx;
	padding: 15rpx;
	margin: 0 20rpx 20rpx;
	background: #ffffff;
	box-shadow: 0px 0px 8rpx 0px rgba(218, 218, 218, 0.5);
	border-radius: 12rpx;
	border: 2px solid $greenColor;
	font-size: 28rpx;
	.btn {
		text-align: center;
		color: $greenColor;
		font-size: 32rpx;
		width: 180rpx;
		height: 64rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid $greenColor;
		border-radius: 12rpx;
		font-weight: 500;
		&.fill-btn {
			border: none;
			background: $greenColor;
			color: #fff;
		}
	}
	.txt {
		margin-bottom: 15rpx;
		&:last-child {
			margin-bottom: 0;
		}
		.left {
			color: $gray;
		}
		&.txt1 {
			padding-bottom: 20rpx;
			.right {
				color: $greenColor;
				font-size: 32rpx;
				font-weight: bold;
			}
		}
		&.txt2 {
			.left {
				color: $maiBlack;
				font-size: 30rpx;
			}
		}
	}
}
</style>

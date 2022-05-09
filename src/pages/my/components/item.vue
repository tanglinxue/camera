<template>
	<view class="boxOuter order" >
		<view class="info">
			<view class="row-between title">
				<view>订单：{{ info.order_code }}</view>
				<view class="row-start green font24" @click="setItem(info)">
						{{info.open?"收起":"展开"}}
						<CIcon :type="info.open?'top':'bottom'" color="#67be41" class="icon"></CIcon>
				</view>
			</view>
			<view class="price row-start">
				<view class="money green">
					<text class="rmb">￥</text>
					{{ info.total_money }}
				</view>
				<view class="status green" :class="{ red: info.status === 0 }">{{ info.status === 0 ? '未结算' : '已结算' }}</view>
				<view class="status orange mgl20" v-if="info.memo.includes('异常')">异常加减</view>
			</view>
			<view class="time">{{ info.order_time }}</view>
		</view>
		<view class="openCon" v-if="info.open">
			<view class="title row-start">
				<view class="circle"></view>
				<text>项目明细</text>
			</view>
			<view class="row-between row">
				<view class="lf row-start-a">
					<view class="text">{{ info.item_name}}X{{ info.item_num }}</view>
				</view>
				<text class="tr">
					<text class="rmb">￥</text>
					{{ info.item_total }}
				</text>
			</view>
			<view class="row-between row">
				<view class="lf row-start-a"><view class="text">优惠券金额</view></view>
				<text class="tr">
					<text class="rmb">￥</text>
					{{ info.free_money }}
				</text>
			</view>
			<view class="row-between row">
				<view class="lf row-start-a"><view class="text">加钟金额</view></view>
				<text class="tr">
					<text class="rmb">￥</text>
					{{ info.add_money }}
				</text>
			</view>
			<view class="row-between row">
				<view class="lf row-start-a"><view class="text">项目总金额</view></view>
				<text class="tr">
					<text class="rmb">￥</text>
					{{ info.item_total }}
				</text>
			</view>
			<view class="row-between row">
				<view class="lf row-start-a"><view class="text">提成比例</view></view>
				<text class="tr">
					<text class="rmb">￥</text>
					{{ info.rate }}
				</text>
			</view>
			<view class="row-between row">
				<text class="lf weight black">项目收入:</text>
				<view class="tr green font32">
					<text class="rmb">￥</text>
					{{ info.item_income }}
				</view>
			</view>
			<view class="title row-start">
				<view class="circle"></view>
				<text>扣费明细</text>
			</view>
			<view class="row-between row">
				<view class="lf row-start-a"><view class="text">渠道扣款=（项目收入*15%）</view></view>
				<text class="tr">
					<text class="rmb">￥</text>
					{{ info.ad_fee }}
				</text>
			</view>
			<view class="row-between row">
				<view class="lf row-start-a"><view class="text">储值扣款=（项目收入*10%）</view></view>
				<text class="tr">
					<text class="rmb">￥</text>
					{{ info.card_fee }}
				</text>
			</view>
			<view class="row-between-a row">
				<view class="lf row-start-a"><view class="text">服务扣款=（项目收入-渠道扣款-储值扣款）*0.03</view></view>
				<text class="tr">
					<text class="rmb">￥</text>
					{{ info.service_fee }}
				</text>
			</view>
			<view class="row-between row">
				<text class="lf weight black">合计扣费:</text>
				<view class="tr green font32">
					<text class="rmb">￥</text>
					{{ info.fee_sum }}
				</view>
			</view>
			<view class="line"></view>
			<view class="row-between row">
				<text class="lf weight black">车费收入：</text>
				<view class="tr green font32">
					<text class="rmb">￥</text>
					{{ info.traffic_money }}
				</view>
			</view>
			<view class="line"></view>
			<template v-if="info.memo">
				<view class="gray remark">备注：{{ info.memo }}</view>
				<view class="line"></view>
			</template>
			<view class="row-between row total">
				<text class="lf weight green">实际收入：</text>
				<view class="tr row-start">
					<text class="gray">{{ info.formula }}</text>
					<view class="orange font32">
						<text class="rmb">￥</text>
						{{ info.total_money }}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// ok
	import CIcon from '@/components/c-icons/uni-icons.vue'
	export default{
		props: {
			info: {
				type: Object,
				default: () => {}
			}
		},
		components:{CIcon},
		methods:{
			setItem(info) {
				if (info.open) {
					info.open = false;
				} else {
					this.$set(info, 'open', true);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '@/static/scss/index.scss';
.order {
	font-size: 28rpx;
	.total {
		padding: 10rpx 0;
	}
	.line {
		width: 100%;
		border-top: 1px solid $border;
		padding-bottom: 20rpx;
	}
	.title {
		margin-bottom: 15rpx;
		.icon {
			margin-left: 10rpx;
		}
	}
	.price {
		margin-bottom: 15rpx;
		.money {
			font-size: 36rpx;
			margin-right: 40rpx;
		}
		.status {
			font-weight: bold;
		}
	}
	.time {
		font-size: 26rpx;
		color: $gray;
	}
	.openCon {
		font-size: 26rpx;
		line-height: 40rpx;
		margin-top: 30rpx;
		.title {
			padding-top: 30rpx;
			border-top: 1px solid $border;
			padding-bottom: 10rpx;
			font-size: 28rpx;
			.circle {
				width: 16rpx;
				height: 16rpx;
				background-color: $greenColor;
				margin-right: 15rpx;
				border-radius: 100%;
			}
		}
		.remark {
			padding-bottom: 20rpx;
		}
		.row {
			font-size: 26rpx;
			padding-bottom: 20rpx;
	
			.lf {
				color: $gray;
				.text {
					width: 450rpx;
				}
				.data {
					flex: 1;
					color: $maiBlack;
				}
			}
	
			.tr {
				.rmb {
					font-size: 22rpx;
				}
			}
		}
	}
}
</style>

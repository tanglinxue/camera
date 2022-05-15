<template>
	<view class="main column-center">
		<view class="boxOuter">
			<view class="row-start mgb20 search">
				关键词
				<view class="input row-start"><input type="text" placeholder="活动方,合作方" /></view>
			</view>
			<view class="time row-between">
				<view class="example-body row-start">
					<view class="date"><uni-datetime-picker type="date" v-model="start_time" placeholder="开始日期" size="mini" /></view>
					<view class="mgl10">至</view>
					<view class="date mgl10"><uni-datetime-picker type="date" v-model="end_time" placeholder="结束日期" /></view>
				</view>
				<view class="main-btn" @click="search">查询</view>
			</view>
		</view>
		<view class="boxOuter row-center price">累计报价：1002</view>
		<view class="ordeList">
			<!-- 订单列表 -->
			<view v-for="(item, index) in list" :key="index"><Item :info="item" /></view>
		</view>
	</view>
</template>
<script>
//ok
import Item from './components/item';
export default {
	data() {
		return {
			tabCurrentIndex: 0,
			start_time: '',
			end_time: '',
			income_sum: {},
			navList: [
				{
					state: 0,
					text: '本周'
				},
				{
					state: 1,
					text: '上周'
				},
				{
					state: 2,
					text: '本月'
				},
				{
					state: 3,
					text: '上月'
				}
			],
			status: 'more',
			total: 0,
			loading: true,
			list: [1,2,3,4,5,6,67],
			query: {
				page: 1,
				pagesize: 20
			}
		};
	},
	components: {
		Item
	},
	methods: {
		
	}
};
</script>

<style lang="scss" scoped>
@import '@/static/scss/index.scss';
::v-deep .uni-date__x-input {
	height: 60rpx;
	line-height: 60rpx;
	font-size: 24rpx;
}
::v-deep .uniui-calendar {
	display: none;
}
::v-deep .uni-date-editor--x .uni-date__icon-clear {
	border-width: 14rpx;
}
::v-deep .uni-input-placeholder {
	font-size: 26rpx;
	text-align: center;
}
::v-deep .uni-date-x {
	width: 220rpx;
}
::v-deep .uni-date-x--border {
	border-color: $border;
}

.main {
	padding: 20rpx;
	.search {
		font-size: 28rpx;
		.input {
			width: 350rpx;
			padding: 14rpx 15rpx;
			height: 68rpx;
			border-radius: 8rpx;
			font-size: 26rpx;
			border: 1px solid $border;
			margin-left: 20rpx;
			input {
				line-height: 40rpx;
			}
		}
	}
	.time {
		.main-btn {
			width: 120rpx;
			margin-left: 20rpx;
			border-radius: 8rpx;
			height: 60rpx;
			font-size: 26rpx;
		}
	}
	.ordeList {
		width: 100%;
	}
	.price {
		padding: 15rpx 0;
		font-size: 26rpx;
	}
}
</style>

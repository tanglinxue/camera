<template>
	<view class="main column-center">
		<view class="boxOuter">
			
			<view class="time row-between">
				<view class="row-start search">
					<view class="name">关键词</view>
					<view class="input"><input type="text" placeholder="活动方,合作方" /></view>
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange" class="date" fields="month">
						<view class="date-input row-between">
							<text>全部</text>
							<view class="bottom-point"></view>
						</view>
					</picker>
				</view>
				<view class="main-btn" @click="search">查询</view>
			</view>
		</view>
		<view class="boxOuter row-center"><uni-data-checkbox v-model="hobby" multiple :localdata="hobbys" /></view>
		<view class="boxOuter price">
			<view class="row-center mgb10">
				订单数：
				<text class="gray mgr15">1020(取消23)</text>
				订单额：
				<text class="gray">213000</text>
				1
			</view>
			<view class="row-center">
				已结款：
				<text class="gray mgr15">160000(已结·80单)</text>
				待结款：
				<text class="orange">53000(未结19单)</text>
			</view>
		</view>
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
		const currentDate = this.getDate({
			format: true
		});
		return {
			tabCurrentIndex: 0,
			date: currentDate,
			start_time: '',
			end_time: '',
			income_sum: {},
			hobby: [],
			// 多选数据源
			hobbys: [
				{
					text: '已预定',
					value: 2
				},
				{
					text: '已完成(待结算)',
					value: 3
				},
				{
					text: '已结算',
					value: 4
				},
				{
					text: '取消',
					value: 5
				}
			],
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
			list: [1, 2, 3, 45, 5],
			query: {
				page: 1,
				pagesize: 20
			}
		};
	},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},
	components: {
		Item
	},
	methods: {
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;

			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;
			return `${year}-${month}`;
		}
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
::v-deep .uni-data-checklist .checklist-group .checklist-box{
	margin-right:0
}

.main {
	padding: 20rpx;

	.search {
		font-size: 28rpx;
		.input {
			width: 200rpx;
			padding: 10rpx 15rpx;
			height: 60rpx;
			border-radius: 8rpx;
			font-size: 26rpx;
			border: 1px solid $border;
			margin-left: 20rpx;
			input {
				line-height: 40rpx;
			}
		}
		.date {
			.date-input {
				margin-left: 20rpx;
				border: 1px solid $border;
				width: 180rpx;
				height: 60rpx;
				border-radius: 8rpx;
				padding: 15rpx;
				font-size: 26rpx;
				color: $gray;
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
		font-size: 24rpx;
	}
}
</style>

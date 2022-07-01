<template>
	<view class="main column-center">
		<view class="boxOuter">
			<view class="row-start date-box">
				<picker @change="yearChange" :value="yearIndex" :range="yearArr" class="date">
					<view class="date-input row-between">
						<text>{{ yearArr[yearIndex] }}</text>
						<view class="bottom-point"></view>
					</view>
				</picker>
				年
				<picker @change="monthChange" :value="monthIndex" :range="monthArr" class="date">
					<view class="date-input row-between">
						<text>{{ monthArr[monthIndex] }}</text>
						<view class="bottom-point"></view>
					</view>
				</picker>
				月
			</view>
			<view class="time row-between">
				<view class="row-start search">
					<view class="name">关键词</view>
					<view class="input row-start"><input type="text" placeholder="活动方,合作方" v-model="query.keywords" /></view>
				</view>
				<view class="main-btn" @click="getList(1)">查询</view>
			</view>
		</view>
		<view class="boxOuter row-center"><uni-data-checkbox v-model="query.status" multiple :localdata="selectArr" @change="getList(1)" /></view>
		<view class="boxOuter price">
			<view class="row-center mgb10">
				订单数：
				<text class="gray mgr15">{{ numObj.all_count || 0 }}(取消{{ numObj.cancel_order || 0 }})</text>
				订单额：
				<text class="gray">{{ numObj.all_sum_money || 0 }}</text>
			</view>
			<view class="row-center">
				已结款：
				<text class="gray mgr15">{{ numObj.settled_order_sum || 0 }}(已结{{ numObj.settled_order || 0 }}单)</text>
				待结款：
				<text class="orange">{{ numObj.completed_order_sum || 0 }}(未结{{ numObj.completed_order || 0 }}单)</text>
			</view>
		</view>
		<view class="ordeList" v-if="!loading">
			<Empty v-if="!list.length" text="暂无订单"></Empty>
			<template v-else>
				<!-- 订单列表 -->
				<view v-for="item in list" :key="item.id"><Item :info="item" /></view>
				<uni-load-more :status="status" class="load" v-if="status == 'loading'" />
			</template>
		</view>
	</view>
</template>
<script>
//finish
import Item from './components/item';
export default {
	data() {
		return {
			yearArr: ['全部', '近半年', '近1年'],
			yearIndex:0,
			monthArr: [1,2,3,4,5,6,7,8,9,10,11,12],
			monthIndex:0,
			// 多选数据源
			selectArr: [
				{
					text: '已预定',
					value: 1
				},
				{
					text: '已完成(待结算)',
					value: 2
				},
				{
					text: '已结算',
					value: 3
				},
				{
					text: '取消',
					value: 4
				}
			],
			status: 'more',
			total: 0,
			loading: true,
			list: [],
			query: {
				status: [1, 2, 3, 4],
				month_time: '',
				keywords: '',
				page: 1,
				pagesize: 20
			},
			numObj: {
				all_count: 0, //订单数
				cancel_order: 0, //取消订单数
				all_sum_money: 0, //订单总额
				settled_order_sum: 0, //已结款总额
				settled_order: 0, //已结订单数
				completed_order_sum: 0, //待结款总额
				completed_order: 0 //待结款订单数
			},
		};
	},
	components: {
		Item
	},
	onLoad() {
		this.getDate()
		this.getList();
	},
	methods: {
		getDate(){
			let arr = []
			let date = new Date().getFullYear()+2
			for(let i=0;i<10;i++){
				date -= 1
				arr.push(date)
			}
			this.yearArr = this.yearArr.concat(arr)
		},
		yearChange(e) {
			console.log(e);
			this.yearIndex = e.detail.value*1
		},
		monthChange(e){
			this.monthIndex = e.detail.value*1
		},
		// 获取列表
		async getList(pageNum = 1) {
			this.query.page = pageNum;
			const { loading, list, query, navList,yearIndex,monthIndex,yearArr,monthArr } = this;
			let month_time  = ''
			if(yearIndex<3){
				month_time = yearIndex+1
			}else{
				month_time = yearArr[yearIndex]+'-'+(monthArr[monthIndex]<9?'0'+monthArr[monthIndex]:monthArr[monthIndex])
			}
			this.status = 'loading';
			let res = await this.$API.order.getList({
				...query,month_time
			});
			uni.hideLoading();
			let { list: clist, all_count, cancel_order, all_sum_money, settled_order_sum, settled_order, completed_order_sum, completed_order } = res;
			this.numObj = {
				all_count,
				cancel_order,
				all_sum_money,
				settled_order_sum,
				settled_order,
				completed_order_sum,
				completed_order
			};
			if (loading) {
				this.loading = false;
			}
			const { page } = query;
			if (page !== 1) {
				this.list = [...list, ...clist];
			} else {
				this.list = clist;
			}
			this.total = all_count;
			if (all_count > this.list.length) {
				this.status = 'more';
			} else {
				this.status = 'noMore';
			}
		}
	},
	onReachBottom() {
		// 下拉加载更多
		if (this.status === 'more') {
			this.getList(this.query.page + 1);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/static/scss/index.scss';
::v-deep .checklist-text {
	font-size: 24rpx !important;
}
::v-deep .uni-data-checklist .checklist-group .checklist-box {
	margin-right: 20rpx;
}
.main {
	padding: 20rpx;
	.date-box {
		padding-left: 80rpx;
		margin-bottom: 20rpx;
		.date-input {
			margin-left: 20rpx;
			border: 1px solid $border;
			width: 150rpx;
			height: 70rpx;
			border-radius: 8rpx;
			padding: 15rpx;
			font-size: 26rpx;
			color: $gray;
			margin-right: 20rpx;
		}
	}
	.search {
		font-size: 28rpx;
		.input {
			width: 400rpx;
			padding: 0 15rpx;
			height: 70rpx;
			border-radius: 8rpx;
			font-size: 26rpx;
			border: 1px solid $border;
			margin-left: 20rpx;
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

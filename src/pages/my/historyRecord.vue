<template>
	<view class="main column-center">
		<view class="boxOuter">
			<view class="row-start mgb20 search">
				关键词
				<view class="input row-start"><input type="text" placeholder="活动方,合作方" v-model="query.keywords" /></view>
			</view>
			<view class="time row-between">
				<view class="example-body row-start">
					<view class="date"><uni-datetime-picker type="date" v-model="query.start_month" placeholder="开始日期" size="mini" /></view>
					<view class="mgl10">至</view>
					<view class="date mgl10"><uni-datetime-picker type="date" v-model="query.end_month" placeholder="结束日期" /></view>
				</view>
				<view class="main-btn" @click="getList(1)">查询</view>
			</view>
		</view>
		<view class="boxOuter row-center price">累计报价：{{ total }}单</view>
		<view class="ordeList" v-if="!loading">
			<Empty v-if="!list.length" text='暂无数据'></Empty>
			<template v-else>
				<!-- 订单列表 -->
				<view v-for="item in list" :key="item.id"><Item :info="item" /></view>
				<uni-load-more :status="status" class="load" v-if="status == 'loading'" />
			</template>
			
		</view>
	</view>
</template>
<script>
//finish2
// 入参和返回数据有问题
import Item from './components/item';
export default {
	components: {
		Item
	},
	data() {
		return {
			status: 'more',
			total: 0,
			loading: true,
			list: [],
			query: {
				start_month: '',
				end_month: '',
				keywords: '',
				page: 1,
				pagesize: 20
			}
		};
	},
	onLoad() {
		this.$methods.showLoading();
		this.getList();
	},
	methods: {
		async getList(pageNum = 1) {
			this.query.page = pageNum;
			const { loading, list, query } = this;
			const { start_month, end_month } = query;
			if(start_month||end_month){
				if (!start_month) return this.$methods.showToast('请选择开始日期');
				if (!end_month) return this.$methods.showToast('请选择结束日期');
				if (new Date(end_month).getTime() < new Date(start_month).getTime()) return this.$methods.showToast('结束日期不能早于开始日期');
			}
			
			this.status = 'loading';
			let res = await this.$API.my.price_more({
				...query
			});
			uni.hideLoading();
			console.log(res);
			let { price_info: clist, all_count } = res;
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
::v-deep .uni-date__x-input {
	height: 60rpx;
	line-height: 60rpx;
	font-size: 24rpx;
}
::v-deep .uniui-calendar {
	display: none;
}
::v-deep .uni-date-x {
	width: 220rpx;
}
::v-deep .uni-date-editor--x .uni-date__icon-clear {
	border-width: 14rpx;
}

::v-deep .uni-date-x--border {
	border-color: $border;
}

.main {
	padding: 20rpx;
	.time {
		.main-btn {
			width: 120rpx;
			margin-left: 20rpx;
			border-radius: 8rpx;
			height: 60rpx;
			font-size: 26rpx;
		}
	}
	.input {
		width: 180rpx;
		padding: 0 15rpx;
		height: 60rpx;
		border-radius: 8rpx;
		font-size: 26rpx;
		border: 1px solid $border;
		box-sizing: content-box;
		margin-left: 20rpx;
		input {
			line-height: 40rpx;
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

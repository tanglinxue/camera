<template>
	<view class="content">
		<view class="navbar row-between">
			<view v-for="(item, index) in navList" :key="index" class="nav-item row-center" :class="{ current: tabCurrentIndex === index }" @click="tabClick(index)">
				{{ item.text }}
			</view>
		</view>
		<view>
			<template v-if="!loading">
				<Empty v-if="!list.length" text='暂无订单'></Empty>
				<template v-else>
					<!-- 订单列表 -->
					<view v-for="item in list" :key="item.id"><Item :info="item" /></view>
					<uni-load-more :status="status" class="load" v-if="query.page != 1" />
				</template>
			</template>
		</view>
	</view>
</template>

<script>
	//ok
import Item from './components/item.vue';
import Empty from '@/components/empty/index.vue';
export default {
	components: {
		Item,
		Empty
	},
	data() {
		return {
			tabCurrentIndex: 0,
			navList: [
				{
					state: 1,
					text: '全部'
				},
				{
					state: 2,
					text: '进行中'
				},
				{
					state: 3,
					text: '已完成'
				},
				{
					state: 4,
					text: '待评价'
				},
				{
					state: 5,
					text: '已取消'
				}
			],
			status: 'more',
			total: 0,
			loading: true,
			list: [],
			query: {
				page: 1,
				pagesize: 10
			},
			firstEnter:true
		};
	},
	onShow() {
		if(this.firstEnter){
			this.$methods.showLoading();
			this.firstEnter = false
		}
		this.refreshList();
	},

	methods: {
		// 获取列表
		async getList() {
			const { loading, list, query, navList, tabCurrentIndex } = this;
			this.status = 'loading';
			let { tech_order } = await this.$API.order.getList({
				...query,
				order_type: navList[tabCurrentIndex].state
			});
			uni.hideLoading()
			let { data: clist, total } = tech_order;
			if (loading) {
				this.loading = false;
			}
			const { page } = query;
			if (page !== 1) {
				this.list = [...list, ...clist];
			} else {
				this.list = clist;
			}
			this.total = total;
			if (total > this.list.length) {
				this.status = 'more';
			} else {
				this.status = 'noMore';
			}
		},

		//顶部tab点击
		tabClick(index) {
			if (index == this.tabCurrentIndex) return;
			this.$methods.showLoading();
			this.tabCurrentIndex = index;
			this.refreshList();
		},
		refreshList() {
			this.loading = true;
			this.query.page = 1;
			this.list = [];
			this.total = 0;
			this.getList();
		}
	},
	onReachBottom() {
		// 下拉加载更多
		if (this.status === 'more') {
			this.query.page = this.query.page + 1;
			this.getList();
		}
	},
	onPullDownRefresh() {
		this.refreshList()
		// 上拉刷新
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},
};
</script>

<style lang="scss" scoped>
@import '@/static/scss/index.scss';

.content {
	height: 100%;
	padding-top: 140rpx;
	.load {
		padding-bottom: 20rpx;
	}
	.navbar {
		width: 100%;
		height: 120rpx;
		padding: 0 15rpx;
		background: #fff;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		position: fixed;
		left: 0;
		top: 0;
		z-index:99999;
		
		.nav-item {
			flex: 1;
			height: 100%;
			font-size: 28rpx;
			position: relative;
			&.current {
				color: $greenColor;
				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 60rpx;
					height: 0;
					border-bottom: 6rpx solid $greenColor;
				}
			}
		}
	}
}
</style>

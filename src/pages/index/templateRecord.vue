<template>
	<view class="main">
		<view class="list boxOuter" v-for="(item, index) in list" :key="index"><view class="item">双机位+直播+包装</view></view>
		<uni-load-more :status="status" class="load" v-if="status == 'loading'" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			status: 'more',
			total: 0,
			loading: true,
			list: [],
			query: {
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
		async getList(time = 300) {
			const { loading, list, query } = this;
			this.status = 'loading';
			let { result_day, add_chance, date, filling, income_sum, line_time } = await this.$API.home.template_more({...query});
			uni.hideLoading();
			this.myScore = { add_chance, date, filling, income_sum, line_time };
			let { data: clist, total } = result_day;
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
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/static/scss/index.scss';
.main {
	padding: 20rpx;
	.list {
		padding: 0 20rpx;
		background: $white;
		.item {
			padding: 20rpx;
			font-size: 26rpx;
		}
	}
}
</style>

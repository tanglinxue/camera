<template>
	<view class="main">
		<view class="list boxOuter" v-for="(item, index) in list" :key="index">
			<view class="item">{{item.template_name}}</view>
		</view>
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
					pagesize: 2
				}
			};
		},
		onLoad() {
			this.$methods.showLoading();
			this.getList();
		},
		methods: {
			async getList(time = 300) {
				const {
					loading,
					list,
					query
				} = this;
				this.status = 'loading';
				let {
					temlate_info
				} = await this.$API.home.template_more({
					...query
				});
				uni.hideLoading();
				let {
					data: clist,
					total
				} = temlate_info;
				if (loading) {
					this.loading = false;
				}
				const {
					page
				} = query;
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

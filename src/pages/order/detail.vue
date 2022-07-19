<template>
	<Order :type="2" :detail="detail" :price_id="detail.price_id" :needBack='true' v-if='showCom'></Order>
</template>

<script>
// finish2
import Order from './components/order';
export default {
	components: {
		Order
	},
	data() {
		return {
			order_id: '',
			detail: {},
			showCom:false
		};
	},
	onLoad(options) {
		this.order_id = options.id;
		this.$methods.showLoading();
		this.getData();
	},
	methods: {
		async getData() {
			let { list: detail } = await this.$API.order.getDetail({ order_id: this.order_id });
			this.detail = detail;
			this.showCom = true
			uni.hideLoading();
		}
	}
};
</script>
<style lang="scss" scoped>
@import '@/static/scss/index.scss';
// 服务状态

::v-deep .order .uni-data-checklist .checklist-group .checklist-box .radio__inner {
	width: 24rpx;
	height: 24rpx;
}
::v-deep .order .checklist-text {
	font-size: 24rpx !important;
}
::v-deep .order .uni-data-checklist .checklist-group .checklist-box {
	margin-right: 10rpx;
}
// 日期
::v-deep .uni-date__x-input {
	height: 70rpx;
	line-height:70rpx;
	font-size: 28rpx;
}
::v-deep .uni-date-editor--x .uni-date__icon-clear {
	border-width: 18rpx;
}
::v-deep .uni-input-placeholder {
	font-size: 26rpx;
	text-align: center;
}

::v-deep .uni-date-x--border {
	border-color: $border;
}
::v-deep .checklist-text{
	font-size: 26rpx !important;
}
</style>

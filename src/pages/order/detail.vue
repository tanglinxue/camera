<template>
	<Order :type='2' :detail='detail' :price_id='detail.price_id'></Order>
</template>

<script>
import Order from './components/order'
export default {
	components:{
		Order
	},
	data() {
		return {	
			order_id:'',
			detail:{},
		};
	},
	onLoad(options){
		this.order_id = options.id;
		this.$methods.showLoading();
		this.getData();
	},
	methods:{
		async getData(){
			let {list:detail} = await this.$API.order.getDetail({ order_id: this.order_id });
			this.detail = detail
			uni.hideLoading();
		}
	}
};
</script>
<style lang="scss" scoped>
	::v-deep .uni-data-checklist .checklist-group .checklist-box {
		margin-right: 0 !important;
		padding-right: 10rpx;
	}
	::v-deep .uni-data-checklist .checklist-group .checklist-box .radio__inner {
		width: 24rpx;
		height: 24rpx;
	}
</style>
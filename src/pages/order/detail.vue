<template>
	<Order :type='type'>
		<view class="mgb30 row-start" slot="header">
			<view class='row-start'>
				<view class='left-text'>
					结算价
				</view>
				<view class="input-box row-center width200" ><input type="number"  class="input" :maxlength="11" /></view>
			</view>
			<view class='row-start mgl20'>
				<view class='left-text short-left-text'>
					尾款
				</view>
				<view class="input-box row-center width200" ><input type="number" class="input" :maxlength="11" /></view>
			</view>
		</view>
		<view class="mgb30 row-start" slot="footer">
			<view class='left-text'>
				服务状态
			</view>
			<view class="row-start order"><uni-data-checkbox :localdata="hobbys" v-model="hobby"/></view>
		</view>
	</Order>
</template>

<script>
import Order from './components/order'
export default {
	components:{
		Order
	},
	data() {
		return {
			hobbys: [
				{
					text: '已预订',
					value: 0
				},
				{
					text: '已完成(待结算)',
					value: 1
				},
				{
					text: '已结算',
					value: 2
				},
				{
					text: '取消',
					value: 3
				}
			],
			hobby:1,
			type:2
		};
	},
};
</script>
<style lang="scss" scoped>
@import './style/order.scss';
::v-deep .order .uni-data-checklist .checklist-group .checklist-box {
	margin-right: 0;
	padding-right: 10rpx;
}
::v-deep .uni-data-checklist .checklist-group .checklist-box .radio__inner {
	width:24rpx;
	height:24rpx;
}
.short-left-text{
	width:100rpx !important
}
</style>
<template>
	<Order :price_id='price_id' :detail='detail'/>
</template>

<script>
import Order from './components/order'
export default {
	components:{
		Order
	},
	data(){
		return {
			price_id:'',
			detail:{}
		}
	},
	onLoad(options) {
		this.price_id = options.id;
		this.detail = JSON.parse(options.detail)
	}
};
</script>
<style lang="scss" scoped>
@import '@/static/scss/index.scss';

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


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

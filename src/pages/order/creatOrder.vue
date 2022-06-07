<template>
	<Order :price_id='price_id'/>
</template>

<script>
import Order from './components/order'
export default {
	components:{
		Order
	},
	data(){
		return {
			price_id:''
		}
	},
	onLoad(options) {
		this.price_id = options.id;
	}
};
</script>

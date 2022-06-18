<template>
	<view class="content" v-if='list.length'>
		<view class="mgb20 listItem" v-for="(item, index) in list" :key="index">
			<reduceCom :info="item" :deleteIcon='true' :nodeid='nodeid'>
			</reduceCom>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
import reduceCom from './reduceCom';
export default {
	props: {
		nodeid:{
			type:Number,
			default:0
		}
	},
	components: {
		reduceCom,
	},
	computed: {
		...mapState('service', ['dynamicInfo']),
		list(){
			const {nodeid,dynamicInfo} = this;
			return dynamicInfo[nodeid]
		},
		
	}
};
</script>

<style lang="scss" scoped>
@import '@/static/scss/common.scss';
</style>
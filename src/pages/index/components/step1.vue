<template>
	<view class='main'>
		<view class='title'>摄影</view>
		<view class='mgb20'>
			<reduceCom/>
		</view>
		<view class='mgb20'>
			<reduceCom/>
		</view>
		<view class='title'>站架合影</view>
	</view>
	
</template>

<script>
import reduceCom from './reduceCom'
export default{
	components:{
		reduceCom
	}
}
</script>

<style lang="scss" scoped>
@import '@/static/scss/index.scss';

.main{
	background:#fff;
	padding:30rpx;
	.title{
		font-weight: bold;
		margin-bottom: 30rpx;
	}
}
</style>
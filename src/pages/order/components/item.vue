<template>
	<view class="boxOuter" @click='jump'>
		<view class='txt borderbottom row-between'><view>执行时间：<text>{{info.start_time.split(' ')[0]}}</text></view><view class='green'>{{info.status | getStatusName}}</view></view>
		<view class='txt'>活动名称：<text>{{info.case_name}}</text></view>
		<view class='txt'>主办方：<text>{{info.case_host}}</text></view>
		<view class='txt'>金额：<text>{{info.real_money}}</text></view>	
	</view>
</template>

<script>
// finish
export default {
	props: {
		info: {
			type: Object,
			default: () => {}
		}
	},
	filters:{
		getStatusName(status){
			switch(status){
				case 1:
					return '已预定';
				case 2:
					return '已完成（待结算）';
				case 3:
					return '已结算';
				case 4:
					return '取消'
			}
		}
	},
	methods:{
		jump(){
			this.$jump(`/pages/order/detail?id=${this.info.id}`);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/static/scss/index.scss';
.boxOuter {
	font-size: 26rpx;
	padding:15rpx 20rpx;
	.txt{
		padding:5rpx 0;
		&:first-child{
			padding-bottom:15rpx;
		}
		text{
			color:$gray
		}
	}
	
}
</style>

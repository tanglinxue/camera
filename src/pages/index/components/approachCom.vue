<template>
	<view class="row-between time mgb0">
		<view class="txt1 mgr15 row-start">{{ info.name +'：'}} 
			<template v-if="info.id">
				<view class="gray normal mgl10">
					¥{{ info.unit_price }}
					<template v-if="info.unit">
						/{{ info.unit }}
					</template>
				</view>
				<uni-icons type="compose" size="20" color="#919191" class="mgl15 normal" @click="open(info)"></uni-icons>
			</template>
		</view>
		<view class='row-start'>
			<view class="radio row-start"  @click='select(0)'>
				<image :src="currentIndex==0?'/static/common/icon-radio-sel.png':'/static/common/icon-radio.png'" class="icon"></image>
				<text class="txt">否</text>
			</view>
			<view class="radio row-start mgl30" @click='select(1)'>
				<image :src="currentIndex==1?'/static/common/icon-radio-sel.png':'/static/common/icon-radio.png'" class="icon"></image>
				<text class="txt">是</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		info:{
			type:Object,
			default:()=>({})
		}
	},
	data(){
		return {
			currentIndex:-1
		}
	},
	methods:{
		open(info){
			this.$bus.$emit('openPopup',{...info,type:2})
		},
		select(index){
			if(this.currentIndex == index){
				return this.currentIndex =-1
			}
			this.currentIndex = index
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/static/scss/index.scss';
.time {
	margin-bottom: 20rpx;
	font-size: 24rpx;
	color: $mainBlack;
	font-weight: bold;
	padding-left: 20rpx;
	.radio {
		margin-right: 20rpx;
		.icon {
			width: 26rpx;
			height: 26rpx;
			margin-right: 8rpx;
		}
	}
}
</style>

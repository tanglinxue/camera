<template>
	<view class="row-start time mgb0">
		<view class="txt1 mgr15 ">{{ name }}</view>
		<view class="radio row-start" v-for="(info,index) in options" :key="info.id" @click.stop="select(info.id,index)">
			<image :src="currentIndex==index?'/static/common/icon-radio-sel.png':'/static/common/icon-radio.png'" class="icon"></image>
			<text class="txt">{{ info.name }}</text>
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
	</view>
</template>

<script>
export default {
	props: {
		options: {
			type: Array,
			default: () => []
		},
		name: {
			type: String,
			default: ''
		},
		currentIndex:{
			type:Number,
			default:-1
		}
	},
	methods:{
		open(info){
			this.$bus.$emit('openPopup',{...info,type:2})
		},
		select(id,index){
			if (this.currentIndex == index) {
				return this.$store.commit('service/changeStep4Index',{id:0,index:1})
			}
			this.$store.commit('service/changeStep4Index',{id,index:index+2})
		},
		numTap(num){
			console.log(num)
			this.$store.commit('service/changeServiceObj',{num,item_id:this.info.id,updateNum:true})
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

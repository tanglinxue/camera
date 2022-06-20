<template>
	<view class="row-start time mgb0">
		<view class="txt1 mgr15 ">{{ name }}</view>
		<view class="radio row-start" v-for="(info,index) in options" :key="info.id" @click.stop="select(info.id,index)">
			<image :src="currentIndex==index && info.num?'/static/common/icon-radio-sel.png':'/static/common/icon-radio.png'" class="icon"></image>
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
//finish	
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
		},
		selectType:{
			type:String,
			default:''
		}
	},
	methods:{
		open(info){
			// 打开编辑弹窗
			this.$bus.$emit('openPopup',{...info,type:2})
		},
		select(id,index){
			const type = this.selectType;
			let upId = 0;
			let upIndex = 1;
			if (this.currentIndex != index) {
				upId = id
				upIndex = index + 2
			}
			if(type=='spzz_djs'){
				this.$store.commit('service/changeIndex',{id:upId,index:upIndex,type,arr:['403','404']})
			}
			if(type=='sp_tcjr'){
				this.$store.commit('service/changeIndex',{id:upId,index:upIndex,type,arr:['206','207'],needAdd:true})
			}
			if(type=='sp_sszm'){
				this.$store.commit('service/changeIndex',{id:upId,index:upIndex,type,arr:['233','234'],needAdd:true})
			}
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

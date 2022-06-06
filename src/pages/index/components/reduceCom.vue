<template>
	<view>
		<view class="row-between info">
			<view class="row-start left-text">
				<text class='name'>{{ info.name || '' }}：</text>
				<template v-if='!info.hidePrice'>
					<text>{{ '¥' + (info.unit_price || 0)}}<template v-if='info.unit'>/{{ info.unit || ''}}</template></text>
					<uni-icons type="compose" size="22" color="#919191" class="mgl15" @click="open"></uni-icons>
					<uni-icons type="close" size="22" color="#919191" class="mgl15" v-if='deleteIcon' @click='deleteTap'></uni-icons>
				</template>
			</view>	
			<view v-if="info.type == 'input'" class='input-box'>
				<input  v-model="info.num" type="number" @input="inputTap"/>
			</view>	
			<uni-number-box  :min="0" :max="99" v-model="info.num * 1" v-else-if='info.type !== "noNum"' @input='numTap' />
		</view>
		<slot name="footer" v-if='info.footer'></slot>
		<slot name="warn" v-if='info.warn'></slot>	
	</view>
</template>

<script>
export default {
	props: {
		info: {
			type: Object,
			default: () => ({
			})
		},
		deleteIcon:{
			type:Boolean,
			default:false
		},
		nodeid:{
			type:Number,
			default:0
		}
	},
	data(){
		return {
			showPopup:false
		}
	},
	methods: {
		open(){
			let canConfig = this.deleteIcon?true:false
			this.$bus.$emit('openPopup',{...this.info,canConfig,type:2,nodeid:this.nodeid})
		},
		// 删除
		async deleteTap(){
			await this.$methods.showModal('确认删除该自定义项目？')
			this.$methods.showLoading('删除中...');
			const {item_id} = await this.$API.home.edit_dynamic({
				item_id:this.info.id,
				node_id:this.nodeid,
				type:3
			});
			this.$methods.showToast('删除成功');
			this.$store.commit('service/deleteDynamicObj',{id:this.info.id,nodeid:this.nodeid})
		},
		inputTap(e){
			console.log(e)
			let val = e.detail.value;
			val = val.replace(/^(0+)|[^\d]+/g,'')
			this.$nextTick(()=>{
				
			})
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
.info {
	background: $grayS;
	padding: 15rpx 20rpx;
	.left-text {
		font-size: 26rpx;
		color: $gray;
		height: 70rpx;
		.name {
			font-size: 28rpx;
			font-weight: bold;
			color: $mainBlack;
		}
	}
	.input-box {
		background: #fff;
		width: 200rpx;
		padding: 10rpx 20rpx;
		height:64rpx;
		margin-right: 100rpx;
		input {
			width: 100%;
			height: 100%;
		}
	}
}
</style>

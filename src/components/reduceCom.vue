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
			<view v-if="info.type == 'input' " class='input-box'>
				<input  :value="info.num" type='number' @input="inputTap" ref="input"/>
			</view>	
			<uni-number-box  :min="0" :max="99" v-model="info.num * 1" v-else-if='!info.noNum' @input='numTap' />
		</view>
		<slot name="footer" v-if='info.footer'></slot>
		<slot name="warn" v-if='info.warn'></slot>	
	</view>
</template>

<script>
//finish	
export default {
	props: {
		info: {
			type: Object,
			default: () => ({})
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
			let canConfig = this.deleteIcon ? true:false;
			const {info,nodeid} = this;
			this.$bus.$emit('openPopup',{...info,canConfig,nodeid,type:2})
		},
		// 删除
		async deleteTap(){
			const {info:{id},nodeid} = this;
			await this.$methods.showModal('确认删除该自定义项目？')
			this.$methods.showLoading('删除中...');
			const {item_id} = await this.$API.home.edit_dynamic({
				item_id:id,
				node_id:nodeid,
				type:3
			});
			this.$methods.showToast('删除成功');
			this.$store.commit('service/deleteDynamicObj',{id,nodeid})
		},
		inputTap(e){
			let val = e.detail.value;
			val = val.replace(/^(0+)|[^\d]+/g,'')
			const {id,parentId} = this.info;
			let params = {num:val,item_id:id,updateNum:true}
			if(parentId){
				params.parentId = parentId;
			}
			this.$nextTick(()=>{
				this.$store.commit('service/changeServiceObj',params)
			})	
		},
		numTap(num){
			const {id,parentId} = this.info;
			let {nodeid,deleteIcon} = this;
			let params = {num,item_id:id,updateNum:true}
			if(parentId){
				params.parentId = parentId;
			}
			if(deleteIcon){
				params.node_id = nodeid
				this.$store.commit('service/changeDynamicObj',params)
			}else{
				this.$store.commit('service/changeServiceObj',params)
			}
			
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

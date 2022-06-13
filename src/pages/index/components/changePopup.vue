<template>
	<uni-popup ref="popup" type="center" background-color="#fff" :animation="false">
		<view class="popup column-center">
			<view class="title">{{query.type==1?'新增服务项目':'修改项目设置'}}</view>
			<view class="row-start form-item">
				<view class="label">
					名称
					<text class="red">*</text>
				</view>
				<view class="input-box"><input type='text' placeholder="请输入" class="input" v-model="query.name" /></view>
			</view>
			<view class="row-start form-item">
				<view class="label">
					价格(元)
					<text class="red">*</text>
				</view>
				<view class="input-box"><input placeholder="请输入" class="input" v-model="query.unit_price" type="number" @input="inputTap" /></view>
			</view>
			<view class="row-start form-item">
				<view class="label">计价单位</view>
				<view class="input-box"><input type='text' placeholder="请输入" class="input" v-model="query.unit" /></view>
			</view>
			<view class="row-between btn-box">
				<view class="small-btn" @click="submit">确定</view>
				<view class="small-btn" @click="close">取消</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
//finish
export default {
	data() {
		return {
			query: {
				name: '',
				unit_price: '',
				unit: '',
				type: 2,
				item_id: 0
			},
			canConfig:true,
		};
	},
	mounted() {
		// 打开弹窗
		this.$bus.$on('openPopup', this.openPopup);
	},
	methods: {
		close() {
			this.$refs.popup.close();
		},
		openPopup(info) {
			const { name,unit_price,unit,type,id,nodeid,canConfig} = info;
			let query = { name,unit_price,unit,type};
			if(canConfig){	
				// 动态配置项目
				this.canConfig = true
				if(type==1){
					query.days = 1
				}else if(type == 2){
					//编辑
					query.item_id = id
				}else if(type ==3){
					query = {
						item_id:id
					}
				}
				query.node_id = nodeid;
			}else{
				//固有项目
				this.canConfig = false
				query.item_id = id
			}
			this.query = query;
			this.$nextTick(() => {
				this.$refs.popup.open();
			});
		},
		inputTap(e){
			let val = e.detail.value;
			val = val.replace(/^(0+)|[^\d]+/g,'')
			this.$nextTick(()=>{
				this.query.unit_price = val*1
			})
		},
		async submit() {
			const {query,canConfig} = this
			const {type} = query;
			let title = `更新中...`
			if(type==1){
				title = `新增中...`
			}
			this.$methods.showLoading(title);
			let API = canConfig?this.$API.home.edit_dynamic:this.$API.home.edit_item		
			const {item_id} = await API(query);
			let toast = `更新成功`
			if(type==1){
				toast = `新增成功`
				this.$store.commit('service/addDynamicObj',{...query,id:item_id})
			}else if(type==2){		
				if(!canConfig){
					this.$store.commit('service/changeServiceObj',query)
				}else{
					this.$store.commit('service/changeDynamicObj',query)
				}		
			}
			this.$methods.showToast(toast);
			this.$refs.popup.close();	
		}
	}
};
</script>
<style lang="scss" scoped>
@import '@/static/scss/index.scss';
.popup {
	padding: 30rpx;
	font-size: 26rpx;
	width: 500rpx;
	.title {
		margin-bottom: 20rpx;
		font-size: 30rpx;
	}
	.form-item {
		margin-bottom: 30rpx;
		.label {
			width: 150rpx;
			text-align: right;
			margin-right: 20rpx;
		}
		.input-box {
			border: 1px solid $border;
			flex: 1;
			padding: 10rpx 20rpx;
		}
	}
	.btn-box {
		width: 60%;
	}
}
</style>

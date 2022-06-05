<template>
	<uni-popup ref="popup" type="center" background-color="#fff" :animation="false">
		<view class="popup column-center">
			<view class="title">修改项目设置</view>
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
export default {

	data() {
		return {
			query: {
				name: '',
				unit_price: '',
				unit: '',
				type: 2,
				item_id: 0
			}
		};
	},
	mounted() {
		this.$bus.$on('openPopup', this.openPopup);
	},
	methods: {
		close() {
			this.$refs.popup.close();
		},
		openPopup(info) {
			const { name, unit_price, unit, type, id,nodeid } = info;
			let query = { name, unit_price, unit, type};
			if (type == 1) {
				// 新增
				query.node_id = nodeid;
			}else{
				query.item_id = id
			}
			this.query = query;
			this.$nextTick(() => {
				this.$refs.popup.open();
			});
		},
		inputTap(e){
			console.log(e)
			let val = e.detail.value;
			val = val.replace(/^(0+)|[^\d]+/g,'')
			this.$nextTick(()=>{
				this.query.unit_price = val*1
			})
		},
		async submit() {
			const type = this.query.type;
			let title = `更新中...`
			if(type==1){
				title = `新增中...`
			}
			this.$methods.showLoading(title);
			// const data = await this.$API.home.edit_item(this.query);
			
			const data = await this.$API.home.edit_dynamic(this.query);
			let toast = `更新成功`
			if(type==1){
				toast = `新增成功`
			}else{
				this.$store.commit('service/changeServiceObj',this.query)
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

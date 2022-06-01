<template>
	<uni-popup ref="popup" type="center" background-color="#fff">
		<view class="popup column-center">
			<view class="title">修改项目设置</view>
			<view class="row-start form-item">
				<view class="label">
					名称
					<text class="red">*</text>
				</view>
				<view class="input-box"><input placeholder="请输入" class="input" /></view>
			</view>
			<view class="row-start form-item">
				<view class="label">
					价格
					<text class="red">*</text>
				</view>
				<view class="input-box"><input placeholder="请输入" class="input" /></view>
			</view>
			<view class="row-start form-item">
				<view class="label">计价单位</view>
				<view class="input-box"><input placeholder="请输入" class="input" /></view>
			</view>
			<view class="row-between btn-box">
				<view class="small-btn">确定</view>
				<view class="small-btn">取消</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
	export default{
		props:{
			value:{
				type:Boolean,
				default:false
			}
		},
		watch:{
			value(val){
				console.log(val)
				if(val){
					this.$refs.popup.open();
				}else{
					this.$refs.popup.close();
				}
			}
		}
	}
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
			padding: 5rpx 10rpx;
		}
	}
	.btn-box {
		width: 60%;
	}
}

</style>

<template>
	<view>
		<view class="row-between info">
			<view class="row-start left-text">
				<text>{{ info.name }}</text>
				<template v-if="info.placeholder">
					{{ info.placeholder }}
				</template>
				<uni-icons type="compose" size="22" color="#919191" class="mgl15" @click="open" v-if="info.placeholder"></uni-icons>
			</view>
      <input v-if="info.type=='input'" style="background:#fff;width:200rpx;margin-right: 100rpx;padding-left: 20rpx;">
			<uni-number-box v-else-if="!info.hideBtn" style='scale: 0.9;'/>
		</view>
		<slot name="footer"></slot>
    <slot name="warn"></slot>
		<uni-popup ref="popup" type="center" background-color="#fff">
			<view class="popup column-center">
				<view class="title">修改项目设置</view>
				<view class="row-start form-item">
					<view class='label'>名称<text class='red'>*</text></view>
					<view class='input-box'>
						<input placeholder="请输入" class="input" />
					</view>
				</view>
				<view class="row-start form-item">
					<view class='label'>价格<text class='red'>*</text></view>
					<view class='input-box'>
						<input placeholder="请输入" class="input" />
					</view>
					
				</view>
				<view class="row-start form-item">
					<view class='label'>计价单位</view>
					<view class='input-box'>
						<input placeholder="请输入" class="input" />
					</view>
				</view>
				<view class='row-between btn-box'>
					<view class="small-btn">确定</view>
					<view class="small-btn">取消</view>
				</view>
				
			</view>
		</uni-popup>
	</view>
</template>

<script>
export default {
	props: {
		info: {
			type: Object,
			default: () => {}
		}
	},
	methods: {
		open() {
			this.$refs.popup.open();
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/static/scss/index.scss';
.popup{
	padding:30rpx;
	font-size: 26rpx;
	width:500rpx;
	.title{
		margin-bottom: 20rpx;
		font-size:30rpx;
		
	}
	.form-item{
		margin-bottom: 30rpx;
		.label{
			width: 150rpx;
			text-align: right;
			margin-right: 20rpx;
		}
		.input-box{
			border: 1px solid $border;
			flex:1;
			padding:5rpx 10rpx
		}
	}
	.btn-box{
		width:60%
	}
}

.info {
	background: $grayS;
	padding: 15rpx 20rpx;
	.left-text {
		font-size: 26rpx;
		color: $gray;
		height: 70rpx;
		text {
			font-size: 28rpx;
			font-weight: bold;
			color: $mainBlack;
		}
	}
}
</style>

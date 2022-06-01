<template>
	<view>
		<view class="row-between info">
			<view class="row-start left-text">
				<text class='name'>{{ info.name }}：</text>
				<template v-if='!info.hidePrice'>
					<text>{{ '¥' + info.unit_price }}<template v-if='info.unit && info.unit_price'>/</template>{{ info.unit }}</text>
					<uni-icons type="compose" size="22" color="#919191" class="mgl15" @click="open"></uni-icons>
				</template>
			</view>	
			<view v-if="info.type == 'input'" class='input-box'>
				<input  v-model="info.num" type="number"/>
			</view>	
			<uni-number-box style="scale: 0.9;" :min="0" :max="99" :value="info.num * 1" v-else-if='info.type !== "noNum"'/>
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
				name: '',
				unit_price: 0,
				unit: ''
			})
		}
	},
	data(){
		return {
			showPopup:false
		}
	},
	methods: {
		open(){
			this.$bus.$emit('openPopup','你好')
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
		height: 100%;
		margin-right: 100rpx;
		input {
			width: 100%;
			height: 100%;
		}
	}
}
</style>

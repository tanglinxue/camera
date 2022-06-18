<template>
	<view class="row-between time mgb0">
		<view class="txt1 mgr15 row-start">
			<text v-if="info.name">{{ info.name }}：</text>
			<template v-if="info.id">
				<view class="gray normal mgl10">
					¥{{ info.unit_price || 0 }}
					<template v-if="info.unit">
						/{{ info.unit || '' }}
					</template>
				</view>
				<uni-icons type="compose" size="20" color="#919191" class="mgl15 normal" @click="open(info)"></uni-icons>
			</template>
		</view>
		<view class="row-start">
			<view class="radio row-start mgl30" @click="select">
				<image :src="info.num ? '/static/common/icon-radio-sel.png' : '/static/common/icon-radio.png'" class="icon"></image>
				<text class="txt">是</text>
			</view>
		</view>
	</view>
</template>

<script>
//finish
export default {
	props: {
		info: {
			type: Object,
			default: () => ({})
		}
	},
	methods: {
		open(info) {
			//打开编辑弹窗
			this.$bus.$emit('openPopup', { ...info, type: 2 });
		},
		select() {
			let {num,id} = this.info;
			this.$store.commit('service/changeServiceObj', { num: num ? 0 : 1, item_id:id, updateNum: true });
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

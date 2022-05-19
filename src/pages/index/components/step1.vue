<template>
	<view class="main">
		<view class="content">
			<view class="title">摄影</view>
			<view class="mgb20" v-for="(item, index) in list" :key="index"><reduceCom :info="item" /></view>
			<view class="title">站架合影</view>
			<view class="tips-content row-start">
				<image class="icon" src="/static/common/icon-tips.png"></image>
				【服务包含】站架、运输、搭建、拍摄、修图
			</view>
			<view class="warning mgb30">
				【温馨提示】第一排椅子数
				<text class="red">0</text>
				（预估），客户让酒店提供
			</view>
			<view class="mgb20" v-for="(item, index) in list2" :key="index">
				<reduceCom :info="item">
					<view slot="footer" class="footer">{{ item.footer }}</view>
				</reduceCom>
			</view>
			<view class="row-start box">
				<view class="column-center item" v-for="(item, index) in options" :key="index">
					<view class="name font24">{{ item.name }}</view>
					<view class="tips font20 gray">{{ item.tips }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import reduceCom from './reduceCom';
export default {
	components: {
		reduceCom
	},
	data() {
		return {
			list: [
				{
					name: '照片直播：',
					placeholder: '¥2500/机位'
				},
				{
					name: '传统摄影：',
					placeholder: '¥1500/机位'
				}
			],
			list2: [
				{
					name: '人数：',
					placeholder: '¥10/人',
					footer: '注：200人以内，按200人计费'
				},
				{
					name: '冲印：（张数）',
					footer: '注：50张起步，不足按50张计费，400人以上合影冲印另计'
				}
			],
			options: [
				{
					value: '1',
					name: '塑封',
					tips: '¥25/张',
					price: '25'
				},
				{
					value: '2',
					name: '盒装',
					tips: '¥25/张',
					price: '25'
				},
				{
					value: '3',
					name: '其他',
					tips: '费用另计',
					price: '费用另计'
				}
			]
		};
	}
};
</script>

<style lang="scss" scoped>
@import '../style/common.scss';

</style>

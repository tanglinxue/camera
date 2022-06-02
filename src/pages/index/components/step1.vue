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
				<view class="column-center item" :class='{"acitve":index===currentIndex}' v-for="(item, index) in list3" :key="index"  @click.stop='select(index)'>
					<view class="name font24">{{ item.name }}</view>
					<view class="tips font20">¥{{ item.unit_price }}/{{ item.unit }}</view>
					<uni-icons type="compose" size="20" color="#919191" class="mgl15 normal edit-icon" @click.stop.prevent="open(item)"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import reduceCom from './reduceCom';
import { mapState } from 'vuex';
export default {
	components: {
		reduceCom
	},
	data(){
		return {
			currentIndex:-1
		}
	},
	computed: {
		...mapState('service', ['serviceInfo']),
		list() {
			const serviceInfo = this.serviceInfo;
			return [{...serviceInfo['101'],id:101}, {...serviceInfo['102'],id:102}];
		},
		list2() {
			const serviceInfo = this.serviceInfo;
			return [
				{
					id:111,
					...serviceInfo['111'],
					footer: '注：200人以内，按200人计费',
					type: 'input'
				},
				{
					name: '冲印：（张数）',
					footer: '注：50张起步，不足按50张计费，400人以上合影冲印另计',
					type: 'input',
					hidePrice:true,
				}
				
			];
		},
		list3(){
			const serviceInfo = this.serviceInfo;
			return [
				{
					id:112,
					...serviceInfo['112'],
				},
				{
					id:113,
					...serviceInfo['113'],
				},
				{
					id:114,
					...serviceInfo['114'],
				}
			];
		}
	},
	methods:{
		open(info){
			this.$bus.$emit('openPopup',{...info,type:2})
		},
		select(index){
			if(this.currentIndex == index){
				return this.currentIndex =-1
			}
			this.currentIndex = index
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../style/common.scss';
</style>

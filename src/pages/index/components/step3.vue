<template>
	<view class="main">
		<view class='content'>
			<view class="mgb20 listItem" v-for="(item, index) in list" :key="index"><reduceCom :info="item" /></view>
		</view>
		<view class='content'>
			<view class="title">快剪<text>（当天出片）</text></view>
			<view class="mgb20 listItem" v-for="(item, index) in list2" :key="index">
				<reduceCom :info="item">	
				</reduceCom>
			</view>
		</view>
		<view class='content'>
			<view class="title">慢剪<text>（3天出片）</text></view>
			<view class="mgb20 listItem" v-for="(item, index) in list3" :key="index">
				<reduceCom :info="item">
					<view slot="footer" class="footer">{{ item.footer }}</view>
				</reduceCom>
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
	computed: {
		...mapState('service', ['serviceInfo']),
		list() {
			const serviceInfo = this.serviceInfo;
			return [
				{ ...serviceInfo['301'], id: 301 },
				{ ...serviceInfo['302'], id: 302 },		
			];
		},
		list2() {
			const serviceInfo = this.serviceInfo;
			return [
				{ ...serviceInfo['311'], id: 311 },
				{ ...serviceInfo['312'], id: 312 },		
			];
		},
		list3() {
			const serviceInfo = this.serviceInfo;
			return [
				{ ...serviceInfo['321'], id: 321,footer: '注：流程素材，简单拼接（含背景音乐）' },
				{ ...serviceInfo['322'], id: 322,footer: '注：流程素材，特效拼接（含背景音乐）' },		
			];
		}
	},

};
</script>

<style lang="scss" scoped>
@import '../style/common.scss';


</style>

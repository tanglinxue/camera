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
export default {
	components: {
		reduceCom
	},
	data() {
		return {
			list: [
				{
					name: '游机：',
					placeholder: '¥2500/个'
				},
				{
					name: '延时：',
					placeholder: '¥1500/个'
				}
			],
			list2: [
				{
					name: '15秒（条数）：',
					placeholder: '¥600/条'
				},
				{
					name: '30秒（条数）：',
					placeholder: '¥800/条'
				}
			],
			list3: [
				{
					name: '粗剪：',
					placeholder: '¥800/条',
					footer: '注：流程素材，简单拼接（含背景音乐）'
				},
				{
					name: '精剪：',
					placeholder: '¥1600/条',
					footer: '注：流程素材，简单拼接（含背景音乐）'
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

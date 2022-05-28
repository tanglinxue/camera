<template>
	<view class="main">
		<view class="content">
			<view class="mgb20 listItem" v-for="(item, index) in list" :key="index"><reduceCom :info="item" /></view>
		</view>
		<view class="content">
			<view class="row-start time">
				<view class='txt1 mgr15'>倒计时：</view>
				<view class='radio row-start'>
					<image src='/static/common/icon-radio.png' class='icon'></image>
					<text class='txt'>通用</text>
					￥500/条
				  <uni-icons type="compose" size="22" color="#919191" class="mgl15" ></uni-icons>
				</view>
				<view class='radio row-start'>
					<image src='/static/common/icon-radio-sel.png' class='icon'></image>
					<text class='txt'>定制</text>
				</view>
			</view>
			<view class="mgb20 listItem" v-for="(item, index) in list2" :key="index"><reduceCom :info="item"></reduceCom></view>
		</view>
		<view class="content">
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
			// 单选数据源
			sexs: [
				{
					text: '通用',
					value: 0
				},
				{
					text: '定制',
					value: 1
				}
			],
			list: [
				{
					name: '动态主KV(条数)：',
					placeholder: '¥600/条'
				},
				{
					name: '启动视频(条数)：',
					placeholder: '¥2000/条'
				}
			],
			list2: [
				{
					name: '数量：'
				}
			],
			list3: [
				{
					name: '舞美视频(条数)：',
					placeholder: '¥0/条'
				},
				{
					name: '宣传视频(条数)：',
					placeholder: '¥0/条',
					footer: '注：访谈视频、素材剪辑、特效视频、短片拍摄等'
				}
			]
		};
	}
};
</script>

<style lang="scss" scoped>
@import '../style/common.scss';
</style>

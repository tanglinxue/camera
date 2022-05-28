<template>
	<view class="main">
		<view class="content">
			<view class="mgb20 listItem" v-for="(item, index) in list" :key="index"><reduceCom :info="item">
			<view slot="footer" class="footer">{{ item.footer }}</view><view slot="warn" class="red footer">{{ item.warn }}</view></reduceCom></view>
      
		</view>
		
		<view class="content">
			<view class="mgb20 listItem" v-for="(item, index) in list2" :key="index"><reduceCom :info="item">
			<view slot="footer" class="footer">{{ item.footer }}</view></reduceCom></view>
		</view>
		
		<view class="content">
			<view class="row-start time mgb0 pd30">
				<view class="txt1 mgr15">提前一天进场：</view>
				<view class="radio row-start">
					<image src="/static/common/icon-radio.png" class="icon"></image>
					<text class="txt">是</text>
				</view>
				<view class="radio row-start">
					<image src="/static/common/icon-radio-sel.png" class="icon"></image>
					<text class="txt">否</text>
				</view>
			</view>
		</view>
		
		<view class="content">
			<view class="title">增选项</view>
			<view class="mgb20 listItem" v-for="(item, index) in list3" :key="index">
      <reduceCom :info="item">
			  <view slot="footer" class="footer">{{ item.footer }}</view>
        <view slot="warn" class="red">{{ item.footer }}</view>
      </reduceCom>
      </view>
			<view class="row-start time mgb0">
				<view class="txt1 mgr15">实时字幕：</view>
				<view class="radio row-start">
					<image src="/static/common/icon-radio.png" class="icon"></image>
					<text class="txt">无</text>
				</view>
				<view class="radio row-start">
					<image src="/static/common/icon-radio-sel.png" class="icon"></image>
					<text class="txt">字幕</text>
				</view>
				<view class="radio row-start">
					<image src="/static/common/icon-radio-sel.png" class="icon"></image>
					<text class="txt">翻译</text>
				</view>
			</view>
			<view class="footer">注：字幕准确率80%</view>
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
					name: '摄像：',
					placeholder: '¥3500/个'
				},
				{
					name: '导播：',
					placeholder: '¥3500/个',
					footer:'注：多画面视频信号切换(含导播台、录机、通话系统、导播师)'
				},
				{
					name: '直播服务：',
					placeholder: '￥3500/场',
					footer:'服务包含：直播设备、技术服务、并发200人直播间1个；',
          warn:'并发:直播间同时在线观看最高人数(如需扩容，另计费)'
				}
			],
			list2:[
				{
					name: '连线服务(基础版)',
					placeholder: '￥3500/场',
				},
				{
					name: '连线服务(定制版)',
					placeholder: '￥8500/场'
				}
			],
			list3:[
				{
					name: '技术统筹：',
					placeholder: '￥2000/场',
				},
				{
					name: '摇臂：',
					placeholder: '￥3500/个',
				},
				{
					name: '航拍：',
					placeholder: '￥2000/个',
				},
				{
					name: '画面包装：',
					placeholder: '￥1500/个',
					footer:'注：人+PPT开窗、人名条、视频插播、滚屏信息等'
				},
				{
					name: '调色：',
					placeholder: '￥3500/个'
				},
				{
					name: '4G聚合网络：',
					placeholder: '￥1000/个',
				},
				{
					name: '便携基站网络：',
					placeholder: '￥8000/台',
					footer:'注：上下行带宽稳定在100M'
				},
				{
					name: '虚拟背景：',
					placeholder: '￥2000/场',
				},
				{
					name: '虚拟舞台：',
					placeholder: '￥12000/场',
				},
				{
					name: '音控：',
					placeholder: '￥1500/个',
				},
				{
					name: '收声麦：',
					placeholder: '￥300/场',
				},
				{
					name: '屏控：',
					placeholder: '￥2500/场',
					footer:'注：大屏画面切换(含大屏切换、画面调度两名技术员)'
				},
				{
					name: '上门连线：',
					placeholder: '￥3500/组',
					footer:'注：摄像1个、连接技术服务'
				},
				{
					name: '灯光：',
					placeholder: '￥500/灯'
				},
				{
					name: '55寸电视：',
					placeholder: '￥800/台',
					footer:'注：电视、支架、线材、装运(2台起送)'
				},
			]
		
	
		};
	}
};
</script>

<style lang="scss" scoped>
@import '../style/common.scss';

</style>

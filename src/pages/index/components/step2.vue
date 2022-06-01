<template>
	<view class="main">
		<view class="content">
			<view class="mgb20 listItem" v-for="(item, index) in list" :key="index">
				<reduceCom :info="item">
					<view slot="footer" class="footer">{{ item.footer }}</view>
					<view slot="warn" class="red footer">{{ item.warn }}</view>
				</reduceCom>
			</view>
		</view>

		<view class="content">
			<view class="mgb20 listItem" v-for="(item, index) in list2" :key="index">
				<reduceCom :info="item">
					<view slot="footer" class="footer">{{ item.footer }}</view>
				</reduceCom>
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
		</view>
		<!-- <view class="content">
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
		
		 -->
		<!-- <view class="row-start time mgb0">
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
		</view> -->
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
				{ ...serviceInfo['201'], id: 201 },
				{ ...serviceInfo['202'], id: 202, footer: '注：多画面视频信号切换(含导播台、录机、通话系统、导播师)' },
				{
					...serviceInfo['203'],
					id: 203,
					placeholder: '￥3500/场',
					footer: '服务包含：直播设备、技术服务、并发200人直播间1个；',
					warn: '并发:直播间同时在线观看最高人数(如需扩容，另计费)'
				}
			];
		},
		list2() {
			const serviceInfo = this.serviceInfo;
			return [
				{ ...serviceInfo['204'], id: 204 },
				{ ...serviceInfo['205'], id: 205 }
				// { ...serviceInfo['206'], id: 206 },
				// { ...serviceInfo['207'], id: 207 },
				// { ...serviceInfo['208'], id: 208 }
			];
		},
		list3() {
			const serviceInfo = this.serviceInfo;
			return [
				{ ...serviceInfo['221'], id: 221 },
				{ ...serviceInfo['222'], id: 222 },
				{ ...serviceInfo['223'], id: 223 },
				{ ...serviceInfo['224'], id: 224,footer:'注：人+PPT开窗、人名条、视频插播、滚屏信息等' },
				{ ...serviceInfo['225'], id: 225 },
				{ ...serviceInfo['226'], id: 226 },
				{ ...serviceInfo['227'], id: 227,footer:'注：上下行带宽稳定在100M'},
				{ ...serviceInfo['228'], id: 228 },
				{ ...serviceInfo['229'], id: 229 },
				{ ...serviceInfo['230'], id: 230 },
				{ ...serviceInfo['231'], id: 231 },
				{ ...serviceInfo['232'], id: 232,footer:'注：大屏画面切换(含大屏切换、画面调度两名技术员)' },
				{ ...serviceInfo['233'], id: 233 },
				{ ...serviceInfo['234'], id: 234 },
				{ ...serviceInfo['235'], id: 235,footer:'注：摄像1个、连接技术服务'},
				{ ...serviceInfo['236'], id: 236 },
				{ ...serviceInfo['237'], id: 237,footer:'注：电视、支架、线材、装运(2台起送)' }
			];
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../style/common.scss';
</style>

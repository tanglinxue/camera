<template>
	<view class="main">
		<view class="content">
			<view class="tips-content row-start">
				<image class="icon mgr10" src="/static/common/icon-tips.png"></image>
				服务包含：固定摄像1个、灯光1组、素材拼剪
			</view>
			<view class="red fee">费用组成：技术服务费+录课人数费</view>

			<view class="row-start checkbox pd30">
				<image src="/static/common/icon-checkbox-sel.png" class="icon"></image>
				<text class="text">线下录课</text>
			</view>
			<view class="mgb20 listItem" v-for="(item, index) in list" :key="index">
				<reduceCom :info="item">
					<view slot="footer" class="footer">{{ item.footer }}</view>
				</reduceCom>
			</view>
		</view>
		<view class="content">
			<view class="row-start checkbox pd30">
				<image src="/static/common/icon-checkbox.png" class="icon"></image>
				<text class="text">线下录课</text>
			</view>
			<view class="mgb20 listItem" v-for="(item, index) in list2" :key="index">
				<reduceCom :info="item">
					<view slot="footer" class="footer">{{ item.footer }}</view>
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
			return [{ ...serviceInfo['501'], id: 501,type:'noNum' }, { ...serviceInfo['502'], id: 502,footer: '注：正常每天可录制1-7人，具体以需求为准' }];
		},
		list2() {
			const serviceInfo = this.serviceInfo;
			return [{ ...serviceInfo['511'], id: 511,type:'noNum' }, { ...serviceInfo['512'], id: 512,footer: '注：正常每天可录制1-7人，具体以需求为准'}];
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../style/common.scss';
</style>

<template>
	<view class="main">
		<view class="content">
			<view class="mgb20 listItem" v-for="(item, index) in list" :key="index"><reduceCom :info="item" /></view>
		</view>
		<view class="content">
			<view class="row-start time">
				<view class="txt1 mgr15">倒计时：</view>
				<view class="radio row-start" v-for='(item) in options' :key='item.id'>
					<image src="/static/common/icon-radio.png" class="icon"></image>
					<text class="txt">{{item.name}}</text>
					<view class='gray normal mgl10'>
						¥{{ item.unit_price }}/{{ item.unit }}
					</view>
					<uni-icons type="compose" size="22" color="#919191" class="mgl15 normal"></uni-icons>
				</view>
				<!-- <view class="radio row-start">
					<image src="/static/common/icon-radio-sel.png" class="icon"></image>
					<text class="txt">定制</text>
				</view> -->
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
import { mapState } from 'vuex';
export default {
	components: {
		reduceCom
	},
	computed: {
		...mapState('service', ['serviceInfo']),
		list() {
			const serviceInfo = this.serviceInfo;
			return [{ ...serviceInfo['401'], id: 401 }, { ...serviceInfo['402'], id: 402 }];
		},
		list2() {
			const serviceInfo = this.serviceInfo;
			return [
				{
					name: '数量',
					hidePrice: true,
					num: 0
				}
			];
		},
		list3() {
			const serviceInfo = this.serviceInfo;
			return [{ ...serviceInfo['405'], id: 405 }, { ...serviceInfo['406'], id: 406, footer: '注：访谈视频、素材剪辑、特效视频、短片拍摄等' }];
		},
		options(){
			const serviceInfo = this.serviceInfo;
			return [{ ...serviceInfo['403'], id: 403 }, { ...serviceInfo['404'], id: 404 }];
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../style/common.scss';

</style>

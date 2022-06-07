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
			<selectCom :options="options" name="有同传接入" />
		</view>
		<view class="content"><approachCom :info="info" /></view>
		<view class="content">
			<view class="title row-between">
				增选项
				<view>收起</view>
			</view>
			<view class="mgb20 listItem" v-for="(item, index) in list3" :key="index">
				<reduceCom :info="item" v-if="item.id">
					<view slot="footer" class="footer">{{ item.footer }}</view>
					<view slot="warn" class="red">{{ item.footer }}</view>
				</reduceCom>
				<view v-else class="mgb20">
					<selectCom :options="options2" name="实时字幕：" />
					<view class="footer">注：字幕准确率80%</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import reduceCom from './reduceCom';
import selectCom from './selectCom';
import approachCom from './approachCom';
import { mapGetters, mapState } from 'vuex';
export default {
	components: {
		reduceCom,
		selectCom,
		approachCom
	},
	data() {
		return {
			status: 'open'
		};
	},
	computed: {
		...mapGetters('service', ['step2']),
		...mapState('service', ['serviceInfo']),
		list() {
			return this.step2.slice(0, 3);
		},
		list2() {
			return this.step2.slice(3, 5);
		},
		list3() {
			return this.step2.slice(5);
		},
		options() {
			const serviceInfo = this.serviceInfo;
			return [{ ...serviceInfo['206'], id: 206 }, { ...serviceInfo['207'], id: 207 }];
		},
		options2() {
			const serviceInfo = this.serviceInfo;
			return [{ ...serviceInfo['233'], id: 233 }, { ...serviceInfo['234'], id: 234 }];
		},
		info() {
			const serviceInfo = this.serviceInfo;
			return this.step2[7];
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../style/common.scss';
</style>

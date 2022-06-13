<template>
	<view class="main">
		<view class="content">
			<view class="mgb20 listItem" v-for="(item, index) in list" :key="index"><reduceCom :info="item" /></view>
		</view>
		<view class="content">
			<view class="title">
				快剪
				<text>（当天出片）</text>
			</view>
			<view class="mgb20 listItem" v-for="(item, index) in list2" :key="index"><reduceCom :info="item"></reduceCom></view>
		</view>
		<view class="content">
			<view class="title">
				慢剪
				<text>（3天出片）</text>
			</view>
			<view class="mgb20 listItem" v-for="(item, index) in list3" :key="index">
				<reduceCom :info="item">
					<view slot="footer" class="footer">{{ item.footer }}</view>
				</reduceCom>
			</view>
		</view>
		<dynamicInfo :nodeid='3'/>
	</view>
</template>

<script>
//finish
import dynamicInfo from './dynamicInfo';
import reduceCom from './reduceCom';
import { mapGetters } from 'vuex';
export default {
	components: {
		reduceCom,
		dynamicInfo
	},
	computed: {
		...mapGetters('service', ['step3']),
		list() {
			return this.step3.slice(0, 2);
		},
		list2() {
			return this.step3.slice(2, 4);
		},
		list3() {
			return this.step3.slice(4, 6);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../style/common.scss';
</style>

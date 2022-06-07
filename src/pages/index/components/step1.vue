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
				<view class="column-center item" :class="{ acitve: index === currentIndex }" v-for="(item, index) in list3" :key="item.id" @click.stop="select(item.id,index)">
					<view class="name font24">{{ item.name }}</view>
					<view class="tips font20">¥{{ item.unit_price }}/{{ item.unit }}</view>
					<view @tap.stop="open(item)">
						<uni-icons type="compose" size="20" :color="index === currentIndex ? '#f66745' : '#919191'" class="mgl15 normal edit-icon"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		<view class="content" v-if='list4.length'>
			<view class="mgb20 listItem" v-for="(item, index) in list4" :key="index">
				<reduceCom :info="item" :deleteIcon='true' :nodeid='1'>
				</reduceCom>
			</view>
		</view>
	</view>
</template>

<script>
import reduceCom from './reduceCom';
import { mapGetters,mapState } from 'vuex';
export default {
	components: {
		reduceCom
	},
	computed: {
		...mapState('service', ['serviceData']),
		...mapGetters('service', ['step1','staticStep1']),
		list() {
			return this.step1.slice(0, 2);
		},
		list2() {
			return [
				...this.step1.slice(2, 4),
			];
		},
		list3() {
			return this.step1.slice(4, 7);
		},
		list4(){
			return this.staticStep1
		},
		currentIndex(){
			 //"zp_cyzt": 4,照片-冲印状态: 1-无  2-塑封；3-盒装；4-其他  默认
			const {zp_cyzt} = this.serviceData;
			switch(zp_cyzt){
				case 2:
					return 0;
				case 3:
					return 1;
				case 4:
					return 2;
				default:
					return -1;
			}
		}
	},
	methods: {
		open(info) {
			this.$bus.$emit('openPopup', { ...info, type: 2 });
		},
		select(id,index) {
			if (this.currentIndex == index) {
				return this.$store.commit('service/changeStep1Index',{id:0,index:1})
			}
			this.$store.commit('service/changeStep1Index',{id,index:index+2})
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../style/common.scss';
</style>

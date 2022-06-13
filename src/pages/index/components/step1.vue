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
		<dynamicInfo :nodeid='1'/>
	</view>
</template>

<script>
//finish
import reduceCom from './reduceCom';
import dynamicInfo from './dynamicInfo';
import { mapGetters,mapState } from 'vuex';
export default {
	components: {
		reduceCom,
		dynamicInfo
	},
	computed: {
		...mapState('service', ['serviceData','dynamicInfo']),
		...mapGetters('service', ['step1']),
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
			return this.dynamicInfo[1]
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
			//打开修改弹窗
			this.$bus.$emit('openPopup', {...info,type:2});
		},
		select(id,index){
			let upId = 0;
			let upIndex = 1;
			if (this.currentIndex != index) {
				upId = id
				upIndex = index + 2
			}
			this.$store.commit('service/changeIndex',{id:upId,index:upIndex,type:'zp_cyzt',arr:['112','113','114']})
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../style/common.scss';
</style>

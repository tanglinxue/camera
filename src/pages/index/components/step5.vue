<template>
	<view class="main">
		<view class="content">
			<view class="tips-content row-start">
				<image class="icon mgr10" src="/static/common/icon-tips.png"></image>
				服务包含：固定摄像1个、灯光1组、素材拼剪
			</view>
			<view class="red fee">费用组成：技术服务费+录课人数费</view>

			<view class="row-start checkbox pd30" @click='select("down")'>
				<image :src="downClassOpen?'/static/common/icon-checkbox-sel.png':'/static/common/icon-checkbox.png'" class="icon"></image>
				<text class="text">线下录课</text>
			</view>
			<view class="mgb20 listItem" v-for="(item, index) in list" :key="index" v-if='downClassOpen'>
				<reduceCom :info="item">
					<view slot="footer" class="footer">{{ item.footer }}</view>
				</reduceCom>
			</view>
			<approachCom :info='info' :currentIndex='currentIndex'/>
		</view>
		<view class="content">
			<view class="row-start checkbox pd30"  @click='select("up")'>
				<image :src="upClassOpen?'/static/common/icon-checkbox-sel.png':'/static/common/icon-checkbox.png'" class="icon"></image>
				<text class="text">线上录课</text>
			</view>
			<view class="mgb20 listItem" v-for="(item, index) in list2" :key="index" v-if='upClassOpen'>
				<reduceCom :info="item">
					<view slot="footer" class="footer">{{ item.footer }}</view>
				</reduceCom>
			</view>
		</view>
		<dynamicInfo :nodeid='5'/>
	</view>
</template>

<script>
//finish
import { mapState,mapGetters } from 'vuex';
export default {
	computed: {
		...mapGetters('service', ['step5']),
		...mapState('service', ['serviceInfo','serviceData']),
		upClassOpen(){
			const kclz_xxxslk = this.serviceData.kclz_xxxslk
			return kclz_xxxslk==3||kclz_xxxslk==4
		},
		downClassOpen(){
			const kclz_xxxslk = this.serviceData.kclz_xxxslk
			return kclz_xxxslk==2||kclz_xxxslk==4
		},
		list() {
			return this.step5.slice(0, 2);
		},
		list2() {
			return this.step5.slice(3);
		},
		info(){
			return this.step5[2];
		},
		currentIndex(){
			 //"zp_cyzt": 4,照片-冲印状态: 1-无  2-塑封；3-盒装；4-其他  默认
			const {spzz_djs} = this.serviceData;
			switch(spzz_djs){
				case 2:
					return 0;
				case 3:
					return 1;
				default:
					return -1;
			}
		}
		
	},
	methods:{
		select(type){
			this.$store.commit('service/changeStep5Index',type)
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/static/scss/common.scss';
</style>

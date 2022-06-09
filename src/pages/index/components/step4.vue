<template>
	<view class="main">
		<view class="content">
			<view class="mgb20 listItem" v-for="(item, index) in list" :key="index"><reduceCom :info="item" /></view>
		</view>
		<view class="content">
			<view class="mgb20">
				<selectCom :options='options' name='倒计时：' :currentIndex='currentIndex' selectType='spzz_djs'/>
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
//finish
import reduceCom from './reduceCom';
import selectCom from './selectCom';
import { mapState,mapGetters } from 'vuex';
export default {
	components: {
		reduceCom,
		selectCom
	},
	computed: {
		...mapState('service', ['serviceData']),
		...mapGetters('service', ['step4']),
		list() {
			return this.step4.slice(0, 2);
		},
		list2() {
			return this.step4.slice(6);
		},
		list3() {
			return this.step4.slice(4, 6);
		},
		options(){
			return this.step4.slice(2, 4);
		},
		currentIndex(){
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
	}
};
</script>

<style lang="scss" scoped>
@import '../style/common.scss';

</style>

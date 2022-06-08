<template>
	<view class="content">
		<view class="navbar row-center">
			<view v-for="(item, index) in navList" :key="index" class="nav-item row-center" :class="{ current: tabCurrentIndex === index }" @click="tabClick(index)">
				<view class="label">{{ item.text }}</view>
				<view class='badge' v-if='item.num'>{{item.num}}</view>
			</view>
		</view>
		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem, tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content column-center" scroll-y>
					<Step1 v-show="tabCurrentIndex == 0" />
					<Step2 v-show="tabCurrentIndex == 1" />
					<Step3 v-show="tabCurrentIndex == 2" />
					<Step4 v-show="tabCurrentIndex == 3" />
					<Step5 v-show="tabCurrentIndex == 4" />
					<view class="middle-btn mgauto" @click='addItem'>新增服务项目</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<view class="row-start dayCompute">
			<text class="txt1">服务天数：</text>
			<uni-number-box class="num"  :min="0" :max="99" v-model="serviceData.work_day" />
			<text class="txt2">单个项目的天数可在下一步修改</text>
		</view>
		<view class="foot-detail row-between">
			<view class="txt row-start">
				<text class="red">￥</text>
				<text class="red weight font36">{{total_money}}</text>
				<text class="mgl15">(累计总价)</text>
			</view>
			<view class="foot-btn row-end">
				<view class="middle-btn white-middle-btn">重置</view>
				<view class="middle-btn mgl20" @click="nextStep">下一步</view>
			</view>
		</view>
		<ChangePopup />
	</view>
</template>

<script>
// ok
import Step1 from './components/step1.vue';
import Step2 from './components/step2.vue';
import Step3 from './components/step3.vue';
import Step4 from './components/step4.vue';
import Step5 from './components/step5.vue';
import ChangePopup from './components/changePopup.vue';
import { mapActions,mapGetters,mapState } from 'vuex';
export default {
	components: {
		Step1,
		Step2,
		Step3,
		Step4,
		Step5,
		ChangePopup
	},
	data() {
		return {
			tabCurrentIndex:1,
			type:1
		};
	},

	onLoad(option) {
		if(option.type && option.type==2){
			return this.type = 2
		}
		this.$methods.showLoading();
		this.getData();
	},
	computed:{
		...mapState('service', ['serviceData']),
		...mapGetters('service', ['step1Select','step2Select','step3Select','step4Select','step5Select','total_money']),
		navList(){
			return [
				{
					state: 0,
					text: '照片',
					num:this.step1Select.length
				},
				{
					state: 1,
					text: '视频',
					num:this.step2Select.length
				},
				{
					state: 2,
					text: '剪辑',
					num:this.step3Select.length
				},
				{
					state: 3,
					text: '视频制作',
					num:this.step4Select.length
				},
				{
					state: 4,
					text: '课程录制',
					num:this.step5Select.length
				}
			]
		}
	},

	methods: {
		...mapActions('service', ['getInfo']),
		addItem(){
			// 新增服务项目
			this.$bus.$emit('openPopup',{...this.info,type:1,nodeid:this.tabCurrentIndex+1,canConfig:true})
		},
		async getData() {
			await this.getInfo()
			uni.hideLoading();
		},
		//swiper 切换
		changeTab(e) {
			this.tabCurrentIndex = e.target.current;
		},
		//顶部tab点击
		tabClick(index) {
			this.tabCurrentIndex = index;
		},
		nextStep() {
			if(this.type==2){
				return uni.navigateBack({
					delta:1
				})
			}
			this.$jump(`/pages/index/editOfferPrice`);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/static/scss/index.scss';
.content {
	height: 100%;
	.mgauto {
		margin: 50rpx auto 80rpx;
	}
	.navbar {
		width: 100%;
		height: 86rpx;
		background: $red;
		padding: 0 10rpx;
		.nav-item {
			height: 100%;
			position: relative;
			color: #fff;
			padding-right: 20rpx;
			.label {
				padding: 8rpx 20rpx;
			}
			.badge {
				position: absolute;
				top: 0;
				right: -4rpx;
				padding: 0 10rpx;
				height: 30rpx;
				text-align: center;
				background: #856c2e;
				border-radius: 24rpx;
				font-size: 22rpx;
			}
			&.current {
				.label {
					color: $red;
					font-weight: 600;
					background: white;
					border-radius: 30rpx;
				}
			}
		}
	}
}
.dayCompute {
	height: 100rpx;
	font-size: 22rpx;
	border-bottom: 1px solid $border;
	padding-left: 30rpx;
	background: #fff;
	.txt1 {
		font-size: 26rpx;
	}
	.num {
		scale: 0.8;
	}
}
.swiper-box {
	height: calc(100vh - 326rpx);
	width: 100%;
	// padding: 20rpx 0;
	box-sizing: border-box;
	.list-scroll-content {
		height: 100%;
		width: 100%;
	}
}
.foot-detail {
	padding: 30rpx;
	background-color: #fff;
	.txt {
		font-size: 28rpx;
		color: $gray;
	}
	.middle-btn {
		width: 180rpx;
	}
}
</style>

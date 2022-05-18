<template>
	<view class="content">
		<view class="navbar row-center">
			<view v-for="(item, index) in navList" :key="index" class="nav-item row-center" :class="{ current: tabCurrentIndex === index }" @click="tabClick(index)">
				<view class="label">{{ item.text }}</view>
			</view>
		</view>
		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem, tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y>
					<Step1  v-show='tabCurrentIndex==0'/>
					<Step2 v-show='tabCurrentIndex==1'/>
					<Step3 v-show='tabCurrentIndex==2'/>
					<Step4 v-show='tabCurrentIndex==3'/>
					<Step5 v-show='tabCurrentIndex==4'/>
				</scroll-view>
			</swiper-item>
		</swiper>
		<view class="foot-detail row-between">
			<view class="txt row-start">
				<text class="red">￥</text>
				<text class="red weight font36">3200</text>
				<text class="mgl15">(累计总价)</text>
			</view>
			<view class="foot-btn row-end">
				<view class="middle-btn white-middle-btn">重置</view>
				<view class="middle-btn mgl20">下一步</view>
			</view>
		</view>
	</view>
</template>

<script>
// ok
import Step1 from './components/step1.vue';
import Step2 from './components/step2.vue';
import Step3 from './components/step3.vue';
import Step4 from './components/step4.vue';
import Step5 from './components/step5.vue';
export default {
	components: {
		Step1,
		Step2,
		Step3,
		Step4,
		Step5
	},
	data() {
		return {
			tabCurrentIndex: 1,
			navList: [
				{
					state: 0,
					text: '摄影',
					loadingType: 'more',
					orderList: []
				},
				{
					state: 1,
					text: '视频',
					loadingType: 'more',
					orderList: []
				},
				{
					state: 2,
					text: '剪辑',
					loadingType: 'more',
					orderList: []
				},
				{
					state: 3,
					text: '视频制作',
					loadingType: 'more',
					orderList: []
				},
				{
					state: 4,
					text: '课程录制',
					loadingType: 'more',
					orderList: []
				}
			]
		};
	},

	mounted() {
		
	},

	methods: {
		//swiper 切换
		changeTab(e) {
			this.tabCurrentIndex = e.target.current;
		},
		//顶部tab点击
		tabClick(index) {
			this.tabCurrentIndex = index;
		},
		//订单状态文字和颜色
		orderStateExp(state) {
			let stateTip = '',
				stateTipColor = '#fa436a';
			switch (+state) {
				case 1:
					stateTip = '待付款';
					break;
				case 2:
					stateTip = '待发货';
					break;
				case 9:
					stateTip = '订单已关闭';
					stateTipColor = '#909399';
					break;
				//更多自定义
			}
			return { stateTip, stateTipColor };
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/static/scss/index.scss';
.content {
	height: 100%;
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
.swiper-box {
	height: calc(100vh - 226rpx);
	width: 100%;
	padding: 20rpx 0;
	box-sizing: border-box;
	.list-scroll-content {
		height: 100%;
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

<template>
	<view class="content">
		<view class="navbar row-between">
			<view v-for="(item, index) in navList" :key="index" class="nav-item row-center" :class="{ current: tabCurrentIndex === index }" @click="tabClick(index)">
				{{ item.text }}
			</view>
		</view>
		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem, tabIndex) in navList" :key="tabIndex">

			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	// ok


export default {
	components: {
		uniLoadMore,
		empty,
		Item
	},
	data() {
		return {
			tabCurrentIndex: 0,
			navList: [
				{
					state: 0,
					text: '全部订单',
					loadingType: 'more',
					orderList: []
				},
				{
					state: 1,
					text: '待支付',
					loadingType: 'more',
					orderList: []
				},
				{
					state: 2,
					text: '进行中',
					loadingType: 'more',
					orderList: []
				},
				{
					state: 3,
					text: '已完成',
					loadingType: 'more',
					orderList: []
				},
				{
					state: 4,
					text: '待评价',
					loadingType: 'more',
					orderList: []
				},
				{
					state: 5,
					text: '待评价',
					loadingType: 'more',
					orderList: []
				}
			]
		};
	},

	mounted() {
		this.loadData();
	},

	methods: {
		//获取订单列表
		loadData(source) {
			//这里是将订单挂载到tab列表下
			let index = this.tabCurrentIndex;
			let navItem = this.navList[index];
			let state = navItem.state;
			if (source === 'tabChange' && navItem.loaded === true) {
				//tab切换只有第一次需要加载数据
				return;
			}
			if (navItem.loadingType === 'loading') {
				//防止重复加载
				return;
			}
			navItem.loadingType = 'loading';
			console.log('加载');
			setTimeout(() => {
				let orderList = Json.orderList.filter(item => {
					//添加不同状态下订单的表现形式
					item = Object.assign(item, this.orderStateExp(item.state));
					//演示数据所以自己进行状态筛选
					if (state === 0) {
						//0为全部订单
						return item;
					}
					return item.state === state;
				});
				orderList.forEach(item => {
					navItem.orderList.push(item);
				});
				//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
				this.$set(navItem, 'loaded', true);
				//判断是否还有数据， 有改为 more， 没有改为noMore
				navItem.loadingType = 'more';
			}, 600);
		},
		//swiper 切换
		changeTab(e) {
			this.tabCurrentIndex = e.target.current;
			this.loadData('tabChange');
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
		width:100%;
		height: 120rpx;
		padding: 0 15rpx;
		background: #fff;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		position: fixed;
		left:0;
		top:0;
		.nav-item {
			flex: 1;
			height: 100%;
			font-size: 28rpx;
			position: relative;
			&.current {
				color: $greenColor;
				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 60rpx;
					height: 0;
					border-bottom: 6rpx solid $greenColor;
				}
			}
		}
	}
}
.swiper-box {
	position: fixed;
	top:140rpx;
	bottom:56px;
	left:0;
	height:auto;
	width:100%;
}
.list-scroll-content {
	height: 100%;
}
</style>

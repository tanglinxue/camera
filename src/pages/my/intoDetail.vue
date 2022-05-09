<template>
	<view class="main column-center">
		<view class="navbar row-between">
			<view v-for="(item, index) in navList" :key="index" class="nav-item row-center" :class="{ current: tabCurrentIndex === index }" @click="tabClick(index)">
				{{ item.text }}
			</view>
		</view>
		<view class="box">
			<view class="boxOuter time row-between">
				<view class="example-body row-start">
				<!-- 		<uni-datetime-picker  type="daterange" @change='getTime'/> -->
						<view class='date'>
							<uni-datetime-picker type="date" v-model="start_time" placeholder='开始日期'/>
						</view>
						<view class='mgl10'>至</view>
						<view class='date mgl10'>
							<uni-datetime-picker type="date" v-model="end_time" placeholder='结束日期'/>
						</view>
					</view>
				<view class="greenbtn btn" @click="search">查询</view>
			</view>
			<view class="boxOuter score">
				<view class="list">
					<view class="row-start green-item">
						<view class="all-price">总收益（元）</view>
						<view class="price">
							￥
							<text>{{ income_sum.total_money || 0 }}</text>
						</view>
					</view>
					<view class="item row-start-a">
						<view class="txt column-center">
							<view>
								<text class="rmb">￥</text>
								{{ income_sum.item_income || 0 }}
							</view>
							<view class="text2">项目收益</view>
						</view>
						<view class="txt column-center">
							<view>
								<text class="rmb">￥</text>
								{{ income_sum.traffic_money || 0 }}
							</view>
							<view class="text2">车费收益</view>
						</view>
						<view class="txt column-center">
							<view>
								<text class="rmb">￥</text>
								{{ income_sum.ad_fee || 0 }}
							</view>
							<view class="text2">渠道扣款</view>
						</view>
						<view class="txt column-center">
							<view>
								<text class="rmb">￥</text>
								{{ income_sum.service_fee || 0 }}
							</view>
							<view class="text2">服务费扣款</view>
						</view>
						<view class="txt column-center">
							<view>
								<text class="rmb">￥</text>
								{{ income_sum.card_fee || 0 }}
							</view>
							<view class="text2">储值扣款</view>
						</view>
					</view>
				</view>
			</view>
			<view class="ordeList">
				<template v-if="!loading">
					<Empty v-if="!list.length" text='暂无明细'></Empty>
					<template v-else>
						<!-- 订单列表 -->
						<view v-for="(item,index) in list" :key="index"><Item :info="item" /></view>
						<uni-load-more :status="status" class="load" v-if="query.page != 1" />
					</template>
				</template>
			</view>
			
			
		</view>
	</view>
</template>
<script>
//ok
import Item from './components/item.vue';
import Empty from '@/components/empty/index.vue';

export default {
	components: {
		Empty,
		Item
	},
	data() {
		return {
			tabCurrentIndex: 0,
			start_time: '',
			end_time:'',
			income_sum: {},
			navList: [
				{
					state: 0,
					text: '本周'
				},
				{
					state: 1,
					text: '上周'
				},
				{
					state: 2,
					text: '本月'
				},
				{
					state: 3,
					text: '上月'
				}
			],
			status: 'more',
			total: 0,
			loading: true,
			list: [],
			query: {
				page: 1,
				pagesize: 20
			}
		};
	},
	onLoad() {
		this.$methods.showLoading();
		this.getList();
	},
	methods: {
		async getList() {
			const { loading, list, query, navList, tabCurrentIndex, start_time,end_time } = this;
			this.status = 'loading';
			let params = {
				...query,
				type: navList[tabCurrentIndex].state
			};
			if(start_time && end_time){
				params.start_time = start_time
				params.end_time =end_time
			}
			let { income_day, income_sum } = await this.$API.my.tech_income(params);
			this.income_sum = income_sum;
			let { data: clist, total } = income_day;
			uni.hideLoading();
			if (loading) {
				this.loading = false;
			}
			const { page } = query;
			if (page !== 1) {
				this.list = [...list, ...clist];
			} else {
				this.list = clist;
			}
				
			this.total = total;
			if (total > this.list.length) {
				this.status = 'more';
			} else {
				this.status = 'noMore';
			}
		},
		search(){
			const {start_time,end_time} = this
			if(!start_time) return this.$methods.showToast('请选择开始日期')
			if(!end_time) return this.$methods.showToast('请选择结束日期')
			if(new Date(end_time).getTime()<new Date(start_time).getTime()) return this.$methods.showToast('结束日期不能早于开始日期')
			this.refreshList()
		},
		//顶部tab点击
		tabClick(index) {
			if (index == this.tabCurrentIndex) return;
			this.$methods.showLoading();
			this.tabCurrentIndex = index;
			this.start_time = ''
			this.end_time =''
			this.refreshList();
		},
		refreshList() {
			this.loading = true;
			this.query.page = 1;
			this.list = [];
			this.total = 0;
			this.getList();
		}
	},
	onReachBottom() {
		// 下拉加载更多
		if (this.status === 'more') {
			this.query.page = this.query.page + 1;
			this.getList();
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/static/scss/index.scss';

	::v-deep .uni-date-x--border{
		border-color:$greenColor
	}
	::v-deep .uni-datetime-picker--btn,
	::v-deep .uni-calendar-item__weeks-box .uni-calendar-item--checked,
	::v-deep .uni-calendar-item--multiple .uni-calendar-item--after-checked,
	::v-deep .uni-calendar-item--multiple .uni-calendar-item--before-checked{
		background-color: $greenColor
	}
	::v-deep .uni-date__x-input{
		height:70rpx;
		line-height: 70rpx;
	}
	::v-deep .uni-input-input{
		font-size:26rpx;
	}
	::v-deep .uniui-calendar{
		display:none
	}
	::v-deep .uni-date-editor--x .uni-date__icon-clear{
		border-width: 18rpx;
	}
	::v-deep .uni-input-placeholder{
		font-size:26rpx;
		text-align: center;
	}
	::v-deep .uni-date-x{
		width:220rpx
	}
.rmb {
	font-size: 18rpx;
	font-weight: normal;
}
.line {
	width: 100%;
	border-top: 1px solid $border;
	padding-bottom: 20rpx;
}

.main {
	padding-top:140rpx;
	.navbar {
		width: 100%;
		padding: 30rpx 200rpx 60rpx 20rpx;
		background: #fff;
		margin-bottom: 20rpx;
		position: fixed;
		left: 0;
		z-index:99;
		top: 0;
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
					bottom: -30rpx;
					transform: translateX(-50%);
					width: 60rpx;
					height: 0;
					border-bottom: 6rpx solid $greenColor;
				}
			}
		}
	}
	.box {
		width: 710rpx;
		.time {
			.btn {
				width: 126rpx;
				margin-left: 20rpx;
			}
		}
		.score {
			padding: 0;
			padding-bottom: 20rpx;
			overflow: hidden;
			.list {
				.green-item {
					background: $greenColor;
					margin-bottom: 20rpx;
					padding: 30rpx;
					color: #fff;
					.all-price {
						font-size: 28rpx;
						margin-right: 40rpx;
					}
					.price {
						font-size: 36rpx;
						text {
							font-size: 40rpx;
							font-weight: bold;
						}
					}
				}
				.item {
					padding: 30rpx 0;
					font-size: 30rpx;

					.txt {
						flex: 1;
						.text2 {
							font-size: 24rpx;
							margin-top: 15rpx;
						}
					}
				}
			}
		}
	}
	
}
</style>

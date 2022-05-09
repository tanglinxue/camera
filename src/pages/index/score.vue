<template>
	<view class="main column-center">
		<view class="navbar row-between">
			<view v-for="(item, index) in navList" :key="index" class="nav-item row-center"
				:class="{ current: tabCurrentIndex === index }" @click="tabClick(index)">
				{{ item.text }}
			</view>
			<view class='level row-start'>当前等级
			<image src="/static/images/my/v1.png" v-if='useInfo.level==1' class='vip'></image>
			<image src="/static/images/my/v2.png" v-if='useInfo.level==2' class='vip'></image>
			<image src="/static/images/my/v3.png" v-if='useInfo.level==3' class='vip'></image></view>
		</view>
		<view class='box'>
			<view class='time-area'>时间范围：{{myScore.date}}</view>
			<view class='boxOuter score'>
				<view class='list'>
					<view class='item row-start-a green-item'>
						<view class='txt left-txt'></view>
						<view class='txt column-center txt3'>
							<view class='text1'>业绩<text>（含加钟）</text></view>
							<view>{{myScore.income_sum}}</view>
						</view>
						<view class='txt column-center'>
							<view  class='text1'>加钟率</view>
							<view>{{myScore.add_chance}}</view>
						</view>
						<view class='txt column-center'>
							<view  class='text1'>充值</view>
							<view>{{myScore.filling}}</view>
						</view>
						<view class='txt column-center'>
							<view  class='text1'>在线时长</view>
							<view>{{myScore.line_time}}</view>
						</view>
					</view>
					<view class='item row-start-a' v-for='item in scoreList' :key='item.id'>
						<view class='txt left-txt'><image :src='`/static/images/my/v${item.level}.png`' class='vip'></image></view>
						<view class='txt txt3'>{{item.item_money | showNoNeed}}</view>
						<view class='txt'>{{item.add_rate | showNoNeed}}</view>
						<view class='txt'>{{item.charge_money | showNoNeed}}</view>
						<view class='txt'></view>
					</view>

				</view>
			</view>
			<view class='boxOuter dayList'>
				<view class='list'>
					<view class='item row-start-a green-item'>
						<view class='txt'>日期</view>
						<view class='txt'>项目(元)</view>
						<view class='txt'>加钟(元)</view>
						<view class='txt'>订单数</view>
						<view class='txt'>加钟数</view>
						<view class='txt'>在线</view>
					</view>
					<template v-if="!loading">
						<Empty v-if="!list.length" text='暂无业绩'></Empty>
						<template v-else>
							<!-- 订单列表 -->
							<view class='item row-start-a' v-for='(item,index) in list' :key='index'>
								<view class='txt'>{{item.order_time}}</view>
								<view class='txt'>{{item.item_total}}</view>
								<view class='txt'>{{item.add_money}}</view>
								<view class='txt'>{{item.order_num}}</view>
								<view class='txt'>{{item.add_num}}</view>
								<view class='txt'>{{item.thetime}}</view>
							</view>
							<uni-load-more :status="status" class="load" v-if="status=='loading'" />
						</template>
					</template>	
				</view>
			</view>
		</view>


	</view>


	</view>
</template>
<script>
	//ok
	import {
		mapState,
	} from 'vuex';
	import Empty from '@/components/empty/index.vue';
	export default {
		components: {
			Empty
		},
		data(){
			return{
				tabCurrentIndex: 0,
				navList: [{
						state: 2,
						text: '本期数据'
					},
					{
						state: 1,
						text: '上期数据',
					}
				],
				status: 'more',
				total: 0,
				loading: true,
				list: [],
				query: {
					page: 1,
					pagesize: 20
				},
				scoreList:[],
				myScore:{}
			}
		},
		computed:{
			...mapState('user', ['useInfo']),
		},
		filters:{
			showNoNeed(val){
				return val&&val!="0%"?val:'无要求'
			}
		},
		onLoad(){
			this.getData()
		},
		methods:{
			async getData() {
				this.$methods.showLoading();
				await Promise.all([this.getLevels(), this.getList()]);
				
			},
			async getLevels() {
				this.scoreList = await this.$API.home.get_levels();
			},
			async getList() {
				const { loading, list, query,tabCurrentIndex,navList } = this;
				this.status = 'loading';
				let {result_day,add_chance,date,filling,income_sum,line_time} = await this.$API.home.score_result({
					t:navList[tabCurrentIndex].state,
					...query
				});
				uni.hideLoading();
				this.myScore = {add_chance,date,filling,income_sum,line_time}
				let { data: clist, total } = result_day
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
			//顶部tab点击
			tabClick(index) {
				if (index == this.tabCurrentIndex) return;
				this.$methods.showLoading();
				this.tabCurrentIndex = index;
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
	}
</script>

<style lang="scss" scoped>
	@import '@/static/scss/index.scss';

	.main {
		font-size: 28rpx;
		padding-top:140rpx;
		.vip{
			width:50rpx;
			height:40rpx;
		}
		.navbar {
			width: 100%;
			padding: 30rpx 300rpx 60rpx 20rpx;
			background: #fff;
			margin-bottom: 20rpx;
			position: fixed;
			left: 0;
			z-index:99999;
			top: 0;
			
			.level{
				position: absolute;
				color: $greenColor;
				right:20rpx;
				image{
					
					margin-left: 10rpx;
				}
			}
			.nav-item {
				flex: 1;
				height: 100%;
				position: relative;
		
				&.current {
					color: $greenColor;
		
					&:after {
						content: '';
						position: absolute;
						left: 50%;
						bottom: -30rpx;
						transform: translateX(-50%);
						width: 146rpx;
						height: 0;
						border-bottom: 6rpx solid $greenColor;
					}
				}
			}
		}
		.box {
			width: 710rpx;
			
			.time-area{
				font-size:24rpx;
				color:$gray;
				text-align: right;
				margin-bottom: 10rpx;
			}
			.score{
				padding:0;
				padding-bottom:20rpx;
				overflow: hidden;
				.list {
					.item {
						padding: 10rpx 0;
						font-size: 28rpx;
						
						.txt {
							&.left-txt{
								flex:2
							}
							flex: 3;
							text-align: center;
							
							&.txt3{
								flex:4
							}
						}
						&.green-item {
							background:$greenColor;
							margin-bottom: 20rpx;
							padding: 40rpx 0;
							.txt {
								color: #fff;
								font-size:32rpx;
								font-weight: bold;
								.text1{
									font-size:26rpx;
									margin-bottom: 15rpx;
									text{
										font-size: 22rpx;
									}
								}
							}
						}
					}
				}
				
			}
			.dayList {

				.list {
					.item {
						
						padding: 25rpx 0;
						font-size: 26rpx;
						border-bottom: 1px solid $border;
						.txt {
							flex: 2;
							text-align: center;
							// word-break: break-all;
							font-size:24rpx;
							&.txt3{
								flex:3;
								font-size:26rpx;
							}
						}

						&.green-item {
							.txt {
								color: $greenColor;
								font-weight: bold;
								font-size: 26rpx;
							}
						}
					}
				}
			}

		}

	}
</style>

<template>
	<view class="main column-center">
		<view class="top">
			<view class="row-between info">
				<view class="left row-start">
					<view class="imgbox">
						<image :src="useInfo.face" mode="aspectFill"></image>
					</view>
					<view class="column-center-a">
						<view class="name row-start">{{ useInfo.nickname }}<view class='tagName' v-if='useInfo.status==0'>{{tagName}}</view></view>
						<view class="vip column-center">
							<image src="/static/images/my/v1b.png" v-if='useInfo.level==1'></image>
							<image src="/static/images/my/v2b.png" v-if='useInfo.level==2'></image>
							<image src="/static/images/my/v3b.png" v-if='useInfo.level==3'></image>
						</view>
					</view>
				</view>
				<view class="btn" @click="logout">退出登录</view>
			</view>
		</view>
		<view class="box">
			<view class="fun boxOuter">
				<view class="row-between num">
					<view class="item column-center">
						<view class="text1 green">
							待支付余额
							<view class='imgbox' @click="help1"><image src="/static/images/my/help.png"></image></view>
						</view>
						<view class="text2 row-start" @click="jump(1)">
							￥
							<text>{{ money.balance }}</text>
						</view>
					</view>

					<view class="item column-center">
						<view class="text1 green">
							待结算金额
							<view class='imgbox' @click="help2"><image src="/static/images/my/help.png"></image></view>
						</view>
						<view class="text2 row-start" @click="jump(2)">
							￥
							<text>{{ money.paymoney }}</text>
						</view>
					</view>
				</view>
				<view class="row-between type">
					<view class="item column-center" @click="jump(1)">
						<image src="/static/images/my/icon4.png"></image>
						<text>收支记录</text>
					</view>
					<view class="item column-center" @click="jump(2)">
						<image src="/static/images/my/icon5.png"></image>
						<text>分成明细</text>
					</view>
					<view class="item column-center" @click="jump(3)">
						<image src="/static/images/my/icon6.png"></image>
						<text>个人信息</text>
					</view>
					<view class="item column-center" @click="jump(4)">
						<image src="/static/images/my/icon7.png"></image>
						<text>收款方式</text>
					</view>
				</view>
			</view>
			<view class="boxOuter notice">
				<view class="title row-start">
					<view class="circle"></view>
					<text>平台打款记录</text>
				</view>
				<view class="list">
					<view class="item row-start-a green-item">
						<view class="txt date">支付日期</view>
						<view class="txt">应付金额</view>
						<view class="txt">手续费</view>
						<view class="txt">实付金额</view>
						<view class="txt">收款信息</view>
					</view>
					<template v-if='!loading'>
						<Empty v-if='!list.length' text='暂无打款记录'></Empty>
						<template v-else>
							<!-- 订单列表 -->
							<view class="item row-start-a" v-for='(item,index) in list' :key='index'>
								<view class="txt date">{{item.pay_time.split(' ')[0]}}</view>
								<view class="txt">{{item.money1}}</view>
								<view class="txt">{{item.pay_fee}}</view>
								<view class="txt">{{item.money2}}</view>
								<view class="txt">{{item.pay_way == 0?"微信":'银行卡'}}</view>
							</view>
							<uni-load-more :status="status" class="load" v-if="status=='loading'&&query.page!=1" />
						</template>
					</template>

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
		data() {
			return {
				money: {},
				fristEnter: true,
				status: 'more',
				total: 0,
				loading: true,
				list: [],
				query: {
					page: 1,
					pagesize: 10
				},
				canclick:true
			};
		},
		onShow() {
			if (this.fristEnter) {
				this.$methods.showLoading();
				this.fristEnter = false;
				this.getData();
			}else{
				this.getMoney()
			}	
		},
		computed:{
			...mapState('user', ['useInfo']),
			tagName(){
				let {status} = this.useInfo;
				switch (status){
					case 0:
						return '停牌中'
					case 1:
						return '正常'
					case 2:
						return '封禁中'
					default:
						return ''
				}
			}
		},
		methods: {
			help1(){
				this.$methods.showModal('此余额数字代表已经结算正等待支付的技师收入，一般是你上周的订单分成收入，财务将在本周固定时间批量打款至技师设置的收款账号中。', '待支付余额','确定', '取消' , false)
			},
			help2(){
				this.$methods.showModal('此余额数字代表未结算的技师收入，一般是本周的订单分成收入，在下周一会结算进入待支付余额，然后等财务统一打款至技师收款账号中。', '待结算余额','确定', '取消' , false)
			},
			async logout() {
				try {
					await this.$methods.showModal('确认退出吗?')
					if (!this.canclick) return
					this.canclick = false
					this.$methods.showLoading('退出中...');
					const res = await this.$API.my.logout()
					this.$methods.showToast(`退出成功`);
					this.$store.dispatch('user/updateToken','')
					setTimeout(()=>{
						this.$jump(`/pages/index/login`);
					},1000)
				} catch (err) {
					console.log(err)
				} finally {
					setTimeout(() => {
						this.canclick = true
					}, 1000)
				}
			},
			async getData(time=300) {
				await Promise.all([this.getMoney(), this.getRecord()]);
				setTimeout(()=>{
					uni.hideLoading();
				},time)
			},
			async getMoney() {
				this.money = await this.$API.my.tech_pay();
			},
			async getRecord() {
				const {
					loading,
					list,
					query
				} = this;
				this.status = 'loading';
				let {
					data: clist,
					total
				} = await this.$API.my.tech_paylog(query);
				if (loading) {
					this.loading = false;
				}
				const {
					page
				} = query;
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
			jump(type) {
				if (type == 1) {
					this.$jump(`/pages/my/record`);
				} else if (type == 2) {
					this.$jump(`/pages/my/intoDetail`);
				} else if (type == 3) {
					this.$jump(`/pages/my/info`);
				} else if (type == 4) {
					console.log('收款')
					this.$jump(`/pages/my/payType`);
				}
			},
			refreshList() {
				this.loading = true;
				this.query.page = 1;
				this.list = [];
				this.total = 0;
			}
		},
		
		onPullDownRefresh() {
			this.refreshList()
			this.getData(1000);
			// 上拉刷新
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom() {
			
			// 下拉加载更多
			if (this.status === 'more') {
				this.query.page = this.query.page + 1;
				this.getRecord();
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '@/static/scss/index.scss';
	

	.main {
		background: $backColor;

		.top {
			width: 100%;
			height: 400rpx;
			background: url(@/static/images/my/pic-bc.png);
			background-size: 100% 100%;
			padding: 80rpx 30rpx 0 30rpx;
			position: relative;

			.info {
				margin-bottom: 20rpx;

				.left {
					.imgbox {
						width: 152rpx;
						height: 152rpx;
						border: 6rpx solid #fff;
						border-radius: 100%;
						margin-right: 20rpx;

						image {
							width: 100%;
							height: 100%;
							border-radius: 100%;
						}
					}

					.name {
						font-size: 40rpx;
						font-weight: bold;
						color: #fff;
						margin-bottom: 15rpx;
					}

					.vip {
						width: 110rpx;
						height: 48rpx;
						background: rgba(0, 0, 0, 0.4);
						border-radius: 24rpx;

						image {
							width: 48rpx;
							height: 42rpx;
							position: relative;
							top: 5rpx;
						}
					}
				}

				.btn {
					width: 240rpx;
					height: 80rpx;
					background: #ffffff;
					border-radius: 40rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 36rpx;
					color: $greenColor;
					fong-weight: bold;
				}
			}
		}

		.box {
			width: 710rpx;
			margin-top: -140rpx;
			position: relative;

			.fun {
				padding: 50rpx 30rpx;

				.num {
					padding-bottom: 40rpx;
					border-bottom: 1px solid $border;
					margin-bottom: 40rpx;

					.item {
						flex: 1;
						
						.text1 {
							font-weight: bold;
							margin-bottom: 10rpx;
							display: inline-block;
							position: relative;
							.imgbox{
								width: 32rpx;
								height: 32rpx;
								position: absolute;
								top: -10rpx;
								right: -35rpx;
								image {
								width: 32rpx;
								height: 32rpx;
								}
							}
							
						}

						.text2 {
							font-size: 40rpx;

							text {
								font-size: 50rpx;
							}
						}
					}
				}

				.type {
					.item {
						width: 120rpx;

						image {
							width: 90rpx;
							height: 90rpx;
							margin-bottom: 15rpx;
						}

						text {
							font-size: 26rpx;
						}
					}
				}
			}

			.notice {
				.title {
					padding-bottom: 30rpx;

					.circle {
						width: 16rpx;
						height: 16rpx;
						background-color: $greenColor;
						margin-right: 15rpx;
						border-radius: 100%;
					}
				}

				.list {
					.item {
						padding: 25rpx 0;
						font-size: 26rpx;
						border-bottom: 1px solid $border;

						.txt {
							flex: 2;
							text-align: center;

							&.date {
								flex: 3
							}
						}

						&.green-item {
							.txt {
								color: $greenColor;
								font-weight: bold;
							}
						}
					}
				}
			}
		}
	}
</style>

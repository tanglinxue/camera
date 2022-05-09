<template>
	<view class="main column-center">
		<view class="top">
			<uni-notice-bar scrollable class="notice" color="#ffffff" background-color="rgba(0, 0, 0, 0.3)"
				:text="noticeRun" :speed='30' />
			<view class="row-between info">
				<view class="left row-start">
					<view class="imgbox">
						<image :src="useInfo.face" mode="aspectFill"></image>
					</view>
					<view class="column-center-a">
						<view class="name row-start">{{useInfo.nickname}}
							<view class='tagName' v-if='useInfo.status==0'>{{tagName}}</view>
						</view>
						<view class="vip">技师ID：{{useInfo.id}}</view>
					</view>
				</view>
				<view class="column-center-b right">
					<switch :checked='useInfo.auto_location==1' color="#9FD886" @change="switchChange" />
					<text>{{useInfo.auto_location==1?"自动更新开启":"自动更新关闭"}}</text>
				</view>
			</view>
			<view class="address">
				<view class="txt1">更新位置：{{address}}</view>
				<view class="txt2">更新时间：{{updateTime}}</view>
			</view>
		</view>
		<view class="box">
			<view class="boxOuter level column-center" @click='jump(1)'>
				<view class="title">当前等级：V{{useInfo.level}}</view>
				<view class="txt">本期考核：{{scoreInfo.date}}</view>
				<view class="row-between num">
					<view class="item column-center">
						<text class="text1 orange">{{scoreInfo.income_sum}}</text>
						<text class="text2 green">本期业绩</text>
					</view>
					<view class="item column-center">
						<text class="text1 orange">{{scoreInfo.add_chance}}</text>
						<text class="text2 green">本期加钟率</text>
					</view>
					<view class="item column-center">
						<text class="text1 orange">{{scoreInfo.filling}}</text>
						<text class="text2 green">本期充值</text>
					</view>
				</view>
			</view>
			<view class="fun boxOuter">
				<view class="row-between">
					<view class="item column-center" @click='jump(1)'>
						<image src="/static/images/my/icon1.png"></image>
						<text>业绩考核</text>
					</view>
					<view class="item column-center" @click='jump(2)'>
						<image src="/static/images/my/icon2.png"></image>
						<text>收支记录</text>
					</view>
					<view class="item column-center" @click='jump(3)'>
						<image src="/static/images/my/icon3.png"></image>
						<text>分成明细</text>
					</view>
				</view>
			</view>
			<view class="row-between collection">
				<view class="item column-center" @click='chooseLocation'>
					<text class="txt1">位置更新</text>
					<image src="/static/images/my/location.png"></image>
				</view>
				<view class="item column-center" @click='jump(4)'>
					<text class="txt1">时间设置</text>
					<image src="/static/images/my/time.png"></image>
				</view>
			</view>
			<view class="boxOuter notice">
				<view class="title">公告信息</view>

				<view class="list">
					<template v-if='!loading'>
						<Empty v-if='!noticeList.length' text='暂无公告信息'></Empty>
						<template v-else>
							<view class="item row-start-a" v-for='(item,index) in noticeList' :key='index'
								@click='jump(5,item.id)'>
								<view class="txt1">
									{{$methods.format(item.create_time,'yyyy-MM-dd')}}
								</view>
								<view class="txt2 textElis">{{item.news_name}}</view>
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
		mapActions
	} from 'vuex';
	import {
		getLocation
	} from '@/utils/permission.js'
	import Empty from '@/components/empty/index.vue';
	export default {
		components: {
			Empty
		},
		data() {
			return {
				noticeList: [],
				scoreInfo: {},
				fristEnter: true,
				interval: null,
				status: 'more',
				total: 0,
				loading: true,
				query: {
					page: 1,
					pagesize: 5
				},
				noticeRun: '',
				loc:null
			};
		},
		onShow() {
			if(this.loc){
				this.updateH5Location(this.loc)
				return
			}
			if(!this.token){
				const res =  this.$methods.toLogin()
				if(!res) return
			}
			if (this.fristEnter) {
				this.$methods.showLoading();
				this.fristEnter = false;
				this.getData();
			} else {
				this.getData(100, 2);
			}


		},
		computed: {
			...mapState('user', ['useInfo','token']),
			tagName() {
				let {
					status
				} = this.useInfo;
				switch (status) {
					case 0:
						return '停牌中'
					case 1:
						return '正常'
					case 2:
						return '封禁中'
					default:
						return ''
				}
			},
			address() {
				const address = this.useInfo.address
				if (address) {
					return address
				} else {
					return '暂未更新位置'
				}
			},
			updateTime() {
				const time = this.useInfo.time
				if (time) {
					return time
				} else {
					return '暂未更新'
				}
			}
		},

		methods: {
			...mapActions('user', ['updateUseInfo']),
			closeClock() {
				if (this.interval) {
					clearInterval(this.interval);
					this.interval = null
				}
			},
			setClock() {
				console.log('定位自动更新')
				this.closeClock()
				this.getAdd()
				this.interval = setInterval(() => {
					this.getAdd()
				}, this.useInfo.timing);
			},
			async switchChange(e) {
				const autoaddress = e.detail.value ? 1 : 0;
				this.$methods.showLoading('设置中');
				await this.$API.home.auto_address({
					autoaddress
				});
				this.updateUseInfo({
					...this.useInfo,
					auto_location: autoaddress
				})
				if (autoaddress == 1) {
					this.setClock()
				} else {
					this.closeClock()
				}
				this.$methods.showToast(`设置成功`);
			},
			async getData(time = 100, type = 1) {
				let ajaxArr = []
				if (type == 2) {
					ajaxArr = [this.getScore(), this.getDetails()]
				} else {
					ajaxArr = [this.getScore(), this.getNoticeList(), this.getDetails()]
				}
				await Promise.all(ajaxArr);

				if (this.useInfo.auto_location == 1) {
					console.log('打开了定位')	
					this.setClock()
				} else {
					console.log('没有打开定位')
					this.closeClock()
				}
				setTimeout(() => {
					uni.hideLoading();
				}, time)
			},
			// 获取经纬度
			async getAdd() {
				
				
				// #ifdef APP-PLUS
				const {
					latitude,
					longitude,
					address
				} = await getLocation();
				// #endif 
				// #ifdef H5
				const {lat:latitude,lng:longitude,address} = await this.$methods.getLocationH5();
		
				// #endif 

				this.toUpdateAdd(longitude, latitude, address)
			},
			async toUpdateAdd(longitude, latitude, address) {
				try {
					const res = await this.$API.home.up_address({
						lng: longitude,
						lat: latitude,
						address
					})
					this.updateUseInfo({
						...this.useInfo,
						address,
						time: this.$methods.format(new Date().getTime())
					})
				} catch (err) {
					console.log(err)
				}
			},
			async chooseLocation() {
				// #ifdef APP-PLUS
				let {
					latitude,
					longitude
				} = await getLocation()
				uni.chooseLocation({
					latitude: latitude,
					longitude: longitude,
					success: async (res) => {
						const {
							latitude,
							longitude,
							address,
							name
						} = res
						this.$methods.showLoading('更新位置中');
						await this.toUpdateAdd(longitude, latitude, address + name)
						this.$methods.showToast(`更新位置成功`);
					}
				});
				// #endif 
				// #ifdef H5
				
				this.$jump(`/pages/index/chooseAddress`)		
				// #endif 
				
			},
			async updateH5Location(loc){
				this.$methods.showLoading('更新位置中');
				await this.toUpdateAdd(loc.latlng.lng, loc.latlng.lat,  loc.poiaddress+loc.poiname)
				this.$methods.showToast(`更新位置成功`);
				this.loc = null
			},
			async getScore() {
				let scoreInfo = await this.$API.home.getResults();
				if (scoreInfo) {
					this.scoreInfo = scoreInfo
				}
			},
			async getNoticeList() {
				const {
					loading,
					noticeList,
					query
				} = this;
				this.status = 'loading';
				let {
					buttom,
					top
				} = await this.$API.home.getNotice(query);
				this.noticeRun = top.news_content || ''
				let {
					data: clist,
					total
				} = buttom
				if (loading) {
					this.loading = false;
				}
				const {
					page
				} = query;
				if (page !== 1) {
					this.noticeList = [...noticeList, ...clist];
				} else {
					this.noticeList = clist;
				}
				this.total = total;
				if (total > this.noticeList.length) {
					this.status = 'more';
				} else {
					this.status = 'noMore';
				}
			},
			async getDetails() {
				let userInfo = await this.$API.home.tech_details();
				if (userInfo) {
					this.updateUseInfo(userInfo)
				}

			},
			jump(type, id = 0) {
				if (type == 1) {
					this.$jump(`/pages/index/score`);
				} else if (type == 2) {
					this.$jump(`/pages/my/record`);
				} else if (type == 3) {
					this.$jump(`/pages/my/intoDetail`);
				} else if (type == 4) {
					this.$jump(`/pages/index/timeSelect`);
				} else if (type == 5) {
					this.$jump(`/pages/index/noticeDetail?id=${id}`);
				}
			},
			refreshList() {
				this.loading = true;
				this.query.page = 1;
				this.noticeList = [];
				this.total = 0;
			}

		},
		onHide() {
			this.closeClock()
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
			console.log('底部')
			// 下拉加载更多
			if (this.status === 'more') {
				this.query.page = this.query.page + 1;
				this.getNoticeList();
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '@/static/scss/index.scss';

	::v-deep uni-switch .uni-switch-input {
		margin-right: 0;
	}

	.main {
		background: $backColor;

		.top {
			width: 100%;
			min-height: 432rpx;
			background: url(@/static/images/my/pic-bc.png);
			background-size: 100% 100%;
			padding: 180rpx 30rpx 40rpx 30rpx;
			
			margin-bottom: 20rpx;
			position: relative;
			/* #ifdef H5 */
			padding-top:130rpx;
			/* #endif */
			.notice {
				position: absolute;
				left: 0;
				top: 0;
				padding-top: 80rpx;		
				height: 130rpx;
				/* #ifdef H5 */
				padding-top:30rpx;
				height: 80rpx;
				/* #endif */
			}

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
						font-size: 26rpx;
						color: #fff;
					}
				}

				.icon {
					width: 56rpx;
					height: 56rpx;
				}
			}

			.address {
				padding: 20rpx 30rpx;
				width: 100%;
				background: rgba(255, 255, 255, 0.15);
				border-radius: 12rpx;
				font-size: 26rpx;
				color: #fff;
				line-height: 40rpx;
			}

			.right {
				text {
					font-size: 26rpx;
					color: #fff;
					margin-top: 10rpx;
				}
			}
		}

		.box {
			width: 710rpx;

			.level {
				.title {
					font-size: 32rpx;
					font-weight: bold;
					margin-bottom: 20rpx;
				}

				.txt {
					font-size: 26rpx;
					color: $gray;
					margin-bottom: 50rpx;
				}

				.num {
					width: 96%;

					.text1 {
						font-size: 48rpx;
						margin-bottom: 6rpx;
						font-weight: bold;
					}

					.text2 {
						font-size: 28rpx;
						font-weight: bold;
					}
				}
			}

			.fun {
				padding: 30rpx 50rpx;

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

			.collection {
				border-radius: 12rpx;
				margin-bottom: 20rpx;

				.item {
					width: 345rpx;
					height: 140rpx;
					background: url(@/static/images/my/pic-background.png);
					background-size: 100% 100%;
					color: #fff;

					image {
						width: 48rpx;
						height: 48rpx;
						margin-top: 15rpx;
					}
				}
			}

			.notice {
				.title {
					padding-left: 20rpx;
					font-size: 32rpx;
					border-left: 12rpx solid $greenColor;
					font-weight: bold;
				}

				.list {
					padding: 20rpx 0 20rpx 20rpx;

					.item {
						padding: 10rpx 0;
						font-size: 26rpx;

						.txt1 {
							width: 180rpx;
						}

						.txt2 {
							flex: 1;
						}
					}
				}
			}
		}
	}
</style>

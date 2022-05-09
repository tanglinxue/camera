<template>
	<view class="main column-center">
		<view class="navbar row-between">
			<view v-for="(item, index) in navList" :key="index" class="nav-item row-center"
				:class="{ current: tabCurrentIndex === index }" @click="tabClick(index)">
				{{ item.text }}
			</view>
		</view>
		<view class='box'>
			<view class='boxOuter time row-between'>
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
				<view class='greenbtn btn' @click='search'>查询</view>
			</view>
			<view class='boxOuter notice'>

				<view class='list'>
					<view class='item row-start-a green-item'>
						<view class='txt'>变动金额</view>
						<view class='txt'>变动后余额</view>
						<view class='txt'>类型</view>
						<view class='txt txt3'>变动时间</view>
					</view>
					
					<template v-if="!loading">
						<Empty v-if="!list.length"></Empty>
						<template v-else>
							<!-- 订单列表 -->
							<view class='item row-start-a'  v-for='(item,index) in list' :key='index'>
								<view class='txt' :class='{"orange":item.num<0}'>{{item.num}}</view>
								<view class='txt'>{{item.lastnum}}</view>
								<view class='txt'>{{item.type_tag}}</view>
								<view class='txt txt3'>{{item.createtime}}</view>
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
	// ok
	import Empty from '@/components/empty/index.vue';
	import CIcon from '@/components/c-icons/uni-icons.vue'
	export default {
		components: {
			Empty,
			CIcon
		},
		data() {
			return {
				tabCurrentIndex: 0,
				start_time: '',
				end_time:'',
				navList: [{
						state:1,
						text: '本月'
					},
					{
						state: 2,
						text: '上月',
					},
					{
						state: 3,
						text: '最近三个月'
					},
				],
				status: 'more',
				total: 0,
				loading: true,
				list: [],
				query: {
					page: 1,
					pagesize: 20
				}
			}
		},
		onLoad(){
			this.$methods.showLoading();
			this.getList();
		},
		methods:{
			async getList() {
				const { loading, list, query,navList,tabCurrentIndex,start_time,end_time } = this;
				this.status = 'loading';
				let params = {
					...query,
					type:navList[tabCurrentIndex].state,
				}
				if(start_time && end_time){
					params.start_time = start_time
					params.end_time =end_time
				}
				let { data: clist, total } = await this.$API.my.tech_balance(params);
				uni.hideLoading()
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
	}
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
			.time{
				.btn{
					width: 126rpx;
					margin-left: 20rpx;
				}
			}
			.notice {

				.list {
					.item {
						padding: 25rpx 0;
						font-size: 26rpx;
						border-bottom: 1px solid $border;
						.txt {
							flex: 1;
							text-align: center;
							&.txt3{
								flex:2
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

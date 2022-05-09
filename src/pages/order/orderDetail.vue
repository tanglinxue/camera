<template>
	<view class="main">
		<view class="boxOuter step-box">
			<view class="title">{{ order_status_name }}</view>
			

			<view class="progress-box" v-if='type==5&&remainingtime>0'>
				<view class='row-between mgb40'>
					<view class='row-start'><view class='mgl20 green weight bold font36' >{{countDown}}</view></view>
					<view>总时长<text class='green'>{{ detail.allservicetime }}</text>分钟</view>
				</view>
		
				<view class='progress'>
					<progress :percent="progress" activeColor="#67be41" stroke-width="22" />
				</view>

			</view>
			<view class="steps row-between" v-else>
				<view v-for="(item, index) in steps" class="step column-center">
					<image :src="step >= index ? item.aImg : item.img" class="icon"></image>
					<text>{{ item.text }}</text>
				</view>
			</view>
		</view>
		<view class="info boxOuter" v-for="(item, index) in add_order" :key="index">
			<view class="title row-start">
				<view class="circle"></view>
				<text>加钟项目</text>
			</view>
			<view class="line"></view>
			<view class="row-between row">
				<view class="lf row-start">
					<view class="text">加钟项目</view>
					<view class="data">{{ item.productname }}x{{ item.num }}</view>
				</view>
				<text class="tr">
					<text class="rmb">￥</text>
					{{ item.total_price }}
				</text>
			</view>
			<view class="row-between row">
				<view class="lf row-start">
					<view class="text">支付方式</view>
					<view class="data">{{ item.pay_way | pay_way_name }}</view>
				</view>
			</view>
			<view class="row-between row">
				<view class="lf row-start">
					<view class="text">加钟时长</view>
					<view class="data">{{ item.product_time }}分钟</view>
				</view>
			</view>
			<view class="row-between row">
				<view class="lf row-start">
					<view class="text">加钟时间</view>
					<view class="data">{{ item.create_time }}</view>
				</view>
			</view>
		</view>
		<view class="info boxOuter">
			<view class="title row-start">
				<view class="circle"></view>
				<text>服务项目</text>
			</view>
			<view class="line"></view>
			<view class="row-between row">
				<view class="lf row-start">
					<view class="text">服务项目</view>
					<view class="data">{{ detail.product_name }}x{{ detail.num }}</view>
				</view>
				<text class="tr">
					<text class="rmb">￥</text>
					{{ detail.total_project }}
				</text>
			</view>
			<view class="row-between row">
				<view class="lf row-start">
					<view class="text">出行费用</view>
					<view class="data">{{ detail.traffic_mode == 0 ? '公交地铁' : '出租车' }}</view>
				</view>
				<text class="tr">
					<text class="rmb">￥</text>
					{{ detail.traffic_fee }}
				</text>
			</view>
			<view class="row-between row">
				<view class="lf row-start">
					<view class="text">服务时长</view>
					<view class="data">{{ detail.allservicetime }}分钟</view>
				</view>
			</view>
			<view class="row-between row">
				<view class="lf row-start">
					<view class="text">支付方式</view>
					<view class="data">{{ detail.pay_way | pay_way_name }}</view>
				</view>
			</view>
			<view class="row-between row">
				<text class="lf weight black">项目总价</text>
				<view class="tr orange orange36">
					<text class="rmb">￥</text>
					{{ detail.order_all_price }}
				</view>
			</view>
		</view>
		
		<view class="info boxOuter">
			<view class="title row-start">
				<view class="circle"></view>
				<text>订单信息</text>
			</view>
			<view class="line"></view>
			<view class="row-between row">
				<view class="lf row-start">
					<view class="text">联系方式</view>
					<view class="data row-start">
						<text>{{ detail.user_nickname }}</text>
						<view class="new-btn" v-if="detail.is_vip == 0">新客</view>
						<view class="new-btn" v-if="detail.is_vip == 1">老客</view>
						<view class="new-btn" v-if="detail.is_vip == 2">贵客</view>
						<view class="tel" @click="telphone" v-if='showTel'><image src="/static/images/order/tel.png"></image></view>
					</view>
				</view>
			</view>
			<view class="row-between row">
				<view class="lf row-start">
					<view class="text">安全等级</view>
					<view class="data ">{{ detail.slevel | levelName }}</view>
				</view>
			</view>
			<view class="row-between row">
				<view class="lf row-start">
					<view class="text">服务技师</view>
					<view class="data">{{ useInfo.nickname }}</view>
				</view>
			</view>
			<view class="row-between row">
				<view class="lf row-start">
					<view class="text">服务时间</view>
					<view class="data">{{ $methods.format(detail.service_time) }}</view>
				</view>
			</view>
			<view class="row-between row">
				<view class="lf row-start">
					<view class="text">车费详情</view>
					<view class="data">
						<text class="green">{{ detail.traffic_mode == 0 ? '公交地铁' : '出租车' }}</text>
						全程{{ detail.traffic_distance }}公里
					</view>
				</view>
			</view>
			<view class="row-between row" v-if="detail.buyer_remark">
				<view class="lf row-start">
					<view class="text">备注信息</view>
					<view class="data">{{ detail.buyer_remark }}</view>
				</view>
			</view>
			<view class="row-between row">
				<view class="lf row-start-a">
					<view class="text">服务地址</view>
					<view class="data">
						<view>{{ useraddress.serverad }}{{ useraddress.house_number }}<view class='copy mgl20' @click='copy'><image src="/static/images/order/copy.png" class="icon"></image></view></view>
					</view>
				</view>
			</view>
			<view class="row-between row" v-if="detail.noteaddress || showAdd">
				<view class="lf row-start-a">
					<view class="text">备注地址</view>
					<view class="data">
						<view  v-if="detail.noteaddress" class="mgb10">{{ detail.noteaddress }}</view>
						<view class="remark-add" @click="remark" v-if="showAdd">备注地址</view>
					</view>
				</view>
			</view>
			<view class="line"></view>
			<view class="row-between row">
				<view class="lf row-start">
					<view class="text">订单编号</view>
					<view class="data">{{ detail.order_no }}</view>
				</view>
			</view>
			<view class="row-between row">
				<view class="lf row-start">
					<view class="text">订单进度</view>
					<view class="data">
						<view class="step">
							<view class="item column-center-a" :class="{ active: item.time }" v-for="(item, index) in progressListFinay" :key="index">
								<text class="txt1">{{ item.name }}</text>
								<text class="txt2">{{ item.time || '请等待技师操作' }}</text>
								<view class="circle"></view>
								<view class="circle-line" v-if="index != progressListFinay.length - 1"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="info boxOuter" v-if='order_status==12'>
			<view class="title row-start">
				<view class="circle"></view>
				<text>取消原因</text>
			</view>
			<view class="row-between row">
				<view class="lf row-start">
					<view class="data">{{detail.cancelwhy}}</view>
				</view>
			</view>
		</view>
		<view class="row-end" v-if="bottom_title">
			<template >	
				<view class="main-btn gray-btn" v-if='type==5&&remainingtime>0'>{{ bottom_title }}</view>
				<view class="main-btn" @click="submit" v-else>{{ bottom_title }}</view>
			</template>
			
		</view>
		<uni-popup ref="popup" type="bottom" background-color="#fff">
			<view class="popup column-center">
				<view class="title">地址备注</view>
				<view class="login-box">
					<image src="/static/images/my/add.png" class="icon1"></image>
					<input placeholder="请输入" class="input" :inputBorder="false" v-model="noteaddress" />
				</view>
				<view class="main-btn" @click="changeRemark">确认修改</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
//ok
import contant from './mixin/contant.js';
import chooseImage from '@/utils/photo.js'
import {getLocation} from '@/utils/permission.js'
import CIcon from '@/components/c-icons/uni-icons.vue'
export default {
	mixins: [contant],
	components:{
		CIcon
	},
	data() {
		return {
			order_no: '',
			detail: {},
			add_order: [],
			noteaddress: '',
			remainingtime:0,
			firstEnter:true
		};
	},
	filters:{
		md5Code(val){
			if(!val) return ''
			
			 var reg=/^(\d{3})\d{4}(\d{4})$/;
			return  val.replace(reg, "$1****$2");
		}
	},
	onLoad(options) {
		
		if (options.order_no) {
			this.order_no = options.order_no;
		}
		this.$methods.showLoading();
		this.getData();
	},
	onShow(){
		if(!this.firstEnter){
			this.$methods.showLoading();
			this.getData();
		}else{
			this.firstEnter = false
		}
	},

	methods: {
		setClock() {
			this.closeClock()
			uni.setKeepScreenOn({
				keepScreenOn:true
			})
			this.interval = setInterval(() => {	
				this.remainingtime--;
				if (this.remainingtime <= 0) {
					this.remainingtime = 0
					this.closeClock()
				}
			}, 1000);
		},
		telphone() {
			uni.makePhoneCall({
				phoneNumber: this.detail.mobile
			});
		},
		async getData(time = 500) {
			let res = await this.$API.order.getDetail({
				order_id: this.order_no
			});
			setTimeout(() => {
				uni.hideLoading();
			}, time);

			this.detail = res.order_details;
			this.add_order = res.add_order;
			this.remainingtime = this.detail.remainingtime
			if(this.type==5&&this.remainingtime>0){
				this.setClock()
			}
		},
		async submit() {
			if (this.type == 6) {
				return this.$jump(`/pages/order/rating?order_id=${this.order_no}&feedflg_t=${this.detail.feedflg_t}&order_no=${this.detail.order_no}`);
			}
			if (this.type == 7) return;
			if (this.type == 3) {
				return this.chooseImage()
			}
			this.action()
			
		},
		async action(photo=''){
			try {
				// if(!photo){
				// 	this.$methods.showLoading('操作中');
				// }
				// #ifdef APP-PLUS
				const { latitude, longitude, address } = await getLocation();
				// #endif 
				// #ifdef H5
				const {lat:latitude,lng:longitude,address} = await this.$methods.getLocationH5();
						
				// #endif 
				let params = {
					order_id: this.order_no,
					type: this.type,
					lng: longitude,
					lat: latitude,
					address
				}
				if(this.type==3){
					params.sceneimg= photo
				}
				const data = await this.$API.order.order_operation(params);
				this.$methods.showToast(data);
				this.getData(2000);
			} catch (err) {
				console.log(err);
			}
		},
		async chooseImage() {
			let res = await chooseImage();
			console.log(res)
			const file = res.tempFilePaths[0]
			this.$methods.showLoading('操作中');
			const photo = await this.$API.order.imgfile({imgfile:file})
			this.action(photo)
		},
		remark() {
			console.log('备注')
			this.$refs.popup.open();
		},
		async changeRemark() {
			if (!this.noteaddress) {
				return this.$methods.showToast('请输入地址备注');
			}
			try {
				this.$methods.showLoading('修改中');
				await this.$API.order.address_note({
					order_id: this.order_no,
					noteaddress: this.noteaddress
				});
				this.$set(this.detail, 'noteaddress', this.noteaddress);
				this.noteaddress = '';
				this.$methods.showToast(`修改成功`);
				this.$refs.popup.close();
			} catch (err) {
				console.log(err);
			}
		},
		closeClock(){
			if(this.interval){
				uni.setKeepScreenOn({
					keepScreenOn:false
				})
				clearInterval(this.interval);
				this.interval = null
			}
		},
		// 复制
		copy() {
			console.log('点了复制')
			const {serverad,house_number}=this.useraddress
		
			uni.setClipboardData({
				data: serverad+house_number,
				success: () => {
					uni.showToast({
						title: '复制成功'
					});
				}
			});
		},
	},
	onHide(){
		this.closeClock()
	},

	onPullDownRefresh() {
		// 上拉刷新
		this.getData();
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	}
};
</script>

<style lang="scss" scoped>
@import '@/static/scss/index.scss';

.main {
	padding: 20rpx;
	background: $backColor;
	padding-bottom: 130rpx;
	.gray-btn{
		background:$gray
	}
	.row-end {
		width: 100%;
		position: fixed;
		padding: 20rpx;
		bottom: 0;
		left: 0;
		background-color: #f7f7f7;
	}

	.progress-box {
		padding: 35rpx 20rpx;
		font-size: 28rpx;

		.progress {
			border-radius: 22px;
			overflow: hidden;
		}
	}

	.step-box {
		padding: 0;
		overflow: hidden;

		.title {
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			background: $greenColor;
			padding-left: 40rpx;
			color: #fff;
			font-size: 36rpx;
			font-weight: bold;
		}

		.steps {
			padding: 50rpx 0;

			.step {
				position: relative;
				flex: 1;

				&:after {
					content: '';
					position: absolute;
					height: 0;
					border-top: 1px dashed $gray;
					width: 100%;
					top: 30rpx;
				}

				text {
					color: $gray;
					font-size: 26rpx;
				}

				.icon {
					width: 60rpx;
					height: 60rpx;
					margin-bottom: 16rpx;
					position: relative;
					z-index: 99;
				}
			}
		}
	}

	.info {
		.orange36 {
			font-size: 36rpx;
			font-weight: bold;
			color: $orange;
		}

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

		.line {
			width: 100%;
			border-top: 1px solid $border;
			padding-bottom: 30rpx;
		}

		.row {
			font-size: 28rpx;
			padding-bottom: 20rpx;

			.lf {
				color: $gray;

				.new-btn {
					width: 90rpx;
					height: 40rpx;
					line-height: 40rpx;
					background: $greenColor;
					border-radius: 4rpx;
					font-size: 26rpx;
					color: #fff;
					text-align: center;
					margin-left: 20rpx;
				}

				.tel {
					width: 32rpx;
					height: 32rpx;
					margin-left: 30rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.text {
					width: 150rpx;
				}

				.data {
					flex: 1;
					color: $maiBlack;

					.remark-add {
						display: inline-block;
						color: $greenColor;
						border-bottom: 1px solid $greenColor;
					}

					.step {
						.item {
							font-size: 26rpx;
							padding-bottom: 30rpx;
							padding-left: 40rpx;
							position: relative;

							&.active {
								color: $greenColor;

								.txt2 {
									color: $greenColor;
								}

								.circle {
									width: 28rpx;
									height: 28rpx;
									background: url(@/static/images/order/circle.png);
									background-size: 100% 100%;
									left: -6rpx;
									top: 6rpx;
								}

								.circle-line {
									border-color: $greenColor;
								}
							}

							.circle {
								width: 20rpx;
								height: 20rpx;
								border-radius: 20rpx;
								background: #ddd;
								position: absolute;
								left: 0;
								top: 10rpx;
							}

							.circle-line {
								width: 0;
								height: 116rpx;
								border-left: 1px dashed #ddd;
								position: absolute;
								left: 10rpx;
								top: 20rpx;
							}

							.txt1 {
								font-size: 28rpx;
								margin-bottom: 10rpx;
							}

							.txt2 {
								color: $gray;
							}
						}
					}
				}
			}

			.tr {
				.rmb {
					font-size: 22rpx;
				}
			}
		}
	}
}
.copy{
	display: inline-block;
	.icon{
		width: 40rpx;
		height: 40rpx;
		position: relative;
		top:8rpx
	}
}
.popup {
	width: 100%;
	padding: 30rpx 20rpx;

	.title {
		font-weight: bold;
		font-size: 32rpx;
		margin-bottom: 60rpx;
	}

	.login-box {
		width: 100%;
		padding: 20rpx 30rpx;
		border: 1px solid $border;
		border-radius: 12rpx;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 80rpx;

		.icon1 {
			width: 42rpx;
			height: 42rpx;
			margin-right: 20rpx;
			position: relative;
			top: -3rpx;
		}

		.input {
			flex: 1;
			border-left: 1px solid $border;
			text-indent: 20rpx;
		}
	}
}
</style>

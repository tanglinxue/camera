<template>
	<view class="main column-center">
		<view class="top">
			<uni-notice-bar
				scrollable
				class="notice"
				color="#ffffff"
				background-color="rgba(0, 0, 0, 0.3)"
				:text="noticeRun"
				:speed='70'
				1651419782
			/>
			<view class="row-between info">
				<view class="left row-start">
					<view class="imgbox">
						<image :src="myInfo.face"></image>
					</view>
					<view class="column-center-a">
						<view class="name">{{myInfo.nickname}}</view>
						<view class="vip">技师ID：{{myInfo.id}}</view>
					</view>
				</view>
				<view class="column-center-b right">
					<switch checked color="#9FD886" />
					<text>自动更新开启</text>
				</view>
			</view>
			<view class="address">
				<text class="txt1">更新位置：中国浙江省杭州市西湖区古墩路古墩路附近</text>
				<text class="txt2">更新时间：2022-03-18 17:28:52</text>
			</view>
		</view>
    <pics></pics>
		<view class="box">
			<view class="boxOuter level column-center">
				<view class="title">当前等级：V{{myInfo.level}}</view>
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
					<view class="item column-center"  @click='jump(2)'>
						<image src="/static/images/my/icon2.png"></image>
						<text>收支记录</text>
					</view>
					<view class="item column-center"  @click='jump(3)'>
						<image src="/static/images/my/icon3.png"></image>
						<text>分成明细</text>
					</view>
				</view>
			</view>
			<view class="row-between collection">
				<view class="item column-center" >
					<text class="txt1">位置更新</text>
					<image src="/static/images/my/location.png"></image>
				</view>
				<view class="item column-center" @click='jump(4)'>
					<text class="txt1">时间设置</text>
					<image src="/static/images/my/time.png"></image>
				</view>
			</view>
			<view class="boxOuter notice">
				<view class="title">公告信息325</view>
				<view class="list">
					<view class="item row-start-a" v-for='(item,index) in noticeList' :key='index' @click='jump(5)'>
						<view class="txt1"><uni-dateformat :date='item.create_time*1000' format='yyyy-MM-dd'></uni-dateformat></view>
						<view class="txt2 textElis">{{item.news_name}}</view>
					</view>
				</view>
			</view>
		</view>
		{{hello}}
	</view>
</template>
<script>
import pics from '../../components/pic'
export default {
	data() {
		return {
			noticeList:[],
			scoreInfo:{},
			myInfo: {},
			fristEnter: true,
			hello:''
		};
	},
	components:{pics},
	onShow() {
		console.log('测试')
		
		if (this.fristEnter) {
			this.$methods.showLoading();
			this.fristEnter = false;
		}
		this.getData();
	},
	computed:{
		noticeRun(){
			if(this.noticeList.length){
				return '公告：'+this.noticeList[0].news_name
			}else{
				return ''
			}		
		}
	},
	methods: {
		async getData() {
			await Promise.all([this.getScore(), this.getNoticeList(), this.getDetails()]);
			uni.hideLoading();
		},
		async getScore() {
			this.scoreInfo = await this.$API.home.getResults({
				ids: 47
			});
		},
		async getNoticeList() {
			this.noticeList = await this.$API.home.getNotice();
		},
		async getDetails() {
			this.myInfo = await this.$API.home.tech_details({
				ids: 47
			});
		},
		jump(type){
			if(type==1){
				this.$jump(`/pages/index/score`);
			}else if(type==2){
				this.$jump(`/pages/my/record`);
			}else if(type==3){
				this.$jump(`/pages/my/intoDetail`);
			}else if(type==4){
				this.$jump(`/pages/index/timeSelect`);
			}else if(type==5){
				this.$jump(`/pages/index/noticeDetail`);
			}
		}
	},
	onPullDownRefresh() {
		// 上拉刷新
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
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
		height: 432rpx;
		background: url(@/static/images/my/pic-bc.png);
		background-size: 100% 100%;
		padding: 110rpx 30rpx 40rpx 30rpx;
		margin-bottom: 20rpx;
		position: relative;
		.notice {
			position: absolute;
			left: 0;
			top: 0;
			height: 70rpx;
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
					font-size: 60rpx;
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

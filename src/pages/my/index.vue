<template>
	<view class="main column-center">
		<view class="row-between top-info">
			<view class="left row-start">
				<view class="imgbox"><image :src="userinfo.avatar" mode="aspectFill"></image></view>
				<view class="name">{{ userinfo.nickname }}</view>
			</view>
			<view class="column-center-a right">
				<text class="mgb10">等级：{{ userinfo.level }}</text>
				<text>截止日期：{{ userinfo.end_date }}</text>
			</view>
		</view>
		<view class="boxOuter-box">
			<view class="boxOuter">
				<view class="row-between num-box">
					<view class="item column-center" @click="jump(1)">
						<view class="text1">报价数</view>
						<view class="text2">{{ price_count }}</view>
					</view>
					<view class="item column-center" @click="jump(2)">
						<view class="text1">预定数</view>
						<view class="text2">{{ reserve_count }}</view>
					</view>
					<view class="item column-center" @click="jump(3)">
						<view class="text1">成交数</view>
						<view class="text2">{{ settled_count }}</view>
					</view>
				</view>
			</view>
			<view class="boxOuter">
				<view class="row row-between borderbottom" @click="jump(4)">
					<view class="row-start">
						<uni-icons type="person" size="26" class="icon"></uni-icons>
						<text class="tit">我的信息</text>
					</view>
				</view>
				<view class="row row-between borderbottom" @click='downFile(price_template)'>
					<view class="row-start">
						<uni-icons type="download" size="26" class="icon"></uni-icons>
						<text class="tit">行业报价模版（下载）</text>
					</view>
				</view>
				<view class="row row-between" @click='downFile(contract_template)'>
					<view class="row-start">
						<uni-icons type="download" size="26" class="icon"></uni-icons>
						<text class="tit">行业合同模版（下载）</text>
					</view>
				</view>
			</view>
			<view class="boxOuter">
				<view class="row row-between borderbottom">
					<view class="row-start">
						<uni-icons type="eye" size="26" class="icon"></uni-icons>
						<text class="tit">关注影助理公众号</text>
					</view>
				</view>
				<view class="row row-between borderbottom">
					<view class="row-start">
						<uni-icons type="headphones" size="26" class="icon"></uni-icons>
						<text class="tit">联系影助理客服</text>
					</view>
				</view>
			</view>
		</view>

		<view class="bottom-text column-center">
			<view class="row-between mgb20">
				<view class="line"></view>
				<text class="font30 mgl20">影助理1.0</text>
				<view class="line mgl20"></view>
			</view>

			<text>为活动会议影像从业者服务</text>
		</view>
	</view>
</template>

<script>
//finish
export default {
	data() {
		return {
			fristEnter: true,
			userinfo: {
				avatar: '',
				end_date: '',
				level: '',
				nickname: ''
			},
			price_count: 0, //报价数
			reserve_count: 0, //预定数
			settled_count: 0, //成交数
			price_template:'',//报价模板
			contract_template:'',//合同模板
			essay_gzh: '', //关注公众的公众号文章链接
			essay_kefu: '' //客服的公众号文章链接
		};
	},
	onShow() {
		if (this.fristEnter) {
			this.$methods.showLoading();
			this.fristEnter = false;
		}
		this.getData();
	},
	methods: {
		async getData(time = 300) {
			const { userinfo, price_count, reserve_count, settled_count, essay_gzh, essay_kefu,price_template, contract_template} = await await this.$API.my.mypage();
			this.userinfo = userinfo;
			this.price_count = price_count;
			this.reserve_count = reserve_count;
			this.settled_count = settled_count;
			this.essay_gzh = essay_gzh;
			this.essay_kefu = essay_kefu;
			this.price_template = price_template;
			this.contract_template = contract_template;
			setTimeout(() => {
				uni.hideLoading();
			}, time);
		},
		jump(type) {
			if (type == 1) {
				// 历史报价记录
				this.$jump(`/pages/my/historyRecord`);
			}else if (type == 2) {
				// 我的订单
				this.$jump(`/pages/order/index?type=2`, 3);
			} else if (type == 3) {
				// 我的订单
				this.$jump(`/pages/order/index?type=3`, 3);
			} else if (type == 4) {
				// 我的信息
				this.$jump(`/pages/my/info`);
			}
		},
		downFile(url) {
			wx.downloadFile({
				url,
				success(res) {
					let filePath = res.tempFilePath;
					wx.openDocument({
						filePath: filePath,
						success: function(res) {
							console.log('openDocument sucess')
						},
						fail: function(res) {
							console.log('openDocument fail');
						},
						complete: function(res) {
							console.log('openDocument complete');
						}
					});
				},
				fail(err) {
					console.log(err);
				}
			});
		}
	},
	onPullDownRefresh() {
		this.$methods.showLoading('刷新中...');
		this.getData(1000);
		// 上拉刷新
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	}
};
</script>

<style lang="scss" scoped>
@import '@/static/scss/index.scss';

.main {
	padding-bottom: 100rpx;
	.top-info {
		width: 100%;
		padding: 30rpx;
		background: $white;
		position: relative;
		margin-bottom: 20rpx;
		.left {
			.imgbox {
				width: 120rpx;
				height: 120rpx;
				border-radius: 100%;
				margin-right: 50rpx;
				image {
					width: 100%;
					height: 100%;
					border-radius: 100%;
				}
			}
			.name {
				font-weight: bold;
			}
		}
		.right {
			font-size: 26rpx;
		}
	}

	.boxOuter-box {
		width: 100%;
		padding: 0 30rpx;

		.boxOuter {
			padding: 0;
			overflow: hidden;
			.num-box {
				padding: 30rpx;
				background: $white;
				.item {
					flex: 1;
					.text1 {
						margin-bottom: 20rpx;
					}
					.text2 {
						font-weight: bold;
					}
				}
			}
			.row {
				padding: 30rpx;
				color: $gray;
				.icon {
					margin-right: 20rpx;
				}
			}
		}
	}

	.bottom-text {
		font-size: 26rpx;
		color: $gray;
		margin-top: 100rpx;
		.line {
			width: 100rpx;
			height: 1rpx;
			background: $gray;
		}
	}
}
</style>

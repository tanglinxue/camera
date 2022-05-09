<template>
	<view class="main column-center">
		<view class='title'>
			温馨提示：如需修改手机号码，生活照，个人简介等请与技师长联系修改
		</view>
		<view class='box'>
			<view class="row-between person">
				<view class="left row-start">
					<view class="imgbox">
						<image
							:src="myInfo.face" mode="aspectFill">
						</image>
					</view>
					<view class="column-center-a">
						<view class="name">{{myInfo.nickname}}</view>
						<view class="vip">技师ID：{{myInfo.id}}</view>
					</view>
				</view>
			</view>
			<view class="row borderbottom row-between">
				<text class="tit">平台姓名</text>
				<text class='val'>{{myInfo.nickname}}</text>
			</view>
			<view class="row borderbottom row-between">
				<text class="tit">技师姓名</text>
				<text class='val'>{{myInfo.realname}}</text>
			</view>
			<view class="row borderbottom row-between">
				<text class="tit">账号状态</text>
				<text class='val'>{{myInfo.status==0?'停牌':'正常'}}</text>
			</view>
			<view class="row borderbottom row-between">
				<text class="tit">技师电话</text>
				<text class='val'>{{myInfo.tel}}</text>
			</view>
			<view class="row borderbottom row-between">
				<text class="tit">技师年龄</text>
				<text class='val'>{{myInfo.age}}</text>
			</view>
			<view class="row borderbottom row-between">
				<text class="tit">技师等级</text>
				<text class='val'>{{gradeName}}</text>
			</view>
			<view class="row borderbottom" v-if='otherPics && otherPics.length'>
				<view class="tit">个人简介</view>
				<view class='tag-box'>
					{{myInfo.introduce}}
				</view>
			</view>
			
			<view class="row borderbottom pb0">
				<view class="tit">技师头像</view>
				<view class='tag-box row-start wrap'>
					<view class='img' v-for='(item,index) in [myInfo.face]' :key='index' @click='previewImage(item)'>
						<image
							:src="item" mode="aspectFill">
						</image>
					</view>
				</view>
			</view>
			<view class="row borderbottom pb0" v-if='picArr && picArr.length'>
				<view class="tit">技师生活照</view>
				<view class='tag-box row-start wrap'>
					<view class='img' v-for='(item,index) in picArr' :key='index' @click='previewImage(item)'>
						<image
							:src="item" mode="aspectFill">
						</image>
					</view>
				</view>
			</view>
			<view class="row borderbottom pb0" v-if='myInfo.product_id && myInfo.product_id.length'>
				<view class="tit">服务项目</view>
				<view class='tag-box row-start wrap'>
					<view class='tag' v-for='(item,index) in myInfo.product_id' :key='index'>{{item.title}}</view>
				</view>
			</view>
			<view class="row borderbottom row-between">
				<text class="tit">工作经验</text>
				<text class='val'>{{myInfo.workyear}}年</text>
			</view>
			<view class="row borderbottom row-between">
				<text class="tit">疫苗接种</text>
				<text class='val'>{{myInfo.halthok==1?"已经接种":"暂未接种"}}</text>
			</view>
			<view class="row pb0" v-if='otherPics && otherPics.length'>
				<view class="tit">其他证照</view>
				<view class='tag-box row-start wrap'>
					<view class='img' v-for='(item,index) in otherPics' :key='index'  @click='previewImage(item)'>
						<image
							:src="item" mode="aspectFill">
						</image>
					</view>
				</view>
			</view>
			
		</view>
		<view class='main-btn' @click='back'>返回</view>

	</view>
</template>
<script>
	// ok
	export default {
		data() {
			return {
				myInfo:{}
			}
		},
		computed: {
			picArr(){
				if(this.myInfo.pic){
					return this.myInfo.pic.split(',')
				}else{
					return []
				}
			},
			otherPics(){
				const {healthpic,jobpic,qualification} = this.myInfo
				const arr = []
				if(healthpic){
					arr.push(healthpic)
				}
				if(jobpic){
					arr.push(jobpic)
				}
				if(qualification){
					arr.push(qualification)
				}
				return arr
			},
			gradeName(){
				let grade = this.myInfo.grade;
				switch(grade*1){
					case 0:
						return '初级'
					case 1:
						return '中级'	
					case 2:
						return '高级'
					case 3:
						return '特级'
					case 4:
						return '顾问'
					default:
						return ''
				}
			}
		},
		onLoad() {
			this.getData();
		},

		methods: {
			previewImage(url) {
				uni.previewImage({
					urls:[url]
				});
			},
			async getData() {
				this.$methods.showLoading();
				this.myInfo = await this.$API.my.tech_detail();
				uni.hideLoading()
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/scss/index.scss';

	.main {
		background: $backColor;
		font-size: 28rpx;
		padding-bottom: 20rpx;

		.main-btn {
			width: 710rpx;
		}

		.title {
			color: #fff;
			padding: 20rpx 30rpx;
			line-height: 40rpx;
			background: $greenColor;
			margin-bottom: 20rpx;
		}

		.box {
			width: 710rpx;
			background: #ffffff;
			box-shadow: 0px 0px 8rpx 0px rgba(218, 218, 218, 0.5);
			border-radius: 12rpx;
			margin-bottom: 40rpx;
			padding: 40rpx 30rpx 20rpx;

			.person {
				margin-bottom: 20rpx;

				.left {
					.imgbox {
						width: 140rpx;
						height: 140rpx;
						border: 6rpx solid #F0F0F0;
						border-radius: 100%;
						margin-right: 40rpx;

						image {
							width: 100%;
							height: 100%;
							border-radius: 100%;
						}
					}

					.name {
						font-size: 36rpx;
						font-weight: bold;
						margin-bottom: 15rpx;
					}

					.vip {
						font-size: 30rpx;
						color: $gray
					}
				}
			}

			.row {
				position: relative;
				padding: 30rpx 0;
				background: #fff;
				font-size: 28rpx;
				&.pb0{
					padding-bottom: 0;
				}

				.tag-box {
					margin-top: 20rpx;

					.tag {
						width: 200rpx;
						height: 72rpx;
						line-height: 72rpx;
						color: $gray;
						text-align: center;
						background: #F0F0F0;
						border-radius: 12rpx;
						margin-right: 20rpx;
						margin-bottom: 20rpx;

						&:nth-child(3n) {
							margin-right: 0
						}
					}

					.img {
						width: 200rpx;
						height: 200rpx;
						border-radius: 12rpx;
						margin-right: 20rpx;
						margin-bottom: 20rpx;

						image {
							width: 100%;
							height: 100%;
						}

						&:nth-child(3n) {
							margin-right: 0
						}
					}
				}

				.val {
					color: $gray
				}
			}
		}


	}
</style>

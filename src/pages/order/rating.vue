<template>
	<view class="main column-center">
		<view class='box'>
			<view class="row-between person">
				<view class="left row-start">
					<view class="imgbox">
						<image :src="info.avatar" mode="aspectFill"></image>
					</view>
					<view class="column-center-a">
						<view class="name">{{info.nickname}}</view>
						<view class="vip">{{genderName}}</view>
					</view>
				</view>
			</view>
			<!-- <view class="row borderbottom row-between">
				<view class="tit">年龄段</view>
				<picker @change="bindPickerChange" :value="hitlevel" :range="array1" class='input'>
					<view class='row-end gray'>{{hitlevel<0?"请选择":array1[hitlevel]}}
						<uni-icons type="forward" size="18"></uni-icons>
					</view>
				</picker>
			</view>
			<view class="row row-between">
				<view class="tit">地址类型</view>
				<picker @change="bindPickerChange2" :value="area_type" :range="array2" class='input'>
					<view class='row-end gray'>{{area_type<0?"请选择":array2[area_type]}}
						<uni-icons type="forward" size="18"></uni-icons>
					</view>
				</picker>
			</view> -->
		</view>
		<view class='box tag-box-outer'>
			<view class="row ">
				<view class="title row-start">
					<view class="circle"></view>
					<text>年龄段</text>
				</view>
				<view class='tag-box row-start wrap'>
					<view class='tag' :class='{"active":hitlevel==index}' v-for='(item,index) in array1' :key='index' @click="selectTop(index,'hitlevel')">{{item}}</view>
				</view>
			</view>
		</view>
		<view class='box tag-box-outer'>
			<view class="row ">
				<view class="title row-start">
					<view class="circle"></view>
					<text>地址类型</text>
				</view>
				<view class='tag-box row-start wrap'>
					<view class='tag' :class='{"active":area_type==index}' v-for='(item,index) in array2' :key='index' @click="selectTop(index,'area_type')">{{item}}</view>
				</view>
			</view>
		</view>
		<view class='box tag-box-outer'>
			<view class="row ">
				<view class="title row-start">
					<view class="circle"></view>
					<text>行为举止</text>
				</view>
				<view class='tag-box row-start wrap'>
					<view class='tag' :class='{"active":item.selected}' v-for='(item,index) in replytag' :key='index' @click='selectTag(item)'>{{item.tag}}</view>
				</view>
			</view>
		</view>
		<view class='boxOuter' v-if='!feedflg_t || reply_text'>
			<view class="title">订单相关备注</view>
			<view v-if='feedflg_t'>{{reply_text}}</view>
			<uni-easyinput type="textarea" placeholder="客户怎么了解到我们的？订单服务过程中的特殊情况"
				class="textarea" :clearable='false' :inputBorder='false' maxlength='200' v-model='reply_text' v-else/>
		</view>
		<view class='main-btn' @click='submit' v-if='!feedflg_t'>提交</view>

	</view>
</template>
<script>
	//ok
	import CIcon from '@/components/c-icons/uni-icons.vue'
	export default {
		data() {
			return {
				array1: ['60后', '70后', '80后','90后','00后'],
				hitlevel: -1,
				array2: ['星级酒店', '连锁酒店', '住宅', '公司'],
				area_type: -1,
				info: {},
				replytag: [],
				reply_text:'',
				feedflg_t:0,
				order_no:'',
				order_id:'',
				rateInfo:{}
			}
		},
		components: {
			CIcon
		},
		onLoad(options) {
			this.order_id = options.order_id
			this.feedflg_t = options.feedflg_t * 1
			this.order_no = options.order_no
			this.getData();
		},
		computed:{
			genderName(){
				const gender = this.info.gender;
				switch(gender*1){
					case 1:
						return '男'
					case 2:
						return '女'
					default:
						return '未知'
				}
			}
		},

		methods: {
			async getData(){
				this.$methods.showLoading();
				await Promise.all([this.getRateInfo(), this.getInfo()]);
				uni.hideLoading();
				if(!this.feedflg_t) return
				let {hitlevel,area_type,reply_text,reply_tag} = this.rateInfo
				this.hitlevel = hitlevel*1-1;
				this.area_type = area_type;
				if(reply_text){
					this.reply_text = reply_text
				}
				const reply_tagArr = reply_tag.split(',')
				this.replytag.forEach(item=>{
					if(reply_tagArr.includes(item.tag)){
						this.$set(item,'selected',true)
					}
				})
				
				
			},
			selectTop(index,type){
				if(this.feedflg_t) return
				this[type] = index
			},
			selectTag(item){
				if(this.feedflg_t) return
				if(item.selected){
					item.selected = false
				}else{
					this.$set(item,'selected',true)
				}
			},
			async getInfo() {		
				const {
					details,
					replytag
				} = await this.$API.order.tech_reply({
					order_id: this.order_id
				});
				this.info = details;
				this.replytag = replytag
			},
			async getRateInfo() {
				if(!this.feedflg_t) return ''
				this.rateInfo = await this.$API.order.reply_val({
					order_no: this.order_no
				});
				
			

			},
			async submit(){
				const {hitlevel,area_type,replytag,reply_text,order_id} = this; 
				

				if(hitlevel<0){
					return this.$methods.showToast('请选择年龄段')
				}
				if(area_type<0){
					return this.$methods.showToast('请选择地址类型')
				}
				let reply_tag = replytag.filter(item=>item.selected).map(item=>item.tag).join(',')
				console.log(reply_tag)
				if(!reply_tag){
					return this.$methods.showToast('请选择行为举止')
				}
				let params = {
					hitlevel:hitlevel*1+1,area_type,reply_tag,reply_text,order_id
				}
				if(reply_text){
					params.reply_text = reply_text
				}
				
				try{
					this.$methods.showLoading('评论中')
					const res = await this.$API.order.submit_reply(params)
					this.$methods.showToast(`评论成功`);
					setTimeout(() => {
						uni.navigateBack();
					}, 800)
				}catch(err){
					console.log(err)
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/scss/index.scss';

	.main {
		background: $backColor;
		font-size: 28rpx;
		padding: 20rpx;

		.main-btn {
			width: 710rpx;
		}

		.box {
			width: 710rpx;
			background: #ffffff;
			box-shadow: 0px 0px 8rpx 0px rgba(218, 218, 218, 0.5);
			border-radius: 12rpx;
			margin-bottom: 20rpx;
			padding: 40rpx 30rpx 0;

			&.tag-box-outer {
				padding: 30rpx 30rpx;

				.row {
					padding: 0;

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

					.tag-box {
						margin-top: 0;
					}
				}
			}

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

				.input {
					flex: 1
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
						&.active{
							color:#fff;
							background: $greenColor;
						}

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

		.boxOuter {
			width: 710rpx;

			.title {
				margin-bottom: 20rpx;
			}

			.textarea {
				border-radius: 12rpx;
				background-color: #f3f3f3;
				padding: 10rpx 20rpx;
			}
		}

	}
</style>

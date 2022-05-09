<template>
	<view class="content column-center">
		<view class='box'>
			<view class='row-between pay_way'>

				<image :src='pay_way==0?"/static/images/my/wx-a.png":"/static/images/my/wx.png"' @click='pay_way=0'>
				</image>
				<image :src='pay_way==1?"/static/images/my/card-a.png":"/static/images/my/card.png"' @click='pay_way=1'>
				</image>
			</view>
			<template v-if='pay_way==0'>
				<view class="row borderbottom row-between">
					<text class="tit">绑定微信</text>
					<view class='row-start gray' @click="bindWx">
						{{wx_text || '去绑定'}}
						<uni-icons type="forward" size="18"></uni-icons>
					</view>
				</view>
				<view class="row borderbottom row-between">
					<text class="tit">真实姓名</text>
					<input class="input" type="text" placeholder="请输入您的真实姓名"  v-model="form1.wx_name"/>
				</view>
			</template>
			<template v-if='pay_way==1'>
				<view class="row borderbottom row-between">
					<text class="tit">开户银行</text>

					<picker @change="bindPickerChange" :value="index" :range="array" class='input' range-key="bank_name">
						<view class='row-end gray'>{{index<0?"请选择":array[index].bank_name}}
							<uni-icons type="forward" size="18"></uni-icons>
						</view>
					</picker>
				</view>
				<view class="row borderbottom row-between">
					<text class="tit">卡号</text>
					<input class="input" type="number" placeholder="请输入您的卡号"  v-model="form2.bank_number"/>
				</view>
				<view class="row borderbottom row-between">
					<text class="tit">开户名</text>
					<view class="input" >{{realname}}</view>
				</view>
					

			</template>
		</view>
		<view class="main-btn" @click='submit'>提交</view>
	</view>
</template>
<script>
	// ok
	import { mapState } from 'vuex';
	import {bindWeiXin} from '@/utils/wxbind.js'
	import CIcon from '@/components/c-icons/uni-icons.vue'
	export default {
		components:{CIcon},
		data() {
			return {
				pay_way: 0,
				array: [],
				index: -1,
				form1:{
					wx_name:''
				},
				form2:{
					bank_number:'',
					bank_name:''
				},
				canclick: true,
				wx_text:'',
				realname:''
			}
		},
		onLoad(){		
			this.getData()	
		},
		computed:{
			...mapState('user', ['useInfo']),
		},
		methods: {
			async bindWx(){
					
				try{
					if (!this.canclick) return
					this.canclick = false
					const code = await bindWeiXin()
					this.$methods.showLoading('绑定中')
					let result = await this.$API.my.weixinLogin({
						code
					})
					this.$methods.showToast(`绑定成功`);
					if(result){
						this.wx_text = result
					}
				}catch(err){
					console.log(err)
				}finally {
					setTimeout(() => {
						uni.hideLoading()
						this.canclick = true
					}, 1500)
				}
			},
			async getData(){	
				this.$methods.showLoading();
				const [,res] = await Promise.all([this.getList(),  this.getDetails()]);
				this.render(res)
				uni.hideLoading();
			},
			render(res){
				const {bank_name,bank_number,pay_way,realname,wx_name,wx_text} = res
				this.pay_way = pay_way
				this.realname = realname
				if(wx_text){
					this.wx_text = wx_text
				}
				if(bank_name){
					this.form2.bank_name = bank_name;
					this.index = this.array.findIndex(item=>item.bank_name===bank_name)
				}
				if(bank_number){
					this.form2.bank_number = bank_number;
				}
				if(wx_name){
					this.form1.wx_name = wx_name;
				}
				
				
			},
			async getList(){
				this.array = await this.$API.my.get_bank_list()
			},
			async getDetails(){
				return await this.$API.my.tech_pay_way()
				this.pay_way = pay_way;
				
			},
			bindPickerChange(e) {
				console.log(e)
				const index =e.detail.value
				this.index = index
				this.form2.bank_name = this.array[index].bank_name
			},
			async submit(){
				const {pay_way} = this; 
				let params = {}
				if(pay_way==1){
					params = this.form2
					if(!params.bank_name){
						return this.$methods.showToast('请选择开户银行')
					}
					if(!params.bank_number){
						return this.$methods.showToast('请输入您的卡号')
					}
				}else{
					params = this.form1
				}
				params.pay_way = pay_way
				try{
					if (!this.canclick) return
					this.canclick = false
					this.$methods.showLoading('设置中')
					const res = await this.$API.my.set_bank(params)
					this.$methods.showToast(`设置成功`);
					setTimeout(() => {
						uni.navigateBack();
					}, 1200)
				}catch(err){
					console.log(err)
				}finally {
					setTimeout(() => {
						uni.hideLoading()
						this.canclick = true
					}, 1500)
				}
			},
		 }
	}
</script>


<style lang="scss" scoped>
	@import '@/static/scss/index.scss';

	.content {
		padding-top: 20rpx;

		.main-btn {
			width: 710rpx;
		}

		.box {
			width: 710rpx;
			background: #FFFFFF;
			box-shadow: 0px 0px 8rpx 0px rgba(218, 218, 218, 0.5);
			border-radius: 12rpx;
			margin-bottom: 60rpx;
			padding: 50rpx 30rpx 0;

			.pay_way {
				image {
					width: 310rpx;
					height: 120rpx;
					margin-bottom: 30rpx;
				}
			}

			.row {
				display: flex;
				align-items: center;
				position: relative;
				padding: 30rpx 0;
				background: #fff;
				font-size: 28rpx;

				.icon {
					width: 32rpx;
					height: 32rpx;
					margin-right: 10rpx;
				}

				.tit {
					font-weight: bold;
				}

				.input {
					flex: 1;
					font-size: 28rpx;
					text-align: right;
				}
			}
		}

	}
</style>

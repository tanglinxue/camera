<template>
	<view class="main column-center">
		<view class="boxOuter">
			<view class="main-title  font36 mgb30">绿城新品发布会 影像服务</view>
			<view class="mgb30 total-fee row-between">
				<view class='row-start'>
					<view class='left-text'>
						费用总计
					</view>
					<view class='row-start'>
						 36000(
						<text>36500</text>
						)元
					</view>
					<view class="red row-start fee" @click='jump(1)'>
						明细
						<uni-icons type="forward" size="16" color="#f66745" class="icon"></uni-icons>
					</view>
				</view>

			</view>
			<view class="mgb30 row-start">
				<view class='left-text'>
					预付款
				</view>
				<view class="input-box row-center width200" ><input type="number" placeholder="预付款" class="input" v-model="query.first_money"/></view>
			</view>
			<slot name='header'></slot>
			<view class="mgb30 row-start">
				<view class='left-text'>
					预定单位
					<text class="red">*</text>
				</view>
				<view class="input-box row-center"><input type="text" placeholder="请填写预定单位" class="input"  v-model="query.book_company"/></view>
			</view>
			<view class="mgb30 row-start">
				<view class='left-text'>
					活动地址
					<text class="red">*</text>
				</view>
				<view class="row-between flex1">
					<view class="input-box row-center flex1"><input type="text" placeholder="请填写详细地址" class="input"  :value="query.address"/></view>
					<uni-icons type="map" size="30" class="mgl20" @click="toMap"></uni-icons>
				</view>
				
			</view>
			<view class="mgb30 row-start">
				<view class='left-text'>
					现场人数
				</view>
				<view class="input-box row-center width200"><input type="number" placeholder="请填写人数" class="input" v-model="query.people_num" /></view>
				<view class='gray'>（预计）</view>
			</view>
			<view class="mgb30 row-start">
				<view >
					<view class='big-left-text mgb10'>
						开始（日期时间）
						<text class="red">*</text>
					</view>
					<view class="time"><uni-datetime-picker type="date" return-type="timestamp"   v-model="query.start_time"/></view>
				</view>
				<view class='mgl20'>
					<view class='big-left-text mgb10'>
						结束（日期时间）
						<text class="red">*</text>
					</view>
					<view class="time"><uni-datetime-picker type="date" return-type="timestamp" v-model="query.end_time" /></view>
				</view>
			</view>

			<view class="mgb20">
				<view class="mgb20">
					工作餐（摄影师）：
					<text class="font24 gray">为避免影响拍摄，请提供工作餐</text>
				</view>
				
				<view class="row-start"><uni-data-checkbox :localdata="workmeals"  v-model="query.work_meal" /></view>
			</view>
			<view class="mgb30 row-start">
				<view class='left-text'>
					联系人
				</view>
				<view class="input-box row-center width300"><input type="text" placeholder="请填写联系人" class="input" v-model="query.contact_name" /></view>
			</view>
			<view class="mgb30 row-start">
				<view class='left-text'>
					联系电话
				</view>
				<view class="input-box row-center width300"><input type="text" placeholder="请填写联系电话" class="input" v-model="query.contact_tel" /></view>
			</view>
			<view class="mgb30 row-start-a">
				<view class='left-text'>备注</view>
				<uni-easyinput type="textarea" placeholder="请填写备注" class="textarea" :clearable="false" maxlength="200" v-model="query.memo"/>
			</view>
			<slot name='footer'></slot>
		</view>
		<view class="btn-box"><view class="main-btn" @click='submit'>提交</view></view>
	</view>
</template>

<script>
export default {
	props: {
		type: {
			type: Number,
			default: 1
		},
		price_id:{
			type:String,
			default:''
		}
	},
	data() {
		return {
			workmeals: [
				{
					text: '提供',
					value: 1
				},
				{
					text: '无法提供',
					value: 0
				}
			],
			query:{
				book_company:'',
				first_money:'',
				address:'',
				addressX:'',
				addressY:'',
				people_num:'',
				start_time:'',
				end_time:'',
				work_meal:'',
				contact_name:'',
				contact_tel:'',
				memo:''
			}
		};
	},
	methods: {
		toMap() {
			uni.chooseLocation({
				success:  res => {
					console.log('res', res);
					const {address,latitude,longitude,name} = res
					this.query.addressX = latitude
					this.query.addressY = longitude
					this.query.address = address+name
				}
			});
		},
		jump(num){
			if(num==1){
				this.$jump(`/pages/index/priceSheet?type=2`);
			}
		},
		async submit(){
			const {query,price_id} = this;
			this.$methods.showLoading('创建订单中...');
			const res = await this.$API.home.submit_order({
				...query,
				price_id
			});
			this.$methods.showToast('创建订单成功');
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../style/order.scss';
</style>

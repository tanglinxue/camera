<template>
	<view class="main column-center">
		<view class="boxOuter">
			<view class="main-title  font36 mgb30">{{query.case_name}}</view>
			<view class="mgb30 total-fee row-between" >
				<view class='row-start'>
					<view class='left-text'>
						费用总计
					</view>
					<view class='row-start'>
						 {{query.real_money}}(
						<text>{{query.total_money}}</text>
						)元
					</view>
					<view class="red row-start fee" @click='jump'>
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
			<view class="mgb30 row-start" v-if='type==2'>
				<view class='row-start'>
					<view class='left-text'>
						结算价
					</view>
					<view class="input-box row-center width200" ><input type="number"  class="input" :maxlength="11" v-model="query.real_money"/></view>
				</view>
				<view class='row-start mgl20'>
					<view class='left-text short-left-text'>
						尾款
					</view>
					<view class="input-box row-center width200" ><input type="number" class="input" :maxlength="11" v-model="query.end_money"/></view>
				</view>
			</view>
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
			<view class="mgb30 row-start" v-if='type==2'>
				<view class='left-text'>
					服务状态
				</view>
				<view class="row-start order"><uni-data-checkbox :localdata="statusArr" v-model="query.status"/></view>
			</view>
		</view>
		<view class="btn-box"><view class="main-btn" @click='submit'>提交</view></view>
	</view>
</template>

<script>
export default {
	props: {
		type: {
			type: Number,
			default: 1 //1是创建订单，2是订单详情
		},
		price_id:{
			type:String,
			default:''
		},
		detail:{
			type:Object,
			default:()=>{}
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
					text: '不提供',
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
			},
			statusArr: [
				{
					text: '已预订',
					value: 1
				},
				{
					text: '已完成(待结算)',
					value: 2
				},
				{
					text: '已结算',
					value: 4
				},
				{
					text: '取消',
					value: 4
				}
			]
		};
	},
	watch:{
		detail:{
			handler(val){
				this.query = {...val,...this.query}
			},
			deep:true
		}
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
		jump(){
			this.$jump(`/pages/index/priceSheet?type=2&id=${this.query.price_id}`);
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
::v-deep .order .uni-data-checklist .checklist-group .checklist-box {
	margin-right: 0;
	padding-right: 10rpx;
}
::v-deep .uni-data-checklist .checklist-group .checklist-box .radio__inner {
	width:24rpx;
	height:24rpx;
}
.short-left-text{
	width:100rpx !important
}
</style>

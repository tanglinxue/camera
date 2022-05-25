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
				<view class="input-box row-center width200" ><input type="number" placeholder="预付款" class="input" :maxlength="11" /></view>
			</view>
			<slot name='header'></slot>
			<view class="mgb30 row-start">
				<view class='left-text'>
					预定单位
					<text class="red">*</text>
				</view>
				<view class="input-box row-center"><input type="number" placeholder="请填写预定单位" class="input" :maxlength="11" /></view>
			</view>
			<view class="mgb30 row-start">
				<view class='left-text'>
					活动地址
					<text class="red">*</text>
				</view>
				<view class="row-between flex1">
					<view class="input-box row-center flex1"><input type="number" placeholder="请填写详细地址" class="input" :maxlength="11" /></view>
					<uni-icons type="map" size="30" class="mgl20" @click="toMap"></uni-icons>
				</view>
				
			</view>
			<view class="mgb30 row-start">
				<view class='left-text'>
					现场人数
				</view>
				<view class="input-box row-center width200"><input type="number" placeholder="请填写人数" class="input" :maxlength="11" /></view>
				<view class='gray'>（预计）</view>
			</view>
			<view class="mgb30 row-start">
				<view >
					<view class='big-left-text mgb10'>
						开始（日期时间）
						<text class="red">*</text>
					</view>
					<view class="time"><uni-datetime-picker type="date" return-type="timestamp"  /></view>
				</view>
				<view class='mgl20'>
					<view class='big-left-text mgb10'>
						结束（日期时间）
						<text class="red">*</text>
					</view>
					<view class="time"><uni-datetime-picker type="date" return-type="timestamp" /></view>
				</view>
			</view>

			<view class="mgb20">
				<view class="mgb20">
					工作餐（摄影师）：
					<text class="font24 gray">为避免影响拍摄，请提供工作餐</text>
				</view>
				
				<view class="row-start"><uni-data-checkbox :localdata="hobbys" v-model="hobby"/></view>
			</view>
			<view class="mgb30 row-start">
				<view class='left-text'>
					联系人
				</view>
				<view class="input-box row-center width300"><input type="number" placeholder="请填写联系人" class="input" :maxlength="11" /></view>
			</view>
			<view class="mgb30 row-start">
				<view class='left-text'>
					联系电话
				</view>
				<view class="input-box row-center width300"><input type="number" placeholder="请填写联系电话" class="input" :maxlength="11" /></view>
			</view>
			<view class="mgb30 row-start-a">
				<view class='left-text'>备注</view>
				<uni-easyinput type="textarea" placeholder="请填写备注" class="textarea" :clearable="false" maxlength="200" />
			</view>
			<slot name='footer'></slot>
		</view>
		<view class="btn-box"><view class="main-btn" @click='jump(2)'>提交</view></view>
	</view>
</template>

<script>
export default {
	props: {
		type: {
			type: Number,
			default: 1
		}
	},
	data() {
		return {
			hobbys: [
				{
					text: '提供',
					value: 1
				},
				{
					text: '无法提供',
					value: 0
				}
			],
			hobby:1
		};
	},
	methods: {
		toMap() {
			wx.chooseLocation({
				success: async res => {
					console.log('res', res);
				}
			});
		},
		jump(num){
			if(num==1){
				this.$jump(`/pages/my/priceSheet?type=2`);
			}else if(num==2){
				if(this.type==1){
					return this.$jump(`/pages/order/success`);
				}
				this.$jump(`/pages/order/index`,3);
			}
			
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../style/order.scss';
</style>

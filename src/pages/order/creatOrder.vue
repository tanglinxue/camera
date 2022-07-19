<template>
	<view>
		<view class="share-box">
			发送给客户下单预定
			<button open-type="share" class="share row-center">转发客户</button>
		</view>
		<Order :price_id="price_id" :detail="detail" v-if="showCom"/>
	</view>
</template>

<script>
// finish
import Order from './components/order';
export default {
	components: {
		Order
	},
	data() {
		return {
			price_id: '',
			detail: {},
			showCom: false,
			share:false
		};
	},

	onLoad(options) {
		this.price_id = options.id;
		if(options.share){
			wx.hideHomeButton();
			this.share = true;
			this.getDetail()
			this.fristEnter = false
		}else{
			if(options.detail){
				this.detail = JSON.parse(options.detail);
			}
			this.showCom = true;
		}
		
		
	},
	onShow(){
		if (!this.fristEnter&&this.share) {
			this.getDetail();
		}
		
	},
	methods:{
		async getDetail(){
			
			let {
				case_name,
				case_host,
				contact_name,
				real_money,
				case_memo,
				company_name,
				total_money,
				case_item,
				dynamic_item,
				kclz_xxxslk,
				sp_sszm,
				sp_tcjr,
				spzz_djs,
				work_day,
				zp_cyzt
			} = await this.$API.home.getPriceById({ price_id: this.price_id });	
			this.detail = {
				case_name,
				case_host,
				contact_name,
				real_money,
				case_memo,
				company_name,
				total_money
			};
			this.showCom = true;
			this.$store.commit("user/updateShare", true);
		}
	},
	onShareAppMessage() {
		return {
			title: '预定下单',
			path: '/pages/order/creatOrder?id=XKpXbIvX/PnnkQ&share=1', // 路径，传递参数到指定页面。
			imgUrl: 'https://pic.diandiantn.com/images/user/hz/index-1.png'
		};
	}
};
</script>
<style lang="scss" scoped>
@import '@/static/scss/index.scss';

// 日期
::v-deep .uni-date__x-input {
	height: 70rpx;
	line-height: 70rpx;
	font-size: 28rpx;
}
::v-deep .uni-date-editor--x .uni-date__icon-clear {
	border-width: 18rpx;
}
::v-deep .uni-input-placeholder {
	font-size: 26rpx;
	text-align: center;
}

::v-deep .uni-date-x--border {
	border-color: $border;
}
::v-deep .checklist-text {
	font-size: 26rpx !important;
}
.share-box {
	width: 100%;
	text-align: center;
	background: gainsboro;
	border-bottom: 1px solid #ededed;
	padding: 20rpx 0;
	height: 80rpx;
	.share {
		width: 160rpx;
		height: 60rpx;
		border: 1px solid #ededed;
		position: absolute;
		background: #fff;
		border-radius: 8rpx;
		font-size: 24rpx;
		right: 30rpx;
		top: 10rpx;
	}
}
</style>

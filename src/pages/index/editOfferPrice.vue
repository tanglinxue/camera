<template>
	<view class="main column-center">
		<view class="boxInner box column-center mgb50">
			<view class="top-title row-start">
				<view class="label">活动主题：</view>
				<view class="input-box row-center"><input type="text" placeholder="活动主题" class="input" v-model="query.case_name" /></view>
			</view>
			<view class="row-between top-title">
				<view class="row-start">
					<view class="label">合作方：</view>
					<view class="input-box row-center width200"><input type="text" placeholder="合作方" class="input" v-model="query.case_host" /></view>
				</view>
				<view class="row-start mgl20">
					<view class="label">联系人：</view>
					<view class="input-box row-center width160"><input type="text" placeholder="联系人" class="input" v-model="query.contact_name" /></view>
				</view>
			</view>
			<view class="top-title borderbottom mgb20 row-start">
				<view class="label">项目收费：</view>
				<view class="small-btn" @click="goOfferPrice">增减项目</view>
			</view>
			<view v-for="(item, index) in allPro" :key="index" style="width:100%">
				<template v-if="item.list.length">
					<view class="title">{{ item.name }}</view>
					<view class="row row-between" v-for="(bitem, index) in item.list" :key="bitem.id">
						<view class="left-txt">{{ bitem.name }}</view>
						<view class="right-txt">￥{{ bitem.unit_price }}*{{ bitem.num }}{{ bitem.unit }}*{{ bitem.days }}天=2000元</view>
					</view>
					<view class="price borderbottom red">小计：￥{{ item.price }}</view>
				</template>
			</view>
			<view class="top-title borderbottom mgb20 row-start">
				<view class="label">其他项目：</view>
				<view class="small-btn">增加项目</view>
			</view>
			<view class="total-price black weight">总计：￥{{ total_money }}</view>
			<view class="total-price  weight row-end">
				<text class="red">结算价</text>
				：
				<view class="input-box row-center width160"><input type="number" class="input" v-model="query.real_money" /></view>
			</view>
			<view class="mgb30 row">
				<view class="left-text mgb20">备注说明：</view>
				<uni-easyinput type="textarea" placeholder="请填写" class="textarea" :clearable="false" maxlength="200" v-model="query.case_memo" />
			</view>
			<view class=" row">
				<view class="left-text mgb20">报价方\报价日期：</view>
				<uni-easyinput type="textarea" placeholder="请填写" class="textarea" :clearable="false" maxlength="200" v-model="query.company_name" />
			</view>
		</view>
		<view class="row-center btn-box"><view class="main-btn" @click="submit">保存</view></view>
	</view>
</template>

<script>
// finish
import { mapState, mapGetters } from 'vuex';
export default {
	data() {
		return {
			query: {
				case_name: '', //活动主题
				case_host: '', //主办方
				contact_name: '', //主办方联系人
				real_money: '', //项目结算总价
				case_memo: '', //项目报价备注
				company_name: '' //报价方/报价日期字串
			},
			price_id: ''
		};
	},
	onLoad(options) {
		if (options.detail) {
			this.query = JSON.parse(options.detail);
			this.price_id = options.price_id;
		}
	},
	computed: {
		...mapState('service', ['serviceInfo', 'dynamicInfo', 'serviceData']),
		...mapGetters('service', ['total_money', 'allPro'])
	},
	methods: {
		async submit() {
			const { query, serviceData, serviceInfo, dynamicInfo, price_id,total_money} = this;
			let title = '发布中...';
			let toast = '发布成功'
			if(price_id){
				title = '编辑中...'
				toast = '编辑成功'
			}
			let API = price_id ? this.$API.home.edit_price : this.$API.home.publish_price;
			this.$methods.showLoading(title);
			let params = {
				...query,
				...serviceData,
				case_item: JSON.stringify(serviceInfo),
				dynamic_item: JSON.stringify(dynamicInfo),
				total_money
			};
			if (price_id) {
				params.price_id = price_id;
			}
			await API(params);
			this.$methods.showToast(toast);
		},
		goOfferPrice() {
			this.$jump(`/pages/index/offerPrice?type=2`);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/static/scss/index.scss';

.main {
	padding-bottom: 100rpx;
}

.box {
	padding: 30rpx;
	font-size: 28rpx;

	.top-title {
		width: 100%;
		padding-bottom: 30rpx;
		font-size: 28rpx;
	}

	.title {
		width: 100%;
		padding: 10rpx 0;
		text-align: left;
	}

	.row {
		width: 100%;
		padding: 10rpx 0;
		color: $gray;
		font-size: 26rpx;
	}

	.price {
		width: 100%;
		padding: 10rpx 0;
		text-align: right;
		padding-bottom: 30rpx;
		margin-bottom: 20rpx;
	}

	.total-price {
		width: 100%;
		padding: 10rpx 0;
		text-align: right;
		font-size: 28rpx;
	}
}

.input-box {
	font-size: 28rpx;
	padding: 10rpx 30rpx;
	border: 1px solid $border;
	border-radius: 12rpx;
	height: 70rpx;
	flex: 1;

	.input {
		flex: 1;
	}
}

.label {
	width: 140rpx;
}

.btn-box {
	width: 100%;
	padding: 0 30rpx;

	.middle-btn {
		width: 200rpx;
	}
}
.row {
	width: 100%;
}
.width160 {
	width: 160rpx;
	flex: none;
}
.textarea {
	flex: 1;
}
</style>

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
			<view v-for="(item, index) in inerAllPro" :key="index" style="width:100%">
				<template v-if="item.list.length">
					<view class="title">{{ item.name }}</view>
					<view v-for="bitem in item.list" :key="bitem.id">
						<view class="row row-between">
							<view class="left-txt">{{ bitem.beforeName || bitem.name }}</view>
							<view class="right-txt row-start" @click="openTag(bitem, bitem.id)" v-if="!bitem.noNum || !bitem.noDays">
								￥{{ bitem.unit_price }}
								<template v-if="!bitem.noNum">
									*{{ bitem.num }}{{ bitem.unit }}
								</template>
								<template v-if="!bitem.noDays">
									*{{ bitem.days }}天
								</template>
								<template>
									={{ bitem.price }}元
								</template>
								<uni-icons type="bottom" size="15" color="#919191" class="mgl15"></uni-icons>
							</view>
							<view v-else>
								{{ bitem.price }}元
							</view>
						</view>
						<template v-if="idArrs.includes(bitem.id) && (!bitem.noNum || !bitem.noDays)">
							<view class="row-end nums">
								<template v-if="!bitem.noNum">
									<uni-number-box :min="1" :max="99" class="num" :value="bitem.num" @change="e => {numTap(e, bitem)}"/>
									{{ bitem.unit || '单位'}}
								</template>
								<template v-if="!bitem.noDays">
									<uni-number-box :min="0.5"	:max="99"	class="num"	step="0.5"	:value="bitem.days"	@change="e => {dayTap(e, bitem)}"/>
									天
								</template>
							</view>
						</template>
					</view>

					<view class="price borderbottom red">小计：￥{{ item.price }}</view>
				</template>
			</view>
			<view class="top-title borderbottom mgb20 row-start">
				<view class="label">其他项目：</view>
				<view class="small-btn" @click="addItem">增加项目</view>
			</view>
			<view class="other-pro mgb20" v-for="(item, index) in list" :key="index"><reduceCom :info="item" :deleteIcon="true" :nodeid="8"></reduceCom></view>
			<view class="total-price red weight ">总计：￥{{ total_money }}</view>
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
		<changePopup />
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
			price_id: '',
			idArrs: []
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
		...mapGetters('service', ['total_money', 'inerAllPro']),
		list() {
			return this.dynamicInfo[8];
		}
	},
	onHide() {
		console.log('你好');
		this.$bus.$emit('closePopup');
	},
	methods: {
		numTap(num, info) {
			const { id, node_id } = info;
			let params = { num, item_id: id, updateNum: true };
			if (node_id) {
				params.node_id = node_id;
				this.$store.commit('service/changeDynamicObj', params);
			} else {
				this.$store.commit('service/changeServiceObj', params);
			}
		},
		dayTap(days, info) {
			const { id, node_id } = info;
			let params = { days, item_id: id, updateDay: true };
			if (node_id) {
				params.node_id = node_id;
				this.$store.commit('service/changeDynamicObj', params);
			} else {
				this.$store.commit('service/changeServiceObj', params);
			}
		},
		addItem() {
			// 新增服务项目
			this.$bus.$emit('openPopup', { type: 1, nodeid: 8, canConfig: true });
		},
		async submit() {
			const { query, serviceData, serviceInfo, dynamicInfo, price_id, total_money } = this;
			if(!total_money){
				return this.$methods.showToast('请选择项目');
			}
			let title = '发布中...';
			let toast = '发布成功';
			if (price_id) {
				title = '编辑中...';
				toast = '编辑成功';
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
		},
		openTag(item, id) {
			const { noNum, noDays } = item;
			if (noNum && noDays) return;
			let idArrs = this.idArrs;
			if (idArrs.includes(id)) {
				let index = idArrs.findIndex(item => item.id == id);
				this.idArrs.splice(index, 1);
			} else {
				this.idArrs.push(id);
			}
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
	.nums {
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
.other-pro {
	width: 100%;
}
.num {
	scale: 0.7;
	margin-right: -20rpx;
}
</style>

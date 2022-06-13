<template>
	<view class="main">
		<view class="content">
			<view class="mgb20 listItem" v-for="(item, index) in list" :key="index">
				<reduceCom :info="item">
					<view slot="footer" class="footer">{{ item.footer }}</view>
					<view slot="warn" class="red footer">{{ item.warn }}</view>
				</reduceCom>
			</view>
		</view>
		<view class="content">
			<view class="mgb20 listItem" v-for="(item, index) in list2" :key="index">
				<reduceCom :info="item">
					<view slot="footer" class="footer">{{ item.footer }}</view>
				</reduceCom>
			</view>
			<selectCom :options="options" name="有同传接入" :currentIndex="currentIndex" selectType="sp_tcjr" />
		</view>
		<view class="content"><approachCom :info="info" /></view>
		<view class="content">
			<view class="title row-between">
				增选项
				<view class="row-start openTag" @click="setStatus(status)">
					{{ status == 'open' ? '收起' : '展开' }}
					<image src="/static/common/icon-arrow-down.png" :class="{ active: status == 'open' }"></image>
				</view>
			</view>
			<view class="mgt20" v-if="status == 'open'">
				<view class="mgb20 listItem" v-for="(item, index) in list3" :key="index">
					<reduceCom :info="item" v-if="item.id">
						<view slot="footer" class="footer">{{ item.footer }}</view>
						<view slot="warn" class="red">{{ item.footer }}</view>
					</reduceCom>
					<view v-else class="mgb20">
						<selectCom :options="options2" name="实时字幕：" :currentIndex="currentIndexTwo" selectType="sp_sszm" />
						<view class="footer">注：字幕准确率80%</view>
					</view>
				</view>
			</view>
		</view>
		<dynamicInfo :nodeid='2'/>
	</view>
</template>

<script>
//finish
import dynamicInfo from './dynamicInfo';
import reduceCom from './reduceCom';
import selectCom from './selectCom';
import approachCom from './approachCom';
import { mapGetters, mapState } from 'vuex';
export default {
	components: {
		reduceCom,
		selectCom,
		approachCom,
		dynamicInfo
	},
	data() {
		return {
			status: 'close'
		};
	},
	computed: {
		...mapGetters('service', ['step2']),
		...mapState('service', ['serviceInfo', 'serviceData']),
		list() {
			return this.step2.slice(0, 3);
		},
		list2() {
			return this.step2.slice(3, 5);
		},
		options() {
			return this.step2.slice(5, 7);
		},
		info() {
			return this.step2[7];
		},
		list3() {
			return this.step2.slice(7, 20).concat(this.step2.slice(22));
		},
		options2() {
			return this.step2.slice(20, 22);
		},
		currentIndex() {
			const { sp_tcjr } = this.serviceData;
			return this.getIndex(sp_tcjr);
		},
		currentIndexTwo() {
			const { sp_sszm } = this.serviceData;
			return this.getIndex(sp_sszm);
		}
	},
	methods: {
		setStatus(status) {
			this.status = this.status == 'open' ? 'close' : 'open';
		},
		getIndex(num) {
			
			switch (num) {
				case 2:
					return 0;
				case 3:
					return 1;
				default:
					return -1;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../style/common.scss';
.openTag {
	font-weight: normal;
	font-size: 22rpx;
	color: $gray;
	image {
		margin-left: 12rpx;
		width: 28rpx;
		height: 15rpx;
		&.active {
			transform: rotate(180deg);
		}
	}
}
</style>

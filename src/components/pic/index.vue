<template>
	<view>
		<view class="uni-common-mt">
			<form>
				<view class="uni-list list-pd">
					<view class="uni-list-cell cell-pd">
						<view class="uni-uploader">
							<view class="uni-uploader-body">
								<view class="uni-uploader__files">
									<block v-for="(image, index) in imageList" :key="index">
										<view class="uni-uploader__file"><image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image></view>
									</block>
									<view class="uni-uploader__input-box"><view class="uni-uploader__input" @tap="chooseImage"></view></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</form>
		</view>
	</view>
</template>
<script>
import { permision } from '../../utils/permission.js';
console.log(JSON.stringify(permision));
var sourceType = [['camera'], ['album']];
var sizeType = [['compressed'], ['original'], ['compressed', 'original']];
export default {
	data() {
		return {
			buttonRect: {},
			imageList: [],
			sourceType: ['拍照', '相册']
		};
	},
	onUnload() {},
	methods: {
		actionSheetTap() {
			let that = this;
			return new Promise(resolve => {
				const that = this;
				uni.showActionSheet({
					title: '',
					itemList: ['拍摄', '从相册选择'],
					popover: {
						// 104: navbar + topwindow 高度，暂时 fix createSelectorQuery 在 pc 上获取 top不准确的 bug
						top: that.buttonRect.top + 104 + that.buttonRect.height,
						left: that.buttonRect.left + that.buttonRect.width / 2
					},
					success: e => {
						this.sourceTypeIndex = e.tapIndex;
						resolve(e.tapIndex);
					}
				});
			});
		},
		chooseImage: async function() {
			let sourceTypeIndex = await this.actionSheetTap();
			let status = await this.checkPermission();
			if (status !== 1) {
				return;
			}
			if (this.imageList.length === 9) {
				let isContinue = await this.isFullImg();
				if (!isContinue) {
					return;
				}
			}
			uni.chooseImage({
				sourceType: sourceType[sourceTypeIndex],
				sizeType: 'compressed ',
				count: this.imageList.length + 9 > 9 ? 9 - this.imageList.length : 9,
				success: res => {
					this.imageList = this.imageList.concat(res.tempFilePaths);
				},
				fail: err => {
					console.log('err: ', err);
					// #ifdef APP-PLUS
					if (err['code'] && err.code !== 0 && sourceTypeIndex === 2) {
						this.checkPermission(err.code);
					}
					// #endif
				}
			});
		},
		isFullImg: function() {
			return new Promise(res => {
				uni.showModal({
					content: '已经有9张图片了,是否清空现有图片？',
					success: e => {
						if (e.confirm) {
							this.imageList = [];
							res(true);
						} else {
							res(false);
						}
					},
					fail: () => {
						res(false);
					}
				});
			});
		},
		previewImage: function(e) {
			var current = e.target.dataset.src;
			uni.previewImage({
				current: current,
				urls: this.imageList
			});
		},
		async checkPermission(code) {
			let type = code ? code - 1 : this.sourceTypeIndex;
			let status = permision.isIOS
				? await permision.requestIOS(sourceType[type][0])
				: await permision.requestAndroid(type === 0 ? 'android.permission.CAMERA' : 'android.permission.READ_EXTERNAL_STORAGE');
			if (status === null || status === 1) {
				status = 1;
			} else {
				uni.showModal({
					content: '没有开启权限',
					confirmText: '设置',
					success: function(res) {
						if (res.confirm) {
							permision.gotoAppSetting();
						}
					}
				});
			}
			return status;
		}
	}
};
</script>

<style>
.cell-pd {
	padding: 22rpx 30rpx;
}
.list-pd {
	margin-top: 50rpx;
}
</style>

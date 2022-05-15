<!-- <template>
	<view class='outerBox'>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
		<tabbar v-if='$route.meta.hasTab'/>
	</view>
</template> -->
<script>
	export default {

		onLaunch() {
			console.log('App Launch');
			console.log(this.$route)
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	};
</script>

<style lang="scss">
	/* #ifdef H5 */
	uni-page-head {
		display: none;
	}
	/* #endif */
	@import './static/scss/index.scss';
	@import './css/uni.css';
	

	/*每个页面公共css */
	page {
		background: $backColor;
		font-size: 30rpx;
		color: $mainBlack;
	}
	.uni-input {
		.uni-numbox__minus.uni-cursor-point {
			background-color: white;
			border-radius: 12rpx 0 0 12rpx;
			border: 1rpx solid #cccccc;
		}
		.uni-numbox {
			.uni-numbox__value {
				color: #232829;
				font-size: 26rpx;
			}
			height: 60rpx;
			line-height: 60rpx;
		}
		.uni-numbox__plus.uni-cursor-point {
			background-color: white;
			border-radius: 0 12rpx 12rpx 0;
			border: 1rpx solid #cccccc;
		}
	}
	
</style>

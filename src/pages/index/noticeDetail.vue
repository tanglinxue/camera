<template>
	<view class="main column-center" >
		<view class='boxOuter notice'>
			<view class='title mgb10'>{{detail.news_title}}</view>
			<view class='time gray mgb40'>
				{{$methods.format(detail.update_time,'yyyy-MM-dd')}}
			</view>
			<view class='info'><rich-text :nodes="detail.news_content"></rich-text></view>
			<view class='name'>{{detail.news_name}}</view>
		</view>
		<view class='main-btn' @click='back'>返回</view>
	</view>
</template>
<script>
	// ok
	export default {
		data(){
			return{
				detail:{},
				ids:'',
			}
		},
		onLoad(option) {
			this.ids = option.id
			this.getData();
		},
		methods:{
			async getData() {
				this.$methods.showLoading();
				this.detail = await this.$API.home.tech_new({
					ids: this.ids
				});
				uni.hideLoading()
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/scss/index.scss';

	.main {
		padding: 20rpx;
		font-size: 28rpx;
		.notice {
			.info {
				margin-bottom: 60rpx;
			}
			.name {
				display: flex;
				justify-content: flex-end;
			}
		}
	}
</style>

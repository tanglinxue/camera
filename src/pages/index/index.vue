<template>
	<view class="main column-center">
		  <view class="banner">
		    <swiper class="swiper" :autoplay="true" :circular="true" >
		      <swiper-item v-for="(item, index) in list" :key="index" >
		        <img :src="item.img" class="img" />
		      </swiper-item>
		    </swiper>
		    <view class="dots" v-if="list.length > 1">
		      <block v-for="(item, index) in list" :key="index">
		        <view class="dot" :class="index == swiperCurrent ? 'active' : ''"></view>
		      </block>
		    </view>
		  </view>
		<button class="button" type="primary" size='middle'>开始报价</button>
		<uni-section title="卡片+列表" type="line" style='width:100%'>
				<uni-card padding="0" spacing="0">
					<template v-slot:cover>
						<view class="custom-cover">
							
							<view class="cover-content">
								<text class="uni-subtitle uni-white">今日新闻热点</text>
							</view>
						</view>
					</template>
					<uni-list>
						<uni-list-item title="今日新闻" showArrow></uni-list-item>
						<uni-list-item title="今日新闻" showArrow></uni-list-item>
					</uni-list>
					
				</uni-card>
			</uni-section>
	</view>
</template>

<script>
	
export default{
	data(){
		return {
			list:[
				{
					img:'https://baikebcs.bdimg.com/解淑萍右侧轮播.png',
				},
				{
					img:'https://baikebcs.bdimg.com/解淑萍右侧轮播.png',
				},
				{
					img:'https://baikebcs.bdimg.com/解淑萍右侧轮播.png',
				}
			],
			swiperCurrent:0
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/static/scss/index.scss';

.main {
	
	.banner {
	  width: 100%;
	  height: 360rpx;
	  position: relative;
	  .swiper {
	    width: 100%;
	    height: 100%;
	    swiper-item {
	      width: 100%;
	      height: 100%;
	      .img {
	        width: 100%;
	        height: 100%;
	      }
	    }
	  }
	
	  .dots {
	    position: absolute;
	    left: 0;
	    right: 0;
	    bottom: 30rpx;
	    display: flex;
	    justify-content: center;
	  }
	
	  /*未选中时的小圆点样式 */
	  .dots .dot {
	    margin: 0 4rpx;
	    width: 40rpx;
	    height: 4rpx;
	    background: rgba(255, 255, 255, 0.5);
	    transition: all 0.6s;
	  }
	  .dots .dot.active {
	    background: white;
	  }
	}
}
</style>

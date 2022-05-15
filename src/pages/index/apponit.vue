<!-- 
<template>
  <view class="detail">
    <view class="top">
      <view :style="{paddingTop: size.top + 'px',height:size.height + 'px'}"
            class="nav">
        <image src="../../static/common/icon-back.png"
               mode="scaleToFill"
               class="back"
               @click="back" />
      </view>
      <m-custom-round-tab :init-tab="curTab"
                          :tabs="['摄影','视频', '快剪', '特效制作', '课程录制']"
                          :badges="badges"
                          @onClickTab="onClickTab"></m-custom-round-tab>
    </view>
    <view class="middle">
      <swiper class="swiper"
              :current="curTab"
              @change="swiperChange">
        <swiper-item class="tab-list">
          <shot class="tab-c"></shot>
        </swiper-item>
        <swiper-item class="tab-list">
          <video-c></video-c>
        </swiper-item>
        <swiper-item class="tab-list">
          <cut></cut>
        </swiper-item>
        <swiper-item class="tab-list">
          <effect></effect>
        </swiper-item>
        <swiper-item class="tab-list">
          <lesson></lesson>
        </swiper-item>
      </swiper>
    </view>
    <view class="footer">
      <view class="footer-tips">
        <image src="../../static/common/icon-vip-tips.png"
               mode="scaleToFill"
               class="icon" />
        <view class="tips font-11">根据需求价格浮动在20%左右，具体报价以人工确认单为准
        </view>
      </view>
      <view class="footer-detail bold">
        <view class="left">
          <view class="left-top"
                @click="isDlg = true">
            <view class="font-13 bold color-black">明细</view>
            <image src="../../static/common/icon-arrow-down.png"
                   mode="scaleToFill"
                   class="arrow-down" />
            <view class="price-info color-primary bold">
              <view class="font-12 flag">￥</view>
              <view class="font-18">{{totalPrice}}</view>
            </view>
            <view class="color-gray font-14">（累计总价）</view>
          </view>
          <view class="left-bottom font-10 color-gray">有疑惑请
            <navigator url="/pagessub/my/help"
                       open-type="navigate"
                       hover-class="navigator-hover"
                       class="alink color-black">
              《联系客服》
            </navigator>
          </view>
        </view>
        <p-button text="立即预订"
                  size="80"
                  textSize="30"
                  minWidth="226rpx"
                  shadow="0px 4rpx 20rpx 0px rgba(253, 61, 60, 0.38);"
                  @onClick="onClickOrder"></p-button>
      </view>
    </view>
    <z-dialog v-model="isDlg">
      <view class="dlg-container">
        <view class="header">
          <view class="font-15 color-black bold count">共选{{totalCount}}项</view>
          <image src="../../static/common/icon-close.png"
                 mode="scaleToFill"
                 class="close"
                 @click="isDlg = false" />
        </view>
        <view class="container">
          <view class="group"
                v-for="(group,index) in groupList"
                :key="index">
            <view class="font-15 color-black bold group-title">{{group.name}}</view>
            <view class="child"
                  v-for="(child,childIndex) in group.children"
                  :key="childIndex"
                  :style="{display: child.name !== '天数：' ? 'flex' : 'none'}">
              <view class="font-14 color-gray">{{child.name}}{{child.value}}{{child.unit}}</view>
              <view class="font-14 color-gray"
                    v-if="child.total_price !== 0">{{child.price === '费用另计' ? '费用另计' : child.total_price + '元'}}</view>
            </view>
            <view class="price">
              <text class="font-14 color-primary bold">总计：￥{{group.total_price}}</text>
            </view>
          </view>
        </view>
        <view class="footer">
          <view class="footer-tips">
            <image src="../../static/common/icon-vip-tips.png"
                   mode="scaleToFill"
                   class="icon" />
            <view class="tips font-11">根据需求价格浮动在20%左右，具体报价以人工确认单为准
            </view>
          </view>
          <view class="footer-detail bold">
            <view class="left">
              <view class="left-top"
                    @click="isDlg = false">
                <view class="font-13 bold color-black">明细</view>
                <image src="../../static/common/icon-arrow-down.png"
                       mode="scaleToFill"
                       class="arrow-down" />
                <view class="price-info color-primary bold">
                  <view class="font-12 flag">￥</view>
                  <view class="font-18">{{totalPrice}}</view>
                </view>
              </view>
              <view class="left-bottom font-10 color-gray">有疑惑请
                <navigator url="/pagessub/my/help"
                           open-type="navigate"
                           hover-class="navigator-hover"
                           class="alink color-black">
                  《联系客服》
                </navigator>
              </view>

            </view>
            <p-button text="立即预订"
                      size="80"
                      textSize="30"
                      class="btn"
                      minWidth="226rpx"
                      shadow="0px 4rpx 20rpx 0px rgba(253, 61, 60, 0.38);"
                      @onClick="onClickOrder"></p-button>
          </view>
        </view>
      </view>
    </z-dialog>
  </view>
</template>

<script>
import MCustomRoundTab from '@/components/mCustomRoundTab.vue'
import PButton from '@/components/pButton.vue'
import shot from '@/components/shot.vue'
import videoC from '@/components/video.vue'
import cut from '@/components/cut.vue'
import effect from '@/components/effect'
import lesson from '@/components/lesson'
import ZDialog from '@/components/ZDialog.vue'
export default {
  components: { MCustomRoundTab, PButton, shot, videoC, cut, effect, lesson, ZDialog },
  data () {
    return {
      size: { height: 53, top: 32 },
      curTab: 1,
      isDlg: false
    }
  },
  onLoad () {
    let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
    this.size.height = menuButtonInfo.height + 24
    this.size.top = menuButtonInfo.top - 12
  },
  computed: {
    badges () {
      const shotList = [...this.$store.state.shot.singleGroupList, ...this.$store.state.shot.groupGroupList]
      let shotCount = 0
      shotList.forEach((group) => {
        shotCount += group.total_count
      })
      const videoList = [
        ...this.$store.state.video.meetGroupList,
        ...this.$store.state.video.liveGroupList,
        ...this.$store.state.video.cloudMeetGroupList]
      let videoCount = 0
      videoList.forEach((group) => {
        videoCount += group.total_count
      })
      const cutList = [...this.$store.state.cut.cutGroupList]
      let cutCount = 0
      cutList.forEach((group) => {
        cutCount += group.total_count
      })
      const effectList = [...this.$store.state.effect.effectGroupList]
      let effectCount = 0
      effectList.forEach(group => {
        effectCount += group.total_count
      })
      const lessonList = [...this.$store.state.lesson.lessonGroupList]
      let lessonCount = 0
      lessonList.forEach(group => {
        lessonCount += group.total_count
      })
      return [shotCount, videoCount, cutCount, effectCount, lessonCount]
      // return this.$store.state.shot.singleList;
    },
    groupList () {
      const list = [
        ...this.$store.state.shot.singleGroupList,
        ...this.$store.state.shot.groupGroupList,
        ...this.$store.state.video.meetGroupList,
        ...this.$store.state.video.liveGroupList,
        ...this.$store.state.video.cloudMeetGroupList,
        ...this.$store.state.cut.cutGroupList,
        ...this.$store.state.effect.effectGroupList,
        ...this.$store.state.lesson.lessonGroupList
      ]
      return list
    },
    totalPrice () {
      let totalPrice = 0
      this.groupList.forEach((group) => {
        totalPrice += group.total_price
      })
      return totalPrice
    },
    totalCount () {
      let count = 0
      this.groupList.forEach((group) => {
        count += group.total_count
      })
      return count
    }
  },
  methods: {
    onClickTab (tab) {
      this.curTab = tab
    },
    swiperChange (e) {
      this.curTab = e.detail.current
    },
    onClickOrder () {
      const order = this.$store.state.order.order
      order.total_price = this.totalPrice
      order.groups = this.groupList
      uni.navigateTo({ url: '/pagessub/reserve/index' })
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .top {
    background: linear-gradient(90deg, #fa663d 0%, #fd3d3c 100%);
    .nav {
      display: flex;
      align-items: center;
      .back {
        padding-left: 32rpx;
        width: 20rpx;
        height: 34rpx;
      }
    }
  }
  .middle {
    flex: 1;
    height: 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    height: 100vh;
    .swiper {
      flex: 1 0 auto;
      height: 0;
      .tab-c {
        display: block;
        height: 100%;
      }
    }
  }
  .footer {
    &-tips {
      background: #f8f4dc;
      padding: 16rpx 32rpx;
      display: flex;
      align-items: center;
      .icon {
        width: 24rpx;
        height: 18rpx;
      }
      .tips {
        color: #855d2e;
        margin-left: 8rpx;
        display: flex;
        .alink {
          margin-left: 16rpx;
          text-decoration: underline;
        }
      }
    }
    &-detail {
      padding: 36rpx 32rpx;
      background: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        &-top {
          display: flex;
          align-items: center;
          .arrow-down {
            width: 14rpx;
            height: 8rpx;
            margin-left: 4rpx;
            margin-right: 16rpx;
          }
          .price-info {
            display: flex;
            align-items: flex-end;
            .flag {
              margin-bottom: 4rpx;
            }
          }
        }
        &-bottom {
          display: flex;
          margin-top: 16rpx;
          .alink {
            text-decoration: underline;
          }
        }
      }
      .btn {
        display: block;
        width: 226rpx;
      }
    }
  }
}
.dlg-container {
  width: 100%;
  height: 85%;
  position: fixed;
  background: white;
  bottom: 0;
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    justify-content: space-between;
    // padding: 32rpx 48rpx;
    align-items: center;
    border-bottom: 1px solid #eeeeee;
    .count {
      padding: 32rpx 48rpx;
    }
    .close {
      width: 28rpx;
      height: 28rpx;
      padding: 32rpx 48rpx;
    }
  }
  .container {
    flex: 1;
    height: 0;
    padding: 32rpx 48rpx;
    overflow-y: auto;
    .group {
      margin-top: 32rpx;
      border-bottom: 1px solid #eeeeee;
      padding-bottom: 32rpx;
      .child {
        margin-top: 24rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .price {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 24rpx;
      }
    }
    .group:first-child {
      margin-top: 0;
    }
  }
  .footer {
    &-tips {
      background: #f8f4dc;
      padding: 16rpx 32rpx;
      display: flex;
      align-items: center;
      .icon {
        width: 24rpx;
        height: 18rpx;
      }
      .tips {
        color: #855d2e;
        margin-left: 8rpx;
        display: flex;
        .alink {
          margin-left: 16rpx;
          text-decoration: underline;
        }
      }
    }
    &-detail {
      padding: 36rpx 32rpx;
      background: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        &-top {
          display: flex;
          align-items: center;
          .arrow-down {
            width: 14rpx;
            height: 8rpx;
            margin-left: 4rpx;
            margin-right: 16rpx;
          }
          .price-info {
            display: flex;
            align-items: flex-end;
            .flag {
              margin-bottom: 4rpx;
            }
          }
        }
        &-bottom {
          display: flex;
          margin-top: 16rpx;
          .alink {
            text-decoration: underline;
          }
        }
      }
      .btn {
        display: block;
        width: 226rpx;
      }
    }
  }
}
</style> -->

<template>
	<view class="main column-center">
		<view class="banner">
			<swiper class="swiper" :autoplay="true" :circular="true">
				<swiper-item v-for="(item, index) in list" :key="index"><img :src="item.img" class="img" /></swiper-item>
			</swiper>
			<view class="dots" v-if="list.length > 1">
				<block v-for="(item, index) in list" :key="index"><view class="dot" :class="index == swiperCurrent ? 'active' : ''"></view></block>
			</view>
		</view>
		<view class="btn-box mgb20"><view class="main-btn red-shadow">开始报价</view></view>
		<view class="boxOuter-box">
			<view class="boxOuter">
				<view class="title row-between"><text class='txt1'>最新报价:</text><text @click='jump(1)'>更多...</text></view>
				<view class="list">
					<view class="item">旅程新品发布会2022-04-06 13:20</view>
					<view class="item">旅程新品发布会2022-04-06 13:20</view>
					<view class="item">旅程新品发布会2022-04-06 13:20</view>
					<view class="item">旅程新品发布会2022-04-06 13:20</view>
					<view class="item">旅程新品发布会2022-04-06 13:20</view>
				</view>
			</view>
			<view class="boxOuter">
				<view class="title row-between"><text class='txt1'>报价模板:</text><text @click='jump(2)'>更多...</text></view>
				<view class="list">
					<view class="item">双机位+直播+包装</view>
					<view class="item">双机位+直播+包装</view>
					<view class="item">双机位+直播+包装</view>
					<view class="item">双机位+直播+包装</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					img: 'https://baikebcs.bdimg.com/解淑萍右侧轮播.png'
				},
				{
					img: 'https://baikebcs.bdimg.com/解淑萍右侧轮播.png'
				},
				{
					img: 'https://baikebcs.bdimg.com/解淑萍右侧轮播.png'
				}
			],
			swiperCurrent: 0
		};
	},
	methods:{
		jump(type) {
			if (type == 1) {
				this.$jump(`/pages/my/historyRecord`);
			} else if (type == 2) {
				this.$jump(`/pages/index/templateRecord`);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/static/scss/index.scss';

.main {
	.banner {
		width: 100%;
		height: 400rpx;
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
			.dot {
				margin: 0 4rpx;
				width: 40rpx;
				height: 4rpx;
				background: rgba(255, 255, 255, 0.5);
				transition: all 0.6s;
				&.active {
					background: white;
				}
			}
		}
	}
	.btn-box {
		width: 100%;
		background: $white;
		padding: 30rpx;
	}
	.boxOuter-box {
		width: 100%;
		padding: 0 30rpx;
		.title {
			font-size:26rpx;
			margin-bottom: 20rpx;
			.txt1{
				font-size: 30rpx;
				font-weight: bold;
			}
		}
		.list {
			padding: 0 20rpx;
			.item {
				padding: 10rpx 0;
				font-size: 26rpx;
			}
		}
	}
}
</style>

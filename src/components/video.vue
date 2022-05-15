<!--
 * @Author: your name
 * @Date: 2021-09-06 14:54:09
 * @LastEditTime: 2021-11-11 00:07:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \photo-mini\src\pagessub\reserve\compoments\video.vue
-->
<template>
  <view class="video">
    <view class="content">
      <m-custom-tab :tabs="['活动会议', '带货直播', '云会议']"
                    line
                    flex
                    class="tab"
                    :init-tab="curTab"
                    @onClickTab="onClickTab"></m-custom-tab>
      <meet v-show="curTab === 0"
            class="container"></meet>
      <live v-show="curTab === 1"
            class="container"></live>

      <cloud-meet v-show="curTab === 2"
                  class="container"></cloud-meet>
    </view>
  </view>
</template>


<script>
import mCustomTab from './mCustomTab.vue'
import meet from './meet.vue'
import live from './live.vue'
import cloudMeet from './cloudMeet'
export default {
  components: { mCustomTab, meet, live, cloudMeet },
  data () {
    return {
      curTab: 2
    }
  },
  methods: {
    onClickTab (tab) {
      this.curTab = tab
    }
  }
}
</script>

<style lang="scss" scoped>
.video {
  height: 100%;
  .content {
    display: flex;
    flex-direction: column;
    height: 100%;
    .tab {
      display: block;
      margin-top: 20rpx;
    }
    .container {
      display: block;
      flex: 1;
      overflow-y: auto;
    }
  }
}
</style>
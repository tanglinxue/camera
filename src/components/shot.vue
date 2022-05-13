<!--
 * @Author: your name
 * @Date: 2021-09-06 14:53:51
 * @LastEditTime: 2021-09-27 10:19:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \photo-mini\src\pagessub\reserve\compoments\shot.vue
-->
<template>
  <view class="shot">
    <view class="content">
      <m-custom-tab :tabs="['摄影', '站架合影']"
                    line
                    flex
                    class="tab"
                    :init-tab="curTab"
                    @onClickTab="onClickTab"></m-custom-tab>
      <single-shot v-show="curTab === 0"
                   class="container"
                   ref="singleShot"></single-shot>
      <group-shot v-show="curTab === 1"
                  class="container"
                  ref="groupShot"></group-shot>
    </view>
  </view>
</template>

<script>
import mCustomTab from '../../../compoments/common/mCustomTab.vue'
import SingleShot from './shot/singleShot.vue'
import GroupShot from './shot/groupShot.vue'
export default {
  components: { mCustomTab, SingleShot, GroupShot },
  data () {
    return {
      curTab: 0
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
.shot {
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
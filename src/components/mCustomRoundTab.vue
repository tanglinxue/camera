<!--
 * @Author: your name
 * @Date: 2021-04-07 14:57:17
 * @LastEditTime: 2021-09-25 22:28:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \topboom\src\components\customTab.vue
-->
<template>
  <view class="custom-tab">
    <view v-for="(tab,index) in tabs"
          :key="index"
          @click="onClickTab(index)"
          class="tab">
      <view class="badge font-11 color-white bold"
            v-show="badges[index] > 0">{{badges[index]}}</view>
      <view :class="curTab === index ? baseClass + ' activie' : baseClass">
        {{tab}}
      </view>
    </view>
    <slot></slot>
  </view>
</template>

<script>
export default {
  props: {
    line: {
      default: true
    },
    flex: {
      default: true
    },
    initTab: {
      default: 0
    },
    tabs: {
      default: []
    },
    badges: {
      default: []
    }
  },
  computed: {
    baseClass () {
      return 'item'
    }
  },
  data () {
    return {
      curTab: 0
    }
  },
  mounted () {
    this.curTab = this.initTab
  },
  methods: {
    onClickTab (index) {
      this.curTab = index
      this.$emit('onClickTab', index)
    }
  },
  watch: {
    initTab (value) {
      this.curTab = value
    }
  }
}
</script>


<style lang="scss" scoped>
.custom-tab {
  width: 100%;
  height: 86rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  .tab {
    padding-right: 20rpx;
    position: relative;
    height: 86rpx;
    display: flex;
    align-items: center;
    .item {
      text-align: center;
      padding: 8rpx 20rpx;
      font-size: 30rpx;
      color: white;
    }
    .badge {
      position: absolute;
      top: 0;
      right: -4rpx;
      padding: 0 10rpx;
      height: 30rpx;
      text-align: center;
      background: #856c2e;
      border-radius: 24rpx;
    }
    .activie {
      color: #fd3d3c;
      font-weight: 600;
      background: white;
      border-radius: 30rpx;
    }
  }
}
</style>
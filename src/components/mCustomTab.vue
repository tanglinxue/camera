<!--
 * @Author: your name
 * @Date: 2021-04-07 14:57:17
 * @LastEditTime: 2021-09-06 15:19:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \topboom\src\components\customTab.vue
-->
<template>
  <view class="custom-tab"
        :style="{justifyContent: center ? 'center' : ''}">
    <view v-for="(tab,index) in tabs"
          :key="index"
          :class="curTab === index ? baseClass + ' activie' : baseClass"
          @click="onClickTab(index)">
      {{tab}}
      <view class="line"
            v-show="curTab === index"
            v-if="line"></view>
    </view>
    <slot></slot>
  </view>
</template>

<script>
export default {
  props: {
    center: {
      default: false
    },
    line: {
      default: true
    },
    flex: {
      default: false
    },
    initTab: {
      default: 0
    },
    tabs: {
      default: []
    }
  },
  computed: {
    baseClass () {
      if (this.flex) {
        return 'item flex'
      } else {
        return 'item'
      }
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
  background: white;
  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0 0 auto;
    margin-left: 48rpx;
    position: relative;
    font-size: 28rpx;
    color: #656667;
    font-weight: 400;
    .line {
      position: absolute;
      bottom: 0;
      height: 8rpx;
      width: 56rpx;
      background: #fd3d3c;
      border-radius: 4rpx;
    }
  }
  .flex {
    flex: 1 0 auto;
  }
  .activie {
    font-weight: 600;
    font-size: 28rpx;
    color: #232829;
  }
  .item:first-child {
    margin-left: 32rpx;
  }
}
</style>
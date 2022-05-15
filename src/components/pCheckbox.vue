<!--
 * @Author: your name
 * @Date: 2021-09-06 15:04:27
 * @LastEditTime: 2021-11-10 22:20:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit	
 * @FilePath: \photo-mini\src\compoments\common\pCheckbox.vue
-->
<template>
  <view>
    <view class="p-checkbox"
          @click="onClick">
      <image :src="value ? '/static/common/icon-checkbox-sel.png' : '/static/common/icon-checkbox.png'"
             class="checkbox"
             v-if="isCheckbox"></image>
      <view class="font-15 bold color-black name">{{name}}</view>
      <view class="font-13 color-darkgray tips">{{tips}}</view>
    </view>
    <view class="warning font-11 color-primary">{{warning}}</view>
  </view>
</template>


<script>
export default {
  props: {
    value: { default: false },
    name: { default: '' },
    tips: { default: '' },
    warning: { default: '' },
    isCheckbox: { default: true }
  },
  methods: {
    onClick () {
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.p-checkbox {
  display: flex;
  align-items: center;
  .checkbox {
    width: 26rpx;
    height: 26rpx;
    margin-right: 16rpx;
  }
}
.warning {
  margin-top: 8rpx;
  margin-left: 38rpx;
}
</style>
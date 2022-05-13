<!--
 * @Author: your name
 * @Date: 2021-08-02 14:10:58
 * @LastEditTime: 2021-09-27 16:45:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zycy-mini\src\compoments\dialog\ZDialog.vue
-->
<template>
  <view class="dialog"
        v-if="value">
    <slot></slot>
    <!-- <view class="container">

    </view> -->
  </view>
</template>

<script>
export default {
  props: {
    value: { defalut: false },
  },
  methods: {
    onClickClose () {
      console.log('111')
      this.$emit('input', false)
      // this.$emit('onClickClose')
    }
  },
}
</script>

<style lang="scss" scoped>
.dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba($color: #000000, $alpha: 0.75);
  z-index: 99;
  .close {
    width: 36rpx;
    height: 36rpx;
    position: absolute;
    right: 0;
    top: 0;
    margin: 40rpx;
  }
  .container {
    background: white;
    width: 100%;
    padding: 40rpx 24rpx;
    border-radius: 16px;
    width: 74.67%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
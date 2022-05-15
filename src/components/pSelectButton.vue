<!--
 * @Author: your name
 * @Date: 2021-09-07 10:57:07
 * @LastEditTime: 2021-09-07 11:07:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \photo-mini\src\compoments\common\pSelectButton.vue
-->
<template>
  <view>
    <view class="button radis-3"
          :class="value  ? selectClss : ''"
          @click="onClickButton()">
      <view class="name font-12">{{name}}</view>
      <view class="tips font-10"
            v-if="tips">{{tips}}</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    value: { default: false },
    name: { default: '' },
    tips: { default: '' },
    selectClss: { default: 'sel' },
  },
  methods: {
    onClickButton () {
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2rpx solid #dfe0e1;
  padding: 16rpx 0;
  color: #656667;
  margin-right: 24rpx;
  .tips {
    color: #98999a;
  }
}
.sel {
  border: 2rpx solid #fd3d3c;
  color: #fd3d3c;
  .tips {
    color: #fd3d3c;
  }
}
</style>
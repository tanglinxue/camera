<!--
 * @Author: your name
 * @Date: 2021-09-01 13:45:23
 * @LastEditTime: 2021-11-10 23:32:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \photo-mini\src\compoments\common\pRadio.vue
-->
<template>
  <view class="p-radio">
    <view class="p-radio-top">
      <view class="top-left">
        <view class="name font-14 bold color-black">{{name}}</view>
        <view class="option"
              v-if="isRadio"
              @click="onClickRadio(true)">
          <image :src="value === true ? '/static/common/icon-radio-sel.png' : '/static/common/icon-radio.png'"
                 mode="scaleToFill"
                 class="radio" />
          <view class="font-14 color-black bold">{{yesOption}}</view>
        </view>
        <view class="option"
              v-if="isRadio"
              @click="onClickRadio(false)">
          <image :src="value === false ? '/static/common/icon-radio-sel.png' : '/static/common/icon-radio.png'"
                 mode="scaleToFill"
                 class="radio" />
          <view class="font-14 color-black bold">{{noOption}}</view>
        </view>
      </view>
      <view class="top-right font-12 color-primary">
        <slot>
          {{warning}}
        </slot>
      </view>
    </view>
    <view class="p-radio-tips font-11 color-darkgray">
      {{tips}}
    </view>
  </view>
</template>

<script>
export default {
  props: {
    value: { default: false },
    name: { default: '凭空：' },
    tips: { default: '' },
    warning: { default: '' },
    yesOption: { default: '是' },
    noOption: { default: '否' },
    isRadio: { default: true }
  },
  methods: {
    onClickRadio (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.p-radio {
  &-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .top-left {
      display: flex;
      align-items: center;
      .name {
        margin-right: 16rpx;
        margin-left: 24rpx;
      }
      .option {
        display: flex;
        margin-right: 32rpx;
        align-items: center;
        .radio {
          width: 26rpx;
          height: 26rpx;
          margin-right: 8rpx;
        }
      }
    }
  }
  &-tips {
    margin-top: 8rpx;
    margin-left: 24rpx;
  }
}
</style>
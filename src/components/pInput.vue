<!--
 * @Author: your name
 * @Date: 2021-09-01 13:10:57
 * @LastEditTime: 2021-11-08 23:19:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \photo-mini\src\compoments\common\pInput.vue
-->
<template>
  <view class="p-input">
    <view class="container">
      <view class="input-container radis-2"
            :style="{background: enable? '#f8f9fa' : 'white'}">
        <view class="bold font-13 color-black">{{name}}</view>
        <input :value="value"
               :placeholder-class="placeholderClass"
               @input="onInput"
               :disabled="!enable"
               :focus="isFocus"
               type='number'
               class="input font-13 color-black bold"
               v-if="false" />
        <view :class="placeholderClass + ' font-12'"
              @click="isFocus = true">{{placeholder ? placeholder : ''}}</view>
      </view>
      <slot>
        <uni-number-box :value="value"
                        :style="{marginLeft:'12rpx',marginRight:'24rpx'}"
                        class="uni-input"
                        @change="onChange"></uni-number-box>
      </slot>
    </view>
    <view class="tips font-11 color-darkgray">
      {{tips}}
    </view>
    <view class="warning font-11 color-primary">
      {{warning}}
    </view>
  </view>
</template>

<script>
export default {
  props: {
    name: { default: '' },
    value: { default: '' },
    enable: { default: true },
    placeholder: { default: '' },
    placeholderClass: { default: 'color-lightgray' },
    tips: { default: '' },
    warning: { default: '' }
  },
  data () {
    return {
      isFocus: false
    }
  },
  methods: {
    onInput (e) {
      this.$emit('input', e.detail.value)
    },
    onChange (e) {
      this.$emit('input', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.p-input {
  .container {
    display: flex;
    background: #f8f9fa;
    align-items: center;
    justify-content: space-between;
    .input-container {
      padding: 32rpx 24rpx;
      display: flex;
      align-items: center;
      flex: 1;
      // justify-content: space-between;
      .input {
        flex: 1;
        text-align: left;
      }
    }
  }
  .tips,
  .warning {
    margin-top: 8rpx;
    margin-left: 24rpx;
  }
}
</style>
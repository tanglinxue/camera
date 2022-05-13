<!--
 * @Author: your name
 * @Date: 2021-09-02 15:20:31
 * @LastEditTime: 2021-09-27 10:32:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \photo-mini\src\compoments\common\pButton.vue
-->
<template>
  <view :style="{
    height:size + 'rpx', 
    color: textColor,fontSize:textSize+ 'rpx', 
    background:btnColor,
    lineHeight: size+ 'rpx', 
    border: border,
    borderRadius: size/2 + 'rpx',
    boxShadow: shadow,
    minWidth: minWidth
    }"
        class="p-button"
        @click="onClick">
    <slot>
      {{text}}
    </slot>
  </view>
</template>

<script>
export default {
  props: {
    text: { default: '' },
    size: { default: 64 },
    textSize: { default: 28 },
    shadow: { default: '' },
    border: { default: '' },
    textColor: { default: '#ffffff' },
    minWidth: { default: null },
    btnColor: { default: 'linear-gradient(90deg, #FA663D 0%, #FD3D3C 100%)' },
  },
  methods: {
    onClick () {
      this.$emit('onClick')
    }
  }
}
</script>

<style lang="scss" scoped>
.p-button {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
}
</style>
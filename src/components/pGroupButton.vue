<!--
 * @Author: your name
 * @Date: 2021-09-01 14:11:56
 * @LastEditTime: 2021-10-12 15:37:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \photo-mini\src\compoments\common\pGroupButton.vue
-->
<template>
  <view class="p-group-button">
    <view class="p-group-button-title font-11 color-gray">{{title}}</view>
    <view class="p-group-button-top"
          :style="[groupStyle]">
      <view class="button radis-3"
            :class="value === button.value  ? selectClss : ''"
            v-for="(button,index) in buttons"
            :key="index"
            @click="onClickButton(button)">
        <view class="name font-12">{{button.name}}</view>
        <view class="tips font-10"
              v-if="button.tips">{{button.tips}}</view>
      </view>
    </view>
    <view class="p-group-button-sel-tips font-11 color-darkgray"
          v-show="tips">
      {{tips}}
    </view>
  </view>
</template>

<script>
export default {
  props: {
    title: { default: '' },
    size: { default: 'small' },
    value: { default: null },
    selectClss: { default: 'sel' },
    buttons: { default: [] },
    width: { default: 176 }
  },
  mounted () {
    console.log(this.buttons)
  },
  methods: {
    onClickButton (row) {
      if (this.value === row.value) {
        this.$emit('input', '')
      } else {
        this.$emit('input', row.value)
      }
    }
  },
  computed: {
    tips () {
      let ret = ''
      console.log(this.title, this.buttons)
      if (this.buttons) {
        this.buttons.forEach((item) => {
          if (item.value === this.value) {
            ret = item.selTips
          }
        })
      }
      return ret
    },
    groupStyle () {
      if (this.size === 'big') {
        const length = this.buttons.length
        const percent = 100 / length
        return { gridTemplateColumns: `repeat(auto-fill,calc((100% - ${(length - 1) * 16}rpx)/${length}))`, gridGap: '16rpx' }
      } else {
        return { gridTemplateColumns: `repeat(auto-fill,${this.width}rpx)`, gridGap: '24rpx' }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.p-group-button {
  padding: 0 16rpx;
  &-title {
    margin-bottom: 16rpx;
  }
  &-top {
    display: grid;
    // grid-gap: 16rpx;
    .button {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: 2rpx solid #dfe0e1;
      padding: 16rpx 0;
      color: #656667;
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
    .primary-select {
      background: #fd3d3c;
      color: white;
      .tips {
        color: white;
      }
    }
  }
  &-sel-tips {
    margin-top: 8rpx;
  }
}
</style>
<!--
 * @Author: your name
 * @Date: 2021-09-01 15:51:17
 * @LastEditTime: 2021-10-12 22:50:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \photo-mini\src\compoments\common\pSelect.vue
-->
<template>
  <view class="p-select radis-2">
    <view class="p-select-show"
          @click="isCol = !isCol">
      <view class="show-title bold color-black font-13">{{title}}</view>
      <view class="flex-between">
        <view class="badge font-11 color-white"
              v-show="value">
          <slot>{{value}}{{unit}}</slot>
        </view>
        <image :src="!isCol ? '/static/common/icon-arrow-down.png' : '/static/common/icon-arrow-up.png'"
               mode="scaleToFill"
               class="arrow-down" />
      </view>
    </view>
    <view class="p-select-rows"
          v-if="isCol">
      <view class="row font-13"
            v-for="(item,index) in list"
            :key="index"
            :class="value === item.value ? 'sel' : ''"
            @click="onItemClick(item)">
        <view class="name">{{item.name}}</view>
        <view class="tips font-12">{{item.tips}}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    value: { default: null },
    title: { default: '天数' },
    unit: { default: '' },
    list: {
      default: [
        {
          value: '1', name: '补充因', tips: '￥10/人'
        },
        { value: '2', name: '补充因1', tips: '￥10/人' }]
    }
  },
  data () {
    return { isCol: false }
  },
  methods: {
    onItemClick (item) {
      if (this.value === item.value) {
        this.$emit('input', '')
      } else {
        this.$emit('input', item.value)
      }
      // this.isCol = false
    }
  }
}
</script>

<style lang="scss" scoped>
.p-select {
  background: #f8f9fa;
  padding: 24rpx;
  &-show {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .arrow-down {
      width: 22rpx;
      height: 14rpx;
      margin-left: 8rpx;
    }
    .badge {
      background: #fd3d3c;
      height: 32rpx;
      line-height: 32rpx;
      text-align: center;
      padding: 0 11rpx;
      border-radius: 32rpx;
    }
  }
  &-rows {
    .row {
      margin-top: 24rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 4rpx;
      border: 2rpx solid #dfe0e1;
      padding: 24rpx;
      background: white;
    }
    .sel {
      background: #fd3d3c;
      .name,
      .tips {
        color: white;
      }
    }
  }
}
</style>
<!--
 * @Author: your name
 * @Date: 2021-09-06 15:27:27
 * @LastEditTime: 2021-11-10 23:20:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \photo-mini\src\pagessub\reserve\compoments\shot\groupShot.vue
-->
<template>
  <view class="group-shot">
    <view class="group">
      <view class="tips-content">
        <image src="/static/common/icon-tips.png"
               mode="heightFix"
               class="icon" />
        <view class="font-11">【服务包含】站架、运输、搭建、拍摄、修图</view>
      </view>
      <view class="warning row font-11 color-darkgray">
        【温馨提示】第一排椅子数<text :style="{color:'#FD3D3C'}">{{(list[0].value/30*3.5).toFixed(0)}}</text>（预估），客户让酒店提供
      </view>
      <p-input v-model="list[0].value"
               :name="list[0].name"
               :placeholder="list[0].placeholder"
               :tips="list[0].tips"
               class="row"
               @input="updateState"></p-input>
      <p-radio v-model="list[1].value"
               class="row"
               :name="list[1].name"
               @input="updateState"
               v-show="false"></p-radio>

      <p-input v-show="list[1].value"
               v-model="list[1].children[0].value"
               class="row"
               :name="list[1].children[0].name"
               :placeholder="list[1].children[0].placeholder"
               :tips="list[1].children[0].tips"
               @input="updateState"></p-input>

      <p-group-button :buttons="list[1].children[1].options"
                      v-model="list[1].children[1].value"
                      @input="updateState"></p-group-button>

      <p-select v-show="list[1].value"
                v-model="list[1].children[1].value"
                :list="list[1].children[1].options"
                :title="list[1].children[1].name"
                @input="updateState"
                class="row"
                v-if="false">
        {{list[1].value ? '1' : ''}}
      </p-select>
    </view>
    <view class="rules">
      <view class="font-12 color-darkgray title">【注意事项】</view>
      <view class="font-12 color-primary text-row">1.同场合影，分组拍摄，费用另计</view>
      <view class="font-12 color-gray text-row">2.室内或提前1天进场搭建，费用另计</view>
      <view class="font-12 color-gray text-row">3.成品24小时内交付，加急费用另计</view>
    </view>
  </view>
</template>

<script>
import PInput from './pInput.vue'
import pRadio from './pRadio'
import pSelect from './pSelect'
import pGroupButton from './pGroupButton.vue'
export default {
  components: { PInput, pRadio, pSelect, pGroupButton },
  data () {
    return {
    }
  },
  computed: {
    list () {
      return this.$store.state.shot.groupList
    },
    groupList () {
      const list = []
      let num = this.list[0].value
      const group = { name: '站架合影' }
      let items = []
      let totalPrice = 0
      let totalCount = 0
      let item = null
      if (num) {
        item = this.list[0]
        items.push({ id: 5, name: `${item.name}`, mini_value: this.list[0].mini_value, unit: item.unit, value: num, params: 's200', regex: 's200*10', price: item.price, total_price: num * item.price })
        if (num < this.list[0].mini_value) {
          num = this.list[0].mini_value
        }
        totalPrice += num * item.price
        totalCount++
      }
      console.log(this.list)
      if (this.list[1].value) {
        item = this.list[1]
        if (item.value) {//冲印
          const children = item.children
          const numItem = children[0]
          const typeItem = children[1]
          if (numItem.value && typeItem.value) {//输入了数量和类型的才计入数量
            //合并成一项
            totalCount++;
            // if (numItem.value < numItem.mini_value) {
            //   numItem.value = numItem.mini_value
            // }
            console.log(numItem)
            typeItem.price = typeItem.options[typeItem.value - 1].price
            const name = typeItem.options[typeItem.value - 1].name
            if (typeItem.value === '3') {//费用另计
              items.push({ id: 6, name: `${item.name}(${name})`, mini_value: numItem.mini_value, unit: '张', value: numItem.value, params: 's201', regex: '0', price: typeItem.price, total_price: typeItem.price })
            } else {
              totalPrice += typeItem.price * (Math.max(numItem.value, numItem.mini_value))
              items.push({ id: 6, name: `${item.name}(${name})`, mini_value: numItem.mini_value, unit: '张', params: 's201', regex: 's201*' + typeItem.price, value: numItem.value, price: typeItem.value, total_price: typeItem.price * numItem.value })
            }
          }
        }
      }
      if (items.length > 0) {
        items = this.calItems(items)
        group.children = items
        group.total_price = totalPrice
        group.total_count = totalCount
        list.push(group)
      }
      this.$store.commit('refreshGroupGroupList', list)
      return list
    }
  },
  methods: {
    updateState () {
      this.$store.commit('refreshGroupList')
    }
  }
}
</script>

<style lang="scss" scoped>
.group-shot {
  .group {
    padding: 32rpx;
    background: white;
    margin-top: 20rpx;
    .tips-content {
      padding: 20rpx 32rpx;
      display: flex;
      background: #f8f4dc;
      color: #855d2e;
      border-radius: 8rpx;
      .icon {
        height: 26rpx;
        margin-top: 2rpx;
        margin-right: 4rpx;
      }
    }
    .row {
      margin-top: 32rpx;
      display: block;
    }
    .warning {
      padding: 0 24rpx;
    }
    .title {
      margin-bottom: 4rpx;
      padding: 0 24rpx;
    }
  }
  .rules {
    padding: 16rpx 56rpx;
    margin-top: 20rpx;
    background: white;
    .text-row {
      margin-top: 8rpx;
    }
  }
  .group:first-child {
    margin-top: 0;
  }
}
</style>
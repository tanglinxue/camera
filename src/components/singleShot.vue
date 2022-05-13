<!--
 * @Author: your name
 * @Date: 2021-09-06 15:27:19
 * @LastEditTime: 2021-11-08 15:02:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \photo-mini\src\pagessub\reserve\compoments\shot\singleShot.vue
-->
<template>
  <view class="single-shot">
    <view class="group"
          v-for="(group,index) in list"
          :key="index">
      <p-checkbox v-model="group.value"
                  :name="group.name"
                  :tips="group.tips"
                  class="item"
                  @input="updateState"
                  v-if="false"></p-checkbox>
      <p-input v-model="group.children[0].value"
               :name="group.children[0].name"
               :placeholder="group.children[0].placeholder"
               class="item"
               v-show="group.value"
               @input="updateState">
        <uni-number-box v-model="group.children[1].value"
                        :style="{marginLeft:'12rpx',marginRight:'24rpx'}"
                        class="uni-input"
                        @change="updateState"></uni-number-box>
      </p-input>
      <!-- <p-select v-model="group.children[1].value"
                :title="group.children[1].name"
                :list="group.children[1].options"
                v-show="group.value"
                class="item"
                @input="updateState"></p-select> -->
    </view>
    <view class="rules">
      <view class="font-12 color-darkgray title">【注意事项】</view>
      <view class="font-12 color-gray row">1.交通食宿实报</view>
      <view class="font-12 color-primary row">2.摄影师不负责站架大合影拍摄</view>
      <view class="font-12 color-gray row">3.全天以8小时计，超出按每机位100元/小时计费</view>
    </view>
  </view>
</template>

<script>
import pCheckbox from "./pCheckbox.vue"
import pInput from './pInput'
import pSelect from './pSelect'

export default {
  data () {
    return {
    }
  },
  computed: {
    list () {
      return this.$store.state.shot.singleList
    },
    groupList () {
      const list = []
      if (this.list[0].value) {//直播
        const group = {
          name: '摄影-直播',
        }
        let index = 0
        let id = 1
        let items = []
        let children = this.list[index].children
        let num = children[0].value
        let day = children[1].value
        let totalPrice = 0
        let totalCount = 0
        if (day && num) {
          totalPrice += num * day * children[0].price
          items.push({ id: id, value: children[0].value, name: `${children[0].name}`, unit: children[0].unit, price: children[0].price, params: 's100', regex: 's100*s101*1500', total_price: num * day * children[0].price })
          items.push({ id: id + 1, value: children[1].value, name: `${children[1].name}`, unit: children[1].unit, price: children[1].price, params: 's101', regex: '0', total_price: 0 })
          totalCount++
        }
        if (items.length > 0) {
          items = this.calItems(items)
          group.children = items
          group.total_price = totalPrice
          group.total_count = totalCount
          list.push(group)
        }
      }
      if (this.list[1].value) {
        const group = {
          name: '摄影-非直播',
        }
        let items = []
        let children = this.list[1].children
        let num = children[0].value
        let day = children[1].value
        let totalPrice = 0
        let totalCount = 0
        if (day && num) {
          totalPrice += num * day * children[0].price
          items.push({ id: 3, value: children[0].value, name: `${children[0].name}`, unit: children[0].unit, params: 's102', regex: 's102*s103*1500', price: children[0].price, total_price: num * day * children[0].price })
          items.push({ id: 4, value: children[1].value, name: `${children[1].name}`, unit: children[1].unit, params: 's103', regex: '0', price: children[1].price, total_price: 0 })
          totalCount++
        }
        if (items.length > 0) {
          console.log(items)
          items = this.calItems(items)
          group.children = items
          group.total_price = totalPrice
          group.total_count = totalCount
          list.push(group)
        }
      }
      this.$store.commit('refreshSingleGroupList', list)
      return list
    }
  },
  methods: {
    updateState () {
      this.$store.commit('refreshSingleList')
    }
  },
  components: { pCheckbox, pInput, pSelect }
}
</script>

<style lang="scss" scoped>
.single-shot {
  .group {
    padding: 32rpx;
    background: white;
    margin-top: 20rpx;
    .item {
      display: block;
      margin-top: 32rpx;
    }
    .item:first-child {
      margin-top: 0;
    }
    .title {
      margin-bottom: 4rpx;
      padding: 0 24rpx;
    }
    .row {
      margin-top: 4rpx;
      padding: 0 24rpx;
    }
  }
  .rules {
    padding: 16rpx 56rpx;
    margin-top: 20rpx;
    background: white;
    .row {
      margin-top: 8rpx;
    }
  }
  .group:first-child {
    margin-top: 0;
  }
}
</style>
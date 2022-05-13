<!--
 * @Author: your name
 * @Date: 2021-09-07 14:23:42
 * @LastEditTime: 2021-11-11 22:49:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \photo-mini\src\pagessub\reserve\compoments\video\live.vue
-->
<template>
  <view class="live">
    <view class="group">
      <p-input :name="list[0].name"
               placeholderClass="color-primary"
               :placeholder="list[0].groups[list[0].groupValue].valueTips"
               v-model="list[0].value"
               class="row"></p-input>

      <p-group-button :buttons="list[0].groups"
                      v-model="list[0].groupValue"
                      class="row"
                      v-if="false"></p-group-button>

      <p-radio v-model="list[1].value"
               :name="list[1].name"
               :warning="list[1].warning"
               v-if="false"></p-radio>
      <p-input v-show="list[1].value"
               v-model="list[1].children[0].value"
               :name="list[1].children[0].name"
               :placeholder="list[1].children[0].placeholder"
               :tips="list[1].children[0].tips"
               class="row"></p-input>

      <p-input v-show="list[1].value"
               v-model="list[1].children[1].value"
               :name="list[1].children[1].name"
               :placeholder="list[1].children[1].placeholder"
               :tips="list[1].children[1].tips"
               v-if="false"
               class="row"></p-input>

      <p-input class="row"
               v-model="list[5].value"
               :name="list[5].name"
               :tips="list[5].tips"
               :placeholder="list[5].placeholder"></p-input>
      <p-input class="row"
               v-model="list[9].value"
               :name="list[9].name"
               :placeholder="list[9].placeholder"></p-input>
      <p-input class="row"
               v-model="list[10].value"
               :name="list[10].name"
               :placeholder="list[10].placeholder"></p-input>
      <p-input class="row"
               v-show="list[3].value"
               v-model="list[3].children[0].value"
               :name="list[3].children[0].name"
               :placeholder="list[3].children[0].placeholder"
               :tips="list[3].children[0].tips"></p-input>
    </view>

    <view class="group">
      <p-radio v-model="list[2].value"
               :name="list[2].name"
               :tips="list[2].tips"></p-radio>
    </view>

    <view class="group"
          v-if="false">
      <p-radio v-model="list[3].value"
               :name="list[3].name"
               v-if="false"></p-radio>
    </view>

    <view class="group">
      <view class="flex extend">
        <view class="title font-14 color-black bold">增选项</view>
        <view class="toggle"
              @click="isCol = !isCol">
          <view class="font-12 color-gray">{{!isCol ? '展开' : '收起'}}</view>
          <image :src="!isCol ? '../../../../static/common/icon-arrow-down.png' : '../../../../static/common/icon-arrow-up.png'"
                 mode="scaleToFill"
                 class="arrow" />
        </view>
      </view>

      <view v-show="isCol">
        <p-input class="row"
                 v-model="list[4].value"
                 :name="list[4].name"
                 :tips="list[4].tips"
                 :placeholder="list[4].placeholder"></p-input>
        <p-input class="row"
                 v-model="list[6].value"
                 :name="list[6].name"
                 :tips="list[6].tips"
                 :placeholder="list[6].placeholder"></p-input>
        <p-input class="row"
                 v-model="list[7].value"
                 :name="list[7].name"
                 :tips="list[7].tips"
                 :placeholder="list[7].placeholder"></p-input>
        <p-input class="row"
                 v-model="list[8].value"
                 :name="list[8].name"
                 :tips="list[8].tips"
                 :placeholder="list[8].placeholder"></p-input>
      </view>
    </view>

    <view class="rules">
      <view class="font-12 color-darkgray title">【注意事项】</view>
      <view class="font-12 color-gray subtitle">1.交通食宿另计</view>
    </view>
  </view>
</template>

<script>
import pInput from './pInput'
import pRadio from './pRadio'
import pGroupButton from './pGroupButton'
import PInput from './pInput.vue'
export default {
  components: {
    pInput,
    pRadio,
    pGroupButton,
    PInput
  },
  data () {
    return {
      isCol: false
    }
  },
  computed: {
    list () {
      return this.$store.state.video.liveList
    },
    groupList () {
      const list = []
      const group = { name: '视频：带货直播' }
      let totalPrice = 0
      let totalCount = 0
      let items = []
      let index = 0
      let id = 30
      if (this.list[index].value && this.list[index].groupValue) {
        const prices = [2000, 1500, 2000]
        const item = this.list[index]
        item.price = prices[item.groups[item.groupValue].value]
        items.push({ id: id, name: item.groups[item.groupValue].name, value: item.value, unit: item.unit, params: 's400', regex: 's400*' + item.price, price: item.price, total_price: item.price * item.value })
        totalPrice += item.price * item.value
        totalCount++
      }
      index++
      id++
      if (this.list[index].value) {//导播
        let children = this.list[index].children
        let numItem = children[0]
        let dayItem = children[1]
        if (numItem.value && dayItem.value) {
          items.push({ id: id, name: `${numItem.name}`, unit: '个', params: 's401', regex: 's401*' + 's402*' + numItem.price, value: numItem.value, price: numItem.price, total_price: numItem.value * numItem.price * dayItem.value })
          items.push({ id: id + 1, name: dayItem.name, value: dayItem.value, unit: '天', params: 's402', regex: '0', price: 0, total_price: 0 })
          totalPrice += numItem.price * numItem.value * dayItem.value
          totalCount++
        }
      }
      index++
      id = id + 2
      if (this.list[index].value && items.length > 0) {//提前一天
        const item = this.list[index]
        const regexs = []
        items.forEach(item => {
          regexs.push(item.regex)
        })
        items.push({ id: id, name: `${item.name}`, value: 1, unit: '天', params: 's403', regex: '(' + regexs.join('+') + ')*0.5*s403', price: totalPrice * 0.5, total_price: totalPrice * 0.5 })
        totalPrice = totalPrice * 1.5
        totalCount++
      }
      index++
      id++
      if (this.list[index].value) {//直播
        const item = this.list[index].children[0]
        if (item.value) {
          items.push({ id: id, name: `${this.list[index].name}`, value: item.value, unit: item.unit, params: 's404', regex: 's404*' + item.price, price: item.price, total_price: item.price * item.value })
          totalPrice += item.value * item.price
          totalCount++
        }
      }
      index++
      id++
      for (; index < this.list.length; index++, id++) {
        if (this.list[index].value) {
          const item = this.list[index]
          items.push({
            id: id, name: `${item.name}`, unit: item.unit, params: ('s' + (400 + id)), regex: 's' + (400 + id) + '*' + item.price, value: item.value, price: item.price, total_price: item.value * item.price
          })
          totalPrice += item.value * item.price
          totalCount++
        }
      }
      if (items.length > 0) {
        items = this.calItems(items)
        group.children = items
        group.total_price = totalPrice
        group.total_count = totalCount
        list.push(group)
      }
      this.$store.commit('refreshLiveGroupList', list)
      return list
    }
  }
}
</script>

<style lang="scss" scoped>
.live {
  .group {
    padding: 32rpx;
    background: white;
    margin-top: 20rpx;
    .title {
      margin-bottom: 4rpx;
      padding: 0 24rpx;
    }
    .subtitle {
      margin-top: 24rpx;
      padding-left: 24rpx;
    }
    .row {
      display: block;
      margin-top: 24rpx;
    }
    .meet-container {
      .row {
        display: block;
        margin-top: 24rpx;
        .title {
          margin-left: 24rpx;
        }
      }
      .tips {
        margin-left: 24rpx;
        margin-top: 16rpx;
      }
      .flex {
        display: flex;
        align-items: center;
      }
    }
    .flex {
      display: flex;
    }
    .extend {
      justify-content: space-between;
      align-items: center;
      .toggle {
        display: flex;
        align-items: center;
        .arrow {
          width: 22rpx;
          height: 14rpx;
          margin-left: 8rpx;
        }
      }
    }
  }
  .rules {
    padding: 16rpx 56rpx;
    background: white;
    margin-top: 20rpx;
    .subtitle {
      margin-top: 8rpx;
    }
  }
  .group:first-child {
    margin-top: 0;
  }
  .group:last-child {
    margin-bottom: 20rpx;
  }
}
</style>
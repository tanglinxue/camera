<!--
 * @Author: your name
 * @Date: 2021-09-07 15:02:47
 * @LastEditTime: 2021-11-11 23:10:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \photo-mini\src\pagessub\reserve\compoments\video\cloudMeet.vue
-->
<template>
  <view class="cloud-meet">
    <view class="group">
      <view class="tips-content">
        <image src="/static/common/icon-tips.png"
               mode="heightFix"
               class="icon" />
        <view class="font-11">如有线下场地拍摄请到【活动会议】板块提交查询</view>
      </view>
      <p-input v-model="list[0].value"
               :name="list[0].name"
               :placeholder="list[0].placeholder"
               :tips="list[0].tips"
               class="row"
               @input="updateState"></p-input>
      <p-input v-model="list[1].value"
               :name="list[1].name"
               :placeholder="list[1].placeholder"
               :tips="list[1].tips"
               class="row middle-row"
               @input="updateState"
               v-if="false"></p-input>
      <p-input v-show="list[3].value"
               v-model="list[3].children[0].value"
               :name="list[3].children[0].name"
               :placeholder="list[3].children[0].placeholder"
               :tips="list[3].children[0].tips"
               :warning="list[3].children[0].warning"
               @input="updateState"></p-input>

      <p-input :name="list[2].name"
               placeholderClass="color-primary"
               :placeholder="list[2].groupValue + '/个'"
               v-model="list[2].value"
               :enable="false"
               @input="updateState"></p-input>

      <p-group-button :buttons="list[2].groups"
                      v-model="list[2].groupValue"
                      :width="252"
                      class="negative-space"
                      :tips="list[2].tips"
                      @input="updateState"></p-group-button>

    </view>

    <view class="group"
          v-if="false">
      <p-radio v-model="list[3].value"
               :name="list[3].name"
               @input="updateState"
               v-if="false"></p-radio>

    </view>

    <view class="group">
      <view class="flex extend">
        <view class="title font-14 color-black bold">增选项</view>
        <view class="toggle"
              @click="isCol = !isCol">
          <view class="font-12 color-gray">{{!isCol ? '展开' : '收起'}}</view>
          <image :src="!isCol ? '/static/common/icon-arrow-down.png' : '/static/common/icon-arrow-up.png'"
                 mode="scaleToFill"
                 class="arrow" />
        </view>
      </view>

      <view v-show="isCol">
        <p-input class="row"
                 v-model="list[4].value"
                 :name="list[4].name"
                 :placeholder="list[4].placeholder"
                 :tips="list[4].tips"
                 @input="updateState"></p-input>

        <p-input class="row"
                 v-model="list[9].value"
                 :name="list[9].name"
                 :placeholder="list[9].placeholder"
                 @input="updateState"></p-input>

        <p-input class="row"
                 v-model="list[10].value"
                 :name="list[10].name"
                 :placeholder="list[10].placeholder"
                 @input="updateState"></p-input>

        <p-input class="row"
                 v-model="list[5].value"
                 :name="list[5].name"
                 :placeholder="list[5].placeholder"
                 @input="updateState"></p-input>

        <p-input class="row"
                 v-model="list[6].value"
                 :name="list[6].name"
                 :placeholder="list[6].placeholder"
                 :tips="list[6].tips"
                 @input="updateState"></p-input>

        <p-input class="row"
                 v-model="list[7].value"
                 :name="list[7].name"
                 :placeholder="list[7].placeholder"
                 :tips="list[7].tips"
                 @input="updateState"></p-input>

        <p-input class="row"
                 v-model="list[8].value"
                 :name="list[8].name"
                 :placeholder="list[8].placeholder"
                 :tips="list[8].tips"
                 @input="updateState"></p-input>
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
export default {
  components: { pInput, pRadio, pGroupButton },
  data () {
    return {
      isCol: false
    }
  },
  computed: {
    list () {
      return this.$store.state.video.cloudMeetList
    },
    groupList () {
      const list = []
      const group = { name: '视频：云会议' }
      let totalPrice = 0
      let totalCount = 0
      let items = []
      let index = 0
      let id = 50
      const day = this.list[index + 1].value
      if (this.list[index].value && day) {
        const item = this.list[index]
        items.push({ id: id, name: `${item.name}`, unit: item.unit, params: 's500', regex: 's500*s501*' + item.price, price: item.price, value: item.value, total_price: item.value * item.price * day })
        items.push({ id: id + 1, name: '天数：', unit: '天', params: 's501', regex: '0', price: '0', value: day, total_price: 0 })
        totalPrice += item.price * item.value * day
        totalCount++
      }
      index += 2
      id += 2
      if (this.list[index].groupValue) {
        const item = this.list[index]
        item.price = item.groupValue
        items.push({ id: id, name: `${item.name}`, unit: item.unit, params: 's502', regex: 's502*' + item.price, value: 1, price: item.price, total_price: 1 * item.price })
        totalPrice += item.price * 1
        totalCount++
      }
      index++
      id++
      if (this.list[index].value && day) {//直播服务
        const item = this.list[index]
        const numItem = item.children[0]
        if (numItem.value * 1 > 0) {
          items.push({
            id: id,
            name: `${item.name}`,
            unit: numItem.unit,
            params: 's503',
            regex: 's503*' + numItem.price,
            value: numItem.value,
            price: numItem.price,
            total_price: numItem.price * numItem.value
          })
          totalPrice += numItem.price * numItem.value
          totalCount++
        }
      }
      index++
      id++
      for (; index < this.list.length; index++, id++) {
        const item = this.list[index]
        if (item.value) {
          items.push({ id: id, name: `${item.name}`, unit: item.unit, params: 's' + (500 + id), regex: 's' + (500 + id) + '*' + item.price, value: item.value, price: item.price, total_price: item.value * item.price })
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
      this.$store.commit('refreshCloudMeetGroupList', list)
      return list
    }
  },
  methods: {
    updateState () {
      this.$store.commit('refreshCloudMeetList')
    }
  }
}
</script>

<style lang="scss" scoped>
.cloud-meet {
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
      margin-bottom: 48rpx;
      .icon {
        height: 26rpx;
        margin-top: 2rpx;
        margin-right: 4rpx;
      }
    }
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
    .middle-row {
      margin-top: 32rpx;
    }
    .flex-between {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: 24rpx;
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
  .with-header {
    padding-top: 8rpx;
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
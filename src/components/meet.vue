<!--
 * @Author: your name
 * @Date: 2021-09-07 10:15:12
 * @LastEditTime: 2021-11-11 23:11:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \photo-mini\src\pagessub\reserve\compoments\video\meet.vue
-->
<template>
  <view class="meet">
    <view class="group">
      <p-input :name="list[0].name"
               placeholderClass="color-primary"
               :placeholder="list[0].groups[list[0].groupValue].valueTips"
               v-model="list[0].value"
               class="row"
               @input="updateState"></p-input>

      <p-group-button :buttons="list[0].groups"
                      v-model="list[0].groupValue"
                      class="row"
                      @input="updateState"
                      v-if="false"></p-group-button>
      <p-input v-model="list[1].value"
               :name="list[1].name"
               :placeholder="list[1].placeholder"
               class="row"
               v-show="list[0].groupValue === '2'"
               @input="updateState"></p-input>

      <p-input v-model="list[2].value"
               :name="list[2].name"
               :placeholder="list[2].placeholder"
               class="row"
               v-show="list[0].groupValue === '2'"
               @input="updateState"></p-input>
      <p-input v-model="list[3].value"
               :name="list[3].name"
               :placeholder="list[3].placeholder"
               :tips="list[3].tips"
               class="row"
               v-show="list[0].groupValue === '2'"
               @input="updateState"></p-input>
    </view>

    <view class="group">
      <p-radio :name="list[4].name"
               :warning="list[4].tips"
               v-model="list[4].value"
               class="row"
               @input="updateState"
               v-if="false"></p-radio>
      <p-input v-show="list[4].value"
               v-model="list[4].children[0].value"
               :name="list[4].children[0].name"
               :placeholder="list[4].children[0].placeholder"
               :tips="list[4].children[0].tips"
               class="row"
               @input="updateState"></p-input>
      <p-input :name="list[4].children[1].name"
               v-model="list[4].children[1].value"
               :placeholder="list[4].children[1].placeholder"
               :tips="list[4].children[1].tips"
               class="row"
               v-if="false"
               @input="updateState"></p-input>

      <p-radio v-model="list[6].value"
               :name="list[6].name"
               class="row"
               @input="updateState"
               v-if="false"></p-radio>

      <p-input v-show="list[6].value"
               v-model="list[6].children[0].value"
               :name="list[6].children[0].name"
               :placeholder="list[6].children[0].placeholder"
               :tips="list[6].children[0].tips"
               :warning="list[6].children[0].warning"
               class="row"
               @input="updateState"></p-input>
    </view>

    <view class="group">
      <p-radio v-model="list[7].value"
               :name="list[7].name"
               class="row"
               :isRadio="false"
               @input="updateState"></p-radio>

      <p-group-button v-show="list[7].value"
                      v-model="list[7].children[0].value"
                      :title="list[7].children[0].title"
                      :buttons="list[7].children[0].groups"
                      class="row"
                      @input="updateState"></p-group-button>

      <p-input v-show="list[7].value"
               v-model="list[7].children[1].value"
               :name="list[7].children[1].name"
               :placeholder="list[7].children[1].placeholder"
               class="row"
               @input="updateState"></p-input>
    </view>

    <view class="group">
      <p-radio v-model="list[5].value"
               :tips="list[5].tips"
               :name="list[5].name"
               class="row"
               @input="updateState"></p-radio>
    </view>

    <view class="group">
      <view class="row flex extend">
        <view class="title font-14 color-black bold">增选项</view>
        <view class="toggle"
              @click="isCol = !isCol">
          <view class="font-12 color-gray">{{!isCol ? '展开' : '收起'}}</view>
          <image :src="!isCol ? '../../../../static/common/icon-arrow-down.png' : '../../../../static/common/icon-arrow-up.png'"
                 mode="scaleToFill"
                 class="arrow" />
        </view>
      </view>

      <view class="meet-container"
            v-show="isCol">
        <p-input v-model="list[8].value"
                 :name="list[8].name"
                 :placeholder="list[8].placeholder"
                 class="row"
                 @input="updateState"></p-input>

        <p-input v-model="list[9].value"
                 :name="list[9].name"
                 :placeholder="list[9].placeholder"
                 class="row"
                 @input="updateState"></p-input>

        <p-input v-model="list[15].value"
                 :name="list[15].name"
                 :placeholder="list[15].placeholder"
                 :tips="list[15].tips"
                 class="row"
                 @input="updateState"></p-input>

        <p-input v-model="list[17].value"
                 :name="list[17].name"
                 :placeholder="list[17].placeholder"
                 class="row"
                 @input="updateState"></p-input>

        <p-input v-model="list[18].value"
                 :name="list[18].name"
                 :placeholder="list[18].placeholder"
                 :tips="list[18].tips"
                 class="row"
                 @input="updateState"></p-input>

        <view class="divider bottom-border"></view>

        <view class="row flex">
          <view class="title font-13 color-black bold">绿幕：</view>
          <view class="font-12 color-primary">￥{{list[11].value}}/场</view>
        </view>

        <view class="tips font-11 color-darkgray">注：包含绿幕、灯、虚拟背景系统</view>

        <p-group-button :buttons="list[11].groups"
                        v-model="list[11].value"
                        class="row"
                        @input="updateState"></p-group-button>
        <p-input v-model="list[12].value"
                 :name="list[12].name"
                 class="row"
                 @input="updateState"></p-input>

        <view class="divider bottom-border"></view>

        <p-input v-model="list[10].value"
                 :name="list[10].name"
                 :placeholder="list[10].placeholder"
                 class="row"
                 @input="updateState"
                 v-if="false"></p-input>

        <p-radio v-model="list[13].value"
                 :name="list[13].name"
                 class="row"
                 @input="updateState"
                 v-if="false"></p-radio>

        <p-input v-model="list[13].children[0].value"
                 v-show="list[13].value"
                 :name="list[13].children[0].name"
                 :placeholder="list[13].children[0].placeholder"
                 class="row"
                 @input="updateState"></p-input>

        <p-input v-model="list[14].value"
                 :name="list[14].name"
                 :tips="list[14].tips"
                 :placeholder="list[14].placeholder"
                 class="row"
                 @input="updateState"></p-input>

        <p-radio v-model="list[16].value"
                 :name="list[16].name"
                 :tips="list[16].tips"
                 yesOption="字幕"
                 noOption='翻译'
                 class="row big-row"
                 @input="updateState">
          {{
                   list[16].value ? '￥3500' : '￥6500'
                 }}</p-radio>

      </view>
    </view>

    <view class="rules">
      <view class="font-12 color-darkgray title">【注意事项】</view>
      <view class="font-12 color-gray row">1.交通食宿另计</view>
    </view>
  </view>
</template>

<script>
import PGroupButton from './pGroupButton.vue'
import PInput from './pInput.vue'
import PSelectButton from './pSelectButton.vue'
import pRadio from './pRadio'
export default {
  components: {
    PInput,
    PSelectButton,
    PGroupButton,
    pRadio
  },
  data () {
    return {
      isCol: false,
    }
  },
  computed: {
    list () {
      return this.$store.state.video.meetList
    },
    groupList () {
      const list = []
      const group = { name: '视频：活动会议' }
      let totalPrice = 0
      let totalCount = 0
      let items = []
      if (this.list[0].value && this.list[0].groupValue) {//摄像
        const numItem = this.list[0]
        numItem.price = numItem.groups[numItem.groupValue].price
        items.push({ id: 7, name: `${numItem.groups[numItem.groupValue].name}：`, unit: numItem.unit, params: 's300', regex: 's300*1500', value: numItem.value, price: numItem.price, total_price: numItem.value * numItem.price });
        totalCount++
        totalPrice += numItem.value * numItem.price
      }
      if (this.list[0].groupValue === '2' && this.list[1].value) {//技术员
        const item = this.list[1]
        items.push({ id: 8, name: `${item.name}`, unit: item.unit, params: 's301', regex: 's301*1000', value: item.value, price: item.price, total_price: item.value * item.price })
        totalCount++
        totalPrice += item.value * item.price
      }
      if (this.list[0].groupValue === '2' && this.list[2].value) {//长焦镜头
        const item = this.list[2]
        items.push({ id: 8, name: `${item.name}`, unit: item.unit, params: 's302', regex: 's302*1000', value: item.value, price: item.price, total_price: item.value * item.price })
        totalCount++
        totalPrice += item.value * item.price
      }
      if (this.list[0].groupValue === '2' && this.list[3].value) {//广焦镜头
        const item = this.list[3]
        items.push({ id: 8, name: `${item.name}`, unit: item.unit, params: 's303', regex: 's303*3000', value: item.value, price: item.price, total_price: item.value * item.price })
        totalCount++
        totalPrice += item.value * item.price
      }
      if (this.list[4].value) {//导播
        const item = this.list[4]
        const numItem = item.children[0]
        const dayItem = item.children[1]
        if (numItem.value && dayItem.value) {
          totalPrice += numItem.value * numItem.price * dayItem.value
          items.push({ id: 9, name: `${numItem.name}`, unit: numItem.unit, params: 's304', regex: 's304*s305*3500', value: numItem.value, price: numItem.price, total_price: numItem.value * numItem.price * dayItem.value })
          totalCount++
          items.push({ id: 10, name: `${dayItem.name}`, unit: dayItem.unit, params: 's305', regex: '0', value: dayItem.value, price: dayItem.price, total_price: dayItem.value * dayItem.price })
          // totalCount++
        }
      }
      if (this.list[5].value && items.length > 0) {//提前进场
        const regexs = []
        items.forEach(item => {
          regexs.push(item.regex)
        })
        if (regexs.length > 0) {
          items.push({ id: 11, name: '提前进场：', value: 1, unit: '天', params: 's306', regex: '(' + regexs.join('+') + ')*0.5', price: totalPrice * 0.5, total_price: totalPrice * 0.5 })
        } else {
          items.push({ id: 11, name: '提前进场：', value: 1, unit: '天', params: 's306', regex: '0', price: totalPrice * 0.5, total_price: totalPrice * 0.5 })
        }
        totalPrice = totalPrice * 1.5
        totalCount++
      }
      if (this.list[6].value && this.list[6].children[0].value) {
        const item = this.list[6].children[0]
        items.push({ id: 12, name: '直播服务：', unit: item.unit, params: 's307', regex: 's307*3500', value: item.value, price: item.price, total_price: item.price * item.value })
        totalCount++
        totalPrice += item.price * item.value
      }
      if (this.list[7].value) {//连线服务
        const typeItem = this.list[7].children[0]
        const numItem = this.list[7].children[1]
        if (typeItem.value && numItem.value) {
          items.push({
            id: 13,
            name: `${this.list[7].name}`,
            unit: '场',
            params: 's308',
            regex: 's308*' + typeItem.value,
            value: numItem.value,
            price: typeItem.value,
            total_price: numItem.value * typeItem.value
          })
          totalPrice += numItem.value * typeItem.value
          totalCount++
        }
      }
      if (this.list[8].value) {//摇臂
        const item = this.list[8]
        items.push(
          {
            id: 14,
            name: `${item.name}`,
            unit: item.unit,
            params: 's309',
            regex: 's309*' + item.price,
            value: item.value,
            price: item.price,
            total_price: item.value * item.price
          }
        )
        totalPrice += item.value * item.price
        totalCount++
      }
      if (this.list[9].value) {//航拍
        const item = this.list[9]
        items.push(
          {
            id: 15,
            name: `${item.name}`,
            unit: item.unit,
            params: 's310',
            regex: 's310*' + item.price,
            value: item.value,
            price: item.price,
            total_price: item.value * item.price
          }
        )
        totalPrice += item.value * item.price
        totalCount++
      }
      if (this.list[10].value) {//稳定器
        const item = this.list[10]
        items.push(
          {
            id: 16,
            name: `${item.name}${item.value}`,
            unit: item.unit,
            params: 's311',
            regex: 's311*' + item.price,
            value: item.value,
            price: item.price,
            total_price: item.value * item.price
          }
        )
        totalPrice += item.value * item.price
        totalCount++
      }
      if (this.list[11].value && this.list[12].value) {
        const typeItem = this.list[11]
        const numItem = this.list[12]
        numItem.price = typeItem.value
        items.push({ id: 17, name: `${this.list[11].name}`, unit: '场', params: 's312', regex: 's312*' + numItem.price, value: numItem.value, total_price: numItem.price * numItem.value })
        totalPrice += numItem.price * numItem.value
        totalCount++
      }
      if (this.list[13].value && this.list[13].children[0].value) {
        const item = this.list[13].children[0]
        items.push({ id: 18, name: `${item.name}`, unit: item.unit, params: 's313', regex: 's313*' + item.price, value: item.value, price: item.price, total_price: item.value * item.price })
        totalPrice += item.price * item.value
        totalCount++
      }
      if (this.list[14].value) {
        const item = this.list[14]
        items.push({ id: 19, name: `${item.name}`, unit: item.unit, params: 's314', regex: 's314*' + item.price, value: item.value, price: item.price, total_price: item.price })
        totalPrice += item.price * item.value
        totalCount++
      }
      if (this.list[15].value) {
        const item = this.list[15]
        items.push({ id: 20, name: `${item.name}`, unit: item.unit, params: 's315', regex: 's315*' + item.price, value: item.value, price: item.price, total_price: item.price * item.value })
        totalPrice += item.price * item.value
        totalCount++
      }
      if (this.list[16].value !== '') {
        const item = this.list[16]
        item.price = item.value ? '3500' : '6500'
        items.push({ id: 21, name: `${item.name}`, unit: '0', params: 's316', regex: 's316*' + item.price, value: 1, price: item.price, total_price: item.price })
        totalPrice += item.price * 1
        totalCount++
      }
      if (this.list[17].value) {
        const item = this.list[17]
        items.push({ id: 22, name: `${item.name}`, unit: item.unit, params: 's317', regex: 's317*' + item.price, value: item.value, price: item.price, total_price: item.value * item.price })
        totalPrice += item.price * item.value
        totalCount++
      }
      if (this.list[18].value) {
        const item = this.list[18]
        items.push({ id: 23, name: `${item.name}`, unit: item.unit, params: 's318', regex: 's318*' + item.price, value: item.value, price: item.price, total_price: item.value * item.price })
        totalPrice += item.price * item.value
        totalCount++
      }
      if (items.length > 0) {
        items = this.calItems(items)
        group.children = items
        group.total_price = totalPrice
        group.total_count = totalCount
        list.push(group)
      }
      this.$store.commit('refreshMeetGroupList', list)
      return list
    }
  },
  methods: {
    updateState () {
      this.$store.commit('refreshMeetList')
    }
  }
}
</script>

<style lang="scss" scoped>
.meet {
  .group {
    padding: 32rpx;
    background: white;
    margin-top: 20rpx;
    .row {
      display: block;
      margin-top: 24rpx;
      &-button {
        display: block;
        width: 200rpx;
      }
    }
    .big-row {
      margin-top: 48rpx;
    }
    .divider {
      margin-top: 0;
      margin: 32rpx 0;
    }
    .row:first-child {
      margin-top: 0;
    }
    .meet-container {
      .row {
        display: block;
        margin-top: 24rpx;
        .title {
          margin-left: 24rpx;
        }
      }
      .big-row {
        margin-top: 48rpx;
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
      padding-left: 24rpx;
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
    .row {
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
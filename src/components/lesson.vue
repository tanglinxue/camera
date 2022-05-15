<!--
 * @Author: your name
 * @Date: 2021-09-06 14:55:05
 * @LastEditTime: 2021-11-10 22:12:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \photo-mini\src\pagessub\reserve\compoments\lesson.vue
-->
<template>
  <view class="lesson">
    <view class="group">
      <view class="tips-content">
        <image src="/static/common/icon-tips.png"
               mode="heightFix"
               class="icon" />
        <view class="font-11">服务包含：固定摄像1个、灯光1组、素材拼剪</view>
      </view>
      <p-checkbox :name="list[0].name"
                  v-model="list[0].value"
                  :warning="list[0].warning"
                  class="row"
                  @input="updateState"></p-checkbox>

      <p-input v-model="list[0].children[0].value"
               :name="list[0].children[0].name"
               :placeholder="list[0].children[0].placeholder"
               :tips="list[0].children[0].tips"
               v-show="list[0].value"
               class="row"
               @input="updateState"></p-input>

      <p-input v-model="list[0].children[1].value"
               :name="list[0].children[1].name"
               :placeholder="list[0].children[1].placeholder"
               :tips="list[0].children[1].tips"
               v-show="list[0].value"
               class="row"
               @input="updateState"
               v-if="false"></p-input>

      <view class="row bottom-border"
            v-show="list[0].value"></view>

    </view>

    <view class="group">
      <p-checkbox :name="list[1].name"
                  v-model="list[1].value"
                  :warning="list[1].warning"
                  class="row"
                  @input="updateState"></p-checkbox>

      <p-input v-model="list[1].children[0].value"
               :name="list[1].children[0].name"
               :placeholder="list[1].children[0].placeholder"
               :tips="list[1].children[0].tips"
               v-show="list[1].value"
               class="row"
               @input="updateState"></p-input>

      <p-input v-model="list[1].children[1].value"
               :name="list[1].children[1].name"
               :placeholder="list[1].children[1].placeholder"
               :tips="list[1].children[1].tips"
               v-show="list[1].value"
               class="row"
               @input="updateState"
               v-if="false"></p-input>

    </view>

    <view class="group">
      <p-radio v-model="list[0].children[2].value"
               :name="list[0].children[2].name"
               class="row"
               @input="updateState"></p-radio>
    </view>

    <view class="group"
          v-if="false">
      <view class="flex extend">
        <view class="title font-14 color-black bold">增选项</view>
        <view class="toggle"
              @click="isCol = !isCol">
          <view class="font-12 color-gray">{{!isCol ? '展开' : '收起'}}</view>
          <image :src="!isCol ? '../../../static/common/icon-arrow-down.png' : '../../../static/common/icon-arrow-up.png'"
                 mode="scaleToFill"
                 class="arrow" />
        </view>
      </view>

      <view v-show="isCol">
        <p-input v-model="list[2].value"
                 :name="list[2].name"
                 :placeholder="list[2].placeholder"
                 :tips="list[2].tips"
                 class="row"
                 @input="updateState"></p-input>

        <view class="divider bottom-border"></view>

        <p-radio v-model="list[3].value"
                 :name="list[3].name"
                 :tips="list[3].tips"
                 @input="updateState"></p-radio>
        <view class="font-11 color-primary margin-left-12">{{list[3].warning}}</view>

        <p-input v-model="list[3].children[0].value"
                 :name="list[3].children[0].name"
                 :placeholder="list[3].children[0].placeholder"
                 class="row"
                 v-show="list[3].value"
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
import PCheckbox from './pCheckbox.vue'
export default {
  components: { pInput, pRadio, PCheckbox },
  data () {
    return {
      isCol: false
    }
  },
  computed: {
    list () {
      return this.$store.state.lesson.lessonList
    },
    groupList () {
      const list = []
      const group = { name: '课程录制' }
      let totalPrice = 0
      let totalCount = 0
      let items = []
      let index = 0
      let id = 90
      if (this.list[index].value) {
        const children = this.list[index].children
        totalPrice += this.list[index].price
        totalCount++
        items.push({ id: id, name: this.list[index].name + '：', unit: '', params: 's820', regex: this.list[index].price + '', value: '1', price: this.list[index].price, total_price: this.list[index].price })
        if (children[0].value && children[1].value) {
          const numItem = children[0]
          const dayItem = children[1]
          items.push({ id: id + 1, name: `${numItem.name}(线下)`, unit: numItem.unit, params: 's800', regex: 's800*s801*' + numItem.price, value: numItem.value, price: numItem.price, total_price: numItem.price * numItem.value * dayItem.value })
          items.push({ id: id + 2, name: '天数：(线下)', unit: '天', params: 's801', regex: '0', value: dayItem.value, price: 0, total_price: 0 })
          totalPrice += numItem.price * numItem.value * dayItem.value
          totalCount++
          if (children[2].value) {
            const item = children[2]
            const regexs = []
            items.forEach(item => {
              regexs.push(item.regex)
            })
            items.push({
              id: id + 3, name: item.name, unit: '天', params: 's802', regex: '(' + regexs.join(' + ') + ')*0.5', value: 1, price: totalPrice * 0.5, total_price: totalPrice * 0.5
            })
            totalPrice += totalPrice * 0.5
            totalCount++
          }
        }
      }
      index++
      id = id + 4
      if (this.list[index].value) {
        totalPrice += this.list[index].price
        totalCount++
        items.push({ id: id, name: this.list[index].name + '：', unit: '', params: 's820', regex: this.list[index].price + '', value: '1', price: this.list[index].price, total_price: this.list[index].price })
        const children = this.list[index].children
        if (children[0].value && children[1].value) {
          const numItem = children[0]
          const dayItem = children[1]
          items.push({ id: id + 1, name: `${numItem.name}`, unit: numItem.unit, params: 's803', regex: 's803*s804*' + numItem.price, value: numItem.value, price: numItem.price, total_price: numItem.price * numItem.value * dayItem.value })
          items.push({ id: id + 2, name: '天数：', unit: '天', params: 's804', regex: '0', value: dayItem.value, price: '0', total_price: '0' })
          totalPrice += numItem.price * numItem.value * dayItem.value
          totalCount++
        }
      }
      index++
      id = id + 3

      if (this.list[index].value) {
        const item = this.list[index]
        items.push({ id: id, name: `${item.name}`, unit: item.unit, params: 's805', regex: 's805*' + item.price, value: item.value, price: item.price, total_price: item.price * item.value })
        totalPrice += item.price * item.value
        totalCount++
      }
      index++
      id++
      if (this.list[index].value) {
        if (this.list[index].children[0].value) {
          const item = this.list[index].children[0]
          items.push({ id: id, name: `${this.list[index].name}`, unit: item.unit, params: 's806', regex: 's806*' + item.price, value: item.value, price: item.price, total_price: item.price * item.value })
          totalPrice += item.price * item.value
          totalCount++
        }
      }

      if (items.length > 0) {
        console.log(items)
        items = this.calItems(items)
        group.children = items
        group.total_price = totalPrice
        group.total_count = totalCount
        list.push(group)
      }

      this.$store.commit('refreshLessonGroupList', list)
      return list
    }
  },
  methods: {
    updateState () {
      this.$store.commit('refreshLessonList')
    }
  }
}
</script>

<style lang="scss" scoped>
.lesson {
  height: 100%;
  overflow-y: auto;
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
        margin-right: 4rpx;
      }
    }

    .margin-left-12 {
      margin-left: 24rpx;
    }

    .row {
      display: block;
      margin-top: 24rpx;
    }
    .title {
      margin-bottom: 4rpx;
      padding: 0 24rpx;
    }
    .subtitle {
      padding-left: 24rpx;
    }
    .flex {
      display: flex;
    }
    .divider {
      margin-top: 0;
      margin: 32rpx 0;
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
  .group:last-child {
    margin-bottom: 20rpx;
  }
}
</style>
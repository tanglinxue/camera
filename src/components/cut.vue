<!--
 * @Author: your name
 * @Date: 2021-09-06 14:54:22
 * @LastEditTime: 2021-11-10 22:21:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \photo-mini\src\pagessub\reserve\compoments\cut.vue
-->
<template>
  <view class="cut">
    <view class="group">
      <p-input v-model="list[0].value"
               :name="list[0].name"
               :placeholder="list[0].placeholder"
               @input="updateState"></p-input>
      <p-input v-model="list[1].value"
               :name="list[1].name"
               :tips="list[1].tips"
               class="row"
               @input="updateState"></p-input>

      <p-input v-model="list[2].value"
               :name="list[2].name"
               :placeholder="list[2].placeholder"
               class="row"
               @input="updateState"></p-input>

      <p-input v-model="list[3].value"
               :name="list[3].name"
               :tips="list[3].tips"
               class="row"
               @input="updateState"></p-input>
    </view>

    <view class="group">
      <p-group-button size="big"
                      selectClss="primary-select"
                      :buttons="list[4].groups"
                      v-model="list[4].value"
                      @input="updateState"
                      v-if="false"></p-group-button>
      <view v-show="list[4].value*1 === 1">
        <p-checkbox v-model="list[5].value"
                    :name="list[5].name"
                    :tips="list[5].tips"
                    class="row"
                    @input="updateState"
                    :isCheckbox="false"></p-checkbox>

        <p-input v-model="list[5].children[0].value"
                 :name="list[5].children[0].name"
                 :placeholder="list[5].children[0].placeholder"
                 v-show="list[5].value"
                 class="row"
                 @input="updateState"></p-input>

        <p-input v-model="list[5].children[1].value"
                 :name="list[5].children[1].name"
                 :placeholder="list[5].children[1].placeholder"
                 v-show="list[5].value"
                 class="row"
                 @input="updateState"></p-input>
      </view>

    </view>

    <view class="group"
          v-show="list[4].value*1 === 1">
      <p-checkbox v-model="list[6].value"
                  :name="list[6].name"
                  :tips="list[6].tips"
                  @input="updateState"
                  :isCheckbox="false"></p-checkbox>

      <p-input v-model="list[6].children[0].value"
               :name="list[6].children[0].name"
               :placeholder="list[6].children[0].placeholder"
               :tips="list[6].children[0].tips"
               v-show="list[6].value"
               class="row"
               @input="updateState"></p-input>

      <p-input v-model="list[6].children[1].value"
               :name="list[6].children[1].name"
               :placeholder="list[6].children[1].placeholder"
               :tips="list[6].children[1].tips"
               :warning="list[6].children[1].warning"
               v-show="list[6].value"
               class="row"
               @input="updateState"></p-input>

    </view>

    <view class="rules">
      <view class="font-12 color-darkgray title">【注意事项】</view>
      <view class="font-12 color-primary subtitle">1.剪辑其他需求另计</view>
      <view class="font-12 color-gray subtitle">2.交通食宿另计</view>
    </view>
  </view>
</template>

<script>
import pInput from './pInput'
import pCheckbox from './pCheckbox'
import pGroupButton from './pGroupButton'
export default {
  components: { pInput, pCheckbox, pGroupButton },
  data () {
    return {
    }
  },
  computed: {
    list () {
      return this.$store.state.cut.cutList
    },
    groupList () {
      const list = []
      const group = { name: '快剪' }
      let totalPrice = 0
      let totalCount = 0
      let items = []
      let index = 0
      let id = 70
      let day = this.list[index + 1].value
      if (this.list[index].value && day) {
        const item = this.list[index]
        items.push({ id: id, name: `${item.name}`, unit: item.unit, params: 's600', regex: 's600*s601*' + item.price, value: item.value, price: item.price, total_price: item.value * item.price * day })
        items.push({ id: id + 1, name: '天数：', params: 's601', regex: '0', unit: '天', value: day, price: 0, total_price: 0 })
        totalPrice += item.price * item.value * day
        totalCount++
      }
      index = index + 2
      id = id + 2
      day = this.list[index + 1].value
      if (this.list[index].value && day) {
        const item = this.list[index]
        items.push({ id: id, name: `${item.name}`, unit: item.unit, params: 's602', regex: 's602*' + item.price, value: item.value, price: item.price, total_price: item.value * item.price * day })
        totalPrice += item.price * item.value * day
        totalCount++
      }
      index = index + 2
      id++
      if (this.list[index].value * 1) {
        if (this.list[index + 1].value) {
          const children = this.list[index + 1].children
          if (children[0].value) {
            const item = children[0]
            items.push({
              id: id + 1,
              name: `${this.list[index + 1].name}${item.name}`,
              unit: item.unit,
              params: 's603',
              regex: 's603*' + item.price,
              value: item.value, price: item.price, total_price: item.price * item.value
            })
            totalPrice += item.price * item.value
            totalCount++
          }
          if (children[1].value) {
            const item = children[1]
            items.push({
              id: id + 2,
              name: `${this.list[index + 1].name}${item.name}`,
              unit: item.unit,
              params: 's604',
              regex: 's604*' + item.price,
              value: item.value, price: item.price, total_price: item.price * item.value
            })
            totalPrice += item.price * item.value
            totalCount++
          }
        }
        id = id + 2
        index++
        if (this.list[index + 1].value) {
          const children = this.list[index + 1].children
          if (children[0].value) {
            const item = children[0]
            items.push({
              id: id + 1,
              name: `${this.list[index + 1].name}${item.name}`,
              unit: item.unit,
              params: 's605',
              regex: 's605*' + item.price,
              value: item.value, price: item.price, total_price: item.price * item.value
            })
            totalPrice += item.price * item.value
            totalCount++
          }
          if (children[1].value) {
            const item = children[1]
            items.push({
              id: id + 2,
              name: `${this.list[index + 1].name}${item.name}`,
              unit: item.unit,
              params: 's606',
              regex: 's606*' + item.price,
              value: item.value, price: item.price, total_price: item.price * item.value
            })
            totalPrice += item.price * item.value
            totalCount++
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

      this.$store.commit('refreshCutGroupList', list)
      return list
    }
  },
  methods: {
    updateState () {
      this.$store.commit('refreshCutList')
    }
  }
}
</script>

<style lang="scss" scoped>
.cut {
  height: 100%;
  overflow-y: auto;
  .group {
    padding: 32rpx;
    background: white;
    margin-top: 20rpx;
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
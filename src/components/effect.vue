<!--
 * @Author: your name
 * @Date: 2021-09-06 14:54:40
 * @LastEditTime: 2021-10-12 22:54:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \photo-mini\src\pagessub\reserve\compoments\effect.vue
-->
<template>
  <view class="effect">
    <view class="group">
      <p-input v-model="list[0].value"
               :name="list[0].name"
               :placeholder="list[0].placeholder"
               @input="updateState"></p-input>
      <p-input v-model="list[1].value"
               :name="list[1].name"
               :placeholder="list[1].placeholder"
               class="row"
               @input="updateState"></p-input>
    </view>

    <view class="group">
      <p-radio v-model="list[2].value"
               :name="list[2].name"
               yesOption='通用'
               noOption='定制'
               @input="updateState"></p-radio>
      <p-input v-model="list[3].value"
               :name="list[3].name"
               :placeholder="list[2].value ? '¥500/条' : '¥1500/条'"
               class="row"
               @input="updateState"></p-input>
    </view>

    <view class="group">
      <p-input v-model="list[4].value"
               :name="list[4].name"
               :placeholder="list[4].placeholder"
               @input="updateState"></p-input>
      <p-input v-model="list[5].value"
               :name="list[5].name"
               :placeholder="list[5].placeholder"
               :tips="list[5].tips"
               class="row"
               @input="updateState"></p-input>
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
export default {
  components: { pInput, pRadio },
  data () {
    return {
    }
  },
  computed: {
    list () {
      return this.$store.state.effect.effectList
    },
    groupList () {
      const list = []
      const group = { name: '特效制作' }
      let totalPrice = 0
      let totalCount = 0
      let items = []
      let index = 0
      let id = 70
      if (this.list[index].value) {
        const item = this.list[index]
        items.push({ id: id, name: `${item.name}`, unit: item.unit, params: 's700', params: 's700', regex: 's700*' + item.price, value: item.value, price: item.price, total_price: item.value * item.price })
        totalPrice += item.price * item.value
        totalCount++
      }
      index++
      id++
      if (this.list[index].value) {
        const item = this.list[index]
        items.push({ id: id, name: `${item.name}`, unit: item.unit, params: 's701', regex: 's701*' + item.price, value: item.value, price: item.price, total_price: item.value * item.price })
        totalPrice += item.price * item.value
        totalCount++
      }
      index++
      id++
      if (this.list[index + 1].value && this.list[index].value !== '') {
        const item = this.list[index + 1]
        item.price = this.list[index].value ? '500' : '1500'
        const name = this.list[index].value ? '通用' : '定制'
        items.push({ id: id, name: `${this.list[index].name}(${name})`, unit: item.unit, params: 's702', regex: 's702*' + item.price, value: item.value, price: item.price, total_price: item.price * item.value })
        totalPrice += item.price * item.value
        totalCount++
      }
      index = index + 2
      id++
      if (this.list[index].value) {
        const item = this.list[index]
        items.push({ id: id, name: `${item.name}`, unit: item.unit, params: 's703', regex: '0', value: item.value, price: item.price, total_price: item.price })
        totalCount++
      }
      index++
      id++
      if (this.list[index].value) {
        const item = this.list[index]
        items.push({ id: id, name: `${item.name}`, unit: item.unit, params: 's704', regex: '0', value: item.value, price: item.price, total_price: item.price })
        totalCount++
      }

      if (items.length > 0) {
        items = this.calItems(items)
        group.children = items
        group.total_price = totalPrice
        group.total_count = totalCount
        list.push(group)
      }

      this.$store.commit('refreshEffectGroupList', list)
      return list
    }
  },
  methods: {
    updateState () {
      this.$store.commit('refreshEffectList')
    }
  }
}
</script>

<style lang="scss" scoped>
.effect {
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
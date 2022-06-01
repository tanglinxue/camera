import Vue from 'vue'
import App from './App'

//引入插件
import plugins from './utils/plugins'

//应用（使用）插件
Vue.use(plugins)
// 如此配置即可
// uni.$u.config.unit = 'rpx'
 // import router from './router'
import store from './store'
App.mpType = 'app'

//关闭Vue的生产提示
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
const app = new Vue({
  ...App,
  // router,
  store,
  
})
app.$mount()
export default app

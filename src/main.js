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
import Empty from '@/components/empty/index'
import dynamicInfo from '@/components/dynamicInfo';
import reduceCom from '@/components/reduceCom';
import selectCom from '@/components/selectCom';
import approachCom from '@/components/approachCom';
import changePopup from '@/components/changePopup';
Vue.component('Empty', Empty)
Vue.component('dynamicInfo', dynamicInfo)
Vue.component('reduceCom', reduceCom)
Vue.component('selectCom', selectCom)
Vue.component('approachCom', approachCom)
Vue.component('changePopup', changePopup)
const app = new Vue({
	...App,
	// router,
	store,

})
app.$mount()
export default app

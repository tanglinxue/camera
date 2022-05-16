import methods from 'utils/method.js'
import {jump} from 'utils/method.js'
import API from '@/api'
import exprEval from 'expr-eval'
//ok
export default {
	install(Vue){
		//给Vue原型上添加一个方法（vm和vc就都能用了）
		// 任意组件可以使用API相关的接口
		Vue.prototype.$API = API
		Vue.prototype.$jump = jump
		Vue.prototype.$methods = methods	
		 Vue.prototype.calCommonExp=function(val) {
		      return (exprEval.Parser.evaluate(val, {}))
		      // return calCommonExp(val)
		    }
		Vue.prototype.calItems = function(items) {
      const paramsMap = new Map()
      items.forEach(item => {
        if (item.mini_value && item.mini_value*1 > item.value*1) {
          paramsMap.set(item.params, item.mini_value)
        } else {
          paramsMap.set(item.params, item.value)
        }
      })
      console.log(items, paramsMap)
      items.forEach(item => {
        let regex = item.regex
        paramsMap.forEach(function (value, key) {
          regex = regex.replace(key, value)
        })
        if (item.price === '费用另计') {
          item.total_price = 0
        } else {
          item.total_price = this.calCommonExp(regex)
        }
        console.log(item.total_price)
      })
      return items
    }
	}
}
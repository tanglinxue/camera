import request from '../request.js'
import {Upload} from '../request.js'
export default {
	// 获取订单列表
	async getList(data={}){
		let res = await request({
			url: '/api/orders/query_order',
			method: 'POST',
			data
		})
		return res
	},
	// 订单详情页
	async getDetail(data={}){
		let res = await request({
			url: '/api/orders/query_order_detail',
			method: 'POST',
			data
		})
		return res
	}
}  
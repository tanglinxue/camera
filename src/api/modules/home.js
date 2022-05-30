import request from '../request.js'
export default {
	//登录接口
	async minilogin(data = {}) {
		let res = await request({
			url: '/api/user/minilogin',
			method: 'POST',
			data
		})
		return res
	},
	//获取用户信息
	async get_userinfo(data = {}) {
		let res = await request({
			url: '/api/user/get_userinfo',
			method: 'POST',
			data
		})
		return res
	},
	//首页
	async get_index_price(data = {}) {
		let res = await request({
			url: '/api/orders/index_price',
			method: 'POST',
			data
		})
		return res
	},
}

import request,{Upload} from '../request.js'
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
	// 上传图片
	async upLoadImg(data = {}) {
		let res = await Upload({
			url: '/api/orders/upload_qn',
			method: 'POST',
			data
		})
		return res
	},
	//通过模板id获取用户的模板信息
	async getTemplateById(data = {}) {
		let res = await request({
			url: '/api/orders/getTemplateById',
			method: 'POST',
			data
		})
		return res
	},
	//首页-开始报价
	async getPriceByUser(data = {}) {
		let res = await request({
			url: '/api/orders/getPriceByUser',
			method: 'POST',
			data
		})
		return res
	},
	//编辑配置节点
	async edit_item(data = {}) {
		let res = await request({
			url: '/api/orders/edit_item',
			method: 'POST',
			data
		})
		return res
	},
	
}

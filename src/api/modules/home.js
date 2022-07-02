import request,{Upload} from '../request.js'
export default {
	// 上传图片
	async upLoadImg(data = {}) {
		let res = await Upload({
			url: '/api/orders/upload_qn',
			method: 'POST',
			data
		})
		return res
	},
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
	//编辑动态配置节点
	async edit_dynamic(data = {}) {
		let res = await request({
			url: '/api/orders/edit_dynamic',
			method: 'POST',
			data
		})
		return res
	},
	//发布报价
	async publish_price(data = {}) {
		let res = await request({
			url: '/api/orders/publish_price',
			method: 'POST',
			data
		})
		return res
	},
	//编辑报价
	async edit_price(data = {}) {
		let res = await request({
			url: '/api/orders/do_edit_price',
			method: 'POST',
			data
		})
		return res
	},
	//通过报价id获取报价详情 
	async getPriceById(data = {}) {
		let res = await request({
			url: '/api/orders/getPriceById',
			method: 'POST',
			data
		})
		return res
	},
	//通过模板id获取用户的模板信息
	async getTemplateById(data = {}) {
		let res = await request({
			url: '/api/orders/getPriceByTempid',
			method: 'POST',
			data
		})
		return res
	},
	// 创建下单
	async submit_order(data = {}) {
		let res = await request({
			url: '/api/orders/submit_order',
			method: 'POST',
			data
		})
		return res
	},
	// 编辑订单
	async edit_order(data = {}) {
		let res = await request({
			url: '/api/orders/edit_order',
			method: 'POST',
			data
		})
		return res
	},
	// 报价模板列表
	async template_more(data = {}) {
		let res = await request({
			url: '/api/orders/template_more',
			method: 'POST',
			data
		})
		return res
	},
}

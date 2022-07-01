import request from '../request.js'
export default {
	//我的页面
	async mypage(data={}) {
		let res = await request({
			url: '/api/orders/mypage', 
			method: 'POST',
			data
		})
		return res
	},
	//获取我的信息
	async getmyinfo(data={}) {
		let res = await request({
			url: '/api/orders/getmyinfo', 
			method: 'POST',
			data
		})
		return res
	},
	//更新我的信息
	async myinfo(data={}) {
		let res = await request({
			url: '/api/orders/myinfo', 
			method: 'POST',
			data
		})
		return res
	},
	// 历史报价
	async price_more(data={}) {
		let res = await request({
			url: '/api/orders/price_more', 
			method: 'POST',
			data
		})
		return res
	}
}



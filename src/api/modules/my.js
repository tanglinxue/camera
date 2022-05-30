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
}



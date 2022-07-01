import request from '../request.js'
export default {
	//�ҵ�ҳ��
	async mypage(data={}) {
		let res = await request({
			url: '/api/orders/mypage', 
			method: 'POST',
			data
		})
		return res
	},
	//��ȡ�ҵ���Ϣ
	async getmyinfo(data={}) {
		let res = await request({
			url: '/api/orders/getmyinfo', 
			method: 'POST',
			data
		})
		return res
	},
	//�����ҵ���Ϣ
	async myinfo(data={}) {
		let res = await request({
			url: '/api/orders/myinfo', 
			method: 'POST',
			data
		})
		return res
	},
	// ��ʷ����
	async price_more(data={}) {
		let res = await request({
			url: '/api/orders/price_more', 
			method: 'POST',
			data
		})
		return res
	}
}



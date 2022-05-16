/*
 * @Author: your name
 * @Date: 2021-09-11 08:43:28
 * @LastEditTime: 2021-09-13 16:56:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \photo-mini\src\store\modules\effect.js
 */
const state = {
	effectList: [
		{ name: '动态主KV（条数）：', placeholder: '¥600/条', type: 'input', value: '',price:'600',unit:'条' },
		{ name: '启动视频（条数）：', placeholder: '¥2000/条', type: 'input', value: '',price:'2000',unit:'条' },
		{ name: '倒计时：', type: 'radio', value: '' },
		{ name: '数量：', type: 'input', placeholder: '¥500/条', value: '',price: '500', unit:'条' },
		{ name: '舞美视频（条数）：', type: 'input', placeholder: '按需报价', value: '',price: '费用另计', unit:'条' },
		{ name: '宣传视频（条数）：', type: 'input', placeholder: '按需报价', value: '',price: '费用另计', unit:'条', tips: '注：访谈视频、素材剪辑、特效视频、短片拍摄等' }
	],
	effectGroupList: []
}

const getters = {}

const mutations = {
	refreshEffectList(state) {
		state.effectList = JSON.parse(JSON.stringify(state.effectList))
	},
	refreshEffectGroupList(state,list)
	{
		state.effectGroupList = list
	}
}

const actions = {}

export default {
	state,
	getters,
	mutations,
	actions
}
/*
 * @Author: your name
 * @Date: 2021-09-11 08:43:15
 * @LastEditTime: 2021-11-10 22:17:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \photo-mini\src\store\modules\cut.js
 */

const state = {
	cutList: [
		{
			name: '游机（机位数）：',
			placeholder: '¥1500/个',
			value: '',
			type: 'input',
			price: '1500',
			unit: '个'
		},
		{
			name: '天数：',
			placeholder: '',
			value: '',
			type: 'input',
			tips: '注：超8小时后，按每机位100元/小时'
		},
		{
			name: '延时（机位数）：',
			placeholder: '¥1500/个',
			value: '',
			type: 'input',
			price: 1500,
			unit: '个'
		},
		{
			name: '天数：',
			placeholder: '',
			value: '',
			type: 'input',
			tips: '注：超8小时后，按每机位100元/小时'
		},
		{
			name: '剪辑：',
			type: 'groupButton',
			value: '1',
			groups: [
				{
					name: '剪辑',
					value: '1',
				},
				{
					name: '不剪辑',
					value: '0'
				}
			]
		},
		{
			name: '快剪',
			tips: '（当天出片）',
			type: 'checkbox',
			value: 'true',
			children: [
				{
					name: '15秒（条数）：',
					value: '',
					type: 'input',
					placeholder: '¥600/条',
					price:'600',
					unit:'条'
				},
				{
					name: '30秒（条数）：',
					value: '',
					type: 'input',
					placeholder: '¥800/条',
					price:'800',
					unit:'条'
				}
			]
		},
		{
			name: '慢剪',
			tips: '（3天出片）',
			type: 'checkbox',
			value: 'true',
			children: [
				{
					name: '粗剪：',
					value: '',
					type: 'input',
					placeholder: '¥600/条',
					tips: '注：流程素材，简单拼接（含背景音乐）',
					price: '600',
					unit:'条'
				},
				{
					name: '精剪：',
					value: '',
					type: 'input',
					placeholder: '¥1600/条',
					tips: '注：流程素材，特效拼接（含背景音乐）',
					warning: '除以上选择外，其他需求另计',
					price: '1600',
					unit: '条'
				}
			]
		}
	],
	cutGroupList:[]
}

const getters = {}

const mutations = {
	refreshCutList(state) {
		state.cutList = JSON.parse(JSON.stringify(state.cutList))
	},
	refreshCutGroupList(state,list) {
		state.cutGroupList = list
	}
}

const actions = {}

export default {
	state,
	getters,
	mutations,
	actions
}
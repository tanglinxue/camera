/*
 * @Author: your name
 * @Date: 2021-09-11 08:43:39
 * @LastEditTime: 2021-11-08 22:28:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \photo-mini\src\store\modules\shot.js
 */
const state = {
	singleList: [
		{
			name: '直播',
			tips: '（云摄影）',
			type: 'checkbox',
			value: 'true',
			children: [
				{
					name: '照片直播：',
					placeholder: '¥2500/机位',
					type: 'input',
					value: '',
					unit: '个',
					price: '2500',
					express: 's100'
				},
				{
					name: '天数：',
					type: 'select',
					price: '0',
					options: [
						{ value: '0.5', name: '0.5天', tips: '' },
						{ value: '1', name: '1天', tips: '' },
						{ value: '1.5', name: '1.5天', tips: '' },
						{ value: '2', name: '2天', tips: '' },
						{ value: '2.5', name: '2.5天', tips: '' },
						{ value: '3', name: '3天', tips: '' },
						{ value: '3.5', name: '3.5天', tips: '' },
						{ value: '4', name: '4天', tips: '' },
						{ value: '4.5', name: '4.5天', tips: '' },
						{ value: '5', name: '5天', tips: '' },
						{ value: '5.5', name: '5.5天', tips: '' },
						{ value: '6', name: '6天', tips: '' },
						{ value: '6.5', name: '6.5天', tips: '' },
						{ value: '7', name: '7天', tips: '' },
					],
					value: '',
					unit: '天',
					express: 's101'
				}
			]
		},
		{
			name: '不直播',
			tips: '（修图20张）',
			type: 'checkbox',
			value: 'true',
			children: [
				{
					name: '传统摄影：',
					placeholder: '¥1500/机位',
					type: 'input',
					price: '1500',
					value: '',
					unit: '个',
					express: 's102'
				},
				{
					name: '天数：',
					type: 'select',
					options: [
						{ value: '0.5', name: '0.5天', tips: '' },
						{ value: '1', name: '1天', tips: '' },
						{ value: '1.5', name: '1.5天', tips: '' },
						{ value: '2', name: '2天', tips: '' },
						{ value: '2.5', name: '2.5天', tips: '' },
						{ value: '3', name: '3天', tips: '' },
						{ value: '3.5', name: '3.5天', tips: '' },
						{ value: '4', name: '4天', tips: '' },
						{ value: '4.5', name: '4.5天', tips: '' },
						{ value: '5', name: '5天', tips: '' },
						{ value: '5.5', name: '5.5天', tips: '' },
						{ value: '6', name: '6天', tips: '' },
						{ value: '6.5', name: '6.5天', tips: '' },
						{ value: '7', name: '7天', tips: '' },
					],
					value: '',
					unit: '天',
					price: '0',
					express: 's103'
				}
			]
		}
	],
	groupList: [
		{
			name: '人数：',
			placeholder: '¥10/人',
			type: 'input',
			tips: '注：200人以内，按200人计费',
			value: '',
			mini_value: 200,
			unit: '人',
			price: '10'
		},
		{
			name: '冲印：',
			type: 'radio',
			value: 'true',
			unit: '',
			children: [
				{
					name: '冲印：',
					placeholder: '',
					type: 'input',
					tips: '注：50张起步，不足按50张计费，400人以上合影冲印另计',
					mini_value: 50,
					unit: '张',
					price: '0',
					express: 's200'
				},
				{
					name: '成片类型',
					type: 'select',
					value: '',
					unit: '',
					price: '0',
					options: [
						{
							value: '1',
							name: '塑封',
							tips: '¥25/张',
							price: '25'
						},
						{
							value: '2',
							name: '盒装',
							tips: '¥25/张',
							price: '25'
						},
						{
							value: '3',
							name: '其他',
							tips: '费用另计',
							price: '费用另计'
						}
					],
					express: 's201'
				}
			]
		}
	],
	singleGroupList: [],
	groupGroupList: []
}

const getters = {}

const mutations = {
	saveSingleList(state,list){
		state.singleList = list
	},
	refreshSingleList(state) {
		state.singleList = JSON.parse(JSON.stringify(state.singleList))
	},
	saveGroupList(state,list){
		state.groupList = list
	},
	refreshGroupList(state) {
		state.groupList = JSON.parse(JSON.stringify(state.groupList))
	},
	refreshSingleGroupList(state, list) {
		state.singleGroupList = list
	},
	refreshGroupGroupList(state,list){
		state.groupGroupList = list
	}
}

const actions = {}

export default {
	state,
	getters,
	mutations,
	actions
}

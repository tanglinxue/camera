/*
 * @Author: your name
 * @Date: 2021-09-11 08:43:35
 * @LastEditTime: 2021-10-12 11:12:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \photo-mini\src\store\modules\lesson.js
 */
const state = {
	lessonList: [
		{
			name: '线下录课',
			value: '',
			type: 'checkbox',
			price: 6000,
			warning: '费用组成：技术服务费6000元+录课人数费（¥200/人）',
			children: [
				{ name: '录课人数：', value: '', type: 'input', placeholder: '¥200/人',price: '200', unit:'人', tips: '注：正常每天可录制1-7人，具体以需求为准' },
				{ name: '天数：', value: '1', type: 'input', placeholder: '', tips: '注：1天按8小时，超时另计' },
				{ name: '提前一天进场：', value: '', type: 'radio',price: '200', unit:'天' }
			]
		},
		{
			name: '线上录课',
			value: '',
			type: 'checkbox',
			warning: '费用组成：技术服务费3000元+录课人数费（¥100/人）',
			price: 3000,
			children: [
				{ name: '录课人数：', value: '', type: 'input', placeholder: '¥100/人',price: '100',unit: '人', tips: '注：正常每天可录制1-7人，具体以需求为准' },
				{ name: '天数：', value: '1', type: 'input', placeholder: '',price:'0', unit:'天', tips: '注：1天按8小时，超时另计' },
			]
		},
		{
			name: '绿幕：',
			placeholder: '¥3500/天',
			value: '',
			type: 'input',
			tips: '注：包含绿幕、灯、虚拟背景系统',
			price: '3500',
			unit: '天',
		},
		{
			name: '直播服务：',
			value: '',
			type: 'radio',
			tips: '注：将成品课件进行网络直播（服务包含：直播设备、直播技术、1个并发数200人的直播间、4G聚合网络）',
			warning: '并发数：直播间同时在线观看最高人数（如需扩容，另计费）',
			children: [{
				name: '场数：1',
				value: '',
				type: 'input',
				placeholder: '¥2500/场',
				price: '2500',
				unit: '场'
			}]
		}
	],
	lessonGroupList: []
}

const getters = {}

const mutations = {
	refreshLessonList(state) {
		state.lessonList = JSON.parse(JSON.stringify(state.lessonList))
	},
	refreshLessonGroupList(state,list)
	{
		state.lessonGroupList = list
	}
}

const actions = {}

export default {
	state,
	getters,
	mutations,
	actions
}
/*
 * @Author: your name
 * @Date: 2021-09-11 08:43:45
 * @LastEditTime: 2021-11-11 00:07:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \photo-mini\src\store\modules\video.js
 */
const state = {
	meetList: [
		{
			name: '摄像：',
			type: 'groupInput',
			placeholder: '￥2500/个',
			value: '',
			groupValue: '0',
			unit: '个',
			groups: [
				{
					value: '0',
					name: '高清机(推荐)',
					valueTips: '￥1500/个',
					price: '1500',
					tips: ''
				},
				{
					value: '1',
					name: '4K机',
					valueTips: '￥1800/个',
					price: '1800'
				},
				{
					value: '2',
					name: '讯道机',
					valueTips: '￥1500/个',
					price: '1500'
				}
			]
		},
		{
			name: '技术员：',
			type: 'input',
			placeholder: '￥1000/个',
			value: '1',
			price: '1000',
			unit: '个'
		},
		{
			name: '长焦镜头：',
			type: 'input',
			placeholder: '￥1000/个',
			value: '',
			price: '1000',
			unit: '个'
		},
		{
			name: '广焦镜头：',
			type: 'input',
			placeholder: '￥3000/个',
			value: '',
			tips: '注：视频信号光缆标配100米，超出另计',
			price: '3000',
			unit: '个'
		},
		{
			name: '导播：',
			type: 'radio',
			tips: '注：2摄像以上建议加导播',
			value: 'true',
			children: [
				{
					name: '导播：',
					type: 'input',
					placeholder: '￥3500/个',
					value: '1',
					price: '3500',
					unit: '个',
					tips: '注：多画面视频信号切换（含导播台、录机、通话系统、导播师）'
				},
				{
					name: '天数：',
					placeholder: '',
					type: 'input',
					tips: '注：1天按8小时，超时另计',
					value: '1',
					unit: '天',
				},
			]
		},
		{
			name: '提前一天进场：',
			type: 'radio',
			tips: '注：非全员到场（1技术1助理1机位），费用按总价50%计',
			value: '',
			unit: '天'
		},
		{
			name: '直播服务：',
			type: 'radio',
			value: true,
			unit: '场',
			children: [
				{ name: '直播服务：', value: '1', price: '3500', unit: '场', placeholder: '￥3500/场', tips: '服务包含：直播设备、技术服务、4G聚合网络、并发200人直播间1个；', warning: '并发：直播间同时在线观看最高人数（如需扩容，另计费）' }
			]
		},
		{
			name: '连线服务：',
			type: 'radio',
			value: true,
			children: [
				{ name: '选择类型', type: 'groupButton', title: '选择连线服务类型（单选）', value: '', groups: [{ name: '基础班', value: '3500', tips: '￥3500/场', selTips: '基础版：线上流程简单，画面包装简单' }, { name: '定制版', value: '8000', tips: '￥8000/场', selTips: '线上流程复杂，画面包装定制' }] },
				{ name: '场数：', type: 'input', placeholder: '1', value: '1' }]
		},
		{
			name: '摇臂：',
			placeholder: '￥3500/个',
			type: 'input',
			value: '',
			price: '3500',
			unit: '个'
		},
		{
			name: '航拍：',
			placeholder: '￥3000/个',
			type: 'input',
			value: '',
			price: '3000',
			unit: '个'
		},
		{
			name: '斯坦尼康稳定器：',
			placeholder: '￥1500/个',
			type: 'input',
			value: '',
			price: '1500',
			unit: '个'
		},
		{
			name: '绿幕：',
			value: '',
			type: 'groupButton',
			groups: [{ name: '虚拟背景', value: 3500 }, { name: '虚拟舞台', value: 12000 }],
			price: '3500',
			unit: '场'
		},
		{
			name: '场数：',
			value: '1',
			type: 'input'
		},
		{
			name: '音控：',
			type: 'radio',
			value: 'true',
			children: [
				{
					name: '音控：',
					value: '',
					placeholder: '￥1500/个',
					type: 'input',
					price: '300',
					unit: '个'
				}
			]
		},
		{
			name: '屏控：',
			type: 'radio',
			value: '',
			tips: '注：屏幕显示画面控制，仅限现场无专业大屏搭建的项目',
			placeholder: '¥2500/场',
			price: '2500',
			unit: '场'
		},
		{
			name: '画面包装：',
			type: 'input',
			placeholder: '￥2500/个',
			value: '',
			tips: '注：人+PPT开窗、人名条、视频插播、滚屏信息等',
			price: '2500'
		},
		{
			name: '实时字幕：',
			type: 'radio',
			value: '',
			tips: '注：字幕准确率80%'
		},
		{
			name: '4G聚合网络：',
			type: 'input',
			value: '',
			placeholder: '¥1000/个',
			price: 1000,
			unit: '个'
		},
		{
			name: '便携基站网络：',
			type: 'input',
			value: '',
			placeholder: '¥8000/台',
			tips: '注：上下行带宽稳定在100M',
			price: 8000,
			unit: '个'
		}
	],
	meetGroupList: [],
	liveList: [
		{
			name: '摄像：',
			type: 'groupInput',
			placeholder: '￥2500/个',
			value: '',
			groupValue: '0',
			price: '',
			unit: '机位',
			groups: [
				{
					value: '0',
					name: '摄像：',
					valueTips: '￥2000/机位',
				},
				{
					value: '1',
					name: '高清机',
					valueTips: '￥1500/个',
				},
				{
					value: '2',
					name: '电影机',
					valueTips: '￥2000/个',
				}
			]
		},
		{
			name: '导播：',
			type: 'radio',
			value: 'true',
			warning: '注：2摄像以上建议加导播',
			children: [
				{
					name: '导播数：',
					value: '1',
					type: 'input',
					placeholder: '¥3500/个',
					tips: '注：多画面视频信号切换（含导播台、录机、通话系统、导播师）',
					price: '3500'
				},
				{
					name: '天数：',
					value: '1',
					type: 'input',
					placeholder: '',
					tips: '注：1天按8小时，超时另计'
				}
			]
		},
		{
			name: '提前一天进场：',
			value: '',
			type: 'radio',
			tips: '注：非全员到场（1技术1助理1机位），费用按总价50%计',
			unit: '天'
		},
		{
			name: '直播服务：',
			value: 'true',
			type: 'radio',
			children: [
				{
					name: '直播服务：',
					placeholder: '¥2500/场',
					value: '',
					type: 'input',
					tips: '注：各平台推流、调音台1个、收声麦3个、4G聚合网络1个',
					price: '2500',
					unit: '场'
				}
			]
		},
		{
			name: '电视：',
			type: 'input',
			value: '',
			placeholder: '¥800/台',
			tips: '注：55寸液晶电视',
			price: '800',
			unit: '台'
		},
		{
			name: '灯光：',
			type: 'input',
			value: '',
			placeholder: '¥800/组',
			tips: '注：每组2灯',
			price: '800',
			unit: '组'
		},
		{
			name: '调色：',
			type: 'input',
			value: '',
			placeholder: '¥3000/个',
			tips: '注：达芬奇调色，直播画面颜色处理',
			price: '3000',
			unit: '个'
		},
		{
			name: '绿幕：',
			type: 'input',
			value: '',
			placeholder: '¥3500/场',
			tips: '注：包含绿幕、灯、虚拟背景系统',
			price: '3500',
			unit: '场'
		},
		{
			name: '便携基站网络：',
			type: 'input',
			value: '',
			placeholder: '¥8000/台',
			tips: '注：上下行带宽稳定在100M',
			price: '8000',
			unit: '台'
		},
		{
			name: '音控：',
			type: 'input',
			value: '',
			placeholder: '¥1500/个',
			price: '1500',
			unit: '个'
		},
		{
			name: '收声麦：',
			type: 'input',
			value: '',
			placeholder: '¥300/支',
			price: '300',
			unit: '支'
		}
	],
	liveGroupList: [],
	cloudMeetList: [
		{
			name: '连线服务：',
			value: '',
			type: 'input',
			placeholder: '¥15000/场',
			tips: '注：导播、音控、画面包装、连线技术、 提前1天进场',
			price: '15000',
			unit:'场'
		},
		{
			name: '天数：',
			value: '1',
			type: 'input',
			placeholder: '',
			tips: '注：1天按8小时，超时另计'
		},
		{
			name: '宽带网络：',
			type: 'groupInput',
			value: '',
			price: '',
			unit: '个',
			groupValue:'',
			groups: [
				{ name: '4G聚合', value: 1000, selTips: '注：如需电信宽带专线，客户自行解决', valueTips:'1000/个' },
				{ name: '便携基站网络(100M)', value: 8000, selTips: '注：如需电信宽带专线，客户自行解决',valueTips:'8000/个' }
			]
		},
		{
			name: '直播服务：',
			type: 'radio',
			value: 'true',
			children: [
				{
					name: '直播服务：',
					value: '0',
					type: 'input',
					placeholder: '¥2500/场',
					tips: '服务包含：直播设备、技术服务、4G聚合网络、并发200人直播间1个;',
					warning: '并发：直播间同时在线观看最高人数（如需扩容，另计费）',
					price: 2500,
					unit:'场'
				}
			],
			price: 2500,
			unit:'场'
		},
		{
			name: '上门连线：',
			value: '',
			type: 'input',
			placeholder: '¥3500/个',
			tips: '注：连线技术服务、4G聚合网络',
			price: '3500',
			unit: '个'
		},
		{
			name: '摄像：',
			value: '',
			type: 'input',
			placeholder: '¥1500/个',
			price: '1500',
			unit: '个'
		},
		{
			name: '灯光：',
			value: '',
			type: 'input',
			placeholder: '¥800/组',
			tips: '注：每组2灯',
			price: '800',
			unit: '组'
		},
		{
			name: '电视：',
			value: '',
			type: 'input',
			placeholder: '¥800/台',
			tips: '注：55寸液晶电视',
			price: '800',
			unit: '台'
		},
		{
			name: '绿幕：',
			value: '',
			type: 'input',
			placeholder: '¥3500/场',
			tips: '注：包含绿幕、灯、虚拟背景系统',
			price: '3500',
			unit: '场'
		},
		{
			name: '音控：',
			value: '',
			type: 'input',
			placeholder: '¥1500/个',
			price: '1500',
			unit: '个'
		},
		{
			name: '屏控：',
			value: '',
			type: 'input',
			placeholder: '¥2500/个',
			price: '2500',
			unit: '个'
		}
	],
	cloudMeetGroupList:[]
}

const getters = {}

const mutations = {
	refreshMeetList(state){
		state.meetList = JSON.parse(JSON.stringify(state.meetList))
	},
	refreshMeetGroupList(state, list)
	{
		state.meetGroupList = list
	},
	refreshLiveList(state){
		state.liveList = JSON.parse(JSON.stringify(state.liveList))
	},
	refreshLiveGroupList(state, list)
	{
		state.liveGroupList = list
	},
	refreshCloudMeetList(state){
		state.cloudMeetList = JSON.parse(JSON.stringify(state.cloudMeetList))
	},
	refreshCloudMeetGroupList(state, list)
	{
		state.cloudMeetGroupList = list
	}
}

const actions = {}

export default {
	state,
	getters,
	mutations,
	actions
}

//ok
import API from '@/api'
import mutations from './service/mutations.js'
import step1 from './service/step1.js'
const service = {
	namespaced: true,
	state: {
		// 自有服务集合
		serviceInfo:{},
		// 动态服务集合
		dynamicInfo:{},
		// 选择变量
		serviceData:{
			"zp_cyzt": 4, //照片-冲印状态: 1-无  2-塑封；3-盒装；4-其他  默认
			"sp_tcjr": 1, //视频-有同传接入:1-无  2-线上  3-现场视频-实时字幕:  1-无   2-字幕   3-翻译
			"sp_sszm": 1, //视频-实时字幕:  1-无   2-字幕   3-翻译
			"spzz_djs": 1, //视频制作-倒计时:  1-无  2-通用  3-定制
			"kclz_xxxslk": 1, //课程录制-线下线上录课:  1-无  2-线下录课  3-线上录课  4-线下线上都有
			"work_day": 1 //工作天数
		}
	},
	getters:{
		step1(state){
			const serviceInfo = state.serviceInfo;
			return [
				{
					...serviceInfo['101'],
					id: 101
				},
				{
					...serviceInfo['102'],
					id: 102
				},
				{
					id: 111,
					...serviceInfo['111'],
					footer: '注：200人以内，按200人计费',
					type: 'input'
				},
				{
					id: 112,
					...serviceInfo['112'],
				},
				{
					id: 113,
					...serviceInfo['113'],
				},
				{
					id: 114,
					...serviceInfo['114'],
				}
			]
		}
	},
	actions:{
		// 读取服务接口
		async getInfo({commit}){
			const { item_info } = await API.home.getPriceByUser();
			let {case_item,dynamic_item,kclz_xxxslk,sp_sszm,sp_tcjr,spzz_djs,work_day,zp_cyzt} = item_info
			case_item = JSON.parse(case_item);
			dynamic_item = JSON.parse(dynamic_item);
			commit('updateServiceInfo',case_item);
			commit('updateDynamicInfo',dynamic_item);
			commit('updateServiceData',{kclz_xxxslk,sp_sszm,sp_tcjr,spzz_djs,work_day,zp_cyzt});
		}
	},
	mutations
}
export default service

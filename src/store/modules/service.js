
//ok
const service = {
	namespaced: true,
	state: {
		serviceInfo:{},
		dynamicInfo:'',
		serviceData:{}
	},
	getters:{
		step1(state){
			const serviceInfo = state.serviceInfo;
			return [
				{...serviceInfo['101'],id:101}, 
				{...serviceInfo['102'],id:102},
				{
					id:111,
					...serviceInfo['111'],
					footer: '注：200人以内，按200人计费',
					type: 'input'
				},
				{
					id:112,
					...serviceInfo['112'],
				},
				{
					id:113,
					...serviceInfo['113'],
				},
				{
					id:114,
					...serviceInfo['114'],
				}
			]
		}
	},
	mutations: {
		changeServiceInfo(state,serviceInfo){
			state.serviceInfo = serviceInfo
			console.log(state.serviceInfo)
		},
		changeServiceObj(state,obj){
			console.log(obj)
			const {name, unit_price, unit} = obj
			state.serviceInfo[obj.item_id] = {...state.serviceInfo[obj.item_id],name, unit_price, unit}
		},
		changeServiceData(state,obj){
			
		}
	}
}
export default service

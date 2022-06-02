
//ok
const service = {
	namespaced: true,
	state: {
		serviceInfo:{}
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
		}
	}
}
export default service

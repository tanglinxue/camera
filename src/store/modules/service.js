
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
		}
	},
	actions: {
		updateServiceInfo({commit}, serviceInfo) {
			commit('changeServiceInfo', serviceInfo)
		},
	}
}
export default service

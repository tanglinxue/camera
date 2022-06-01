import storage from '@/utils/storage';
//ok
const user = {
	namespaced: true,
	state: {
		userInfo: {},
		token: storage.getItem('token'),
	},
	mutations: {
		updateuserInfo(state, userInfo) {
			state.userInfo = userInfo
		},
		updateToken(state, token) {
			state.token = token
		},
	},
	actions: {
		updateuserInfo({commit}, userInfo) {
			commit('updateuserInfo', userInfo)
			storage.setObjItem('userInfo',userInfo)
		},
		updateToken({commit}, token) {
			commit('updateToken', token)
			storage.setItem('token',token)
		}
	}
}
export default user

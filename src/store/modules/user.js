import storage from '@/utils/storage';
//finish
const user = {
	namespaced: true,
	state: {
		userInfo: {},
		token: storage.getItem('token'),
		share:false
	},
	mutations: {
		updateuserInfo(state, userInfo) {
			state.userInfo = userInfo
		},
		updateToken(state, token) {
			state.token = token
		},
		updateShare(state,share){
			state.share = share
		}
	},
	actions: {
		// 用户信息更新
		updateuserInfo({commit}, userInfo) {
			commit('updateuserInfo', userInfo)
			storage.setObjItem('userInfo',userInfo)
		},
		// token更新
		updateToken({commit}, token) {
			commit('updateToken', token)
			storage.setItem('token',token)
		}
	}
}
export default user

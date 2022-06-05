export default {
	// 读取接口的自有服务集合
	updateServiceInfo(state, serviceInfo) {
		console.log(serviceInfo)
		state.serviceInfo = serviceInfo
	},
	// 读取接口的动态服务集合
	updateDynamicInfo(state, dynamicInfo) {
		console.log(dynamicInfo)
		state.dynamicInfo = dynamicInfo
	},
	// 读取接口的选择变量
	updateServiceData(state, serviceData) {
		console.log(serviceData)
		state.serviceData = serviceData
	},
	//修改接口的自有服务
	changeServiceObj(state, obj) {
		console.log(obj)
		const {
			name,
			unit_price,
			unit,
			item_id,
			days,
			num
		} = obj
		const serviceInfo = state.serviceInfo;
		serviceInfo[item_id] = {
			...serviceInfo[item_id],
			name,
			unit_price,
			unit,
			price: unit_price * num * days
		}
		console.log(serviceInfo[item_id])
	}
}

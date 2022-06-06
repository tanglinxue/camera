
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
		state.serviceData = serviceData
	},
	//修改接口的自有服务
	changeServiceObj(state, obj) {
		//console.log(obj)
		const {work_day} = state.serviceData
		const serviceInfo = state.serviceInfo;
		let {
			name,
			unit_price,
			unit,
			item_id,
			updateNum,
			num
		} = obj
		let days = 0;
		if(obj.updateNum){
			// 改变数量
			days = work_day
			serviceInfo[item_id] = {
				...serviceInfo[item_id],
				num,
				days,
				price: serviceInfo[item_id].unit_price * num * days
			}
		}else{
			let {num,days} = serviceInfo[item_id];
			serviceInfo[item_id] = {
				...serviceInfo[item_id],
				name,
				unit_price,
				unit,
				price: unit_price * num * days
			}
		}	
	},
	//修改接口的动态服务
	changeDynamicObj(state, obj) {
		// console.log(obj)
		const {
			name,
			unit_price,
			unit,
			item_id,
			days,
			node_id
		} = obj
		const dynamicArr = state.dynamicInfo[node_id];
		let findIndex = dynamicArr.findIndex(item=>item.id==item_id)
		const findObj = dynamicArr[findIndex]
		const num = findObj.num
		dynamicArr.splice(findIndex,1,{
			...findObj,
			name,
			unit_price,
			unit,
			price: unit_price*num
		})
	},
	// 新增动态服务项目
	addDynamicObj(state, obj){
		const {
			name,
			unit_price,
			unit,
			id,
			node_id
		} = obj
		if(!state.dynamicInfo[node_id]){
			state.dynamicInfo[node_id] = []
		}
		const dynamicArr = state.dynamicInfo[node_id]
		dynamicArr.push({
			name,
			unit_price,
			unit,
			price: 0,
			id,
			num:0
		})
		console.log(dynamicArr)
	},
	// 删除动态服务项目
	deleteDynamicObj(state, obj){
		const {
			id,
			nodeid
		} = obj
		const dynamicArr = state.dynamicInfo[nodeid]
		const findIndex = dynamicArr.findIndex(item=>item.id==id)
		dynamicArr.splice(findIndex,1)
	},
	changeStep1Index(index){
		
	}
}

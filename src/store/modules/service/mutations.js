import Vue from 'vue'
//finish
export default {
	// 读取接口的自有服务集合
	updateServiceInfo(state, serviceInfo) {
		state.serviceInfo = serviceInfo
	},
	// 读取接口的动态服务集合
	updateDynamicInfo(state, dynamicInfo) {
		state.dynamicInfo = dynamicInfo
	},
	// 读取接口的选择变量
	updateServiceData(state, serviceData) {
		state.serviceData = serviceData
	},
	//修改接口的自有服务
	changeServiceObj(state, obj) {
		const {
			serviceInfo
		} = state
		let {
			name,
			unit_price,
			unit,
			item_id,
			updateNum,
			days,
			updateDay
		} = obj;
		const serviceItem = serviceInfo[item_id];
		if (obj.updateNum) {
			// 修改的是数量
			const {
				serviceData: {
					work_day
				}
			} = state
			let {
				num
			} = obj;
			let days = 0;
			if (num > 0) {
				if (serviceItem.noDays) {
					// 不支持天数
					days = 1
				} else {
					if (num == 1) {
						days = work_day
					} else if (num > 1) {
						days = serviceItem.days
					}
				}
			}

			if (item_id == 11234 || item_id == 4034) {
				if (obj.parentId) {
					item_id = obj.parentId
				}
			}
			// 改变数量
			serviceInfo[item_id] = {
				...serviceItem,
				num,
				days,
				price: Math.floor(serviceItem.unit_price * num * days)
			}
		}else if(updateDay){
			console.log(serviceItem)
			console.log(days)
			const {unit_price,num} = serviceItem
			serviceInfo[item_id] = {
				...serviceItem,
				days,
				price: Math.floor(unit_price * num * days)
			}
		} else {
			// 修改的是服务
			let {
				num,
				days
			} = serviceItem;
			serviceInfo[item_id] = {
				...serviceItem,
				name,
				unit_price,
				unit,
				price: Math.floor(unit_price * num * days)
			}
		}
	},
	//修改接口的动态服务
	changeDynamicObj(state, obj) {
		const {
			item_id,
			node_id,
			updateNum
		} = obj

		const dynamicArr = state.dynamicInfo[node_id];
		let findIndex = dynamicArr.findIndex(item => item.id == item_id)
		const findObj = dynamicArr[findIndex]
		if (updateNum) {
			const num = obj.num;
			// 修改的是数量
			const {
				unit_price
			} = findObj
			dynamicArr.splice(findIndex, 1, {
				...findObj,
				num,
				price: Math.floor(unit_price * num)
			})
		} else {
			const {
				name,
				unit_price,
				unit
			} = obj
			const num = findObj.num
			dynamicArr.splice(findIndex, 1, {
				...findObj,
				name,
				unit_price,
				unit,
				price: Math.floor(unit_price * num)
			})
		}
	},
	// 新增动态服务项目
	addDynamicObj(state, obj) {
		const {
			name,
			unit_price,
			unit,
			id,
			node_id
		} = obj
		const dynamicArr = state.dynamicInfo[node_id];
		let params = {
			name,
			unit_price,
			unit,
			price: 0,
			id,
			num: 0,
			days: 1,
			noDays:true
		}
		if (node_id == 8) {
			params.num = 1;	
			params.noNum = true;	
			dynamicArr.push(params)
		} else {
			dynamicArr.push(params)
		}

	},
	// 删除动态服务项目
	deleteDynamicObj(state, obj) {
		const {
			id,
			nodeid
		} = obj
		const dynamicArr = state.dynamicInfo[nodeid]
		const findIndex = dynamicArr.findIndex(item => item.id == id)
		dynamicArr.splice(findIndex, 1)
	},
	changeIndex(state, {
		id,
		index,
		type,
		arr,
		needAdd
	}) {
		const {
			serviceInfo
		} = state;
		console.log(id)
		state.serviceData[type] = index
		for (let key of arr) {
			let num = 0;
			let days = 0;
			const {unit_price} = serviceInfo[key]
			if (needAdd && key == id) {
				num = 1;
				days = 1		
			}
			serviceInfo[key] = {
				...serviceInfo[key],
				num,
				days,
				price:Math.floor(unit_price*num*days)
			}
		}
	},
	changeStep5Index(state, type) {
		const {
			serviceInfo,
			serviceData: {
				kclz_xxxslk
			}
		} = state;
		let setName = 0;
		if (kclz_xxxslk == 1) {
			if (type == 'up') {
				setName = 3
			} else {
				setName = 2
			}
		} else if (kclz_xxxslk == 2) {
			if (type == 'up') {
				setName = 4
			} else {
				setName = 1
			}
		} else if (kclz_xxxslk == 3) {
			if (type == 'up') {
				setName = 1
			} else {
				setName = 4
			}
		} else if (kclz_xxxslk == 4) {
			if (type == 'up') {
				setName = 2
			} else {
				setName = 3
			}
		}
		if (setName == 2 || setName == 4) {
			setSeviceInfo('501', 1, 1)
		} else {
			setSeviceInfo('501', 0, 0)
		}
		if (setName == 1 || setName == 3) {
			setSeviceInfo('511', 1, 1)
		} else {
			setSeviceInfo('511', 0, 0)
		}

		function setSeviceInfo(key, num, days) {
			const {unit_price} = serviceInfo[key]
			serviceInfo[key] = {
				...serviceInfo[key],
				num,
				days,
				price:Math.floor(unit_price*num*days)
			}
		}
		state.serviceData.kclz_xxxslk = setName
	}
}

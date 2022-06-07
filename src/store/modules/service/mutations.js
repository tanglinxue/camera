import Vue from 'vue'
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
		console.log(num)	
		let days = 0;
		if(obj.updateNum){
			if(item_id==11234){
				if(obj.parentId){
					item_id = obj.parentId
				}else{
					return serviceInfo[item_id] = {
						...serviceInfo[item_id],
						num
					}
				}
			}
			if(item_id==4034){
				if(obj.parentId){
					item_id = obj.parentId
				}else{
					return serviceInfo[item_id] = {
						...serviceInfo[item_id],
						num
					}
				}
			}
			// 改变数量
			days = work_day
			serviceInfo[item_id] = {
				...serviceInfo[item_id],
				num,
				days,
				price: serviceInfo[item_id].unit_price * num * days
			}
			console.log(serviceInfo[item_id])
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
		console.log(serviceInfo[item_id])
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
	changeStep1Index(state,{id,index}){
		const {serviceInfo} = state;
		state.serviceData.zp_cyzt=index
		let arr = ['112','113','114']
		for(let key of arr){
			serviceInfo[key]={
				...serviceInfo[key],
				num:0,
				days:0
			}
		}
	},
	changeStep4Index(state,{id,index}){
		const {serviceInfo} = state;
		state.serviceData.spzz_djs=index
		console.log(id)
		let arr = ['403','404']
		for(let key of arr){
			serviceInfo[key]={
				...serviceInfo[key],
				num:0,
				days:0
			}
		}
	},
	changeStep5Index(state,type){
		const {serviceInfo,serviceData:{kclz_xxxslk}} = state;
		let setName = 0
		if(type=='up'){
			// 线上
			if(kclz_xxxslk==1){
				setName=3
			}else if(kclz_xxxslk==2){
				setName=4
			}else if(kclz_xxxslk==3){
				setName=1
			}else if(kclz_xxxslk==4){
				setName=2
			}
		}else if(type='down'){
			//线下
			if(kclz_xxxslk==1){
				setName=2
			}else if(kclz_xxxslk==2){
				setName=1
			}else if(kclz_xxxslk==3){
				setName=4
			}else if(kclz_xxxslk==4){
				setName=3
			}
		}
		if(setName==1){
			serviceInfo[501]={
				...serviceInfo[501],
				num:0,
				days:0
			}
			serviceInfo[511]={
				...serviceInfo[501],
				num:0,
				days:0
			}
		}else if(setName==2){
			// 线下打开
			serviceInfo[501]={
				...serviceInfo[501],
				num:1,
				days:1
			}
			serviceInfo[511]={
				...serviceInfo[501],
				num:0,
				days:0
			}
		}else if(setName==3){
			// 线上打开
			serviceInfo[511]={
				...serviceInfo[511],
				num:1,
				days:1
			}
			serviceInfo[501]={
				...serviceInfo[501],
				num:0,
				days:0
			}
		}else if(setName==4){
			// 线下打开
			serviceInfo[501]={
				...serviceInfo[501],
				num:1,
				days:1
			}
			// 线上打开
			serviceInfo[511]={
				...serviceInfo[511],
				num:1,
				days:1
			}
		}

		state.serviceData.kclz_xxxslk=setName
	}
}

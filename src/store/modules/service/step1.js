// 照片类固定
export const step1 = (state) => {
	const {serviceInfo,serviceData:{zp_cyzt}} = state;
	if(!Object.keys(serviceInfo).length){
		return []
	}
	let obj = {
		num:0
	}
	if(zp_cyzt==2){
		obj = {
			id: 112,
			...serviceInfo['112'],
		}
	}else if(zp_cyzt==3){
		obj = {
			id: 113,
			...serviceInfo['112'],
		}
	}else if(zp_cyzt==4){
		obj = {
			id: 114,
			...serviceInfo['112'],
		}
	}
	const printItem ={
		name: '冲印：（张数）',
		footer: '注：50张起步，不足按50张计费，400人以上合影冲印另计',
		type: 'input',
		hidePrice: true,
		parentId:11234,
		num:obj.num,
	}
	return [
		{
			...serviceInfo['101'],
			id: 101,
			type:'normal'
		},
		{
			...serviceInfo['102'],
			id: 102,
			type:'normal'
		},
		{
			id: 111,
			...serviceInfo['111'],
			footer: '注：200人以内，按200人计费',
			type: 'input'
		},
		printItem,
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

export const step1Select = (state, getter)=>{
	const step1 = getter.step1;
	const selectArr = step1.filter(item=>item.type=='normal' && item.num)
	return selectArr
}


// 照片类动态
export const staticStep1 = (state) => {
	const {dynamicInfo} = state;
	if(dynamicInfo[1]){
		return dynamicInfo[1]
	}else{
		return []
	}
}

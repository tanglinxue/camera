// 照片类固定
export const step1 = (state) => {
	const {serviceInfo,serviceData:{zp_cyzt}} = state;
	if(!Object.keys(serviceInfo).length){
		return []
	}
	const printItem ={
		name: '冲印：（张数）',
		footer: '注：50张起步，不足按50张计费，400人以上合影冲印另计',
		type: 'input',
		hidePrice: true,
		id:11234,
		num:zp_cyzt==1?0:serviceInfo['11'+zp_cyzt].num,
		parentId:zp_cyzt==1?'':('11'+zp_cyzt)*1
	}
	return [
		{
			...serviceInfo['101'],
			id: 101,
			needPrice:true
		},
		{
			...serviceInfo['102'],
			id: 102,
			needPrice:true
		},
		{
			id: 111,
			...serviceInfo['111'],
			footer: '注：200人以内，按200人计费',
			type: 'input',
			needPrice:true
		},
		printItem,
		{
			id: 112,
			...serviceInfo['112'],
			needPrice:true
		},
		{
			id: 113,
			...serviceInfo['113'],
			needPrice:true
		},
		{
			id: 114,
			...serviceInfo['114'],
			needPrice:true
		}
	]
}

export const step1Select = (state, getter)=>{
	const step1 = getter.step1;
	const selectArr = step1.filter(item=>item.needPrice && item.num)
	return selectArr
}
export const step1Price = (state,getter)=>{
	const step1 = getter.step1;
	let arr = step1.slice(0,2).filter(item=>item.needPrice && item.num)
	let price = arr.reduce((total,item)=>total+item.price,0)
	return price
}
export const step1Price2 = (state,getter)=>{
	const step1 = getter.step1;
	let arr = step1.slice(2).filter(item=>item.needPrice && item.num)
	let price = arr.reduce((total,item)=>total+item.price,0)
	return price
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

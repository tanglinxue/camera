// 照片类固定
//finish
export const step1 = (state) => {
	const {serviceInfo,serviceData:{zp_cyzt}} = state;
	if(!Object.keys(serviceInfo).length){
		return []
	}
	let num = 0;
	let parentId = '';
	if(zp_cyzt>1){
		num = serviceInfo['11'+zp_cyzt].num;
		parentId = ('11'+zp_cyzt)*1
	}
	const printItem ={
		name: '冲印：（张数）',
		footer: '注：50张起步，不足按50张计费，400人以上合影冲印另计',
		type: 'input',
		hidePrice: true,
		id:11234,
		num,
		parentId,
		noDays:true,
		noAddPrice:true
	}
	function getBeforeName(key){
		return `冲印：(${serviceInfo[key].name})`
	}
	return [
		{
			...serviceInfo['101'],
			id: 101	
		},
		{
			...serviceInfo['102'],
			id: 102
		},
		{
			id: 111,
			...serviceInfo['111'],
			footer: '注：200人以内，按200人计费',
			type: 'input',
			noDays:true
		},
		printItem,
		{
			id: 112,
			...serviceInfo['112'],
			noDays:true,
			beforeName:getBeforeName('112')
		},
		{
			id: 113,
			...serviceInfo['113'],
			noDays:true,
			beforeName:getBeforeName('113')
		},
		{
			id: 114,
			...serviceInfo['114'],
			beforeName:getBeforeName('114')
		}
	]
}

// 获取数量
export const step1SelectNum = (state, getter)=>{
	const step1 = getter.step1;
	return step1.filter(item=>!item.noAddPrice && item.num).length
}

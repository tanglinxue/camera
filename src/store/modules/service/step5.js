// 视频制作类固定
export const step5 = (state) => {
	const {
		serviceInfo,
		serviceData:{spzz_djs}
	} = state;
	if (!Object.keys(serviceInfo).length) {
		return []
	}
	return [
		{ ...serviceInfo['501'], id: 501,type:'noNum',needPrice: true}, 
		{ ...serviceInfo['502'], id: 502,footer: '注：正常每天可录制1-7人，具体以需求为准',needPrice: true },
		{ ...serviceInfo['511'], id: 511,type:'noNum',needPrice: true }, 
		{ ...serviceInfo['512'], id: 512,footer: '注：正常每天可录制1-7人，具体以需求为准',needPrice: true}
	]
}
export const step5Select = (state, getter) => {
	const step5 = getter.step5;
	const selectArr = step5.filter(item => item.needPrice && item.num)
	return selectArr
}

export const step5Price = (state, getter) => {
	const step5 = getter.step5;
	let arr = step5.filter(item => item.needPrice && item.num)
	let price = arr.reduce((total, item) => total + item.price, 0)
	return price
}
// 照片类动态
export const staticStep5 = (state) => {
	const {dynamicInfo} = state;
	if(dynamicInfo[5]){
		return dynamicInfo[5]
	}else{
		return []
	}
}

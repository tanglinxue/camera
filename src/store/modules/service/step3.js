// 剪辑类固定
export const step3 = (state) => {
	const {
		serviceInfo
	} = state;
	if (!Object.keys(serviceInfo).length) {
		return []
	}
	return [{
			...serviceInfo['301'],
			id: 301,
			needPrice: true
		},
		{
			...serviceInfo['302'],
			id: 302,
			needPrice: true
		},
		{
			...serviceInfo['311'],
			id: 311,
			needPrice: true
		},
		{
			...serviceInfo['312'],
			id: 312,
			needPrice: true
		},
		{
			...serviceInfo['321'],
			id: 321,
			footer: '注：流程素材，简单拼接（含背景音乐）',
			needPrice: true
		},
		{
			...serviceInfo['322'],
			id: 322,
			footer: '注：流程素材，特效拼接（含背景音乐）',
			needPrice: true
		},
	]
}
export const step3Select = (state, getter) => {
	const step3 = getter.step3;
	const selectArr = step3.filter(item => item.needPrice && item.num)
	return selectArr
}

export const step3Price = (state, getter) => {
	const step3 = getter.step3;
	let arr = step3.filter(item => item.needPrice && item.num)
	let price = arr.reduce((total, item) => total + item.price, 0)
	return price
}
// 剪辑类动态
export const staticStep3 = (state) => {
	const {
		dynamicInfo
	} = state;
	if (dynamicInfo[3]) {
		return dynamicInfo[3]
	} else {
		return []
	}
}

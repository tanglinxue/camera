// 视频制作类固定
export const step4 = (state) => {
	const {
		serviceInfo,
		serviceData:{spzz_djs}
	} = state;
	if (!Object.keys(serviceInfo).length) {
		return []
	}
	return [{
			...serviceInfo['401'],
			id: 401,
			needPrice: true
		},
		{
			...serviceInfo['402'],
			id: 402,
			needPrice: true
		},
		{
			...serviceInfo['403'],
			id: 403,
			needPrice: true
		},
		{
			...serviceInfo['404'],
			id: 404,
			needPrice: true
		},
		{
			...serviceInfo['405'],
			id: 405,
			needPrice: true
		},
		{
			...serviceInfo['406'],
			id: 406,
			footer: '注：访谈视频、素材剪辑、特效视频、短片拍摄等',
			needPrice: true
		},
		{
			name: '数量',
			hidePrice: true,
			num:spzz_djs==1?0:spzz_djs==2?serviceInfo['403'].num:serviceInfo['404'].num,
			parentId:spzz_djs==1?'':spzz_djs==2?403:404,
			id:4034,
		}
	]
}
export const step4Select = (state, getter) => {
	const step4 = getter.step4;
	const selectArr = step4.filter(item => item.needPrice && item.num)
	return selectArr
}

export const step4Price = (state, getter) => {
	const step4 = getter.step4;
	let arr = step4.filter(item => item.needPrice && item.num)
	let price = arr.reduce((total, item) => total + item.price, 0)
	return price
}
// 照片类动态
export const staticStep4 = (state) => {
	const {
		dynamicInfo
	} = state;
	if (dynamicInfo[4]) {
		return dynamicInfo[4]
	} else {
		return []
	}
}

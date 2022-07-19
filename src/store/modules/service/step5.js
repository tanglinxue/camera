// 视频制作类固定
//finish
export const step5 = (state) => {
	const {
		serviceInfo
	} = state;
	if (!Object.keys(serviceInfo).length) {
		return []
	}

	function getBeforeName(type, key) {
		return `${type}(${serviceInfo[key].name})`
	}
	return [
		{
			...serviceInfo['501'],
			id: 501,
			beforeName: getBeforeName('线下录课', '501'),
			noNum: true,
		},
		{
			...serviceInfo['502'],
			id: 502,
			footer: '注：正常每天可录制1-7人，具体以需求为准'
		},
		{
			...serviceInfo['503'],
			id: 503,
			noNum: true,
			noDays: true,
		},
		{
			...serviceInfo['511'],
			id: 511,
			beforeName: getBeforeName('线上录课', '511'),
			noNum: true,
		},
		{
			...serviceInfo['512'],
			id: 512,
			footer: '注：正常每天可录制1-7人，具体以需求为准'
		}
	]
}

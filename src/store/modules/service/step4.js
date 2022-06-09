// 视频制作类固定
//finish
export const step4 = (state) => {
	const {
		serviceInfo,
		serviceData: {
			spzz_djs
		}
	} = state;
	if (!Object.keys(serviceInfo).length) {
		return []
	}
	function getBeforeName(key){
		return `倒计时(${serviceInfo[key].name})`
	}
	let num = 0;
	let parentId = '';
	if(spzz_djs==2){
		num = serviceInfo['403'].num
		parentId = 403
	}else if(spzz_djs==3){
		num = serviceInfo['404'].num
		parentId = 404
	}
	return [{
			...serviceInfo['401'],
			id: 401,
			needPrice: true,
			noDays: true
		},
		{
			...serviceInfo['402'],
			id: 402,
			needPrice: true,
			noDays: true
		},
		{
			...serviceInfo['403'],
			id: 403,
			needPrice: true,
			beforeName:getBeforeName('403'),
			noDays: true

		},
		{
			...serviceInfo['404'],
			id: 404,
			needPrice: true,
			beforeName:getBeforeName('404'),
			noDays: true
		},
		{
			...serviceInfo['405'],
			id: 405,
			needPrice: true,
			noDays: true
		},
		{
			...serviceInfo['406'],
			id: 406,
			footer: '注：访谈视频、素材剪辑、特效视频、短片拍摄等',
			needPrice: true,
			noDays: true
		},
		{
			name: '数量',
			hidePrice: true,
			num,
			parentId,
			id: 4034,
			noDays:true
		}
	]
}

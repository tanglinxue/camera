// 剪辑类固定
//finish
export const step3 = (state) => {
	const {
		serviceInfo
	} = state;
	if (!Object.keys(serviceInfo).length) {
		return []
	}
	function getBeforeName(type,key){
		return `${type}(${serviceInfo[key].name})`
	}
	return [
		{
			...serviceInfo['301'],
			id: 301
		},
		{
			...serviceInfo['302'],
			id: 302
		},
		{
			...serviceInfo['311'],
			id: 311,
			noDays:true,
			beforeName:getBeforeName('快剪','311'),
		},
		{
			...serviceInfo['312'],
			id: 312,
			noDays:true,
			beforeName:getBeforeName('快剪','312'),
		},
		{
			...serviceInfo['321'],
			id: 321,
			footer: '注：流程素材，简单拼接（含背景音乐）',
			noDays:true,
			beforeName:getBeforeName('慢剪','321'),  		
		},
		{
			...serviceInfo['322'],
			id: 322,
			footer: '注：流程素材，特效拼接（含背景音乐）',
			noDays:true,
			beforeName:getBeforeName('慢剪','322'),
		},
	]
}
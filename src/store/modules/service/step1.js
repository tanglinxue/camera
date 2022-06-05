export default (state) => {
	console.log(state)
	const serviceInfo = state.serviceInfo;
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
			type: 'input'
		},
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

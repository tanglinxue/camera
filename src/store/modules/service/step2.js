// 视频类固定
//finish
export const step2 = (state) => {
	const {
		serviceInfo
	} = state;
	if (!Object.keys(serviceInfo).length) {
		return []
	}
	return [
		{
			...serviceInfo['201'],
			id: 201
		},
		{
			...serviceInfo['202'],
			id: 202,
			footer: '注：多画面视频信号切换(含导播台、录机、通话系统、导播师)'
		},
		{
			...serviceInfo['203'],
			id: 203,
			placeholder: '￥3500/场',
			footer: '服务包含：直播设备、技术服务、并发200人直播间1个；',
			warn: '并发:直播间同时在线观看最高人数(如需扩容，另计费)'
		},
		{
			...serviceInfo['204'],
			id: 204
		},
		{
			...serviceInfo['205'],
			id: 205
		},
		{
			...serviceInfo['206'],
			id: 206
		},
		{
			...serviceInfo['207'],
			id: 207
		},
		{
			...serviceInfo['208'],
			id: 208
		},

		{
			...serviceInfo['221'],
			id: 221
		},
		{
			...serviceInfo['222'],
			id: 222
		},
		{
			...serviceInfo['223'],
			id: 223
		},
		{
			...serviceInfo['224'],
			id: 224,
			footer: '注：人+PPT开窗、人名条、视频插播、滚屏信息等'
		},
		{
			...serviceInfo['225'],
			id: 225
		},
		{
			...serviceInfo['226'],
			id: 226
		},
		{
			...serviceInfo['227'],
			id: 227,
			footer: '注：上下行带宽稳定在100M'
		},
		{
			...serviceInfo['228'],
			id: 228
		},
		{
			...serviceInfo['229'],
			id: 229
		},
		{
			...serviceInfo['230'],
			id: 230
		},
		{
			...serviceInfo['231'],
			id: 231
		},
		{
			...serviceInfo['232'],
			id: 232,
			footer: '注：大屏画面切换(含大屏切换、画面调度两名技术员)'
		},
		{
			...serviceInfo['233'],
			id: 233
		},
		{
			...serviceInfo['234'],
			id: 234
		},
		{
			id: null,
			noAddPrice:true
		},
		{
			...serviceInfo['235'],
			id: 235,
			footer: '注：摄像1个、连接技术服务'
		},
		{
			...serviceInfo['236'],
			id: 236
		},
		{
			...serviceInfo['237'],
			id: 237,
			footer: '注：电视、支架、线材、装运(2台起送)'
		}
	]
}
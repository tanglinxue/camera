// 视频类固定
//finish
export const step2 = (state) => {
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
			...serviceInfo['201'],//摄像
			id: 201
		},
		{
			...serviceInfo['202'],//导播
			id: 202,
			footer: '注：多画面视频信号切换(含导播台、录机、通话系统、导播师)'
		},
		{
			...serviceInfo['203'],//直播服务
			id: 203,
			placeholder: '￥3500/场',
			footer: '服务包含：直播设备、技术服务、并发200人直播间1个；',
			warn: '并发:直播间同时在线观看最高人数(如需扩容，另计费)',
      noDays:true,
		},
		{
			...serviceInfo['204'],//连线服务基础
			id: 204,
      noDays:true,
		},
		{
			...serviceInfo['205'],//连线服务定制
			id: 205,
      noDays:true,
		},
		{
			...serviceInfo['206'],//线上
			id: 206,
      noDays:true,
      noNum:true,
	   beforeName:getBeforeName('有同传接入','206'),
		},
		{
			...serviceInfo['207'],//现场
			id: 207,
      noDays:true,
      noNum:true,
	   beforeName:getBeforeName('有同传接入','207'),
	  
		},
		{
			...serviceInfo['208'],//提前一天进场
			id: 208,
      noDays:true,
      noNum:true
		},

		{
			...serviceInfo['221'],//技术统筹
			id: 221,
      noDays:true,
		},
		{
			...serviceInfo['222'],//摇臂
			id: 222
		},
		{
			...serviceInfo['223'],//航拍
			id: 223
		},
		{
			...serviceInfo['224'],//画面包装
			id: 224,
			footer: '注：人+PPT开窗、人名条、视频插播、滚屏信息等',
      noDays:true,
		},
		{
			...serviceInfo['225'],//调色
			id: 225,
      noDays:true,
		},
		{
			...serviceInfo['226'],//4g聚合网络
			id: 226
		},
		{
			...serviceInfo['227'],//便携基站网络
			id: 227,
			footer: '注：上下行带宽稳定在100M'
		},
		{
			...serviceInfo['228'],//虚拟背景
			id: 228,
      noDays:true,
		},
		{
			...serviceInfo['229'],//虚拟舞台
			id: 229,
      noDays:true,
		},
		{
			...serviceInfo['230'],//音控
			id: 230
		},
		{
			...serviceInfo['231'],//收声麦
			id: 231,
      noDays:true,
		},
		{
			...serviceInfo['232'],//屏控
			id: 232,
			footer: '注：大屏画面切换(含大屏切换、画面调度两名技术员)',
      noDays:true,
		},
		{
			...serviceInfo['233'],//字幕
			id: 233,
      noDays:true,
      noNum:true,
	  beforeName:getBeforeName('实时字幕','233'),
		},
		{
			...serviceInfo['234'],//翻译
			id: 234,
      noDays:true,
      noNum:true,
	  beforeName:getBeforeName('实时字幕','234'),
		},
		{
			id: null,
			noAddPrice:true
		},
		{
			...serviceInfo['235'],//上门连线
			id: 235,
			footer: '注：摄像1个、连接技术服务',
      noDays:true,
		},
		{
			...serviceInfo['236'],//灯光
			id: 236
		},
		{
			...serviceInfo['237'],//55寸电视
			id: 237,
			footer: '注：电视、支架、线材、装运(2台起送)'
		}
	]
}

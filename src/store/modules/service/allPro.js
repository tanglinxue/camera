//finish
export const allPro = (state, getter) => {
	const {
		step1,
		step2,
		step3,
		step4,
		step5,
		dynamicInfo
	} = getter;
	const list11 = getArr(step1.slice(0, 2))
	const price11 = getPrice(list11)
	const list12 = getArr(step1.slice(2))
	const price12 = getPrice(list12)
	const list13 = getArr(dynamicInfo[1])
	const price13 = getPrice(list13)
	const list2 = getArr(step2.concat(getDynamicInfoArr(dynamicInfo[2])))
	const price2 = getPrice(list2)
	const list3 = getArr(step3.concat(getDynamicInfoArr(dynamicInfo[3])))
	const price3 = getPrice(list3)
	const list4 = getArr(step4.concat(getDynamicInfoArr(dynamicInfo[4])))
	const price4 = getPrice(list4)
	const list5 = getArr(step5.concat(getDynamicInfoArr(dynamicInfo[5])))
	const price5 = getPrice(list5)
	const list6 = getArr(getDynamicInfoArr(dynamicInfo[8]))
	const price6 = getPrice(list6)
	return [{
			name: '照片 - 摄影',
			price: price11,
			list: list11
		},
		{
			name: '照片 - 站架合影',
			price: price12,
			list: list12
		},
		{
			name: '照片 - 其他',
			price: price13,
			list: list13
		},
		{
			name: '视频',
			price: price2,
			list: list2
		},
		{
			name: '剪辑',
			price: price3,
			list: list3
		},
		{
			name: '视频制作',
			price: price4,
			list: list4
		},
		{
			name: '课程录制',
			price: price5,
			list: list5
		},
		{
			name: '其他项目',
			price: price6,
			list: list6
		}
	]
}
export const inerAllPro = (state,getter) => {
	return getter.allPro.filter(item=>item.name!='其他项目')
}
export const dynamicInfo = (state) => {
	const {
		dynamicInfo
	} = state;
	if (!Object.keys(dynamicInfo).length) {
		return {}
	}
	for (let key in dynamicInfo) {
		dynamicInfo[key] = dynamicInfo[key].map(item => {
			item.noDays = true
			item.node_id = key
			return item
		})
	}
	console.log('arr' + JSON.stringify(dynamicInfo))
	return dynamicInfo
}
export const iner_money = (state, getter)=> { //总价
	if(!getter.inerAllPro.length) return 0
	return getter.inerAllPro.reduce((total, item) => total + item.price, 0)
}
export const total_money = (state, getter)=> { //总价
if(!getter.allPro.length) return 0
	return getter.allPro.reduce((total, item) => total + item.price, 0)
}

function getArr(arr = []) {
	return arr.filter(item => !item.noAddPrice && item.num)
}

function getPrice(arr) {
	return arr.reduce((total, item) => total + item.price, 0)
}

function getDynamicInfoArr(arr = []) {
	return arr
}

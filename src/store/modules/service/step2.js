// 照片类动态
export const staticStep2 = (state) => {
	const {dynamicInfo} = state;
	if(dynamicInfo[2]){
		return dynamicInfo[2]
	}else{
		return []
	}
}

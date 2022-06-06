// 照片类动态
export const staticStep5 = (state) => {
	const {dynamicInfo} = state;
	if(dynamicInfo[5]){
		return dynamicInfo[5]
	}else{
		return []
	}
}

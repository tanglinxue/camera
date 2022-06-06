// 照片类动态
export const staticStep4 = (state) => {
	const {dynamicInfo} = state;
	if(dynamicInfo[4]){
		return dynamicInfo[4]
	}else{
		return []
	}
}

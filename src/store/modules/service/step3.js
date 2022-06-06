// 照片类动态
export const staticStep3 = (state) => {
	const {dynamicInfo} = state;
	if(dynamicInfo[3]){
		return dynamicInfo[3]
	}else{
		return []
	}
}

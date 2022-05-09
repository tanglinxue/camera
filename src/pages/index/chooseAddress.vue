<template>
	<div class="map-box">
		<iframe class="mapPage" width="100%" height="100%" frameborder="0" :src="iframeUrl"></iframe>
	</div>
</template>
<script>
export default {
	props: {},
	data() {
		return {
			iframeUrl: '',
			address: {}
		};
	},
	computed: {},
	async mounted() {
		const {lat,lng} = await this.$methods.getLocationH5();
		this.iframeUrl = `
					https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=4U4BZ-VP3KU-W5TVC-BFILJ-JPWYE-GNBX2&referer=附加的地址&coord=${lat},${lng}
				`;
		window.addEventListener('message', this.getLocation, false);
	},
	methods: {
		getLocation(event) {
			var loc = event.data;
			if (loc && loc.module == 'locationPicker') {
			console.log(loc)
				this.$methods.prePage().loc=loc
uni.navigateBack();
			}
		}
	},
	beforeDestroy() {
		window.removeEventListener('message', this.getLocation);
	}
};
</script>
<style scoped lang="scss">

.mapPage {
	height: 100vh;
}
</style>

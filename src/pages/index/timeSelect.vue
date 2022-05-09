按<template>
	<view class="main column-center">
		<view class="navbar row-between">
			<view v-for="(item, index) in navList" :key="index" class="nav-item row-center"
				:class="{ current: tabCurrentIndex === index }" @click="tabClick(index)">
				{{ item.text }}{{$methods.getDate(index,2)}}
			</view>
		</view>
		<view class="list">
			<view class='row-start wrap tagbox'>
				<view class='tag column-center canclick' v-for='(item,index) in timeArr[tabCurrentIndex]' :key='index'
					:class='{active:item.selected}' @click='selectTag(item,index)'>
					<view>{{item.name}}</view>
				</view>
			</view>
		</view>
		<view class="bottom-box row-between">
			<view class="main-btn left-btn" @click='submit'>立即保存</view>
			<view class="main-btn orange-btn" @click='selectAll(checkAll?false:true)'>{{checkAll?"全不选":"全选"}}</view>
		</view>
	</view>
</template>

<script>
	//ok
	export default {
		data() {
			return {
				selectIndex: [
					[],
					[],
					[]
				],
				tabCurrentIndex: 0,
				navList: [{
						state: 0,
						text: '今天'
					},
					{
						state: 1,
						text: '明天',
					},
					{
						state: 2,
						text: '后天',
					}
				],
				timeArr: [
					[],
					[],
					[]
				],
				selectlist: [],
				tech_time:[],
				current_time:''
			}
		},
		onLoad() {
			this.getData();	
		},
		computed:{

			checkAll(){
				const {timeArr,tabCurrentIndex} = this
				return timeArr[tabCurrentIndex].filter(item=>item.selected).length === timeArr[tabCurrentIndex].length
			}
		},
		methods: {
			async getData(){
				this.$methods.showLoading();
				const {tech_time,server_time}=await this.$API.home.tech_time({
					ids: 47
				});
				this.tech_time = tech_time;
				this.current_time = server_time
				this.getTimeArr()
				uni.hideLoading()	
			},
			async submit(){
				const {timeArr} = this; 
				let thedatetime = this.timeArr.map((item,index)=>{
					console.log(item)
					if(index == 0 && !item.length){
						return {
							thedate:this.$methods.getDate(index),
							thetime:item.filter(bitem=>bitem.selected).map(citem=>citem.index).join(',')
						}
					}
					return {
						thedate:item[0].date,
						thetime:item.filter(bitem=>bitem.selected).map(citem=>citem.index).join(',')
					}
				})
				try{
					this.$methods.showLoading('保存中')
					const res = await this.$API.home.updata_time({
						ids:47,
						thedatetime:JSON.stringify(thedatetime)
					})
					this.$methods.showToast(`保存成功`);
					setTimeout(() => {
						uni.navigateBack();
					}, 1500)
				}catch(err){
					console.log(err)
				}
			},
			tabClick(index) {
				this.tabCurrentIndex = index
			},
			selectTag(item, index) {
				if (!item.selected) {
					this.$set(item, 'selected', true)
				} else {
					this.$set(item, 'selected', false)
				}
			},
			selectAll(type){
				const {timeArr,tabCurrentIndex} = this
				timeArr[tabCurrentIndex].forEach(item=>this.$set(item, 'selected', type))
			},
			getTimeArr() {
				let technician_time = this.tech_time.slice();
				let timeArr = []
				for (let i = 0; i < 3; i++) {
					const time = this.$methods.getDate(i)
					const filterItem = technician_time.find(item => item.thedate == time)
					if (filterItem) {
						timeArr.push({
							...filterItem,
							time
						})
					} else {
						timeArr.push({
							thetime: '',
							time
						})
					}
				}
				this.timeArr = timeArr.map((item, index) => {
					let text = '今天'
					if (index == 1) {
						text = '明天'
					} else if (index == 2) {
						text = '后天'
					}
					let arr = []
					const selectArr = item.thetime.split(',')
					for (let i = 0; i < 48; i++) {
						let name = Math.floor(i / 2) + ":" + (i % 2 == 0 ? "00" : "30")
						if (index == 0 && (this.$methods.getTime(name) < parseInt(this.current_time))) {
							continue
						}
						arr.push({
							selected: selectArr.includes((i + 1).toString()) ? true : false,
							name,
							text,
							index:i+1,
							date:this.$methods.getDate(index)
						})
					}
					return arr
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/scss/index.scss';
	.main {
		padding-bottom: 150rpx;
		padding-top:140rpx;
		.navbar {
			width: 100%;
			padding: 30rpx 20rpx 60rpx;
			background: #fff;
			position: fixed;
			left: 0;
			top:45px;
			z-index:99999;
			// #ifdef APP-PLUS
			top: 0;
			// #endif  
			.nav-item {
				flex: 1;
				height: 100%;
				font-size: 28rpx;
				position: relative;

				&.current {
					color: $greenColor;

					&:after {
						content: '';
						position: absolute;
						left: 50%;
						bottom: -30rpx;
						transform: translateX(-50%);
						width: 146rpx;
						height: 0;
						border-bottom: 6rpx solid $greenColor;
					}
				}
			}
		}

		.list {
			width: 100%;
			overflow: hidden;

			.tagbox {
				padding: 24rpx 15rpx 0;

				.tag {
					width: 160rpx;
					height: 68rpx;
					text-align: center;
					border-radius: 8rpx;
					color: $gray;
					font-size: 22rpx;
					background: #ededed;
					margin: 0 10rpx 20rpx;

					&.canclick {
						border: 2rpx solid $greenColor;
						color: $greenColor;
						background: none;
						font-size: 26rpx
					}

					&.active {
						border: none;
						background: $greenColor;
						color: #fff
					}
				}
			}

		}
		
		.bottom-box {
			width: 100%;
			position: fixed;
			padding: 20rpx;
			bottom: 0;
			left: 0;
			background-color: #f7f7f7;
			.left-btn{
				width:500rpx;
			}
			.orange-btn{
				width:190rpx;
				background: $orange;
			}
		}
		
	}
</style>

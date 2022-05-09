import CIcon from '@/components/c-icons/uni-icons.vue'
import {
	mapState
} from 'vuex';
export default {
	components: {
		CIcon
	},
	filters: {
		pay_way_name(pay_way) {
			switch (pay_way * 1) {
				case 0:
					return '微信支付';
				case 1:
					return '支付宝支付';
				case 2:
					return '余额支付';
				case 3:
					return '三方支付';
			}
		},
		levelName(name) {
			switch (name * 1) {
				case 0:
					return '正常';
				case 1:
					return '1级';
				case 2:
					return '2级';
				case 3:
					return '3级';
			}
		}
	},
	computed: {
		...mapState('user', ['useInfo']),
		useraddress() {
			if (!this.detail.useraddress) return {}
			return JSON.parse(this.detail.useraddress)
		},
		progressListFinay() {
			let {
				progressList,
				step,
				detail
			} = this;
			const {
				accepttime,
				gotime,
				arrivetime,
				stime,
				etime
			} = detail;

			let arr = [accepttime, gotime, arrivetime, stime, etime]
			console.log(arr)
			return progressList.map((item, index) => {
				if (index <= step) {
					item.time = arr[index]
				}
				return item
			})
		},
		order_status() {
			return this.detail.order_status
		},
		order_status_name() {
			const {
				order_status
			} = this;
			switch (order_status * 1) {
				case 2:
					return '请及时确认接单';
				case 3:
					return '订单已开始，请技师按时出发';
				case 4:
					return '技师出发中，请按时到达';
				case 5:
					return '技师已到达';
				case 6:
					return '服务倒计时';
				case 7:
					return '加钟倒计时';
				case 8:
					return '服务已完成';
				case 9:
					return '接单超时';
				case 12:
					return '取消订单[接单中途]';
			}
		},
		type() {
			const {
				order_status
			} = this;
			switch (order_status * 1) {
				case 2:
					return 1;
				case 3:
					return 2;
				case 4:
					return 3;
				case 5:
					return 4;
				case 6:
					return 5;
				case 7:
					return 5;
				case 8:
					return 6;
				default:
					return 7
			}
		},
		showAdd(){
			const type=this.type;
			if(type==2||type==3||type==4||type==5){
				return true
			}
			return false
		},
		showTel(){
			return this.order_status!=12
		},
		progress(){
			let { remainingtime,detail}=this
			console.log(parseInt((remainingtime/detail.allservicetime)))
			return parseInt((remainingtime/(detail.allservicetime*60)*100))
		},
		countDown(){
			if(this.type==5&&this.remainingtime>0){
				const remainingtime = this.remainingtime;
				let second = parseInt(remainingtime%60)
				second= second<10?'0'+second:second
				let minute = parseInt(remainingtime/60)
				let hour = 0
				if(minute>60){
					hour = parseInt(minute/60)
					minute =  parseInt(minute%60)
					
				}
				minute = minute<10?'0'+minute:minute
				if(hour){
					return hour+':'+minute+":"+second
				}
				if(minute){
					return minute+":"+second
				}
				return second
			}
		},
		
		bottom_title() {
			const {
				order_status,
				feedflg_t
			} = this.detail;
			switch (order_status * 1) {
				case 2:
					return '确认接单';
				case 3:
					return '技师出发';
				case 4:
					return '技师到达';
				case 5:
					return '开始服务';
				case 6:
					return '完成服务';
				case 7:
					return '完成服务';
				case 8:
					if (feedflg_t) {
						return '查看评价';
					}
					return '去评价';
				default:
					return ''
			}
		},
		step() {

			const {
				accepttime,
				gotime,
				arrivetime,
				stime,
				etime
			} = this.detail;
			
			let arr = [accepttime, gotime, arrivetime, stime, etime]
			if(etime){
				return 4
			}
			if(stime){
				return 3
			}
			if(arrivetime){
				return 2
			}
			if(gotime){
				return 1
			}
			if(accepttime){
				return 0
			}
			return -1
		}
	},
	data() {
		return {
			steps: [{
					img: '/static/images/order/step1.png',
					aImg: '/static/images/order/astep1.png',
					text: '技师接单'
				},
				{
					img: '/static/images/order/step2.png',
					aImg: '/static/images/order/astep2.png',
					text: '技师出发'
				},
				{
					img: '/static/images/order/step3.png',
					aImg: '/static/images/order/astep3.png',
					text: '技师到达'
				},
				{
					img: '/static/images/order/step4.png',
					aImg: '/static/images/order/astep4.png',
					text: '开始服务'
				},
				{
					img: '/static/images/order/step5.png',
					aImg: '/static/images/order/astep5.png',
					text: '服务完成'
				}
			],
			progressList: [{
					name: '技师接单',
					time: ''
				},
				{
					name: '技师出发',
					time: ''
				},
				{
					name: '技师到达',
					time: ''
				},
				{
					name: '开始服务',
					time: ''
				},
				{
					name: '服务完成',
					time: ''
				}
			],
		}
	}
}

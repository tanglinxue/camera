<template>
  <view>
    <view class="uni-padding-wrap">
      <view class="uni-btn-v uni- uni-common-mt">
        <button type="primary" class="page-body-button" @click="tologin">微信登录</button>
      </view>
    </view>
  </view>
</template>
<script>
  import {
    mapState,
    mapMutations,
    mapActions
  } from 'vuex'
  export default {
    data() {
      return {
        title: 'login',
        weixinAuthService: ''
      }
    },
    computed: {},
    onLoad() {
      plus.oauth.getServices((services) => {
        this.weixinAuthService = services.find((service) => {
          return service.id === 'weixin'
        })
      });
    },
    methods: {
      auth() {
        this.weixinAuthService.authorize(()=>{
          console.log('两次？？？')
          this.tologin()
        }, (err) => {
          console.log('authorize错误信息:'+err)
        },{
          scope:'snsapi_userinfo',
          appid:'wxa7690772aa60dd0d'
        })
      },
      Toast(data, duration = 1000) {
        uni.showToast(Object.assign({}, data, {
          duration
        }))
      },
      getUserInfo() {
        uni.getUserInfo({
          provider: this.loginProvider,
          success: (result) => {
            console.log(result)
            this.userInfo = result.userInfo;
          },
          fail: (error) => {
            console.log('getUserInfo fail', error);
            let content = error.errMsg;
            uni.showModal({
              title: '获取用户信息失败',
              content: '错误原因' + content,
              showCancel: false
            });
          },
          complete: () => {}
        });
      },
      tologin() {
        let that = this;
        uni.login({
          provider: 'weixin',
          onlyAuthorize:true,
          success: async (res) => {
            console.log(JSON.stringify(res),/res/)
            try{
              let result = await that.$API.my.weixinLogin({
                code:res.code,
                tech_id:'XfNcOofWrvnilA'
              })
              console.log(result,/后端借口而/)
            }catch(e){
              console.log(e,/eeeee/)
            }
            
            // this.getUserInfo()
            this.Toast({
              title: '登录成功'
            })
          },
          fail: (err) => {
            console.log('login fail:', err);
            // 一键登录点击其他登录方式
            if (err.code == '30002') {
              this.Toast({
                title: '其他登录方式'
              })
              return;
            }
            // 未开通
            if (err.code == 1000) {
              uni.showModal({
                title: '登录失败',
                content: `${err.errMsg}\n，错误码：${err.code}`,
                confirmText: '开通指南',
                cancelText: '确定',
                success: (res) => {
                  if (res.confirm) {
                    setTimeout(() => {
                      plus.runtime.openWeb('https://ask.dcloud.net.cn/article/37965')
                    }, 500)
                  }
                }
              });
              return;
            }
            // 一键登录预登陆失败
            if (err.code == '30005') {
              uni.showModal({
                showCancel: false,
                title: '预登录失败',
                content: this.univerifyErrorMsg || err.errMsg
              });
              return;
            }
            // 一键登录用户关闭验证界面
            if (err.code != '30003') {
              uni.showModal({
                showCancel: false,
                title: '登录失败',
                content: JSON.stringify(err)
              });
            }
          },
          complete: () => {
            this.univerifyBtnLoading = false;
          }
        });
      },

    }
  }
</script>

<style>
  button {
    background-color: #007aff;
    color: #ffffff;
  }
</style>

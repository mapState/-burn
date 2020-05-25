<script>
	import axios from 'uni-request';
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			this.autoUpdate()
			console.log('App Show')
			//this.getInfo()
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			//获取用户信息
			getInfo(){
				let token=uni.getStorageSync('token')
				console.log(token)
				if(token){
					axios.post('user/getMine',{token}).then((data)=>{
						console.log(data)
						let info=data.user;
						if(uni.getStorageSync('userInfo')){
							let oldInfo=JSON.parse(uni.getStorageSync("userInfo"));
								if(oldInfo.amount!==info.amount){
									uni.showTabBarRedDot({
										index:2
									})
									uni.setStorageSync('amountChange','1')
								}else{
									uni.setStorageSync('amountChange','0')
								}
							uni.setStorageSync('userInfo', JSON.stringify(info));
						}
					})
				}else{
					// uni.navigateTo({
					// 	url:"/pages/authorize/authorize"
					// })
				}
			},
			autoUpdate:function(){
				console.log(new Date())
				var self=this
				// 获取小程序更新机制兼容
				if (wx.canIUse('getUpdateManager')) {
				  const updateManager = wx.getUpdateManager()
				  //1. 检查小程序是否有新版本发布
				  updateManager.onCheckForUpdate(function (res) {
					// 请求完新版本信息的回调
					if (res.hasUpdate) {
					  //2. 小程序有新版本，则静默下载新版本，做好更新准备
					  updateManager.onUpdateReady(function () {
						console.log(new Date())
						wx.showModal({
						  title: '更新提示',
						  content: '新版本已经准备好，是否重启应用？',
						  success: function (res) {
							if (res.confirm) {
							  //3. 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							  updateManager.applyUpdate()
							} else if (res.cancel) {
							  //如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
							  wx.showModal({
								title: '温馨提示~',
								content: '本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~',
								success: function (res) {     
								  self.autoUpdate()
								  return;                 
								  //第二次提示后，强制更新                      
								  if (res.confirm) {
									// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
									updateManager.applyUpdate()
								  } else if (res.cancel) {
									//重新回到版本更新提示
									self.autoUpdate()
								  }
								}
							  })
							}
						  }
						})
					  })
					  updateManager.onUpdateFailed(function () {
						// 新的版本下载失败
						wx.showModal({
						  title: '已经有新版本了哟~',
						  content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
						})
					  })
					}
				  })
				} else {
				  // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
				  wx.showModal({
					title: '提示',
					content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
				  })
				}
			  }
			  
		}
	}
</script>

<style>
	@import url("common/animate.min.css");
	@font-face{
		font-family: "book";
		src:url('http://121.40.141.26/mini/book.TTF') format('truetype');
	}
	page{
		width:100%;
		font-size:32rpx;
		font-family: "PingFang SC",miui,system-ui,-apple-system,BlinkMacSystemFont,Helvetica Neue,Helvetica,sans-serif;
	}
	.main{
		width:100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>

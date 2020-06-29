<template>
	<view class="main">
		<image src="../../static/img/text.png" mode="aspectFill" class="textImg"></image>
		<image src="../../static/img/fo.png" mode="aspectFill" class="foImg"></image>
		<view class="btnBox">
			<view class="btnBoxItem" @click="goChoseDojo(0)">
				<image src="../../static/img/btn.png" class="btnImg" mode="aspectFill"></image>
				<text class="btnText">为自己匹配本命财神</text>
			</view>
			<view class="btnBoxItem" @click="goChoseDojo(1)">
				<image src="../../static/img/btn.png" class="btnImg" mode="aspectFill"></image>
				<text class="btnText">为他人匹配本命财神</text>
			</view>
		</view>
		<image src="../../static/img/menu.png" mode="aspectFill" class="menuIcon" @click="goDojoList"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shareInfo:{
					title:'',
					poser:''
				},
			}
		},
		onShow() {
			this.isJump()
			this.getShareInfo()
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {// 来自页面内分享按钮
			  console.log(res.target)
			}
			return {
			  title:this.shareInfo.title,
			  path: '/pages/index/index'
			}
		},
		methods: {
			isJump(){
				let self = this;
				let token = uni.getStorageSync('token')||''
				console.log(token)
				if(token){
					self.getStatus()
				}else{
					wx.login({
					  success (res) {
					    if (res.code) {
							console.log(self)
							self.$api.post('api/user/login',{
								code:res.code
							}).then((res)=>{
								if(res.access_token){
									self.hasToken=true
								}else{
									return
								}
								uni.setStorageSync('token',res.access_token)
								uni.setStorageSync('user_id',res.user_id)
								uni.setStorageSync('session_key',res.session_key)
								if (!res.first) {
									
									self.getStatus()
								}else{
									uni.setStorageSync('first',1)
								}
							})
					    } else {
					      console.log('登录失败！' + res.errMsg)
					    }
					  }
					 
					})
				}
			},
			//判断套餐状态
			getStatus(){
				this.$api.get('api/pray/show').then((res)=>{
					console.log(res)
					uni.setStorageSync('paryData',res.prayer)
					try{
						uni.setStorageSync('name',res.prayer.name)
					}catch(e){
						//TODO handle the exception
					}
					let detail={...res.dojo}
					detail.content=encodeURIComponent(detail.content)
					if(res.status==1){
						uni.redirectTo({
						    url:'/pages/package/package?detail='+JSON.stringify(detail)+'&status=1'
						});
					}else if(res.status==0){
						uni.redirectTo({
							url:'/pages/package/package?detail='+JSON.stringify(detail)+'&expired=1'
						})
					}
				})
			},
			getShareInfo(){
				this.$api.get('/api/user/share').then((res)=>{
					console.log(res)
					this.shareInfo=res
				})
			},
			goDojoList(){
				uni.navigateTo({
				    url: '/pages/dojoList/dojoList'
				});
			},
			goChoseDojo(){
				uni.navigateTo({
					url:'/pages/chooseDojo/chooseDojo'
				})
				// wx.navigateToMiniProgram({
				//   appId: 'wxe38308656658eec0',
				//   path: 'pages/index/index',
				//   extraData: {
				//     foo: 'bar'
				//   },
				//   envVersion: 'develop',
				//   success(res) {
				//     // 打开成功
				//   }
				// })
			}
		}
	}
</script>

<style>
	page{
		height: 100%;
	}
	.main{
		width:100%;
		height: 100%;
		background-color: #FCEDD1;
	}
	.textImg{
		width:583rpx;
		height: 123rpx;
		margin-top: 55rpx;
	}
	.foImg{
		width:679rpx;
		height: 804rpx;
		margin-top: 42rpx;
	}
	.btnBox{
		width:100%;
		position: fixed;
		bottom:128rpx;
		left:50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.btnBoxItem{
		position: relative;
		width:518rpx;
		height: 90rpx;
	}
	.btnBoxItem:nth-child(1){
		margin-bottom: 27rpx;
	}
	.btnImg{
		width:518rpx;
		height: 90rpx;
	}
	.btnText{
		position: absolute;
		width:100%;
		height:100%;
		top:0;
		left:0;
		text-align: center;
		line-height: 90rpx;
		color: #F5C9B4;
		font-family: 'book';
		font-size: 42rpx;
	}
	.menuIcon{
		position: fixed;
		width:104rpx;
		height: 104rpx;
		bottom:20rpx;
		right:20rpx;
	}
</style>

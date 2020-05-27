<template>
	<view class="main" :style="{backgroundImage:bgImage}">
		<text class="leftTitle">{{leftTitle}}</text>
		<text class="rightTitle">{{rightTitle}}</text>
		<view class="packageList" v-if="status==0">
			<view class="listItem" v-for="item in packageList" :key="item.id" @click="wxPay(item.id)">
				<image src="../../static/img/btn.png" mode="scaleToFill" class="btnImg"></image>
				<view class="itemContent">
					<text>{{item.name}}</text>
					<text class="price">（{{item.price}}）</text>
				</view>
			</view>
		</view>
		<view class="packageList operating" v-if="status==1">
			<view class="listItem" @click="jin">
				<image src="../../static/img/btn.png" mode="scaleToFill" class="btnImg"></image>
				<view class="itemContent">
					<text>今日进香</text>
				</view>
			</view>
			<view class="listItem" @click="showShare">
				<image src="../../static/img/btn.png" mode="scaleToFill" class="btnImg"></image>
				<view class="itemContent">
					<text>分享增福</text>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center" :maskClick="false">
			<view class="countdown">
				<text class="countdownTopText">供奉已到期</text>
				<view class="btnBox" @click="close">
					<image src="../../static/img/btn.png" mode="aspectFill" class="btnBoxImg"></image>
					<text class="btnBoxTxt">继续供奉</text>
				</view>
				<view class="btnBox" @click="goBack">
					<image src="../../static/img/gray.png" mode="aspectFill" class="btnBoxImg"></image>
					<text class="btnBoxTxt gray">取消供奉</text>
				</view>
				<view class="closeBox" @click="close">
					<image src="../../static/img/closeIcon.png" mode="aspectFill" class="closeIcon"></image>
					<view class="line">
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="share" type="bottom">
			<view class="shareBox">
				<view class="shareItem">
					<image src="../../static/img/wx.png" mode="aspectFill" class="shareIcon"></image>
					<text class="shareText">发送给朋友</text>
					<button open-type="share" class="shareBtn"></button>
				</view>
				<view class="shareItem" @click="getPoster">
					<image src="../../static/img/pIcon.png" mode="aspectFill" class="shareIcon"></image>
					<text class="shareText">生成海报</text>
				</view>
			</view>
		</uni-popup>
		<view class="canvasBox" style="width:0;height:0;overflow: hidden;opacity:0;position:fixed;left:-750px;top:0;">
		    <canvas canvas-id='myCanvas' :style="{width:width+'px',height: height+'px'}"></canvas>
		</view>
		<uni-popup ref="poster" type="center" :maskClick="false">
			<view class="posterBox">
				<image :src="tmpImg" mode="aspectFill" class="posterImg"></image>
				<text class="posterTip" @click="saveImageToPhotosAlbum">保存到手机</text>
				<view class="closeBox" @click="closePoser">
					<image src="../../static/img/closeIcon.png" mode="aspectFill" class="closeIcon"></image>
					<view class="line">
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {uniPopup},
		data() {
			return {
				limit:10,
				page:1,
				leftTitle:'庇佑大家心想事成',
				rightTitle:'西路财神纳珍天尊',
				imgUrl:'',
				status:0,//0需要氪金了 1氪金cd中
				tmpImg:'',
				width:452,
				height:650,
				pixelRatio:2,
				bgPath:'/static/tmp/pbg.png',//底板
				codePath:'/static/tmp/eg.png',//小程序码
				// god:'/static/tmp/x2.png',
				shareInfo:{
					title:'',
					poser:''
				},
				packageList:[],
				detail:{},//道场详情
			}
		},
		computed:{
			bgImage(){
				return `url(${this.imgUrl})`
			}
		},
		onLoad(params) {
			wx.getSystemInfo({
			  success:(res)=>{
				// 通过像素比计算出画布的实际大小（330x490）是展示的出来的大小
				this.width = 226 * res.pixelRatio
				this.height = 325 * res.pixelRatio
				this.pixelRatio=res.pixelRatio
			  }
			})
			this.getShareInfo()
			this.getPackage()
			this.detail=JSON.parse(params.detail)
			this.imgUrl=this.detail.main_image
			uni.getStorage({
			    key: 'name',
			    success: (res)=> {
			        this.leftTitle='庇佑'+res.data+'心想事成'
					this.rightTitle=this.detail.info.substr(0,8)
			    }
			});
			console.log(params)
			if(params.status){
				this.status=1
			}else if(params.expired){
				this.open()
				this.status=0
			}else{
				this.status=0
			}
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
			//上香啊
			jin(){
				let prayer=uni.getStorageSync('paryData').id
				this.$api.put('/api/prayer/'+prayer).then((res)=>{
					uni.showToast({
						title:'上香成功',
						icon:'none'
					})
				})
			},
			//获取套餐
			getPackage(){
				this.$api.get('/api/pray',{
					params:{
						limit:this.limit,
						page:this.page
					}
				}).then((res)=>{
					console.log(res)
					this.packageList=this.packageList.concat(res.data)
				})
			},
			//获取分享配置
			getShareInfo(){
				this.$api.get('/api/user/share').then((res)=>{
					console.log(res)
					this.shareInfo=res
				})
			},
			closePoser(){
				this.$refs.poster.close()
			},
			//生成海报
			getPoster(){
				this.$refs.share.close()
				uni.showLoading({
				    title: '海报生成中...',
				});
				let that = this
				let context = wx.createCanvasContext('myCanvas');
				context.width = this.width;
				context.height = this.height;
				let x = context.width / 2;
				wx.getImageInfo({
				  src: this.shareInfo.poser,
				  success: (res) => {
					console.log(res)
					context.drawImage(this.bgPath, 0,0,this.width,this.height);
					context.drawImage(res.path,0,0,226*this.pixelRatio,210*this.pixelRatio,);
					context.setFontSize(12*this.pixelRatio);
					context.setFillStyle('#935C41');
					context.setTextAlign('center');
					let text=this.shareInfo.title
					if(text.length>16){
						text=text.substr(0,16)+'...'
					}
					context.fillText(text,this.width/2, 226*this.pixelRatio);
					// if(this.pixelRatio===2){
					// 	context.drawImage(this.god,0,0,206*this.pixelRatio,159*this.pixelRatio,10*this.pixelRatio,51*this.pixelRatio,206*this.pixelRatio,159*this.pixelRatio);
					// }else{
					// 	context.drawImage(this.god,0,0,206*this.pixelRatio,159*this.pixelRatio,46*this.pixelRatio,51*this.pixelRatio,206*this.pixelRatio,159*this.pixelRatio);
					// }
					context.save();
					context.restore();
					wx.getImageInfo({
					  src: that.codePath,
					  success: (res1) => {
						context.drawImage(that.codePath, 13*that.pixelRatio,258*that.pixelRatio,52*that.pixelRatio,52*that.pixelRatio);
						context.save();
						context.restore();
						context.draw();
						setTimeout(()=>{
						  wx.canvasToTempFilePath({
							canvasId: 'myCanvas',
							x: 0, //指定的画布区域的左上角横坐标	
							y: 0, //指定的画布区域的左上角纵坐标	
							width: this.width, //指定的画布区域的宽度
							height: this.height, //指定的画布区域的高度
							destWidth: this.width, //输出的图片的宽度 
							destHeight: this.height, //输出的图片的高度
							success: (res)=>{
							  var tempFilePath = res.tempFilePath;
							  this.tmpImg=tempFilePath
							  console.log(tempFilePath)
							  uni.hideLoading();
							  this.$refs.poster.open()
							},
							fail: (res)=>{
							  console.log(res);
							  uni.hideLoading();
							}
						  });
						}, 300);
					  }
					})
			 
				  }
				})
			},
			saveImageToPhotosAlbum() {
				var that = this
				var value = that.tmpImg;// 你的图片路径
				if (value != undefined && value != "") {
				  wx.saveImageToPhotosAlbum({
					filePath: value,
					success: (res) => {
					  // that.hideModal();
					  // that.hideMoments();
					  wx.showToast({
						title: "已保存到相册",
						icon: 'none',
						duration: 1500,
						mask: true
					  })
					},
					fail: function (res) {
					  console.error(res)
						//首次保存会询问你是否授权，选是就好了
					  // if (res.errMsg == "saveImageToPhotosAlbum:fail auth deny") {
					  console.error("打开设置窗口");
					  wx.openSetting({
						success(settingdata) {
						  console.error(settingdata)
						  if (settingdata.authSetting["scope.writePhotosAlbum"]) {
							console.error("获取权限成功，再次点击图片保存到相册")
						  } else {
							console.error("获取权限失败")
						  }
						}
					  })
					  // }
					}
				  })
				}
			  },
			showShare(){
				this.$refs.share.open()
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			//套餐过期
			open(){
				this.$refs.popup.open()
			},
			close(){
				this.$refs.popup.close()
			},
			wxPay(pray_id){
				wx.login({
				  success:(res)=>{
					if (res.code) {
						this.$api.post('/api/wechat/pay',{
							dojo_id:this.detail.id,
							pray_id,
							prayer_id:uni.getStorageSync('paryData').id
						}).then((info)=>{
							console.log(info)
							wx.requestPayment({
									'appId': info.appId,
									'timeStamp': info.timeStamp,
									'nonceStr': info.nonceStr,
									'package': info.package,
									'signType': info.signType,
									'paySign': info.paySign,
									'success':(res2)=>{
										console.log(res2)
										console.log("支付成功")
										uni.showToast({
											title:"支付成功",
											duration:1200
										})
										this.status=1
									},
									'fail':function(err1){
										console.log("支付失败")
										uni.showToast({
											title:'支付失败',
											icon:'none',
											duration:1200
										})
									},
									'complete':function(err2){
										
									}
							})
						})
						
					}else {
					  console.log('登录失败！' + res.errMsg)
					}
				  }
				})		
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
		overflow: hidden;
		position: fixed;
		left:0;
		top:0;
		background-size: 100% 100%;
	}
	.leftTitle{
		width:60rpx;
		position:fixed;
		left:71rpx;
		top:113rpx;
		font-size:60rpx;
		line-height:60rpx;
		font-family: 'book';
		color: #9A392E;
	}
	.rightTitle{
		width:60rpx;
		position:fixed;
		right:71rpx;
		top:113rpx;
		font-size:60rpx;
		line-height:60rpx;
		font-family: 'book';
		color: #9A392E;
	}
	.packageList{
		width:592rpx;
		position: fixed;
		bottom:136rpx;
		left:50%;
		transform: translateX(-50%);
		display: flex;
		flex-wrap: wrap;
	}
	.operating{
		bottom:50rpx;
	}
	.listItem{
		position: relative;
		width:276rpx;
		height:81rpx;
		margin:0 10rpx;
		margin-bottom: 45rpx;
	}
	.btnImg{
		position: absolute;
		left:0;
		right: 0;
		width: 100%;
		height: 100%;
	}
	.itemContent{
		position: absolute;
		left:0;
		top:0;
		width:100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content:center;
		font-family: 'book';
	}
	.itemContent >text{
		color: #F5C9B4;
	}
	.price{
		font-size: 24rpx;
	}
	/* 弹出 */
	.countdown{
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		width:610rpx;
		height:429rpx;
		background:rgba(253,240,214,1);
		border-radius:6rpx;
	}
	.countdownTopText{
		font-size:38rpx;
		font-family:'book';
		font-weight:400;
		color:rgba(147,92,65,1);
		margin-top: 46rpx;
		margin-bottom: 90rpx;
	}
	.closeBox{
		position: absolute;
		width:44rpx;
		top:-70rpx;
		right:30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.closeIcon{
		width:44rpx;
		height: 44rpx;
	}
	.line{
		width:2rpx;
		height:26rpx;
		background:rgba(254,248,224,1);
	}
	.btnBox{
		width:482rpx;
		height: 89rpx;
		position: relative;
		margin-bottom: 23rpx;
	}
	.btnBoxImg{
		width:100%;
		height: 100%;
	}
	.btnBoxTxt{
		position: absolute;
		top:50%;
		left:50%;
		transform: translate(-50%,-50%);
		font-family: 'book';
		font-size: 42rpx;
		color: #DCC6B1;
	}
	.gray{
		color:#666;
	}
	.shareBox{
		width:100%;
		height: 208rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: #fff;
	}
	.shareItem{
		position: relative;
		width:150rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.shareBtn{
		position: absolute;
		left:0;
		top:0;
		opacity: 0;
		width:100%;
		height: 100%;
	}
	.shareIcon{
		width:90rpx;
		height: 90rpx;
		margin-bottom: 26rpx;
	}
	.shareText{
		display: block;
		text-align: center;
		font-size:30rpx;
		font-weight:400;
	}
	.posterBox{
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		width:452rpx;
	}
	.posterImg{
		width:452rpx;
		height:650rpx;
	}
	.posterTip{
		display: block;
		width:452rpx;
		height:76rpx;
		background:rgba(154,57,46,1);
		text-align: center;
		line-height: 76rpx;
		font-size:34rpx;
		font-family:'book';
		font-weight:400;
		color:rgba(220,198,177,1);
	}
</style>

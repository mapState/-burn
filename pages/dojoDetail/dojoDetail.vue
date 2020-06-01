<template>
	<view class="main">
		<view class="leftIconBox" :style="{top:top+'px'}">
			<image src="../../static/img/left.png" mode="aspectFill" class="leftIcon" @click="goBack"></image>
		</view>
		<image :src="detail.main_image" mode="widthFix" class="topImg"></image>
		<view class="detail">
			<view class="dTitle">
				<text class="dTitleTxt">{{detail.info||detail.name}}</text>
			</view>
			<view class="eightBox">
				<text class="t1">匹配本命财神道场</text>
				<text class="t1">福生无量天尊法无边</text>
				<image src="../../static/tmp/eg.png" mode="aspectFill" class="egImg"></image>
			</view>
			<view class="t2">
				<rich-text :nodes="detail.content"></rich-text>
				<!-- 财神共有五个方位，每个方位都有一只龙五爷的眼睛，佛家称之为“五眼”，即肉眼、天眼、法眼、慧眼和佛眼。五眼，观五行：金木水火土；审五蕴：色受想行识。大殿还立有八根财柱，分别代表龙五爷开示众生如何正当求财的八大法门，信众依据法门开示，树立正确的财富观，就能求财如意。 -->
			</view>
			<image src="../../static/tmp/gossip.png" mode="aspectFill" class="godImg"></image>
			<view class="btnBox" v-if="showBtn">
				<image src="../../static/img/btn.png" class="btnImg" mode="aspectFill"></image>
				<view class="btnText" @click="open">
					我要虔诚供奉
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center" :maskClick="false">
			<view class="countdown">
				<view class="countdownTop">
					<image src="../../static/img/yl.png" mode="aspectFill" class="ylIcon"></image>
					<text class="countdownTopText">心中默诵所求</text>
				</view>
				<view class="time">
					<text class="timeNum">0{{time}}</text>s
				</view>
				<view class="closeBox" @click="close">
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
				time:6,
				timer:null,
				top:32,
				detail:{},
				showBtn:false
			}
		},
		onLoad(params) {
			if(params.type){
				this.showBtn=true
			}
			this.top=uni.getMenuButtonBoundingClientRect().top
			let detail=JSON.parse(params.detail)
			detail.content=decodeURIComponent(detail.content)
			this.detail=detail
			console.log(this.detail)
		},
		onUnload(){
			this.timer&&clearTimeout(this.timer)
		},
		methods: {
			//供奉
			goWorship(){
				uni.reLaunch({
					url:'/pages/package/package?detail='+JSON.stringify(this.detail)
				})
				// let user_id=uni.getStorageSync('paryData').user_id
				// let pray_id=uni.getStorageSync('paryData').id
				
				// this.$api.get('/api/pray/'+user_id+'/isend/'+pray_id).then((res)=>{
				// 	console.log(res)
				// 	uni.navigateTo({
				// 		url:'/pages/package/package?detail='+JSON.stringify(this.detail)+'&status=1'
				// 	})
				// }).catch((err)=>{
				// 	if(uni.getStorageSync('first')==0){
				// 		//窮鬼沒氪過金 第一次來
				// 		uni.navigateTo({
				// 			url:'/pages/package/package?detail='+JSON.stringify(this.detail)
				// 		})
				// 	}else{
				// 		uni.navigateTo({
				// 			url:'/pages/package/package?detail='+JSON.stringify(this.detail)+'&expired=1'
				// 		})
				// 	}
				// 	console.log(err)
					
				// })
			},
			goBack(){
				uni.navigateBack({
				    delta: 1
				});
			},
			open(){
				this.time=6 
			    this.$refs.popup.open()
				this.countdown()
			},
			close(){
				this.timer&&clearTimeout(this.timer)
				this.$refs.popup.close()
			},
			countdown(){
			      --this.time
			      if(this.time <= 0){
			         clearTimeout(this.timer);
					 this.$refs.popup.close()
					 this.goWorship()
			         return
			      }
			      this.timer=setTimeout(this.countdown,1000);
			},
		}
	}
</script>

<style>
	.main{
		position: relative;
	}
	.leftIconBox{
		/* width: 100%;
		background-color: #000000; */
		position: fixed;
		left:37rpx;
		height: 32px;
		display: flex;
		align-items: center;
	}
	.leftIcon{
		width:24rpx;
		height: 41rpx;
		padding:0 10rpx;
	}
	.topImg{
		width:100%;
		height:auto;
	}
	.detail{
		position: absolute;
		width:100%;
		top:698rpx;
		left:0;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.dTitle{
		position: relative;
		width:100%;
		padding:20rpx 0;
		margin-bottom: 30rpx;
	}
	.dTitleTxt{
		margin-left: 34rpx;
		display: block;
		width:532rpx;
		height:82rpx;
		font-size:38rpx;
		font-family:'book';
		font-weight:400;
		color:rgba(147,92,65,1);
	}
	.eightBox{
		width:100%;
		padding:44rpx 0;
		position: relative;
		border-bottom: 1px solid #ddd;
		border-top: 1px solid #ddd;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom:20rpx;
	}
	.eightBox::before{
		content: '';
		display: block;
		position: absolute;
		width:24rpx;
		height: 4rpx;
		background-color: #935C41;
		top:-1.5rpx;
		left:50%;
		transform: translateX(-50%);
	}
	.eightBox::after{
		content: '';
		display: block;
		position: absolute;
		width:24rpx;
		height: 4rpx;
		background-color: #935C41;
		bottom:-1.5rpx;
		left:50%;
		transform: translateX(-50%);
	}
	.t1{
		font-size:32rpx;
		font-weight:400;
		color:rgba(147,92,65,1);
	}
	.egImg{
		width:298rpx;
		height: 298rpx;
		margin-top:41rpx;
	}
	.t2{
		width:627rpx;
		font-size:30rpx;
		font-family:'book';
		font-weight:400;
		color:rgba(147,92,65,1);
		margin-bottom: 29rpx;
	}
	.godImg{
		width:329rpx;
		height: 257rpx;
		margin-bottom:160rpx;
	}
	.btnBox{
		position: fixed;
		width:564rpx;
		height: 81rpx;
		text-align: center;
		line-height: 81rpx;
		left:50%;
		transform: translateX(-50%);
		bottom:77rpx;
	}
	.btnImg{
		position: absolute;
		top:0;
		left:0;
		width:100%;
		height: 100%;
	}
	.btnText{
		position: absolute;
		top:0;
		left:0;
		width:100%;
		height: 100%;
		text-align: center;
		line-height:81rpx;
		font-size:45rpx;
		font-family:'book';
		font-weight:400;
		color:rgba(220,198,177,1);
	}
	.countdown{
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		width:610rpx;
		height:434rpx;
		background:rgba(253,240,214,1);
		border-radius:6rpx;
	}
	.countdownTop{
		width:100%;
		display: flex;
		justify-content: center;
		margin-top:46rpx;
	}
	.ylIcon{
		width:41rpx;
		height: 40rpx;
		margin-right: 13rpx;
	}
	.countdownTopText{
		font-size:38rpx;
		font-family:'book';
		font-weight:400;
		color:rgba(147,92,65,1);
	}
	.time{
		font-size:60rpx;
		font-weight:400;
		color:rgba(154,57,46,1);
		margin-top: 113rpx;
	}
	.timeNum{
		font-size:150rpx;
		font-family:'book';
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
</style>

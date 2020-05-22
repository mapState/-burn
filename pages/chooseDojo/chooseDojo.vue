<template>
	<view class="main">
		<text class="title">匹配本命财神道场</text>
		<text class="title">福生无量天尊法无边</text>
		<view class="gossipBox">
			<image src="../../static/img/eight.png" mode="aspectFill" class="gossipImg"></image>
			<view class="itemBox" :class="selIdList.includes(0)?'selActive':''" @click="selItem(0)">
				<text class="gossipTitle">{{textList[0]}}</text>
				<view class="itemIcon">
					<view class="one"></view>
					<view class="two">
						<view class="half"></view>
						<view class="half"></view>
					</view>
					<view class="one"></view>
				</view>
			</view>
			<view class="itemBox" :class="selIdList.includes(1)?'selActive':''" @click="selItem(1)">
				<text class="gossipTitle">{{textList[1]}}</text>
				<view class="itemIcon">
					<view class="two">
						<view class="half"></view>
						<view class="half"></view>
					</view>
					<view class="two">
						<view class="half"></view>
						<view class="half"></view>
					</view>
					<view class="two">
						<view class="half"></view>
						<view class="half"></view>
					</view>
				</view>
			</view>
			<view class="itemBox" :class="selIdList.includes(2)?'selActive':''" @click="selItem(2)">
				<text class="gossipTitle rotate180">{{textList[2]}}</text>
				<view class="itemIcon">
					<view class="one"></view>
					<view class="one"></view>
					<view class="two">
						<view class="half"></view>
						<view class="half"></view>
					</view>
				</view>
			</view>
			<view class="itemBox" :class="selIdList.includes(3)?'selActive':''" @click="selItem(3)">
				<text class="gossipTitle rotate180">{{textList[3]}}</text>
				<view class="itemIcon">
					<view class="one"></view>
					<view class="one"></view>
					<view class="one"></view>
				</view>
			</view>
			<view class="itemBox" :class="selIdList.includes(4)?'selActive':''" @click="selItem(4)">
				<text class="gossipTitle rotate180">{{textList[4]}}</text>
				<view class="itemIcon">
					<view class="two">
						<view class="half"></view>
						<view class="half"></view>
					</view>
					<view class="one"></view>
					<view class="two">
						<view class="half"></view>
						<view class="half"></view>
					</view>
				</view>
			</view>
			<view class="itemBox" :class="selIdList.includes(5)?'selActive':''" @click="selItem(5)">
				<text class="gossipTitle rotate180">{{textList[5]}}</text>
				<view class="itemIcon">
					<view class="two">
						<view class="half"></view>
						<view class="half"></view>
					</view>
					<view class="two">
						<view class="half"></view>
						<view class="half"></view>
					</view>
					<view class="one"></view>
				</view>
			</view>
			<view class="itemBox" :class="selIdList.includes(6)?'selActive':''" @click="selItem(6)">
				<text class="gossipTitle rotate180">{{textList[6]}}</text>
				<view class="itemIcon">
					<view class="one"></view>
					<view class="two">
						<view class="half"></view>
						<view class="half"></view>
					</view>
					<view class="two">
						<view class="half"></view>
						<view class="half"></view>
					</view>
				</view>
			</view>
			<view class="itemBox" :class="selIdList.includes(7)?'selActive':''" @click="selItem(7)">
				<text class="gossipTitle">{{textList[7]}}</text>
				<view class="itemIcon">
					<view class="two">
						<view class="half"></view>
						<view class="half"></view>
					</view>
					<view class="one"></view>
					<view class="one"></view>
				</view>
			</view>
		</view>
		<text class="tip">（以上限求三项）</text>
		<view class="btnBox">
			<image src="../../static/img/btn.png" mode="aspectFill" class="btnImg"></image>
			<text class="btnTxt" @click="goMatch">匹配本命财神道场</text>
			<!-- <button open-type="getUserInfo" @getuserinfo="getUserInfo" class="getUserBtn"></button> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				textList:['财源滚滚','步步高升','一夜暴富','每赌必赢','逢凶化吉','业绩长虹','生意兴隆','贵人相助'],
				selIdList:[]
			}
		},
		methods: {
			goMatch(){
				try {
					let wishList=[]
					if(this.selIdList.length>0){
						this.selIdList.forEach((item)=>{
							wishList.push(this.textList[item])
						})
					}
					console.log(wishList)
				    uni.setStorage({
				        key: 'wishList',
				        data: wishList,
				        success: function () {
				           uni.navigateTo({
				               url: '/pages/birthday/birthday'
				           }); 
				        }
				    });
				} catch (e) {
				    // error
				}
			},
			getUserInfo(info) {
				console.log(info);
				return
				if (info.detail.userInfo) {
				  console.log("点击了同意授权");
				  wx.login({
					success: (res)=>{
					  if (res.code) {
						wx.request({
						  url: 'https://app.movetechy.com/login/sign',
						  data: {
							code: res.code,
							rawData:info.detail.rawData
						  },
						  header: {
							'content-type': 'application/json' // 默认值
						  },
						  success: (result)=>{
							console.log(result)
							if(result.statusCode==200&&result.data.code==0){
								let token=result.data.token
								uni.setStorageSync('token',token);
								this.getInfo(token)
							}else{
								uni.showToast({
									title:result.data.msg,
									icon:"none",
									duration:600
								})
							}
							
						  }
						})
					  } else {
						console.log("授权失败");
					  }
					},
				  })
				} else {
				  console.log("点击了拒绝授权");
				  this.back()
				}
			},
			selItem(index){
				let i= this.selIdList.indexOf(index)
				if(i>-1){
					this.selIdList.splice(i,1)
				}else{
					if(this.selIdList.length>=3){
						uni.showToast({
						    title: '以上限求三项',
							icon:'none',
						    duration: 1000
						});
					}else{
						this.selIdList.push(index)
					}
				}
			}
		}
	}
</script>

<style>
	page{
		background:rgba(252,237,209,1);
	}
	.title{
		font-size:58rpx;
		font-family:书体坊颜体?;
		font-weight:400;
		color:rgba(147,92,65,1);
	}
	.title:nth-child(1){
		margin-top:73rpx;
	}
	.gossipBox{
		position: relative;
		width:540rpx;
		height:540rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 90rpx;
		position: relative;
		/* border:1px solid #000; */
		border-radius: 50%;
	}
	.gossipImg{
		width:305rpx;
		height: 305rpx;
	}
	.itemBox{
		position: absolute;
		text-align: center;
		left: 50%;
		margin-left: -70rpx;
		top:-10rpx;
		width:140rpx;
		/* border:1px solid #f60; */
	}
	.gossipTitle{
		display: block;
		padding:6rpx 0;
		background:rgba(252,237,209,1);
		font-size:35rpx;
		font-family:STKaitiTC;
		font-weight:400;
		color:rgba(154,57,46,1);
	}
	.itemIcon{
		width:140rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.one,.two{
		width:82rpx;
		height:17rpx;
		margin-bottom:6rpx;
	}
	.one{
		width:82rpx;
		height:17rpx;
		background-color: #B37F5D;
	}
	.two{
		display: flex;
		justify-content: space-between;
	}
	.half{
		width:38rpx;
		height:17rpx;
		background-color: #B37F5D;
	}
	.selActive .one,.selActive .half{
		background:rgba(8,4,3,1) !important;
	}
	.itemBox:nth-of-type(2){
		transform: rotate(45deg);
		transform-origin:70rpx 280rpx;
	}
	.itemBox:nth-of-type(3){
		transform: rotate(90deg);
		transform-origin:70rpx 280rpx;
	}
	.itemBox:nth-of-type(4){
		transform: rotate(135deg);
		transform-origin:70rpx 280rpx;
	}
	.itemBox:nth-of-type(5){
		transform: rotate(180deg);
		transform-origin:70rpx 280rpx;
	}
	.itemBox:nth-of-type(6){
		transform: rotate(225deg);
		transform-origin:70rpx 280rpx;
	}
	.itemBox:nth-of-type(7){
		transform: rotate(270deg);
		transform-origin:70rpx 280rpx;
	}
	.itemBox:nth-of-type(8){
		transform: rotate(315deg);
		transform-origin:70rpx 280rpx;
	}
	.rotate180{
		transform: rotate(180deg);
		transform-origin:center center;
	}
	.tip{
		font-size:36rpx;
		font-family:书体坊颜体?;
		font-weight:400;
		color:rgba(154,57,46,1);
		margin-top: 107rpx;
	}
	.btnBox{
		position: relative;
		width:564rpx;
		height:81rpx;
		margin-top: 64rpx;
	}
	.btnImg{
		width:100%;
		height: 100%;
	}
	.btnTxt{
		width:100%;
		height: 100%;
		text-align: center;
		line-height: 81rpx;
		position: absolute;
		top:50%;
		left: 50%;
		transform: translate(-50%,-50%);
		font-size:45rpx;
		font-family:书体坊颜体?;
		font-weight:400;
		color:rgba(220,198,177,1);
	}
	.getUserBtn{
		position: absolute;
		left:0;
		top:0;
		width:100%;
		height: 100%;
		opacity: 0;
	}
</style>

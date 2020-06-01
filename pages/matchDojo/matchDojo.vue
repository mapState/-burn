<template>
	<view class="main">
		<image src="../../static/img/fua.png" mode="widthFix" class="bgImg"></image>
		<view class="top">
			<image src="../../static/img/border.png" mode="aspectFill" class="borderImg"></image>
			<text class="title">星盘轮转 推演大成</text>
		</view>
		<text class="wantTitle">{{name}},您祈求之福报为</text>
		<view class="wantList">
			<text class="wantItem" v-for="(item,index) in wishList" :key="item">{{item}}</text>
		</view>
		<text class="wantTitle">您的本命道场是</text>
		<image :src="detail.main_image" mode="widthFix" class="mainImg"></image>
		<!-- <view class="natal">
				
		</view> -->
		<text class="hz">{{detail.name}}</text>
		<text class="info">{{detail.info}}</text>
		<view class="btnBox" @click="goDojoDetail">
			<image src="../../static/img/btn.png" mode="aspectFill" class="btnImg"></image>
			<text class="btnText">立即前往</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail:{},
				wishList:[],
				name:uni.getStorageSync('name')||'***'
			}
		},
		onLoad(params) {
			uni.getStorage({
			    key: 'wishList',
			    success: (res)=>{
					console.log(res.data)
			        this.wishList=res.data||[]
			    }
			});
			uni.getStorage({
			    key: 'detail',
			    success: (res)=>{
					console.log(res.data)
			        this.detail=res.data||[]
			    }
			});
		},
		methods: {
			goDojoDetail(){
				let detail={...this.detail}
				detail.content=encodeURIComponent(detail.content)
				uni.navigateTo({
					url:"/pages/dojoDetail/dojoDetail?type=1&detail="+JSON.stringify(detail)
				})
			}
		}
	}
</script>

<style>
	page{
		background:rgba(252,237,209,1);
	}
	.bgImg{
		position: fixed;
		width:366rpx;
		height: auto;
		top:58rpx;
		left:50%;
		transform: translateX(-50%);
		z-index: -1;
	}
	.top{
		position: relative;
		width:603rpx;
		height: 129rpx;
		margin-top: 51rpx;
		margin-bottom: 28rpx;
	}
	.borderImg{
		width:100%;
		height: 100%;
	}
	.title{
		position: absolute;
		width:100%;
		height: 100%;
		top:0;
		left:0;
		text-align: center;
		line-height:129rpx ;
		font-size:58rpx;
		font-family:'book';
		font-weight:400;
		color:rgba(147,92,65,1);
	}
	.wantTitle{
		display: block;
		width:100%;
		font-size:48rpx;
		font-family:'book';
		font-weight:400;
		color:rgba(149,95,68,1);
		padding-left: 80rpx;
		box-sizing: border-box;
	}
	.mainImg{
		width:603rpx;
		height: auto;
		margin-bottom:10rpx;
	}
	.wantList{
		width:100%;
		box-sizing: border-box;
		padding-left:80rpx;
		display: flex;
		margin-top: 15rpx;
		margin-bottom: 64rpx;
	}
	.wantItem{
		display: block;
		width:190rpx;
		height:82rpx;
		background:rgba(209,192,165,1);
		border:1px solid rgba(126,107,90,1);
		margin-right: 14rpx;;
		text-align: center;
		line-height: 83rpx;
		color: #9A392E;
	}
	.natal{
		width:603rpx;
		height: 340rpx;
		margin-top: 17rpx;
		margin-bottom: 30rpx;
	}
	.hz{
		font-size:60rpx;
		font-family:'book';
		font-weight:400;
		color:rgba(149,95,68,1);
		text-align: center;
	}
	.info{
		font-size:60rpx;
		font-family:'book';
		font-weight:400;
		color:rgba(149,95,68,1);
		text-align: center;
	}
	.btnBox{
		position: relative;
		width:574rpx;
		height:89rpx;
		margin: 48rpx 0;
	}
	.btnImg{
		width:100%;
		height: 100%;
	}
	.btnText{
		position: absolute;
		left:0;
		top:0;
		width:100%;
		height: 100%;
		text-align: center;
		line-height: 89rpx;
		font-size:45rpx;
		font-family:'book';
		font-weight:400;
		color:rgba(220,198,177,1);
	}
</style>

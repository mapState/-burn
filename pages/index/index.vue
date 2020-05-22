<template>
	<view class="main">
		<image src="../../static/img/text.png" mode="aspectFill" class="textImg"></image>
		<image src="../../static/img/fo.png" mode="aspectFill" class="foImg"></image>
		<view class="btnBox">
			<view class="btnBoxItem">
				<image src="../../static/img/btn.png" class="btnImg" mode="aspectFill"></image>
				<image src="../../static/img/text1.png" mode="aspectFill" class="btnText"></image>
			</view>
			<view class="btnBoxItem">
				<image src="../../static/img/btn.png" class="btnImg" mode="aspectFill"></image>
				<image src="../../static/img/text1.png" mode="aspectFill" class="btnText"></image>
			</view>
		</view>
		<image src="../../static/img/menu.png" mode="aspectFill" class="menuIcon" @click="goDojoList"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		methods: {
			goDojoList(){
				uni.navigateTo({
				    url: '/pages/dojoList/dojoList'
				});
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
		width:689rpx;
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
		width:299rpx;
		height: 42rpx;
		left:50%;
		top:50%;
		transform: translate(-50%,-50%);
	}
	.menuIcon{
		position: fixed;
		width:104rpx;
		height: 104rpx;
		bottom:20rpx;
		right:20rpx;
	}
</style>

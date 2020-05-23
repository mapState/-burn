<template>
	<view class="main">
		<image src="../../static/img/text.png" mode="aspectFill" class="textImg"></image>
		<image src="../../static/img/fo.png" mode="aspectFill" class="foImg"></image>
		<view class="btnBox">
			<view class="btnBoxItem" @click="goChoseDojo(0)">
				<image src="../../static/img/btn.png" class="btnImg" mode="aspectFill"></image>
				<text class="btnText">为自己匹配道场</text>
			</view>
			<view class="btnBoxItem" @click="goChoseDojo(1)">
				<image src="../../static/img/btn.png" class="btnImg" mode="aspectFill"></image>
				<text class="btnText">为他人匹配道场</text>
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
			},
			goChoseDojo(){
				uni.navigateTo({
					url:'/pages/chooseDojo/chooseDojo'
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

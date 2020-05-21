<template>
	<view class="main">
		<image src="../../static/tmp/x1.png" mode="widthFix" class="topImg"></image>
		<view class="detail">
			<view class="dTitle">
				<text class="dTitleTxt">东路财神招宝天尊庇佑大家心想事成</text>
			</view>
			<text class="t1">匹配本命财神道场</text>
			<text class="t1">福生无量天尊法无边</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(option) {
			console.log(option.id)
		},
		methods: {
			
		}
	}
</script>

<style>
	.topImg{
		width:100%;
		height:auto;
	}
	.detail{
		position: fixed;
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
		border-bottom: 1px solid #ddd;
		margin-bottom: 30rpx;
	}
	.dTitle::after{
		content: '';
		display: block;
		position: absolute;
		width:24rpx;
		height: 4rpx;
		background-color: #935C41;
		bottom:-2rpx;
		left:50%;
		transform: translateX(-50%);
	}
	.dTitleTxt{
		margin-left: 34rpx;
		display: block;
		width:532rpx;
		height:82rpx;
		font-size:38rpx;
		font-family:書體坊顏體㊣;
		font-weight:400;
		color:rgba(147,92,65,1);
	}
	.t1{
		font-size:32rpx;
		font-family:書體坊顏體㊣;
		font-weight:400;
		color:rgba(147,92,65,1);
	}
</style>

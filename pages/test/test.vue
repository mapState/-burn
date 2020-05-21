<template>
	<view class="main"> 
		<view class="box">
			<view class="li" v-for="item in 8" :key="item">
				<view class="t">
					财源滚滚
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.box{
		position: relative;
		margin-top: 20rpx;
		width:540rpx;
		height: 540rpx;
		border:1px solid #000;
		border-radius: 50%;
	}
	.box > view{
		position: absolute;
		border-radius: 50%;
		line-height: 40rpx;
		text-align: center;
		left: 50%;
		margin-left: -70rpx;
		margin-top: -20rpx;
		width:140rpx;
		height: 40rpx;
		border:1px solid #f60;
	}
	.li:nth-of-type(2){
					transform: rotate(45deg);
					transform-origin:70rpx 290rpx;
				}
				.li:nth-of-type(3){
					transform: rotate(90deg);
					transform-origin:70rpx 290rpx;
				}
				.li:nth-of-type(4){
					transform: rotate(135deg);
					transform-origin:70rpx 290rpx;
				}
				.li:nth-of-type(5){
					transform: rotate(180deg);
					transform-origin:70rpx 290rpx;
				}
				.li:nth-of-type(6){
					transform: rotate(225deg);
					transform-origin:70rpx 290rpx;
				}
				.li:nth-of-type(7){
					transform: rotate(270deg);
					transform-origin:70rpx 290rpx;
				}
				.li:nth-of-type(8){
					transform: rotate(315deg);
					transform-origin:70rpx 290rpx;
				}
				/* .t{
					transform: rotate(180deg);
					transform-origin:center center;
				} */
</style>

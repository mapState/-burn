<template>
	<view class="main">
		<view class="list">
			<view class="listItem" v-for="(item,index) in 7" :key="index" @click="goDetail">
				<image src="https://hbimg.huabanimg.com/2bac7cba175d1c0320058ab26584669c9f3a2c14613dd-5EeetP_fw658/format/webp" mode="aspectFill" class="listImg"></image>
				<view class="listItemText">东路财神</view>
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
			goDetail(){
				uni.navigateTo({
					url:"/pages/dojoDetail/dojoDetail?id=1"
				})
			}
		}
	}
</script>

<style>
	.list{
		width:700rpx;
		display: flex;
		flex-wrap: wrap;
		margin-top: 31rpx;
	}
	.listItem{
		width:324rpx;
		padding:0 13rpx;
		margin-bottom: 29rpx;
	}
	.listImg{
		width:324rpx;
		height:431rpx;
		border-radius:10px;
		margin-bottom: 26rpx;
	}
	.listItemText{
		width:100%;
		text-align: center;
		font-size:34rpx;
		font-weight:400;
		color:rgba(147,92,65,1);
	}
</style>

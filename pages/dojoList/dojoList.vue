<template>
	<view class="main">
		<view class="list">
			<view class="listItem" v-for="item in list" :key="item.id" @click="goDetail(item)">
				<image :src="item.main_image" mode="widthFix" class="listImg"></image>
				<view class="listItemText">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				limit:10,
				page:1
			}
		},
		onLoad() {
			this.getList()
		},
		onReachBottom(){
			this.getList()
		},
		methods: {
			goDetail(info){
				console.log(info)
				let detail={...info}
				detail.content=encodeURIComponent(detail.content)
				uni.navigateTo({
					url:"/pages/dojoDetail/dojoDetail?detail="+JSON.stringify(detail)
				})
			},
			getList(){
				this.$api.get('/api/dojo',{
					params:{
						limit:this.limit,
						page:this.page
					}
				}).then((res)=>{
					console.log(res)
					if(res.data.length>0){
						this.list=this.list.concat(res.data)
						this.page++
					}
				})
			}
		}
	}
</script>

<style>
	.list{
		width:674rpx;
		display: flex;
		flex-wrap: wrap;
		margin-top: 31rpx;
	}
	.listItem{
		width:324rpx;
		margin-bottom: 29rpx;
		box-sizing: border-box;
	}
	.listItem:nth-child(2n){
		margin-left:26rpx;
	}
	.listImg{
		width:324rpx;
		height:431rpx;
		border-radius:10rpx;
		box-sizing: border-box;
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

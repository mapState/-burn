<template>
	<view class="main">
		<image src="../../static/img/fua.png" mode="widthFix" class="bgImg"></image>
		<view class="top">
			<image src="../../static/img/border.png" mode="aspectFill" class="borderImg"></image>
			<text class="title">本命星盘 福根无穷</text>
		</view>
		<view class="want">
			<view class="wantText">心中所求:</view>
		</view>
		<view class="wantList" v-if="wishList.length>0">
			<text class="wantListItem" v-for="(item,index) in wishList" :key="index">{{item}}</text>
		</view>
		<template v-if="step===1">
			<view class="selBox">
				<view class="selBoxTxt">生辰八字:</view>
				 <view class="yang one" :class="radio===0?'selRadio':''" @click="selRadio(0)">
					<view class="radio">
					</view>
					<text class="radioTxt">阴历</text>
				</view>
				<view class="yang" :class="radio===1?'selRadio':''" @click="selRadio(1)">
					<view class="radio">
					</view>
					<text class="radioTxt">阳历</text>
				</view>
			</view>
			<view class="date">
				<text class="dSpan">年</text>
				<input class="input" focus placeholder="请输入年份" v-model="form.year"/>
			</view>
			<view class="date">
				<text class="dSpan">月</text>
				<input class="input" focus placeholder="请输入月份" v-model="form.month"/>
			</view>
			<view class="date">
				<text class="dSpan">日</text>
				<input class="input" focus placeholder="请输入日期" v-model="form.day"/>
			</view>
			<view class="date">
				<text class="dSpan">时</text>
				<input class="input" focus placeholder="请输入时辰" v-model="form.hour"/>
			</view>
		</template>
		<template v-if="step===2">
			<view class="want">
				<view class="wantText">性别:</view>
			</view>
			<text v-for="(item,index) in sex" :key="index" @click="selSex(index)" class="sexItem"
			:class="{'sexActive':index==sexIndex}">{{item}}</text>
		</template>
		<view class="btnBox" @click="submit">
			<image src="../../static/img/btn.png" mode="aspectFill" class="btnImg"></image>
			<text class="btnText">确定</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wishList:[],
				radio:0,
				step:2,
				form:{
					year:'',
					month:'',
					day:'',
					hour:''
				},
				sex:['男','女'],
				sexIndex:0
			}
		},
		onLoad() {
			uni.getStorage({
			    key: 'wishList',
			    success: (res)=>{
					console.log(res.data)
			        this.wishList=res.data||[]
			    }
			});
		},
		methods: {
			//选择性别
			selSex(index){
				this.sexIndex=index
				console.log(index)
			},
			//选择日历
			selRadio(index){
				console.log(index)
				if(this.radio===index){
					return
				}
				this.radio=index
			},
			submit(){
				console.log(this.form)
				this.step++
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
		margin-bottom: 58rpx;
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
	.want{
		width:100%;
	}
	.wantText{
		width:183rpx;
		height:51rpx;
		background:rgba(154,57,46,1);
		border-radius:10rpx;
		font-size:36rpx;
		font-family:'book';
		font-weight:400;
		color:rgba(255,255,255,1);
		text-align: center;
		line-height: 51rpx;
		margin-left:70rpx;
		margin-bottom: 29rpx;
	}
	.wantList{
		width:100%;
		box-sizing: border-box;
		padding-left:80rpx;
		display: flex;
		align-items: center;
		margin-bottom:43rpx;
	}
	.wantListItem{
		width:190rpx;
		height:82rpx;
		background:rgba(209,192,165,1);
		border:1px solid rgba(126,107,90,1);
		text-align: center;
		line-height: 82rpx;
		margin-right: 14rpx;
	}
	.selBox{
		width:100%;
		display: flex;
		align-items:center;
		height: 51rpx;
		margin: 36rpx 0;
	}
	.selBoxTxt{
		width:183rpx;
		height:51rpx;
		text-align: center;
		line-height: 51rpx;
		background:rgba(154,57,46,1);
		border-radius:10rpx;
		font-size:36rpx;
		font-family:'book';
		font-weight:400;
		color:rgba(255,255,255,1);
		margin-left:69rpx;
		margin-right:78rpx;
	}
	.yang{
		display: flex;
		align-items: center;
	}
	.one {
		margin-right:80rpx;
	}
	.radio{
		position: relative;
		width:27rpx;
		height:27rpx;
		border:2rpx solid rgba(154,57,46,1);
		border-radius:50%;
		margin-right:21rpx;
	}
	.selRadio .radio::after{
		content: '';
		display: block;
		top:50%;
		left:50%;
		transform: translate(-50%,-50%);
		position: absolute;
		width:15rpx;
		height:15rpx;
		background:rgba(154,57,46,1);
		border-radius:50%;
	}
	.radioTxt{
		font-size:48rpx;
		font-family:STKaitiTC;
		font-weight:400;
		color:rgba(23,23,23,1);
	}
	.date{
		width:100%;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding-left:69rpx;
		margin-bottom: 10rpx;
	}
	.dSpan{
		font-size:48rpx;
		font-family:STKaitiTC;
		font-weight:400;
		color:rgba(29,29,29,1);
		margin-right:14rpx;
	}
	.input{
		width:333rpx;
		height:80rpx;
		border:2rpx solid rgba(126,107,90,1);
	}
	.btnBox{
		position: relative;
		width:564rpx;
		height:81rpx;
		margin-top: 116rpx;
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
		line-height: 81rpx;
		font-size:45rpx;
		font-family:'book';
		font-weight:400;
		color:rgba(220,198,177,1);
	}
	.sexItem{
		display: block;
		width:457rpx;
		height:81rpx;
		border:2rpx solid rgba(126,107,90,1);
		border-radius:10rpx;
		margin-bottom: 49rpx;
		text-align: center;
		line-height: 81rpx;
	}
	.sexActive{
		background:rgba(179,127,93,1);
	}
</style>

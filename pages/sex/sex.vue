<template>
	<view class="main">
		<image src="../../static/img/fua.png" mode="widthFix" class="bgImg"></image>
		<view class="top">
			<image src="../../static/img/border.png" mode="aspectFill" class="borderImg"></image>
			<text class="title">本命星盘  福报无穷</text>
		</view>
		<view class="want">
			<view class="wantText">心中所求:</view>
		</view>
		<view class="wantList" v-if="wishList.length>0">
			<text class="wantListItem" v-for="(item,index) in wishList" :key="index">{{item}}</text>
		</view>
		<template>
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
		<!-- 日历组件 -->
		<zan-calendar
			:date="date" 
			:time="time" 
			:isHourShow="isHourShow" 
			:isMinShow="isMinShow" 
			:show="dateDialog" 
			:lunarType = "lunarType"
			@closeDialog="closeDialog" 
			@confirmDialog="confirmDialog"
			@selType="getType"
		>
		</zan-calendar>
	</view>
</template>

<script>
	import zanCalendar from '@/components/quick-calendar/calendar';
	import pickRegions from '@/components/pick-regions/pick-regions.vue'
	export default {
		components:{
			zanCalendar,
			pickRegions
		},
		data() {
			return {
				date: '2020-05-27',//日期
				time: '0-26',//时间
				isHourShow: false,//是否显示时辰（小时）
				isMinShow: false,//是否显示分钟
				lunarType: 'number', //年月日显示方式
				dateDialog: false,//是否弹出日历组件
				calendar:'',//选中的日期
				type:0,//默认阳历
				endDate:'',
				wishList:[],
				radio:0,
				step:1,
				form:{
					year:'',
					month:'',
					day:'',
					hour:''
				},
				sex:['男','女'],
				sexIndex:0,
				region:[],//默认地址
				region1:[],//默认地址
				defaultRegion:['北京','市辖区','东城区'],
				defaultRegionCode:'110101',
				nameForom:{
					surname:'',
					name:''
				},
				birthday:'',
				hasPhone:false
			}
		},
		computed:{
			regionName(){
				// 转为字符串
				return this.region.map(item=>item.name).join(' ')
			},
			regionName1(){
				// 转为字符串
				return this.region1.map(item=>item.name).join(' ')
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
			this.hasPhone = uni.getStorageSync('phone') ? true : false
		},
		methods: {
		  // 获取手机号码
		  getPhoneNumber: function (e) {
			console.log(e)
			if (e.detail.errMsg == 'getPhoneNumber:fail') {
			  console.log(ErrMsg);
			  uni.showToast({
			      title: '未获取到手机号码',
			      icon:'none'
			  });
			  return false;
			} else if (e.detail.iv == undefined || !e.detail.iv) {
			  uni.showToast({
			      title: '授权失败',
			      icon:'none'
			  });
			  return false;
			} else {
				// 解密手机号接口
				 wx.login({
					success: (res) => {
					  if (res.code) {
						console.log(res)
						this.$api.post('/api/user/get_user_phone',{
							code:res.code,
							iv:e.detail.iv,
							encryptedData:e.detail.encryptedData
						}).then((res)=>{
							console.log(res)
							this.hasPhone=true
							uni.setStorage({
							    key: 'phone',
							    data: '1',
							    success:()=>{
							        this.goMatchDojo()
							    },
								fail:(err)=>{
									console.log(err)
								}
							});
						})
					  }else{
						  
					  }
					},
				})
			}
		  },
			goMatchDojo(){
				if(this.nameForom.name==''||this.nameForom.surname==''){
					uni.showToast({
					    title: '姓氏名讳不能为空',
					    icon:'none'
					});
					return
				}
				this.$api.post('/api/prayer',{
					heart_want:JSON.stringify(this.wishList),
					birthdate:this.type==0?'阳历':'阴历',
					birthday:this.birthday,
					sex:this.sexIndex==0?1:0,
					birthplace:this.region[2].code,
					nowplace:this.region1[2].code,
					surname:this.nameForom.surname,
					name:this.nameForom.name,
					user_id:uni.getStorageSync('user_id')
				}).then((res)=>{
					console.log(res)
					uni.setStorageSync('paryData',res.prayer)
					uni.setStorageSync('name',this.nameForom.surname+this.nameForom.name)
					uni.setStorageSync('first',res.first)
					uni.redirectTo({
						url:'/pages/matchDojo/matchDojo?detail='+JSON.stringify(res.dojo)
					})
				})
			},
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
				uni.setStorageSync('sex',this.sexIndex)
				uni.navigateTo({
					url:"/pages/position/position"
				})
			},
			//示例，展示三种不同的选择调度
			getType(type){
				if(type==='solar'){
					this.type=0
				}else{
					this.type=1
				}
				console.log(this.type)
			},
			showDateDialog: function(type, lunarType) {
				switch(type){
					case 1:
						this.isHourShow = false;
						this.isMinShow = false;
					break;
					case 2:
						this.isHourShow = true;
						this.isMinShow = false;
					break;
					case 3:
						this.isHourShow = true;
						this.isMinShow = true;
					break;
				}
			
				this.dateDialog = true;
				this.lunarType = lunarType;
			},
			//示例，在为确认是就点击了取消，直接关闭弹窗
			closeDialog: function() {
				this.dateDialog = false;
			},
			//示例，点击了确认后的相关操作，并再次点击确认时间后的返回，这里可以写自己的操作了
			confirmDialog: function(e) {
				console.log(e);
				let str=''
				if(e.type==0){
					str='阳历:'+e.t1
					this.birthday=e.t1
				}else{
					str='阴历:'+e.t2
					this.birthday=e.t2
				}
				this.endDate=str
				console.log("选择的日期是：" + e.date);
				console.log("选择的时间是：" + e.time);
				// let a = e.time.split('-')
				// let f = a[0]-0
				// let endF = f<10?('0'+f+':'+'00:00'):(f+':00:00')
				// this.birthday=e.date+' '+endF
				// console.log(this.birthday)
				this.closeDialog()
			},
			// 获取选择的地区
			handleGetRegion(region){
				this.region = region
			},
			handleGetRegion1(region){
				this.region1 = region	
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
		color: #9A392E;
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
	.getPhoneBtn{
		position: absolute;
		left:0;
		top:0;
		width:100%;
		height: 100%;
		opacity: 0;
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
		box-sizing: border-box;
	}
	.sexActive{
		background:rgba(179,127,93,1);
		border:none;
	}
	.calendarBox{
		width:100%;
	}
	.dateInput{
		width:600rpx;
		height: 40rpx;
		padding:6px 0;
		margin-left:69rpx;
		border:2rpx solid rgba(126,107,90,1);
		font-size:36rpx;
		font-weight:400;
		color:#9A392E;
	}
	.plClass{
		font-size:36rpx;
		font-family:'book';
		font-weight:400;
		color:#9A392E;
	}
	.nameBox{
		width:100%;
		padding-left:69rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		margin-bottom: 65rpx;
	}
	.nameTitle{
		width:183rpx;
		height:51rpx;
		background:rgba(154,57,46,1);
		border-radius:10rpx;
		font-size:36rpx;
		font-family:'book';
		font-weight:400;
		color:rgba(255,255,255,1);
		text-align: center;
		line-height:51rpx;
	}
	.nameInput{
		width:371rpx;
		height:81rpx;
		border:2rpx solid rgba(126,107,90,1);
		border-radius:10rpx;
		margin-left:12rpx;
	}
</style>

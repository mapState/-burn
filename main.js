import Vue from 'vue'
import App from './App'

import uniRequest from 'uni-request';
uniRequest.defaults.baseURL = 'https://www.csdc8.top';
// uniRequest.defaults.headers.common['Authorization'] = 'Bearer ' + uni.getStorageSync('token');
uniRequest.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 请求拦截
uniRequest.interceptors.request.use(
	request => {
		request.headers['Authorization'] = 'Bearer ' + uni.getStorageSync('token');
	//配置基本信息
	return request;
	},
	err => {
		uni.showLoading({
			title: '网络故障',
			mask:"true"
		});
	return Promise.reject(err);
});

	//响应拦截
	uniRequest.interceptors.response.use(function(response) {
		console.log(response)
		if(response.status==200&&response.data.code===200){
			return Promise.resolve(response.data.data);
		}else if(response.status===401){
				uni.showToast({
					title:'登录过期',
					icon:"none",
					duration:500
				})
				 uni.clearStorageSync();
				 setTimeout(()=>{
					 uni.reLaunch({
					     url: '/pages/index/index'
					 });
					 return Promise.reject(response.data.data);
				 },1500)
		}
		else{
			uni.showToast({
				title:response.data.message,
				icon:"none"
			})
			return Promise.reject(response.data);
		}
	}, function(error) {
		uni.hideLoading();
		uni.showLoading({
			title: '网络故障...',
			mask:"true"
		});
	//console.log('返回进入拦截失败')
	return Promise.reject(error);
});


Vue.config.productionTip = false
Vue.prototype.$api=uniRequest;

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

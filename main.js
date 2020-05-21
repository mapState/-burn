import Vue from 'vue'
import App from './App'

import uniRequest from 'uni-request';
uniRequest.defaults.baseURL = 'https://app.movetechy.com/';
// uniRequest.defaults.headers.common['Authorization'] = AUTH_TOKEN;
uniRequest.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 请求拦截
uniRequest.interceptors.request.use(
	request => {
	uni.showLoading({
	    title: '加载中',
		mask:"true"
	});
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

	// 响应拦截
	uniRequest.interceptors.response.use(function(response) {
		uni.hideLoading();
		//console.log(response)
	//console.log('返回进入拦截成功')
		if(response.status==200&&response.data.code==0){
			return Promise.resolve(response.data);
		}else if(response.data.code==500){
			uni.showToast({
				title:response.data.msg,
				icon:"none",
				duration:300
			})
			uni.removeStorageSync('token');
			uni.removeStorageSync('userInfo');
			return Promise.resolve(response.data);
			//重新登录
		}else{
			uni.showToast({
				title:response.data.msg,
				icon:"none",
				duration:600
			})
			return Promise.resolve(response.data);
		}
	}, function(error) {
		uni.hideLoading();
		uni.showLoading({
			title: '网络连接中',
			mask:"true"
		});
	//console.log('返回进入拦截失败')
	return Promise.reject(error);
});


Vue.config.productionTip = false
Vue.prototype.$img='https://app.movetechy.com:8080/';

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

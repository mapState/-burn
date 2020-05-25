import Vue from 'vue'
import App from './App'

import uniRequest from 'uni-request';
uniRequest.defaults.baseURL = 'http://121.40.141.26';
// uniRequest.defaults.headers.common['Authorization'] = AUTH_TOKEN;
uniRequest.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 请求拦截
// uniRequest.interceptors.request.use(
// 	request => {
// 	uni.showLoading({
// 	    title: '加载中',
// 		mask:"true"
// 	});
// 	//配置基本信息
// 	return request;
// 	},
// 	err => {
// 		uni.showLoading({
// 			title: '网络故障',
// 			mask:"true"
// 		});
// 	return Promise.reject(err);
// });

	//响应拦截
	uniRequest.interceptors.response.use(function(response) {
		//console.log(response)
	//console.log('返回进入拦截成功')
		if(response.status==200&&response.data.code===200){
			return Promise.resolve(response.data.data);
		}else if(response.data.code==500){
			uni.showToast({
				title:response.data.msg,
				icon:"none",
				duration:1200
			})
			uni.removeStorageSync('token');
			uni.removeStorageSync('userInfo');
			return Promise.reject(response.data.data);
			//重新登录
		}else{
			uni.showToast({
				title:response.data.msg,
				icon:"none",
				duration:1200
			})
			return Promise.reject(response.data.data);
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
Vue.prototype.$api=uniRequest;

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/package/package"],{4743:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=function(){Promise.all([o.e("common/vendor"),o.e("components/uni-popup/uni-popup")]).then(function(){return resolve(o("c727"))}.bind(null,o)).catch(o.oe)},i={components:{uniPopup:n},data:function(){return{limit:10,page:1,leftTitle:"庇佑大家心想事成",rightTitle:"西路财神纳珍天尊",imgUrl:"",status:0,tmpImg:"",width:452,height:650,pixelRatio:2,bgPath:"/static/tmp/pbg.png",codePath:"/static/tmp/eg.png",shareInfo:{title:"",poser:""},packageList:[],detail:{}}},computed:{bgImage:function(){return"url(".concat(this.imgUrl,")")}},onLoad:function(e){var o=this;wx.getSystemInfo({success:function(t){o.width=226*t.pixelRatio,o.height=325*t.pixelRatio,o.pixelRatio=t.pixelRatio}}),this.getShareInfo(),this.getPackage(),this.detail=JSON.parse(e.detail),this.imgUrl=this.detail.main_image,t.getStorage({key:"name",success:function(t){o.leftTitle="庇佑"+t.data+"心想事成",o.rightTitle=o.detail.info.substr(0,8)}}),console.log(e),e.status?this.status=1:this.open()},onShareAppMessage:function(t){return"button"===t.from&&console.log(t.target),{title:this.shareInfo.title,path:"/pages/index/index"}},methods:{jin:function(){var e=t.getStorageSync("paryData").id;this.$api.put("/api/prayer/"+e).then((function(e){t.showToast({title:"上香成功",icon:"none"})}))},getPackage:function(){var t=this;this.$api.get("/api/pray",{params:{limit:this.limit,page:this.page}}).then((function(e){console.log(e),t.packageList=t.packageList.concat(e.data)}))},getShareInfo:function(){var t=this;this.$api.get("/api/user/share").then((function(e){console.log(e),t.shareInfo=e}))},closePoser:function(){this.$refs.poster.close()},getPoster:function(){var e=this;this.$refs.share.close(),t.showLoading({title:"海报生成中..."});var o=this,n=wx.createCanvasContext("myCanvas");n.width=this.width,n.height=this.height;n.width;wx.getImageInfo({src:this.shareInfo.poser,success:function(i){console.log(i),n.drawImage(e.bgPath,0,0,e.width,e.height),n.drawImage(i.path,0,0,226*e.pixelRatio,210*e.pixelRatio),n.setFontSize(12*e.pixelRatio),n.setFillStyle("#935C41"),n.setTextAlign("center");var a=e.shareInfo.title;a.length>16&&(a=a.substr(0,16)+"..."),n.fillText(a,e.width/2,226*e.pixelRatio),n.save(),n.restore(),wx.getImageInfo({src:o.codePath,success:function(i){n.drawImage(o.codePath,13*o.pixelRatio,258*o.pixelRatio,52*o.pixelRatio,52*o.pixelRatio),n.save(),n.restore(),n.draw(),setTimeout((function(){wx.canvasToTempFilePath({canvasId:"myCanvas",x:0,y:0,width:e.width,height:e.height,destWidth:e.width,destHeight:e.height,success:function(o){var n=o.tempFilePath;e.tmpImg=n,console.log(n),t.hideLoading(),e.$refs.poster.open()},fail:function(e){console.log(e),t.hideLoading()}})}),300)}})}})},saveImageToPhotosAlbum:function(){var t=this,e=t.tmpImg;void 0!=e&&""!=e&&wx.saveImageToPhotosAlbum({filePath:e,success:function(t){wx.showToast({title:"已保存到相册",icon:"none",duration:1500,mask:!0})},fail:function(t){console.error(t),console.error("打开设置窗口"),wx.openSetting({success:function(t){console.error(t),t.authSetting["scope.writePhotosAlbum"]?console.error("获取权限成功，再次点击图片保存到相册"):console.error("获取权限失败")}})}})},showShare:function(){this.$refs.share.open()},goBack:function(){t.navigateBack({delta:1})},open:function(){this.$refs.popup.open()},close:function(){this.$refs.popup.close()},wxPay:function(e){var o=this;wx.login({success:function(n){n.code?o.$api.post("/api/wechat/pay",{dojo_id:o.detail.id,pray_id:e,prayer_id:t.getStorageSync("paryData").id}).then((function(e){console.log(e),wx.requestPayment({appId:e.appId,timeStamp:e.timeStamp,nonceStr:e.nonceStr,package:e.package,signType:e.signType,paySign:e.paySign,success:function(e){console.log(e),console.log("支付成功"),t.showToast({title:"支付成功",duration:1200}),o.status=1},fail:function(e){console.log("支付失败"),t.showToast({title:"支付失败",icon:"none",duration:1200})},complete:function(t){}})})):console.log("登录失败！"+n.errMsg)}})}}};e.default=i}).call(this,o("543d")["default"])},5019:function(t,e,o){},"82de":function(t,e,o){"use strict";var n=o("5019"),i=o.n(n);i.a},"894e":function(t,e,o){"use strict";o.r(e);var n=o("ef1a"),i=o("f57a");for(var a in i)"default"!==a&&function(t){o.d(e,t,(function(){return i[t]}))}(a);o("82de");var s,c=o("f0c5"),r=Object(c["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],s);e["default"]=r.exports},cb52:function(t,e,o){"use strict";(function(t){o("e486");n(o("66fd"));var e=n(o("894e"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,o("543d")["createPage"])},ef1a:function(t,e,o){"use strict";var n={uniPopup:function(){return Promise.all([o.e("common/vendor"),o.e("components/uni-popup/uni-popup")]).then(o.bind(null,"c727"))}},i=function(){var t=this,e=t.$createElement;t._self._c},a=[];o.d(e,"b",(function(){return i})),o.d(e,"c",(function(){return a})),o.d(e,"a",(function(){return n}))},f57a:function(t,e,o){"use strict";o.r(e);var n=o("4743"),i=o.n(n);for(var a in n)"default"!==a&&function(t){o.d(e,t,(function(){return n[t]}))}(a);e["default"]=i.a}},[["cb52","common/runtime","common/vendor"]]]);
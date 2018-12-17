var amapFile = require('../../../utils/amap-wx.js');
//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    fromItem:"",
    clock:"https://img.qa.xluob.com/Small%20program/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20181214163845.png",
    fexi:"https://img.qa.xluob.com/Small%20program/xxxq-icon_fenxiang%402x.png",
    xinxi:"https://img.qa.xluob.com/Small%20program/x.png",
    loge:"https://img.qa.xluob.com/Small%20program/avatar2.png",
    jing:"https://img.qa.xluob.com/Small%20program/1.png",
    zan:"https://img.qa.xluob.com/Small%20program/xxxq_icon_dashang%402x.png",
    zhfa:"",
    page:1,
    create_time:"",
    createTime:true
  },
  ckReleaseDetails:function(e){
    console.log(45)
      var usid = e.currentTarget.dataset.usid;
      wx.navigateTo({
       url: '../../details/ReleaseDetails/ReleaseDetails?id='+usid
      })
  },
  //图片放大
  imgtop:function(e){
    var imgList = e.currentTarget.dataset.list;//获取data-list
    var index = e.currentTarget.dataset.index
    var arry = []
    for(var a=0;a<imgList.length;a++){
      var imgList2 = imgList[a].image.s
      arry.push(imgList2)
    }
      wx.previewImage({
        current:arry[index].s,
        urls:arry
       })
  },
  onLoad: function (options) {
    var that = this
    var city = that.setData.city
    var page = Number(that.data.page)
    var id = options.id
      wx.request({
        url: 'https://qb.xluob.com/mini/question/info',
        method:"post",
        data: {
            "id":id
        },
        success: function(res) {
          console.log(res)
           var from = res.data.data.info
            if(JSON.stringify(from.food_cate) == "{}"){
                that.setData({ 
                    createTime:false
                })
            }
            if(from.question_status == 11){
              that.setData({ 
                createTime:false
              })
            }
            if(from.food_cate.expire == 0){
              that.setData({ 
                createTime:false
              })
            }
            else{
                var from = res.data.data.info
                var food_cate = from.food_cate
                var now = res.data.data.now
                // 天数
                var expire = Number(res.data.data.info.food_cate.expire*86400)
                // 发布时间
                var create_time = Number(res.data.data.info.create_time)
                var end = Number(create_time+expire)
                var end2 = new Date(format(end)).getTime()
                //现在
                setInterval(function (){
                  now = now+1
                  var now2 = new Date(format(now)).getTime()
                  var total_end = (end2 - now2)/1000;
                  that.setData({ 
                    create_time:timeCountDown(total_end)
                  })
                },1000)
            }
            function add0(m){return m<10?'0'+m:m }
                function format(timestamp){
                    //shijianchuo是整数，否则要parseInt转换
                    var time = new Date(timestamp*1000);
                    var y = time.getFullYear();
                    var m = time.getMonth()+1;
                    var d = time.getDate();
                    var h = time.getHours();
                    var mm = time.getMinutes();
                    var s = time.getSeconds();
                    return y+'/'+add0(m)+'/'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
            }
            function timeCountDown(total){
                var day = parseInt(total / (24*60*60));//计算整数天数
                var afterDay = total - day*24*60*60;//取得算出天数后剩余的秒数
                var hour = parseInt(afterDay/(60*60));//计算整数小时数
                var afterHour = total - day*24*60*60 - hour*60*60;//取得算出小时数后剩余的秒数
                var min = parseInt(afterHour/60);//计算整数分
                var afterMin = total - day*24*60*60 - hour*60*60 - min*60;//取得算出分后剩余的秒数
                var days = checkTime(day); 
                var hours = checkTime(hour); 
                var minutes = checkTime(min); 
                var seconds = checkTime(afterMin);
                return days+"天"+hours+"时"+minutes+"分"+seconds+"秒"
            }
            function checkTime(i){ //将0-9的数字前面加上0，例1变为01 
              if(i<10)   
              { 
                i = "0" + i; 
              } 
              return i; 
            } 
          // ............
          
          that.setData({ 
              fromItem:from
          })
          wx.hideLoading()
        }
      })
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

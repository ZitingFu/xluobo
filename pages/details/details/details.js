var amapFile = require('../../../utils/amap-wx.js');
var feedbackApi=require('../../../showToast.js');
const config = require('../../../config');
var that;
var set;
const app = getApp()
Page({
  data: {
    find:"https://img.qa.xluob.com/Small%20program/find.png",
    mode: 'aspectFill',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    id:"",
    fromItem:"",
    fx:"https://img.qa.xluob.com/Small%20program/xxxq_icon_fenx.png",
    clock:"https://img.qa.xluob.com/Small%20program/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20181214163845.png",
    fexi:"https://img.qa.xluob.com/Small%20program/xxxq-icon_fenxiang%402x.png",
    xinxi:"https://img.qa.xluob.com/Small%20program/x.png",
    loge:"https://img.qa.xluob.com/Small%20program/avatar2.png",
    jing:"https://img.qa.xluob.com/Small%20program/1.png",
    option1:"https://img.qa.xluob.com/Small%20program/jgxq_icon_weizhi.png",
    sc:"https://img.qa.xluob.com/Small%20program/xxxq_icon_shoucang%402x.png",
    sx:"https://img.qa.xluob.com/Small%20program/icon_yishoucang.png",
    zhfa:"",
    page:1,
    bottom:0,
    activeIndex:"0",
    create_time:"",
    createTime:true,
    name:"",
    followid2:"",
    moneyIndex:"99",
    moneyName:"",
    money:[
      {
        id:0,
        money:"1"
      },
      {
        id:1,
        money:"5"
      },
      {
        id:2,
        money:"10"
      },
      {
        id:3,
        money:"20"
      },
      {
        id:4,
        money:"50"
      },
      {
        id:5,
        money:"100"
      }
    ],
    Fabulous:false,
    moneyOne:false,
    moneyT:true,
    moneyV:"",
    phoneNumber:""
  },
  dialphone:function(e){
    var p = e.currentTarget.dataset.linkphone
    wx.makePhoneCall({
      phoneNumber:p,
    })
  },
  fixmoney(){
    that.setData({ 
        moneyT:true,
        moneyOne:false
    })
  },
  Othermoney(){
     that.setData({ 
        moneyT:false,
        moneyOne:true
    })
  },
  // 自选
  ok(e){
    var that = this
    var name = that.data.moneyV
    var q_id = that.data.id
    app.money(that,name,q_id)
  },
  //固定 
  money(e){
    var that = this
    var index = e.currentTarget.dataset.index
    var name = e.currentTarget.dataset.name
    var q_id = that.data.id
    that.setData({ 
        moneyIndex:index,
        moneyName:name
    })
    app.money(that,name,q_id)
  },
  search1(e){
    var name = e.detail.value;
    that.setData({ 
        moneyV:name
    })
  },
  cancel(){
    that.setData({ 
        Fabulous:false
    })
  },
  onShareAppMessage(res) {
    if (res.from === 'button') {
      var id = res.target.dataset.usid
    }
    return {
      title: '小萝卜公益',
      path: '/pages/index/index/index?id='+id,
      success:function(res){
        console.log(res)
      }
    }
  },
  mapp:function(e){
    var latitude = e.currentTarget.dataset.latitude;
    var longitude = e.currentTarget.dataset.longitude;
    wx.navigateTo({
       url: '../../map/map?latitude='+latitude+"&longitude="+longitude
    })
  },
  bindChange:function(e){
    that = this
    if(!wx.getStorageSync('_t')){
      that.setData({ 
          bottom:0
      })
    }
    else{
      that.setData({ 
          bottom:1
      })
    }
  },
  search:function(e){
    that = this
    wx.request({
      url:config.commentsCreate,
      method:"post",
      data: {
        "content":that.data.name,
        "q_id":that.data.id,
        "type":0,
        "_t":wx.getStorageSync('_t')
      },
      success: function(res) {
        var from = res.data.data.list
         wx.request({
            url:config.questioninfo,
            method:"post",
            data: {
                // "id":268471567,
                "id":that.data.id,
                 "_t":wx.getStorageSync('_t')
            },
            success: function(res) {
                var from = res.data.data.info
                if(from.comments.length==0){
                  that.setData({ 
                    activeIndex:0
                  })
               }else{
                  that.setData({ 
                    activeIndex:1
                  })
               }
             that.setData({ 
                  fromItem:res.data.data.info
              })
            }
        })
      }
    })
  },
  sub:function(){
    that = this
    wx.request({
      url:config.commentsCreate,
      method:"post",
      data: {
        "content":that.data.name,
        "q_id":that.data.id,
        "type":0,
        "_t":wx.getStorageSync('_t')
      },
      success: function(res) {
        var from = res.data.data.list
         wx.request({
            url:config.questioninfo,
            method:"post",
            data: {
                // "id":268471567,
                "id":that.data.id,
                 "_t":wx.getStorageSync('_t')
            },
            success: function(res) {
                var from = res.data.data.info
                if(from.comments.length==0){
                  that.setData({ 
                    activeIndex:0
                  })
               }else{
                  that.setData({ 
                    activeIndex:1
                  })
               }
             that.setData({ 
                  fromItem:res.data.data.info
              })
            }
        })
      }
    })
  },
  ckReleaseDetails:function(e){
      var usid = e.currentTarget.dataset.usid;
      wx.navigateTo({
       url: '../../details/ReleaseDetails/ReleaseDetails?id='+usid
      })
  },
  blur:function(){
     that.setData({ 
        bottom:0
    })
  },
  sear:function(e){
    that = this
    var name = e.detail.value;
    that.setData({ 
        name:name
    })
  },
  imgtop:function(e){
    var imgList = e.currentTarget.dataset.list;//获取data-list
    var index = e.currentTarget.dataset.index
    var arry = []
    for(var a=0;a<imgList.length;a++){
      var imgList2 = imgList[a].image.s
      imgList2.replace("http","https")
      arry.push(imgList2.replace("http","https"))
    }
      wx.previewImage({
        current:arry[index].s,
        urls:arry
       })
  },
  launchApp:function(){
  },
  onLoad: function (options) {
    wx.showShareMenu({
     withShareTicket: true
    })
    that = this
    wx.showLoading({
      title: '正在加载...',
    })
    var city = that.setData.city
    var page = Number(that.data.page)
    var id = options.id
      that.setData({ 
          id:id
      })
      wx.request({
        url:config.questioninfo,
        method:"post",
        data: {
            "id":options.id,
            "_t":wx.getStorageSync('_t')
        },
        success: function(res) {
           var from = res.data.data.info
           if(res.data.flag==1){
            wx.hideLoading()
            feedbackApi.showToast({
              title:"信息已经删除了"
            })
          }
          else{
            if(from.comments.length==0){
                that.setData({ 
                  activeIndex:0
                })
            }else{
                that.setData({ 
                  activeIndex:1
                })
            }
          }
           var fav = res.data.data.fav
           var followd = res.data.data.follow
           if(fav == 99){
              that.setData({ 
                  followid:true
              })
           }
           else{
              that.setData({ 
                 followid:false
              })
           }
           if(followd == 99){
              that.setData({ 
                  followid2:true
              })
           }
           else{
              that.setData({ 
                 followid2:false
              })
           }
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
                var difference = Number(end - now)
                if(difference<0){
                    that.setData({ 
                      createTime:false
                    })
                }
                else{
                  wx.hideLoading()
                  set = setInterval(function (){
                    now = now+1
                    var now2 = new Date(format(now)).getTime()
                    var total_end = (end2 - now2)/1000;
                    that.setData({ 
                      create_time:timeCountDown(total_end)
                    })
                  },1000)
                }
            }
            function add0(m){return m<10?'0'+m:m }
                function format(timestamp){
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
          that.setData({ 
            fromItem:from
          })
          // ............
           wx.hideLoading()
        }
      })
  },
  onUnload:function(){
    clearInterval(set)
  },
  getUserInfo: function(e) {
    that = this
    app.getUserInfo(e,that,app)
  }
})

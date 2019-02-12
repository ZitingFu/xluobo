var amapFile = require('../../../utils/amap-wx.js');
const config = require('../../../config');
var that;
//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
     find:"https://img.qa.xluob.com/Small%20program/find.png",
     mode: 'aspectFill',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    fromItem:"",
    followid:true,
    recent_post:"",
    clock:"https://img.qa.xluob.com/Small%20program/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20181214163845.png",
    fexi:"https://img.qa.xluob.com/Small%20program/xxxq-icon_fenxiang%402x.png",
    xinxi:"https://img.qa.xluob.com/Small%20program/x.png",
    loge:"https://img.qa.xluob.com/Small%20program/avatar2.png",
    jing:"https://img.qa.xluob.com/Small%20program/1.png",
    zan:"https://img.qa.xluob.com/Small%20program/xxxq_icon_dashang%402x.png",
    love:"https://img.qa.xluob.com/Small%20program/jgxq_icon_guanzhu.png",
    phone:"https://img.qa.xluob.com/Small%20program/jgxq_icon_tel.png",
    zhfa:"",
    page:1,
    activeIndex:"0",
    id:"",
    create_time2:""
  },
  onShareAppMessage(res) {
    if (res.from === 'button') {
      var id = res.target.dataset.usid
    }
    return {
      title: '小萝卜公益',
      path: '/pages/details/details/details?id='+id,
      success:function(res){
        console.log(res)
      }
    }
  },
  dialphone:function(e){
    var p = e.currentTarget.dataset.linkphone
    wx.makePhoneCall({
      phoneNumber:p,
    })
  },
  ckdetails:function(e){
    var id = e.currentTarget.dataset.dd;
    wx.navigateTo({
      url: '../../details/details/details?id='+id
    })
  },
  all:function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url:'../ReleaseDetailsAll/ReleaseDetailsAll?id='+id
    })
  },
  //图片放大
  imgtop:function(e){
    var imgList = e.currentTarget.dataset.list;//获取data-list
    var index = e.currentTarget.dataset.index
    var arry = []
    for(var a=0;a<imgList.length;a++){
      var imgList2 = imgList[a].s
      arry.push(imgList2.replace("http","https"))
    }
      wx.previewImage({
        current:arry[index].s,
        urls:arry
       })
  },
  onLoad: function (options) {
    that = this
    var city = that.setData.city
    var page = Number(that.data.page)
    var id = options.id
    that.setData({ 
        id:id
    })
    wx.showLoading({
        title: '正在加载中'
    })
    wx.request({
      url:config.melist,
      method:"post",
      data: {
          "id":id
      },
      success: function(res) {
        var from = res.data.data.info
        var recent_post = res.data.data.recent_post
        var d = []
        var now = res.data.data.now
        for(var a=0;a<recent_post.length;a++){
          var create_time = Number(recent_post[a].create_time)
          var expire = Number(recent_post[a].expire*86400)
          var end = Number(create_time+expire)
          var difference = Math.ceil(Number(end-now)/86400)
          d.push(difference)
        }
        if(recent_post.length==0){
              that.setData({ 
                recent_post:"",
                activeIndex:1
              })
            }
            else{
                that.setData({ 
                  create_time2:d,
                  recent_post:recent_post,
                  activeIndex:0
                })
            }
        var fav = res.data.data.fav
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
        that.setData({ 
            fromItem:from
        })
        wx.hideLoading()
      }
    })
  },
  getUserInfo: function(e) {
   that = this
    app.getUserInfo(e,that,app)
  }
})

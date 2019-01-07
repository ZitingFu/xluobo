var amapFile = require('../../../utils/amap-wx.js');
const config = require('../../../config.js');
var that;
//获取应用实例
const app = getApp()
Page({
  data: {
    MapKey:"6f967ad7e3c309757773579d0f7c90c4",
    city:"",
    loge:"https://img.qa.xluob.com/Small%20program/avatar2.png",
    questionItem:"",
    jing:"https://img.qa.xluob.com/Small%20program/1.png",
    xinxi:"https://img.qa.xluob.com/Small%20program/x.png",
    items: [],
    startX: 0, //开始坐标
    startY: 0,
    page:1
  },
  details:function(e){
     var id = e.currentTarget.dataset.id
    wx.navigateTo({
         url:'../../details/details/details?id='+id
    })
  },
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
  onLoad: function (e) {
    that = this;
    wx.request({
      url:config.meCollection,
      method:"post",
      data:{
       "_t":wx.getStorageSync('_t'),
       "pn":1 
      },
      success:function(res){
       console.log(res)
       var question = res.data.data.question
       that.setData({
        questionItem:question
       })
      }
    })
  },
   // 上拉
  onReachBottom: function(){
    that = this;
    var city = that.data.city
    var page = Number(that.data.page)+ 1
    wx.showLoading({
      title: '正在加载中'
    })
    setTimeout(function(){
        wx.request({
          url:config.meCollection,
          method:"post",
          data:{
           "_t":wx.getStorageSync('_t'),
           "pn":page 
          },
          success:function(res){
           var question = res.data.data.question
          if(question.length<1){
            // setTimeout(function(){
            //   wx.showModal({
            //     content:"没有数据了"
            //   })
            //   wx.hideLoading()
            // },1000)
          }
          var from = that.data.questionItem;
          for (var i = 0; i < question.length; i++) {
            from.push(question[i]);
          }
           that.setData({
            questionItem:from
           })
            wx.hideLoading()
          }
        })
    },900)
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

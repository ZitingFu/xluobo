var amapFile = require('../../../utils/amap-wx.js');
const config = require('../../../config.js');
var that;
//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    MapKey:"6f967ad7e3c309757773579d0f7c90c4",
    city:"",
    notime:"https://img.qa.xluob.com/Small%20program/Notime.png",
    fexi:"https://img.qa.xluob.com/Small%20program/xxxq-icon_fenxiang%402x.png",
    xinxi:"https://img.qa.xluob.com/Small%20program/x.png",
    jing:"https://img.qa.xluob.com/Small%20program/1.png",
    activeIndex:"0",
    type_id:"",
    TypeItem:"",
    listItem:"",
    fromItem:"",
    sjx:"https://img.qa.xluob.com/Small%20program/icon_xia_nor.png",
    sjs:"https://img.qa.xluob.com/Small%20program/5.png",
    loge:"https://img.qa.xluob.com/Small%20program/avatar2.png",
    zhfa:"",
    inputShowed: false,
    inputVal:"",
    indicatorColor:"#fda249",
    indicator:"#fff",
    page:1,
    boolean:false,
    boolean1:false,
    boolean3:false,
    boolean2:false,
    currentTab:0,
    currentTab2:0,
    number:"",
    open_num:8,
    index: 0,
    TypeItem3:"",
    genreImages:"",
    num_:1,
    start:"",
    end:"",
    multiArray: [
          ['全部市', '全部市'],
          ['全部省', ], 
          ['全部区',],
    ],
    multiIndex:[0, 0, 0],typeLIst:"信息类型",
    place:"场所",
    na:""
  },
  bindMultiPickerChange(e) {
    that = this;
    app.bindMultiPickerChange(e,that)
  },
  bindMultiPickerColumnChange(e) {
    that = this;
    app.bindMultiPickerColumnChange(e,that)
  },
  ckdetails:function(e){
    var id = e.currentTarget.dataset.usid;
     wx.navigateTo({
      url: '../../details/ReleaseDetails/ReleaseDetails?id='+id
    })
  },
  useid:function(e){
    that = this
     var id = e.currentTarget.dataset.id;
     that.setData({
        num_:id
     })
     wx.request({
      url:config.Firstclassify,
      method:"post",
      data:{
        "id":id
      },
      success: function(res) {
        console.log(res)
       var site = res.data.data.genre
        that.setData({
            id:1,
            TypeItem3:site
        })
      }
    })
  },
  open:function(that){
    console.log(123)
    that = this
    app.open(that)
    that.setData({ 
        boolean2:false,
        boolean3:false
    })
  },
  open1:function(that){
    that = this
     that.setData({ 
          boolean2:!that.data.boolean2,
          boolean:false,
          boolean3:false
      })
     if(that.data.boolean2 == true){
        that.setData({
           open_num:1
        })
     }
     else{
        that.setData({
             open_num:99
          })
     }
  },
  open3:function(that){
    console.log(456)
    that = this
    app.open3(that)
    that.setData({ 
        boolean:false,
        boolean2:false
    })
  },
  Reset:function(){
    that.setData({
        start:"",
        end:""
      })
  },
  sub:function(){
    wx.showLoading({
        title: '正在加载...',
    })
    that = this
    setTimeout(function(){
      wx.request({
        url:config.organizationQuestion,
        method:"post",
        data: {
          "pn":1,
          "genre":that.data.number,
          "site":that.data.type_id,
          "start":that.data.start,
          "end":that.data.end,
          "_t":wx.getStorageSync('_t')
        },
        success: function(res) {
          console.log(res)
         var genre = res.data.data.genre
           that.setData({ 
              genreImages:genre
            })
           that.setData({
            boolean2:false
          })
          wx.hideLoading()  
        }
      })
    },1000)
  },
  //日期
  bindDateChange(e) {
    that = this
    var na = e.currentTarget.dataset.na
     that.setData({
        na:na
      })
    if(na==0){
      that.setData({
        start:e.detail.value
      })
    }
    else if(na==1){
      that.setData({
          end:e.detail.value
      })
    }
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
  ckdetails:function(e){
    var id = e.currentTarget.dataset.usid;
      wx.navigateTo({
        url: '../../details/details/details?id='+id
      })
  },
  Type_top_number:function(e){
    that = this
    app.Type_top_number(e,that)
    that.setData({ 
      typeLIst:e.currentTarget.dataset.name
    })
  },
  Type_top:function(e,that){
    that = this
    app.Type_top(e,that)
    that.setData({ 
      place:e.currentTarget.dataset.name
    })
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载...',
    })
    that = this
    var page = Number(that.data.page)
    var city = app.data.city
    var type_id = app.data.type_id
     //请求一级分类数据
      wx.request({
        url:config.Firstclassify,
        method:"post",
        data: {
          "id":0,
          "_t":wx.getStorageSync('_t')
        },
        success: function(res) {
         var genre = res.data.data.genre
           that.setData({ 
              genreImages:genre
            })
        }
      })
    wx.request({
      url:config.Firstclassify,
      method:"post",
      data:{
        "id":1
      },
      success: function(res) {
       var site = res.data.data.genre
        that.setData({
            id:1,
            TypeItem3:site
        })
      }
    })
    //所有场所
    wx.request({
      url:config.Allplace,
      method:"post",
      success: function(res) {
       var site = res.data.data.site
        that.setData({ 
            TypeItem:site
        })
      }
    })
    //机构列表
     wx.request({
      url:config.genrelist,
      method:"post",
      data: {
        "genre":1,
        "code":city,
        "site":"",
        "pn":page
      },
      success: function(res) {
       var list = res.data.data.list
        that.setData({ 
          listItem:list
        })
        wx.hideLoading()
      }
    })
  },
   // 上拉
  onReachBottom: function(){
    that = this;
    var city = that.data.city
    var page = Number(that.data.page)+ 1
    // 显示加载图标
    wx.showLoading({
      title: '正在加载中'
    })
    setTimeout(function(){
      console.log(name)
        wx.request({
          url:config.genrelist,
          method:"post",
          data: {
            "_t":wx.getStorageSync('_t'),
            "genre":that.data.number,
            "site":that.data.type_id,
            "start":that.data.start,
            "end":that.data.end,
            "pn":page
          },
          success: function(res) {
           var from = that.data.listItem
            for (var i = 0; i < res.data.data.list.length; i++) {
                from.push(res.data.data.list[i]);
              }
              that.setData({ 
                  listItem:from,
                  page:page
              })
            wx.hideLoading()
          }
        })
    },1500)
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

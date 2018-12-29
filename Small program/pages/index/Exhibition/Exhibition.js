var amapFile = require('../../../utils/amap-wx.js');
const config = require('../../../config');
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
    currentTab:0,
    currentTab2:0,
    number:"",
    open_num:8,
    index: 0,
    TypeItem3:"",
    citynamelist:"",
    multiArray: [
          ['全部市', '全部市'],
          ['全部省', ], 
          ['全部区',],
    ],
    multiIndex:[0, 0, 0],
    _t:"",
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
  open:function(that){
    that = this
    app.open(that)
  },
  open1:function(that){
    that = this
    app.open1(that)
  },
  open3:function(that){
    that = this
    app.open3(that)
  },
  Type_top_number:function(e){
    that = this
    app.Type_top_number(e,that)
  },
  Type_top:function(e,that){
     that = this
     app.Type_top(e,that)
  },
  ckdetails:function(e){
    var id = e.currentTarget.dataset.usid;
      wx.navigateTo({
        url: '../../details/details/details?id='+id
      })
  },
  imgtop:function(e){
    var imgList = e.currentTarget.dataset.list;//获取data-list
    var index = e.currentTarget.dataset.index
    var arry = []
    for(var a=0;a<imgList.length;a++){
      var imgList2 = imgList[a].s
      arry.push(imgList2)
    }
      wx.previewImage({
        current:arry[index].s,
        urls:arry
       })
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载...',
    })
    that = this
    var city = that.setData.city
    var page = Number(that.data.page)
    var _t = app.data._t
    var citynamelist =  app.data.citynamelist
    var citycode = app.data.citycode
    var city = app.data.city
    var type_id = app.data.type_id
    that.setData({
      type_id:type_id,
      _t:_t,
      citynamelist:citynamelist,
      citycode:citycode,
      multiArray:[
          citynamelist,
          ["全部省","北京市"], 
          ["全部区"],
        ]
    })
    wx.request({
      url:config.Firstclassify,
      method:"post",
      data:{
        id:5
      },
      success: function(res) {
       var site = res.data.data.genre
        that.setData({
            id:5,
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
          "genre":5,
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
    var that = this;
    var city = that.data.city
    var page = Number(that.data.page)+ 1
    // 显示加载图标
    wx.showLoading({
      title: '正在加载中'
    })
    setTimeout(function(){
      wx.request({
        url:config.genrelist,
        method:"post",
        data: {
           "code":"",
           "site":"",
           "sort":"",
           "pn":page
        },
        success: function(res) {
          console.log(res)
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

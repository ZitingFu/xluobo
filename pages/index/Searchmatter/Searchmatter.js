var amapFile = require('../../../utils/amap-wx.js');
const config = require('../../../config');
var that;
//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    mode: 'aspectFill',
    MapKey:"6f967ad7e3c309757773579d0f7c90c4",
    city:"",
    notime:"https://img.qa.xluob.com/Small%20program/Notime.png",
    activeIndex:"0",
    TypeItem:"",
    listItem:"",
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
    type_id:"",
    city:"",
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
    place:"场所",
    mtype:"物品类型",
    create_time2:""
  },
  onShareAppMessage(res) {
    if (res.from === 'button') {
      var id = res.target.dataset.usid
    }
    return {
      title: '小萝卜公益',
      path: '/pages/index/index/index?id='+id,
      success:function(res){
      }
    }
  },
  ckReleaseDetails:function(e){
      var usid = e.currentTarget.dataset.id;
      wx.navigateTo({
       url: '../../details/ReleaseDetails/ReleaseDetails?id='+usid
      })
  },
  scroll: function (e) {
    var that = this;
    that.setData({
      scrollY: e.detail.scrollTop
    })
  },
  lookup:function(){
    wx.navigateTo ({
      url:'../../index/lookup/lookup?id='+4
    })
  },
  bindMultiPickerChange(e) {
    var genre = "4"
    that = this;
    app.bindMultiPickerChange(e,that,genre)
  },
  bindMultiPickerColumnChange(e) {
    that = this;
    app.bindMultiPickerColumnChange(e,that)
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
     var genre = "4"
    that = this
    app.Type_top_number(e,that,genre)
  },
  Type_top:function(e,that){
    var genre = "4"
     that = this
     app.Type_top(e,that,genre)
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
      arry.push(imgList2.replace("http","https"))
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
    var citynamelist =  app.data.citynamelist
    var citycode = app.data.citycode
    var city = app.data.city
    that.setData({
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
        id:4
      },
      success: function(res) {
       var site = res.data.data.genre
        that.setData({
            id:4,
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
        "genre":4,
        "code":city,
        "site":"",
        "pn":page
      },
      success: function(res) {
        var from = res.data.data.list
        var d = []
        var now = res.data.data.now
        for(var a=0;a<from.length;a++){
          var create_time = Number(from[a].create_time)
          var expire = Number(from[a].expire*86400)
          var end = Number(create_time+expire)
          var difference = Math.ceil(Number(end-now)/86400)
          d.push(difference)
        }
        that.setData({
          create_time2:d,
          listItem:from
        })
        wx.hideLoading()
      }
    })
  },
  onReachBottom: function(){
    var genre = "4"
    that = this;
    app.onReachBottom(that,genre)
  },
  onPullDownRefresh: function(){
    that = this;
    wx.request({
      url:config.Firstclassify,
      method:"post",
      data:{
        id:4
      },
      success: function(res) {
       var site = res.data.data.genre
        that.setData({
            id:4,
            TypeItem3:site
        })
      wx.stopPullDownRefresh();
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

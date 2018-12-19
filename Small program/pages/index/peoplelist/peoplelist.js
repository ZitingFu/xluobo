var amapFile = require('../../../utils/amap-wx.js');
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
    boolean3:false,
    boolean2:false,
    currentTab:0,
    number:0,
    open_num:8,
    index: 0,
    multiIndex: [0, 0, 0],
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部'
  },
  //事件处理函数
  bindViewTap: function(options){
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  //图片放大
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
  // 机构类型打开/关闭
  open:function(){
     var that = this
     that.setData({ 
          boolean:!that.data.boolean,
          boolean3:false
      })
     if(that.data.boolean == true){
        that.setData({
           open_num:0
        })
     }
     else{
        that.setData({
             open_num:99
          })
     }
  },
  open1:function(){
     var that = this
     that.setData({ 
          boolean2:!that.data.boolean2,
          boolean:false
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
  open3:function(){
    var that = this
     that.setData({ 
          boolean:false,
          boolean3:!that.data.boolean3
      })
      if(that.data.boolean3 == true){
        that.setData({
           open_num:2
        })
     }
     else{
        that.setData({
             open_num:99
          })
     }
  },
  Type_top_number:function(e){
    var that = this
    app.Type_top_number(e,that)
  },
  Type_top:function(e,that){
     var that = this
     app.Type_top(e,that)
  },
  onLoad: function (options) {
    var that = this
    var city = that.setData.city
    var page = Number(that.data.page)
    setTimeout(function(){
      var _t = app.data._t
      var citynamelist =  app.data.citynamelist
      var citycode = app.data.citycode
      var city = app.data.city
      that.setData({
        _t:_t,
        citynamelist:citynamelist,
        citycode:citycode,
        multiArray:[
              citynamelist,
            ["全部省","北京市"], 
            [],
          ]
      })
      //所有场所
      wx.request({
        url: 'https://qb.xluob.com/mini/genre/list',
        method:"post",
        data:{
          id:1
        },
        success: function(res) {
          // console.log(res)
         var site = res.data.data.genre
          that.setData({
              id:1,
              TypeItem:site
          })
        }
      })
      wx.request({
        url: 'https://qb.xluob.com/mini/question/search',
        method:"post",
        data: {
           "code":city,
           "site":"",
           "sort":"",
           "pn":page
        },
        success: function(res) {
         var list = res.data.data.list
          that.setData({ 
            listItem:list
          })
        }
      })
      wx.hideLoading()
    },1500)
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
          url: 'https://qb.xluob.com/mini/question/search',
          method:"post",
          data: {
             "code":"",
             "site":"",
             "sort":"",
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
          }
        })
         wx.hideLoading()
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

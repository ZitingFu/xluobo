var amapFile = require('../../../utils/amap-wx.js');
const config = require('../../../config.js');
var that;
//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    find:"https://img.qa.xluob.com/Small%20program/find.png",
    MapKey:"6f967ad7e3c309757773579d0f7c90c4",
    city:"",
    notime:"https://img.qa.xluob.com/Small%20program/Notime.png",
    fexi:"https://img.qa.xluob.com/Small%20program/xxxq-icon_fenxiang%402x.png",
    xinxi:"https://img.qa.xluob.com/Small%20program/x.png",
    jing:"https://img.qa.xluob.com/Small%20program/1.png",
    activeIndex:"0",
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
    place:"场所",
    mtype:"物品类型",
    id:"",
    name:""
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
  search:function(e){
      var that = this
      var name = e.detail.value;
      that.setData({ 
              name:name
      })
      wx.request({
        url:config.genrelist,
        method:"post",
        data: {
          "key":name,
          "genre":that.data.id,
          "pn":1
        },
        success: function(res) {
          var from = res.data.data.list
          if(from.length==0){
              that.setData({ 
                 listItem:"",
                activeIndex:1
              })
            }
          else{
              that.setData({ 
                listItem:from,
                activeIndex:0
              })
          }
          wx.hideLoading()
        }
      })
  },
  cancel:function(){
     var that = this
     var id = that.data.id
     if(id==1){
        wx.navigateTo({
          url: '../../index/peoplelist/peoplelist'
        })
     }
     if(id==2){
        wx.navigateTo({
          url: '../../index/matterlist/matterlist'
        })
     }
     if(id==3){
        wx.navigateTo({
          url: '../../index/Searchpeople/Searchpeople'
        })
     }
     if(id==4){
        wx.navigateTo({
          url: '../../index/Searchmatter/Searchmatter'
        })
     }
     if(id==5){
        wx.navigateTo({
          url: '../../index/Exhibition/Exhibition'
        })
     }
    wx.switchTab ({
      url:'../../index/index/index'
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
  ckdetails:function(e){
    var id = e.currentTarget.dataset.usid;
      wx.navigateTo({
        url: '../../details/details/details?id='+id
      })
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载...',
    })
    var that = this
    var city = that.setData.city
    var page = Number(that.data.page)
    var citynamelist =  app.data.citynamelist
    var citycode = app.data.citycode
    that.setData({ 
        id:options.id
    })
    wx.request({
      url:config.genrelist,
      method:"post",
      data: {
        "genre":options.id,
        "code":city,
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
  onReachBottom: function(){
    var that = this;
    var city = that.data.city
    var page = Number(that.data.page)+ 1
    wx.showLoading({
      title: '正在加载中'
    })
    setTimeout(function(){
      if(that.data.name.length==0){
        wx.request({
          url:config.genrelist,
          method:"post",
          data: {
              "genre":that.data.id,
              "code":city,
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
      }
      else{
        wx.request({
          url:config.genrelist,
          method:"post",
          data: {
            "key":that.data.name,
            "genre":that.data.id,
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
      }
    },1500)
  },
  onPullDownRefresh: function(){
    that = this;
     wx.request({
      url:config.Firstclassify,
      method:"post",
      data:{
        "id":2
      },
      success: function(res) {
       var site = res.data.data.genre
        that.setData({
            id:2,
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

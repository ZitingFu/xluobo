var amapFile = require('../../../utils/amap-wx.js');
const config = require('../../../config');
var that;
//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    listItem:"",
    activeIndex:"0",
    seet:"0",
    namee:"",
    namelist:"",
    input:"",
    loge:"https://img.qa.xluob.com/Small%20program/avatar2.png",
    page:1,
    clear_i:false
  },
   scroll: function (e) {
    var that = this;
    that.setData({
      scrollY: e.detail.scrollTop
    })
  },
  btn:function(e){
    that = this
    var index = e.currentTarget.dataset.ia
    var name = that.data.namelist[index]
    wx.request({
      url:config.ReleaseList,
      method:"post",
      data: {
         "key":name
      },
      success: function(res) {
       var list = res.data.data.list
        that.setData({ 
          listItem:list,
          seet:"1"
        })
        if(list.length==0){
            that.setData({ 
              listItem:"",
              activeIndex:1
            })
         }
        else{
            that.setData({
              listItem:list,
              activeIndex:0
            })
        }
        wx.hideLoading()
      }
    })
  },
  search:function(e){ 
    function uniq(array){
        var temp = [];
        for(var i = 0; i < array.length; i++) {
            if(array.indexOf(array[i]) == i){
                temp.push(array[i])
            }
        }
        return temp;
    }
    var that = this
    var arry = []
    var name = e.detail.value;
    that.setData({ 
      input:name
    })
    if(that.data.namelist==""){
      var namelist = []
    }
    else{
      var namelist = that.data.namelist
    }
    namelist.unshift(name)
    that.setData({ 
      namelist:namelist
    })
    namelist = that.data.namelist
    wx.setStorageSync('name',uniq(namelist))
    wx.showLoading({
      title: '正在加载...',
    })
    wx.request({
      url:config.ReleaseList,
      method:"post",
      data: {
         "key":name,
         "_t":wx.getStorageSync('_t')
      },
      success: function(res) {
       var list = res.data.data.list
        that.setData({ 
          listItem:list,
          seet:"1"
        })
        if(list.length==0){
            that.setData({ 
              listItem:"",
              activeIndex:1
            })
         }
        else{
            that.setData({
              listItem:list,
              activeIndex:0
            })
        }
        wx.hideLoading()
      }
    })
  },
  clearSearchStorage:function(){
    wx.setStorageSync('name','')
    var num = wx.getStorageSync('name')
    if(num.length>0){
      that.setData({  
        clear_i:true
      })
    }
    else{
      that.setData({  
        clear_i:false
      })
    }
    that.setData({ 
        namelist:"",
    })
  },
  cancel:function(e){
    wx.switchTab ({
      url:'../../Release/Release/Release'
    })
  },
  ckdetails:function(e){
     var id = e.currentTarget.dataset.usid
     wx.navigateTo({
        url: '../../details/ReleaseDetails/ReleaseDetails?id='+id
      })
  },
  onLoad: function (options) { 
      // wx.clearStorageSync()
    that = this
    var num = wx.getStorageSync('name')
    if(num.length>0){
      that.setData({  
        clear_i:true
      })
    }
    if(num.length>14){
        num.pop()
        wx.setStorageSync('name',num)
    }
    this.setData({  
      namelist:wx.getStorageSync('name')
    })

  },
   // 上拉
  onReachBottom: function(){
    that = this;
    wx.showLoading({
      title: '正在加载...',
    })
     var page = Number(that.data.page)+ 1
    setTimeout(function(){ 
      wx.request({
        url:config.ReleaseList,
        method:"post",
        data: {
           "key":that.data.name,
           "pn":page
        },
        success: function(res) {
         var list = res.data.data.list
          var from = that.data.listItem;
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
})

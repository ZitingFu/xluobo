var amapFile = require('../../../utils/util.js');
const config = require('../../../config.js');
var sliderWidth = 96; 
var that;
//index.js
//获取应用实例
const app = getApp()
Page({
    data: {
        page:1,
        input:"",
        xinxi:"https://img.qa.xluob.com/Small%20program/x.png",
        fexi:"https://img.qa.xluob.com/Small%20program/xxxq-icon_fenxiang%402x.png",
        jing:"https://img.qa.xluob.com/Small%20program/1.png",
        fromItem1:"",
        fromItem2:"",
        fromItem3:"",
        fromItem4:"",
        fromItem5:"",
        loge:"https://img.qa.xluob.com/Small%20program/avatar2.png",
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        navData:[
            {   
                id:1,
                fromItem:"12",
                text: '寻人'
            },
            {   
                id:2,
                fromItem:"123",
                text: '寻物'
            },
            {
                id:3,
                fromItem:"sds",
                text: '认人'
            },
            {   
                id:4,
                fromItem:"ds",
                text: '认领'
            },
            {   
                id:5,
                fromItem:"ds",
                text: '好人风采'
            }

        ],
        tabs: ["寻人", "寻物", "认人","认领","好人风采"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft:18.5
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
    Back:function () { 
       wx.navigateTo({
            url:'../index/index'
        })
    },  
    cancel:function(){
        that = this
        var text = ""
        that.setData({ 
            input:text
        })
    },
    search:function(e){
        var that = this
        var name = e.detail.value;
        wx.request({
          url:config.searchpeople,
          method:"post",
          data: {
            "name":name,
            "pn":1,
            "type":1
          },
          success: function(res) {
            var from = res.data.data.list
            that.setData({ 
                fromItem1:from
            })
            wx.hideLoading()
          }
        })
    },
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    },
    //事件处理函数
    onLoad: function (e) {
        that = this;
        wx.showLoading({
          title: '正在加载中'
        })
        //寻人
        wx.request({
            url:config.searchpeople,
            method:"post",
            data: {
              "pn":1,
              "type":1
            },
            success: function(res) {
              var from = res.data.data.list
              that.data.navData[0].fromItem = from
              that.setData({ 
                  fromItem1:from
              })
            }
        })
        // 寻物
        wx.request({
          url:config.searchpeople,
          method:"post",
          data: {
              "pn":1,
              "type":2
            },
          success: function(res) {
            var from = res.data.data.list
            that.setData({ 
                fromItem2:from
            })
          }
        })
        // 认人
        wx.request({
          url:config.searchpeople,
          method:"post",
          data: {
              "pn":1,
              "type":3
            },
          success: function(res) {
            var from = res.data.data.list
            that.setData({ 
                fromItem3:from
            })
          }
        })
        // 认领
        wx.request({
          url:config.searchpeople,
          method:"post",
          data: {
              "pn":1,
              "type":4
            },
          success: function(res) {
            var from = res.data.data.list
            that.setData({ 
                fromItem4:from
            })
            wx.hideLoading()
          }
        })
        // 好人风采
        wx.request({
          url:config.searchpeople,
          method:"post",
          data: {
              "pn":1,
              "type":5
            },
          success: function(res) {
            var from = res.data.data.list
            that.setData({ 
                fromItem5:from
            })
          }
        })
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
        wx.getSystemInfo({
            success: (res) => {
                this.setData({
                    pixelRatio: res.pixelRatio,
                    windowHeight: res.windowHeight,
                    windowWidth: res.windowWidth
                })
            },
        })  
        wx.hideLoading()      
    },
    onReachBottom:function(){
        wx.showLoading({
          title: '正在加载中'
        })
        that = this;
        var page = Number(that.data.page)
        page = page + 1  
        var index = that.data.activeIndex
        setTimeout(function(){
            if(index==0){
                wx.request({
                    url:config.searchpeople,
                    method:"post",
                    data: {
                        "pn":page,
                        "type":1
                    },
                    success: function(res) {
                      var from = that.data.fromItem1;
                      for (var i = 0; i < res.data.data.list.length; i++) {
                        from.push(res.data.data.list[i]);
                      }
                      that.setData({ 
                          fromItem1:from,
                          page:page
                      })
                       wx.hideLoading()
                    }
                })
            }
            else if(index==1){
                wx.request({
                    url:config.searchpeople,
                    method:"post",
                    data: {
                        "pn":page,
                        "type":2
                    },
                    success: function(res) {
                      var from = that.data.fromItem1;
                      for (var i = 0; i < res.data.data.list.length; i++) {
                        from.push(res.data.data.list[i]);
                      }
                      that.setData({ 
                          fromItem2:from,
                          page:page
                      })
                       wx.hideLoading()
                    }
                })
            }
            else if(index==2){
                wx.request({
                    url:config.searchpeople,
                    method:"post",
                    data: {
                        "pn":page,
                        "type":3
                    },
                    success: function(res) {
                      var from = that.data.fromItem1;
                      for (var i = 0; i < res.data.data.list.length; i++) {
                        from.push(res.data.data.list[i]);
                      }
                      that.setData({ 
                          fromItem3:from,
                          page:page
                      })
                       wx.hideLoading()
                    }
                })
            }
            else if(index==3){
                wx.request({
                    url:config.searchpeople,
                    method:"post",
                    data: {
                        "pn":page,
                        "type":4
                    },
                    success: function(res) {
                      var from = that.data.fromItem1;
                      for (var i = 0; i < res.data.data.list.length; i++) {
                        from.push(res.data.data.list[i]);
                      }
                      that.setData({ 
                          fromItem4:from,
                          page:page
                      })
                       wx.hideLoading()
                    }
                }) 
            }
            else if(index==4){
                wx.request({
                    url:config.searchpeople,
                    method:"post",
                    data: {
                        "pn":page,
                        "type":5
                    },
                    success: function(res) {
                      var from = that.data.fromItem1;
                      for (var i = 0; i < res.data.data.list.length; i++) {
                        from.push(res.data.data.list[i]);
                      }
                      that.setData({ 
                          fromItem5:from,
                          page:page
                      })
                       wx.hideLoading()
                    }
                })
            }
        },1000)
    }
})
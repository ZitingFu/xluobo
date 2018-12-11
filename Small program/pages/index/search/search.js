var amapFile = require('../../../utils/util.js');
//index.js
//获取应用实例
const app = getApp()
Page({
    data: {
        input:"",
        xinxi:"https://img.qa.xluob.com/Small%20program/x.png",
        fexi:"https://img.qa.xluob.com/Small%20program/xxxq-icon_fenxiang%402x.png",
        jing:"https://img.qa.xluob.com/Small%20program/1.png",
        fromItem:"",
        loge:"https://img.qa.xluob.com/Small%20program/avatar2.png",
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        navData:[
            {   
                id:1,
                text: '寻人'
            },
            {   
                id:2,
                text: '寻物'
            },
            {
                id:3,
                text: '认人'
            },
            {   
                id:4,
                text: '认领'
            },
            {   
                id:5,
                text: '好人风采'
            }

        ],
        currentTab: 0,
        navScrollLeft: 0
    },
    Back:function () { 
        console.log(123)
       wx.navigateTo({
            url:'../index/index'
        })
    },  
    cancel:function(){
        var that = this
        var text = ""
        that.setData({ 
            input:text
        })
    },
    search:function(e){
        var that = this
        var name = e.detail.value;
        console.log(name)
        wx.request({
          url: 'https://qb.xluob.com/mini/Benefit/searchbytype',
          method:"post",
          data: {
            "name":name,
            "pn":1,
            "type":1
          },
          success: function(res) {
            var from = res.data.data.list
            that.setData({ 
                fromItem:from
            })
            wx.hideLoading()
          }
        })
    },
    //事件处理函数
    onLoad: function (e) {
        wx.showLoading({
          title: '正在加载中'
        })
        //寻人
        var that = this
        wx.request({
          url: 'https://qb.xluob.com/mini/Benefit/searchbytype',
          method:"post",
          data: {
              "pn":1,
              "type":1
          },
          success: function(res) {
            console.log(res)
            var from = res.data.data.list
             that.setData({ 
                fromItem:from
              })
             wx.hideLoading()
          }
        })
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
    },
    switchNav(event){
        var cur = event.currentTarget.dataset.current; 
        //每个tab选项宽度占1/5
        var singleNavWidth = this.data.windowWidth / 5;
        //tab选项居中                            
        this.setData({
            navScrollLeft: (cur - 2) * singleNavWidth
        })      
        if (this.data.currentTab == cur) {
            return false;
        } else {
            this.setData({
                currentTab: cur
            })
        }
    },
    switchTab(event){
        wx.showLoading({
          title: '正在加载中'
        })
        var that = this
        var cur = event.detail.current;
        var number = Number(event.detail.current)+1
        var singleNavWidth = this.data.windowWidth / 5;
        this.setData({
            currentTab: cur,
            navScrollLeft: (cur - 2) * singleNavWidth
        });
         wx.request({
          url: 'https://qb.xluob.com/mini/Benefit/searchbytype',
          method:"post",
          data: {
              "pn":1,
              "type":number
          },
          success: function(res) {
            var from = res.data.data.list
             that.setData({ 
                fromItem:from
              })
             wx.hideLoading()
          }
        })
    }
})
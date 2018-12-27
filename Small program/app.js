const config = require('config');
// const util = require('utils/utils');
App({
  data:{
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    MapKey:"6f967ad7e3c309757773579d0f7c90c4",
    city:"",
    _t:"",
    session_key:"",
    index: 0,
    citynamelist:"",
    multiArray: [
          ['全部市', '全部省'],
          ['全部省', '全部省'], 
          ['全部区', ' '],
    ],
    multiIndex: [0, 0, 0],
    citycode:"",
    province:"",
    citycode:"",
    provincede:"",
    resede:"",
    newcity:"",
    newresede:"",
    newarea:""
  },
  bindMultiPickerChange(e,that) {
    var multiIndex = []
    multiIndex.push(that.data.newcity)
    multiIndex.push(that.data.newresede)
    multiIndex.push(that.data.newarea)
    wx.showLoading({
      title: '正在加载...',
    })
      var site = that.data.type_id
      var sort = that.data.number
      if(multiIndex[2] !== undefined){
        setTimeout(function(){
          wx.request({
            url:config.genrelist,
            method:"post",
            data: {
               site:site,
               code:multiIndex[2],
               sort:sort
            },
            success: function(res) {
              var list = res.data.data.list
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
            }
          })
           wx.hideLoading()
        },1000)
      }
      else{
        if(multiIndex[1] !== undefined){
          setTimeout(function(){
            wx.request({
              url:config.genrelist,
              method:"post",
              data: {
                  "site":site,
                  "code":multiIndex[1],
                  "sort":sort
              },
              success: function(res) {
                var list = res.data.data.list
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
              }
            })
           wx.hideLoading()
          },1000)
        }
        else{
          setTimeout(function(){
            wx.request({
              url:config.genrelist,
              method:"post",
              data: {
                  "site":site,
                  "code":multiIndex[0],
                  "sort":sort
              },
              success: function(res) {
               var list = res.data.data.list
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
              }
            })
           wx.hideLoading()
          },1000)
        }
      }
  },
  bindMultiPickerColumnChange(e,that) {
    if(e.detail.column==0){
      // console.log('picker发送选择改变，携带值为', e.detail.value)
      var citycodelist = that.data.citycode
      // 市
      var index1 = e.detail.value-1  
      var ccode1 = citycodelist[index1]
      that.setData({
          newcity:ccode1
      })
      wx.request({
        url:config.province,
        method:"post",
        data: {
           "_t":that.data._t,
           "code":ccode1
        },
        success: function(res) {
          console.log(res)
          var res = res.data.data.city
          var province = []
          var provincede = []
          for(var a=0;a<res.length;a++){
            province.push(res[a].name)
            provincede.push(res[a].adcode)
          }
          province.unshift("全部省");
          var citynamelist = that.data.citynamelist
          that.setData({ 
              multiArray:[
                citynamelist,
                province,
                []
              ],
             province:province,
             provincede:provincede
          })
        }
      })
    }
    if(e.detail.column==1){
      var area = that.data.provincede
      var index2 = e.detail.value-1
      for(var a=0;a<area.length;a++){
        var areaid = (area[index2])
      }
      that.setData({
          newresede:areaid
      })
      wx.request({
        url:config.province,
        method:"post",
        data: {
           "_t":that.data._t,
           "code":areaid
        },
        success: function(res) {
          var res = res.data.data.city
          var resce = []
          var resede = []
          for(var a=0;a<res.length;a++){
            resce.push(res[a].name)
            resede.push(res[a].adcode)
          }
           resce.unshift("全部区");
          var citynamelist = that.data.citynamelist
          var province = that.data.province
          that.setData({ 
              multiArray:[
                citynamelist,
                province,
                resce
              ],
             province:province,
             resede:resede
          })
        }
      })
    }
    if(e.detail.column==2){
      var index3 = e.detail.value-1
      var resedelist = that.data.resede
      for(var a=0;a<resedelist.length;a++){
         var newarea = resedelist[index3]
      }
      that.setData({
          newarea:newarea
      })
    }
    const data = {
      multiArray: that.data.multiArray,
      multiIndex: that.data.multiIndex
    }
    data.multiIndex[e.detail.column] = e.detail.value
    that.setData(data)
  },
   // //排序
  Type_top_number:function(e,that){
     wx.showLoading({
        title: '正在加载...',
      })
      var current2 = e.currentTarget.dataset.currenttab2
      var number = e.currentTarget.dataset.number
      var type_id = that.data.type_id
      var code = (that.data.multiIndex[0])
      that.setData({
          currentTab2:current2,
          number:number,
          boolean3:false
      })
      setTimeout(function(){
        wx.request({
          url:config.genrelist,
          method:"post",
          data: {
            "genre":number,
            "code":code,
            "pn":1,
            "site":type_id
          },
          success: function(res) {
           var list = res.data.data.list
           if(list.length==0){
              that.setData({ 
                 listItem:"",
                activeIndex:1
              })
           }else{
              that.setData({ 
                listItem:list,
                activeIndex:0
              })
           }
          }
        })
        wx.hideLoading()  
      },1000)
  },
  // 点击机构选项发送请求
  Type_top:function(e,that){
      wx.showLoading({
        title: '正在加载...',
      })

      var current = e.currentTarget.dataset.currenttab
      var type_id = e.currentTarget.dataset.type_id
      var sort = that.data.number
      var code = (that.data.multiIndex[0])
      that.setData({ 
          currentTab:current,
          type_id:type_id,
          boolean:false
      })
      setTimeout(function(){
        wx.request({
          url:config.genrelist,
          method:"post",
          data: {
            "genre":type_id,
            "code":code,
            "pn":1,
            "site":sort
          },
          success: function(res) {
           var list = res.data.data.list
           if(list.length == 0){
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
          }
        })
         wx.hideLoading()
      },1000)
  },
  open:function(that){
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
  open1:function(that){
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
  open3:function(that){
     that.setData({ 
          boolean3:!that.data.boolean3,
          boolean:false
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
  onLaunch: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    })
    var that = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
          this.globalData.userInfo = res.userInfo
        if(res.code){


          
          // wx.request({
          //   url:config.login,
          //   method: "POST",
          //   data: {
          //     code:res.code
          //   },
          //   success: function (res) {
          //   var session_key = res.data.data.wechat.session_key
          //   var _t = res.data.data._t
          //   that.data._t = _t
          //   that.data.session_key = session_key
          //     wx.request({
          //       url:config.province,
          //       method:"post",
          //       data:{
          //         "_t":that.data._t
          //       },
          //       success: function(res) {
          //         var cityname = res.data.data.city
          //         var citynamelist = []
          //         var citycode = []
          //         for(var a=0;a<cityname.length;a++){
          //           citynamelist.push(cityname[a].name)
          //           citycode.push(cityname[a].adcode)
          //         }
          //         citynamelist.unshift("全部市");
          //         that.data.citynamelist = citynamelist
          //         that.data.citycode = citycode
          //       }
          //     })
          //   } 
          // })
        }
        else{
          wx.showModal({
              title: '提示',
              content: '登录失败！',
              showCancel: false
          })
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     console.log(res.authSetting)
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // encryptedData
    //           // iv
    //           console.log(res.userInfo)
    //           // console.log(res)
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  },
  globalData: { 
    userInfo: null
  }
})
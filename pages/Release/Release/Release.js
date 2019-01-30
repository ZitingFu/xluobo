var amapFile = require('../../../utils/amap-wx.js');
const config = require('../../../config');
var feedbackApi=require('../../../showToast.js');
var that;
//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    MapKey:"6f967ad7e3c309757773579d0f7c90c4",
    city:"",
    sef:"https://img.qa.xluob.com/Small%20program/sousuo_icon_sousuo%402x.png",
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
    currentTab:1,
    number:0,
    open_num:8,
    index: 0,
    citynamelist:"",
    multiArray: [
          ['全部市', '全部市'],
          ['全部市', ], 
          ['全部区',],
    ],
    multiIndex: [110000, 0, 0],
    mtype:"机构类型",
    place:"排序"
  },
  scroll: function (e) {
    var that = this;
    that.setData({
      scrollY: e.detail.scrollTop
    })
  },
  Research:function(){
    wx.navigateTo({
        url: '../../Release/seach/seach'
    })
  },
  bindMultiPickerChange(e) {
    that = this;
    that.setData({ 
      open_num:99
    })
    var multiIndex = []
    multiIndex.push(that.data.newcity)
    multiIndex.push(that.data.newresede)
    multiIndex.push(that.data.newarea)
    wx.showLoading({
      title: '正在加载...',
    })
    var site = that.data.type_id
    var sort = that.data.number
    setTimeout(function(){
        wx.request({
          url:config.ReleaseList,
          method:"post",
          data: {
            "site":site,
            "code":multiIndex[0],
            "sort":sort,
            "pn":1
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
           wx.hideLoading()

          }
        })
    },800)
  },
  bindMultiPickerColumnChange(e) {
    that = this;
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
          var res = res.data.data.city
          var province = []
          var provincede = []
          var resnum = res.length
          for(var a=0;a<resnum;a++){
            province.push(res[a].name)
            provincede.push(res[a].adcode)
          }
          province.unshift("全部市");
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
      wx.showLoading({
        title: '正在加载...',
      })
      var nam = e.currentTarget.dataset.nam
      var current2 = e.currentTarget.dataset.currenttab2
      var number = e.currentTarget.dataset.number
      var type_id = that.data.type_id
      var code = (that.data.multiIndex[0])
      that.setData({
          currentTab2:current2,
          number:number,
          boolean3:false,
          open_num:99,
          place:nam
      })
      setTimeout(function(){
        wx.request({
          url:config.ReleaseList,
          method:"post",
          data: {
            "site":number,
            "code":code,
            "pn":1,
            "sort":type_id
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
  Type_top:function(e){
     that = this
      wx.showLoading({
        title: '正在加载...',
      })
      var nam = e.currentTarget.dataset.nam
      var current = e.currentTarget.dataset.currenttab
      var type_id = e.currentTarget.dataset.type_id
      var sort = that.data.number
      var code = (that.data.multiIndex[0])
      if(nam=="所有场所"){
        that.setData({
          mtype:"机构类型"
        })
      }
      else{
        that.setData({
          mtype:nam
        })
      }
      that.setData({ 
          currentTab:current,
          type_id:type_id,
          boolean:false,
          open_num:99
      })
      setTimeout(function(){
        wx.request({
          url:config.ReleaseList,
          method:"post",
          data: {
            "site":type_id,
            "code":"",
            "pn":1,
            "sort":sort
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
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载...',
    })
    var that = this
    var city = that.setData.city
    var page = Number(that.data.page)
    // setTimeout(function(){
    var citynamelist =  app.data.citynamelist
    var citycode = app.data.citycode
    var city = app.data.city
    that.setData({
      citynamelist:citynamelist,
      citycode:citycode,
      multiArray:[
          citynamelist,
          ["全部市","北京市"], 
          ["全部区"],
        ]
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
      url:config.ReleaseList,
      method:"post",
      data: {
         "code":"",
         "site":"",
         "sort":"",
         "_t":wx.getStorageSync('_t')
      },
      success: function(res) {
       var list = res.data.data.list
        that.setData({ 
          listItem:list
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
          url:config.ReleaseList,
          method:"post",
          data: {
             "code":"",
             "site":"",
             "sort":"",
             "pn":page
          },
          success: function(res) {
          if(res.data.data.list.length<1){
            feedbackApi.showToast({
                title:"没有数据了.."
            })
          }
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
  //下拉
  onPullDownRefresh: function(){
    that = this;
    that.onLoad()
     wx.stopPullDownRefresh();
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

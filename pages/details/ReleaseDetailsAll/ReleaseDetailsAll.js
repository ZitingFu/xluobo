var amapFile = require('../../../utils/amap-wx.js');
const config = require('../../../config.js');
var feedbackApi=require('../../../showToast.js');
var that;
//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    find:"https://img.qa.xluob.com/Small%20program/find.png",
    mode: 'aspectFill',
    MapKey:"6f967ad7e3c309757773579d0f7c90c4",
    city:"",
    passport_id:"",
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
    num_:9,
    start:"开始时间",
    end:"截止时间",
    multiArray: [
          ['全部市', '全部市'],
          ['全部省', ], 
          ['全部区',],
    ],
    multiIndex:[0, 0, 0],typeLIst:"信息类型",
    place:"场所",
    na:5,
    create_time2:"",
    time:"发布时间",
    op_id:""
  },
  scroll: function (e) {
    var that = this;
    that.setData({
      scrollY: e.detail.scrollTop
    })
  },
  lookup:function(e){
    var that = this;
    var op_id = that.data.op_id
    wx.navigateTo ({
       url:'../../index/search/search?id='+op_id
    })
  },
  bindMultiPickerChange(e) {
    that = this;
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
  useid:function(e){
    that = this
     var id = e.currentTarget.dataset.id;
     if(id==9){
        that.setData({
            TypeItem3:[{
              id:"",
              name:"全部"
            }]
        })
     }
     else{
      wx.request({
        url:config.Firstclassify,
        method:"post",
        data:{
          "id":id
        },
        success: function(res) {
         var site = res.data.data.genre
          that.setData({
              id:1,
              TypeItem3:site,
              currentTab2:0
          })
        }
      })
     }
     that.setData({
        num_:id
     })
  },
  open:function(that){
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
    that = this
    app.open3(that)
    that.setData({ 
        boolean:false,
        boolean2:false
    })
  },
  Reset:function(){
    that.setData({
        start:"开始时间",
        end:"截止时间",
        time:"发布时间"
      })
  },
  sub:function(){
    that = this
    if(that.data.start=="开始时间"||that.data.end=="截止时间"){
      feedbackApi.showToast({
          title:"请正确的选择起始时间"
      })
    }
    else{
      wx.showLoading({
        title: '正在加载...',
      })
      that.setData({
        time:"已选择"
      })
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
           var genre = res.data.data.list
            if(genre.length==0){
              that.setData({ 
                  listItem:"",
                  activeIndex:1
              })
            }
            else{
                that.setData({
                  listItem:genre,
                  activeIndex:0
                })
            }
             that.setData({
              boolean2:false,
              open_num:99,
            })
            wx.hideLoading()  
          }
        })
      },1000)
    }
  },
  bindDateInput:function(e){
    that = this
    var na = e.currentTarget.dataset.na
    that.setData({
        na:na
    })
  },
  //日期
  bindDateChange(e) {
    that = this
    var na = e.currentTarget.dataset.na
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
    wx.showLoading({
        title: '正在加载...',
    })
    var current2 = e.currentTarget.dataset.currenttab2
    var number = e.currentTarget.dataset.number
    var type_id = that.data.type_id
    var code = (that.data.multiIndex[0])
    that.setData({
        open_num:99,
        currentTab2:current2,
        number:number,
        boolean3:false
    })
    setTimeout(function(){
        wx.request({
        url:config.organizationQuestion,
        method:"post",
        data: {
          "_t":wx.getStorageSync('_t'),
          "genre":that.data.number,
          "site":that.data.type_id,
          "start":that.data.start,
          "end":that.data.end,
          "pn":1,
          "passport_id":that.data.passport_id
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
        wx.hideLoading()  
    },1000)
    if(e.currentTarget.dataset.name=="全部"){
      that.setData({ 
        typeLIst:"信息类型"
      })
    }
    else{
      that.setData({ 
        typeLIst:e.currentTarget.dataset.name
      })
    }
  },
  Type_top:function(e,that){
    that = this
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
          open_num:99,
          boolean:false
      })
      setTimeout(function(){
        wx.request({
        url:config.organizationQuestion,
        method:"post",
        data: {
          "_t":wx.getStorageSync('_t'),
          "genre":that.data.number,
          "site":that.data.type_id,
          "start":that.data.start,
          "end":that.data.end,
          "pn":1,
          "passport_id":that.data.passport_id
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
         wx.hideLoading()
      },1000)
      var nam = e.currentTarget.dataset.name
      if(nam=="所有场所"){
        that.setData({
            place:"场所"
        })
      }
      else{
        that.setData({
            place:nam
        })
      }
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载...',
    })
    that = this
    that.setData({ 
      op_id:options.id
    })
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
      that.setData({
            TypeItem3:[{
              id:"",
              name:"全部"
            }]
      })
      wx.request({
        url:config.organizationQuestion,
        method:"post",
        data: {
          "_t":wx.getStorageSync('_t'),
          "genre":that.data.number,
          "site":that.data.type_id,
          "start":that.data.start,
          "end":that.data.end,
          "pn":page,
          "passport_id":options.id
        },
        success: function(res) {
        var list = res.data.data.list
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
         if(list.length==0){
            that.setData({ 
               listItem:"",
              activeIndex:1
            })
         }
        else{
            that.setData({
              create_time2:d,
              listItem:list,
              activeIndex:0
            })
        }
        that.setData({ 
          passport_id:options.id
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
        wx.request({
          url:config.organizationQuestion,
          method:"post",
          data: {
            "_t":wx.getStorageSync('_t'),
            "genre":that.data.number,
            "site":that.data.type_id,
            "start":that.data.start,
            "end":that.data.end,
            "pn":page,
            "passport_id":that.data.passport_id
          },
          success: function(res) {
            if( res.data.data.list.length==0){
              wx.hideLoading()
              feedbackApi.showToast({
                  title:"没有数据了.."
              })
            }
            else{
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

var amapFile = require('../../../utils/amap-wx.js');
const config = require('../../../config.js');
var sliderWidth = 58;
const app = getApp();
var that;
//index.js
//获取应用实例
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    scrollTop:'0',
    scrollY:'',
    rightlist:"",
    notime:"https://img.qa.xluob.com/Small%20program/Notime.png",
    boolean1:"",
    boolean2:"",
    MapKey:"6f967ad7e3c309757773579d0f7c90c4",
    city:"",
    bannerImages:"",
    genreImages:"",
    listItem:"",
    fromItem1:"",
    fromItem2:"",
    init:"",
    loge:"https://img.qa.xluob.com/Small%20program/avatar2.png",
    xinxi:"https://img.qa.xluob.com/Small%20program/x.png",
    fexi:"https://img.qa.xluob.com/Small%20program/xxxq-icon_fenxiang%402x.png",
    jing:"https://img.qa.xluob.com/Small%20program/1.png",
    zhfa:"",
    one1:"https://img.qa.xluob.com/Small%20program/home_icon_xr.png",
    one2:"https://img.qa.xluob.com/Small%20program/home_icon_xw.png",
    one3:"https://img.qa.xluob.com/Small%20program/home_icon_renren.png",
    one4:"https://img.qa.xluob.com/Small%20program/home_icon_rw.png",
    one5:"https://img.qa.xluob.com/Small%20program/home_icon_activity.png",
    inputShowed: false,
    inputVal:"",
    indicatorColor:"#fda249",
    indicator:"#fff",
    page:1,
    none:false,
    block:true,
    currentTab:0,
    tabs: ["附近","最新"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    create_time1:"",
    create_time2:""
  },
  Scan:function(){
    wx.scanCode({
      success(res) {
        var id = res.result
        wx.navigateTo({
          url: '../../details/details/details?id='+id
        })
      }
    })
  },
  scroll: function (e) {
    var that = this;
    that.setData({
      scrollY: e.detail.scrollTop
    })
  },
  all:function(){
    wx.switchTab ({
      url:'../../Release/Release/Release'
    })
  },
  //搜索页面
  search:function(){
    wx.navigateTo({
      url:'../search/search'
    })
  },
  ckdetails:function(e){
    var id = e.currentTarget.dataset.usid;
      wx.navigateTo({
        url: '../../details/details/details?id='+id
      })
  },
  tolower:function(){
     that = this;
    that.onReachBottom()
  },
  //寻人，寻物
  Latelytop:function(e){
    var id = e.currentTarget.dataset.id
    if(id==1){
      wx.navigateTo({
        url:'../peoplelist/peoplelist'
      })
    }
    else if(id==2){
      wx.navigateTo({
        url:'../matterlist/matterlist'
      })
    }
    else if(id==3){
      wx.navigateTo({
        url:'../Searchpeople/Searchpeople'
      })
    }
    else if(id==4){
      wx.navigateTo({
        url:'../Searchmatter/Searchmatter'
      })
    }
    else if(id==5){
      wx.navigateTo({
        url:'../Exhibition/Exhibition'
      })
    }
  },
  //事件处理函数
  bindViewTap: function(options){
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  cktype:function(e){
     var stype = (e.currentTarget.dataset.stype)
      wx.navigateTo({
        url: '../../details/ReleaseDetails/ReleaseDetails?id='+stype
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
  tabClick: function (e) {
    this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
    });
    // 第一次
    var ckinit = this.data.init
    // 点击之后
    var ckactiveIndex = this.data.activeIndex
    if(ckinit!=ckactiveIndex){
      this.setData({
        page:1,
        init:this.data.activeIndex
      })
    }
    else if(ckinit==ckactiveIndex){
      this.setData({
        page:this.data.page
      })
    }
  },
  onLoad: function (options) {
    wx.clearStorageSync()
    wx.showLoading({
        title: '正在加载...',
      })
    that = this
    var city = that.data.city
    var page = Number(that.data.page)
    //之前
    var init =  that.data.activeIndex
    that.setData({  
      init:that.data.activeIndex
    })
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
            sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
            sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    //一级分类
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
    //附近机构
    wx.request({
      url:config.nearbyOutfit,
      method:"post",
      data: {
         "city":city,
          "_t":wx.getStorageSync('_t')
      },
      success: function(res) {
       var list = res.data.data.list
       var indearry = []
       for(var a=0;a<list.length;a++){
          indearry.push(a)
       }
         that.setData({ 
            listItem:list,
            rightlist:list.length-1
          })
      }
    })
    // 最近
    wx.request({
      url:config.LAtely,
      method:"post",
      data: {
          "pn":1,
          "area":city,
           "_t":wx.getStorageSync('_t')
      },
      success: function(res) {
        var from = res.data.data.list
        if(from.length==0){
            that.setData({ 
              boolean2:0
            })
        }
        else{
        // 倒计时 = 发布时间+天数-现在的时间
        // 现在时间
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
              fromItem2:from,
              boolean2:1
          })
        }
      }
    })
    var cty = wx.getStorageSync('city')
    if(cty.length>1){
      wx.showLoading({
        title: '正在加载...',
      })
      console.log("第二次")
      //轮播图*
        wx.request({
          url:config.Rotation,
          method:"post",
          data: {
             "city":wx.getStorageSync('city')
          },
          success: function(res) {
           var banner = res.data.data.banner
            that.setData({ 
                bannerImages:banner
            })
          }
        })
        // 附近*
        wx.request({
          url:config.nearby,
          method:"post",
          data: {
              "pn":1,
              "area":wx.getStorageSync('city')
          },
          success: function(res) {
            var from = res.data.data.list
            if(from.length==0){
                that.setData({ 
                  boolean1:0
                })
            }
            else{
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
                  create_time1:d,
                  fromItem1:from,
                  boolean1:1
              })
            }
            wx.hideLoading()
          }
        })
    }
    else if(cty.length==false){
      wx.showLoading({
        title: '正在加载...',
      })
      console.log("第一次")
      wx.getLocation({
        type: 'wgs84',
        success(res) {
          console.log("成功")
            const latitude = res.latitude
            const longitude = res.longitude
            const speed = res.speed
            const accuracy = res.accuracy
            console.log(latitude,longitude,speed,accuracy)
          var myAmapFun = new amapFile.AMapWX({ key: that.data.MapKey});
          myAmapFun.getRegeo({
            success: function (data) {
              console.log(3)
              var city = data[0].regeocodeData.addressComponent.adcode
               console.log(1)
              that.setData({
                city:city
              })
               wx.setStorageSync('city',city)
              //轮播图*
              wx.request({
                url:config.Rotation,
                method:"post",
                data: {
                   "city":wx.getStorageSync('city')
                },
                success: function(res) {
                 var banner = res.data.data.banner
                  that.setData({ 
                      bannerImages:banner
                  })
                }
              })
              // 附近*
              wx.request({
                url:config.nearby,
                method:"post",
                data: {
                    "pn":1,
                    "area":wx.getStorageSync('city')
                },
                success: function(res) {
                  var from = res.data.data.list
                  if(from.length==0){
                      that.setData({ 
                        boolean1:0
                      })
                  }
                  else{
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
                        create_time1:d,
                        fromItem1:from,
                        boolean1:1
                    })
                  }
                  wx.hideLoading()
                }
              })
            }
          })
        },
        fail(res){
          console.log("失败")
          wx.request({
            url:config.Rotation,
            method:"post",
            data: {
               "city":''
            },
            success: function(res) {
             var banner = res.data.data.banner
              that.setData({ 
                  bannerImages:banner
              })
              wx.hideLoading()
            }
          }) 
        }
      })
      // wx.showModal({
      //   title:'',
      //   content:"小萝卜公益需要获取您的位置",
      //    success: function (res) {
      //       wx.showLoading({
      //         title: '正在加载...',
      //       })
      //       if (res.confirm) {
      //         console.log(45)
      //         var myAmapFun = new amapFile.AMapWX({ key: that.data.MapKey});
      //         console.log(4)
      //         myAmapFun.getRegeo({
      //           success: function (data) {
      //             console.log(3)
      //             var city = data[0].regeocodeData.addressComponent.adcode
      //              console.log(1)
      //             that.setData({
      //               city:city
      //             })
      //              wx.setStorageSync('city',city)
      //             //轮播图*
      //             wx.request({
      //               url:config.Rotation,
      //               method:"post",
      //               data: {
      //                  "city":wx.getStorageSync('city')
      //               },
      //               success: function(res) {
      //                var banner = res.data.data.banner
      //                 that.setData({ 
      //                     bannerImages:banner
      //                 })
      //               }
      //             })
      //             // 附近*
      //             wx.request({
      //               url:config.nearby,
      //               method:"post",
      //               data: {
      //                   "pn":1,
      //                   "area":wx.getStorageSync('city')
      //               },
      //               success: function(res) {
      //                 var from = res.data.data.list
      //                 if(from.length==0){
      //                     that.setData({ 
      //                       boolean1:0
      //                     })
      //                 }
      //                 else{
      //                   var d = []
      //                   var now = res.data.data.now
      //                   for(var a=0;a<from.length;a++){
      //                     var create_time = Number(from[a].create_time)
      //                     var expire = Number(from[a].expire*86400)
      //                     var end = Number(create_time+expire)
      //                     var difference = Math.ceil(Number(end-now)/86400)
      //                     d.push(difference)
      //                   }
      //                   that.setData({
      //                       create_time1:d,
      //                       fromItem1:from,
      //                       boolean1:1
      //                   })
      //                 }
      //                 wx.hideLoading()
      //               }
      //             })
      //           }
      //         })
      //       }
      //       else if (res.cancel){
      //         wx.request({
      //           url:config.Rotation,
      //           method:"post",
      //           data: {
      //              "city":''
      //           },
      //           success: function(res) {
      //            var banner = res.data.data.banner
      //             that.setData({ 
      //                 bannerImages:banner
      //             })
      //             wx.hideLoading()
      //           }
      //         }) 
      //       }
      //    }
      // })
    }
  },
  onReachBottom: function(){
    that = this;
    var city = that.data.city
    var page = Number(that.data.page)+ 1
    wx.showLoading({
      title: '正在加载中'
    })
    setTimeout(function(){
      console.log(page)
      var activeIndex = that.data.activeIndex
      if(activeIndex == 0){
        // 附近
        wx.request({
          url:config.nearby,
          method:"post",
          data: {
              "pn":page,
              "area":city
          },
          success: function(res) {
            console.log(res)
            var from = that.data.fromItem1
            if(from.length==0){
                that.setData({ 
                  boolean1:0
                })
              wx.hideLoading()
            }
            else{
              for (var i = 0; i < res.data.data.list.length; i++) {
                from.push(res.data.data.list[i]);
              }
              that.setData({ 
                  fromItem1:from,
                  boolean1:1,
                  page:page,
                  init:activeIndex
              })
              wx.hideLoading()
            }
          }
        })
      }
      else if(activeIndex == 1){
        // 最近
        wx.request({
          url:config.LAtely,
          method:"post",
          data: {
              "pn":page,
              "area":city
          },
          success: function(res) {
            var from = res.data.data.list
            if(from.length==0){
                that.setData({ 
                  boolean2:0
                })
                wx.hideLoading()
            }
            else{
              var from = that.data.fromItem2;
              for (var i = 0; i < res.data.data.list.length; i++) {
                from.push(res.data.data.list[i]);
              }
              that.setData({ 
                  fromItem2:from,
                  boolean2:1,
                  page:page
              })
            }
            wx.hideLoading()
          }
        })
      }  
    },1500)
  },
  onPullDownRefresh: function(){
    that = this;
    that.onLoad()
  }
  // getUserInfo:function(e) {
  //     that = this
  //     app.getUserInfo(e,that,app)
  // }
})

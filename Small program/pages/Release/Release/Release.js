var amapFile = require('../../../utils/amap-wx.js');
//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    MapKey:"6f967ad7e3c309757773579d0f7c90c4",
    city:"",
    notime:"https://img.qa.xluob.com/Small%20program/Notime.png",
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
    currentTab:0,
    number:0,
    open_num:8,
    index: 0,
    citynamelist:"",
    multiArray: [
          ['北京市', '北京市'],
          ['北京市', '北京市'], 
          ['猪肉绦虫', '吸血虫'],
    ],
    multiIndex: [0, 0, 0],
    _t:"",
    citycode:"",
    province:"",
    citycode:"",
    provincede:"",
    resede:"",
    newcity:"",
    newresede:"",
    newarea:""
  },
  bindMultiPickerChange(e) {
    var multiIndex = []
    multiIndex.push(this.data.newcity)
    multiIndex.push(this.data.newresede)
    multiIndex.push(this.data.newarea)
    if(this.data.newarea.length<1){
     if(this.data.newarea.length<1){
      if(this.data.newarea.length<1){

      }
     }
    }
    console.log(multiIndex)
    // wx.showLoading({
    //   title: '正在加载...',
    // })
    // setTimeout(function(){
    //   wx.request({
    //     url: 'https://qb.xluob.com/mini/organization/index',
    //     method:"post",
    //     data: {
    //        site:type_id,
    //        code:code,
    //        sort:sort
    //     },
    //     success: function(res) {
    //       console.log(res)
    //      // var list = res.data.data.list
    //     }
    //   })
    //    wx.hideLoading()
    // },1000)

  },
  bindMultiPickerColumnChange(e) {
    var that = this
    if(e.detail.column==0){
      // console.log('picker发送选择改变，携带值为', e.detail.value)
      var citycodelist = this.data.citycode
      // 市
      var index1 = e.detail.value    
      var ccode1 = citycodelist[index1]
      that.setData({
          newcity:ccode1
      })
      wx.request({
        url: 'https://qb.xluob.com/mini/area/list',
        method:"post",
        data: {
           "_t":that.data._t,
           "code":ccode1
        },
        success: function(res) {
          var res = res.data.data.city
          var province = []
          var provincede = []
          for(var a=0;a<res.length;a++){
            province.push(res[a].name)
            provincede.push(res[a].adcode)
          }
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
      var index2 = e.detail.value
      for(var a=0;a<area.length;a++){
        var areaid = (area[index2])
      }
      that.setData({
          newresede:areaid
      })
      wx.request({
        url: 'https://qb.xluob.com/mini/area/list',
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
      var index3 = e.detail.value
      var resedelist = that.data.resede
      for(var a=0;a<resedelist.length;a++){
         var newarea = resedelist[index3]
      }
      that.setData({
          newarea:newarea
      })
    }
    const data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    }
    data.multiIndex[e.detail.column] = e.detail.value
    this.setData(data)
  },
  ckdetails:function(e){
    var id = e.currentTarget.dataset.usid;
     wx.navigateTo({
      url: '../../details/ReleaseDetails/ReleaseDetails?id='+id
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
  //排序
  Type_top_number:function(e){
     wx.showLoading({
        title: '正在加载...',
      })
      var that = this
      var number = e.currentTarget.dataset.number
      var type_id =  that.data.type_id
      var code = that.data.city
      that.setData({ 
          number:number,
          boolean3:false
      })
      setTimeout(function(){
        wx.request({
          url: 'https://qb.xluob.com/mini/organization/index',
          method:"post",
          data: {
             site:type_id,
             code:code,
             sort:number
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
  Type_top:function(e){
      wx.showLoading({
        title: '正在加载...',
      })
      var that = this
      var current = e.currentTarget.dataset.currenttab
      var type_id = e.currentTarget.dataset.type_id
      var sort = that.data.number
      var code = that.data.city
      that.setData({ 
          currentTab:current,
          type_id:type_id,
          boolean:false
      })
      setTimeout(function(){
        wx.request({
          url: 'https://qb.xluob.com/mini/organization/index',
          method:"post",
          data: {
             site:type_id,
             code:code,
             sort:sort
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
    wx.login({
      success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if(res.code){
          wx.request({
            url: 'https://qb.xluob.com/mini/passport/auth', //仅为示例，并非真实的接口地址
            method: "POST",
            data: {
              code: res.code
            },
          success: function (res) {
             var _t = res.data.data._t
              that.setData({  
                  _t:_t
              })
              wx.request({
                url: 'https://qb.xluob.com/mini/area/list',
                method:"post",
                data:{
                  "_t":_t
                },
                success: function(res) {
                  var cityname = res.data.data.city
                  var citynamelist = []
                  var citycode = []
                  for(var a=0;a<cityname.length;a++){
                    citynamelist.push(cityname[a].name)
                    citycode.push(cityname[a].adcode)
                  }
                  that.setData({
                    citynamelist:citynamelist,
                      multiArray:[
                        citynamelist,
                        ["北京市","天津市"], 
                        [],
                      ],
                      citycode:citycode
                  })
                }
              })
            }
          })
        }
      }
    })
     wx.hideLoading()
    var that = this
    var city = that.setData.city
    var page = Number(that.data.page)
     // 引入高德地图
    wx.showLoading({
      title: '正在加载...',
    })
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        var markersData = {
          latitude: latitude,//纬度
          longitude: longitude,//经度
          key: that.data.MapKey
        };
        var addArr = [];
        var myAmapFun = new amapFile.AMapWX({ key: that.data.MapKey});
        myAmapFun.getRegeo({
          success: function (data) {
            var city = data[0].regeocodeData.addressComponent.adcode
            that.setData({
              city:city
            })
            var _t = that.data._t
            // 三级联动
            // wx.request({
            //   url: 'https://qb.xluob.com/mini/area/list',
            //   method:"post",
            //   data:{
            //     "_t":_t
            //   },
            //   success: function(res) {
            //     var cityname = res.data.data.city
            //     console.log(res.data.data)
            //     var citynamelist = []
            //     var citycode = []
            //     for(var a=0;a<cityname.length;a++){
            //       citynamelist.push(cityname[a].name+",")
            //       // citycode.push(cityname[a].citycode)
            //     }
            //     console.log(citycode)
            //    // var site = res.data.data.site
            //     that.setData({ 
            //         multiArray:[
            //           citynamelist,
            //           ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'], 
            //           ['猪肉绦虫', '吸血虫'],
            //         ]
            //     })
            //   }
            // })
            wx.hideLoading()
            //所有场所
            wx.request({
              url: 'https://qb.xluob.com/mini/site/list',
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
              url: 'https://qb.xluob.com/mini/organization/index',
              method:"post",
              data: {
                 "code":"",
                 "site":"",
                 "sort":"",
                 "_t":_t
              },
              success: function(res) {
               var list = res.data.data.list
                that.setData({ 
                  listItem:list
                })
              }
            })
            wx.hideLoading()
          }
        });
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
          url: 'https://qb.xluob.com/mini/organization/index',
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

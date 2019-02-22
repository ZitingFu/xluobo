const config = require('config');
var amapFile = require('utils/amap-wx.js');
var feedbackApi = require('showToast')
App({
  data:{
    UserInfo_ud:false,
    code:"",
    MapKey:"6f967ad7e3c309757773579d0f7c90c4",
    city:"",
    _t:"",
    session_key:"",
    index: 0,
    citynamelist:"",
    multiArray: [
          ['', ''],
          ['', ''], 
          ['', ' '],
    ],
    multiIndex: [0, 0, 0],
    citycode:"",
    province:"",
    citycode:"",
    provincede:"",
    resede:"",
    newcity:"",
    newresede:"",
    newarea:"",
    da:"88"
  },
  bindMultiPickerChange(e,that,genre) {
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
    that.setData({ 
       multiIndex:multiIndex
    })
      var site = that.data.type_id
      var sort = that.data.number
      setTimeout(function(){
         if(site==''&& sort==''&&multiIndex[1]==''){
            wx.request({
              url:config.genrelist,
              method:"post",
              data: {
                 "site":site,
                 "sort":sort,
                 "code":multiIndex[1],
                 "genre":genre,
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
         }
         else{
          wx.request({
              url:config.genrelist,
              method:"post",
              data: {
                 "site":that.data.type_id,
                 "code":that.data.multiIndex[1],
                 "genre":that.data.number,
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
         }
      },800)
  },
  bindMultiPickerColumnChange(e,that) {
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
  Type_top_number:function(e,that,genre){
     wx.showLoading({
        title: '正在加载...',
      })
      var nam = e.currentTarget.dataset.nam
      var current2 = e.currentTarget.dataset.currenttab2
      var number = e.currentTarget.dataset.number
      var type_id = that.data.type_id
      var code = (that.data.multiIndex[0])
      that.setData({
          page:0
      })
      if(nam=="全部"){
        if(genre==1){
          that.setData({
            mtype:"寻人类型"
          })
        }
        if(genre==2){
          that.setData({
            mtype:"物品类型"
          })
        }
        if(genre==3){
          that.setData({
            mtype:"认人类型"
          })
        }
        if(genre==4){
          that.setData({
            mtype:"物品类型"
          })
        }
        if(genre==5){
          that.setData({
            mtype:"类型"
          })
        }
      }
      else{
        that.setData({
          mtype:nam
        })
      }
      that.setData({
          currentTab2:current2,
          number:number,
          boolean3:false,
          open_num:99
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
  Type_top:function(e,that,genre){
      wx.showLoading({
        title: '正在加载...',
      })
      var nam = e.currentTarget.dataset.nam
      var current = e.currentTarget.dataset.currenttab
      var type_id = e.currentTarget.dataset.type_id
      var sort = that.data.number
      var code = (that.data.multiIndex[1])
      that.setData({
          page:0
      })
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
      that.setData({ 
          currentTab:current,
          type_id:type_id,
          boolean:false,
          open_num:99
      })
      setTimeout(function(){
        if(type_id==''&& sort==''&&code==''){
          wx.request({
            url:config.genrelist,
            method:"post",
            data: {
              "genre":genre,
              "code":code,
              "pn":1,
              "site":type_id
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
            wx.hideLoading()
            }
          })
        }
        else{
          wx.request({
            url:config.genrelist,
            method:"post",
            data: {
              "genre":that.data.number,
              "code":code,
              "pn":1,
              "site":type_id
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
            wx.hideLoading()
            }
          })
        }
      },1000)
  },
  onReachBottom:function(that,genre){
    var city = that.data.city
    var page = Number(that.data.page)+ 1
    wx.showLoading({
      title: '正在加载中'
    })
    setTimeout(function(){
      if(that.data.type_id==''&&that.data.number==''&&that.data.multiIndex[1]==''){
        wx.request({
          url:config.genrelist,
          method:"post",
          data: {
             "genre":genre,
             "pn":page
          },
          success: function(res) {
            var list = res.data.data.list
            if(list==0){
              wx.hideLoading()
              feedbackApi.showToast({
                  title:"没有数据了.."
              })
            }
            else{
              var from = that.data.listItem
              var d = []
              var now = res.data.data.now
              for(var a=0;a<from.length;a++){
                var create_time = Number(from[a].create_time)
                var expire = Number(from[a].expire*86400)
                var end = Number(create_time+expire)
                var difference = Math.ceil(Number(end-now)/86400)
                d.push(difference)
              }
              for (var i = 0; i < res.data.data.list.length; i++) {
                  from.push(res.data.data.list[i]);
                }
                that.setData({ 
                    create_time2:d,
                    listItem:from,
                    page:page
                })
              wx.hideLoading()
            }
          }
        })
      }
      else{
        wx.request({
            url:config.genrelist,
            method:"post",
            data: {
               "site":that.data.type_id,
               "code":that.data.multiIndex[1],
               "genre":that.data.number,
               "pn":page
            },
            success: function(res) {
              var list = res.data.data.list
              if(list==0){
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
      }
    },1500)
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
  money(that,name,q_id){
    if(Number(name)<1){
      feedbackApi.showToast({
          title:"不能低于1元"
      })
    }
    else{
      wx.showLoading({
        title: '正在加载中'
      })
      wx.request({
        url:config.reword,
        method:"post",
        data: {
           "_t":wx.getStorageSync('_t'),
           "q_id":q_id,
           "price":name
        },
        success: function(res){
           wx.request({
              url:config.reword2,
              method:"post",
              data: {
                "_t":wx.getStorageSync('_t'),
                "pay":2,
                "id":res.data.data.orderId
              },
              success:function(res){
                wx.hideLoading()
                wx.requestPayment({
                  timeStamp:res.data.data.weixin.timeStamp,
                  nonceStr:res.data.data.weixin.nonceStr,
                  package:res.data.data.weixin.package,
                  signType:res.data.data.weixin.signType,
                  paySign:res.data.data.weixin.sign,
                  success(res) { 
                    that.setData({ 
                        Fabulous:false
                    })
                    wx.showToast({
                      title: '打赏成功',
                      duration: 1000
                    })
                  },
                  fail(res){
                    feedbackApi.showToast({
                        title:"支付失败"
                    })
                  }
                }) 
              },
              fail:function(){
                wx.hideLoading()
                feedbackApi.showToast({
                        title:"支付失败"
                })
              }
           })
        },
        fail: function (err) {
           wx.hideLoading()
          feedbackApi.showToast({
              title:"支付失败"
          })    
        },
      })
    }
  },
  money2(that,name,q_id){
    if(Number(name)<1){
      feedbackApi.showToast({
          title:"不能低于1元"
      })
    }
    else{
       wx.showLoading({
        title: '正在加载中'
      })
      wx.request({
        url:config.reword3,
        method:"post",
        data: {
           "_t":wx.getStorageSync('_t'),
           "passport_id":q_id,
           "price":name
        },
        success: function(res){
           wx.request({
              url:config.reword2,
              method:"post",
              data: {
                "_t":wx.getStorageSync('_t'),
                "pay":2,
                "id":res.data.data.orderId
              },
              success:function(res){
                wx.hideLoading()
                wx.requestPayment({
                  timeStamp:res.data.data.weixin.timeStamp,
                  nonceStr:res.data.data.weixin.nonceStr,
                  package:res.data.data.weixin.package,
                  signType:res.data.data.weixin.signType,
                  paySign:res.data.data.weixin.sign,
                  success(res) { 
                    that.setData({ 
                        Fabulous:false
                    })
                    wx.showToast({
                      title: '打赏成功',
                      duration: 1000
                    })
                  },
                  fail(res){
                    wx.hideLoading()
                    feedbackApi.showToast({
                        title:"支付失败"
                    })
                  }
                }) 
              },
              fail:function(){
                wx.hideLoading()
                feedbackApi.showToast({
                        title:"支付失败"
                })
              }
           })
        },
        fail: function (err) {
          wx.hideLoading()
          feedbackApi.showToast({
              title:"支付失败"
          })    
        },
      })
    }
  },
  getUserInfo:function(e,that,app){
    var value = wx.getStorageSync('_t')
    var ud = e.currentTarget.dataset.ud
    if(value.length != 0){
      app.data._t = value
      //个人页
      if(ud==0){
          wx.navigateTo({
            url:'../UserName/UserName'
          })
      }
      // 评论
      if(ud==1){
        wx.navigateTo({
           url:'../meComment/meComment'
        })
      }
      // 关注
      if(ud==2){
        wx.navigateTo({
           url:'../meFollow/meFollow'
        })
      }
      //我的收藏
      if(ud==3){
        wx.navigateTo({
          url:'../meCollection/meCollection'
        })
      }
      //详情收藏
      if(ud==4){
        that.setData({
          followid:!that.data.followid
        })
        if(that.data.followid==false){
          feedbackApi.showToast({
            title:"收藏成功"
          })
        }
        if(that.data.followid==true){
          feedbackApi.showToast({
            title:"取消收藏成功"
          })
        }
        wx.request({
            url:config.follow,
            method:"post",
            data: {
                "id":that.data.id,
                "_t":wx.getStorageSync('_t'),
                "type":1
            },
            success: function(res) {
            }
        })
      }
      //详情评论
      if(ud==5){
        that.setData({ 
            bottom:1
        })
      }
      //机构详情关注
      if(ud==6){
        that.setData({
          followid:!that.data.followid
        })
        if(that.data.followid==false){
          feedbackApi.showToast({
            title:"关注成功"
          })
        }
        if(that.data.followid==true){
          feedbackApi.showToast({
            title:"取消关注成功"
          })
        }
        wx.request({
          url:config.follow,
          method:"post",
            data: {
                "id":that.data.id,
                "_t":wx.getStorageSync('_t'),
                "type":3
            },
          success: function(res) {
          }
        })
      }
      //详情点赞
      if(ud==7){
        var q_id =  e.currentTarget.dataset.q_id
        wx.request({
            url:config.Fabulous,
            method:"post",
            data: {
                "id":q_id,
                 "_t":wx.getStorageSync('_t')
            },
            success: function(res) {
              var from = res.data.data.list
              wx.request({
                  url:config.questioninfo,
                  method:"post",
                  data: {
                      "id":that.data.id,
                       "_t":wx.getStorageSync('_t')
                  },
                  success: function(res) {
                   that.setData({ 
                        fromItem:res.data.data.info
                    })
                  }
              })
            } 
        })
      }
      // 详情关注
      if(ud==8){
        that.setData({
          followid2:!that.data.followid2
        })
        if(that.data.followid2==false){
          feedbackApi.showToast({
            title:"关注成功"
          })
        }
        if(that.data.followid2==true){
          feedbackApi.showToast({
            title:"取消关注成功"
          })
        }
        var idd = e.currentTarget.dataset.idd
        wx.request({
          url:config.follow,
          method:"post",
            data: {
                "id":idd,
                "_t":wx.getStorageSync('_t'),
                "type":3
            },
          success: function(res) {
          }
        })
      }
      //打赏
      if(ud==9){
        that.setData({ 
          moneyOne:false,
          moneyT:true,
          Fabulous:true,
          moneyIndex:"99"
        })
      }
    }
    else{
      // 第一次登陆
      wx.request({
        url:config.login,
        method:"post",
        data: {
            "encrypted_data":e.detail.encryptedData,
            "code":app.data.code,
            "iv":e.detail.iv
        },
        success: function(res) {
          wx.setStorageSync('_t',res.data.data._t)
           if(wx.getStorageSync('_t').length!=0){
             wx.hideLoading()
            feedbackApi.showToast({
              title:"登录成功"
            })
           }
           else{
            wx.hideLoading()
            feedbackApi.showToast({
              title:"请登录"
            })
           }
        }
      })
    }
  },
  onLaunch: function (options) {
    var that = this
    //获取省市区域
    wx.request({
      url:config.province,
      method:"post",
      success: function(res) {
        var cityname = res.data.data.city
        var citynamelist = []
        var citycode = []
        for(var a=0;a<cityname.length;a++){
          citynamelist.push(cityname[a].name)
          citycode.push(cityname[a].adcode)
        }
        citynamelist.unshift("全国");
        that.data.citynamelist = citynamelist
        that.data.citycode = citycode
      }
    })
    // 登录
    wx.login({
      success: res => {
        that.data.code = res.code
        this.globalData.userInfo = res.userInfo
      }
    })
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  },
  globalData:{ 
    userInfo: null
  }
})
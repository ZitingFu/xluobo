var amapFile = require('../../../utils/util.js');
const config = require('../../../config.js');
var feedbackApi = require('../../../showToast.js');
var sliderWidth = 96; 
var that;
//index.js
//获取应用实例
const app = getApp()
Page({
    data: {
        mode: 'aspectFill', 
        activeIndex2:"0",
        page:1,
        input:"",
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
        sliderLeft:18.5,
        name:"",
        nd:""
    },
  onShareAppMessage(res) {
    if (res.from === 'button') {
      var id = res.target.dataset.usid
    }
    return {
      title: '小萝卜公益',
      path: '/pages/details/details/details?id='+id,
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
  ckdetails:function(e){
    var id = e.currentTarget.dataset.usid;
     wx.navigateTo({
       url: '../../details/details/details?id='+id
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
  Back:function () { 
     wx.navigateTo({
          url:'../index/index'
      })
  },  
  cancel:function(){
    var that = this
    var nd = this.data.nd
    if(nd==1){
      wx.switchTab ({
        url:'../../index/index/index'
      })
    }
    else{
      wx.navigateTo({
         url: '../../details/ReleaseDetailsAll/ReleaseDetailsAll?id='+nd
      })
    }
  },
  search:function(e){
    console.log("内容搜索")
      var that = this
      // type_id
      var nd = that.data.nd
      var name = e.detail.value;
      that.setData({ 
         name:name
      })
      if(nd==1){
        if(that.data.name.length!=0){
            that.setData({ 
              fromItem1:"",
              fromItem2:"",
              fromItem3:"",
              fromItem4:"",
              fromItem5:"",
            })
          if(that.data.activeIndex==0){
              wx.request({
                url:config.searchpeople,
                method:"post",
                data: {
                  "name":that.data.name,
                  "pn":1,
                  "type":1
                },
                success: function(res) {
                  var from = res.data.data.list
                  if(from.length==0){
                    that.setData({ 
                       fromItem1:"",
                      activeIndex2:1
                    })
                  }
                  else{
                    that.setData({ 
                        fromItem1:from,
                        activeIndex2:0
                    })
                  }
                  wx.hideLoading()
                }
              })
          }
          if(that.data.activeIndex==1){
              wx.request({
                url:config.searchpeople,
                method:"post",
                data: {
                  "name":that.data.name,
                  "pn":1,
                  "type":2
                },
                success: function(res) {
                  var from = res.data.data.list
                  if(from.length==0){
                    that.setData({ 
                       fromItem2:"",
                      activeIndex2:1
                    })
                  }
                  else{
                    that.setData({ 
                        fromItem2:from,
                        activeIndex2:0
                    })
                  }
                  wx.hideLoading()
                }
              })
          }
          if(that.data.activeIndex==2){
              wx.request({
                  url:config.searchpeople,
                  method:"post",
                  data: {
                    "name":that.data.name,
                    "pn":1,
                    "type":3
                  },
                  success: function(res) {
                    var from = res.data.data.list
                    if(from.length==0){
                      that.setData({ 
                         fromItem3:"",
                        activeIndex2:1
                      })
                    }
                    else{
                      that.setData({ 
                          fromItem3:from,
                          activeIndex2:0
                      })
                    }
                    wx.hideLoading()
                  }
              })
          }
          if(that.data.activeIndex==3){
              wx.request({
                  url:config.searchpeople,
                  method:"post",
                  data: {
                    "name":that.data.name,
                    "pn":1,
                    "type":4
                  },
                  success: function(res) {
                    var from = res.data.data.list
                    if(from.length==0){
                      that.setData({ 
                         fromItem4:"",
                        activeIndex2:1
                      })
                    }
                    else{
                      that.setData({ 
                          fromItem4:from,
                          activeIndex2:0
                      })
                    }
                    wx.hideLoading()
                  }
              })
          }
          if(that.data.activeIndex==4){
              wx.request({
                url:config.searchpeople,
                method:"post",
                data: {
                  "name":that.data.name,
                  "pn":1,
                  "type":5
                },
                success: function(res) {
                  var from = res.data.data.list
                  if(from.length==0){
                    that.setData({ 
                       fromItem5:"",
                      activeIndex2:1
                    })
                  }
                  else{
                    that.setData({ 
                        fromItem5:from,
                        activeIndex2:0
                    })
                  }
                  wx.hideLoading()
                }
              })
          }
        }
        else{
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
                if(from.length==0){
                    that.setData({ 
                       fromItem1:"",
                      activeIndex2:1
                    })
                  }
                  else{
                    that.setData({ 
                        fromItem1:from,
                        activeIndex2:0
                    })
                  }
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
              if(from.length==0){
                    that.setData({ 
                       fromItem2:"",
                      activeIndex2:1
                    })
                  }
                  else{
                    that.setData({ 
                        fromItem2:from,
                        activeIndex2:0
                    })
                  }
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
              if(from.length==0){
                    that.setData({ 
                       fromItem3:"",
                      activeIndex2:1
                    })
                  }
                  else{
                    that.setData({ 
                        fromItem3:from,
                        activeIndex2:0
                    })
                  }
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
              if(from.length==0){
                    that.setData({ 
                       fromItem4:"",
                      activeIndex2:1
                    })
                  }
                  else{
                    that.setData({ 
                        fromItem4:from,
                        activeIndex2:0
                    })
                  }
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
              if(from.length==0){
                that.setData({ 
                   fromItem5:"",
                  activeIndex2:1
                })
              }
              else{
                that.setData({ 
                    fromItem5:from,
                    activeIndex2:0
                })
              }
             wx.hideLoading()
            }
          })
        }
      }
      else{
        // 搜索内容
        var numcc = (Number(that.data.activeIndex)+1)   
        if(that.data.name.length!=0){
            that.setData({ 
              fromItem1:"",
              fromItem2:"",
              fromItem3:"",
              fromItem4:"",
              fromItem5:"",
            })
          if(numcc==1){
            wx.request({
              url:config.organizationQuestion,
              method:"post",
              data: {
                "pn":1,
                "key":numcc,
                "passport_id":nd
              },
              success: function(res) {
                var from = res.data.data.list
                that.data.navData[0].fromItem = from
                if(from.length==0){
                  that.setData({ 
                     fromItem1:"",
                    activeIndex2:1
                  })
                }
                else{
                  that.setData({ 
                      fromItem1:from,
                      activeIndex2:0
                  })
                }
                wx.hideLoading()
              }
            })
          }
          if(numcc==2){
            wx.request({
              url:config.organizationQuestion,
              method:"post",
              data: {
                "pn":1,
                "key":numcc,
                "passport_id":nd
              },
              success: function(res) {
                var from = res.data.data.list
                that.data.navData[0].fromItem = from
                if(from.length==0){
                  that.setData({ 
                     fromItem2:"",
                    activeIndex2:1
                  })
                }
                else{
                  that.setData({ 
                      fromItem2:from,
                      activeIndex2:0
                  })
                }
                wx.hideLoading()
              }
            })
          }
          if(numcc==3){
            wx.request({
              url:config.organizationQuestion,
              method:"post",
              data: {
                "pn":1,
                "key":numcc,
                "passport_id":nd
              },
              success: function(res) {
                var from = res.data.data.list
                that.data.navData[0].fromItem = from
                if(from.length==0){
                  that.setData({ 
                     fromItem3:"",
                    activeIndex2:1
                  })
                }
                else{
                  that.setData({ 
                      fromItem3:from,
                      activeIndex2:0
                  })
                }
                wx.hideLoading()
              }
            })
          }
          if(numcc==4){
            wx.request({
              url:config.organizationQuestion,
              method:"post",
              data: {
                "pn":1,
                "key":numcc,
                "passport_id":nd
              },
              success: function(res) {
                var from = res.data.data.list
                that.data.navData[0].fromItem = from
                if(from.length==0){
                  that.setData({ 
                     fromItem4:"",
                    activeIndex2:1
                  })
                }
                else{
                  that.setData({ 
                      fromItem4:from,
                      activeIndex2:0
                  })
                }
                wx.hideLoading()
              }
            })
          }
          if(numcc==5){
            wx.request({
              url:config.organizationQuestion,
              method:"post",
              data: {
                "pn":1,
                "key":numcc,
                "passport_id":nd
              },
              success: function(res) {
                console.log(res)
                var from = res.data.data.list
                that.data.navData[0].fromItem = from
                if(from.length==0){
                  that.setData({ 
                     fromItem5:"",
                    activeIndex2:1
                  })
                }
                else{
                  that.setData({ 
                      fromItem5:from,
                      activeIndex2:0
                  })
                }
                wx.hideLoading()
              }
            })
          }
        }
        else{
          // 无内容
          var numcc = (Number(e.currentTarget.id)+1)
          wx.request({
              url:config.organizationQuestion,
              method:"post",
              data: {
                "pn":1,
                "genre":numcc,
                "passport_id":nd
              },
              success: function(res) {
                var from = res.data.data.list
                that.data.navData[0].fromItem = from
                if(from.length==0){
                  that.setData({ 
                     fromItem1:"",
                    activeIndex2:1
                  })
                }
                else{
                  that.setData({ 
                      fromItem1:from,
                      activeIndex2:0
                  })
                }
                wx.hideLoading()
              }
          })
          wx.request({
              url:config.organizationQuestion,
              method:"post",
              data: {
                "pn":1,
                "genre":numcc,
                "passport_id":nd
              },
              success: function(res) {
                var from = res.data.data.list
                that.data.navData[0].fromItem = from
                if(from.length==0){
                  that.setData({ 
                     fromItem2:"",
                    activeIndex2:1
                  })
                }
                else{
                  that.setData({ 
                      fromItem2:from,
                      activeIndex2:0
                  })
                }
                wx.hideLoading()
              }
          })
          wx.request({
              url:config.organizationQuestion,
              method:"post",
              data: {
                "pn":1,
                "genre":numcc,
                "passport_id":nd
              },
              success: function(res) {
                var from = res.data.data.list
                that.data.navData[0].fromItem = from
                if(from.length==0){
                  that.setData({ 
                     fromItem3:"",
                    activeIndex2:1
                  })
                }
                else{
                  that.setData({ 
                      fromItem3:from,
                      activeIndex2:0
                  })
                }
                wx.hideLoading()
              }
          })
          wx.request({
              url:config.organizationQuestion,
              method:"post",
              data: {
                "pn":1,
                "genre":numcc,
                "passport_id":nd
              },
              success: function(res) {
                var from = res.data.data.list
                that.data.navData[0].fromItem = from
                if(from.length==0){
                  that.setData({ 
                     fromItem4:"",
                    activeIndex2:1
                  })
                }
                else{
                  that.setData({ 
                      fromItem4:from,
                      activeIndex2:0
                  })
                }
                wx.hideLoading()
              }
          })
          wx.request({
              url:config.organizationQuestion,
              method:"post",
              data: {
                "pn":1,
                "genre":numcc,
                "passport_id":nd
              },
              success: function(res) {
                console.log(res)
                var from = res.data.data.list
                that.data.navData[0].fromItem = from
                if(from.length==0){
                  that.setData({ 
                     fromItem5:"",
                    activeIndex2:1
                  })
                }
                else{
                  that.setData({ 
                      fromItem5:from,
                      activeIndex2:0
                  })
                }
                wx.hideLoading()
              }
          })
        }
      }
  },
  tabClick: function (e) {
      this.setData({
          sliderOffset: e.currentTarget.offsetLeft,
          activeIndex: e.currentTarget.id
      });
      var nd = that.data.nd
      if(nd==1){
        if(that.data.name.length!=0){
            that.setData({ 
              fromItem1:"",
              fromItem2:"",
              fromItem3:"",
              fromItem4:"",
              fromItem5:"",
            })
          if(e.currentTarget.id==0){
              wx.request({
                url:config.searchpeople,
                method:"post",
                data: {
                  "name":that.data.name,
                  "pn":1,
                  "type":1
                },
                success: function(res) {
                  var from = res.data.data.list
                  if(from.length==0){
                    that.setData({ 
                       fromItem1:"",
                      activeIndex2:1
                    })
                  }
                  else{
                    that.setData({ 
                        fromItem1:from,
                        activeIndex2:0
                    })
                  }
                  wx.hideLoading()
                }
              })
          }
          if(e.currentTarget.id==1){
              wx.request({
                url:config.searchpeople,
                method:"post",
                data: {
                  "name":that.data.name,
                  "pn":1,
                  "type":2
                },
                success: function(res) {
                  var from = res.data.data.list
                  if(from.length==0){
                    that.setData({ 
                       fromItem2:"",
                      activeIndex2:1
                    })
                  }
                  else{
                    that.setData({ 
                        fromItem2:from,
                        activeIndex2:0
                    })
                  }
                  wx.hideLoading()
                }
              })
          }
          if(e.currentTarget.id==2){
              wx.request({
                  url:config.searchpeople,
                  method:"post",
                  data: {
                    "name":that.data.name,
                    "pn":1,
                    "type":3
                  },
                  success: function(res) {
                    var from = res.data.data.list
                    if(from.length==0){
                      that.setData({ 
                         fromItem3:"",
                        activeIndex2:1
                      })
                    }
                    else{
                      that.setData({ 
                          fromItem3:from,
                          activeIndex2:0
                      })
                    }
                    wx.hideLoading()
                  }
              })
          }
          if(e.currentTarget.id==3){
              wx.request({
                  url:config.searchpeople,
                  method:"post",
                  data: {
                    "name":that.data.name,
                    "pn":1,
                    "type":4
                  },
                  success: function(res) {
                    var from = res.data.data.list
                    if(from.length==0){
                      that.setData({ 
                         fromItem4:"",
                        activeIndex2:1
                      })
                    }
                    else{
                      that.setData({ 
                          fromItem4:from,
                          activeIndex2:0
                      })
                    }
                    wx.hideLoading()
                  }
              })
          }
          if(e.currentTarget.id==4){
              wx.request({
                url:config.searchpeople,
                method:"post",
                data: {
                  "name":that.data.name,
                  "pn":1,
                  "type":5
                },
                success: function(res) {
                  var from = res.data.data.list
                  if(from.length==0){
                    that.setData({ 
                       fromItem5:"",
                      activeIndex2:1
                    })
                  }
                  else{
                    that.setData({ 
                        fromItem5:from,
                        activeIndex2:0
                    })
                  }
                  wx.hideLoading()
                }
              })
          }
        }
        else{
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
             wx.hideLoading()
            }
          })
        }
      }
      else{
        if(that.data.name.length!=0){
            that.setData({ 
              fromItem1:"",
              fromItem2:"",
              fromItem3:"",
              fromItem4:"",
              fromItem5:"",
            })
            var numcc = (Number(that.data.activeIndex)+1)
          if(numcc==1){
            wx.request({
                url:config.organizationQuestion,
                method:"post",
                data: {
                  "key":that.data.name,
                  "pn":1,
                  "genre":numcc,
                  "passport_id":nd
                },
                success: function(res) {
                  console.log(res)
                  var from = res.data.data.list
                  if(from.length==0){
                    that.setData({ 
                       fromItem1:"",
                      activeIndex2:1
                    })
                  }
                  else{
                    that.setData({ 
                        fromItem1:from,
                        activeIndex2:0
                    })
                  }
                  wx.hideLoading()
                }
            })
          }
          if(numcc==2){
            wx.request({
              url:config.organizationQuestion,
              method:"post",
              data: {
                "key":that.data.name,
                "pn":1,
                "genre":numcc,
                "passport_id":nd
              },
              success: function(res) {
                console.log(2)
                console.log(res)
                var from = res.data.data.list
                if(from.length==0){
                  that.setData({ 
                     fromItem2:"",
                    activeIndex2:1
                  })
                }
                else{
                  that.setData({ 
                      fromItem2:from,
                      activeIndex2:0
                  })
                }
                wx.hideLoading()
              }
            })
          }
          if(numcc==3){
            wx.request({
                url:config.organizationQuestion,
                method:"post",
                data: {
                  "key":that.data.name,
                  "pn":1,
                  "genre":numcc,
                  "passport_id":nd
                },
                success: function(res) {
                  var from = res.data.data.list
                  if(from.length==0){
                    that.setData({ 
                       fromItem3:"",
                      activeIndex2:1
                    })
                  }
                  else{
                    that.setData({ 
                        fromItem3:from,
                        activeIndex2:0
                    })
                  }
                  wx.hideLoading()
                }
            })
          }
          if(numcc==4){
            wx.request({
                url:config.organizationQuestion,
                method:"post",
                data: {
                  "key":that.data.name,
                  "pn":1,
                  "genre":numcc,
                  "passport_id":nd
                },
                success: function(res) {
                  var from = res.data.data.list
                  if(from.length==0){
                    that.setData({ 
                       fromItem4:"",
                      activeIndex2:1
                    })
                  }
                  else{
                    that.setData({ 
                        fromItem4:from,
                        activeIndex2:0
                    })
                  }
                  wx.hideLoading()
                }
            })
          }
          if(numcc==5){
            wx.request({
              url:config.organizationQuestion,
              method:"post",
              data: {
                "key":that.data.name,
                "pn":1,
                "genre":numcc,
                "passport_id":nd
              },
              success: function(res) {
                var from = res.data.data.list
                if(from.length==0){
                  that.setData({ 
                     fromItem5:"",
                    activeIndex2:1
                  })
                }
                else{
                  that.setData({ 
                      fromItem5:from,
                      activeIndex2:0
                  })
                }
                wx.hideLoading()
              }
            })
          }
        }
        else{
          var numcc = (Number(e.currentTarget.id)+1)
          wx.request({
              url:config.organizationQuestion,
              method:"post",
              data: {
                "pn":1,
                "genre":numcc,
                "passport_id":nd
              },
              success: function(res) {
                var from = res.data.data.list
                that.data.navData[0].fromItem = from
                if(from.length==0){
                  that.setData({ 
                     fromItem1:"",
                    activeIndex2:1
                  })
                }
                else{
                  that.setData({ 
                      fromItem1:from,
                      activeIndex2:0
                  })
                }
                wx.hideLoading()
              }
          })
          wx.request({
              url:config.organizationQuestion,
              method:"post",
              data: {
                "pn":1,
                "genre":numcc,
                "passport_id":nd
              },
              success: function(res) {
                var from = res.data.data.list
                that.data.navData[0].fromItem = from
                if(from.length==0){
                  that.setData({ 
                     fromItem2:"",
                    activeIndex2:1
                  })
                }
                else{
                  that.setData({ 
                      fromItem2:from,
                      activeIndex2:0
                  })
                }
                wx.hideLoading()
              }
          })
          wx.request({
              url:config.organizationQuestion,
              method:"post",
              data: {
                "pn":1,
                "genre":numcc,
                "passport_id":nd
              },
              success: function(res) {
                var from = res.data.data.list
                that.data.navData[0].fromItem = from
                if(from.length==0){
                  that.setData({ 
                     fromItem3:"",
                    activeIndex2:1
                  })
                }
                else{
                  that.setData({ 
                      fromItem3:from,
                      activeIndex2:0
                  })
                }
                wx.hideLoading()
              }
          })
          wx.request({
              url:config.organizationQuestion,
              method:"post",
              data: {
                "pn":1,
                "genre":numcc,
                "passport_id":nd
              },
              success: function(res) {
                var from = res.data.data.list
                that.data.navData[0].fromItem = from
                if(from.length==0){
                  that.setData({ 
                     fromItem4:"",
                    activeIndex2:1
                  })
                }
                else{
                  that.setData({ 
                      fromItem4:from,
                      activeIndex2:0
                  })
                }
                wx.hideLoading()
              }
          })
          wx.request({
              url:config.organizationQuestion,
              method:"post",
              data: {
                "pn":1,
                "genre":numcc,
                "passport_id":nd
              },
              success: function(res) {
                console.log(res)
                var from = res.data.data.list
                that.data.navData[0].fromItem = from
                if(from.length==0){
                  that.setData({ 
                     fromItem5:"",
                    activeIndex2:1
                  })
                }
                else{
                  that.setData({ 
                      fromItem5:from,
                      activeIndex2:0
                  })
                }
                wx.hideLoading()
              }
          })
        }
      }
  },
  //事件处理函数
  onLoad: function (options) {
      that = this;
      that.setData({ 
          nd:options.id
      })
      wx.showLoading({
        title: '正在加载中'
      })
      wx.getSystemInfo({
          success: function(res) {
              that.setData({
                  sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                  sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
              });
          }
      });
      if(options.id==1){
        console.log("首页搜索")
        //寻人
        wx.request({
            url:config.searchpeople,
            method:"post",
            data: {
              "pn":1,
              "type":1
            },
            success: function(res) {
              console.log("sd")
              console.log(res)
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
           wx.hideLoading()
          }
        })
      }
      else{
        wx.request({
            url:config.organizationQuestion,
            method:"post",
            data: {
              "pn":1,
              "genre":1,
              "passport_id":options.id
            },
            success: function(res) {
              var from = res.data.data.list
              that.data.navData[0].fromItem = from
              that.setData({ 
                  fromItem1:from
              })
              wx.hideLoading()
            }
        })
      }
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
  onReachBottom:function(){
    console.log("上拉")
      wx.showLoading({
        title: '正在加载中'
      })
      that = this;
      var page = Number(that.data.page)
      page = page + 1  
      var index = that.data.activeIndex
      var nd = that.data.nd
      if(nd==1){
        console.log("首页上拉")
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
      else{
         console.log("机构上拉")
        setTimeout(function(){
            // 有内容
          if(that.data.name.length!=0){
              that.setData({ 
                fromItem1:"",
                fromItem2:"",
                fromItem3:"",
                fromItem4:"",
                fromItem5:"",
              })
              var numcc = (Number(that.data.activeIndex)+1)
            if(numcc==1){
              wx.request({
                  url:config.organizationQuestion,
                  method:"post",
                  data: {
                    "key":that.data.name,
                    "pn":page,
                    "genre":numcc,
                    "passport_id":nd
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
            if(numcc==2){
              wx.request({
                url:config.organizationQuestion,
                method:"post",
                data: {
                  "key":that.data.name,
                  "pn":page,
                  "genre":numcc,
                  "passport_id":nd
                },
                success: function(res) {
                  var from = that.data.fromItem2;
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
            if(numcc==3){
              wx.request({
                  url:config.organizationQuestion,
                  method:"post",
                  data: {
                    "key":that.data.name,
                    "pn":page,
                    "genre":numcc,
                    "passport_id":nd
                  },
                  success: function(res) {
                    var from = that.data.fromItem3;
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
            if(numcc==4){
              wx.request({
                  url:config.organizationQuestion,
                  method:"post",
                  data: {
                    "key":that.data.name,
                    "pn":page,
                    "genre":numcc,
                    "passport_id":nd
                  },
                  success: function(res) {
                    var from = that.data.fromItem4;
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
            if(numcc==5){
              wx.request({
                url:config.organizationQuestion,
                method:"post",
                data: {
                  "key":that.data.name,
                  "pn":page,
                  "genre":numcc,
                  "passport_id":nd
                },
                success: function(res) {
                  var from = that.data.fromItem5;
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
          }
          else{
            console.log("无内容")
            var numcc = (Number(that.data.activeIndex)+1)
            wx.request({
                url:config.organizationQuestion,
                method:"post",
                data: {
                  "pn":page,
                  "genre":numcc,
                  "passport_id":nd
                },
                success: function(res) {
                  if( res.data.data.list.length==0){
                    wx.hideLoading()
                    feedbackApi.showToast({
                        title:"没有数据了.."
                    })
                  }
                  else{
                    if (numcc==1) {
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
                    else if(numcc==2){
                       var from = that.data.fromItem2;
                      for (var i = 0; i < res.data.data.list.length; i++) {
                        from.push(res.data.data.list[i]);
                      }
                      that.setData({ 
                          fromItem2:from,
                          page:page
                      })
                      wx.hideLoading()
                    }
                    else if(numcc==3){
                       var from = that.data.fromItem3;
                      for (var i = 0; i < res.data.data.list.length; i++) {
                        from.push(res.data.data.list[i]);
                      }
                      that.setData({ 
                          fromItem3:from,
                          page:page
                      })
                      wx.hideLoading()
                    }
                    else if(numcc==4){
                       var from = that.data.fromItem4;
                      for (var i = 0; i < res.data.data.list.length; i++) {
                        from.push(res.data.data.list[i]);
                      }
                      that.setData({ 
                          fromItem4:from,
                          page:page
                      })
                      wx.hideLoading()
                    }
                    else if(numcc==5){
                      console.log(res)
                      var from = that.data.fromItem5;
                      for (var i = 0; i < res.data.data.list.length; i++) {
                        from.push(res.data.data.list[i]);
                      }
                      that.setData({ 
                          fromItem5:from,
                          page:page
                      })
                      wx.hideLoading()
                    }
                  }
                }
            })
          }
        },1000)
      }
  }
})
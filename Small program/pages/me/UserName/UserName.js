var amapFile = require('../../../utils/amap-wx.js');
const config = require('../../../config.js');
var that;
//index.js
//获取应用实例
const app = getApp()
var infoItem;
Page({
  data: {
    MapKey:"6f967ad7e3c309757773579d0f7c90c4",
    city:"",
    loge:"https://img.qa.xluob.com/Small%20program/avatar2.png",
    time1:"",
    infoItem:"",
    loge:"",
    img:[],
    carWin_img_hidden:true, //展示照片的view是否隐藏
    carWin_img:'' //存放照片路径的
  },
  UserNameTop:function(){
    that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        var filePath = res.tempFilePaths;
        that.setData({
          carWin_img: filePath[0], //把照片路径存到变量中，
          carWin_img_hidden: false //让展示照片的view显示
        });
          wx.uploadFile({
            url:config.image,
            type:'post',
            filePath:res.tempFilePaths[0],
            name: 'file',
            header: { "Content-Type": "multipart/form-data" },
            formData: {
              //和服务器约定的token, 一般也可以放在header中
              // 'session_token': wx.getStorageSync(app.data.session_key),
              "image":res.tempFilePaths[0]
            },
            success: function (res) {
              if(res.statusCode != 200) { 
                wx.showModal({
                  title: '提示',
                  content: '上传失败',
                  showCancel: false
                })
                return;
              }
              var ims = JSON.parse(res.data);
              console.log(ims.data.url.s)
              var avatar = {
                    s:ims.data.url.s,
                    m:ims.data.url.m,
                    b:ims.data.url.b
              }
              wx.request({
                url:config.passportEdit,
                method:"post",
                data:{
                  avatar:avatar,
                  _t:app.data._t 
                },
                success: function(res) {
                  console.log(res)
                }
              })
            }
          })
        }
    })
  },
  UserName:function(){
    wx.navigateTo({
      url:'../modify/UserName/UserName'
    })
  },
  sax:function(){
    wx.navigateTo({
      url:'../modify/sax/sax'
    })
  },
  //生日
  bindDateChange: function(e) {
      that = this
      that.setData({
          time1: e.detail.value
      })
      wx.request({
        url:config.passportEdit,
        method:"post",
        data:{
         "_t":app.data._t,
         "birthday":e.detail.value
        },
        success:function(res){
          that.onLoad()
        }
      })
  },
  phone:function(){
    wx.navigateTo({
      url:'../modify/phone/phone'
    })
  },
  onLoad: function (options) {
    that = this
    var name = wx.getStorageSync('_t')
    wx.request({
      url:config.melist,
      method:"post",
      data:{
       "_t":name
      },
      success:function(res){
        console.log(res)
      var info = res.data.data.info;
        that.setData({
          infoItem:info
        })
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

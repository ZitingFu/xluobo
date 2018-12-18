var amapFile = require('../../../utils/amap-wx.js');
//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    _t:"",
    index: 0,
    multiArray: [['无脊柱动物', '脊柱动物'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'], ['猪肉绦虫', '吸血虫']],
    multiIndex: [0, 0, 0],
    region: ['0', '0', '0'],
    customItem: '全部'
  },
   bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
    console.log(e.detail.value)
  },
  bindMultiPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  // bindMultiPickerColumnChange(e) {
  //   console.log('修改的列为', e.detail.column, '，值为', e.detail.value)
  //   const data = {
  //     multiArray: this.data.multiArray,
  //     multiIndex: this.data.multiIndex
  //   }
  //   data.multiIndex[e.detail.column] = e.detail.value
  //   switch (e.detail.column) {
  //     case 0:
  //       switch (data.multiIndex[0]) {
  //         case 0:
  //           data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物']
  //           data.multiArray[2] = ['猪肉绦虫', '吸血虫']
  //           break
  //         case 1:
  //           data.multiArray[1] = ['鱼', '两栖动物', '爬行动物']
  //           data.multiArray[2] = ['鲫鱼', '带鱼']
  //           break
  //       }
  //       data.multiIndex[1] = 0
  //       data.multiIndex[2] = 0
  //       break
  //     case 1:
  //       switch (data.multiIndex[0]) {
  //         case 0:
  //           switch (data.multiIndex[1]) {
  //             case 0:
  //               data.multiArray[2] = ['猪肉绦虫', '吸血虫']
  //               break
  //             case 1:
  //               data.multiArray[2] = ['蛔虫']
  //               break
  //             case 2:
  //               data.multiArray[2] = ['蚂蚁', '蚂蟥']
  //               break
  //             case 3:
  //               data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓']
  //               break
  //             case 4:
  //               data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物']
  //               break
  //           }
  //           break
  //         case 1:
  //           switch (data.multiIndex[1]) {
  //             case 0:
  //               data.multiArray[2] = ['鲫鱼', '带鱼']
  //               break
  //             case 1:
  //               data.multiArray[2] = ['青蛙', '娃娃鱼']
  //               break
  //             case 2:
  //               data.multiArray[2] = ['蜥蜴', '龟', '壁虎']
  //               break
  //           }
  //           break
  //       }
  //       data.multiIndex[2] = 0
  //       break
  //   }
  //   console.log(data.multiIndex)
  //   this.setData(data)
  // },

  onLoad: function (options) {
    var that = this
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
              wx.request({
                url: 'https://qb.xluob.com/mini/area/list',
                method:"post",
                data:{
                  "_t":_t
                },
                success: function(res) {
                 var city = res.data.data.city
                  console.log(city)
                  // that.setData({ 
                  //     TypeItem:site
                  // })
                  console.log(that.data.region)
                }
              })
            }
          })
        }
      }
    })
    
  }
})

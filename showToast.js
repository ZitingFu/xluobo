/*
显示toast提示
title:    提示的内容 必填
icon:     图标，//请指定正确的路径，选填
duration: 提示的延迟时间，单位毫秒，默认：1500, 10000永远存在除非手动清除 选填
mask:     是否显示透明蒙层，防止触摸穿透，默认：true 选填
cb:       接口调用成功的回调函数 选填
 */
function showToast(obj) {
    if (typeof obj == 'object' && obj.title) {
        if (!obj.duration || typeof obj.duration != 'number') { obj.duration = 1500; }//默认1.5s后消失
        var that = getCurrentPages()[getCurrentPages().length - 1];//获取当前page实例
        obj.isShow = true;//开启toast
        // if (obj.duration < 1000) {
            setTimeout(function () {
                    obj.isShow = false;
                    obj.cb && typeof obj.cb == 'function' && obj.cb();//如果有成功的回调则执行
                    that.setData({
                        'showToast.isShow': obj.isShow
                    });
                }, obj.duration);
        // }
        that.setData({
            showToast: obj
        });
    } else {
        console.log('showToast fail:请确保传入的是对象并且title必填');
    }
}
/**
 *手动关闭toast提示
 */
function hideToast() {
    var that = getCurrentPages()[getCurrentPages().length - 1];//获取当前page实例
    if (that.data.showToast) {
        that.setData({
            'showToast.isShow': false
        });
    }
}
function searchbuttom(from,numcc,that){
    if(numcc==1){
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
    else if(numcc==2){
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
    else if(numcc==3){
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
    else if(numcc==4){
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
    else if(numcc==5){
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
    }
}
function tabClickbutton(from,numcc,that){
    if(numcc==1){
        that.setData({ 
            fromItem1:from
        })
    } 
    else if(numcc==2){
        that.setData({ 
            fromItem2:from
        })
    }
    else if(numcc==3){
        that.setData({ 
            fromItem3:from
        })
    }  
    else if(numcc==4){
        that.setData({ 
            fromItem4:from
        })
    }
    else if(numcc==5){
        that.setData({ 
            fromItem5:from
        })
    }    
}
function Bottmelse(res,numcc,that,page,feedbackApi){
  if(res.data.data.list.length==0){
    wx.hideLoading()
    feedbackApi.showToast({
        title:"没有数据了.."
    })
  }
  else{
    if(numcc==1){
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

module.exports = {
    showToast: showToast,
    hideToast: hideToast,
    searchbuttom:searchbuttom,
    tabClickbutton:tabClickbutton,
    Bottmelse:Bottmelse
}

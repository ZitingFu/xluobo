/**
 * 小程序配置文件
 */
var host = "https://www.xluob.com"
// var host = "https://qb.xluob.com"
var config = {
    host,
    //登陆
    login:host+'/mini/passport/auth',
    // 支付
    reword:host+'/mini/pay/reword', 
    //省
    province:host+'/mini/area/list',
    // 轮播
    Rotation:host+'/mini/index/home',
    // 一级分类
    Firstclassify:host+'/mini/genre/list',
    // 附近机构数据
    nearbyOutfit:host+'/mini/organization/nearbyorg',
    // 附近
    nearby:host+'/mini/index/nearby',
    // 最近
    LAtely:host+'/mini/index/newquestion',
    //search 
    searchpeople:host+'/mini/Benefit/searchbytype',
    //寻人列表
    genrelist:host+'/mini/genre/list',
    //所有场所
    Allplace:host+'/mini/site/list',
    //物品类型
    genrelist:host+'/mini/question/search',
    // 机构列表
    ReleaseList:host+'/mini/organization/index',
    // me列表
    melist:host+'/mini/passport/center',
    // me评论
    mycomments:host+'/mini/passport/mycomments',
    // me关注
    meFollow:host+'/mini/favorite/fav3',
    // me收藏
    meCollection:host+'/mini/favorite/fav1',
    // me修改
    passportEdit:host+'/mini/passport/edit',
    // phone修改
    editphone:host+'/mini/passport/editphone',
    // phone验证码
    codephone:host+'/mini/phone/code',
    //信息详情页
    questioninfo:host+'/mini/question/info',
    //赞
    Fabulous:host+'/mini/question/EditLike',
    // 关注
    follow:host+'/mini/favorite/fav',
    // 评论
    commentsCreate:host+'/mini/comments/create',
    //删除评论
    commentsDelete:host+'/mini/comments/delete',
    //机构详情页
    codephone:host+'/mini/phone/code',
    // 机构起止,截止
    organizationQuestion:host+'/mini/organization/question',
    // 图片上传
    image:host+'/mini/upload/img'
};

module.exports = config

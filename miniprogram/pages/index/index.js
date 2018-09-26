var plugin = requirePlugin("myPlugin")
const token = 'dJVFK8ibSzHKWhcVOupqzn22EKJ9QXqjLIqqDsqn:u5oHehiExudcsaTK13xS-52_opQ=:eyJzY29wZSI6InNjaG9vbCIsImRlYWRsaW5lIjoxNTM3OTMwNTQ3fQ==';

Page({
  data:{
    test:"plugin",
    icon:{
      "width":"130rpx",//图片和图标的宽
      "height": "130rpx"//图片和图标的高
    },
    qiniu:{
      uploadNumber:4,//一次性选择图片的最大限制
      region: "SCN",//ECN, SCN, NCN, NA，您的七牛存储区域
      token: token,//七牛上传token凭证
      domain: "http://image.kucaroom.com"//七牛域名
    }
  },
  onLoad: function() {

  },
  /**
   * 上传成功后的回调,返回已上传的图片数组
   */
  uploadSuccess:function(uploadImage){
    console.log("外部获取到上传照片：" + JSON.stringify(uploadImage.detail));
  },

  /**
   * 删除图片的回调，返回已上传的图片数组
   */
  deleteSuccess: function (uploadImage) {
    console.log("外部获取到删除后的照片：" + JSON.stringify(uploadImage.detail));
  },

  /**
   * 上传图片出错的回调
   */
  uploadError:function(res){
    console.log("上传出错："+res);
  }
})
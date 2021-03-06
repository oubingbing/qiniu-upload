var plugin = requirePlugin("myPlugin") //引入插件

const token = 'uWiIWknjhMGVoQ5ZesrhF3iXjykXjP3K8cUwNFoS:PoMF-6d3kDsHMAVwz1eG8tJzwKQ=:eyJyZXR1cm5Cb2R5Ijoie1wia2V5XCI6XCIkKGtleSlcIixcImhhc2hcIjpcIiQoZXRhZylcIixcImJ1Y2tldFwiOlwiJChidWNrZXQpXCIsXCJmc2l6ZVwiOiQoZnNpemUpLFwid2lkdGhcIjpcIiQoaW1hZ2VJbmZvLndpZHRoKVwiLFwiaGVpZ2h0XCI6XCIkKGltYWdlSW5mby5oZWlnaHQpXCJ9Iiwic2NvcGUiOm51bGwsImRlYWRsaW5lIjoxNTQ2MTUwNTYyfQ==';


Page({
  data:{
    test:"plugin",
    icon:{//上传图片的icon
      width:"130rpx",//图片和图标的宽，选填
      height: "130rpx",//图片和图标的高，选填
      path:"",//选择图片icon的URL地址，必须是网络地址，不能是本地地址，如果不填则选默认图标,
      showImage:true//是否显示上传后的图片
    },
    qiniu:{
      uploadNumber:9,//可以上传图片的数量限制,默认是九张
      region: "ECN",//ECN, SCN, NCN, NA，您的七牛存储区域
      token: token,//七牛上传token凭证
      domain: "http://image.xiaoxiangzhen.cn",//您配置的七牛CDN域名:true,//是否返回上传图片的数组,false上传一个返回一个
    }
  },
  onLoad: function() {

  },

  /**
   * 上传成功后的回调,返回已上传的图片数组
   */
  uploadSuccess:function(uploadImage){
    console.log("上传后获得的图片数组：");
    console.log(JSON.stringify(uploadImage.detail))
  },

  /**
   * 删除图片的回调，返回已上传的图片数组
   */
  deleteSuccess: function (uploadImage) {
    console.log("删除后的照片数组：" + JSON.stringify(uploadImage.detail));
  },

  /**
   * 上传图片出错的回调
   */
  uploadError:function(res){
    console.log("上传出错："+res);
  }
})
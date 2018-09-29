# 七牛传图插件说明文档

#### GitHub项目地址：https://github.com/oubingbing/qiniu-upload

## 1.目前七牛传图插件信息

AppId：wx00caa212d6710dcb

版本号：1.0.0

## 2.具体使用方法

### 2.1 配置app.json和使用页面的***.json


```
//app.json
{
  "pages": [
    "pages/index/index"
  ],
  "plugins": { //配置插件
    "myPlugin": {
      "version": "1.0.0",
      "provider": "wx00caa212d6710dcb" //appId
    }
  }
}
```


```
***.json
{
  "usingComponents": {
    "upload": "plugin://myPlugin/upload" //引入插件
  }
}
```

### 2.2 在页面的WXML文件中添加标签


```
<upload icon-info="{{icon}}" //上传图标信息，包括图标的宽高
        qiniu-info="{{qiniu}}"  //七牛信息，包括七牛授权token、七牛存储区域、七牛域名以及可以一次性选择图片的最大数量
        bind:success="uploadSuccess" //上传成功回调 
        bind:delete="deleteSuccess" //删除成功回调
        bind:error="uploadError"/> //上传错误回调
```

### 2.3 JS文件中处理传入插件数据


```
var plugin = requirePlugin("myPlugin")
const token = 'dJVFK8ibSzHKWhcVOupqzn22EKJ9QXqjLIqqDsqn:FHJcjNuTs5HtSbsUQveZU3vLGcw=:eyJzY29wZSI6InNjaG9vbCIsImRlYWRsaW5lIjoxNTM3ODczODE0fQ==';

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
      token: token,//七牛上传token凭证，需您在服务器获取，然后自行维护这个token的有效期
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
```

##### 参数说明

###### 上传成功返回参数


```
[
    {
    	"localPath": "http://tmp/wx00caa212d6710dcb.o6zAJs3oh85Zb1lJE8oWix57vny0.VzUQ2ebaMb87c6609a10aab7698d8645216baafb307e.jpg",
    	"uploadResult": {
    		"hash": "Fia6Y7gP4gXuaEsTfk5D9rslFWEz",
    		"key": "tmp/wx00caa212d6710dcb.o6zAJs3oh85Zb1lJE8oWix57vny0.VzUQ2ebaMb87c6609a10aab7698d8645216baafb307e.jpg",
    		"imageURL": "http://image.kucaroom.com/tmp/wx00caa212d6710dcb.o6zAJs3oh85Zb1lJE8oWix57vny0.VzUQ2ebaMb87c6609a10aab7698d8645216baafb307e.jpg"
    	}
    }, {
    	"localPath": "http://tmp/wx00caa212d6710dcb.o6zAJs3oh85Zb1lJE8oWix57vny0.2sYa1Iz3HXvM983982ba2e07d25e79212b11b8c75742.jpg",
    	"uploadResult": {
    		"hash": "FmNPIb1IJ9xraRdl26zXAjjyTjfz",
    		"key": "tmp/wx00caa212d6710dcb.o6zAJs3oh85Zb1lJE8oWix57vny0.2sYa1Iz3HXvM983982ba2e07d25e79212b11b8c75742.jpg",
    		"imageURL": "http://image.kucaroom.com/tmp/wx00caa212d6710dcb.o6zAJs3oh85Zb1lJE8oWix57vny0.2sYa1Iz3HXvM983982ba2e07d25e79212b11b8c75742.jpg"
    	}
    }
]
```

```
localPath：上传图片的本地路径
uploadResult：上传七牛后成功返回的参数
```

###### 上传失败后返回的参数


```
{error: "bad token", imageURL: "http://image.kucaroom.com/undefined"}
```

### 3.绑定域名

微信小程序需要在微信管理后台绑定相应的域名，否则会被拦截，根据自己七牛存储区域绑定对应的域名，存储区域与域名的对应如下所示

```
ECN : https://up.qbox.me
NCN : https://up-z1.qbox.me
SCN : https://up-z2.qbox.me
NA  : https://up-na0.qbox.me

```

我选择的存储区域是华南，所以我的域名绑定如下所示

![](http://article.qiuhuiyi.cn/FqoioivFkE4Aaf7fkahwGz4aQef0)

### 4.效果图

![](http://article.qiuhuiyi.cn/Fn7VeFpwPEadp9_2KEd1TaOHB1y7)
 
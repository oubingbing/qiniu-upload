# 七牛传图插件说明文档

#### GitHub项目地址：https://github.com/oubingbing/qiniu-upload

## 1.目前七牛传图插件信息

AppId：wx00caa212d6710dcb

版本号：1.0.0

## 2.具体使用方法

#### 注意，使用小程序插件需要调整基础库，插件的页面从小程序基础库版本 2.1.0 开始支持，您需要将自己的基础库调整至2.1.0以上，否则会报以下错误

```
VM889:1 jsEnginScriptError
Component is not found in path "pages/index/plugin:/wx00caa212d6710dcb/upload" (using by "pages/index/index")
Error: Component is not found in path "pages/index/plugin:/wx00caa212d6710dcb/upload" (using by "pages/index/index")
    at e (http://127.0.0.1:29946/appservice/__dev__/WAService.js:12:8584)
    at e (http://127.0.0.1:29946/appservice/__dev__/WAService.js:12:8736)
    at W (http://127.0.0.1:29946/appservice/__dev__/WAService.js:12:14803)
    at Object.t.addView (http://127.0.0.1:29946/appservice/__dev__/WAService.js:12:15813)
    at Function.value (http://127.0.0.1:29946/appservice/__dev__/WAService.js:14:7166)
    at I (http://127.0.0.1:29946/appservice/__dev__/WAService.js:13:18127)
    at W (http://127.0.0.1:29946/appservice/__dev__/WAService.js:13:20476)
    at U (http://127.0.0.1:29946/appservice/__dev__/WAService.js:13:20742)
    at Function.<anonymous> (http://127.0.0.1:29946/appservice/__dev__/WAService.js:13:23130)
    at http://127.0.0.1:29946/appservice/__dev__/WAService.js:13:28164

```


### 2.1 配置app.json和使用页面的***.json


```
//app.json
{
  "pages": [
    "pages/index/index"
  ],
  "plugins": { //配置插件
    "myPlugin": {
      "version": "1.1.0",
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
var plugin = requirePlugin("myPlugin") //引入插件
const token = 'dJVFK8ibSzHKWhcVOupqzn22EKJ9QXqjLIqqDsqn:5wWNGrXHTVdNOTPx1SsRcfgVEZU=:eyJzY29wZSI6InNjaG9vbCIsImRlYWRsaW5lIjoxNTM4MjA2NzU0fQ==';

Page({
  data:{
    test:"plugin",
    icon:{//上传图片的icon
      "width":"130rpx",//图片和图标的宽，选填
      "height": "130rpx",//图片和图标的高，选填
      "path":""//选择图片icon的URL地址，必须是网络地址，不能是本地地址，如果不填则选默认图标
    },
    qiniu:{
      uploadNumber:9,//可以上传图片的数量限制,默认九张
      region: "SCN",//ECN, SCN, NCN, NA，您的七牛存储区域
      token: token,//七牛上传token凭证
      domain: "http://image.kucaroom.com"//您配置的七牛CDN域名
    }
  },
  onLoad: function() {

  },

  /**
   * 上传成功后的回调,返回已上传的图片数组
   */
  uploadSuccess:function(uploadImage){
    console.log("上传后获得的图片数组：" + JSON.stringify(uploadImage.detail));
  },

  /**
   * 删除图片的回调，返回已上传的图片数组
   */
  deleteSuccess: function (uploadImage) {
    console.log("删除后剩余的照片数组：" + JSON.stringify(uploadImage.detail));
  },

  /**
   * 上传图片出错的回调
   */
  uploadError:function(res){
    console.log("上传出错："+res);
  }
})

```

### 参数说明

#### 插件参数

|   属性名| 类型  |默认值   |说明   |
| ------------ | ------------ | ------------ | ------------ |
|  icon-info | Json  |   | 上传图标的信息，包括图标的宽高，图标的地址  |
| qiniu-info  | Json  |   | 七牛账号相关信息，包括一次可以选择上传图片的数量，存储区域，认证token和配置的七牛CDN域名  |
| uploadSuccess  | EventHandle  |   | 上传成功的回调  |
| deleteSuccess  |  EventHandle |   | 删除图片的回调  |
| deleteSuccess  |  EventHandle |   | 上传失败的回调  |

#### icon-info参数

|   属性名| 类型  |默认值   |说明   |
| ------------ | ------------ | ------------ | ------------ |
|width   | String  | 130rpx  | 上传图片icon的宽，选填  |
|height   | String  | 130rpx  | 上传图片icon的高 ，选填 |
| path  | String  | 有默认图标  | 图标的地址，如果需要自行定制，请输入一个网络地址，不能使小程序的本地地址  |

#### qiniu-info参数

|   属性名| 类型  |默认值   |说明   |
| ------------ | ------------ | ------------ | ------------ |
|uploadNumber   | int  | 9  | 一次性选择图片的最大限制  |
|region   | String  |   | ECN, SCN, NCN, NA，您的七牛存储区域 |
| token  | String  |   | 七牛上传认证token，需要您再后台服务器请求七牛服务器活动，并且维护token的有效期 |
| domain  | String  |   | 在七牛配置CDN域名，七牛测试域名有限制，所以需要您在七牛后台配置一个备案域名 |

#### 上传成功返回参数
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

#### 上传失败后返回的参数


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
 
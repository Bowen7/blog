# chameleon 使用体验

[Chameleon](https://cmljs.org)(变色龙)是滴滴最近开源的一个跨端解决方案，趁着寒假，我花了些时间学习 cml，并使用 cml 做了一款简单的背单词软件，本文主要从开发者的角度分享我的使用体验

### 快速上手

cml 使用类似于 vue 的一套语言（CML+CMSS+JS），你甚至可以在模版上加一个 `<template lang="vue">`使 cml 支持 vue 的指令，让它更像 vue，对于了解 vue 的人来说学习成本很低

当然，cml 对于没用使用过 vue 的人（比如我）也相当友好，cml 有很详细的[文档](https://cmljs.org/doc/)，基本上，根据文档，花个半个下午，就能写个简单的 demo 自娱自乐了

官方提供了 cml 的脚手架 chameleon-tool，我们可以通过这个脚手架快速创建一个跨小程序、h5 和 native 的项目，[chameleon 快速上手](https://cmljs.org/doc/quick_start/quick_start.html)；在项目内，我们可以通过执行`npm init componennt`快速创建普通组件、多态组件、多态接口模版，最大程度地降低了用户的学习成本

### wosi-demo

这是我写的一个背单词软件，[项目地址](https://github.com/Bowen7/wosi-demo)，水平有限，写得比较粗糙，项目 readme 有软件分别运行在 h5，小程序，weex 端的截图

### 使用体验

使用`cml init project`（需全局安装脚手架）即可快速创建一个 cml 项目，项目内有基本的文件 ，执行`cml dev`即可运行

与普通的 web 项目类似，`pages`文件夹下存放页面，拆分的组件（包括多态组件和多态接口）则是放置在`components`文件夹下。我的 app 主要有三个界面，所以我新建了`index`、`recite`、`setting`三个文件夹在`pages`文件夹下，再去配置路由

`router.config.json`是路由的配置文件：

```js
{
  "mode": "history",
  "domain": "https://www.chameleon.com",
  "routes": [{
      "url": "/cml/h5/index",
      "path": "/pages/index/index",
      "mock": "index.js"
    }
  ]
}
```

开发的时候主要是向 routes 中增加页面，再修改 url 和 path，url 是 h5 页面的路由，path 则是对应 cml 文件的路径

接下来，进入了 code 阶段，需要注意的是，cml 有严格的代码规范校验，比如在公共代码里不能出现某端特有的 api 和标签，[全局变量校验](https://cmljs.org/doc/framework/global_check.html)，[模版规范校验](https://cmljs.org/doc/framework/linter/cml-template.html)，更多请参考文档。如果要使用某端特有的方法或标签，可以使用多态组件或多态接口（我另一篇文章：[chameleon 之强大的多态协议](https://github.com/Bowen7/Blog/issues/3))

cml 提供了大量跨端 api 和组件，我们可以根据需求使用

比如，储存数据：

```js
cml.setStorage("name", "Bowen").then(() => {}, function(err) {});
```

要注意，api 需要通过`import cml from 'chameleon-api';`的方式引入，而且均以`Promise`形式返回，可配合 async、await 使用；而组件分为内置组件和扩展组件，内置组件不需要引入，可直接使用，扩展组件需引入后才能使用，以`c-loading`为例：

```jsx
<script cml-type="json">
{
    "base": {
        "usingComponents": {
            "c-loading": "cml-ui/components/c-loading/c-loading"
        }
    }
}
</script>
```

当然，也可以利用强大的多态协议自由扩展开发跨端 api 和组件，为了尝鲜，我在项目里开发了一个 audio 多态组件，首先执行`npm init component`，选择多态组件，输入 audio，就在 components 文件夹下生成一个 audio 多态组件，我们先修改`audio.interface`，定义组件接收一个 String 类型的属性 src:

```jsx
<script cml-type="interface">
interface AudioInterface {
  src: String
}
</script>
```

下面分别是三端的具体实现：

web 端：

```jsx
<template>
  <view>
    <origin-audio src="{{src}}"></origin-audio>
  </view>
</template>

<script>
class Audio implements AudioInterface {
  props = {
    src: {
      type: String,
      default: ''
    }
  }
  data={
    oldSrc:''
  }
  /**
  * 由于浏览器限制，某些浏览器无法自动播放音视频
  * 绑定全局事件，监听click事件
  * 当src改变时触发播放
  **/
  beforeCreate(){
    document.addEventListener('click', (e)=>{
      if(this.oldSrc!==this.src){
        const audioEle=document.querySelector('audio')
        !!audioEle&&audioEle.play();
        this.oldSrc=this.src;
      }
    })
  }
}

export default new Audio();
</script>
```

weex:

```jsx
<template>
  <view>
    <origin-video
      class="video"
      src="{{src}}"
      auto-play="{{true}}">
    </origin-video>
  </view>
</template>

<script>

class Audio implements AudioInterface {
  props = {
    src: {
      type: String,
      default: ''
    }
  }
}

export default new Audio();
</script>

<style scoped>
  /**
  * video必须有高度和宽度
  **/
  .video {
    width: 10cpx;
    height: 10cpx;
    opacity:0;
  }
</style>
```

wx:

```jsx
<template>
  <view>
  </view>
</template>

<script>
const audio = wx.createInnerAudioContext();
class Audio implements AudioInterface {
  props = {
    src: {
      type: String,
      default: ''
    }
  }

  watch = {
    src:function(newV,oldV){
      audio.src=newV;
    }
  }
  mounted() {
    audio.autoplay = true;
    audio.src = this.src;
  }
}

export default new Audio();
</script>
```

上面三段代码可以看到，三端分别使用了各端独有的能力，而 cml 会在打包的时候将代码隔离开，互不污染

最后在 cml 文件中引入，即可直接使用 audio 组件进行跨端：

```jsx
<script cml-type="json">
{
  "base": {
    "usingComponents": {
      "audio": "/components/audio/audio"
    }
  }
}
</script>
```

多态协议不仅能用在扩展跨端能力上，有时候，各端会有定制化需求，我们也可以使用多态协议，提高代码逻辑性，便于维护。

cml 还提供了数据 mock 功能，下面是一个简单的 get 请求：

```js
module.exports = [
	{
		method: "get",
		path: "/api/message",
		controller: function(req, res, next) {
			res.json({
				message: "a message"
			});
		}
	}
];
```

然后使用自带的网络请求获取数据：

```js
cml.get({
	url: "/api/message"
});
```

有了 mock 功能，我们可以不依赖后端，方便开发时调试

### 总结

Chameleon 是一款上手简单的跨端框架，学习成本较低，同时自带了较多跨端组件和 api。与其他跨端框架对比，cml 拥有更好的拓展性，开发者也可以在多态协议的基础上根据需求自己开发组件和 api，且可利用多态协议应对各端定制化需求，当然，cml 也有它的不足之处，比如它的生态还不成熟，组件数量不够多

Chameleon 还有其他过人之处，比如导入导出原生组件、Chameleon iOS SDK、Chameleon Android SDK 等等，可以参阅文档：[传送门](https://cmljs.org/doc/)

想更加了解多态协议？可看我的后续文章：[chameleon 之强大的多态协议](https://github.com/Bowen7/Blog/issues/3)

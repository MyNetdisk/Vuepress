module.exports = {
  "title": "MyNetdisk说你想说",
  "description": "MyNetdisk说你想说,是一个关注于互联网、IT技术经验分享的个人独立博客。",
  "dest": "dist",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ],
    ['script', {}, `
          var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?d08721e82650b9a83de6b7160610b4cc";
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
          })();
        `], //百度统计
    ['script', {}, `
          var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?2dd95c19d0145124078369363e18124e";
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
          })();
        `] //百度统计
  ],
  "locales": {
    "/": {
      "lang": 'zh-CN'
    }
  },
  // "theme": "reco",
  "themeConfig": {
    "nav": [
      {
        "text": "主页",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "时间轴",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "关于",
        "link": "/about/",
        "icon": "reco-account"
      }
    ],
    "type": "blog",
    "sidebar": false,
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "博客"
      },
      "tag": {
        "location": 3,
        "text": "标签"
      }
    },
    "friendLink": [
      {
        "title": "zealsay动态博客",
        "desc": "zealsay说你想说",
        "logo": "https://pan.zealsay.com/avatar/20200606105310570000000.jpg",
        "link": "https://blog.zealsay.com"
      },
      {
        "title": "zealsay静态博客",
        "desc": "vuepress_blog",
        "logo": "https://pan.zealsay.com/avatar/20200606105310570000000.jpg",
        "link": "https://www.zealsay.com"
      },
      {
        "title": "午后南杂",
        "desc": "Enjoy when you can, and endure when you must.",
        "logo": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        "link": "https://www.recoluan.com"
      },
      {
        "title": "zealsay开发指南",
        "desc": "zealsay轻应用脚手架开发指南",
        "logo": "https://pic.zealsay.com/20190909225214850000000.jpg",
        "link": "https://docs.zealsay.com"
      }
    ],
    "valineConfig": {
      "appId": "xxx",// your appId
      "appKey": "xxx", // your appKey
      "avatar": "", //
      "enableQQ": true, //启用昵称框自动获取QQ昵称和QQ头像
      "requiredFields": ['nick', 'mail'], //设置必填项
    },
    "logo": "/logo.png",
    // "huawei": true, //首页出现华为文案
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "MyNetdisk",
    "authorAvatar": "/avatar.jpg",
    "record": "你的备案号 ", //icp备案
    "startYear": "2018",
    "info": "一名追求技术喜欢安静的程序猿",
    "socials":{
      "github" : "https://github.com/MyNetdisk", //github
      "gitlub" : false, //gitlub
      "gitee" : "https://gitee.com/MyNetdisk", //gitee
      "jianshu" : false, //简书
      "zhihu" : false, //知乎
      "toutiao" : false, //头条
      "juejin": false, //掘金
      "segmentfault" : false, //思否
      "csdn" : false, //CSDN
      "wechat" : "你的微信", //微信
      "qq" : "你的QQ" //QQ
    },
    "mottos": [{
      "zh": "愿你保持初心和善良,笑里尽是温暖与坦荡。",
      "en": "May you keep your original heart and kindness, and smile with warmth and magnanimity."
    },
      {
        "zh": "年轻就是无限的可能。",
        "en": "Youth means limitless possibilities."
      },
      {
        "zh": "真正的梦就是现实的彼岸。",
        "en": "Real dream is the other shore of reality."
      },
      {
        "zh": "不为模糊不清的未来担忧，只为清清楚楚的现在努力。",
        "en": "Don't worry about the vague future, just strive for the clear present."
      },
      {
        "zh": "与其装腔作势企图影响别人，不如咬牙切齿狠命修理自己。",
        "en": "Rather than pretending to influence others, it's better to grind your teeth and repair yourself."
      }, {
        "zh": "上天是公平的，只要努力就会有收获，否则就是你不够努力。",
        "en": "God is fair, as long as effort will include results, otherwise is you hard enough."
      },
      {
        "zh": "人生没有后悔，我们只能尽力去不让自己后悔。",
        "en": "Life without regret, we can only do our best to not to regret."
      }
    ],
    "covers": [
      'https://images.mynetdisk.vercel.app/vuepress/7.jpg',
      'https://images.mynetdisk.vercel.app/vuepress/1.jpg',
      'https://images.mynetdisk.vercel.app/vuepress/2.jpg',
      'https://images.mynetdisk.vercel.app/vuepress/3.jpg',
      'https://images.mynetdisk.vercel.app/vuepress/4.jpg',
      'https://images.mynetdisk.vercel.app/vuepress/5.jpg',
      'https://images.mynetdisk.vercel.app/vuepress/6.jpg'
    ],
    "codeTheme": "tomorrow"
  },
  "markdown": {
    "lineNumbers": false
  },
  // configureWebpack: (config, isServer) => {
  //   if (!isServer) {
  //     // 修改客户端的 webpack 配置
  //     config.output.publicPath = config.mode === 'production'
  //       ? 'https://pan.zealsay.com/blog/' // sample/essays 打包的默认路径为 ‘_nuxt’ 或者可以指定cdn 域名
  //       : '/';
  //     config.output.filename = "assets/js/[name].js";
  //   }
  // }
}
# 自用油猴脚本 tampermonkey_script

## 1. 油猴简介

- 谷歌浏览器需要注册成开发者才能发布插件到商店。而且发布的任何插件都需要经过严格的审核才能最终和用户见面，因此使用油猴可以绕过这一个限制。

- 这是一个用户脚本管理器。通俗的说法就是 TamperMonkey 允许在浏览器打开的任意页面过程中执行一段自定义脚本，从而实现一些功能，要使用油猴首先要安装这个谷歌插件 tampermonkey。

- 油猴脚本就是一个以 user.js 结尾的 JavaScript 脚本，可以托管在任何位置。只要装了油猴插件，当访问这样一个 js 文件时，油猴就会提醒是否安装这个脚本。所以开发一个油猴脚本就是写一个 js 文件，并以 user.js 结尾，例如 tampermonkey-script.user.js，然后托管在某个地方。

- 这个 user.js 文件需要符合油猴脚本的一些基本约定，具体参考[官方的开发文档](https://tampermonkey.net/documentation.php?ext=dhdg):
  - updateURL：脚本检查更新的地址，每天油猴会去这个地址查询新版本。
  - downloadURL：脚本下载地址，如果有更新就去这里下载下脚本。
  - include：url 包含匹配，当 url 符合这样的规则才启用脚本，可以写多条。
  - exclude：url 排除匹配，当 url 符合这样的规则时不启用脚本，可以写多条。
  - require：加载外部资源，可以是 js，css 或者图片，油猴会缓存这些资源，并提供调用方法。
  - grant：申请使用油猴 API，如果没申请就不能使用。
  - run-at：脚本运行阶段，比如页面加载前，加载后或者闲置时等等

## 2. 功能列表

- [X]取消网页复制限制
- [X]知乎免登录
- [X]去除网页黏贴的后缀
- [ ]视频实现网页全屏
- [ ]网页视频悬浮显示下载按钮
- [ ]去除资源下载链接中的广告块
- [ ]屏蔽特定网页的弹出广告
- [ ]去除指定网页的覆盖层
- [ ]悬浮网页面板启用/关闭功能

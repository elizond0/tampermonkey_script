// ==UserScript==
// @name        自用脚本测试
// @namespace   https://github.com/elizond0/tampermonkey_script
// @version     0.1
// @description 自用脚本大杂烩
// @author      elizond0

// @include
// @exclude
// @match       *://*/*

// @updateUrl   https://github.com/elizond0/tampermonkey_script/blob/master/tampermonkey-script.user.js
// @downloadURL https://github.com/elizond0/tampermonkey_script/blob/master/tampermonkey-script.user.js
// @supportURL  https://github.com/elizond0/tampermonkey_script/issues

// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_xmlhttpRequest
// @grant       GM_setClipboard
// @run-at      document-start
// @noframes
// ==/UserScript==

(function() {
  // 0.1 公用变量
  let hostname = window.location.hostname;
  let hosthref = window.location.href;
  // 0.2 工具函数
  // 获取所有元素 包括document
  function getElements() {
    let elements = Array.prototype.slice.call(
      document.getElementsByTagName("*")
    );
    elements.push(document);
    return elements;
  }
  // 数组去重
  function unique(arr) {
    let ret = [];
    for (let i = 0; i < arr.length; i++) {
      let item = arr[i];
      if (ret.indexOf(item) === -1) {
        ret.push(item);
      }
    }
    return ret;
  }
  // *******************************************
  // 1.1 劫持网页复制限制
  // 原理：清楚document.body下挂载的oncopy/onpaste等事件
  let unfreezeWebInteraction = {
    include: [/www\.360doc\.com/], //匹配的网站
    events: "contextmenu|selectstart|copy|paste", //匹配的事件
    release: function() {
      // let elements = getElements(); //解除所有元素
      let self = this;
      let elements = [document.body];
      let eventsArr = self.events.split("|");
      for (let i in elements) {
        for (let j in eventsArr) {
          let name = "on" + eventsArr[j];
          if (
            Object.prototype.toString.call(elements[i]) === "[object String]"
          ) {
            continue;
          }
          if (elements[i][name] !== null) {
            elements[i][name] = null;
          }
        }
      }
    },
    init: function() {
      for (let i in this.include) {
        if (!!this.include[i].test(hostname)) {
          window.addEventListener("load", this.release.bind(this), true);
          break;
        }
      }
      // 定时检查，针对动态生成dom的网站
      // let timerInterval, timerOut;
      // timerInterval && clearInterval(timerInterval);
      // timerInterval = setInterval(this.release.bind(this), 5 * 1000);
      // timerOut && clearTimeout(timerOut);
      // timerOut = setTimeout(this.release.bind(this), 1500);
    }
  };
  unfreezeWebInteraction.init();
  // *******************************************
  // 1.2 知乎免登录
  // 原理：未登录状态下，直接跳转到发现页
  let skipZhiHuLogin = {
    include: [/www\.zhihu\.com\/sign(up|in).+(2F)$/],
    release: function() {
      location.href = "https://www.zhihu.com/explore";
    },
    init: function() {
      if (!!this.include[0].test(hosthref)) {
        this.release();
      }
    }
  };
  skipZhiHuLogin.init();
})();

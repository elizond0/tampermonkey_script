// ==UserScript==
// @name        自用脚本测试
// @namespace   https://github.com/elizond0/tampermonkey_script
// @version     0.1
// @description 自用脚本大杂烩
// @author      elizond0

// @include
// @exclude
// @match       *://*/*

// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_xmlhttpRequest
// @grant       GM_setClipboard
// @run-at      document-idle
// @noframes
// ==/UserScript==

(function() {
  // 0.1 公用变量
  let hostname = window.location.hostname;
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
  let unfreezeWebInteraction = {
    events: ["contextmenu", "selectstart", "copy", "paste"], //匹配的事件
    include: ["www.360doc.com"], //匹配的网站
    release: function() {
      // let elements = getElements();
      let self = this;
      let elements = [document.body];
      for (let i in elements) {
        for (let j in self.events) {
          let name = "on" + self.events[j];
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
        if (hostname.indexOf(this.include[i]) > -1) {
          window.addEventListener("load", this.release.bind(this), true);
          break;
        }
      }
      // 循环操作，针对动态生成dom的网站进行监听
      // let timerInterval, timerOut;
      // timerInterval && clearInterval(timerInterval);
      // timerInterval = setInterval(this.release.bind(this), 5 * 1000);
      // timerOut && clearTimeout(timerOut);
      // timerOut = setTimeout(this.release.bind(this), 1500);
    }
  };
  unfreezeWebInteraction.init();
})();

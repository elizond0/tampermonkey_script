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
  "use strict";
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
  // 1.1 解除网页复制限制
  // 原理：清楚document.body下挂载的oncopy/onpaste等事件
  let unfreezeWebInteraction = {
    include: [/www\.360doc\.com/], //匹配的网站
    events: "contextmenu|selectstart|copy|paste", //匹配的事件
    action: function() {
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
          window.addEventListener("load", this.action.bind(this), true);
          this.action();
          break;
        }
      }
      // 定时检查，针对动态生成dom的网站
      // let timerInterval, timerOut;
      // timerInterval && clearInterval(timerInterval);
      // timerInterval = setInterval(this.action.bind(this), 5 * 1000);
      // timerOut && clearTimeout(timerOut);
      // timerOut = setTimeout(this.action.bind(this), 1500);
    }
  };
  // try {
  //   unfreezeWebInteraction.init();
  // } catch (error) {
  //   console.log("unfreezeWebInteraction:", error);
  // }

  // *******************************************
  // 1.2 知乎免登录浏览
  // 原理：未登录状态下，直接跳转到发现页
  let skipZhiHuLogin = {
    // 从发现页点击登陆，也会通过sign页面登录
    include: [/www\.zhihu\.com\/sign(up|in).+(2F)$/],
    action: function() {
      location.href = "https://www.zhihu.com/explore";
    },
    init: function() {
      if (!!this.include[0].test(hosthref)) {
        this.action();
      }
    }
  };
  // try {
  //   skipZhiHuLogin.init();
  // } catch (error) {
  //   console.log("skipZhiHuLogin:", error);
  // }
  // *******************************************
  // 1.3 去除网页黏贴的后缀
  // 原理：创建div标签保存选中数据，然后存入到剪切板中
  let clearClipBoardSuffix = {
    include: [/www\.zhihu\.com/],
    action: function(event) {
      event.preventDefault();
      var node = document.createElement("div");
      // 将选中标签添加到自定义div中
      node.appendChild(
        window
          .getSelection()
          .getRangeAt(0)
          .cloneContents()
      );
      var htmlData = node && node.innerHTML;
      var textData = window.getSelection().getRangeAt(0);
      // 将数据存入剪切板中
      if (event.clipboardData) {
        event.clipboardData.setData("text/html", htmlData);
        event.clipboardData.setData("text/plain", textData);
      } else if (window.clipboardData) {
        return window.clipboardData.setData("text", textData);
      }
    },
    init: function() {
      let self = this;
      for (let i in self.include) {
        if (!!self.include[i].test(hosthref)) {
          window.onload = function() {
            document.addEventListener("copy", self.action.bind(self));
          };
        }
      }
    }
  };
  // try {
  //   clearClipBoardSuffix.init();
  // } catch (error) {
  //   console.log("clearClipBoardSuffix:", error);
  // }
  // *******************************************
  // 1.4 默认不使用二维码登录
  // 原理：找到登录框，重新赋值className
  let avoidQRCodeLogin = {
    include: [
      {
        rule: /taobao\.com\/member\/login/,
        elem: "#J_LoginBox",
        target: "login-box no-longlogin module-static"
      },
      {
        rule: /acfun\.cn\/login/,
        elem: "#login",
        target: "login-account"
      }
    ],
    action: function(ruleObj) {
      document.querySelector(ruleObj.elem).className = ruleObj.target;
    },
    init: function() {
      let self = this;
      for (let i in self.include) {
        if (!!self.include[i].rule.test(hosthref)) {
          window.onload = function() {
            self.action(self.include[i]);
          };
          break;
        }
      }
    }
  };
  // try {
  //   avoidQRCodeLogin.init();
  // } catch (error) {
  //   console.log("avoidQRCodeLogin:", error);
  // }
  // *******************************************
  // 1.5 悬浮面板启用/关闭功能
  // 原理：插入功能面板，
  // todo:将配置存入cookie/localStorage,将功能嵌入到面板之后执行
  let functionSwitchPanel = {
    include: [/.*/],
    // include: [/localhost/, /127.0.0.1/],
    action: function(ruleObj) {
      // 持久化面板功能列表
      let functionArray = [
        "unfreezeWebInteraction",
        "skipZhiHuLogin",
        "clearClipBoardSuffix",
        "avoidQRCodeLogin"
      ];
      // 插入css和html
      document.head.innerHTML += this.createDomCss();
      document.body.innerHTML += this.createDomHtml();
      // 绑定事件，读取配置信息
      this.initListener();
      let configArray = this.loadConfig();
      // 根据配置信息启用插件功能
      for (let i = 0; i < functionArray.length; i++) {
        try {
          if (configArray[i] === "true") {
            // 可以使用new Function代替eval，实际上v8引擎已经做了优化，甚至性能优于new Function
            // https://jsperf.com/eval-vs-new-function-constructor/3
            // new Function(functionArray[i] + ".init()")();
            eval(functionArray[i] + ".init()");
          }
        } catch (error) {
          console.log("Error:", error);
        }
      }
    },
    createDomHtml: function() {
      let html = `
      <div id="switch_panel" class="hide">
        <div class="switch_panel_header"><a class="list_toggle_btn">展开 / 收起</a></div>
        <ul class="switch_panel_body">
          <li class="switch_panel_li"><label><input type="checkbox" />取消网页复制限制</label></li>
          <li class="switch_panel_li"><label><input type="checkbox" />知乎免登录浏览</label></li>
          <li class="switch_panel_li"><label><input type="checkbox" />去除网页黏贴的后缀</label></li>
          <li class="switch_panel_li"><label><input type="checkbox" />默认不使用二维码登录</label></li>
        </ul>
        <div class='switch_panel_footer'>
          <a class="config_cancel">重置</a>
          <a class="config_save">保存</a>
        </div>
      </div>
      `;
      return html;
    },
    createDomCss: function() {
      let css = `
      <style>
        #switch_panel {
          position: fixed;
          z-index: 999999;
          right: 50px;
          top: 50px;
          padding: 5px 8px;
          background-color: beige;
          color: cadetblue;
          user-select: none;
          border: 1px solid gray;
          border-radius: 8px;
        }
    
        #switch_panel .switch_panel_header {
          text-align: center;
          line-height: 30px;
        }
    
        #switch_panel .switch_panel_header a {
          padding: 3px 5px;
          cursor: pointer;
          color: inherit;
        }
    
        #switch_panel .switch_panel_body {
          list-style: none;
          padding: 0;
          margin: 0
        }
    
        #switch_panel.hide .switch_panel_body {
          display: none
        }
    
        #switch_panel .switch_panel_li {
          padding: 3px 0;
          font-size: 14px;
        }
    
        #switch_panel .switch_panel_li input {
          margin-right: 5px;
        }
    
        #switch_panel .switch_panel_footer {
          text-align: center;
          font-size: 14px;
          padding-top: 5px;
          line-height: 30px;
        }
    
        #switch_panel.hide .switch_panel_footer {
          display: none;
        }
    
        #switch_panel .switch_panel_footer a {
          color: rgb(194, 91, 163);
          border-radius: 5px;
          border: 1px solid #727272;
          padding: 2px 5px;
          cursor: pointer;
        }
      </style>
      `;
      return css;
    },
    initListener: function() {
      let _self = this;
      document.body
        .querySelectorAll("#switch_panel .list_toggle_btn")[0]
        .addEventListener("click", function(event) {
          // 切换列表显示
          let list = this.parentNode.parentNode;
          if (list.className.indexOf("hide") > -1) {
            list.className = list.className.replace("hide", "");
          } else {
            list.className += "hide";
          }
        });
      document.body
        .querySelectorAll("#switch_panel .config_cancel")[0]
        .addEventListener("click", function(event) {
          // 重置checkbox
          let list = this.parentNode.parentNode.querySelectorAll(
            ".switch_panel_body"
          )[0].children;
          let result = _self.stringifyConfig(list, "reset");
        });
      document.body
        .querySelectorAll("#switch_panel .config_save")[0]
        .addEventListener("click", function(event) {
          // 保存配置数据
          let list = this.parentNode.parentNode.querySelectorAll(
            ".switch_panel_body"
          )[0].children;
          let result = _self.stringifyConfig(list);
          localStorage.setItem("switch_panel", result);
        });
    },
    loadConfig: function() {
      // 读取配置信息
      let localConfig = localStorage.getItem("switch_panel") || "";
      let configArray = localConfig.split(",");
      let list = document.body.querySelectorAll(".switch_panel_body")[0]
        .children;
      for (let i = 0; i < list.length; i++) {
        list[i].querySelector("input").checked =
          configArray[i] === "true" ? true : false;
      }
      return configArray;
    },
    stringifyConfig: function(list = [], type = "") {
      // 格式化配置信息
      let configArray = [];
      let tmpString = "";
      for (let i = 0; i < list.length; i++) {
        if (type === "reset") {
          list[i].querySelector("input").checked = false;
        } else {
          configArray[i] = !!list[i].querySelector("input").checked;
        }
      }
      tmpString = configArray.join(",");
      return tmpString;
    },
    init: function() {
      window.alert = function() {};
      let self = this;
      for (let i in self.include) {
        if (!!self.include[i].test(hosthref)) {
          window.onload = function() {
            self.action(self.include[i]);
          };
          break;
        }
      }
    }
  };
  try {
    functionSwitchPanel.init();
  } catch (error) {
    console.log("functionSwitchPanel:", error);
  }
})();

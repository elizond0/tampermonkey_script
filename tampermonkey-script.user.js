// ==UserScript==
// @name         自用脚本测试
// @namespace    https://github.com/elizond0/tampermonkey_script
// @version      0.1
// @description  自用脚本大杂烩
// @author       elizond0
// @include      *
// @exclude
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_setClipboard
// @run-at       document-body
// @noframes
// ==/UserScript==

// 避免jq版本冲突
window.jq = $.noConflict(true);

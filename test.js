var CurArtType = "";
var UserID = -100;
var HeadType = 0;
var ArtLoginTypeID = 99;
var ArticleID;
var FirstArtID = "";
var IsInsertDataLog = "-1";
var CurPageNum = "1";
var newhighlight = true;
var CurReflectionCon = "";
var ArtLoginType = "";
var ArtLoginReflectionID = "";
var ArtLoginConID = "";
var searchType = "0";
var selTSNID = "div0";
var selItemNum = 0;
var CanNote = "";
var ArtUserID = "";
var CurSubReplyTextID = "";
var flashabcd = "";
var _isIE = navigator.appName == "Microsoft Internet Explorer";
var TestHightID = "";
var widthType = "0";
window.onerror = ignoreError;
function ignoreError() {
  return true;
}
var IsArtImgLog = true;
function GetArtImgLog() {
  var wH = $(window).height();
  var scrT = $(document).scrollTop();
  if (IsArtImgLog) {
    if (
      wH + scrT > $("#bgchange").height() + 35 &&
      !$("body").hasClass("articleMaxH")
    ) {
      artImgLog(2);
      IsArtImgLog = false;
    }
  }
}
window.onload = function() {
  setContentWidth();
  gotop();
  if ($("#original").val() == "1" || $("#original").val() == 1) {
    artImgLog(1);
    $(window).scroll(GetArtImgLog);
    $(window).resize(GetArtImgLog);
  }
};
if (
  getCookie("360doc1") != null &&
  ($("#isowner").val() == "false" || $("#isowner").val() == "False")
) {
  var isalert = false;
  function completeReading() {
    var winH = $(window).height(),
      hScrollT =
        $(document.documentElement).scrollTop() || $(document.body).scrollTop();
    var pageHeight = $(document).height() * 0.8;
    if (winH + hScrollT >= pageHeight) {
      if (!isalert) {
        isalert = true;
        pushArtRecommendRedis(3);
        pushUserInterestRedis(1);
      }
    }
  }
  setTimeout(function() {
    completeReading();
    $(window).scroll(completeReading);
    $(window).resize(completeReading);
  }, 30000);
}
function pushArtRecommendRedis(t) {
  $.ajax({
    url:
      "http://www.360doc.com/ajax/ArtRecommend.ashx?faid=" +
      $("#firstartid").val() +
      "&classid=" +
      $("#subclassid").val() +
      "&raid1=" +
      $("#recommendart1").val() +
      "&raid2=" +
      $("#recommendart2").val() +
      "&t=" +
      t,
    cache: false
  });
}
function pushUserInterestRedis(pushtype) {
  $.ajax({
    url:
      "http://www.360doc.com/ajax/createUserInterest.ashx?keywords=" +
      encodeURIComponent($("#firstkeywords").val()) +
      "&subclassid=" +
      $("#firstsubclassid").val() +
      "&tags=" +
      encodeURIComponent($("#firsttagwords").val()) +
      "&artid=" +
      $("#firstartid").val() +
      "&artuserid=" +
      $("#firstuid").val() +
      "&type=" +
      pushtype,
    cache: false
  });
}
var a_fontsizeTimer, a_bgcolorTimer;
$(".a_bgcolor").mouseenter(function() {
  clearTimeout(a_bgcolorTimer);
  $(this)
    .find("div")
    .show();
  $(".a_fontsize")
    .find("div")
    .hide();
});
$(".a_bgcolor").mouseleave(function() {
  var this_ = $(this);
  a_bgcolorTimer = setTimeout(function() {
    this_.find("div").hide();
  }, 300);
});
$(".a_fontsize").mouseenter(function() {
  clearTimeout(a_fontsizeTimer);
  $(this)
    .find("div")
    .show();
  $(".a_bgcolor")
    .find("div")
    .hide();
});
$(".a_fontsize").mouseleave(function() {
  var this_ = $(this);
  a_fontsizeTimer = setTimeout(function() {
    this_.find("div").hide();
  }, 300);
});
if (_isIE) {
  window.attachEvent("onbeforeunload", function() {
    try {
      DisplayPageInfo.cancel();
    } catch (e) {}
  });
  window.attachEvent("onbeforeunload", function() {
    try {
      GerLookingUserInfo.cancel();
    } catch (e) {}
  });
  window.attachEvent("onbeforeunload", function() {
    try {
    } catch (e) {
      HideFinishEditor.cancel();
    }
  });
}
if (window.screen.width > 1024) {
  var myDate = new Date();
  var curHour = myDate.getHours();
  var curMin = myDate.getMinutes();
  var CookieExpireHour = 23 - curHour;
  var CookieExpireMin = 60 - curMin;
  var divisionHour = Math.round((CookieExpireMin / 60) * 100) / 100;
  var strdivisionHour = divisionHour.toString();
  strdivisionHour = strdivisionHour.substring(1);
  var CookieExpireHour = CookieExpireHour + strdivisionHour;
  var cookieName = "doctaobaocookie";
  if (getCookie(cookieName) == null || getCookie(cookieName).length == 0) {
    widthType = "1";
    setCookie(cookieName, widthType, CookieExpireHour);
  } else {
    widthType = getCookie(cookieName);
  }
} else {
  widthType = "0";
}
if (widthType == "1") {
  $("#artrighthotarticle").css("width", "300px");
  $("#artrightnewarticle").css("width", "300px");
  if ($("#qh") != null) {
    $("#qh").css("width", "300px");
  }
  if ($("#docpart3") != null) {
    $("#docpart3").css("width", "300px");
  }
  if ($("#docpart2") != null) {
    $("#docpart2").css("width", "149px");
  }
  if ($("#docpart1") != null) {
    $("#docpart1").css("width", "150px");
  }
  if ($("#docTotalInfo") != null) {
    var totalinfowidth = $("#docTotalInfo").width();
    totalinfowidth = totalinfowidth + 50;
    totalinfowidth = totalinfowidth + "px";
    $("#docTotalInfo").css("width", totalinfowidth);
  }
}
var docWidth = "";
if (widthType == "1") {
  docWidth = "300";
} else if (widthType == "0") {
  docWidth = "250";
}
if (document.all("docadaboveref") != null) {
  document.all("docadaboveref").height =
    docadaboveref.document.body.scrollHeight;
  document.all("docadaboveref").width = docadaboveref.document.body.scrollWidth;
}
$(document).ready(function() {
  $(".a_colorlist span").click(function() {
    if (!$(this).hasClass("cur")) {
      var tclass = $(this).attr("class");
      $(this)
        .addClass("cur")
        .siblings("span")
        .removeClass("cur");
      $("#bgchange").attr("class", tclass);
      setCookie("360docArtPageBackGroundColor", tclass, 9000);
    }
  });
  $("input[name='font_Size']").click(function() {
    var val = $(this).val();
    $(".article_container").css("font-size", val + "px");
    setCookie("360docArtPageFontSize", val, 9000);
  });
  var artPageBackGroundColorCookie = getCookie("360docArtPageBackGroundColor");
  if (artPageBackGroundColorCookie && artPageBackGroundColorCookie != "") {
    $("#bgchange")
      .removeClass()
      .addClass(artPageBackGroundColorCookie);
    $(".a_colorlist span").each(function() {
      $(this).removeClass("cur");
      if ($(this).hasClass(artPageBackGroundColorCookie)) {
        $(this).addClass("cur");
      }
    });
  }
  var artPageFontSizeCookie = getCookie("360docArtPageFontSize");
  if (artPageFontSizeCookie && artPageFontSizeCookie != "") {
    $("#articlecontent").css("font-size", parseInt(artPageFontSizeCookie));
    $(".fschange")
      .find("input")
      .each(function() {
        $(this).removeAttr("checked");
        var fontSizeValue = $(this).attr("value");
        if (parseInt(artPageFontSizeCookie) == parseInt(fontSizeValue)) {
          $(this).attr("checked", "checked");
        }
      });
  } else {
    $(".fschange")
      .find("input")
      .eq(1)
      .attr("checked", "checked");
  }
  setContentWidth();
  setTimeout("showad()", 10);
  setTimeout("showad2()", 20);
  setTimeout("showad3()", 30);
  setTimeout("showad4()", 40);
  var jsonpsrc =
    "http://recommend.360doc.com/webartrecommend/" +
    $("#firstuid").val() +
    "_" +
    $("#firstartid").val();
  createJSONP(jsonpsrc, "callbackwebartrecommend");
  $(".his_her_type").each(function(index1) {
    $(this)
      .children("li")
      .each(function(index) {
        $(this).mouseover(function() {
          if (!$(this).hasClass("curone")) {
            if (!$(this).hasClass("cur")) {
              $(this)
                .addClass("cur")
                .siblings("li")
                .removeClass("cur");
              $(".his_her_list")
                .eq(index1)
                .stop()
                .animate({ left: -index * 280 }, 200);
            }
          }
        });
      });
  });
  try {
    if (document.getElementsByTagName("object").length > 0) {
      var objecttemp = document.getElementsByTagName("object");
      for (var i = 0; i < objecttemp.length; i++) {
        if (
          objecttemp[i].data != null &&
          objecttemp[i].data.indexOf("hunantv.com") > -1
        ) {
          if (
            objecttemp[i].getElementsByTagName("embed").length == 0 &&
            objecttemp[i].src == null
          ) {
            var tempembed = document.createElement("embed");
            tempembed.src = objecttemp[i].data;
            objecttemp[i].appendChild(tempembed);
            objecttemp[i].parentNode.replaceChild(tempembed, objecttemp[i]);
          }
        }
      }
    }
  } catch (err) {}
  if (_isIE) {
    reSetInitFlash1();
    reSetInitFlashEmbed1();
  } else {
    reSetInitFlashEmbed();
  }
  createvideolayer();
  xiamimusicreplace();
  filteriFrame();
  baiduShareConfig();
  if (CurArtType == "2") {
    initArticle();
  }
  gotop();
  if (document.referrer.toString().indexOf("index.html") > 0) {
    imgLog(4, "code=20-23-1&artid=" + $("#artid").val());
  } else if (document.referrer.toString().indexOf("classarticle.html") > 0) {
    imgLog(4, "code=20-23-2&artid=" + $("#artid").val());
  } else if (document.referrer.toString().indexOf("myreadroom.aspx") > 0) {
    imgLog(4, "code=20-23-3&artid=" + $("#artid").val());
  } else {
    imgLog(4, "code=20-23-4&artid=" + $("#artid").val());
  }
  $.ajax({
    url:
      "/ajax/HomeIndex/myreadhistory.ashx?type=1&articleid=" +
      $("#artid").val(),
    cache: false
  });
  if ($("#showrewardlist").val() == "1") {
    $("head").append(
      '<script type="text/javascript" src="http://www.360doc.com/js/common/docgjio.js?t=2018012801"></script><script src="http://www.360doc.com/js/Reward/ShowRewardList.js?t=2019031904" type="text/javascript" charset="utf-8"></script><link rel="stylesheet" type="text/css" href="http://css.360doc.com/Reward/articlereward.css?t=2019031904" />'
    );
  } else {
    isfollow($("#saveruserid").val());
  }
  $("#articlecontent a").click(function(e) {
    if ($("#firstuid").val() != $("#myuid").val()) {
      var url = $(this).attr("href");
      var isTrut = true;
      if (
        url != null &&
        url != undefined &&
        url != "" &&
        url.lenght > 9 &&
        url.substring(0, 9) == "/content/"
      ) {
        isTrut = false;
      }
      if ($(this).attr("datatype") == "360doczkqw") {
        isTrut = false;
      }
      if (
        domainURI(url) != "www.360doc.com" &&
        domainURI(url) != "360doc.com" &&
        isTrut
      ) {
        e.preventDefault();
        if ($(".doc360outlinkpop").length > 0) {
          $(".doc360outlinkpop").remove();
        }
        $("body").append(
          '<div class="doc360outlinkpop"><a href="javascript:a_closer();" class="closer">×</a><p>如需浏览，请复制网址后使用浏览器访问</p><p>' +
            url +
            "</p></div>"
        );
        $(".doc360outlinkpop").css({ top: e.pageY + 12, left: e.pageX - 185 });
        $(".doc360outlinkpop").show();
      }
    }
  });
});
function domainURI(str) {
  var durl = /http:\/\/([^\/]+)\/{0,1}/i;
  domain = str.match(durl);
  if (domain == null) {
    return "";
  }
  return domain[1];
}
function filteriFrame() {
  var filterJson = [
    {
      filterurl: "qq.com",
      unfilterurl: "qqmusic.qq.com",
      imgurl: "http://pubimage.360doc.com/qq3.gif"
    },
    { filterurl: "youku.com", imgurl: "http://pubimage.360doc.com/youku.jpg" }
  ];
  try {
    var currcontentcontainer = document.getElementById("articlecontent");
    var dociframes = currcontentcontainer.getElementsByTagName("iframe");
    for (var i = 0; i < dociframes.length; i++) {
      for (var j = 0; j < filterJson.length; j++) {
        if (
          dociframes[i].src.toLowerCase().indexOf(filterJson[j]["filterurl"]) >
            -1 &&
          dociframes[i].src
            .toLowerCase()
            .indexOf(filterJson[j]["unfilterurl"]) < 0
        ) {
          var iframeimghtml =
            "<div style='width:" +
            dociframes[i].width +
            "px;height:" +
            dociframes[i].height +
            "px;cursor:hand;'><a href='" +
            dociframes[i].src.replace("width=", "").replace("height=", "") +
            "' target='_blank' title='点击播放' style='width:" +
            dociframes[i].width +
            "px;height:" +
            dociframes[i].height +
            "px;cursor:hand;'><img src='" +
            filterJson[j]["imgurl"] +
            "' style='width:" +
            dociframes[i].width +
            "px;height:" +
            dociframes[i].height +
            "px;cursor:hand;' /></a></div>";
          var div = document.createElement("div");
          div.innerHTML = iframeimghtml;
          dociframes[i].parentNode.replaceChild(div, dociframes[i]);
          i--;
          break;
        }
      }
    }
  } catch (err) {}
}
function GerLookingUserInfo(
  type,
  ArtUserIDcg,
  isshowref,
  arttype,
  Physicleflashpath,
  Pagenum,
  PageNumber,
  documentDownload
) {
  CurArtType = arttype;
  if (startWithFunction(CurArtType, "5")) {
    if (Physicleflashpath != "-1") {
      document.getElementById("viewerPlaceHolder").style.display = "";
      CreateFlexpaper(Physicleflashpath, Pagenum, PageNumber, documentDownload);
    }
  }
  IsShowReflection = isshowref;
  var url = window.location.toString();
  if (type == 0) {
    PageType = type;
    var indexArticleFirst = url.lastIndexOf("_");
    var indexArticleLast = "";
    if (url.indexOf("shtml") > -1) {
      indexArticleLast = url.lastIndexOf(".shtml");
    } else {
      indexArticleLast = url.lastIndexOf(".html");
    }
    if (indexArticleLast >= 0) {
      ArticleID = url.substring(indexArticleFirst + 1, indexArticleLast);
    } else {
      ArticleID = url.substring(indexArticleFirst + 1);
    }
    indexArticleFirst = url.lastIndexOf("/");
    indexArticleLast = url.lastIndexOf("_");
    if (indexArticleLast >= 0) {
      ArtUserID = url.substring(indexArticleFirst + 1, indexArticleLast);
      ownerid = ArtUserID;
    } else {
      ArtUserID = url.substring(indexArticleFirst + 1);
      ownerid = ArtUserID;
    }
  } else {
    PageType = type;
    if (getQueryString("id") == "") {
      if (url.lastIndexOf(".aspx") >= 0) {
        var indexArticleFirst = url.lastIndexOf("/");
        var indexArticleLast = url.lastIndexOf(".aspx");
        if (indexArticleLast >= 0) {
          ArticleID = url.substring(indexArticleFirst + 1, indexArticleLast);
        } else {
          ArticleID = url.substring(indexArticleFirst + 1);
        }
      } else {
        PageType = type;
        var indexArticleFirst = url.lastIndexOf("_");
        var indexArticleLast = "";
        if (url.indexOf("shtml") > -1) {
          indexArticleLast = url.lastIndexOf(".shtml");
        } else {
          indexArticleLast = url.lastIndexOf(".html");
        }
        if (indexArticleLast >= 0) {
          ArticleID = url.substring(indexArticleFirst + 1, indexArticleLast);
        } else {
          ArticleID = url.substring(indexArticleFirst + 1);
        }
        indexArticleFirst = url.lastIndexOf("/");
        indexArticleLast = url.lastIndexOf("_");
        if (indexArticleLast >= 0) {
          ArtUserID = url.substring(indexArticleFirst + 1, indexArticleLast);
          ownerid = ArtUserID;
        } else {
          ArtUserID = url.substring(indexArticleFirst + 1);
          ownerid = ArtUserID;
        }
        type = 0;
      }
    } else {
      ArticleID = getQueryString("id");
    }
    ArtUserID = ArtUserIDcg;
    ownerid = ArtUserIDcg;
  }
  var BookRef = "";
  var IsHave = document.getElementById("AdArtRight");
  if (IsHave == null) {
    BookRef = "GetBookTwo";
    StaticModelType = 1;
  } else {
    BookRef = "GetBook";
    StaticModelType = 2;
  }
  var isHaveSearchArt;
  isHaveSearchArt = 0;
  CurrentPageNum = 1;
  pageurl = "http://www.360doc.com/resaveArt.aspx?articleid=" + ArticleID;
  var CurReadRoomClassID = "0";
  if (document.getElementById("artreadroomid") != null) {
    CurReadRoomClassID = document.getElementById("artreadroomid").value;
  }
  getJSON(
    "http://webservice.360doc.com/GetArtInfo20130912NewV.ashx?UID=" +
      UserID +
      "," +
      ArtUserID +
      "," +
      BookRef +
      "," +
      ArticleID +
      "," +
      HeadType +
      "," +
      isHaveSearchArt +
      "@cg@" +
      CurReadRoomClassID +
      "&jsoncallback=?",
    function(responseText) {
      try {
        nextPageReflection(REFLECTION_PAGENUM, 1, ArticleID, true);
      } catch (err) {}
      DisplayPageInfo(responseText.html);
      $(".wenzhang_pl_left")
        .children("a")
        .click(function() {
          artStatistics("20-4-6");
        });
      $(".mzbodl")
        .children("a")
        .click(function() {
          artStatistics("20-4-7");
        });
      if (UserID == ArtUserID) {
        $("#divresaveunder").hide();
      }
      if (UserID != ArtUserID) {
        $("#docsource").hide();
      } else {
        $("#divtort").hide();
        $("#docsource").show();
      }
    },
    function(error) {
      alert(error);
    }
  );
}
var REFLECTION_PAGENUM = 10;
var spreadStatus = 1;
var fristRefNum = 0;
function nextPageReflection(pagenum, currpage, articleid, isMore) {
  getJSON(
    "http://webservice.360doc.com/Reflection.ashx?getreflection=1&artid=" +
      ArticleID +
      "&pagenum=" +
      REFLECTION_PAGENUM +
      "&currentpage=" +
      currpage +
      "&jsoncallback=?",
    function(responseText) {
      var reflectionJSON = responseText.html;
      if (typeof responseText.html === "string") {
        reflectionJSON = JSON.parse(reflectionJSON);
      }
      if (reflectionJSON.status != "1") {
        return;
      }
      if (reflectionJSON.reflectionNum <= 0) {
      }
      if (reflectionJSON.reflectionNum > 99) {
        $("#refNumSpan").text("99+");
      } else {
        $("#refNumSpan").text(reflectionJSON.reflectionNum);
      }
      if (isMore) {
        fristRefNum = reflectionJSON.reflectionNum;
      }
      if (reflectionJSON.reflectionList.length > 0) {
        var html = "";
        for (var i = 0; i < reflectionJSON.reflectionList.length; i++) {
          html +=
            '<li><span class="reply_pic f_left"><a href="//www.360doc.com/userhome/' +
            reflectionJSON.reflectionList[i].reflecterUserID +
            '"><img src="' +
            reflectionJSON.reflectionList[i].reflecterFace +
            '" /></a></span>                        <div class="reply_r f_left">                            <div class="reply_text_str">                                <p class="f_left">                                    <a href="//www.360doc.com/userhome/' +
            reflectionJSON.reflectionList[i].reflecterUserID +
            '">' +
            decodeURIComponent(
              reflectionJSON.reflectionList[i].reflecterUsername
            ) +
            "</a><span>" +
            reflectionJSON.reflectionList[i].reflectTime +
            "</span>                                </p>                        " +
            (reflectionJSON.reflectionList[i].isAlter == "1"
              ? "   <i onclick=\"AlterReflect('" +
                ("reflectionContentP_" +
                  reflectionJSON.reflectionList[i].reflectionID) +
                "'," +
                reflectionJSON.reflectionList[i].reflectionID +
                ')">修改</i>       '
              : "") +
            '                         <a href="javascript:void(0);" class="reply_cai f_right" id="' +
            reflectionJSON.reflectionList[i].reflectionID +
            '_up" onclick="zancai(1, ' +
            reflectionJSON.reflectionList[i].reflectionID +
            ', this.id)">' +
            reflectionJSON.reflectionList[i].downNum +
            '</a>                                <a href="javascript:void(0);" class="reply_zan f_right" id="' +
            reflectionJSON.reflectionList[i].reflectionID +
            '_down" onclick="zancai(0, ' +
            reflectionJSON.reflectionList[i].reflectionID +
            ', this.id)">' +
            reflectionJSON.reflectionList[i].upNum +
            '</a>                            </div>                                                     <p class="reply_text" id="reflectionContentP_' +
            reflectionJSON.reflectionList[i].reflectionID +
            '">' +
            decodeURIComponent(reflectionJSON.reflectionList[i].reflection) +
            '</p>   <div id="reflectionListDIV_' +
            reflectionJSON.reflectionList[i].reflectionID +
            '" class="reply_btn"><a href="javascript:void(0)" onclick="inserReplyTextarea(' +
            reflectionJSON.reflectionList[i].reflectionID +
            ',this)">回复</a>' +
            (reflectionJSON.reflectionList[i].replyNum > 0
              ? '<a id="openRefA_' +
                reflectionJSON.reflectionList[i].reflectionID +
                '" href="javascript:void(0)" class="a1" onclick="getReplyList(' +
                ArticleID +
                "," +
                reflectionJSON.reflectionList[i].reflectionID +
                ')">' +
                reflectionJSON.reflectionList[i].replyNum +
                '条回复</a><a id="closeRefA_' +
                reflectionJSON.reflectionList[i].reflectionID +
                '" href="javascript:void(0)" onclick="closeReply(' +
                reflectionJSON.reflectionList[i].reflectionID +
                ')" class="a1 a1s" style="display:none">收起回复</a>'
              : "") +
            "</div>                        </div></li>";
        }
        $("#reflectionListUL").html(html);
        $("#pageBarDIV").html(decodeURIComponent(reflectionJSON.pageBar));
        if (reflectionJSON.pageBar == "") {
          $("#pageBarDIV").hide();
        } else {
          $("#pageBarDIV").show();
        }
        if ($("#reflectionListUL li").length > 3 && isMore) {
          $("#reflectionListUL li,#pageBarDIV").hide();
          $("#reflectionListUL li")
            .eq(0)
            .show();
          $("#reflectionListUL li")
            .eq(1)
            .show();
          $("#reflectionListUL li")
            .eq(2)
            .show();
          spreadStatus = 1;
        }
        if ($("#reflectionListUL li").length <= 3) {
          $(".reply_more").hide();
        } else {
          if (fristRefNum > 3) $(".reply_more").show();
        }
      } else {
        $(".reply_more").hide();
      }
    },
    function(error) {
      alert(error);
    }
  );
}
function setSpread() {
  if (spreadStatus == 1) {
    $("#reflectionListUL li,#pageBarDIV").show();
    $(".reply_more").html(
      '收起评论 <img src="http://pubimage.360doc.com/NewArticle/reply_btn2.gif" />'
    );
    spreadStatus = 2;
  } else {
    $("#reflectionListUL li,#pageBarDIV").hide();
    $("#reflectionListUL li")
      .eq(0)
      .show();
    $("#reflectionListUL li")
      .eq(1)
      .show();
    $("#reflectionListUL li")
      .eq(2)
      .show();
    $(".reply_more").html(
      '查看更多评论 <img src="http://pubimage.360doc.com/NewArticle/reply_btn.gif" />'
    );
    spreadStatus = 1;
  }
}
function closeReply(refid) {
  $("#replyListUL_" + refid).hide();
  $("#closeRefA_" + refid).hide();
  $("#openRefA_" + refid).show();
}
function inserReplyTextarea(refid, t) {
  if ($("#replyTextareaDIV_" + refid).length > 0) {
    $("#replyTextareaDIV_" + refid).remove();
  } else {
    var html =
      '<div class="new_huifubt f_left new_huifubt_show" id="replyTextareaDIV_' +
      refid +
      '"><textarea id="textareaOfReplay' +
      refid +
      '"></textarea><p><a id="btnOfReply' +
      refid +
      '" href="javascript:void(0)" onclick="ReplyReflection(' +
      refid +
      ', 1)">回复</a></p></div>';
    $("#reflectionListDIV_" + refid).after(html);
  }
}
function reSetReplyList(artid, refid) {
  getJSON(
    "http://webservice.360doc.com/Reflection.ashx?getreply=1&artid=" +
      artid +
      "&refid=" +
      refid +
      "&jsoncallback=?",
    function(responseText) {
      var replyJSON = responseText.html;
      if (typeof responseText.html === "string") {
        replyJSON = JSON.parse(replyJSON);
      }
      if (replyJSON.status != "1") {
        return;
      }
      if (replyJSON.replyList.length > 0) {
        var html = "";
        for (var i = 0; i < replyJSON.replyList.length; i++) {
          html +=
            '<li>                                    <span class="reply_pic f_left"><a href="//www.360doc.com/userhome/' +
            replyJSON.replyList[i].reflecterUserID +
            '"><img src="' +
            replyJSON.replyList[i].reflecterFace +
            '" /></a></span>                                    <div class="reply_r f_left">                                        <div class="reply_text_str">                                            <p class="f_left">                                                <a href="//www.360doc.com/userhome/' +
            replyJSON.replyList[i].reflecterUserID +
            '">' +
            decodeURIComponent(replyJSON.replyList[i].reflecterUsername) +
            "</a><span>" +
            replyJSON.replyList[i].reflectTime +
            "</span>                                            </p>                     " +
            (replyJSON.replyList[i].isAlter == "1"
              ? '   <i onclick="AlterReflectReply(' +
                refid +
                ", " +
                "'replyContentP_" +
                replyJSON.replyList[i].reflectionID +
                "', " +
                replyJSON.replyList[i].reflectionID +
                ", " +
                "'replyUpdateP_" +
                replyJSON.replyList[i].reflectionID +
                "')\">修改</i>       "
              : "") +
            '                       <a href="javascript:void(0);" class="reply_cai f_right" id="' +
            replyJSON.replyList[i].reflectionID +
            '_up" onclick="zancai(1, ' +
            replyJSON.replyList[i].reflectionID +
            ', this.id)">' +
            replyJSON.replyList[i].downNum +
            '</a>                                            <a href="javascript:void(0);" class="reply_zan f_right" id="' +
            replyJSON.replyList[i].reflectionID +
            '_down" onclick="zancai(0, ' +
            replyJSON.replyList[i].reflectionID +
            ', this.id)">' +
            replyJSON.replyList[i].upNum +
            '</a>                                        </div>                                        <p class="reply_text" id="replyContentP_' +
            replyJSON.replyList[i].reflectionID +
            '">' +
            decodeURIComponent(replyJSON.replyList[i].reflection) +
            "</p>                                    </div>                                </li>";
        }
        $("#replyListUL_" + refid).remove();
        if ($("#reflectionListDIV_" + refid).next().length > 0) {
          $("#reflectionListDIV_" + refid)
            .next()
            .after('<ul id="replyListUL_' + refid + '">' + html + "</ul>");
        } else {
          $("#reflectionListDIV_" + refid).after(
            '<ul id="replyListUL_' + refid + '">' + html + "</ul>"
          );
        }
        $("#replyListUL_" + refid).show();
        if (
          $("#openRefA_" + refid).length > 0 &&
          $("#closeRefA_" + refid).length > 0
        ) {
          $("#closeRefA_" + refid).show();
          $("#openRefA_" + refid).hide();
          $("#openRefA_" + refid).text(replyJSON.replyList.length + "条回复");
        }
        $("#replyTextareaDIV_" + refid).remove();
      }
    },
    function(error) {
      alert(error);
    }
  );
  $("#replyListUL_" + refid).remove();
  $("#closeRefA_" + refid).hide();
  $("#openRefA_" + refid).show();
  if ($("#openRefA_" + refid).length > 0) {
  }
}
function getReplyList(artid, refid) {
  if ($("#replyListUL_" + refid).length > 0) {
    if ($("#replyListUL_" + refid).is(":hidden")) {
      $("#replyListUL_" + refid).show();
      $("#closeRefA_" + refid).show();
      $("#openRefA_" + refid).hide();
    } else {
      $("#replyListUL_" + refid).hide();
      $("#closeRefA_" + refid).hide();
      $("#openRefA_" + refid).show();
    }
    return;
  } else {
  }
  getJSON(
    "http://webservice.360doc.com/Reflection.ashx?getreply=1&artid=" +
      artid +
      "&refid=" +
      refid +
      "&jsoncallback=?",
    function(responseText) {
      var replyJSON = responseText.html;
      if (typeof responseText.html === "string") {
        replyJSON = JSON.parse(replyJSON);
      }
      if (replyJSON.status != "1") {
        return;
      }
      if (replyJSON.replyList.length > 0) {
        var html = "";
        for (var i = 0; i < replyJSON.replyList.length; i++) {
          html +=
            '<li>                                    <span class="reply_pic f_left"><a href="//www.360doc.com/userhome/' +
            replyJSON.replyList[i].reflecterUserID +
            '"><img src="' +
            replyJSON.replyList[i].reflecterFace +
            '" /></a></span>                                    <div class="reply_r f_left">                                        <div class="reply_text_str">                                            <p class="f_left">                                                <a href="//www.360doc.com/userhome/' +
            replyJSON.replyList[i].reflecterUserID +
            '">' +
            decodeURIComponent(replyJSON.replyList[i].reflecterUsername) +
            "</a><span>" +
            replyJSON.replyList[i].reflectTime +
            "</span>                                            </p>                 " +
            (replyJSON.replyList[i].isAlter == "1"
              ? '   <i onclick="AlterReflectReply(' +
                refid +
                ", " +
                "'replyContentP_" +
                replyJSON.replyList[i].reflectionID +
                "', " +
                replyJSON.replyList[i].reflectionID +
                ", " +
                "'replyUpdateP_" +
                replyJSON.replyList[i].reflectionID +
                "')\">修改</i>       "
              : "") +
            '                           <a href="javascript:void(0);" class="reply_cai f_right"  id="' +
            replyJSON.replyList[i].reflectionID +
            '_up" onclick="zancai(1, ' +
            replyJSON.replyList[i].reflectionID +
            ', this.id)">' +
            replyJSON.replyList[i].downNum +
            '</a>                                            <a href="javascript:void(0);" class="reply_zan f_right" id="' +
            replyJSON.replyList[i].reflectionID +
            '_down" onclick="zancai(0, ' +
            replyJSON.replyList[i].reflectionID +
            ', this.id)">' +
            replyJSON.replyList[i].upNum +
            '</a>                                        </div>                                        <p class="reply_text" id="replyContentP_' +
            replyJSON.replyList[i].reflectionID +
            '">' +
            decodeURIComponent(replyJSON.replyList[i].reflection) +
            "</p>                                    </div>                                </li>";
        }
        if ($("#reflectionListDIV_" + refid).next().length > 0) {
          $("#reflectionListDIV_" + refid)
            .next()
            .after('<ul id="replyListUL_' + refid + '">' + html + "</ul>");
        } else {
          $("#reflectionListDIV_" + refid).after(
            '<ul id="replyListUL_' + refid + '">' + html + "</ul>"
          );
        }
        $("#replyListUL_" + refid).show();
        $("#closeRefA_" + refid).show();
        $("#openRefA_" + refid).hide();
      } else {
        alert("该回复已被删除");
      }
    },
    function(error) {
      alert(error);
    }
  );
}
function DisplayPageInfo(ResultInfo) {
  var ReturnNickName = "";
  var strCanNote = "";
  var strBookHtml = "";
  var strReadnum = "";
  var strSavernum = "";
  var strHead = "";
  var strPageInfo = "";
  var strFlowers = "";
  var strRefInfo = "";
  var strHighLightNum = "";
  var strDownloadTimes = "";
  var AdInfo = "";
  var target = "l@c@g@t";
  var index = 0;
  var NB = 0;
  var originalstatus = "";
  while (NB < 17) {
    NB = NB + 1;
    if (NB == 1) {
      index = ResultInfo.indexOf(target);
      ReturnNickName = ResultInfo.substring(0, index);
      ResultInfo = ResultInfo.substring(index + 7);
    }
    if (NB == 2) {
      index = ResultInfo.indexOf(target);
      CanNote = ResultInfo.substring(0, index);
      ResultInfo = ResultInfo.substring(index + 7);
    }
    if (NB == 3) {
      index = ResultInfo.indexOf(target);
      strBookHtml = ResultInfo.substring(0, index);
      ResultInfo = ResultInfo.substring(index + 7);
    }
    if (NB == 4) {
      index = ResultInfo.indexOf(target);
      strReadnum = ResultInfo.substring(0, index);
      ResultInfo = ResultInfo.substring(index + 7);
    }
    if (NB == 5) {
      index = ResultInfo.indexOf(target);
      strSavernum = ResultInfo.substring(0, index);
      ResultInfo = ResultInfo.substring(index + 7);
    }
    if (NB == 6) {
      index = ResultInfo.indexOf(target);
      strHead = ResultInfo.substring(0, index);
      ResultInfo = ResultInfo.substring(index + 7);
    }
    if (NB == 7) {
      index = ResultInfo.indexOf(target);
      strPageInfo = ResultInfo.substring(0, index);
      ResultInfo = ResultInfo.substring(index + 7);
    }
    if (NB == 8) {
      index = ResultInfo.indexOf(target);
      strRefInfo = ResultInfo.substring(0, index);
      ResultInfo = ResultInfo.substring(index + 7);
    }
    if (NB == 9) {
      index = ResultInfo.indexOf(target);
      FirstArtID = ResultInfo.substring(0, index);
      ResultInfo = ResultInfo.substring(index + 7);
    }
    if (NB == 10) {
      index = ResultInfo.indexOf(target);
      strHighLightNum = ResultInfo.substring(0, index);
      ResultInfo = ResultInfo.substring(index + 7);
    }
    if (NB == 11) {
      index = ResultInfo.indexOf(target);
      ArtUserNickName = ResultInfo.substring(0, index);
      ResultInfo = ResultInfo.substring(index + 7);
    }
    if (NB == 12) {
      index = ResultInfo.indexOf(target);
      IsInsertDataLog = ResultInfo.substring(0, index);
      ResultInfo = ResultInfo.substring(index + 7);
    }
    if (NB == 13) {
      index = ResultInfo.indexOf(target);
      UserID = ResultInfo.substring(0, index);
      ResultInfo = ResultInfo.substring(index + 7);
    }
    if (NB == 14) {
      index = ResultInfo.indexOf(target);
      AdInfo = ResultInfo.substring(0, index);
      ResultInfo = ResultInfo.substring(index + 7);
    }
    if (NB == 15) {
      index = ResultInfo.indexOf(target);
      strFlowers = ResultInfo.substring(0, index);
      ResultInfo = ResultInfo.substring(index + 7);
    }
    if (NB == 16) {
      index = ResultInfo.indexOf(target);
      strDownloadTimes = ResultInfo.substring(0, index);
      ResultInfo = ResultInfo.substring(index + 7);
      if (document.getElementById("documentDownloadTime") != null) {
        document.getElementById(
          "documentDownloadTime"
        ).innerHTML = strDownloadTimes;
      }
    }
    if (NB == 17) {
      index = ResultInfo.indexOf(target);
      originalstatus = ResultInfo.substring(0, index);
      ResultInfo = ResultInfo.substring(index + 7);
    }
  }
  if (document.getElementById("loginstatus") != null) {
    if (UserID == 0) {
      document.getElementById("loginstatus").innerHTML =
        '<a href="http://www.360doc.com/login.aspx?reurl=' +
        window.location.toString() +
        '">登录</a>';
    } else {
      document.getElementById("loginstatus").innerHTML =
        '<a onclick="clearCookies();" href="#">退出</a>';
    }
  }
  if (ArtUserID == UserID) {
    HeadType = 1;
    IsArticleOwner = 1;
  } else {
    HeadType = 2;
    IsArticleOwner = 0;
    document.body.oncopy = function() {
      return copyArt();
    };
  }
  var TestDivCG = document.getElementById("360docIsStranger");
  if (TestDivCG == null || TestDivCG == "") {
  } else {
    var CurUserNameCookies = getCookie("360doc1");
    if (CurUserNameCookies == "" || CurUserNameCookies == null) {
      document.getElementById("360docIsStranger").innerHTML =
        '<div class="greenkuang"><div class="greenkuang1 login_box_font "><div style="padding-top:8px; padding-left:18px;">欢迎浏览<span class="mz" style=" font-weight:bold;"> <a href="http://www.360doc.com/userhome/' +
        ArtUserID +
        '" target="_blank">' +
        ArtUserNickName +
        '</a> </span>个人图书馆的文章，想收藏这篇好文章吗？花一分钟<a href="http://www.360doc.com/register.aspx?refer=2&reurl=resaveArt.aspx?articleid=' +
        ArticleID +
        '&isreg=1"><img src="http://pubimage.360doc.com/botton_zc.gif" alt="免费注册" style="margin-bottom: -4px; margin-right:5px;margin-left:5px;"  onclick="InsertLogData(3);"/></a>吧！</div></div></div>';
    } else {
      document.getElementById("360docIsStranger").innerHTML = "";
    }
  }
  if (ReturnNickName == "cNullg") {
    ReturnNickName = "";
  }
  NicknameCG = ReturnNickName;
  if (document.getElementById("360doc_Readnum") != null) {
    document.getElementById("360doc_Readnum").innerHTML =
      "&nbsp;&nbsp;阅&nbsp;" + strReadnum + "&nbsp;";
  }
  if (StaticModelType == 1) {
  }
  var IsHaveAdBelow = document.getElementById("360Ad07Below");
  if (IsHaveAdBelow == null) {
  } else {
    document.getElementById("360Ad07Below").innerHTML =
      "<iframe marginwidth='0' id='IframeAd' marginheight='0' frameborder='0' scrolling='no'width='740' height='250' src='http://www.360doc.com/ad/belowContentAD2.htm' allowTransparency=true></iframe>";
  }
  if (document.getElementById("360AdRight") != null) {
    document.getElementById("360AdRight").innerHTML =
      "<iframe marginwidth='0' frameborder='0' scrolling='no' width='250' height='250' src='http://www.360doc.com/ad/adright.html'></iframe>";
  }
  if (strSavernum == "cNullg") {
    strSavernum = "";
  }
  if (strSavernum.indexOf("<div id=") > -1) {
    var TempSaverNum = strSavernum.substring(
      0,
      strSavernum.indexOf("<div id=")
    );
    var TempSaverUser = strSavernum.substring(strSavernum.indexOf("<div id="));
    if (document.getElementById("360doc_saverNum") != null) {
      document.getElementById("360doc_saverNum").innerHTML =
        "&nbsp;转&nbsp;" + TempSaverNum;
    }
    if (document.getElementById("360doc_saverUser") != null) {
      document.getElementById("360doc_saverUser").innerHTML = TempSaverUser;
    }
  } else if (strSavernum == 0) {
    if (document.getElementById("360docResaveCount") != null) {
      $("#360docResaveCount").hide();
    }
  } else {
    document.getElementById("360doc_saverNum").innerHTML =
      "&nbsp;转&nbsp;" + strSavernum;
  }
  if (UserID == 0) {
  }
  if (strHead == "cNullg") {
    document.getElementById("resavelayer1").innerHTML =
      '<div class="zcommond"><a class="p2" href="javascript:void(0);" onclick="SaveArt();artStatistics(\'20-3-1\');">转藏到我的图书馆</a><div class="s2 f_right" onclick="setTimeout(function(){$(\'.article_data_right .sharelist_new\').slideToggle(0);},10);"><span onclick="artStatistics(\'20-8-2\');"></span></div><a class="p1" href="javascript:void(0);" onclick="shareWeixin();artStatistics(\'20-8-5\');pushUserInterestRedis(4);">微信</a> <span class="s1" onclick="setTimeout(function(){$(\'.article_data_right .sharelist_new\').slideToggle(0);},10);artStatistics(\'20-8-1\');" onmouseover="this.style.color=\'#0f659c\'" onmouseout="this.style.color=\'\'">分享：</span></div><div class="sharelist_new" id="fenxiangLayer"> <a class="slbg1" href="javascript:void(0);" data-cmd="qzone" onclick="artStatistics(\'20-8-7\');pushUserInterestRedis(4);">QQ空间</a> <a class="slbg2" href="javascript:void(0);" data-cmd="sqq" onclick="artStatistics(\'20-8-9\');pushUserInterestRedis(4);">QQ好友</a> <a class="slbg3" href="javascript:void(0);" data-cmd="tsina" onclick="artStatistics(\'20-8-11\');pushUserInterestRedis(4);">新浪微博</a><a class="slbg5" href="javascript:void(0);" onclick="showdivemail1();artStatistics(\'20-8-15\');pushUserInterestRedis(4);">推荐给朋友</a> </div><div style="position: absolute;display:none;z-index:1;left:143px;" id="fuzhitishidiv"></div>';
  } else {
    var LinkUrl = "";
    if (CurArtType == "2") {
      LinkUrl =
        "http://www.360doc.com/editphoto2.aspx?articleid=" + ArticleID + "";
    } else if (CurArtType == "3") {
      LinkUrl =
        "http://www.360doc.com/editmusic2.aspx?articleid=" + ArticleID + "";
    } else if (CurArtType == "6") {
      LinkUrl =
        "http://www.360doc.com/editbook2.aspx?articleid=" + ArticleID + "";
    } else {
      if (startWithFunction(CurArtType, "4")) {
        LinkUrl =
          "http://www.360doc.com/editvideo2.aspx?articleid=" + ArticleID + "";
      } else {
        if (startWithFunction(CurArtType, "5")) {
          LinkUrl =
            "http://www.360doc.com/editdocument2.aspx?articleid=" +
            ArticleID +
            "";
        } else {
          LinkUrl =
            "http://www.360doc.com/edit/editartnew.aspx?articleid=" +
            ArticleID +
            "";
        }
      }
    }
    var otherClick = "";
    if (originalstatus == 1 || originalstatus == 2) {
      otherClick =
        "return showOriginalTipBeforeEdit('" + originalstatus + "');";
      LinkUrl = "javascript:void(0);";
    }
    document.getElementById("resavelayer1").innerHTML =
      '<div class="zcommond"><a class="p3" onclick="artStatistics(\'20-17\');' +
      otherClick +
      '" href="' +
      LinkUrl +
      '">修改</a><div class="s2 f_right" onclick="setTimeout(function(){$(\'.article_data_right .sharelist_new\').slideToggle(0);$(\'#fenxiangLayer\').css(\'left\',\'131px\');},10);artStatistics(\'20-8-2\');"><span></span></div><a class="p1" href="javascript:void(0);" onclick="shareWeixin();artStatistics(\'20-8-5\');pushUserInterestRedis(4);">微信</a> <span class="s1" onclick="setTimeout(function(){$(\'.article_data_right .sharelist_new\').slideToggle(0);$(\'#fenxiangLayer\').css(\'left\',\'131px\');},10);artStatistics(\'20-8-1\');" onmouseover="this.style.color=\'#0f659c\'" onmouseout="this.style.color=\'\'">分享：</span></div><div class="sharelist_new" id="fenxiangLayer"> <a class="slbg1" href="javascript:void(0);" data-cmd="qzone" onclick="artStatistics(\'20-8-7\');pushUserInterestRedis(4);">QQ空间</a> <a class="slbg2" href="javascript:void(0);" data-cmd="sqq" onclick="artStatistics(\'20-8-9\');pushUserInterestRedis(4);">QQ好友</a> <a class="slbg3" href="javascript:void(0);" data-cmd="tsina" onclick="artStatistics(\'20-8-11\');pushUserInterestRedis(4);">新浪微博</a><a class="slbg5" href="javascript:void(0);" onclick="showdivemail1();artStatistics(\'20-8-15\');pushUserInterestRedis(4);">推荐给朋友</a> </div><div style="position: absolute;display:none;z-index:1;left:143px;" id="fuzhitishidiv"></div>';
  }
  if (document.getElementById("articleflowernum") != null) {
    document.getElementById("articleflowernum").innerHTML = strFlowers;
    if (strFlowers > 999) {
      $(".bottombtn .sharelist_new").css("left", "352px");
    } else if (strFlowers > 99) {
      $(".bottombtn .sharelist_new").css("left", "345px");
    } else if (strFlowers > 9) {
      $(".bottombtn .sharelist_new").css("left", "336px");
    }
  }
  var target2 = "@@@%%@@@";
  var index2 = strPageInfo.indexOf(target2);
  var TotalN = strPageInfo.substring(0, index2);
  var TotalP = strPageInfo.substring(index2 + 8);
  if (strHighLightNum != "cNullg" || HeadType == 1) {
    if (!startWithFunction(CurArtType, "5")) {
      var oHead = document.getElementsByTagName("head")[0];
      var oScript = document.createElement("script");
      oScript.type = "text/javascript";
      if (_isIE) {
        oScript.src =
          "http://www.360doc.com/js/HighlightStickyforIE170510.js?t=2018062004";
      } else {
        oScript.src =
          "http://www.360doc.com/js/HighlightStickyforOther170510.js?t=2018062004";
      }
      oHead.appendChild(oScript);
    }
  } else {
    var oHead = document.getElementsByTagName("head")[0];
    var oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.src = "http://www.360doc.com/js/EssayforIE120425.js?t=2018062004";
    oHead.appendChild(oScript);
  }
  var le = GetLeft();
  $("#goTop2").css("left", le);
  var sharediv = $(".docsharelist"),
    a_left = $(".a_left");
  if (sharediv.length == 0) {
    return;
  }
  if (a_left.offset().left < 33) {
    sharediv.css("visibility", "hidden");
    $("#resavelayer1 .s1,#resavelayer1 .s2,#resavelayer1 .p1").show();
  } else if (a_left.offset().left >= 33 && a_left.offset().left < 66) {
    sharediv.css({ visibility: "visible", "margin-left": -33 });
    $("#resavelayer1 .s1,#resavelayer1 .s2,#resavelayer1 .p1").hide();
  } else {
    sharediv.css({ visibility: "visible", "margin-left": -66 });
    $("#resavelayer1 .s1,#resavelayer1 .s2,#resavelayer1 .p1").hide();
  }
}
function CreateFlexpaper(filepath, pagenum, PageNumber, documentDownload) {
  CurPageNum = pagenum;
  var fp = new FlexPaperViewer(
    "http://www.360doc.com/swf/FlexPaperViewer",
    "viewerPlaceHolder",
    {
      config: {
        SwfFile: filepath,
        Scale: 0.6,
        ZoomTransition: "easeOut",
        ZoomTime: 0.5,
        ZoomInterval: 0.2,
        FitPageOnLoad: false,
        FitWidthOnLoad: false,
        PrintEnabled: false,
        FullScreenAsMaxWindow: false,
        ProgressiveLoading: false,
        MinZoomSize: 0.2,
        MaxZoomSize: 5,
        SearchMatchAll: false,
        InitViewMode: "Portrait",
        ViewModeToolsVisible: true,
        ZoomToolsVisible: true,
        NavToolsVisible: true,
        CursorToolsVisible: true,
        SearchToolsVisible: true,
        TotalPages: pagenum,
        PagesNumber: PageNumber,
        localeChain: "en_US"
      }
    }
  );
}
function OutputSource(strUrl, strUrlName) {
  var strUrlNameTemp = "";
  var strUrlNameTitle = "";
  strUrl = decodeURI(strUrl);
  strUrl = decodeURIComponent(strUrl.replace(/\+/g, " "));
  strUrl = strUrl.replace(/\"/g, "'");
  if (strUrl.toLowerCase().indexOf("http://www.360doc.com/userhome/") == 0) {
    $("#docsource").hide();
  } else if (strUrl.indexOf("360doc+") == 0) {
    strUrlNameTemp = cutstr1(strUrlName, 6);
    if (strUrlNameTemp != strUrlName) {
      strUrlNameTitle = strUrlName;
    }
    $("#goTop1").hide();
    strUrl = strUrl.replace("360doc+", "");
    if (UserID == ArtUserID) {
      $("#docsource").show();
    }
    document.getElementById("docsource").innerHTML =
      "&nbsp;转自&nbsp;<span><a style='color:#547b3c;' href='" +
      strUrl +
      "' target='_blank' title='" +
      strUrlNameTitle +
      "' onclick=\"artStatistics('20-12');\">" +
      strUrlNameTemp +
      "</a></span>";
    $("#360doc_Readnum").hide();
    $("#360docResaveCount").hide();
  } else {
    strUrlName = "来源";
    strUrl = encodeURI(strUrl);
    if (UserID == ArtUserID) {
      $("#docsource").show();
    }
    document.getElementById("docsource").innerHTML =
      "&nbsp;<a href='" +
      strUrl +
      "' target='_blank' onclick=\"artStatistics('20-12');\">" +
      strUrlName +
      "</a>";
    return false;
  }
}
function OutputCategory(strUserID, strCategoryID, strCategoryName) {
  strCategoryName = decodeURIComponent(strCategoryName.replace(/\+/g, " "));
  strCategoryName = strCategoryName.replace(/\"/g, "'");
  if (strCategoryName.length > 0 && document.getElementById("cname") != null) {
    if (getStrCount(strCategoryName) > 33) {
      strCategoryName = cutstr(strCategoryName, 33) + "》";
    }
    document.getElementById("cname").innerHTML =
      "<a href='http://www.360doc.com/userhome.aspx?userid=" +
      strUserID +
      "&cid=" +
      strCategoryID +
      "' target='_blank' onclick='artStatistics(\"20-6\");'>" +
      strCategoryName +
      "</a>";
  }
}
function OutputLastNextArt(strTitle, strUrl, strType) {
  strTitle = decodeURIComponent(strTitle.replace(/\+/g, " "));
  strTitle = strTitle.replace(/\"/g, "'");
  if (
    strTitle.length > 0 &&
    strUrl.length > 0 &&
    document.getElementById("lastart") != null &&
    document.getElementById("nextart") != null
  ) {
    if (strType == "0") {
      document.getElementById("lastart").style.display = "block";
      if (
        strTitle.indexOf("<span style='color:#b0b0b0;'>[转]&nbsp;</span>") == 0
      ) {
        strTitle = strTitle.replace(
          "<span style='color:#b0b0b0;'>[转]&nbsp;</span>",
          ""
        );
        strTitle = htmlEncode(strTitle.replace(/&nbsp;/g, " ")).replace(
          /&nbsp;/g,
          " "
        );
        document.getElementById("lastart").innerHTML =
          " 上一篇：<span style='color:#b0b0b0;'>[转]&nbsp;</span><a onclick='artStatistics(\"20-9-5\");' href='" +
          strUrl +
          "' target='_blank'>" +
          strTitle +
          "</a>";
      } else {
        document.getElementById("lastart").innerHTML =
          " 上一篇：<a  onclick='artStatistics(\"20-9-5\");' href='" +
          strUrl +
          "' target='_blank'>" +
          htmlEncode(strTitle.replace(/&nbsp;/g, " ")).replace(/&nbsp;/g, " ") +
          "</a>";
      }
    } else {
      document.getElementById("nextart").style.display = "block";
      if (
        strTitle.indexOf("<span style='color:#b0b0b0;'>[转]&nbsp;</span>") == 0
      ) {
        strTitle = strTitle.replace(
          "<span style='color:#b0b0b0;'>[转]&nbsp;</span>",
          ""
        );
        strTitle = htmlEncode(strTitle.replace(/&nbsp;/g, " ")).replace(
          /&nbsp;/g,
          " "
        );
        document.getElementById("nextart").innerHTML =
          " 下一篇：<span style='color:#b0b0b0;'>[转]&nbsp;</span><a onclick='artStatistics(\"20-9-6\");' href='" +
          strUrl +
          "' target='_blank'>" +
          strTitle +
          "</a>";
      } else {
        document.getElementById("nextart").innerHTML =
          " 下一篇：<a  onclick='artStatistics(\"20-9-6\");' href='" +
          strUrl +
          "' target='_blank'>" +
          htmlEncode(strTitle.replace(/&nbsp;/g, " ")).replace(/&nbsp;/g, " ") +
          "</a>";
      }
    }
  }
}
function ShowSaverUser() {
  getJSON(
    "http://webservice.360doc.com/GetArtInfo20130912NewV.ashx?DisplaySaver=" +
      ArticleID +
      "," +
      ArtUserID +
      "&jsoncallback=?",
    function(responseText) {
      var result = responseText.html;
      var target = "@@@";
      var index = result.indexOf(target);
      result = result.substring(0, index);
      if (result == "cg-1error") {
      } else {
        document.getElementById("sameArt").innerHTML = result;
        document.getElementById("sameArt").style.display = "";
        document.getElementById("sameArtOuter").style.display = "";
        document.getElementById("sameArtOuter").style.marginTop = "1px";
        $(".sharelink").click(function() {
          artStatistics("20-14");
        });
      }
    }
  );
  wzhit(12);
}
function SaveArt() {
  if (document.getElementById("fuzhitishidiv") != null) {
    document.getElementById("fuzhitishidiv").style.display = "none";
  }
  if (UserID == ArtUserID) {
    alert("不能转藏自己的文章！");
    return;
  }
  var CurUserNameCookiescgcg = getCookie("LoginName");
  var LinkContentNow = "";
  var useragent = getuserAgent();
  if (useragent.indexOf("android") >= 0 || useragent.indexOf("iphone") >= 0) {
    LinkContentNow =
      "http://www.360doc.com/resaveArt.aspx?refer=58&articleid=" +
      ArticleID +
      "&arttype=" +
      CurArtType +
      "";
    window.open(LinkContentNow);
  } else {
    if (getCookie("360doc1") != null && UserID != 0) {
      $.ajax({
        url:
          "http://www.360doc.com/ajax/GetLoginForm20130912.ashx?ArtID=" +
          ArticleID +
          "&type=5&arttype=" +
          CurArtType +
          "",
        cache: false,
        success: function(result) {
          if (result == "-1") {
            alert("您已经收藏过该文章！");
          } else {
            $("#LayerLogin").html(result);
            $("#LayerLogin").show();
            showBg("dialog", "dialog_content", "4");
          }
        },
        error: onFailed
      });
    } else {
      ArtLoginTypeID = 14;
      LoginFormArt(62);
    }
  }
  InsertLogData(1);
}
if (document.attachEvent) {
  document.body.attachEvent("onclick", HideFinishEditor);
} else {
  document.body.addEventListener("click", HideFinishEditor, false);
}
function HideFinishEditor() {
  var obj1 = document.getElementById("sameArtOuter");
  if (obj1 != null) {
    obj1.style.display = "none";
  }
  var obj2 = document.getElementById("RecommendtocreamDiv");
  if (obj2 != null) {
    obj2.style.display = "none";
  }
  var obj3 = document.getElementById("RecommendDiv");
  if (obj3 != null) {
    obj3.style.display = "none";
  }
  var obj4 = document.getElementById("ReadArtOuter");
  if (obj4 != null) {
    obj4.style.display = "none";
  }
  var obj5 = document.getElementById("fenxiangLayer");
  if (obj5 != null) {
    if (obj5.style.display == "" || obj5.style.display == "block") {
      obj5.style.display = "none";
    }
  }
  var obj6 = document.getElementById("fenxiangLayer2");
  if (obj6 != null) {
    if (obj6.style.display == "" || obj6.style.display == "block") {
      obj6.style.display = "none";
    }
  }
  var obj8 = document.getElementById("sekuaiboxID");
  if (obj8 != null) {
    if (obj8.style.display == "" || obj8.style.display == "block") {
      obj8.style.display = "none";
    }
  }
  var obj9 = document.getElementById("zihaoboxID");
  if (obj9 != null) {
    if (obj9.style.display == "" || obj9.style.display == "block") {
      obj9.style.display = "none";
    }
  }
  $("#divface").hide();
  $("#divsearch").hide();
  if (document.getElementById("divemail") != null) {
    document.getElementById("divemail").style.display = "none";
  }
}
function docTalk() {
  if (UserID == 0) {
    ArtLoginTypeID = 20;
    LoginFormArt(54);
    return;
  } else {
    talknow();
  }
}
function talknow() {
  chattota(ArtUserID);
}
function showdivemail1() {
  if (UserID == 0) {
    ArtLoginTypeID = 21;
    LoginFormArt();
    return;
  } else {
    $.ajax({
      url: "/ajax/getarticleinfo.ashx?artid=" + ArticleID,
      cache: false,
      success: function(result) {
        $("#LayerLogin").html(
          '<div id="fullbg"></div><div id="dialog" style="position: fixed;"> <div id="dialog_content"></div><div id="divemail1"   onclick="event.cancelBubble=true;"><div id=\'sucessdivOfSendToFriend\' style=\' text-align:center; display:none; position:absolute;margin-top:130px;margin-left:120px;\' ><img src="http://pubimage.360doc.com/mes-n.gif"></div>' +
            result +
            "</div></div>"
        );
        $("#LayerLogin").show();
        showBg("dialog", "dialog_content", "1");
        $("#btnsend").bind("click", function() {
          sendrecommemail();
        });
      },
      error: onFailed
    });
  }
}
function closedivemail() {
  closeBg();
}
function checkAll() {
  $("#btnsend").unbind("click");
  var reg = new RegExp("，", "g");
  var stremail = document
    .getElementById("txtemail")
    .value.trim()
    .replace(reg, ",");
  var strmyemail = document.getElementById("txtmyemail").value.trim();
  var strmyname = document.getElementById("txtname").value.trim();
  if (stremail == "") {
    alert("请输入朋友的Email地址！");
    document.getElementById("txtemail").focus();
    $("#btnsend").bind("click", function() {
      sendrecommemail();
    });
    return false;
  } else {
    var split = stremail.split(",");
    if (split.length > 10) {
      alert("一次最多推荐给10个朋友！");
      document.getElementById("txtemail").focus();
      $("#btnsend").bind("click", function() {
        sendrecommemail();
      });
      return false;
    } else {
      for (var i = 0; i < split.length; i++) {
        if (!isEmail(split[i])) {
          alert("朋友的Email地址输入有误，请重新输入！");
          document.getElementById("txtemail").focus();
          $("#btnsend").bind("click", function() {
            sendrecommemail();
          });
          return false;
        }
      }
    }
  }
  if (strmyname == "" || strmyname == "您的名称") {
    alert("请输入您的姓名！");
    document.getElementById("txtname").focus();
    $("#btnsend").bind("click", function() {
      sendrecommemail();
    });
    return false;
  } else if (!isNickname(strmyname)) {
    alert("姓名仅可使用汉字、数字、字母和下划线！");
    document.getElementById("txtname").focus();
    $("#btnsend").bind("click", function() {
      sendrecommemail();
    });
    return false;
  } else if (strmyname.replace(/[^\x00-\xff]/g, "**").length > 14) {
    alert("姓名最长14个英文或者7个汉字！");
    document.getElementById("txtname").focus();
    $("#btnsend").bind("click", function() {
      sendrecommemail();
    });
    return false;
  }
  if (strmyemail == "") {
    alert("请输入您的Email地址！");
    document.getElementById("txtmyemail").focus();
    $("#btnsend").bind("click", function() {
      sendrecommemail();
    });
    return false;
  } else if (!isEmail(strmyemail)) {
    alert("您的Email地址输入有误，请重新输入！");
    document.getElementById("txtmyemail").focus();
    $("#btnsend").bind("click", function() {
      sendrecommemail();
    });
    return false;
  }
  return true;
}
function sendrecommemail() {
  $("#btnsend").unbind("click");
  if (checkAll()) {
    var istome = 0;
    var reg = new RegExp("，", "g");
    var stremail = document
      .getElementById("txtemail")
      .value.trim()
      .replace(reg, ",");
    var strmyemail = document.getElementById("txtmyemail").value.trim();
    var strmyname = document.getElementById("txtname").value.trim();
    if (document.getElementById("chkistome").checked == true) {
      istome = 1;
    }
    $.ajax({
      url:
        "/ajax/sendfriendrecomm.ashx?artid=" +
        $("#firstartid").val() +
        "&email=" +
        encodeURIComponent(stremail) +
        "&name=" +
        encodeURIComponent(strmyname) +
        "&myemail=" +
        encodeURIComponent(strmyemail) +
        "&istome=" +
        istome,
      cache: false,
      success: function(result) {
        if (result == "") {
          document.getElementById("sucessdivOfSendToFriend").style.display = "";
          setTimeout(function() {
            closedivemail();
          }, 2000);
        } else {
          if (responseText == "-1") {
            alert("推荐失败，请重试！");
          } else {
            alert(result);
          }
          $("#btnsend").bind("click", function() {
            sendrecommemail();
          });
        }
      },
      error: onFailed
    });
  }
}
function showAlertLayer1() {
  $("#LayerLogin").html(
    '<div id="fullbg"></div><div id="dialog" style="position: fixed;"> <div id="dialog_content"></div><div id="AlertDivDetail360doc2"><div class="tuijianpy" style=" width:399px; height:346px;"><div class="cengbj"><div class="cengleft">举报</div><div class="rt360 jb_x" ><div class="chas"><a href="javascript:void(0);" onclick=" HideDiv(2)"></a></div></div></div>   <div style=" display:none;" id="sucessdivOfSendAlert"><div class="jb_cg"><img src="http://pubimage.360doc.com/mygroup/39.gif" width="36" style="vertical-align:middle;" />&nbsp;&nbsp;&nbsp;举报成功！</div><div class="jb_w3">我们会在24小时内完成审核，处理结果会通过<br/>jubao@360doc.com发送到你的邮箱中。</div> </div>  <div id="AlertDetail360doc2" style=" padding:15px 24px;display:block;"><div class=" jb_wz">如果您在该网页中发现有色情、暴力、反动或侵权等不良内容，请联系我们：</div>  <input id="AlertMail360doc2" class="jb_eml"   onfocus="if(this.value==\'联系邮箱\') this.value=\'\';this.style.color=\'#272727\'" onblur="if(!this.value) {this.value=\'联系邮箱\';this.style.color=\'#808080\';}"  value="联系邮箱" type="text"><div class="jb_w2"><div class="jb_xing lf360" >*</div><div class="lf360">请填写真实有效的邮箱地址，我们会将处理结果反馈给你。</div></div><textarea   class="txtbox"  id="AlertTextArea360doc2" onfocus="if(this.value==\'举报原因...\') this.value=\'\';this.style.color=\'#272727\'" onblur="if(!this.value) {this.value=\'举报原因...\';this.style.color=\'#808080\';}" >举报原因...</textarea><div style=" padding-top:14px;"> <div onclick="HideDiv(2);" onmouseover="this.className=\'xuxiaoa  rt360\'"   onmouseout="this.className=\'xuxiao  rt360\'" class="xuxiao rt360" style=" margin-left:16px;">取消</div><div class="quding  rt360" onmouseover="this.className=\'qudinga  rt360\'"   onmouseout="this.className=\'quding  rt360\'" id="btnSendAlert2" >确定</div></div></div></div></div></div>'
  );
  $("#LayerLogin").show();
  showBg("dialog", "dialog_content", "1");
  $("#btnSendAlert2").bind("click", function() {
    AddUserAlert(2);
  });
}
function AddUserAlert(type) {
  var strReflectUserID = UserID;
  var strReflectContent = "";
  var strMail = "";
  if (type == 1) {
    strReflectContent = document.getElementById("AlertTextArea360doc1").value;
    strMail = document.getElementById("AlertMail360doc1").value;
    $("#btnSendAlert1").unbind("click");
  } else if (type == 2) {
    strReflectContent = document.getElementById("AlertTextArea360doc2").value;
    strMail = document.getElementById("AlertMail360doc2").value;
    $("#btnSendAlert2").unbind("click");
  }
  if (strMail.trim() == "联系邮箱") {
    alert("请输入真实有效的邮箱地址！");
    if (type == 1) {
      $("#btnSendAlert1").bind("click", function() {
        AddUserAlert(1);
      });
    } else if (type == 2) {
      $("#btnSendAlert2").bind("click", function() {
        AddUserAlert(2);
      });
    }
    return;
  } else {
    if (!isEmail(strMail)) {
      alert("邮箱格式不正确！");
      if (type == 1) {
        $("#btnSendAlert1").bind("click", function() {
          AddUserAlert(1);
        });
      } else if (type == 2) {
        $("#btnSendAlert2").bind("click", function() {
          AddUserAlert(2);
        });
      }
      return;
    }
  }
  if (strReflectContent.trim() == "举报原因...") {
    alert("举报原因不能为空！");
    if (type == 1) {
      $("#btnSendAlert1").bind("click", function() {
        AddUserAlert(1);
      });
    } else if (type == 2) {
      $("#btnSendAlert2").bind("click", function() {
        AddUserAlert(2);
      });
    }
    return;
  }
  var AlertUserName = "";
  if (strReflectUserID == 0) {
    strReflectUserID = -1;
    AlertUserName = "-1";
  } else {
    strReflectUserID = UserID;
    AlertUserName = NicknameCG;
  }
  var strPost =
    "<PostRef><UserID>" +
    strReflectUserID +
    "</UserID><UserName>" +
    AlertUserName +
    "</UserName><AlertInfomation>(articleid：" +
    ArticleID +
    ") " +
    strReflectContent +
    "</AlertInfomation><EmailAdd>" +
    strMail.trim() +
    "</EmailAdd></PostRef>";
  getJSON(
    "http://webservice.360doc.com/UserAlert20100301.ashx?jsoncallback=?",
    { UserAlert: strPost },
    function(responseText) {
      var result = responseText.html;
      if (result == 1) {
        document.getElementById("sucessdivOfSendAlert").style.display = "";
        if (type == 1) {
          document.getElementById("AlertDetail360doc1").style.display = "none";
        } else if (type == 2) {
          document.getElementById("AlertDetail360doc2").style.display = "none";
        }
        setTimeout(HideFinishEditorCG, 2000);
      } else if (result == "-1") {
        alert("网络忙碌请稍侯重试!");
      }
    }
  );
}
function HideDiv(type) {
  if (type == 1) {
    $("#btnSendAlert1").bind("click", function() {
      AddUserAlert(1);
    });
  } else if (type == 2) {
    $("#btnSendAlert2").bind("click", function() {
      AddUserAlert(2);
    });
  }
  closeBg();
}
function baiduShareConfig() {
  var comment = $('meta[name="360docabstract"]').attr("content");
  var fristPicInContent = "";
  var tsinaPicInContent = "";
  var qzonePicIncontent = "";
  var tsinaPicCount = 1;
  var bdUrl = $("#firstarturl").val();
  var picsInContent = document
    .getElementById("articlecontent")
    .getElementsByTagName("img");
  fristPicInContent =
    "http://pubimage.360doc.com/SNSShareLogo/SNSShareLogo6.png";
  qzonePicIncontent =
    "http://pubimage.360doc.com/SNSShareLogo/SNSShareLogoQzone.png";
  if (picsInContent.length > 0) {
    for (var i = 0; i < picsInContent.length; i++) {
      if (picsInContent[i].height >= 70) {
        if (
          fristPicInContent ==
            "http://pubimage.360doc.com/SNSShareLogo/SNSShareLogo6.png" ||
          qzonePicIncontent ==
            "http://pubimage.360doc.com/SNSShareLogo/SNSShareLogoQzone.png"
        ) {
          fristPicInContent = picsInContent[i].src;
          tsinaPicInContent = picsInContent[i].src;
          qzonePicIncontent = picsInContent[i].src;
          continue;
        }
        tsinaPicInContent += "||" + picsInContent[i].src;
        tsinaPicCount++;
        if (tsinaPicCount > 5) {
          break;
        }
      }
    }
    if (tsinaPicCount < 6) {
      for (var i = 1; i < 6 - tsinaPicCount + 1; i++) {
        tsinaPicInContent +=
          "||http://pubimage.360doc.com/SNSShareLogo/SNSShareLogo" + i + ".png";
      }
    }
  } else {
    tsinaPicInContent =
      "http://pubimage.360doc.com/SNSShareLogo/SNSShareLogo6.png||http://pubimage.360doc.com/SNSShareLogo/SNSShareLogo2.png||http://pubimage.360doc.com/SNSShareLogo/SNSShareLogo3.png||http://pubimage.360doc.com/SNSShareLogo/SNSShareLogo4.png||http://pubimage.360doc.com/SNSShareLogo/SNSShareLogo5.png||http://pubimage.360doc.com/SNSShareLogo/SNSShareLogo1.png";
  }
  var shareTitle = document.title;
  while (true) {
    if (shareTitle.substr(shareTitle.length - 1, shareTitle.length) == "#") {
      shareTitle = shareTitle.substr(0, shareTitle.length - 1);
    } else {
      break;
    }
  }
  window._bd_share_config = {
    common: {
      bdSnsKey: {
        tsina: "3576740144",
        tqq: "75863023ea40d0d9cc621eb247f1d7a5"
      },
      bdSearchPic: 1,
      bdPic: fristPicInContent,
      bdUrl: bdUrl,
      onBeforeClick: function(cmd, config) {
        switch (cmd) {
          case "sqq":
            return {
              bdDesc: "刚看到这篇文章不错，推荐给你看看~",
              bdComment: comment.substr(0, 70),
              bdText: shareTitle
            };
          case "qzone":
            return {
              bdComment: comment.substr(0, 65) + "...",
              bdText: cutstr(shareTitle, 30) + "（分享自360doc）",
              bdPic: qzonePicIncontent
            };
          case "tsina":
            return {
              bdText:
                "【" +
                shareTitle +
                "】" +
                comment.substring(0, 100 - document.title.length) +
                "...",
              bdWbuid: 2312892405,
              bdPic: tsinaPicInContent
            };
          default:
            return {
              bdText:
                "【" +
                shareTitle +
                "】" +
                comment.substr(0, 50) +
                "...（分享自360doc个人图书馆）"
            };
        }
      }
    },
    share: [{ bdSize: 16, bdCustomStyle: "about:blank" }]
  };
  with (document)
    (0)[
      ((getElementsByTagName("head")[0] || body).appendChild(
        createElement("script")
      ).src =
        "http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=" +
        ~(-new Date() / 36e5))
    ];
}
var arrVideoUrlFlag = new Array(
  "tudou.com",
  "player.56.com/v_",
  "www.56.com/n_",
  "www.56.com/flashApp",
  "player.youku.com",
  "video.sina.com",
  "ku6.com",
  "share.vrs.sohu.com",
  "cntv.cn",
  "v.ifeng.com",
  "smgbb.cn",
  "client.joy.cn",
  "6.cn",
  "letv.com",
  "qq.com",
  "ws.126.net",
  "player.pptv.com",
  "video.qiyi.com",
  "resources.pomoho.com",
  "static.youku.com",
  "tangdou.com",
  "tv189.",
  "jxyinyue.com",
  "www.qiyi.com/player",
  "tv.sohu.com",
  "iqilu.com",
  "e23.cn",
  "people.com.cn",
  "video.pomoho.com",
  "56.com/cpm_",
  "v.chinamil.com.cn",
  "blog.sina.com.cn",
  "pplive.cn",
  "ku6cdn.com",
  "yinyuetai",
  "yytcdn.com",
  "bokecc.com",
  "netease.",
  "huanqiu.",
  "dv.ce.cn",
  "js.tudouui.com",
  "umiwi.com",
  "boosj.com",
  "cdstm.cn",
  "imgo.tv",
  "hunantv.com",
  "gmw.cn",
  "blog.sohu.com",
  "chinanews.com",
  "bdchina.com",
  "cutv.com",
  "v1.cn",
  "iqiyi.com",
  "ifeng.com",
  "xinhuanet.com",
  "vblog.people.com",
  "letvcdn.com",
  "www.qzone.cc/mumu/play",
  "zhiyin.cn",
  "www.s1979.com",
  "pps.tv",
  "xinmin.cn",
  "www.aipai.com",
  "pcauto.com.cn",
  "www.legaldaily.com.cn",
  "www.5872.com",
  "video.sxrb.com",
  "21cn.com",
  "v.ku6vms.com",
  "pclady.com.cn",
  "cri.cn",
  "yntv.cn",
  "mtime.com",
  "chaoxing.com",
  "news.cn",
  "163.com",
  "cctv.com",
  "baomihua.com",
  "v.csdn.hudong.com",
  "eastmoney.com",
  "av.rednet.cn",
  "cztv.com",
  "enorth.com",
  "v.rbc.cn",
  "xmnn.cn",
  "hualu5.com",
  "17173.com",
  "yoqoo.com",
  "player.56.com/qzone",
  "jstv.com",
  "www.docin.com",
  "wenku.baidu.com",
  "doc88.com",
  "kksmg.com",
  "71.cn",
  "vodjk.com",
  "hitvs.cn",
  "ifengimg.com",
  "360kan.com",
  "hitow.net"
);
function isVideo(urlFlag) {
  try {
    for (var i = 0; i < arrVideoUrlFlag.length; i++) {
      if (urlFlag.indexOf(arrVideoUrlFlag[i]) > -1) {
        if (urlFlag.indexOf("tudou.com") > -1) {
          if (urlFlag.indexOf("album") > -1) {
            return false;
          }
        } else if (urlFlag.indexOf("163.com") > -1) {
          if (urlFlag.indexOf("cartoon.nie.163.com") > -1) {
            return false;
          }
          if (
            urlFlag.indexOf("music.163.com") > -1 &&
            urlFlag.indexOf(".mp3") > -1
          ) {
            return false;
          }
        } else if (urlFlag.indexOf("player.ku6.com") > -1) {
          if (urlFlag.indexOf("album") > -1) {
            return false;
          }
        } else if (urlFlag.indexOf("qq.com") > -1) {
          if (
            urlFlag.indexOf("imgcache.qq.com") > -1 &&
            urlFlag.indexOf("/vphoto") > -1
          ) {
            return false;
          }
          if (urlFlag.indexOf("games.qq.com") > -1) {
            return false;
          }
          if (urlFlag.indexOf("comic.qq.com") > -1) {
            return false;
          }
        } else if (urlFlag.indexOf("news.cn") > -1) {
          if (
            urlFlag.indexOf("misc.home.news.cn") > -1 &&
            urlFlag.indexOf("/images") > -1
          ) {
            return false;
          }
        } else if (urlFlag.indexOf("17173.com") > -1) {
          if (urlFlag.indexOf("dzflash") > -1) {
            return false;
          }
        } else if (urlFlag.indexOf("21cn.com") > -1) {
          if (urlFlag.indexOf("imgfree") > -1) {
            return false;
          }
        } else if (urlFlag.indexOf("doc88.com") > -1) {
          return true;
        } else if (
          urlFlag.indexOf("www.docin.com") > -1 ||
          urlFlag.indexOf("wenku.baidu.com") > -1 ||
          urlFlag.indexOf("doc88.com") > -1
        ) {
          if (document.getElementById("360doc_flashredirect")) {
            return true;
          } else {
            return false;
          }
        }
        return true;
      }
    }
    return false;
  } catch (err) {
    return true;
  }
}
function srcConvert(src, flag) {
  if (
    src.indexOf("player.youku.com") > -1 ||
    src.indexOf("static.youku.com") > -1
  ) {
    if (src.indexOf("isAutoPlay") > -1) {
      if (flag) return src.replace("isAutoPlay=false", "isAutoPlay=true");
      else return src.replace("isAutoPlay=true", "isAutoPlay=false");
    }
    if (src.indexOf("?") > -1) {
      if (flag) src = src + "&isAutoPlay=true";
      else src = src + "&isAutoPlay=false";
    } else {
      if (flag) src = src + "?isAutoPlay=true";
      else {
        if (src.indexOf("player.youku.com") > -1)
          src = src + "&isAutoPlay=false";
        else src = src + "?isAutoPlay=false";
      }
    }
  } else if (src.indexOf("cntv.cn") > -1) {
    if (src.indexOf("isAutoPlay") > -1) {
      if (flag) return src.replace("isAutoPlay=false", "isAutoPlay=true");
      else return src.replace("isAutoPlay=true", "isAutoPlay=false");
    }
    if (src.indexOf("?") > -1) {
      if (flag) src = src + "&isAutoPlay=true";
      else src = src + "&isAutoPlay=false";
    } else {
      if (src.indexOf(".swf") == src.length - 4) {
        if (flag) src = src + "?isAutoPlay=true";
        else src = src + "?isAutoPlay=false";
      } else {
        if (flag) src = src + "&isAutoPlay=true";
        else src = src + "&isAutoPlay=false";
      }
    }
  } else if (src.indexOf("tudou.com") > -1) {
    if (flag) return src.replace("/v.swf", "&autoPlay=true/v.swf");
    else return src;
  } else if (src.indexOf("dv.ce.cn") > -1 || src.indexOf("bokecc.com") > -1) {
    if (src.indexOf("autoStart") > -1) {
      if (flag) return src.replace("autoStart=false", "autoStart=true");
      else return src.replace("autoStart=true", "autoStart=false");
    }
    if (src.indexOf("?") > -1) {
      if (flag) src = src + "&autoStart=true";
      else src = src + "&autoStart=false";
    } else {
      if (src.indexOf(".swf") == src.length - 4) {
        if (flag) src = src + "?autoStart=true";
        else src = src + "?autoStart=false";
      } else {
        if (flag) src = src + "&autoStart=true";
        else src = src + "&autoStart=false";
      }
    }
  } else if (src.indexOf("umiwi.com") > -1) {
    if (src.indexOf("autoPlay") > -1) {
      if (flag) return src.replace("autoPlay=0", "autoPlay=1");
      else return src.replace("autoPlay=1", "autoPlay=0");
    }
    if (src.indexOf("?") > -1) {
      if (flag) src = src + "&autoPlay=1";
      else src = src + "&autoPlay=0";
    } else {
      if (src.indexOf(".swf") == src.length - 4) {
        if (flag) src = src + "?autoPlay=1";
        else src = src + "?autoPlay=0";
      } else {
        if (flag) src = src + "&autoPlay=1";
        else src = src + "&autoPlay=0";
      }
    }
  } else if (src.indexOf("boosj.com") > -1) {
    if (src.indexOf("p=") > -1) {
      if (flag) return src.replace("p=0", "p=1");
      else return src.replace("p=1", "p=0");
    }
    if (src.indexOf("?") > -1) {
      if (flag) src = src + "&p=1";
      else src = src + "&p=0";
    } else {
      if (src.indexOf(".swf") == src.length - 4) {
        if (flag) src = src + "?p=1";
        else src = src + "?p=0";
      } else {
        if (flag) src = src + "&p=1";
        else src = src + "&p=0";
      }
    }
  } else if (src.indexOf("gmw.cn") > -1) {
    if (src.indexOf("autoPlay") > -1) {
      if (flag) return src.replace("autoPlay=false", "autoPlay=true");
      else return src.replace("autoPlay=true", "autoPlay=false");
    }
    if (src.indexOf("?") > -1) {
      if (flag) src = src + "&autoPlay=true";
      else src = src + "&autoPlay=false";
    } else {
      if (src.indexOf(".swf") == src.length - 4) {
        if (flag) src = src + "?autoPlay=true";
        else src = src + "?autoPlay=false";
      } else {
        if (flag) src = src + "&autoPlay=true";
        else src = src + "&autoPlay=false";
      }
    }
  } else if (
    src.indexOf("video.sina.com") > -1 ||
    src.indexOf("vhead.blog.sina.com.cn") > -1
  ) {
    if (src.indexOf("autoPlay") > -1) {
      if (flag) return src.replace("autoPlay=0", "autoPlay=1");
      else return src.replace("autoPlay=1", "autoPlay=0");
    }
    if (src.indexOf("?") > -1) {
      if (flag) src = src + "&autoPlay=1";
      else src = src + "&autoPlay=0";
    } else {
      if (src.indexOf(".swf") == src.length - 4) {
        if (flag) src = src + "?autoPlay=1";
        else src = src + "?autoPlay=0";
      } else {
        if (flag) src = src + "&autoPlay=1";
        else src = src + "&autoPlay=0";
      }
    }
  } else if (src.indexOf("share.vrs.sohu.com") > -1) {
    if (src.indexOf("autoplay") > -1) {
      if (flag) return src.replace("autoplay=false", "autoplay=true");
      else return src.replace("autoplay=true", "autoplay=false");
    }
    if (flag) src = src + "&autoplay=true";
    else src = src + "&autoplay=false";
  } else if (
    src.indexOf("tv.sohu.com") > -1 ||
    src.indexOf("blog.sohu.com") > -1
  ) {
    if (src.indexOf("autoplay") > -1) {
      if (flag) return src.replace("autoplay=false", "autoplay=true");
      else return src.replace("autoplay=true", "autoplay=false");
    }
    if (src.indexOf("?") > -1) {
      if (flag) src = src + "&autoplay=true";
      else src = src + "&autoplay=false";
    } else {
      if (src.indexOf(".swf") == src.length - 4) {
        if (flag) src = src + "?autoplay=true";
        else src = src + "?autoplay=false";
      } else {
        if (flag) src = src + "&autoplay=true";
        else src = src + "&autoplay=false";
      }
    }
  } else if (
    src.indexOf("video.qiyi.com") > -1 ||
    src.indexOf("letv.com") > -1 ||
    src.indexOf("iqiyi.com") > -1 ||
    src.indexOf("letvcdn.com") > -1
  ) {
    if (src.indexOf("autoplay") > -1) {
      if (flag) return src.replace("autoplay=false", "autoplay=true");
      else return src.replace("autoplay=true", "autoplay=false");
    }
    if (src.indexOf("?") > -1) {
      if (flag) src = src + "&autoplay=true";
      else src = src + "&autoplay=false";
    } else {
      if (src.indexOf(".swf") == src.length - 4) {
        if (flag) src = src + "?autoplay=true";
        else src = src + "?autoplay=false";
      } else {
        if (flag) src = src + "&autoplay=true";
        else src = src + "&autoplay=false";
      }
    }
  } else if (
    src.indexOf("resources.pomoho.com") > -1 ||
    src.indexOf("qq.com") > -1
  ) {
    if (src.indexOf("autoplay") > -1) {
      if (flag) return src.replace("autoplay=0", "autoplay=1");
      else return src.replace("autoplay=1", "autoplay=0");
    }
    if (src.indexOf("?") > -1) {
      if (flag) src = src + "&autoplay=1";
      else src = src + "&autoplay=0";
    } else {
      if (src.indexOf(".swf") == src.length - 4) {
        if (flag) src = src + "?autoplay=1";
        else src = src + "?autoplay=0";
      } else {
        if (flag) src = src + "&autoplay=1";
        else src = src + "&autoplay=0";
      }
    }
  } else if (src.indexOf("v.ifeng.com") > -1) {
    if (src.indexOf("AutoPlay") > -1) {
      if (flag) return src.replace("AutoPlay=false", "AutoPlay=true");
      else return src.replace("AutoPlay=true", "AutoPlay=false");
    }
    if (src.indexOf("?") > -1) {
      if (flag) src = src + "&AutoPlay=true";
      else src = src + "&AutoPlay=false";
    } else {
      if (src.indexOf(".swf") == src.length - 4) {
        if (flag) src = src + "?AutoPlay=true";
        else src = src + "?AutoPlay=false";
      } else {
        if (flag) src = src + "&AutoPlay=true";
        else src = src + "&AutoPlay=false";
      }
    }
  } else if (
    src.indexOf("player.ku6.com") > -1 ||
    src.indexOf("ku6cdn.com") > -1
  ) {
    if (src.indexOf("&auto=") > -1) {
      if (flag) return src.replace("auto=0", "auto=1");
      else return src.replace("auto=1", "auto=0");
    }
    if (flag) src = src + "&auto=1";
    else src = src + "&auto=0";
  } else if (src.indexOf("v.ifeng.com") > -1) {
    if (src.indexOf("AutoPlay") > -1) {
      if (flag) return src.replace("AutoPlay=false", "AutoPlay=true");
      else return src.replace("AutoPlay=true", "AutoPlay=false");
    }
    if (src.indexOf("?") > -1) {
      if (flag) src = src + "&AutoPlay=true";
      else src = src + "&AutoPlay=false";
    } else {
      if (src.indexOf(".swf") == src.length - 4) {
        if (flag) src = src + "?AutoPlay=true";
        else src = src + "?AutoPlay=false";
      } else {
        if (flag) src = src + "&AutoPlay=true";
        else src = src + "&AutoPlay=false";
      }
    }
  } else if (src.indexOf("client.joy.cn") > -1) {
    if (src.indexOf("playstatus") > -1) {
      if (flag) return src.replace("playstatus=0", "playstatus=1");
      else return src.replace("playstatus=1", "playstatus=0");
    }
    if (src.indexOf("?") > -1) {
      if (flag) src = src + "&playstatus=1";
      else src = src + "&playstatus=0";
    } else {
      if (src.indexOf(".swf") == src.length - 4) {
        if (flag) src = src + "?playstatus=1";
        else src = src + "?playstatus=0";
      } else {
        if (flag) src = src + "&playstatus=1";
        else src = src + "&playstatus=0";
      }
    }
  } else if (src.indexOf("6.cn") > -1) {
    if (src.indexOf("flag=") > -1) {
      if (flag) return src.replace("flag=0", "flag=1");
      else return src.replace("flag=1", "flag=0");
    }
    if (src.indexOf("?") > -1) {
      if (flag) src = src + "&flag=1";
      else src = src + "&flag=0";
    } else {
      if (src.indexOf(".swf") == src.length - 4) {
        if (flag) src = src + "?flag=1";
        else src = src + "?flag=0";
      } else {
        if (flag) src = src + "&flag=1";
        else src = src + "&flag=0";
      }
    }
  }
  return src;
}
function reSetInitFlash() {
  var objTags = document.getElementsByTagName("OBJECT");
  for (var n = 0; n < objTags.length; n++) {
    try {
      var objTag1;
      objTag1 = objTags[n];
      if (_isIE) {
        objTag1.childNodes[5].value = "opaque";
        var src = "";
        var src1 = "";
        var div = document.createElement("div");
        for (var i = 0; i < objTag1.childNodes.length; i++) {
          if (objTag1.childNodes[i].name.toLowerCase() == "src") {
            src = objTag1.childNodes[i].value;
            objTag1.childNodes[i].value = srcConvert(src, false);
          }
          if (objTag1.childNodes[i].name.toLowerCase() == "wmode") {
            objTag1.childNodes[i].value = "transparent";
          }
        }
        if (!isVideo(src)) {
          continue;
        }
        div.style.width = objTag1.width + "px";
        div.style.height = objTag1.height + "px";
        div.style.position = "relative";
        if (
          src.indexOf("www.docin.com") > -1 ||
          src.indexOf("wenku.baidu.com") > -1 ||
          src.indexOf("doc88.com") > -1
        ) {
          titletip = "点击阅读";
        } else {
          titletip = "点击播放视频";
        }
        div.innerHTML =
          "<div class='backgroundDivIe' style='width:" +
          objTag1.width +
          "px;height:" +
          objTag1.height +
          "px;absolute:absolute;cursor:hand;'><a href='" +
          srcConvert(src, true) +
          "' target='_blank' title='" +
          titletip +
          "' style='width:" +
          objTag1.width +
          "px;height:" +
          objTag1.height +
          "px;cursor:hand;'><div style='width:" +
          objTag1.width +
          "px;height:" +
          objTag1.height +
          "px;cursor:hand;'></div></a></div>";
        objTag1.parentNode.insertBefore(div, objTag1);
        div.innerHTML += objTag1.outerHTML.replace(
          'VALUE="Window"',
          'VALUE="transparent"'
        );
        objTag1.parentNode.removeChild(objTag1);
        if (src.indexOf("player.pptv.com") > -1) {
          div.getElementsByTagName("div")[0].className = "backgroundDiv";
          div.getElementsByTagName("div")[0].style.backgroundImage =
            "url('http://pubimage.360doc.com/pptv.jpg')";
        } else if (src.indexOf("smgbb.cn") > -1) {
          div.getElementsByTagName("div")[0].className = "backgroundDiv";
          div.getElementsByTagName("div")[0].style.backgroundImage =
            "url('http://pubimage.360doc.com/dongfang.jpg')";
        }
      }
    } catch (err) {}
  }
}
function reSetInitFlash1() {
  try {
    var objTags = document.getElementsByTagName("OBJECT");
    var tempobjTagUrl = "";
    var tempobjTagUrlOther = "";
    for (var n = 0; n < objTags.length; n++) {
      var objTag1;
      objTag1 = objTags[n];
      if (_isIE) {
        if (objTag1.childNodes[5] != null) {
          objTag1.childNodes[5].value = "opaque";
        }
        var src = "";
        var src1 = "";
        var myflashvars = "";
        var movie = "";
        var div = document.createElement("div");
        for (var i = 0; i < objTag1.childNodes.length; i++) {
          try {
            if (objTag1.childNodes[i].name.toLowerCase() == "src") {
              src = objTag1.childNodes[i].value;
              movie = src;
              objTag1.childNodes[i].value = srcConvert(src, false);
            }
            if (objTag1.childNodes[i].name.toLowerCase() == "wmode") {
              objTag1.childNodes[i].value = "transparent";
            }
            if (objTag1.childNodes[i].name.toLowerCase() == "flashvars") {
              myflashvars = objTag1.childNodes[i].value;
              objTag1.childNodes[i].value = objTag1.childNodes[i].value.replace(
                "autoplay=1",
                "autoplay=0"
              );
            }
          } catch (err) {}
        }
        if (src == "") {
          for (var i = 0; i < objTag1.childNodes.length; i++) {
            if (objTag1.childNodes[i].name.toLowerCase() == "movie") {
              src = objTag1.childNodes[i].value;
              movie = src;
              objTag1.childNodes[i].value = srcConvert(src, false);
            }
          }
        }
        if (src == "") {
          for (var i = 0; i < objTag1.childNodes.length; i++) {
            if (objTag1.childNodes[i].name.toLowerCase() == "url") {
              src = objTag1.childNodes[i].value;
              movie = src;
              objTag1.childNodes[i].value = srcConvert(src, false);
            }
          }
        }
        var docnullsrc = false;
        if (src == "") {
          try {
            docnullsrc = true;
            if (objTag1.getElementsByTagName("embed")) {
              src =
                objTag1.innerHTML.split('src="')[1].split(".swf")[0] + ".swf";
              myflashvars = objTag1.innerHTML
                .split('flashvars="')[1]
                .split('"')[0];
            }
          } catch (err) {}
        }
        if (!isVideo(src)) {
          continue;
        }
        if (true) {
          if (src.indexOf("tv189.") > -1) {
            for (var i = 0; i < objTag1.childNodes.length; i++) {
              if (objTag1.childNodes[i].name.toLowerCase() == "flashvars") {
                tempobjTagUrl = src + "?" + objTag1.childNodes[i].value;
              }
            }
          } else if (src.indexOf("www.qiyi.com/player") > -1) {
            for (var i = 0; i < objTag1.childNodes.length; i++) {
              if (objTag1.childNodes[i].name.toLowerCase() == "flashvars") {
                tempobjTagUrl = src + "?" + objTag1.childNodes[i].value;
              }
            }
          } else if (src.indexOf("71.cn") > -1) {
            for (var i = 0; i < objTag1.childNodes.length; i++) {
              if (objTag1.childNodes[i].name.toLowerCase() == "flashvars") {
                tempobjTagUrl = src + "&" + objTag1.childNodes[i].value;
              }
            }
          } else if (src.indexOf("hitvs.cn") > -1) {
            for (var i = 0; i < objTag1.childNodes.length; i++) {
              if (objTag1.childNodes[i].name.toLowerCase() == "flashvars") {
                tempobjTagUrl = src + "?" + objTag1.childNodes[i].value;
              }
            }
          } else if (src.indexOf("doc88.com") > -1) {
            if (docnullsrc) {
              tempobjTagUrl =
                "http://www.doc88.com/" +
                myflashvars.replace("=", "-").replace("p1", "p") +
                ".html";
            } else {
              for (var i = 0; i < objTag1.childNodes.length; i++) {
                if (objTag1.childNodes[i].name.toLowerCase() == "flashvars") {
                  tempobjTagUrl = src + "?" + objTag1.childNodes[i].value;
                  tempobjTagUrl =
                    "http://www.doc88.com/" +
                    objTag1.childNodes[i].value
                      .replace("=", "-")
                      .replace("p1", "p") +
                    ".html";
                }
              }
            }
          } else {
            tempobjTagUrl = srcConvert(src, true);
          }
          if (
            objTag1.width.toString().indexOf("%") > -1 ||
            objTag1.width.toString() == "" ||
            objTag1.width.toString() == "auto"
          ) {
            objTag1.width = "640";
            objTag1.height = "480";
          }
          var w = Math.ceil(parseInt(objTag1.width));
          var h = Math.ceil((w * 480) / 640);
          div.style.width = w + "px";
          div.style.height = h + "px";
          var titletip = "";
          if (
            src.indexOf("www.docin.com") > -1 ||
            src.indexOf("wenku.baidu.com") > -1 ||
            src.indexOf("doc88.com") > -1
          ) {
            titletip = "点击阅读";
          } else {
            titletip = "点击播放视频";
          }
          div.innerHTML =
            "<div style='width:" +
            w +
            "px;height:" +
            h +
            "px;cursor:hand;'><a  href='" +
            tempobjTagUrl +
            "' target='_blank' title='" +
            titletip +
            "' style='width:" +
            w +
            "px;height:" +
            h +
            "px;cursor:hand;'><img src=''  style='width:" +
            w +
            "px;height:" +
            h +
            "px; max-width:" +
            w +
            "+px' /></a></div>";
        } else {
          if (objTag1.width == "") {
            if (
              objTag1.currentStyle.width != "auto" &&
              objTag1.currentStyle.width != ""
            ) {
              objTag1.width = objTag1.currentStyle.width.replace("px", "");
              objTag1.height = objTag1.currentStyle.height.replace("px", "");
            } else {
              objTag1.width = 640;
              objTag1.height = 480;
            }
          }
          div.style.width = objTag1.width + "px";
          div.style.height = objTag1.height + "px";
          if (myflashvars != null && myflashvars != "") {
            if (src.indexOf("?") > -1) {
              tempobjTagUrlOther = src + "&" + myflashvars;
            } else {
              tempobjTagUrlOther = src + "?" + myflashvars;
            }
          } else {
            tempobjTagUrlOther = srcConvert(src, true);
          }
          div.innerHTML =
            "<div class='backgroundDivIe' style='width:" +
            objTag1.width +
            "px;height:" +
            objTag1.height +
            "px;position:absolute;cursor:hand;'><a href='" +
            tempobjTagUrlOther +
            "' target='_blank' title='点击播放视频'  style='width:" +
            objTag1.width +
            "px;height:" +
            objTag1.height +
            "px;cursor:hand;'><div style='width:" +
            objTag1.width +
            "px;height:" +
            objTag1.height +
            "px;cursor:hand;'></div></a></div>";
        }
        if (
          movie != null &&
          movie.indexOf("video.sina.com") > -1 &&
          movie.indexOf(".swf") == movie.length - 4
        ) {
          div.innerHTML +=
            "<div style='display:none;'>" +
            objTag1.outerHTML
              .replace('VALUE="Window"', 'VALUE="transparent"')
              .replace("autoplay=1", "autoplay=0")
              .replace("AutoPlay=1", "AutoPlay=0")
              .replace("autoplay=true", "autoplay=false")
              .replace("AutoPlay=true", "AutoPlay=false")
              .replace("isAutoPlay=1", "isAutoPlay=0")
              .replace("isAutoPlay=true", "isAutoPlay=false")
              .replace("auto=1", "auto=0")
              .replace("autoPlay=true", "autoPlay=false")
              .replace('VALUE="Direct"', 'VALUE="transparent"')
              .replace("autoStart=true", "autoStart=false")
              .replace("autoStart=true", "autoStart=false")
              .replace(".swf", ".swf?autoPlay=0")
              .replace(".swf", ".swf?autoPlay=0") +
            "</div>";
        } else {
          div.innerHTML +=
            "<div style='display:none;'>" +
            objTag1.outerHTML
              .replace('VALUE="Window"', 'VALUE="transparent"')
              .replace("autoplay=1", "autoplay=0")
              .replace("AutoPlay=1", "AutoPlay=0")
              .replace("autoplay=true", "autoplay=false")
              .replace("AutoPlay=true", "AutoPlay=false")
              .replace("isAutoPlay=1", "isAutoPlay=0")
              .replace("isAutoPlay=true", "isAutoPlay=false")
              .replace("auto=1", "auto=0")
              .replace("autoPlay=true", "autoPlay=false")
              .replace('VALUE="Direct"', 'VALUE="transparent"')
              .replace("autoStart=true", "autoStart=false")
              .replace("autoStart=true", "autoStart=false") +
            "</div>";
        }
        objTag1.parentNode.insertBefore(div, objTag1);
        objTag1.parentNode.removeChild(objTag1);
        if (
          src.indexOf("player.pptv.com") > -1 ||
          src.indexOf("pplive.cn") > -1
        ) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/pptv.jpg";
        } else if (
          src.indexOf("js.tudouui.com") > -1 ||
          src.indexOf("tudou.com") > -1
        ) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/tudou.jpg";
        } else if (src.indexOf("smgbb.cn") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/dongfang.jpg";
        } else if (src.indexOf("zhiyin.cn") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/zhiyin.gif";
        } else if (src.indexOf("tangdou.com") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/tangdou.jpg";
        } else if (src.indexOf("tv189.") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/tianyi.gif";
        } else if (src.indexOf("qiyi.com") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/qiyi.gif";
        } else if (src.indexOf("iqilu.com") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/qilu.gif";
        } else if (src.indexOf("e23.cn") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/shunwang.gif";
        } else if (src.indexOf("people.com.cn") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/renmin.gif";
        } else if (src.indexOf("v.chinamil.com.cn") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/junshi.gif";
        } else if (src.indexOf("people.com.cn") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/renmin.gif";
        } else if (
          src.indexOf("pomoho.com") > -1 ||
          src.indexOf("baomihua.com") > -1
        ) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/baomihua.gif";
        } else if (src.indexOf("56.com") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/56com.jpg";
        } else if (
          src.indexOf("youku.com") > -1 ||
          src.indexOf("www.qzone.cc/mumu/play") > -1 ||
          src.indexOf("yoqoo.com") > -1
        ) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/youku.jpg";
        } else if (src.indexOf("sina.com") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/sina1.gif";
        } else if (
          src.indexOf("ku6.com") > -1 ||
          src.indexOf("ku6vms") > -1 ||
          src.indexOf("ku6cdn") > -1
        ) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/ku6.gif";
        } else if (
          src.indexOf("ifeng.com") > -1 ||
          src.indexOf("ifengimg.com") > -1
        ) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/ifeng.gif";
        } else if (src.indexOf("hitow.net") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/flashimg/heitu.jpg";
        } else if (src.indexOf("client.joy.cn") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/joy.gif";
        } else if (src.indexOf("6.cn") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/6cn.gif";
        } else if (
          src.indexOf("letv.com") > -1 ||
          src.indexOf("letvcdn.com") > -1
        ) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/letv.gif";
        } else if (src.indexOf("qq.com") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/qq3.gif";
        } else if (
          src.indexOf("ws.126.net") > -1 ||
          src.indexOf("163.com") > -1
        ) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/126.gif";
        } else if (src.indexOf("sohu.com") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/sohu1.gif";
        } else if (
          src.indexOf("yinyuetai") > -1 ||
          src.indexOf("yytcdn.com") > -1
        ) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/yinyuetai.gif";
        } else if (src.indexOf("bokecc.com") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/bokecc.gif";
        } else if (src.indexOf("netease.") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/netease.gif";
        } else if (src.indexOf("dv.ce.cn") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/dvce.gif";
        } else if (src.indexOf("umiwi.com") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/umiwi.gif";
        } else if (src.indexOf("boosj.com") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/boosj.jpg";
        } else if (src.indexOf("cdstm.cn") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/cdstm.gif";
        } else if (
          src.indexOf("imgo.tv") > -1 ||
          src.indexOf("hunantv.com") > -1
        ) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/imgo.gif";
        } else if (src.indexOf("gmw.cn") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/gmw.gif";
        } else if (src.indexOf("chinanews.com") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/chinanews.gif";
        } else if (src.indexOf("bdchina.com") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/bdchina.gif";
        } else if (src.indexOf("cutv.com") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/cutv.jpg";
        } else if (src.indexOf("v1.cn") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/v1.gif";
        } else if (
          src.indexOf("xinhuanet.com") > -1 ||
          src.indexOf("news.cn") > -1
        ) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/xinhuanet.gif";
        } else if (src.indexOf("www.s1979.com") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/s1979.gif";
        } else if (src.indexOf("pps.tv") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/pps.gif";
        } else if (src.indexOf("xinmin.cn") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/xinmin.gif";
        } else if (src.indexOf("www.aipai.com") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/aipai.gif";
        } else if (
          src.indexOf("pcauto.com.cn") > -1 ||
          src.indexOf("pclady.com.cn") > -1
        ) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/pcauto.gif";
        } else if (src.indexOf("www.legaldaily.com.cn") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/legaldaily.gif";
        } else if (src.indexOf("www.5872.com") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/5872.gif";
        } else if (src.indexOf("video.sxrb.com") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/sxrb.gif";
        } else if (
          src.indexOf("21cn.com") > -1 ||
          src.indexOf("21cbh.com") > -1
        ) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/21cn.gif";
        } else if (src.indexOf("kksmg.com") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/kksmg.gif";
        } else if (src.indexOf("cri.cn") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/cri.gif";
        } else if (src.indexOf("yntv.cn") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/yntv.gif";
        } else if (
          src.indexOf("mtime.com") > -1 ||
          src.indexOf("mtime.cn") > -1
        ) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/mtime.gif";
        } else if (
          src.indexOf("cntv.cn") > -1 ||
          src.indexOf("cctv.com") > -1
        ) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/cntv.jpg";
        } else if (src.indexOf("71.cn") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/xuanjiangjia.gif";
        } else if (src.indexOf("hitvs.cn") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/hitvs.gif";
        } else if (src.indexOf("vodjk.com") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/jiankangdiyixian.gif";
        } else if (src.indexOf("v.ku6vms.com") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/ku6.gif";
        } else if (src.indexOf("chaoxing.com") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/chaoxing.gif";
        } else if (src.indexOf("v.csdn.hudong.com") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/csdn.gif";
        } else if (src.indexOf("eastmoney.com") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/eastmoney.gif";
        } else if (src.indexOf("av.rednet.cn") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/rednet.gif";
        } else if (src.indexOf("cztv.com") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/cztv.gif";
        } else if (src.indexOf("enorth.com") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/enorth.gif";
        } else if (src.indexOf("v.rbc.cn") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/rbc.gif";
        } else if (src.indexOf("xmnn.cn") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/xmnn.gif";
        } else if (src.indexOf("hualu5.com") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/hualu5.gif";
        } else if (src.indexOf("17173.com") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/17173.gif";
        } else if (src.indexOf("huanqiu.") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/huanqiu.gif";
        } else if (src.indexOf("gdhytv.com") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/gdhytv.gif";
        } else if (src.indexOf("ahtv.cn") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/ahtv.gif";
        } else if (src.indexOf("china.com") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/china.gif";
        } else if (src.indexOf("wasu.cn") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/wasu.gif";
        } else if (src.indexOf("jstv.com") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/jiangsuwangluo.gif";
        } else if (src.indexOf("docin.com") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/douding.gif";
        } else if (src.indexOf("doc88.com") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/88.gif";
        } else if (src.indexOf("wenku.baidu.com") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/baidu.gif";
        } else if (src.indexOf("static.hdslb.com") > -1) {
          div.getElementsByTagName("img")[0].src =
            "http://pubimage.360doc.com/flashimg/bilibili.gif";
        }
      }
    }
  } catch (err) {}
}
function cntvflashvars(fvar) {
  try {
    if (fvar.indexOf("&amp;url=") > -1) {
      var cntvsourceurl = fvar.split("&amp;url=")[1].split("&amp;")[0];
      return cntvsourceurl;
    } else if (fvar.indexOf("&url=") > -1) {
      var cntvsourceurl = fvar.split("&url=")[1].split("&")[0];
      return cntvsourceurl;
    } else {
      return "";
    }
  } catch (err) {
    return "";
  }
}
function getOuterHTML(elm) {
  var node = elm.cloneNode(true);
  var div = document.createElement("div");
  div.appendChild(node);
  return div.innerHTML;
}
function xiamimusicreplace() {
  try {
    var objTags = document.getElementsByTagName("embed");
    for (var i = 0; i < objTags.length; i++) {
      if (
        objTags[i].src != null &&
        objTags[i].src.indexOf("xiami.com/widget/") > -1 &&
        objTags[i].src.indexOf("multiPlayer.swf") > -1
      ) {
        var srcmusicidlist = [];
        var srclist = objTags[i].src
          .split("xiami.com/widget/")[1]
          .split("/multiPlayer.swf")[0]
          .split(",");
        for (var j = 0; j < srclist.length; j++) {
          if (j == 0) {
            if (srclist[0].indexOf("_") > -1) {
              srcmusicidlist.push(srclist[0].split("_")[1]);
            } else {
              srcmusicidlist.push(srclist[0]);
            }
          } else {
            if (j + 1 == srclist.length) break;
            srcmusicidlist.push(srclist[j]);
          }
        }
        var div = document.createElement("div");
        var isreplace = false;
        var html = "";
        for (var k = 0; k < srcmusicidlist.length; k++) {
          if (isNaN(srcmusicidlist[k])) continue;
          html +=
            '<div style="margin-bottom:10px;"><a href="https://www.xiami.com/play?ids=/song/playlist/id/' +
            srcmusicidlist[k] +
            '/object_name/default/object_id/0#loaded" target="_blank"><img src="https://pubimage.360doc.com/wz/musicplay.jpg"></a></div>';
          isreplace = true;
        }
        if (isreplace) {
          div.innerHTML = html;
          objTags[i].parentNode.insertBefore(div, objTags[i]);
          objTags[i].parentNode.removeChild(objTags[i]);
        }
      }
    }
  } catch (err) {}
}
function createvideolayer() {
  try {
    var tempVideoList = [];
    var objTags = document.getElementsByTagName("video");
    for (var i = 0; i < objTags.length; i++) {
      var div = document.createElement("div");
      var objTag1 = objTags[i];
      var src = objTags[i].src;
      if (
        src.indexOf("360kan.com") > -1 ||
        src.indexOf("myqcloud.com") > -1 ||
        src.indexOf("81.cn") > -1
      ) {
      } else {
        break;
      }
      if (
        document.getElementById("sourceurl").value.indexOf("360doc.com") > -1
      ) {
        continue;
      } else {
        if (src.indexOf("360kan.com") > -1)
          src = document.getElementById("sourceurl").value;
      }
      if (true) {
        if (
          objTag1.getAttribute("width") == null ||
          objTag1
            .getAttribute("width")
            .toString()
            .indexOf("%") > -1 ||
          objTag1.getAttribute("width").toString() == "" ||
          objTag1.getAttribute("width").toString() == "auto"
        ) {
          objTag1.width = "640";
          objTag1.height = "480";
        }
        var w = Math.ceil(parseInt(objTag1.width));
        var h = Math.ceil((w * 480) / 640);
        try {
          if (objTag1.parentNode.tagName == "CONTAINER") {
            w = objTags[i].parentNode.style.width.replace("px", "");
            h = Math.ceil(parseFloat(w * 480) / 640);
          }
        } catch (err) {}
        div.style.width = w + "px";
        div.style.height = h + "px";
        if (
          src.indexOf("www.docin.com") > -1 ||
          src.indexOf("wenku.baidu.com") > -1 ||
          src.indexOf("doc88.com") > -1
        ) {
          titletip = "点击阅读";
        } else {
          titletip = "点击播放视频";
        }
        div.innerHTML =
          "<div  style='width:" +
          w +
          "px;height:" +
          h +
          "px;cursor:hand;'><a  href='" +
          src +
          "' target='_blank' title='" +
          titletip +
          "' style='width:" +
          w +
          "px;height:" +
          h +
          "px;cursor:hand;'><img src=''  style='width:" +
          w +
          "px;height:" +
          h +
          "px; max-width:" +
          w +
          "+px' /></a></div>";
      }
      objTag1.parentNode.insertBefore(div, objTag1);
      tempVideoList.push(objTag1);
      if (src.indexOf("360kan.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/wz/360kan.jpg";
      } else if (src.indexOf("myqcloud.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/wz/hubpd.jpg";
      } else if (src.indexOf("81.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/wz/81cn.jpg";
      }
    }
    if (tempVideoList != null && tempVideoList.length > 0) {
      for (var n = 0; n < tempVideoList.length; n++) {
        tempVideoList[n].parentNode.removeChild(tempVideoList[n]);
      }
    }
    tempVideoList = [];
  } catch (err2) {}
}
function reSetInitFlashEmbed() {
  try {
    var objTags = document.getElementsByTagName("embed");
    for (var n = 0; n < objTags.length; n++) {
      var objTag1;
      objTag1 = objTags[n];
      var src = objTag1.src;
      var src1 = "";
      if (!isVideo(src)) {
        continue;
      }
      var newSrcQQ = "";
      var myflashvars = "";
      if (src.indexOf("player.cntv.cn") > -1) {
        myflashvars = objTag1.getAttribute("flashvars");
        if (myflashvars != null && myflashvars != "") {
          if (cntvflashvars(myflashvars.toString()) != "") {
            newSrcQQ = cntvflashvars(myflashvars.toString());
          } else {
            objTag1.setAttribute(
              "flashvars",
              objTag1
                .getAttribute("flashvars")
                .replace("isAutoPlay=true", "isAutoPlay=false")
            );
            if (objTag1.src.toString().indexOf("?") > -1)
              newSrcQQ = objTag1.src + "&" + myflashvars;
            else newSrcQQ = objTag1.src + "?" + myflashvars;
          }
        } else {
          if (objTag1.src.toString().indexOf("?") > -1) {
            newSrcQQ = objTag1.src + "&" + myflashvars;
          } else {
            newSrcQQ = objTag1.src + "?" + myflashvars;
          }
        }
        objTag1.wmode = "transparent";
      } else if (
        src.indexOf("imgcache.qq.com") > -1 ||
        src.indexOf("static.video.qq.com") > -1
      ) {
        myflashvars = objTag1.getAttribute("flashvars");
        if (myflashvars != null && myflashvars != "") {
          objTag1.setAttribute(
            "flashvars",
            objTag1
              .getAttribute("flashvars")
              .replace("autoplay=1", "autoplay=0")
          );
          newSrcQQ = objTag1.getAttribute("src") + "&" + myflashvars;
        } else {
          newSrcQQ = objTag1.getAttribute("src") + "&" + myflashvars;
        }
        objTag1.setAttribute("wmode", "transparent");
      } else if (src.indexOf("boosj.com") > -1) {
        myflashvars = objTag1.getAttribute("flashvars");
        if (myflashvars != null && myflashvars != "") {
          myflashvars = objTag1.getAttribute("flashvars").replace("p=1", "p=0");
          objTag1.setAttribute(
            "flashvars",
            objTag1.getAttribute("flashvars").replace("p=1", "p=0")
          );
          newSrcQQ = objTag1.src + "?" + myflashvars;
        } else {
          newSrcQQ = objTag1.src + "?" + myflashvars;
        }
        objTag1.wmode = "transparent";
      } else if (src.indexOf("static.youku.com") > -1) {
        myflashvars = objTag1.getAttribute("flashvars");
        if (myflashvars != null && myflashvars != "") {
          objTag1.setAttribute(
            "flashvars",
            objTag1
              .getAttribute("flashvars")
              .replace("isAutoPlay=true", "isAutoPlay=false")
          );
          try {
            newSrcQQ =
              objTag1.getAttribute("src") +
              "?isAutoPlay=true&" +
              myflashvars.substring(
                myflashvars.indexOf("VideoIDS"),
                myflashvars.length
              );
          } catch (suberr) {
            newSrcQQ = srcConvert(src, true);
          }
          objTag1.setAttribute("wmode", "transparent");
        }
        objTag1.setAttribute("wmode", "transparent");
      } else if (src.indexOf("www.56.com/flashApp") > -1) {
        myflashvars = objTag1.getAttribute("flashvars");
        if (
          myflashvars != null &&
          myflashvars != "" &&
          myflashvars.indexOf("&") == 0
        ) {
          newSrcQQ = src + "?" + myflashvars.replace("&", "");
          objTag1.setAttribute("wmode", "transparent");
        } else {
          objTag1.src = srcConvert(src, false);
          newSrcQQ = srcConvert(src, true);
          objTag1.setAttribute("wmode", "transparent");
        }
      } else if (src.indexOf("360kan.com") > -1) {
        myflashvars = objTag1.getAttribute("flashvars");
        if (myflashvars != null && myflashvars != "") {
          objTag1.setAttribute(
            "flashvars",
            objTag1
              .getAttribute("flashvars")
              .replace("isAutoPlay=true", "isAutoPlay=false")
          );
          if (objTag1.src.toString().indexOf("?") > -1)
            newSrcQQ = objTag1.src + "&" + myflashvars;
          else newSrcQQ = objTag1.src + "?" + myflashvars;
        } else {
          if (objTag1.src.toString().indexOf("?") > -1) {
            newSrcQQ = objTag1.src + "&" + myflashvars;
          } else {
            newSrcQQ = objTag1.src + "?" + myflashvars;
          }
        }
        objTag1.wmode = "transparent";
      } else if (src.indexOf("player.youku.com") > -1) {
        myflashvars = objTag1.getAttribute("flashvars");
        if (myflashvars != null && myflashvars != "") {
          objTag1.setAttribute(
            "flashvars",
            objTag1
              .getAttribute("flashvars")
              .replace("isAutoPlay=true", "isAutoPlay=false")
          );
          newSrcQQ = srcConvert(src, true);
          objTag1.setAttribute("wmode", "transparent");
        } else {
          objTag1.src = srcConvert(src, false);
          newSrcQQ = srcConvert(src, true);
          objTag1.setAttribute("wmode", "transparent");
        }
      } else if (src.indexOf("doc88.com") > -1) {
        myflashvars = objTag1.getAttribute("flashvars");
        if (myflashvars != null && myflashvars != "") {
          newSrcQQ = src + "?" + myflashvars;
          newSrcQQ =
            "http://www.doc88.com/" +
            myflashvars.replace("=", "-").replace("p1", "p") +
            ".html";
          objTag1.setAttribute("wmode", "transparent");
        } else {
          objTag1.src = srcConvert(src, false);
          newSrcQQ = srcConvert(src, true);
          objTag1.setAttribute("wmode", "transparent");
        }
      } else if (src.indexOf("71.cn") > -1) {
        myflashvars = objTag1.getAttribute("flashvars");
        if (myflashvars != null && myflashvars != "") {
          objTag1.setAttribute(
            "flashvars",
            objTag1
              .getAttribute("flashvars")
              .replace("isAutoPlay=true", "isAutoPlay=false")
          );
          if (objTag1.src.toString().indexOf("?") > -1)
            newSrcQQ = objTag1.src + "&" + myflashvars;
          else newSrcQQ = objTag1.src + "?" + myflashvars;
        } else {
          if (objTag1.src.toString().indexOf("?") > -1) {
            newSrcQQ = objTag1.src + "&" + myflashvars;
          } else {
            newSrcQQ = objTag1.src + "?" + myflashvars;
          }
        }
        objTag1.wmode = "transparent";
      } else if (src.indexOf("hitvs.cn") > -1) {
        myflashvars = objTag1.getAttribute("flashvars");
        if (myflashvars != null && myflashvars != "") {
          objTag1.setAttribute(
            "flashvars",
            objTag1
              .getAttribute("flashvars")
              .replace("isAutoPlay=true", "isAutoPlay=false")
          );
          if (objTag1.src.toString().indexOf("?") > -1)
            newSrcQQ = objTag1.src + "&" + myflashvars;
          else newSrcQQ = objTag1.src + "?" + myflashvars;
        } else {
          if (objTag1.src.toString().indexOf("?") > -1) {
            newSrcQQ = objTag1.src + "&" + myflashvars;
          } else {
            newSrcQQ = objTag1.src + "?" + myflashvars;
          }
        }
        objTag1.wmode = "transparent";
      } else if (
        src.indexOf("ifeng.com") > -1 ||
        src.indexOf("ifengimg.com") > -1
      ) {
        myflashvars = objTag1.getAttribute("flashvars");
        if (myflashvars != null && myflashvars != "") {
          newSrcQQ = src + "?" + myflashvars.replace("?", "&");
          objTag1.wmode = "transparent";
        } else {
          objTag1.src = srcConvert(src, false);
          newSrcQQ = srcConvert(src, true);
          objTag1.wmode = "transparent";
        }
      } else {
        objTag1.src = srcConvert(src, false);
        newSrcQQ = srcConvert(src, true);
        objTag1.setAttribute("wmode", "transparent");
      }
      var div = document.createElement("div");
      if (true) {
        if (
          objTag1.width.toString().indexOf("%") > -1 ||
          objTag1.width.toString() == "" ||
          objTag1.width.toString() == "auto"
        ) {
          objTag1.width = "640";
          objTag1.height = "480";
        }
        var w = Math.ceil(parseInt(objTag1.width));
        var h = Math.ceil((w * 480) / 640);
        div.style.width = w + "px";
        div.style.height = h + "px";
        if (
          src.indexOf("www.docin.com") > -1 ||
          src.indexOf("wenku.baidu.com") > -1 ||
          src.indexOf("doc88.com") > -1
        ) {
          titletip = "点击阅读";
        } else {
          titletip = "点击播放视频";
        }
        div.innerHTML =
          "<div  style='width:" +
          w +
          "px;height:" +
          h +
          "px;cursor:hand;'><a  href='" +
          newSrcQQ +
          "' target='_blank' title='" +
          titletip +
          "' style='width:" +
          w +
          "px;height:" +
          h +
          "px;cursor:hand;'><img src=''  style='width:" +
          w +
          "px;height:" +
          h +
          "px; max-width:" +
          w +
          "+px' /></a></div>";
      } else {
        if (objTag1.width == "") {
          if (
            document.defaultView.getComputedStyle(objTag1, null).width !=
              "auto" &&
            document.defaultView.getComputedStyle(objTag1, null).width != ""
          ) {
            objTag1.width = document.defaultView
              .getComputedStyle(objTag1, null)
              .width.replace("px", "");
            objTag1.height = document.defaultView
              .getComputedStyle(objTag1, null)
              .height.replace("px", "");
          } else {
            objTag1.width = 640;
            objTag1.height = 480;
          }
        }
        div.style.width = objTag1.width + "px";
        div.style.height = objTag1.height + "px";
        div.style.position = "relative";
        div.innerHTML =
          "<div class='backgroundDiv' style='width:" +
          objTag1.width +
          "px;height:" +
          objTag1.height +
          "px;absolute:absolute;cursor:hand'><a href='" +
          newSrcQQ +
          "' target='_blank' title='点击播放视频' style='width:" +
          objTag1.width +
          "px;height:" +
          objTag1.height +
          "px;cursor:hand'><div style='width:" +
          objTag1.width +
          "px;height:" +
          objTag1.height +
          "px;cursor:hand'></div></a></div>";
      }
      div.innerHTML +=
        "<div style='display:none;'>" +
        getOuterHTML(objTag1)
          .replace("<embed", '<embed wmode="transparent" ')
          .replace("autoplay=1", "autoplay=0")
          .replace("AutoPlay=1", "AutoPlay=0")
          .replace("autoplay=true", "autoplay=false")
          .replace("AutoPlay=true", "AutoPlay=false")
          .replace("isAutoPlay=1", "isAutoPlay=0")
          .replace("isAutoPlay=true", "isAutoPlay=false")
          .replace("auto=1", "auto=0")
          .replace("autoPlay=true", "autoPlay=false")
          .replace("autostart=1", "autostart=0")
          .replace('autostart="1"', 'autostart="0"') +
        "</div>";
      objTag1.parentNode.insertBefore(div, objTag1);
      objTag1.parentNode.removeChild(objTag1);
      if (
        src.indexOf("player.pptv.com") > -1 ||
        src.indexOf("pplive.cn") > -1
      ) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/pptv.jpg";
      } else if (src.indexOf("smgbb.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/dongfang.jpg";
      } else if (
        src.indexOf("js.tudouui.com") > -1 ||
        src.indexOf("tudou.com") > -1
      ) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/tudou.jpg";
      } else if (src.indexOf("zhiyin.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/zhiyin.gif";
      } else if (src.indexOf("tangdou.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/tangdou.jpg";
      } else if (
        src.indexOf("pomoho.com") > -1 ||
        src.indexOf("baomihua.com") > -1
      ) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/baomihua.gif";
      } else if (src.indexOf("tv189.") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/tianyi.gif";
      } else if (src.indexOf("jxyinyue.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/jiangxi.gif";
      } else if (src.indexOf("qiyi.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/qiyi.gif";
      } else if (src.indexOf("iqilu.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/qilu.gif";
      } else if (src.indexOf("e23.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/shunwang.gif";
      } else if (src.indexOf("people.com.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/renmin.gif";
      } else if (src.indexOf("v.chinamil.com.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/junshi.gif";
      } else if (src.indexOf("huanqiu.") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/huanqiu.gif";
      } else if (
        src.indexOf("youku.com") > -1 ||
        src.indexOf("www.qzone.cc/mumu/play") > -1 ||
        src.indexOf("yoqoo.com") > -1
      ) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/youku.jpg";
      } else if (src.indexOf("sina.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/sina1.gif";
      } else if (
        src.indexOf("ku6.com") > -1 ||
        src.indexOf("ku6vms") > -1 ||
        src.indexOf("ku6cdn") > -1
      ) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/ku6.gif";
      } else if (
        src.indexOf("ifeng.com") > -1 ||
        src.indexOf("ifengimg.com") > -1
      ) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/ifeng.gif";
      } else if (src.indexOf("hitow.net") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/flashimg/heitu.jpg";
      } else if (src.indexOf("client.joy.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/joy.gif";
      } else if (src.indexOf("6.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/6cn.gif";
      } else if (
        src.indexOf("letv.com") > -1 ||
        src.indexOf("letvcdn.com") > -1
      ) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/letv.gif";
      } else if (src.indexOf("qq.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/qq3.gif";
      } else if (
        src.indexOf("ws.126.net") > -1 ||
        src.indexOf("163.com") > -1
      ) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/126.gif";
      } else if (src.indexOf("sohu.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/sohu1.gif";
      } else if (
        src.indexOf("yinyuetai") > -1 ||
        src.indexOf("yytcdn.com") > -1
      ) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/yinyuetai.gif";
      } else if (src.indexOf("bokecc.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/bokecc.gif";
      } else if (src.indexOf("netease.") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/netease.gif";
      } else if (src.indexOf("dv.ce.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/dvce.gif";
      } else if (src.indexOf("umiwi.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/umiwi.gif";
      } else if (src.indexOf("boosj.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/boosj.jpg";
      } else if (src.indexOf("cdstm.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/cdstm.gif";
      } else if (
        src.indexOf("imgo.tv") > -1 ||
        src.indexOf("hunantv.com") > -1
      ) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/imgo.gif";
      } else if (src.indexOf("gmw.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/gmw.gif";
      } else if (src.indexOf("chinanews.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/chinanews.gif";
      } else if (src.indexOf("bdchina.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/bdchina.gif";
      } else if (src.indexOf("cutv.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/cutv.jpg";
      } else if (src.indexOf("v1.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/v1.gif";
      } else if (
        src.indexOf("xinhuanet.com") > -1 ||
        src.indexOf("news.cn") > -1
      ) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/xinhuanet.gif";
      } else if (src.indexOf("www.s1979.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/s1979.gif";
      } else if (src.indexOf("pps.tv") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/pps.gif";
      } else if (src.indexOf("xinmin.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/xinmin.gif";
      } else if (src.indexOf("www.aipai.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/aipai.gif";
      } else if (
        src.indexOf("pcauto.com.cn") > -1 ||
        src.indexOf("pclady.com.cn") > -1
      ) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/pcauto.gif";
      } else if (src.indexOf("www.legaldaily.com.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/legaldaily.gif";
      } else if (src.indexOf("www.5872.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/5872.gif";
      } else if (src.indexOf("video.sxrb.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/sxrb.gif";
      } else if (src.indexOf("21cn.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/21cn.gif";
      } else if (src.indexOf("kksmg.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/kksmg.gif";
      } else if (src.indexOf("v.ku6vms.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/ku6.gif";
      } else if (src.indexOf("cri.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/cri.gif";
      } else if (src.indexOf("yntv.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/yntv.gif";
      } else if (src.indexOf("mtime.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/mtime.gif";
      } else if (src.indexOf("chaoxing.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/chaoxing.gif";
      } else if (src.indexOf("v.csdn.hudong.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/csdn.gif";
      } else if (src.indexOf("eastmoney.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/eastmoney.gif";
      } else if (src.indexOf("av.rednet.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/rednet.gif";
      } else if (src.indexOf("cztv.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/cztv.gif";
      } else if (src.indexOf("enorth.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/enorth.gif";
      } else if (src.indexOf("v.rbc.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/rbc.gif";
      } else if (src.indexOf("xmnn.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/xmnn.gif";
      } else if (src.indexOf("hualu5.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/hualu5.gif";
      } else if (src.indexOf("17173.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/17173.gif";
      } else if (src.indexOf("cntv.cn") > -1 || src.indexOf("cctv.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/cntv.jpg";
      } else if (src.indexOf("71.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/xuanjiangjia.gif";
      } else if (src.indexOf("hitvs.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/hitvs.gif";
      } else if (src.indexOf("vodjk.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/jiankangdiyixian.gif";
      } else if (src.indexOf("56.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/56com.jpg";
      } else if (src.indexOf("jstv.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/jiangsuwangluo.gif";
      } else if (src.indexOf("docin.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/douding.gif";
      } else if (src.indexOf("doc88.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/88.gif";
      } else if (src.indexOf("wenku.baidu.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/baidu.gif";
      } else if (src.indexOf("static.hdslb.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/flashimg/bilibili.gif";
      } else if (src.indexOf("360kan.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/wz/360kan.jpg";
      }
    }
  } catch (err) {
    alert(err);
  }
}
function reSetInitFlashEmbed1() {
  var objTags = document.getElementsByTagName("embed");
  for (var n = 0; n < objTags.length; n++) {
    try {
      var objTag1;
      objTag1 = objTags[n];
      var src = objTag1.src;
      var src1 = "";
      if (!isVideo(src)) {
        continue;
      }
      var newSrcQQ = "";
      var myflashvars = "";
      if (src.indexOf("cntv.cn") > -1) {
        myflashvars = objTag1.flashvars;
        if (myflashvars != null && myflashvars != "") {
          if (cntvflashvars(myflashvars.toString()) != "") {
            newSrcQQ = cntvflashvars(myflashvars.toString());
          } else {
            objTag1.flashvars = objTag1.flashvars.replace(
              "isAutoPlay=true",
              "isAutoPlay=false"
            );
            if (objTag1.src.toString().indexOf("?") > -1) {
              newSrcQQ =
                objTag1.src.replace("isAutoPlay=true", "isAutoPlay=false") +
                "&" +
                myflashvars;
            } else {
              newSrcQQ =
                objTag1.src.replace("isAutoPlay=true", "isAutoPlay=false") +
                "?" +
                myflashvars;
            }
          }
          objTag1.wmode = "transparent";
        } else {
          objTag1.src = srcConvert(src, false);
          newSrcQQ = srcConvert(src, true);
          objTag1.wmode = "transparent";
        }
      } else if (src.indexOf("71.cn") > -1) {
        myflashvars = objTag1.flashvars;
        if (myflashvars != null && myflashvars != "") {
          objTag1.flashvars = objTag1.flashvars.replace(
            "isAutoPlay=true",
            "isAutoPlay=false"
          );
          if (objTag1.src.toString().indexOf("?") > -1) {
            newSrcQQ =
              objTag1.src.replace("isAutoPlay=true", "isAutoPlay=false") +
              "&" +
              myflashvars;
          } else {
            newSrcQQ =
              objTag1.src.replace("isAutoPlay=true", "isAutoPlay=false") +
              "?" +
              myflashvars;
          }
          objTag1.wmode = "transparent";
        } else {
          objTag1.src = srcConvert(src, false);
          newSrcQQ = srcConvert(src, true);
          objTag1.wmode = "transparent";
        }
      } else if (src.indexOf("hitvs.cn") > -1) {
        myflashvars = objTag1.flashvars;
        if (myflashvars != null && myflashvars != "") {
          objTag1.flashvars = objTag1.flashvars.replace(
            "isAutoPlay=true",
            "isAutoPlay=false"
          );
          if (objTag1.src.toString().indexOf("?") > -1) {
            newSrcQQ =
              objTag1.src.replace("isAutoPlay=true", "isAutoPlay=false") +
              "&" +
              myflashvars;
          } else {
            newSrcQQ =
              objTag1.src.replace("isAutoPlay=true", "isAutoPlay=false") +
              "?" +
              myflashvars;
          }
          objTag1.wmode = "transparent";
        } else {
          objTag1.src = srcConvert(src, false);
          newSrcQQ = srcConvert(src, true);
          objTag1.wmode = "transparent";
        }
      } else if (src.indexOf("qq.com") > -1) {
        myflashvars = objTag1.flashvars;
        if (myflashvars != null && myflashvars != "") {
          objTag1.flashvars = objTag1.flashvars.replace(
            "autoplay=1",
            "autoplay=0"
          );
          newSrcQQ =
            objTag1.src.replace("autoplay=1", "autoplay=0") + "&" + myflashvars;
          objTag1.wmode = "transparent";
        } else {
          objTag1.src = srcConvert(src, false);
          newSrcQQ = srcConvert(src, true);
          objTag1.wmode = "transparent";
        }
      } else if (src.indexOf("boosj.com") > -1) {
        myflashvars = objTag1.flashvars;
        if (myflashvars != null && myflashvars != "") {
          objTag1.flashvars = objTag1.flashvars.replace("p=1", "p=0");
          newSrcQQ =
            objTag1.src.replace("p=1", "p=0") +
            "?" +
            myflashvars.replace("p=1", "p=0");
          objTag1.wmode = "transparent";
        } else {
          objTag1.src = srcConvert(src, false);
          newSrcQQ = srcConvert(src, true);
          objTag1.wmode = "transparent";
        }
      } else if (src.indexOf("static.youku.com") > -1) {
        myflashvars = objTag1.flashvars;
        if (myflashvars != null && myflashvars != "") {
          objTag1.flashvars = objTag1.flashvars.replace(
            "isAutoPlay=true",
            "isAutoPlay=false"
          );
          try {
            newSrcQQ =
              objTag1.src +
              "?isAutoPlay=true&" +
              myflashvars.substring(
                myflashvars.indexOf("VideoIDS"),
                myflashvars.length
              );
          } catch (suberr) {
            newSrcQQ = srcConvert(src, true);
          }
          objTag1.wmode = "transparent";
        } else {
          objTag1.src = srcConvert(src, false);
          newSrcQQ = srcConvert(src, true);
          objTag1.wmode = "transparent";
        }
      } else if (src.indexOf("player.youku.com") > -1) {
        myflashvars = objTag1.flashvars;
        if (myflashvars != null && myflashvars != "") {
          objTag1.flashvars = objTag1.flashvars.replace(
            "isAutoPlay=true",
            "isAutoPlay=false"
          );
          newSrcQQ = srcConvert(src, true);
          objTag1.wmode = "transparent";
        } else {
          objTag1.src = srcConvert(src, false);
          newSrcQQ = srcConvert(src, true);
          objTag1.wmode = "transparent";
        }
      } else if (
        src.indexOf("ifeng.com") > -1 ||
        src.indexOf("ifengimg.com") > -1
      ) {
        myflashvars = objTag1.flashvars;
        if (myflashvars != null && myflashvars != "") {
          objTag1.flashvars = objTag1.flashvars.replace(
            "isAutoPlay=true",
            "isAutoPlay=false"
          );
          newSrcQQ = src + "?" + myflashvars.replace("?", "&");
          objTag1.wmode = "transparent";
        } else {
          objTag1.src = srcConvert(src, false);
          newSrcQQ = srcConvert(src, true);
          objTag1.wmode = "transparent";
        }
      } else if (src.indexOf("www.56.com/flashApp") > -1) {
        myflashvars = objTag1.flashvars;
        if (
          myflashvars != null &&
          myflashvars != "" &&
          myflashvars.indexOf("&") == 0
        ) {
          newSrcQQ = src + "?" + myflashvars.replace("&", "");
          objTag1.wmode = "transparent";
        } else {
          objTag1.src = srcConvert(src, false);
          newSrcQQ = srcConvert(src, true);
          objTag1.wmode = "transparent";
        }
      } else if (src.indexOf("360kan.com") > -1) {
        myflashvars = objTag1.flashvars;
        if (myflashvars != null && myflashvars != "") {
          objTag1.flashvars = objTag1.flashvars.replace(
            "isAutoPlay=true",
            "isAutoPlay=false"
          );
          newSrcQQ = src + "?" + myflashvars.replace("?", "&");
          objTag1.wmode = "transparent";
        } else {
          objTag1.src = srcConvert(src, false);
          newSrcQQ = srcConvert(src, true);
          objTag1.wmode = "transparent";
        }
      } else if (src.indexOf("doc88.com") > -1) {
        myflashvars = objTag1.flashvars;
        if (myflashvars != null && myflashvars != "") {
          newSrcQQ = src + "?" + myflashvars;
          newSrcQQ =
            "http://www.doc88.com/" +
            myflashvars.replace("=", "-").replace("p1", "p") +
            ".html";
          objTag1.wmode = "transparent";
        } else {
          objTag1.src = srcConvert(src, false);
          newSrcQQ = srcConvert(src, true);
          objTag1.wmode = "transparent";
        }
      } else {
        objTag1.src = srcConvert(src, false);
        newSrcQQ = srcConvert(src, true);
        objTag1.wmode = "transparent";
      }
      var div = document.createElement("div");
      if (true) {
        if (
          objTag1.width.toString().indexOf("%") > -1 ||
          objTag1.width.toString() == "" ||
          objTag1.width.toString() == "auto"
        ) {
          objTag1.width = "640";
          objTag1.height = "480";
        }
        var w = Math.ceil(parseInt(objTag1.width));
        var h = Math.ceil((w * 480) / 640);
        div.style.width = w + "px";
        div.style.height = h + "px";
        if (
          src.indexOf("www.docin.com") > -1 ||
          src.indexOf("wenku.baidu.com") > -1 ||
          src.indexOf("doc88.com") > -1
        ) {
          titletip = "点击阅读";
        } else {
          titletip = "点击播放视频";
        }
        div.innerHTML =
          "<div style='width:" +
          w +
          "px;height:" +
          h +
          "px;cursor:hand;'><a  href='" +
          newSrcQQ +
          "' target='_blank' title='" +
          titletip +
          "' style='width:" +
          w +
          "px;height:" +
          h +
          "px;cursor:hand'><img src=''  style='width:" +
          w +
          "px;height:" +
          h +
          "px; max-width:" +
          w +
          "+px' /></a></div>";
      } else {
        if (objTag1.width == "") {
          if (
            objTag1.currentStyle.width != "auto" &&
            objTag1.currentStyle.width != ""
          ) {
            objTag1.width = objTag1.currentStyle.width.replace("px", "");
            objTag1.height = objTag1.currentStyle.height.replace("px", "");
          } else {
            objTag1.width = 640;
            objTag1.height = 480;
          }
        }
        div.style.width = objTag1.width + "px";
        div.style.height = objTag1.height + "px";
        div.style.position = "relative";
        div.innerHTML =
          "<div class='backgroundDivIe' style='width:" +
          objTag1.width +
          "px;height:" +
          objTag1.height +
          "px;position:absolute;cursor:hand;'><a href='" +
          newSrcQQ +
          "' target='_blank' title='点击播放视频' style='width:" +
          objTag1.width +
          "px;height:" +
          objTag1.height +
          "px;cursor:hand'><div style='width:" +
          objTag1.width +
          "px;height:" +
          objTag1.height +
          "px;cursor:hand;'></div></a></div>";
      }
      if (false) {
        div.innerHTML +=
          "<div><img src='http://pubimage.360doc.com/cntv.jpg' /></div>";
      } else {
        div.innerHTML +=
          "<div style='display:none'>" +
          objTag1.outerHTML
            .replace("<EMBED", '<EMBED wmode="transparent" ')
            .replace("<embed", '<embed wmode="transparent" ')
            .replace("autoplay=1", "autoplay=0")
            .replace("AutoPlay=1", "AutoPlay=0")
            .replace("autoplay=true", "autoplay=false")
            .replace("AutoPlay=true", "AutoPlay=false")
            .replace("isAutoPlay=1", "isAutoPlay=0")
            .replace("isAutoPlay=true", "isAutoPlay=false")
            .replace("auto=1", "auto=0")
            .replace("autoPlay=true", "autoPlay=false")
            .replace("autostart=1", "autostart=0")
            .replace('autostart="1"', 'autostart="0"')
            .replace('autoplay="true"', 'autoplay="false"')
            .replace('autostart="true"', 'autostart="false"') +
          "</div>";
      }
      objTag1.parentNode.replaceChild(div, objTag1);
      if (
        src.indexOf("player.pptv.com") > -1 ||
        src.indexOf("pplive.cn") > -1
      ) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/pptv.jpg";
      } else if (src.indexOf("cntv.cn") > -1 || src.indexOf("cctv.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/cntv.jpg";
      } else if (src.indexOf("71.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/xuanjiangjia.gif";
      } else if (src.indexOf("hitvs.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/hitvs.gif";
      } else if (src.indexOf("vodjk.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/jiankangdiyixian.gif";
      } else if (src.indexOf("smgbb.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/dongfang.jpg";
      } else if (
        src.indexOf("js.tudouui.com") > -1 ||
        src.indexOf("tudou.com") > -1
      ) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/tudou.jpg";
      } else if (src.indexOf("zhiyin.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/zhiyin.gif";
      } else if (src.indexOf("tangdou.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/tangdou.jpg";
      } else if (
        src.indexOf("pomoho.com") > -1 ||
        src.indexOf("baomihua.com") > -1
      ) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/baomihua.gif";
      } else if (src.indexOf("tv189.") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/tianyi.gif";
      } else if (src.indexOf("jxyinyue.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/jiangxi.gif";
      } else if (src.indexOf("qiyi.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/qiyi.gif";
      } else if (src.indexOf("iqilu.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/qilu.gif";
      } else if (src.indexOf("e23.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/shunwang.gif";
      } else if (src.indexOf("people.com.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/renmin.gif";
      } else if (src.indexOf("v.chinamil.com.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/junshi.gif";
      } else if (src.indexOf("huanqiu.") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/huanqiu.gif";
      } else if (
        src.indexOf("youku.com") > -1 ||
        src.indexOf("www.qzone.cc/mumu/play") > -1 ||
        src.indexOf("yoqoo.com") > -1
      ) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/youku.jpg";
      } else if (src.indexOf("sina.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/sina1.gif";
      } else if (
        src.indexOf("ku6.com") > -1 ||
        src.indexOf("ku6vms") > -1 ||
        src.indexOf("ku6cdn") > -1
      ) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/ku6.gif";
      } else if (
        src.indexOf("ifeng.com") > -1 ||
        src.indexOf("ifengimg.com") > -1
      ) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/ifeng.gif";
      } else if (src.indexOf("hitow.net") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/flashimg/heitu.jpg";
      } else if (src.indexOf("client.joy.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/joy.gif";
      } else if (src.indexOf("6.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/6cn.gif";
      } else if (
        src.indexOf("letv.com") > -1 ||
        src.indexOf("letvcdn.com") > -1
      ) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/letv.gif";
      } else if (src.indexOf("qq.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/qq3.gif";
      } else if (
        src.indexOf("ws.126.net") > -1 ||
        src.indexOf("163.com") > -1
      ) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/126.gif";
      } else if (src.indexOf("sohu.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/sohu1.gif";
      } else if (
        src.indexOf("yinyuetai") > -1 ||
        src.indexOf("yytcdn.com") > -1
      ) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/yinyuetai.gif";
      } else if (src.indexOf("bokecc.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/bokecc.gif";
      } else if (src.indexOf("netease.") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/netease.gif";
      } else if (src.indexOf("dv.ce.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/dvce.gif";
      } else if (src.indexOf("umiwi.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/umiwi.gif";
      } else if (src.indexOf("boosj.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/boosj.jpg";
      } else if (src.indexOf("cdstm.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/cdstm.gif";
      } else if (
        src.indexOf("imgo.tv") > -1 ||
        src.indexOf("hunantv.com") > -1
      ) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/imgo.gif";
      } else if (src.indexOf("gmw.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/gmw.gif";
      } else if (src.indexOf("chinanews.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/chinanews.gif";
      } else if (src.indexOf("bdchina.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/bdchina.gif";
      } else if (src.indexOf("cutv.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/cutv.jpg";
      } else if (src.indexOf("v1.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/v1.gif";
      } else if (
        src.indexOf("xinhuanet.com") > -1 ||
        src.indexOf("news.cn") > -1
      ) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/xinhuanet.gif";
      } else if (src.indexOf("www.s1979.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/s1979.gif";
      } else if (src.indexOf("pps.tv") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/pps.gif";
      } else if (src.indexOf("xinmin.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/xinmin.gif";
      } else if (src.indexOf("www.aipai.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/aipai.gif";
      } else if (
        src.indexOf("pcauto.com.cn") > -1 ||
        src.indexOf("pclady.com.cn") > -1
      ) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/pcauto.gif";
      } else if (src.indexOf("www.legaldaily.com.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/legaldaily.gif";
      } else if (src.indexOf("www.5872.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/5872.gif";
      } else if (src.indexOf("video.sxrb.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/sxrb.gif";
      } else if (
        src.indexOf("21cn.com") > -1 ||
        src.indexOf("21cbh.com") > -1
      ) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/21cn.gif";
      } else if (src.indexOf("kksmg.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/kksmg.gif";
      } else if (src.indexOf("v.ku6vms.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/ku6.gif";
      } else if (src.indexOf("cri.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/cri.gif";
      } else if (src.indexOf("yntv.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/yntv.gif";
      } else if (
        src.indexOf("mtime.com") > -1 ||
        src.indexOf("mtime.cn") > -1
      ) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/mtime.gif";
      } else if (src.indexOf("chaoxing.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/chaoxing.gif";
      } else if (src.indexOf("v.csdn.hudong.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/csdn.gif";
      } else if (src.indexOf("eastmoney.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/eastmoney.gif";
      } else if (src.indexOf("av.rednet.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/rednet.gif";
      } else if (src.indexOf("cztv.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/cztv.gif";
      } else if (src.indexOf("enorth.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/enorth.gif";
      } else if (src.indexOf("v.rbc.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/rbc.gif";
      } else if (src.indexOf("xmnn.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/xmnn.gif";
      } else if (src.indexOf("hualu5.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/hualu5.gif";
      } else if (src.indexOf("17173.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/17173.gif";
      } else if (src.indexOf("56.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/56com.jpg";
      } else if (src.indexOf("gdhytv.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/gdhytv.gif";
      } else if (src.indexOf("ahtv.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/ahtv.gif";
      } else if (src.indexOf("china.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/china.gif";
      } else if (src.indexOf("wasu.cn") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/wasu.gif";
      } else if (src.indexOf("jstv.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/jiangsuwangluo.gif";
      } else if (src.indexOf("docin.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/douding.gif";
      } else if (src.indexOf("doc88.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/88.gif";
      } else if (src.indexOf("wenku.baidu.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/baidu.gif";
      } else if (src.indexOf("static.hdslb.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/flashimg/bilibili.gif";
      } else if (src.indexOf("360kan.com") > -1) {
        div.getElementsByTagName("img")[0].src =
          "http://pubimage.360doc.com/wz/360kan.jpg";
      }
    } catch (err) {}
  }
}
function testContent(type) {
  if (type == 1) {
    if (document.getElementById("SendRefTB").value == "写评论...") {
      document.getElementById("SendRefTB").value = "";
      document.getElementById("SendRefTB").style.color = "#000000";
    }
  } else if (type == 2) {
    if (document.getElementById("SendRefTB").value == "") {
      document.getElementById("SendRefTB").value = "写评论...";
      document.getElementById("SendRefTB").style.color = "#BBBABA";
    }
  }
}
function SubmitReflection() {
  $("#ImgSendPL").unbind("click");
  var strReflectContentCG = document.getElementById("SendRefTB").value;
  if (UserID == "" || UserID == 0) {
    ReflectionLoginform();
    $("#ImgSendPL").bind("click", SubmitReflection);
    return false;
  } else if (
    document.getElementById("SendRefTB").value.length == 0 ||
    document.getElementById("SendRefTB").value == "写评论..."
  ) {
    alert("请填写评论后再发表！");
    $("#ImgSendPL").bind("click", SubmitReflection);
    return false;
  } else if (strReflectContentCG.length > 600) {
    alert("抱歉，评论字数超过最大限制");
    $("#ImgSendPL").bind("click", SubmitReflection);
    return false;
  } else {
    document.getElementById("ImgSendPL").disabled = true;
    getJSON(
      "http://webservice.360doc.com/GetArtInfo20130912NewV.ashx?TestUserType=" +
        UserID +
        "&jsoncallback=?",
      function(responseText) {
        var result = responseText.html;
        var target = "@@@";
        var index = result.indexOf(target);
        result = result.substring(0, index);
        if (result != "") {
          if (result == "0") {
            alert("对不起，您的帐号已被封存！");
            $("#ImgSendPL").bind("click", SubmitReflection);
            document.getElementById("ImgSendPL").disabled = false;
            return false;
          } else if (result == "2") {
            alert("服务器忙请稍侯重试用！");
            $("#ImgSendPL").bind("click", SubmitReflection);
            document.getElementById("ImgSendPL").disabled = false;
            return false;
          } else if (result == "3") {
            showValideTip();
            $("#ImgSendPL").bind("click", SubmitReflection);
            document.getElementById("ImgSendPL").disabled = false;
            return false;
          } else if (result == "cg-1error") {
            alert("URL不合法!");
            $("#ImgSendPL").bind("click", SubmitReflection);
            document.getElementById("ImgSendPL").disabled = false;
            return false;
          } else {
            testreflectiontype();
            artStatistics("20-4-8");
          }
        }
      }
    );
    if (document.getElementById("chkRemember").checked) {
      var popwin = window.open(
        pageurl,
        "popWin ",
        "top=0,left=0,width=" +
          window.screen.width +
          ",height=" +
          window.screen.height
      );
      return true;
    } else {
      return false;
    }
  }
}
function testreflectiontype() {
  var strReflectContent = document.getElementById("SendRefTB").value;
  var strReflectContentEncode = escape(strReflectContent);
  var strPost =
    "<PostRef><strReflectContent>" +
    strReflectContent +
    "</strReflectContent></PostRef>";
  var callbackobject = new CallBackXML(strPost);
  callbackobject.onComplete = function(responseText, responseXml) {
    var result = responseText;
    var target = "@@@";
    var index = result.indexOf(target);
    result = result.substring(0, index);
    if (result == "ad") {
      $("#ImgSendPL").bind("click", SubmitReflection);
      document.getElementById("ImgSendPL").disabled = false;
      alert("请勿发送广告评论!");
      return false;
    } else if (result == "-10") {
      alert("请填写评论后再发表！");
      $("#ImgSendPL").bind("click", SubmitReflection);
      document.getElementById("ImgSendPL").disabled = false;
      document.getElementById("SendRefTB").value = "写评论...";
      return false;
    } else {
      if (result == 1) {
        ClickStatics("wztempstatistic1");
        $("#LayerLogin").html(
          '<div id="fullbg"></div><div id="dialog" style="position: fixed;width:370px;height:170px;" > <div id="dialog_content"></div><div ><div class="weixinbox" style="width: 370px; height:170px;" id="layerdiv"><div class="cengbj"><div class="cengleft">温馨提示</div><div class="rt360" style="padding-top: 11px; padding-right: 20px;"><div class="chas" style="cursor:pointer;" onclick="closeBg();RestoryReflection();"><a href="javascript:void(0);"></a></div></div><div class="tishi-box1" style="padding-top: 31px;"> <div class="shangtishi_pt"><span class="tishi-wz1" style="font-size:14px;">建议您通过献花表达自己的感谢！</span></div></div><div style="text-align: center; padding-left:140px; margin-top:0px;"><div class="erjibt_li" style="float: left;" onmouseover="this.className=\'erjibta_li\'" onmouseout="this.className=\'erjibt_li\'"><div class="btwz" style="color:#FFF; font-weight:bold;" id="continueflower">我要献花</div></div><div class="erjibtgray_li" style="float: left; margin-left: 5px;" onmouseover="this.className=\'erjibtgraya_li\'" onmouseout="this.className=\'erjibtgray_li\'"><div id="continuesubmit" class="btwz"  >继续发表</div></div></div></div></div></div></div>'
        );
        $("#LayerLogin").show();
        $("#continuesubmit").bind("click", ContinueReflection);
        $("#continueflower").bind("click", ContinueSendFlower);
        showBg("dialog", "dialog_content", "1");
      } else {
        insertRef();
      }
      return false;
    }
  };
  callbackobject.DoCallBack("/ajax/testreflectiontype.ashx");
}
function scode(s) {
  s = this.sort(s);
  return escape($.md5(s.toLowerCase()));
}
function sort(Url) {
  var array = new Array();
  for (var key in Url) {
    array.push(key + "=" + Url[key]);
  }
  array.sort();
  var rel = "";
  for (i = 0; i < array.length; i++) {
    rel += array[i];
  }
  return rel;
}
function insertRef() {
  var strReflectUserID = UserID;
  var strReflectContent = document.getElementById("SendRefTB").value;
  var strReflectArticleID = ArticleID;
  var strReflectContentEncode = escape(strReflectContent);
  var refer = document.referrer.toLowerCase();
  if (
    refer == "http://www.360doc.com/index6.aspx" ||
    refer == "http://www.360doc.com" ||
    refer == "http://www.360doc.com/" ||
    refer == "http://www.360doc.com/index.html" ||
    refer == "www.360doc.com/index6.aspx" ||
    refer == "www.360doc.com" ||
    refer == "www.360doc.com/" ||
    refer == "www.360doc.com/index.html"
  ) {
    refer = "1";
  } else {
    refer = "0";
  }
  var strPost =
    "<PostRef><strReflectUserID>" +
    strReflectUserID +
    "</strReflectUserID><strReflectContent>" +
    strReflectContent +
    "</strReflectContent><strReflectArticleID>" +
    strReflectArticleID +
    "</strReflectArticleID><isfromhp>" +
    refer +
    "</isfromhp><articleid>" +
    ArticleID +
    "</articleid></PostRef>";
  try {
    $.ajax({
      url: "/ajax/BaseAJAX/ReflectionAjaxBase.ashx",
      data: {
        op: "InsertReflection",
        strReflectUserID: strReflectUserID,
        strReflectContent: strReflectContent,
        strReflectArticleID: strReflectArticleID,
        isfromhp: refer,
        articleid: ArticleID,
        sign: scode({
          op: "InsertReflection",
          strReflectUserID: strReflectUserID,
          strReflectContent: strReflectContent,
          strReflectArticleID: strReflectArticleID,
          isfromhp: refer,
          articleid: ArticleID
        })
      },
      cache: false,
      success: function(result) {
        var data = eval("(" + result + ")");
        document.getElementById("ImgSendPL").disabled = false;
        $("#ImgSendPL").bind("click", SubmitReflection);
        if (data.status == 1) {
          closeBg();
          document.getElementById("SendRefTB").value = "";
          document.getElementById("SendRefTB").value = "写评论...";
          nextPageReflection(REFLECTION_PAGENUM, 1, ArticleID);
          $("#SendRefTB").blur();
          var clientScrollTop = "";
          if (document.body && document.body.scrollTop) {
            document.body.scrollTop =
              document.getElementById("IframeAd").offsetTop + 75;
          } else if (
            document.documentElement &&
            document.documentElement.scrollTop
          ) {
            document.documentElement.scrollTop =
              document.getElementById("IframeAd").offsetTop + 75;
          }
          return true;
        } else if (data.status == "-100") {
          alert("服务器错误!");
          return false;
        } else if (data.status == "-2") {
          alert("请勿发送广告评论!");
          return false;
        } else if (data.status == "-4") {
          alert("请填写评论后再发表！");
          document.getElementById("SendRefTB").value = "写评论...";
          return false;
        } else {
          alert("对不起，数据库执行失败，请重试！");
          return false;
        }
      },
      error: function(e) {
        alert("失败");
      }
    });
  } catch (err) {
    alert("失败");
  }
}
function GetReflection() {
  getJSON(
    "http://webservice.360doc.com/GetArtInfo20130912NewV.ashx?GetReflection=" +
      ArticleID +
      "," +
      ArtUserID +
      "," +
      UserID +
      "&jsoncallback=?",
    function(responseText) {
      var result = responseText.html;
      var target = "@@@";
      var index = result.indexOf(target);
      result = result.substring(0, index);
      if (result == "cg-1error") {
        alert("URL不合法!");
      } else {
        document.getElementById("Reflction").innerHTML = result;
      }
    }
  );
}
function AlterReflect(strSpanIDCGCG, CurReflecctID) {
  var test = document.getElementById("360docRefNowAlter");
  if (test != null) {
    var SpCg = document.getElementById("360docRefNowAlter").title;
    document.getElementById(SpCg).innerHTML = CurReflectionCon;
    $(document.getElementById(SpCg))
      .next()
      .remove();
    $(document.getElementById(SpCg)).show();
  }
  var aa = document.getElementById(strSpanIDCGCG).innerHTML;
  var bb = aa;
  $(document.getElementById(strSpanIDCGCG)).after(
    '<div class="new_huifubt f_left new_huifubt_show"><textarea id="360docRefNowAlter" title="' +
      strSpanIDCGCG +
      '" name="' +
      aa +
      '"></textarea><p><a href="javascript:void(0)" onclick="AlterRef(\'' +
      CurReflecctID +
      '\')">确定</a><a href="javascript:void(0)" class="a2" onclick="CloseDiv()">取消</a></p></div>'
  );
  $(document.getElementById(strSpanIDCGCG)).hide();
  aa = aa.replace(/<BR>/g, "\r\n");
  aa = aa.replace(/<br>/g, "\r\n");
  aa = aa.replace(/<bt>/g, "\r\n");
  aa = aa.replace(/<Br>/g, "\r\n");
  aa = aa.replace(/&gt;/g, ">");
  aa = aa.replace(/&lt;/g, "<");
  aa = aa.replace(/&nbsp;/g, " ");
  aa = aa.replace(/&amp;/g, "&");
  document.getElementById("360docRefNowAlter").value = aa;
  CurReflectionCon = bb;
}
function AlterRef(CurReflecctID) {
  var test = document.getElementById("360docRefNowAlter");
  var Con = test.value;
  if (Con.length > 600) {
    alert("抱歉，评论字数超过最大限制");
    return;
  }
  AlterRefcg(CurReflecctID);
}
function AlterRefcg(CurReflecctID) {
  var test = document.getElementById("360docRefNowAlter");
  var Con = test.value;
  if (Con.length > 600) {
    alert("抱歉，评论字数超过最大限制");
    return;
  }
  Con = escape(Con);
  var strPost =
    "<PostRef><CurReflecctID>" +
    CurReflecctID +
    "</CurReflecctID><strReflectArticleID>" +
    ArticleID +
    "</strReflectArticleID><Reflection>" +
    Con +
    "</Reflection></PostRef>";
  var callbackobject = new CallBackXML(strPost);
  callbackobject.onComplete = function(responseText, responseXml) {
    var result = responseText;
    var target = "@@@";
    var index = result.indexOf(target);
    result = result.substring(0, index);
    if (result == 1) {
      $("#reflectionContentP_" + CurReflecctID).html(
        $("#360docRefNowAlter").val()
      );
      $("#reflectionContentP_" + CurReflecctID).show();
      $("#reflectionContentP_" + CurReflecctID)
        .next()
        .remove();
    } else if (result == "cg-1error") {
      alert("URL不合法!");
    } else if (result == "cg-1Null") {
      alert("您修改的评论不能为空");
    } else if (result == "ad") {
      alert("请勿发送广告评论!");
      document.getElementById("Button1").disabled = false;
    } else if (result == "-1") {
      alert("服务器忙!，请稍侯重试！");
    }
  };
  callbackobject.DoCallBack("/ajax/AlterReflection20100301.ashx");
}
function CloseDiv() {
  var test = document.getElementById("360docRefNowAlter");
  if (test != null) {
    var SpCg = document.getElementById("360docRefNowAlter").title;
    document.getElementById(SpCg).innerHTML = CurReflectionCon;
    $(document.getElementById(SpCg)).show();
    $(document.getElementById(SpCg))
      .next()
      .remove();
  }
}
function zancai(type, reflectionID, ConID) {
  if (type == "0") {
    artStatistics("20-4-10");
  } else if (type == "1") {
    artStatistics("20-4-11");
  }
  if (UserID == 0) {
    ArtLoginTypeID = 2;
    ArtLoginType = type;
    ArtLoginReflectionID = reflectionID;
    ArtLoginConID = ConID;
    LoginFormArt(55);
    return;
  }
  getJSON(
    "http://webservice.360doc.com/GetArtInfo20130912NewV.ashx?UpOrDown=" +
      FirstArtID +
      "," +
      reflectionID +
      "," +
      type +
      "," +
      UserID +
      "&jsoncallback=?",
    function(responseText) {
      var result = responseText.html;
      if (result == "-2") {
        alert("您已经顶过该条评论了");
      } else if (result == "-3") {
        alert("您已经踩过该条评论了");
      } else if (result == "-1") {
        alert("网络繁忙请稍侯重试!");
      } else if (result == "-5") {
        alert("您不能顶自己的评论!");
      } else if (result == "-6") {
        alert("您不能踩自己的评论!");
      } else if (result == "1") {
        var VNum = document.getElementById(ConID).innerHTML;
        var VNumNew = parseInt(VNum);
        VNumNew = VNumNew + 1;
        document.getElementById(ConID).innerHTML = VNumNew;
        $("#" + ConID).addClass("reply_none");
      }
    }
  );
}
function ShowReplies(reflectionid, DivID, type) {
  getJSON(
    "http://webservice.360doc.com/GetArtInfo20130912NewV.ashx?GetReplies=" +
      FirstArtID +
      "," +
      reflectionid +
      "," +
      UserID +
      "&jsoncallback=?",
    function(responseText) {
      var result = responseText.html;
      var target = "@@@";
      var index = result.indexOf(target);
      result = result.substring(0, index);
      if (result == "cg-1error") {
        alert("URL不合法!");
      } else {
        var SubNum = 0;
        SubNum = result.substring(0, result.indexOf("@#cnumg*@"));
        result = result.substring(result.indexOf("@#cnumg*@") + 9);
        var SubDIvID = "ReplyNum" + reflectionid;
        document.getElementById(DivID).innerHTML = result;
        document.getElementById(DivID).style.display = "";
        if (document.getElementById(SubDIvID) != null) {
          document.getElementById(SubDIvID).innerHTML = " 回复";
        }
      }
    }
  );
}
function disablereflectionbtn(curreflectionid, type) {
  if (type == 1) {
    document.getElementById(
      "btnOfReply" + curreflectionid
    ).onclick = function() {
      ReplyReflection(curreflectionid, 1);
      return false;
    };
  } else if (type == 0) {
    document.getElementById(
      "btnOfReply" + curreflectionid
    ).onclick = function() {};
  }
}
function ReplyReflection(curreflectionid, type) {
  if (UserID == 0) {
    CurSubReplyTextID = curreflectionid;
    ArtLoginTypeID = 5;
    LoginFormArt(59);
    return;
  }
  var TextAreaID = "textareaOfReplay" + curreflectionid;
  var ImageID = "btnOfReply" + curreflectionid;
  if (document.getElementById(TextAreaID).value.length == 0) {
    alert("请填写评论后再发表！");
    return;
  }
  disablereflectionbtn(curreflectionid, 0);
  CheckUserTypeOfReply(TextAreaID, ImageID, curreflectionid, type);
}
function CheckUserTypeOfReply(TextAreaID, ImageID, curreflectionid, type) {
  getJSON(
    "http://webservice.360doc.com/GetArtInfo20130912NewV.ashx?TestUserType=" +
      UserID +
      "&jsoncallback=?",
    function(responseText) {
      var result = responseText.html;
      var target = "@@@";
      var index = result.indexOf(target);
      result = result.substring(0, index);
      if (result != "") {
        if (result == "0") {
          alert("对不起，您的帐号已被封存！");
          document.getElementById("SendRefBtn").disabled = "";
          disablereflectionbtn(curreflectionid, 1);
        } else if (result == "2") {
          alert("服务器忙请稍侯重试用！");
          disablereflectionbtn(curreflectionid, 1);
        } else if (result == "3") {
          showValideTip();
          disablereflectionbtn(curreflectionid, 1);
          return false;
        } else if (result == "cg-1error") {
          alert("URL不合法!");
          disablereflectionbtn(curreflectionid, 1);
        } else {
          var strReflectContentCG = document.getElementById(TextAreaID).value;
          if (strReflectContentCG.length > 600) {
            alert("抱歉，评论字数超过最大限制");
            document.getElementById("SendRefBtn").disabled = "";
            disablereflectionbtn(curreflectionid, 1);
          } else {
            document.getElementById(ImageID).disabled = true;
            testreflectiontypeSub(
              TextAreaID,
              curreflectionid,
              document.getElementById(ImageID),
              type
            );
          }
        }
      } else {
        alert("没有上一篇文章!");
      }
    }
  );
}
function insertRefOfReply(TextAreaID, curreflectionid, replybtn, type) {
  var strReflectUserID = UserID;
  var strReflectContent = document.getElementById(TextAreaID).value;
  var strReflectArticleID = ArticleID;
  var strReflectContentEncode = escape(strReflectContent);
  var refer = document.referrer.toLowerCase();
  if (
    refer == "http://www.360doc.com/index6.aspx" ||
    refer == "http://www.360doc.com" ||
    refer == "http://www.360doc.com/" ||
    refer == "http://www.360doc.com/index.html" ||
    refer == "www.360doc.com/index6.aspx" ||
    refer == "www.360doc.com" ||
    refer == "www.360doc.com/" ||
    refer == "www.360doc.com/index.html"
  ) {
    refer = "1";
  } else {
    refer = "0";
  }
  var strPost =
    "<PostRef><strReflectUserID>" +
    strReflectUserID +
    "</strReflectUserID><strReflectContent>" +
    strReflectContent +
    "</strReflectContent><strReflectArticleID>" +
    strReflectArticleID +
    "</strReflectArticleID><TopicID>" +
    curreflectionid +
    "</TopicID><isfromhp>" +
    refer +
    "</isfromhp><articleid>" +
    ArticleID +
    "</articleid></PostRef>";
  var callbackobject = new CallBackXML(strPost);
  callbackobject.onComplete = function(responseText, responseXml) {
    var result = responseText;
    var target = "@@@";
    var index = result.indexOf(target);
    result = result.substring(0, index);
    if (result == 1) {
      closeBg();
      reSetReplyList(ArticleID, curreflectionid);
      disablereflectionbtn(curreflectionid, 1);
    } else if (result == "cg-1error") {
      alert("URL不合法!");
      replybtn.disabled = false;
      disablereflectionbtn(curreflectionid, 1);
    } else if (result == "ad") {
      alert("请勿发送广告评论!");
      replybtn.disabled = false;
      disablereflectionbtn(curreflectionid, 1);
    } else if (result == "-10") {
      alert("请填写评论后再发表！");
      document.getElementById(TextAreaID).value = "";
      replybtn.disabled = false;
      disablereflectionbtn(curreflectionid, 1);
    } else {
      alert("对不起，数据库执行失败，请重试！");
      replybtn.disabled = false;
      disablereflectionbtn(curreflectionid, 1);
    }
  };
  callbackobject.DoCallBack(
    "http://www.360doc.com/ajax/InsertReflectionOfReply.ashx"
  );
}
function AlterReflectReply(
  topicID,
  strSpanIDCGCG,
  CurReflecctID,
  ReplyAlterID
) {
  if (document.getElementById(ReplyAlterID) != null) {
    return false;
  }
  var test = document.getElementById("360docRefNowAlterSub");
  if (test != null) {
    var SpCg = document.getElementById("360docRefNowAlterSub").title;
    document.getElementById(SpCg).innerHTML = CurReflectionCon;
  }
  var aa = document.getElementById(strSpanIDCGCG).innerHTML;
  var bb = aa;
  $(document.getElementById(strSpanIDCGCG)).after(
    '<div class="new_huifubt f_left new_huifubt_show"><textarea id="' +
      ReplyAlterID +
      '" title="' +
      strSpanIDCGCG +
      '" name="' +
      aa +
      '"></textarea><p><a href="javascript:void(0)" onclick="AlterReplyContent(\'' +
      topicID +
      "','" +
      CurReflecctID +
      "','" +
      ReplyAlterID +
      '\')">确定</a><a href="javascript:void(0)" class="a2" onclick="CloseReplyAlterDiv(\'' +
      ReplyAlterID +
      "','" +
      bb +
      "');\">取消</a></p></div>"
  );
  $(document.getElementById(strSpanIDCGCG)).hide();
  aa = aa.replace(/<BR>/g, "\r\n");
  aa = aa.replace(/<bt>/g, "\r\n");
  aa = aa.replace(/<Br>/g, "\r\n");
  aa = aa.replace(/&gt;/g, ">");
  aa = aa.replace(/&lt;/g, "<");
  aa = aa.replace(/&nbsp;/g, " ");
  aa = aa.replace(/&amp;/g, "&");
  document.getElementById(ReplyAlterID).value = aa;
  CurReflectionCon = bb;
}
function CloseReplyAlterDiv(DivID, concur) {
  var test = document.getElementById(DivID);
  if (test != null) {
    var SpCg = document.getElementById(DivID).title;
    document.getElementById(SpCg).innerHTML = concur;
    $(document.getElementById(SpCg)).show();
    $(document.getElementById(SpCg))
      .next()
      .remove();
  }
}
function AlterReplyContent(topicID, CurReflecctID, DivID, concur) {
  var test = document.getElementById(DivID);
  var Con = test.value;
  if (Con.length > 600) {
    alert("抱歉，评论字数超过最大限制");
    return;
  }
  Con = escape(Con);
  var strPost =
    "<PostRef><CurReflecctID>" +
    CurReflecctID +
    "</CurReflecctID><strReflectArticleID>" +
    ArticleID +
    "</strReflectArticleID><Reflection>" +
    Con +
    "</Reflection></PostRef>";
  var callbackobject = new CallBackXML(strPost);
  callbackobject.onComplete = function(responseText, responseXml) {
    var result = responseText;
    var target = "@@@";
    var index = result.indexOf(target);
    result = result.substring(0, index);
    if (result == 1) {
      var test = document.getElementById(DivID);
      if (test != null) {
        var SpCg = document.getElementById(DivID).title;
        var CurContent = responseText.substring(index + 3);
        if (CurContent.lastIndexOf("<") == CurContent.length - 1) {
          CurContent += " ";
        }
        document.getElementById(SpCg).innerHTML = CurContent;
        $(document.getElementById(SpCg)).show();
        $(document.getElementById(SpCg))
          .next()
          .remove();
      }
    } else if (result == "cg-1error") {
      alert("URL不合法!");
    } else if (result == "cg-1Null") {
      alert("您修改的评论不能为空");
    } else if (result == "ad") {
      alert("请勿发送广告评论!");
      document.getElementById("SendRefBtn").disabled = false;
    } else if (result == "-1") {
      alert("服务器忙!，请稍侯重试！");
    }
  };
  callbackobject.DoCallBack(
    "http://www.360doc.com/ajax/AlterReflection20100301.ashx"
  );
}
function testreflectiontypeSub(TextAreaID, curreflectionid, replybtn, type) {
  var strReflectContent = document.getElementById(TextAreaID).value;
  var strReflectContentEncode = escape(strReflectContent);
  var strPost =
    "<PostRef><strReflectContent>" +
    strReflectContent +
    "</strReflectContent></PostRef>";
  var callbackobject = new CallBackXML(strPost);
  callbackobject.onComplete = function(responseText, responseXml) {
    var result = responseText;
    var target = "@@@";
    var index = result.indexOf(target);
    result = result.substring(0, index);
    if (result == "ad") {
      replybtn.disabled = false;
      alert("请勿发送广告评论!");
      disablereflectionbtn(curreflectionid, 1);
      return false;
    } else if (result == "-10") {
      alert("请填写评论后再发表！");
      replybtn.disabled = false;
      disablereflectionbtn(curreflectionid, 1);
      return false;
    } else {
      if (result == 1) {
        if (ArtUserID == UserID) {
          insertRefOfReply(TextAreaID, curreflectionid, replybtn, type);
        } else {
          disablereflectionbtn(curreflectionid, 1);
          ClickStatics("wztempstatistic1");
          $("#LayerLogin").html(
            '<div id="fullbg"></div><div id="dialog" style="position: fixed;width:370px;height:170px;" > <div id="dialog_content"></div><div ><div class="weixinbox" style="width: 370px; height:170px;" id="layerdiv"><div class="cengbj"><div class="cengleft">温馨提示</div><div class="rt360" style="padding-top: 11px; padding-right: 20px;"><div class="chas" style="cursor:pointer;"  onclick="RestoryReflectionsub(' +
              replybtn.id +
              ');"><a href="javascript:void(0);"></a></div></div><div class="tishi-box1" style="padding-top: 31px;"> <div class="shangtishi_pt"><span class="tishi-wz1" style="font-size:14px;">建议您通过献花表达自己的感谢！</span></div></div><div style="text-align: center; padding-left:130px; margin-top:0px;"><div class="erjibt_li" style="float: left;" onmouseover="this.className=\'erjibta_li\'" onmouseout="this.className=\'erjibt_li\'"><div class="btwz" style="color:#FFF; font-weight:bold;" id="continueflower">我要献花</div></div><div class="erjibtgray_li" style="float: left; margin-left: 5px;" onmouseover="this.className=\'erjibtgraya_li\'" onmouseout="this.className=\'erjibtgray_li\'"><div id="continuesubmit" class="btwz"  >继续发表</div></div></div></div></div></div></div>'
          );
          $("#LayerLogin").show();
          $("#continuesubmit").bind("click", function() {
            $("#continuesubmit").unbind("click");
            ClickStatics("wztempstatistic4");
            insertRefOfReply(TextAreaID, curreflectionid, replybtn, type);
            replybtn.disabled = false;
          });
          $("#continueflower").bind("click", function() {
            $("#continueflower").unbind("click");
            document.getElementById(TextAreaID).value = "";
            ContinueSendFlower();
            ClickStatics("wztempstatistic3");
            replybtn.disabled = false;
          });
          showBg("dialog", "dialog_content", "1");
        }
      } else {
        insertRefOfReply(TextAreaID, curreflectionid, replybtn, type);
      }
      artStatistics("20-4-9");
      return false;
    }
  };
  callbackobject.DoCallBack("/ajax/testreflectiontype.ashx");
}
function scrollTheWindow(replyFrameID) {
  var top = document.getElementById(replyFrameID).getBoundingClientRect().top;
  var se = document.documentElement.clientHeight;
  if (top <= se) {
  } else {
    $(document).scrollTop($(document).scrollTop() + 200);
  }
}
function ContinueReflection() {
  ClickStatics("wztempstatistic4");
  $("#continuesubmit").unbind("click");
  insertRef();
}
function ContinueSendFlower() {
  ClickStatics("wztempstatistic3");
  $("#continueflower").unbind("click");
  var Top = getTop(document.getElementById("flowimg3")) - 400;
  $("html, body").animate({ scrollTop: Top }, 0);
  document.getElementById("SendRefTB").value = "";
  document.getElementById("SendRefTB").value = "写评论...";
  document.getElementById("ImgSendPL").disabled = false;
  $("#ImgSendPL").bind("click", SubmitReflection);
  closeBg();
  Showflowerlayer("sendedLayer1");
}
function RestoryReflection() {
  ClickStatics("wztempstatistic2");
  document.getElementById("ImgSendPL").disabled = false;
  $("#ImgSendPL").bind("click", SubmitReflection);
}
function RestoryReflectionsub(replybtn) {
  closeBg();
  replybtn.disabled = false;
  ClickStatics("wztempstatistic2");
}
function loginnew() {
  ArtLoginTypeID = 13;
  LoginFormArt(70);
}
function LoginFormArt(type) {
  $.ajax({
    url:
      "http://www.360doc.com/ajax/GetLoginForm20130912.ashx?ArtID=" +
      ArticleID +
      "&type=1&ana=" +
      type,
    cache: false,
    success: function(result) {
      $("#LayerLogin").html(result);
      $("#LayerLogin").show();
      showBg("dialog", "dialog_content", "1");
      $("#layerloginbtn").click(function() {
        artStatistics("20-22-1");
      });
      $(".dlinputwz").click(function() {
        if (
          $(this)
            .children("a")
            .html() == "立即注册"
        ) {
          artStatistics("20-22-2");
        } else if (
          $(this)
            .children("a")
            .html() == "忘记密码?"
        ) {
          artStatistics("20-22-3");
        }
      });
      $(".hezuodiv")
        .children("a")
        .click(function() {
          if ($(this).hasClass("sf1")) {
            artStatistics("20-22-4");
          } else if ($(this).hasClass("sf2")) {
            artStatistics("20-22-5");
          } else if ($(this).hasClass("sf3")) {
            artStatistics("20-22-6");
          }
        });
      getJSON(
        "http://www.360doc.com/clippertool/getnoteclipperASHX.ashx?type=10&jsoncallback=?"
      );
    },
    error: onFailed
  });
}
function blurClick(object) {
  if (!object.value) {
    object.value = "手机号/昵称/邮箱";
    object.style.color = "#b2b2b2";
  }
}
function focusClick(object) {
  if (object.value == "手机号/昵称/邮箱") {
    object.value = "";
    object.style.color = "#272727";
  }
}
function tbxblurClick(object) {
  var tx = document.getElementById("spantx");
  if (!object.value) {
    tx.style.display = "";
  } else {
    tx.style.display = "none";
  }
}
function tbxfocusClick(object) {
  object.style.color = "#272727";
  var tx = document.getElementById("spantx");
  tx.style.display = "none";
}
function onLogin() {
  var evt = null;
  if (window.event) {
    evt = window.event;
  } else {
    evt = SearchEvent();
  }
  var keyCode = evt.keyCode;
  if (keyCode == 13) {
    document.getElementById("layerloginbtn").focus();
    document.getElementById("layerloginbtn").onclick();
  }
}
function SearchEvent() {
  func = SearchEvent.caller;
  while (func != null) {
    var arg0 = func.arguments[0];
    if (arg0) {
      if (typeof arg0 == "object") {
        return arg0;
      }
    }
    func = func.caller;
  }
  return func;
}
function Login() {
  var theEmail = $("#txtEmail").val();
  var thePws = $("#txtpws").val();
  if (theEmail == "" || theEmail == "手机号/昵称/邮箱") {
    $("#divMsg").html("帐号不能为空！");
    return false;
  }
  if (thePws == "" || thePws == "密码") {
    $("#divMsg").html("密码不能为空！");
    return false;
  }
  var isRemember = 0;
  if (document.getElementById("chkRememberart").checked == true) {
    isRemember = 1;
  }
  theEmail = encodeURI(theEmail);
  thePws = escape($.md5(thePws.toLowerCase()));
  $.ajax({
    url:
      "/ajax/login/login.ashx?email=" +
      theEmail +
      "&pws=" +
      thePws +
      "&isr=" +
      isRemember +
      "&art=1",
    cache: false,
    success: function(result) {
      if (result != "") {
        if (result.indexOf("artreturn") > -1) {
          if (getCookie("360doc1") != null) {
            UserID = result.substring(result.indexOf("artreturn") + 9);
            try {
              document.getElementById("loginstatus").innerHTML =
                '<a onclick="clearCookies();" href="#">退出</a>';
            } catch (err) {}
            closeBg();
            AfterLoginOperation();
          } else {
            window.open("http://www.360doc.com/nocookie.html");
          }
        } else if (result.indexOf("冻结") >= 0) {
          window.parent.location.href =
            "http://www.360doc.com/apply/apply.aspx";
        } else {
          if (
            result == "&nbsp;密码和账户名不匹配！" ||
            result == "&nbsp;错误的E-mail或密码！"
          ) {
            $("#divMsg").html("帐号或密码输入错误！");
          } else if (result.indexOf("邮箱验证") >= 0) {
            var userid = result.split("||")[1];
            $.ajax({
              url: "/ajax/NeedVerify.ashx?email=" + theEmail,
              cache: false,
              success: function(result) {
                addSheetFile(
                  "http://css.360doc.com/AlertCeng.css?t=2015112401"
                );
                reloctionVerify("needVerify");
                document.getElementById("needVerify").innerHTML = result;
                $("#userid").val(userid);
                $("#dialog").hide();
                $("#needVerify").show();
              }
            });
          } else if (result == "5") {
            location.href =
              "http://www.360doc.com/login.aspx?n=" +
              theEmail +
              "&reurl=" +
              location.href.replace("$$", "&");
          } else {
            $("#divMsg").html(result);
          }
        }
      }
    },
    error: onFailed
  });
}
function ReflectionLoginform() {
  ArtLoginTypeID = 13;
  LoginFormArt(53);
}
function toSNSLogin(type) {
  var isSNSSaveArt = "&isSNSSaveArt=0";
  if (ArtLoginTypeID == 14 || ArtLoginTypeID == 0) {
    isSNSSaveArt = "&isSNSSaveArt=1";
  }
  var CurUrl = window.location.href
    .toString()
    .replace(window.location.hash.toString(), "")
    .replace("#", "");
  if (type == "qq") {
    var A = window.open(
      "/redirect2oplogin.aspx?t=qq&reurl=" +
        CurUrl +
        "&aid=" +
        ArticleID +
        isSNSSaveArt +
        "&artreg=1",
      "TencentLogin",
      "width=700,height=500,menubar=0,scrollbars=1,   resizable=1,status=1,titlebar=0,toolbar=0,location=1"
    );
  } else if (type == "smb") {
    var A = window.open(
      "/redirect2oplogin.aspx?t=smb&reurl=" +
        CurUrl +
        "&aid=" +
        ArticleID +
        isSNSSaveArt +
        "&artreg=1",
      "TencentLogin",
      "width=1024,height=480,menubar=0,scrollbars=1,   resizable=1,status=1,titlebar=0,toolbar=0,location=1"
    );
  } else if (type == "wx") {
    var A = window.open(
      "/redirect2oplogin.aspx?t=wx&reurl=" +
        CurUrl +
        "&aid=" +
        ArticleID +
        isSNSSaveArt +
        "&artreg=1",
      "TencentLogin",
      "width=450,height=500,menubar=0,scrollbars=1,   resizable=1,status=1,titlebar=0,toolbar=0,location=1"
    );
  }
}
function AfterLoginOperation() {
  bandUserImgNew();
  switch (ArtLoginTypeID) {
    case 1:
      sendflower();
      break;
    case 2:
      zancai(ArtLoginType, ArtLoginReflectionID, ArtLoginConID);
      break;
    case 5:
      ReplyReflection(CurSubReplyTextID, 1);
      break;
    case 7:
      alert("登录成功，请继续下载文档!");
      break;
    case 10:
      isfollow(ArtUserID);
      if (ArtUserID == UserID) {
        alert("您不能关注自己！");
      } else {
        gzuser(ArtUserID);
      }
      break;
    case 11:
      isfollow(ArtUserID);
      showMsDiv();
      break;
    case 12:
      showdivemail();
      break;
    case 13:
      SubmitReflection();
      break;
    case 14:
      SaveArt();
      break;
    case 20:
      talknow();
      break;
    case 21:
      showdivemail1();
      break;
    case 0:
      showfuzhitishidiv();
      InsertLogData(6);
      break;
    default:
      break;
  }
  ArtLoginTypeID = 99;
}
var CurLayterID = "";
function Showflowerlayer(cid) {
  if ($("#flowimg3").hasClass("flower_loading")) {
    return;
  }
  $("#flowimg3").addClass("flower_loading");
  CurLayterID = cid;
  sendflower();
}
function sendflower() {
  if (UserID == 0) {
    ArtLoginTypeID = 1;
    LoginFormArt(54);
    return;
  }
  if (UserID == ArtUserID) {
    $("#flowimg3").removeClass("flower_loading");
    alert("您不能给自己献花");
    return;
  }
  getJSON(
    "http://webservice.360doc.com/GetArtInfo20130912NewV.ashx?SendFlower=" +
      ArticleID +
      "," +
      FirstArtID +
      "," +
      UserID +
      "," +
      ArtUserID +
      "&jsoncallback=?",
    function(responseText) {
      var result = responseText.html;
      $("#flowimg3").removeClass("flower_loading");
      if (result == "-2") {
        alert("您已经献过花了");
      } else if (result == "1") {
        $("#articleflowernum").html(
          parseInt($("#articleflowernum").html()) + 1
        );
        if (parseInt($("#articleflowernum").html()) > 999) {
          $(".bottombtn .sharelist_new").css("left", "352px");
        } else if (parseInt($("#articleflowernum").html()) > 99) {
          $(".bottombtn .sharelist_new").css("left", "345px");
        } else if (parseInt($("#articleflowernum").html()) > 9) {
          $(".bottombtn .sharelist_new").css("left", "336px");
        }
        document.getElementById("flowernumadd").style.display = "block";
        $("#flowernumadd").fadeOut(1500, function() {
          $("#flowernumadd")[0].style.display = "none";
        });
        artStatistics("20-5");
      }
    }
  );
}
function wzhit() {}
function wzhitnew(Type) {
  ClickStatics("wzhitnew" + Type);
}
function ClickStatics(type) {
  var refer = document.referrer.toLowerCase();
  if (
    refer == "http://www.360doc.com/index6.aspx" ||
    refer == "http://www.360doc.com" ||
    refer == "http://www.360doc.com/" ||
    refer == "http://www.360doc.com/index.html" ||
    refer == "www.360doc.com/index6.aspx" ||
    refer == "www.360doc.com" ||
    refer == "www.360doc.com/" ||
    refer == "www.360doc.com/index.html"
  ) {
    refer = "1";
  } else {
    refer = "0";
  }
  $.ajax({
    url:
      "http://www.360doc.com/ajax/clickStatics.ashx?ClickType=" +
      type +
      "&isfromhp=" +
      refer +
      "&articleid=" +
      ArticleID,
    cache: false
  });
}
function InsertLogData(InsertType) {
  if (IsInsertDataLog == "1") {
    if (CurUserNameCookies == null) {
      var CurUserNameCookies = getCookie("LoginName");
    }
    getJSON(
      "http://webservice.360doc.com/GetArtInfo20130912NewV.ashx?InsertLogData=" +
        InsertType +
        "," +
        UserID +
        "," +
        ArticleID +
        "," +
        CurUserNameCookies +
        "&jsoncallback=?",
      function(responseText) {}
    );
  } else {
  }
}
function HideFinishEditorCG() {
  var obj5 = document.getElementById("AlertDivDetail360doc1");
  if (obj5 != null) {
    obj5.style.display = "none";
    document.getElementById("AlertTextArea360doc1").value = "";
    $("#btnSendAlert1").bind("click", function() {
      AddUserAlert(1);
    });
  }
  var obj6 = document.getElementById("AlertDivDetail360doc2");
  if (obj6 != null) {
    obj6.style.display = "none";
    document.getElementById("AlertTextArea360doc2").value = "";
    $("#btnSendAlert2").bind("click", function() {
      AddUserAlert(2);
    });
  }
  closeBg();
}
function showBg(ct, content, Ctype) {
  var bH = $("body").height();
  var bW = $("body")[0].scrollWidth;
  if (_isIE) {
    var objWH = getObjWh1(ct, Ctype);
  } else {
    var objWH = getObjWh(ct, Ctype);
  }
  $("#fullbg").css({ width: bW, height: bH, display: "block" });
  var tbT = objWH.split("|")[0] + "px";
  var tbL = objWH.split("|")[1] + "px";
  GloarlTop = tbT;
  GloarlLeft = tbL;
  $("#" + ct).css({ top: tbT, left: tbL, display: "block" });
  if (_isIE) {
    if (Ctype != "4") {
      if (!window.XMLHttpRequest) {
        $(window).scroll(function() {
          resetBg();
        });
        $("#dialog").css({ position: "absolute" });
      }
    }
  }
  $(window).resize(function() {
    resetBg(Ctype);
  });
}
function getObjWh(obj, Ctype) {
  var st = "";
  var ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf("firefox") != -1 || ua.indexOf("trident/7.0")) {
    st = document.documentElement.scrollTop + document.body.scrollTop;
  } else {
    st = document.body.scrollTop;
  }
  var sl = document.documentElement.scrollLeft;
  var ch = document.documentElement.clientHeight;
  var cw = document.documentElement.clientWidth;
  var objH = $("#" + obj).height();
  var objW = $("#" + obj).width();
  var objT = "";
  if (Ctype == "4" || Ctype == "2" || Ctype == "3") {
    objT = Number(st) + (Number(ch) - Number(objH)) / 2;
  } else {
    if (!window.XMLHttpRequest) {
      objT = Number(st) + (Number(ch) - Number(objH)) / 2;
    } else {
      if (
        obj == "SendToFriends1" ||
        obj == "SendToFriends2" ||
        obj == "AlertArt1" ||
        obj == "AlertArt2"
      ) {
        objT = Number(st) + (Number(ch) - Number(objH)) / 2;
      } else {
        objT = (Number(ch) - Number(objH)) / 2;
      }
    }
  }
  var objL = Number(sl) + (Number(cw) - Number(objW)) / 2;
  if (Ctype == "2") {
    objL = objL - 100;
  }
  if (Ctype == "4") {
    objT = objT - 100;
  }
  return objT + "|" + objL;
}
function getObjWh1(obj, Ctype) {
  var st = document.documentElement.scrollTop + document.body.scrollTop;
  var sl = document.documentElement.scrollLeft;
  var ch = document.documentElement.clientHeight;
  var cw = document.documentElement.clientWidth;
  var objH = $("#" + obj).height();
  var objW = $("#" + obj).width();
  var objT = "";
  if (Ctype == "4" || Ctype == "2" || Ctype == "3") {
    objT = Number(st) + (Number(ch) - Number(objH)) / 2;
  } else {
    if (!window.XMLHttpRequest) {
      objT = Number(st) + (Number(ch) - Number(objH)) / 2;
    } else {
      if (
        obj == "SendToFriends1" ||
        obj == "SendToFriends2" ||
        obj == "AlertArt1" ||
        obj == "AlertArt2"
      ) {
        objT = Number(st) + (Number(ch) - Number(objH)) / 2;
      } else {
        objT = (Number(ch) - Number(objH)) / 2;
      }
    }
  }
  var objL = Number(sl) + (Number(cw) - Number(objW)) / 2;
  if (Ctype == "2") {
    objL = objL - 100;
  }
  if (Ctype == "3") {
    objL = objL - 100;
  }
  if (Ctype == "4") {
    objT = objT - 80;
  }
  return objT + "|" + objL;
}
function resetBg(Ctype) {
  var fullbg = $("#fullbg").css("display");
  if (fullbg == "block") {
    var bH2 = $("body").height();
    var bW2 = $("body").width();
    $("#fullbg").css({ width: bW2, height: bH2 });
    var objV = getObjWh("dialog", Ctype);
    var tbT = objV.split("|")[0] + "px";
    var tbL = objV.split("|")[1] + "px";
    $("#dialog").css({ top: tbT, left: tbL });
  }
}
function closeBg() {
  $("#txtEmail").val("邮箱");
  $("#txtEmail").css({ color: "#b2b2b2" });
  $("#txtpws").val("Password");
  $("#txtpws").css({ color: "#b2b2b2" });
  $("#divMsg").html("");
  $("#LayerLogin").hide();
  $("#flowimg3").removeClass("flower_loading");
}
function showad() {
  var strow = document.body.offsetWidth;
  var strsw = document.body.scrollWidth;
  var stroh = document.documentElement.clientHeight;
  if (getCookie("360docad2") == null) {
    $("#divad4").show();
  } else {
    $("#divad4").hide();
  }
  if (getCookie("360docad3") == null) {
    $("#divad6").show();
  } else {
    $("#divad6").hide();
  }
  $("#divifartad1").html(
    '<iframe id="ifartad1" height="250" width="250" frameborder="0" scrolling="no" sandbox="allow-forms allow-scripts allow-same-origin allow-popups"></iframe>'
  );
  if (widthType == "0") {
    $("#ifartad1").attr(
      "src",
      "http://www.360doc.com/ad/artadali1.html?t=2018091901"
    );
  } else {
    $("#ifartad1").attr("width", "300px");
    $("#ifartad1").attr(
      "src",
      "http://www.360doc.com/ad/artadali1_300.html?t=2018091901"
    );
  }
  $("#divifartad2").html(
    '<iframe id="ifartad2" height="250" width="250" frameborder="0" scrolling="no" sandbox="allow-forms allow-scripts allow-same-origin allow-popups"></iframe>'
  );
  if (widthType == "0") {
    $("#ifartad2").attr(
      "src",
      "http://www.360doc.com/ad/artadali2.html?t=2018091901"
    );
  } else {
    $("#ifartad2").attr("width", "300px");
    $("#ifartad2").attr(
      "src",
      "http://www.360doc.com/ad/ad2_300.html?t=2018091901"
    );
  }
}
function showad2() {
  $("#divifartad").html(
    '<iframe id="ifartad" height="250px" width="250px" frameborder="0" scrolling="no"></iframe>'
  );
  $("#adfloatbaidu").html(
    '<iframe id="ifartadfloadbaidu" height="250px" width="250px" frameborder="0" scrolling="no"></iframe>'
  );
  if (widthType == "0") {
    $("#divad4").css({ width: "250px", margin: "0 auto" });
    $("#ifartadfloadbaidu").attr(
      "src",
      "http://www.360doc.com/ad/ad5.html?t=2018011101"
    );
    $("#ifartad").attr(
      "src",
      "http://www.360doc.com/ad/artadali.html?t=2018011101"
    );
  } else if (widthType == "1") {
    $("#ifartad").attr("width", "300px");
    $("#ifartadfloadbaidu").css({ width: "250px", margin: "0 auto" });
    $("#ifartadfloadbaidu").attr(
      "src",
      "http://www.360doc.com/ad/ad5.html?t=2018011101"
    );
    $("#ifartad").attr(
      "src",
      "http://www.360doc.com/ad/ad4_300.html?t=2018011101"
    );
  }
}
function showad3() {
  $("#divifartrightsogou").html(
    '<iframe id="ifartrightsogou" height="190" width="250" frameborder="0" scrolling="no"></iframe>'
  );
  $("#ifartrightsogou").attr("width", "300px");
  $("#ifartrightsogou").attr(
    "src",
    "http://www.360doc.com/ad/artrightadsogou300.html?t=2017022201"
  );
}
function showad4() {
  $("#divyoulikead").html(
    '<iframe id="youlikead" style="width: 676px; height: 280px; border: 0;" frameborder="0" scrolling="no"></iframe>'
  );
  $("#youlikead").attr(
    "src",
    "http://www.360doc.com/ad/adbaiduyoulike.html?t=2017022201"
  );
  $("#underZcommondAd").attr(
    "src",
    "http://www.360doc.com/ad/underad.html?t=2017022201"
  );
}
$(window).bind("scroll", scrollfun);
$(window).resize(function() {
  $("#divad5").css("position", "");
  scrollfun();
});
var strarticlecontent = $("#articlecontent").width();
var divad5Top = $("#divad5").offset().top;
function scrollfun() {
  var divad5left = $("#divad5").offset().left;
  if ($(document).scrollTop() > divad5Top + 365) {
    if (!window.XMLHttpRequest) {
      $("#divad5").css({ position: "absolute" });
      $("#divad5").css("top", $(document).scrollTop() - 170 + "px");
      $("#divad5").css("left", "0");
    } else {
      if ($(document).scrollLeft() > 0) {
        $("#divad5").css({
          position: "fixed",
          top: "80px",
          left: divad5left - $(document).scrollLeft() + "px"
        });
      } else {
        $("#divad5").css({
          position: "fixed",
          top: "80px",
          left: divad5left + "px"
        });
      }
    }
  } else {
    $("#divad5").css({ position: "" });
  }
}
function closead(type) {
  if (type == 2) {
    setCookie("360docad2", "1", "1");
    $("#divad4").hide();
  } else if (type == 3) {
    setCookie("360docad3", "1", "1");
    $("#divad6").hide();
  }
}
function copyArt() {
  var CurUserNameCookiescgcg = getCookie("360doc1");
  if (CurUserNameCookiescgcg == "" || CurUserNameCookiescgcg == null) {
    var docarttitle = document.getElementById("docarttitle");
    var docencodetitle = "";
    if (docarttitle == null) {
      docencodetitle = "";
    } else {
      docencodetitle = "&titleencode=" + docarttitle.value;
    }
    $("#LayerLogin").load("/artlogin.html");
    $("#LayerLogin").show();
    ArtLoginTypeID = 0;
    artStatistics("20-21-1");
    return false;
  } else {
    var selhtml = "";
    var selection;
    if (window.getSelection) {
      selection = window.getSelection();
      if (selection != null) {
        selhtml = selection.toString();
      }
    } else if (document.selection) {
      selection = document.selection.createRange();
      if (selection != null) {
        selhtml = selection.text;
      }
    }
    if (selhtml.length > 200) {
      document.getElementById("fuzhitishidiv").style.display = "none";
      if (getCookie("360doc1") != null && UserID != 0) {
        $.ajax({
          url:
            "http://www.360doc.com/ajax/GetLoginForm20130912.ashx?ArtID=" +
            ArticleID +
            "&type=5&arttype=" +
            CurArtType +
            "",
          cache: false,
          success: function(result) {
            if (result == "-1") {
              return true;
            } else {
              showfuzhitishidiv();
              return false;
            }
          },
          error: onFailed
        });
      } else {
        showfuzhitishidiv();
        return false;
      }
    } else {
      return true;
    }
  }
}
function showfuzhitishidiv() {
  if (document.getElementById("fuzhitishidiv") != null) {
    document.getElementById("fuzhitishidiv").innerHTML =
      '<div><img src="http://pubimage.360doc.com/wz/tuanceng.gif" usemap="#Map2" /><map name="Map2" id="Map2"><area shape="rect" coords="288,23,307,42" href="javascript:void(0);" onclick="document.getElementById(\'fuzhitishidiv\').innerHTML=\'\';document.getElementById(\'fuzhitishidiv\').style.display=\'none\';" /></map></div>';
    window.scroll(0, 0);
    document.getElementById("fuzhitishidiv").style.display = "";
  } else {
    alert(
      "提示：点击标题下方的“转藏到我的图书馆”，将文章保存到您的个人图书馆中，然后可以拷贝文章的内容！"
    );
  }
}
function showregisterwin() {
  $("#divtuijianpy").html(
    '<iframe id="ifmresaveart" marginwidth="0" marginheight="0" frameborder="0" scrolling="no" width="690" height="373" src="http://www.360doc.com/registerfromarticle.aspx?aid=' +
      ArticleID +
      "&arttype=" +
      CurArtType +
      '"></iframe>'
  );
}
function shareWeixin() {
  if (_isIE) {
    $("#LayerLogin").html(
      '<div id="fullbg"></div><div id="dialog" style="position: fixed;"> <div id="dialog_content"></div><div class="weixinbox"><div class="chacha"><div class="chaa rt360"><a href="javascript:void(0);" onclick="closeBg();"></a></div></div><div class="weixinwz">打开微信“扫一扫”，网页打开后点击屏幕右上角分享按钮</div><div id="divweixin" style=" padding-top:26px; text-align:center;margin: 0px auto; width: 190px;"><iframe id=\'ifrtest\' marginwidth=\'0\' marginheight=\'0\' frameborder=\'0\' scrolling=\'no\'  allowTransparency=true src=\'\'  height="200px" width="200px"></iframe></div></div></div>'
    );
    $("#LayerLogin").show();
    document.getElementById("ifrtest").src =
      "http://www.360doc.com/artweixin.html?artid=" +
      $("#firstartid").val() +
      "&t=20140012401";
  } else {
    $("#LayerLogin").html(
      '<div id="fullbg"></div><div id="dialog" style="position: fixed;"> <div id="dialog_content"></div><div class="weixinbox"><div class="chacha"><div class="chaa rt360"><a href="javascript:void(0);" onclick="closeBg();"></a></div></div><div class="weixinwz">打开微信“扫一扫”，网页打开后点击屏幕右上角分享按钮</div><div id="divweixin" style=" padding-top:26px; text-align:center;margin: 0px auto; width: 190px;"><iframe marginwidth=\'0\' marginheight=\'0\' frameborder=\'0\' scrolling=\'no\'  allowTransparency=true src=\'http://www.360doc.com/artweixin.html?artid=' +
        $("#firstartid").val() +
        '&t=20140012401\'  height="200px" width="200px"></iframe></div></div></div>'
    );
    $("#LayerLogin").show();
  }
  showBg("dialog", "dialog_content", "1");
}
function DownloadFile(type, offscore) {
  if (type == 0) {
    alert("对不起，上传人不允许下载该文档！");
    return;
  }
  if (UserID == -100 || UserID == 0) {
    ArtLoginTypeID = 7;
    LoginFormArt(60);
    return;
  }
  if ((ArticleID == FirstArtID && ownerid == UserID) || offscore == "0") {
    BeginDownload(FirstArtID);
  } else {
    var callbackobject = new CallBackXML("");
    callbackobject.DoCallBack(
      "http://www.360doc.com/ajax/getdownloadinfo.ashx?articleid=" + FirstArtID
    );
    callbackobject.onComplete = function(responseText, responseXml) {
      var result = responseText;
      if (result == "-1") {
        ArtLoginTypeID = 7;
        LoginFormArt(61);
        return;
      } else if (result == "2") {
        alert("您已经下载过此文档，本次下载不会耗费贡献值。");
        BeginDownload(FirstArtID);
      } else if (result == "1") {
        if (
          confirm("下载当前文档需要付出" + offscore + "贡献值，确定要下载吗？")
        )
          BeginDownload(FirstArtID);
      }
    };
  }
}
function BeginDownload(strArticleID) {
  var callbackobject = new CallBackXML("");
  callbackobject.DoCallBack(
    "http://www.360doc.com/ajax/getdownloaddocument.ashx?articleid=" +
      strArticleID
  );
  callbackobject.onComplete = function(responseText, responseXml) {
    if (responseText == "-1")
      alert("对不起，您的奉献值数额不够，无法支付下载所需的奉献值！");
    else window.location = "http://" + responseText;
  };
}
function HotKey() {
  var evt = null;
  if (window.event) {
    evt = window.event;
  } else {
    evt = SearchEvent();
  }
  var isShowIS = false;
  var keyCode = evt.keyCode;
  switch (keyCode) {
    case 38:
      if (selItemNum - 1 >= 0) {
        changeSelColor("div" + (selItemNum - 1), selItemNum - 1);
      } else {
        changeSelColor("div" + 2, 2);
      }
      break;
    case 40:
      if (selItemNum != -1) {
        if (selItemNum + 1 > 2) {
          changeSelColor("div" + 0, 0);
        } else {
          changeSelColor("div" + (selItemNum + 1), selItemNum + 1);
        }
      } else {
        changeSelColor("div" + 1, 1);
      }
      break;
    case 13:
      gosearch();
      $("#divsearch").hide();
      break;
    case 27:
      $("#divsearch").hide();
      selTSNID = "div0";
      selItemNum = 0;
      break;
    default:
      isShowIS = true;
      break;
  }
  return isShowIS;
}
function SearchEvent() {
  func = SearchEvent.caller;
  while (func != null) {
    var arg0 = func.arguments[0];
    if (arg0) {
      if (typeof arg0 == "object") {
        return arg0;
      }
    }
    func = func.caller;
  }
  return func;
}
function showIntelliSense() {
  if (HotKey()) {
    setTimeout(showsearchhtml, 1000);
  }
}
function showIntelliSense1() {
  setTimeout(showsearchhtml, 1000);
}
function showsearchhtml() {
  var QueryText = document
    .getElementById("txtSearchword")
    .value.replace(/(^[\s]*)|([\s]*$)/g, "");
  QueryText = htmlEncode(QueryText);
  if (QueryText == "") {
    $("#divsearch").hide();
    return;
  }
  $("#divsearch").html(
    '<div class="serchboxx"><div style="height: 22px; line-height: 22px;"><div class="left">&nbsp;<font color="#245fa5">请选择搜索范围</font></div><div class="paixucssright"><img src="http://pubimage.360doc.com/read/jiantou2.gif" width="9" height="5" /></div></div><div id="div0" onmouseover="changeSelColor(\'div0\',0)" class="bjyellow2" onclick="gosearch(0);">含&nbsp;<font color="#c20201">' +
      QueryText +
      '</font>&nbsp;的文章</div><div id="div1" onmouseover="changeSelColor(\'div1\',1)" class="bjwhite2" onclick="gosearch(1);">昵称为&nbsp;<font color="#c20201">' +
      QueryText +
      '</font>&nbsp;的馆友</div><div id="div2" onmouseover="changeSelColor(\'div2\',2)" class="bjwhite2" onclick="gosearch(2);">兴趣为&nbsp;<font color="#c20201">' +
      QueryText +
      "</font>&nbsp;的馆友</div></div>"
  );
  $("#divsearch").show();
}
function changeSelColor(TsnID, ItemNum) {
  if (selTSNID != "") {
    if (document.getElementById(selTSNID) != null) {
      document.getElementById(selTSNID).style.backgroundColor = "#fffff7";
    }
  }
  if (document.getElementById(TsnID) != null) {
    document.getElementById(TsnID).style.backgroundColor = "#fef9d1";
    if (TsnID == "div0") {
      searchType = "0";
    }
    if (TsnID == "div1") {
      searchType = "1";
    }
    if (TsnID == "div2") {
      searchType = "2";
    }
  }
  selTSNID = TsnID;
  selItemNum = ItemNum;
}
function gosearch(strtype) {
  var strSearchWord = document.getElementById("txtSearchword").value;
  strSearchWord = strSearchWord.replace(/<script(.|\n)+<\/script>/gi, "");
  if (strSearchWord == "  搜文章 找馆友") {
    strSearchWord = "";
  }
  if (strSearchWord.trim() != "") {
    if (strtype == null) {
      strtype = searchType;
    }
    if (strtype == 1) {
      window.open(
        "http://www.360doc.com/search.html?type=1&word=" +
          escape(strSearchWord) +
          ""
      );
    } else if (strtype == 2) {
      window.open(
        "http://www.360doc.com/search.html?type=2&word=" +
          escape(strSearchWord) +
          ""
      );
    } else {
      window.open(
        "http://www.360doc.com/search.html?type=0&word=" +
          escape(strSearchWord) +
          ""
      );
    }
  }
}
String.prototype.trim = function() {
  var reExtraSpace = /^\s*(.*?)\s+$/;
  return this.replace(reExtraSpace, "$1");
};
var CbTable = new Hashtable();
function getJSON(url, data, cb) {
  var jsc = now();
  if (IsFunc(data)) {
    cb = data;
    data = null;
  }
  var cbName = "jsonp" + jsc;
  var src = url.replace("jsoncallback=?", "jsoncallback=" + cbName);
  var IsSrcHaveParams = src.indexOf("?") > 0 || src.indexOf("&") > 0;
  for (var key in data) {
    src += "&" + key + "=" + encodeURIComponent(data[key]);
  }
  var script = document.createElement("script");
  script.setAttribute("language", "Javascript");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", src);
  script.setAttribute("id", cbName);
  getHead().appendChild(script);
  if (cb != null) {
    CbTable.add(cbName, cb);
  }
}
function OnJSONPResp(obj, cbName) {
  var scItem = document.getElementById(cbName);
  var cbFunc = CbTable.getItem(cbName);
  if (cbFunc != null) {
    cbFunc(obj);
    CbTable.remove(cbName);
  }
  if (scItem) {
    getHead().removeChild(scItem);
  }
}
function now() {
  return +new Date();
}
function IsFunc(data) {
  return (typeof data).toString() == "function";
}
function getHead() {
  return document.documentElement.getElementsByTagName("HEAD")[0];
}
function Hashtable() {
  this._hash = {};
  this._count = 0;
  this.add = function(key, value) {
    if (this._hash.hasOwnProperty(key)) return false;
    else {
      this._hash[key] = value;
      this._count++;
      return true;
    }
  };
  this.remove = function(key) {
    delete this._hash[key];
    this._count--;
  };
  this.count = function() {
    return this._count;
  };
  this.items = function(key) {
    if (this.contains(key)) return this._hash[key];
  };
  this.contains = function(key) {
    return this._hash.hasOwnProperty(key);
  };
  this.clear = function() {
    this._hash = {};
    this._count = 0;
  };
  this.getItem = function(key) {
    if (this.contains(key)) {
      return this._hash[key];
    } else {
      return null;
    }
  };
}
function CallBackXML(requestxml) {
  this.requestxml = requestxml;
  this.xmlHttp = this.CreateXMLHttpRequest();
}
CallBackXML.prototype.CreateXMLHttpRequest = function() {
  var xmlHttp;
  if (window.ActiveXObject) {
    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
  } else if (window.XMLHttpRequest) {
    xmlHttp = new XMLHttpRequest();
  }
  return xmlHttp;
};
CallBackXML.prototype.onComplete = function(responseText, responseXml) {};
CallBackXML.prototype.onLoading = function() {};
CallBackXML.prototype.onStatechange = function() {
  if (this.xmlHttp) {
    if (this.xmlHttp.readyState != 4) {
      this.onLoading();
    } else if (this.xmlHttp.status == 200) {
      this.onComplete(this.xmlHttp.responseText, this.xmlHttp.responseXML);
    }
  }
};
CallBackXML.prototype.DoCallBack = function(url) {
  if (this.xmlHttp) {
    var othis = this;
    try {
      this.xmlHttp.open("POST", url, true);
    } catch (e) {
      alert("Error! URL: " + url + "\nError message: " + e);
    }
    this.xmlHttp.onreadystatechange = function() {
      othis.onStatechange();
    };
    if (this.requestxml != null) {
      this.xmlHttp.setRequestHeader("Content-Type", "text/xml");
    }
    this.xmlHttp.send(this.requestxml);
  }
};
function setContentWidth() {
  var spacing = window.screen.width > 1024 ? 30 : 1;
  var z_setWidth =
    $(".article_container")[0].scrollWidth > 656
      ? $(".article_container")[0].scrollWidth
      : 656;
  $(".a_left").width(z_setWidth + 26);
  $("#bgchange").width(z_setWidth);
  $(".doc360article_content").width(z_setWidth + 26 + 300 + spacing);
  $("#artContent").removeAttr("width");
  if ($(".doc360article_content").width() > 1040) {
    $(".a_topbanner").css("left", "0");
  }
  $("#divreward").width(z_setWidth);
}
function startWithFunction(str, strRef) {
  var reg = new RegExp("^" + strRef);
  return reg.test(str);
}
function getQueryString(queryStringName) {
  var returnValue = "";
  var URLString = new String(document.location);
  var temp = URLString.toString().indexOf("#");
  if (temp >= 0) {
    URLString = URLString.substring(0, temp);
  }
  var serachLocation = -1;
  var queryStringLength = queryStringName.length;
  do {
    serachLocation = URLString.indexOf(queryStringName + "=");
    if (serachLocation != -1) {
      if (
        URLString.charAt(serachLocation - 1) == "?" ||
        URLString.charAt(serachLocation - 1) == "&"
      ) {
        URLString = URLString.substr(serachLocation);
        break;
      }
      URLString = URLString.substr(serachLocation + queryStringLength + 1);
    }
  } while (serachLocation != -1);
  if (serachLocation != -1) {
    var seperatorLocation = URLString.indexOf("&");
    if (seperatorLocation == -1) {
      returnValue = URLString.substr(queryStringLength + 1);
    } else {
      returnValue = URLString.substring(
        queryStringLength + 1,
        seperatorLocation
      );
    }
  }
  return returnValue;
}
function cutstr(str, len) {
  var temp;
  var icount = 0;
  var patrn = /[^\x00-\xff]/;
  var strre = "";
  for (var i = 0; i < str.length; i++) {
    if (icount < len - 1) {
      temp = str.substr(i, 1);
      if (patrn.exec(temp) == null) {
        icount = icount + 1;
      } else {
        icount = icount + 2;
      }
      strre += temp;
    } else {
      break;
    }
  }
  if (strre == str) {
    return str;
  }
  return strre + "...";
}
function getCookie(name) {
  var re = null;
  var curCookie = document.cookie + ";";
  var varName = name + "=";
  var startOfCookie = curCookie.indexOf(varName);
  var endOfCookie;
  if (startOfCookie != -1) {
    startOfCookie += varName.length;
    endOfCookie = curCookie.indexOf(";", startOfCookie);
    re = unescape(curCookie.substring(startOfCookie, endOfCookie));
  }
  return re;
}
function setCookie(name, value, Hours) {
  var d = new Date();
  var offset = 8;
  var utc = d.getTime() + d.getTimezoneOffset() * 60000;
  var nd = utc + 3600000 * offset;
  var exp = new Date(nd);
  exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
  document.cookie =
    name +
    "=" +
    escape(value) +
    ";path=/;expires=" +
    exp.toGMTString() +
    ";domain=360doc.com;";
}
function setoldCookie(name, value, Hours) {
  var d = new Date();
  var offset = 8;
  var utc = d.getTime() + d.getTimezoneOffset() * 60000;
  var nd = utc + 3600000 * offset;
  var exp = new Date(nd);
  exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
  document.cookie =
    name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString() + ";";
}
function onFailed() {
  alert("操作失败！");
}
function isEmail(value) {
  var patrn = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  if (!patrn.exec(value)) {
    return false;
  } else {
    return true;
  }
}
function isNickname(value) {
  var patrn = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
  if (!patrn.exec(value)) {
    return false;
  } else {
    return true;
  }
}
function addSheetFile(path) {
  var fileref = document.createElement("link");
  fileref.rel = "stylesheet";
  fileref.type = "text/css";
  fileref.href = path;
  var headobj = document.getElementsByTagName("head")[0];
  headobj.appendChild(fileref);
}
function sendEmail() {
  $("#sendmail").attr("onclick", "function(){void(0);}");
  $.ajax({
    url: "/ajax/verifyemail.ashx?userid=" + $("#userid").val(),
    cache: false,
    success: function(result) {
      if (result == "1") {
        $("#firstceng").hide();
        $("#sencondceng").show();
      } else {
        alert("邮件发送失败，请稍后重试！");
      }
    }
  });
}
function reloctionVerify(alertid) {
  var w = document.documentElement.clientWidth;
  var h = document.documentElement.clientHeight;
  w = Math.ceil((parseInt(w) - 428) / 2);
  h = Math.ceil((parseInt(h) - 303) / 2);
  w = w < 0 ? 0 : w;
  h = h < 0 ? 0 : h;
  document.getElementById(alertid).style.left = w + "px";
  document.getElementById(alertid).style.top = h + "px";
}
function closeAlert() {
  $("#needVerify").hide();
  $("#fullbg").hide();
  document.getElementById("needVerify").innerHTML = "";
}
function clearCookies() {
  var datecg = new Date();
  setCookie("360doc1", "", datecg);
  setCookie("360doc2", "", datecg);
  setCookie("UserRole", "", datecg);
  setCookie("myindex", "", datecg);
  window.location.href = "http://www.360doc.com/index.html";
}
function changeshu(pro_name, i) {
  var pro = document.getElementById(pro_name);
  var pro_arr = pro.getElementsByTagName("span");
  for (var m = 0; m < pro_arr.length; m++) {
    pro_arr[m].className = "unclecked";
    if (document.getElementById(pro_name + "_ul_" + m) != null) {
      document.getElementById(pro_name + "_ul_" + m).style.display = "none";
    }
  }
  pro_arr[0].style.background =
    "url(http://pubimage.360doc.com/bookEditor/shu/wdtsbj_4.gif) no-repeat";
  if (i == 0) {
    pro_arr[0].style.background =
      "url(http://pubimage.360doc.com/bookEditor/shu/wdtsbj_2.gif) no-repeat";
  }
  pro_arr[i].className = "checkedMsg1";
  if (document.getElementById(pro_name + "_ul_" + i) != null) {
    document.getElementById(pro_name + "_ul_" + i).style.display = "block";
  }
}
var imgListArr = new Array();
var currImgIndex = 0;
var currImg;
function initArticle() {
  var content = document.getElementById("photoContentConvert");
  if (content == null) return;
  var mydiv = document.createElement("div");
  mydiv.innerHTML = content.value;
  var html = "";
  var bodyElement;
  var divList = mydiv.getElementsByTagName("div");
  var tempPrevDiv = null;
  for (var i = 0; i < divList.length; i++) {
    if (divList[i].id == "photoBody") {
      bodyElement = divList[i];
    }
    if (divList[i].id == "tempPrev") {
      tempPrevDiv = divList[i];
    }
  }
  for (var i = 0; i < bodyElement.childNodes.length; i++) {
    if (bodyElement.childNodes[i].nodeType == 1) {
      var imgDiv = bodyElement.childNodes[i].getElementsByTagName("div");
      var img = imgDiv[0].getElementsByTagName("img")[0].src;
      var text = imgDiv[1].innerHTML;
      imgListArr.push(new PhotoObject(img, text));
    }
  }
  document.getElementById("totalImgCount").innerHTML = imgListArr.length;
  if (tempPrevDiv != null) {
    tempPrevDiv.innerHTML = document.getElementById("contentPrev").innerHTML;
    document.getElementById("contentPrev").innerHTML = mydiv.innerHTML;
  }
}
function PhotoObject(img, text) {
  this.src = img;
  this.text = text;
}
function getCurrImg() {
  document.getElementById("photoTextBody").innerHTML =
    imgListArr[currImgIndex].text;
  return imgListArr[currImgIndex].src;
}
function prev() {
  if (currImgIndex == 0) {
    alert("已经是第一张");
    return;
  } else {
    currImgIndex--;
    document.getElementById("currImg").src = getCurrImg();
    document.getElementById("currImgNum").innerHTML = currImgIndex + 1;
  }
}
function next() {
  if (currImgIndex == imgListArr.length - 1) {
    alert("已经是最后一张");
    return;
  } else {
    currImgIndex++;
    document.getElementById("currImg").src = getCurrImg();
    document.getElementById("currImgNum").innerHTML = currImgIndex + 1;
  }
}
function getTop(e) {
  var offset = e.offsetTop;
  if (e.offsetParent != null) offset += getTop(e.offsetParent);
  return offset;
}
function getStrCount(strings) {
  var iCount = 0;
  var strs = [];
  strs = strings.split("");
  for (var i = 0; i < strs.length; i++) {
    if (isChinese(strs[i])) {
      iCount = iCount + 2;
    } else {
      iCount = iCount + 1;
    }
  }
  return iCount;
}
function isChinese(str) {
  if (/^[\u4e00-\u9fa5]+$/.test(str)) {
    return true;
  } else {
    return false;
  }
}
function cutstr1(str, lenght) {
  var MaxLen = lenght * 2 - 1;
  var strs = [];
  strs = str.split("");
  var reStr = "";
  if (getStrCount(str) > MaxLen + 1) {
    for (var i = 0; i < strs.length; i++) {
      var count = 0;
      if (isChinese(strs[i])) {
        count = 2;
      } else {
        count = 1;
      }
      if (MaxLen >= 2) {
        reStr += strs[i];
      } else if (MaxLen == 1) {
        if (!isChinese(strs[i])) {
          reStr += strs[i];
        }
      }
      MaxLen -= count;
    }
    reStr = reStr + "...";
  } else {
    reStr = str;
  }
  return reStr;
}
function getArtUrl(strArtID, strArtSaverID, strArtSaveDate, strArtType) {
  var strYear = "";
  var strMonth = "";
  var strHours = "";
  var strArtUrl = "";
  var strArtSaveDateTemp = [];
  var strArtUrlType = "content";
  try {
    if (
      strArtType == "51" ||
      strArtType == "52" ||
      strArtType == "53" ||
      strArtType == "54" ||
      strArtType == "55" ||
      strArtType == "56"
    ) {
      strArtUrlType = "document";
    }
    strArtSaveDateTemp = strArtSaveDate.split(" ")[0].split("-");
    strYear = strArtSaveDateTemp[0].substring(2, 4);
    strMonth = strArtSaveDateTemp[1] + strArtSaveDateTemp[2];
    strHours = strArtSaveDate.split(" ")[1].split(":")[0];
    strArtUrl =
      "http://www.360doc.com/" +
      strArtUrlType +
      "/" +
      strYear +
      "/" +
      strMonth +
      "/" +
      strHours +
      "/" +
      strArtSaverID +
      "_" +
      strArtID +
      ".shtml";
  } catch (Exception) {
    strArtUrl = "http://www.360doc.com/content/0/0/0/0_" + strArtID + ".shtml";
  }
  return strArtUrl;
}
function callbackwebartrecommend(callbackResult) {
  var recommendArts = callbackResult;
  if (recommendArts["status"] == "1" && recommendArts["iResNum"] >= 9) {
    var recommendArtsHtml = "";
    var artTitle = "";
    var artUrl = "";
    for (var i = 0; i < 9; i++) {
      artTitle = recommendArts["data"][i]["strArticleTitle"]
        .replace(/\"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/ /g, "&nbsp;");
      artUrl = getArtUrl(
        recommendArts["data"][i]["ArticleID"],
        recommendArts["data"][i]["strSaverUserID"],
        recommendArts["data"][i]["savedate"],
        recommendArts["data"][i]["ArtType"]
      );
      artTitle = artTitle.replace(/&nbsp;/g, " ");
      recommendArtsHtml +=
        "<div><span></span><a href='" +
        artUrl +
        '\' target="_blank" onclick="artStatistics(\'20-9-1\');">' +
        artTitle +
        "</a></div>";
    }
    $("#recommendArtLists").html(recommendArtsHtml);
  } else {
    $("#recommendArt").hide();
  }
  deleteJSONP("callbackwebartrecommend");
}
function createJSONP(jsonpSrc, jsonpID) {
  var eleScript = document.createElement("script");
  eleScript.type = "text/javascript";
  eleScript.id = jsonpID;
  eleScript.src = jsonpSrc;
  document.getElementsByTagName("HEAD")[0].appendChild(eleScript);
}
function deleteJSONP(jsonpID) {
  document
    .getElementsByTagName("HEAD")[0]
    .removeChild(document.getElementById(jsonpID));
}
function htmlEncode(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/\"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/ /g, "&nbsp;");
}
function htmlDecode(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}
function artStatistics(code) {
  imgLog(2, "code=" + code + "&artid=" + $("#artid").val());
}
function creatMask(opt) {
  this.z = opt["zindex"];
  this.target = $(opt.target);
  this.no6 = window.XMLHttpRequest;
  this.w = $(window);
  this.d = $(document);
  this.res = null;
  this.opend = false;
  this.maskDiv = $("<div>");
}
creatMask.prototype = {
  open: function() {
    if (this.opend) {
      return;
    }
    var d = this.maskDiv,
      that = this;
    d.remove();
    this.target.css({
      display: "block",
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      marginBottom: 0,
      position: this.no6 ? "fixed" : "absolute",
      right: "auto",
      bottom: "auto",
      zIndex: this.z + 1
    });
    d.css({
      background: "#000",
      position: this.no6 ? "fixed" : "absolute",
      opacity: 0.5,
      margin: 0,
      padding: 0,
      left: 0,
      top: 0,
      zIndex: this.z
    });
    $("body").append(d);
    this.res = function() {
      that.resize();
    };
    this.w.bind("resize", this.res);
    !this.no6 && this.w.bind("scroll", this.res);
    this.resize();
    this.opend = true;
  },
  resize: function() {
    var W = this.w.width(),
      H = this.w.height(),
      d = this.maskDiv,
      st = this.d.scrollTop(),
      sl = this.d.scrollLeft(),
      t = this.target;
    if (t.is(":hidden")) {
      this.close();
      return;
    }
    d.css({
      width: W,
      height: H,
      top: this.no6 ? 0 : st,
      left: this.no6 ? 0 : sl
    });
    var ttop =
      (H - t.outerHeight(true)) / 2 + (this.no6 ? 0 : this.d.scrollTop());
    t.css({
      marginLeft: this.no6 ? -t.width() / 2 : 0,
      left: this.no6
        ? "50%"
        : (W - t.outerWidth(true)) / 2 + this.d.scrollLeft(),
      top: ttop > 0 ? ttop : 0
    });
  },
  close: function(callback) {
    this.w.unbind("resize", this.res);
    !this.no6 && this.w.unbind("scroll", this.res);
    this.maskDiv.remove();
    this.target.hide();
    this.opend = false;
    callback &&
      {}.toString.call(callback) == "[object Function]" &&
      callback.call(this);
  }
};
function showValideTip(type) {
  if (window.cframe) {
    $("#ns_regchat").remove();
    window.cframe = null;
  }
  if (!window.cframe) {
    var ifr = document.createElement("iframe");
    ifr.style.display = "none";
    $(ifr)
      .attr({
        width: 455,
        height: type == 2 ? 408 : 318,
        frameborder: 0,
        scrolling: "no",
        src:
          "/valideMobile.html?type=" +
          (type != null ? type : 1) +
          "&callback=SubmitReflection",
        id: "ns_regchat"
      })
      .appendTo("body");
    window.cframe = new creatMask({ zindex: 9999, target: ifr });
    window.cframe.open();
  }
}
function showOriginalTipBeforeEdit(originalstatus) {
  if (originalstatus == "1") {
    alert("该文章已获取原创标识，不能修改！");
  } else if (originalstatus == "2") {
    alert("该文章已申请原创，不能修改！");
  }
  return false;
}
function a_closer() {
  $(".doc360outlinkpop").remove();
}
var similar = {
  getArtLoading: false,
  loadPage: 1,
  classid: 0,
  pageNum: 10,
  isjs: false,
  Init: function() {
    similar.loadPage = similar.diu_Randomize(2, 20);
    if (document.getElementById("hidreadroomclassid"))
      similar.classid = document.getElementById("hidreadroomclassid").value;
    $(window).bind("scroll", similar.wresize);
    $(window).bind("resize", similar.wresize);
  },
  getSimilarArticle: function() {
    if (!similar.getArtLoading) {
      similar.getArtLoading = true;
      $.ajax({
        type: "POST",
        url: "/ajax/ReadingRoom/getZCData.ashx",
        cache: false,
        data:
          "artNum=" +
          similar.pageNum +
          "&classId=" +
          similar.classid +
          "&subClassId=0&iIscream=0&iSort=1&nPage=" +
          similar.loadPage +
          "&nType=11",
        success: function(result) {
          similar.getArtLoading = false;
          var db = JSON.parse(result)[0].data;
          if (db.length > 0) {
            similar.bandHtml(db, 0);
            similar.loadPage++;
          }
        },
        error: similar.error
      });
    }
  },
  getSelectedArticle: function() {
    if (!similar.getArtLoading) {
      similar.getArtLoading = true;
      $.ajax({
        type: "POST",
        url: "/ajax/ReadingRoom/getCardListData.ashx",
        cache: false,
        data: "artNum=" + similar.pageNum + "&newindex=" + similar.loadPage,
        success: function(result) {
          similar.getArtLoading = false;
          var db = JSON.parse(result);
          if (db.length > 0) {
            similar.bandHtml(db, 0);
            similar.loadPage++;
          }
        },
        error: similar.error
      });
    }
  },
  bandHtml: function(data, index) {
    if (data == null || data.length == 0 || data.length <= index) {
      return;
    } else {
      var values = data[index];
      var lihtml = "";
      var titleCutNum = 60;
      var descCutNum = 64;
      lihtml += "<li>";
      if (values.ImgLis.length > 0) {
        lihtml +=
          '<span class="similar-pic f_left"><a target="_blank" onclick="artStatistics(\'20-9-7\');" href="' +
          values.StrUrl +
          '">';
        lihtml += '        <img src="' + values.ImgLis[0] + '" /></a></span>';
        titleCutNum = 60;
        descCutNum = 64;
      } else {
        titleCutNum = 78;
        descCutNum = 94;
      }
      lihtml +=
        '        <div class="similar-info f_left"' +
        (values.ImgLis.length > 0 ? "" : "style='width:100%;margin: 0;'") +
        ">";
      lihtml +=
        '            <p class="similar-title"><a  target="_blank" onclick="artStatistics(\'20-9-7\');" href="' +
        values.StrUrl +
        '">' +
        autoAddEllipsis(values.StrArtidetitle, titleCutNum * 2) +
        "</a></p>";
      lihtml +=
        '            <p class="similar-text"><a  target="_blank" onclick="artStatistics(\'20-9-7\');" href="' +
        values.StrUrl +
        '">' +
        autoAddEllipsis(values.StrDescription, descCutNum * 2) +
        "</a></p>";
      lihtml += "        </div>";
      lihtml += "</li>";
      $(".ul-similar").append(lihtml);
      if (index == 2 || index == 5 || index == 8) {
        similar.addAdvertisement();
      }
      index++;
      similar.bandHtml(data, index);
    }
  },
  addAdvertisement: function() {
    var html = "<li>";
    html += "</li>";
    $(".ul-similar").append(html);
    similar.addscript();
    if (!similar.isjs) {
      similar.isjs = true;
    }
    return html;
  },
  wresize: function() {
    if (!similar.getArtLoading) {
      var wH = $(window).height();
      var scrT = $(document).scrollTop();
      var card = $(".ul-similar");
      if (wH + scrT > card.height() + card.offset().top - 150) {
        if (similar.classid != 0 && similar.classid != "") {
          similar.getSimilarArticle();
        } else {
          similar.getSelectedArticle();
        }
      }
    }
  },
  addscript: function() {
    var s =
      "_" +
      Math.random()
        .toString(36)
        .slice(2);
    $(".ul-similar>li")
      .eq($(".ul-similar>li").length - 1)
      .append('<div style="" id="' + s + '"></div>');
    (window.slotbydup = window.slotbydup || []).push({
      id: "u3687933",
      container: s
    });
    var oHead = $(".ul-similar>li")[$(".ul-similar>li").length - 1];
    var oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.src = "//cpro.baidustatic.com/cpro/ui/c.js";
    oHead.appendChild(oScript);
  },
  diu_Randomize: function(b, e) {
    if ((!b && b != 0) || !e) {
      return "?";
    }
    return Math.floor(Math.random() * e + b);
  },
  error: function() {
    similar.getArtLoading = false;
  }
};
$(document).ready(function() {
  similar.Init();
  $(function() {
    $("#SendRefTB").focus(function() {
      if (
        !$(this)
          .parent()
          .hasClass("new_huifubt_show")
      ) {
        $(this)
          .parent()
          .addClass("new_huifubt_show");
        if ($(this).val() == "写评论...") {
          $(this).val("");
        }
      }
    });
    $("#SendRefTB").blur(function() {
      if ($(this).val() == "写评论..." || $(this).val() == "") {
        $(this)
          .parent()
          .removeClass("new_huifubt_show");
        $(this).val("写评论...");
      }
    });
    if ($("#articlecontent").height() > 2000 && $("#isowner").val() != "True") {
      $("body").addClass("articleMaxH");
    }
  });
});
function autoAddEllipsis(pStr, pLen) {
  var _ret = cutString(pStr, pLen);
  var _cutFlag = _ret.cutflag;
  var _cutStringn = _ret.cutstring;
  if ("1" == _cutFlag) {
    return _cutStringn + "...";
  } else {
    return _cutStringn;
  }
}
function isFull(pChar) {
  if (pChar.charCodeAt(0) > 128) {
    return true;
  } else {
    return false;
  }
}
function cutString(pStr, pLen) {
  var _strLen = pStr.length;
  var _tmpCode;
  var _cutString;
  var _cutFlag = "1";
  var _lenCount = 0;
  var _ret = false;
  if (_strLen <= pLen / 2) {
    _cutString = pStr;
    _ret = true;
  }
  if (!_ret) {
    for (var i = 0; i < _strLen; i++) {
      if (isFull(pStr.charAt(i))) {
        _lenCount += 2;
      } else {
        _lenCount += 1;
      }
      if (_lenCount > pLen) {
        _cutString = pStr.substring(0, i);
        _ret = true;
        break;
      } else if (_lenCount == pLen) {
        _cutString = pStr.substring(0, i + 1);
        _ret = true;
        break;
      }
    }
  }
  if (!_ret) {
    _cutString = pStr;
    _ret = true;
  }
  if (_cutString.length == _strLen) {
    _cutFlag = "0";
  }
  return { cutstring: _cutString, cutflag: _cutFlag };
}

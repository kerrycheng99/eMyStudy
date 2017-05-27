
!(function(){
  var currUser={
      userName:"",
      userNick:'<a class="set-nick" href="https://passport.csdn.net/account/profile">设置昵称<span class="write-icon"></span></a>',
      userInfo:"",
      desc : '<a class="fill-dec" href="//my.csdn.net" target="_blank">编辑自我介绍，让更多人了解你<span class="write-icon"></span></a>',
      avatar:"//static.csdn.net/public/common/toolbar/images/100x100.jpg"
    };
  var prodLogo = "none";
  var $oScriptTag =$("#toolbar-tpl-scriptId");
  var skin =$oScriptTag.attr("skin")=="black"?" csdn-toolbar-skin-black ":"";
  var fixed = $oScriptTag.attr("fixed")=="top"?" navbar-fixed-top ":"";
  var prodIndex= $oScriptTag.attr("domain")?$oScriptTag.attr("domain"):window.location.protocol+"//"+window.location.host;
      prodIndex+='?ref=toolbar_logo';
  var getCookie =function (objName){//获取指定名称的cookie的值
      var arrStr = document.cookie.split("; ");
      for(var i = 0;i < arrStr.length;i ++){
      var temp = arrStr[i].split("=");
      if(temp[0] == objName) return decodeURI(temp[1]);
      }
  }
  var HTMLEncode =function(str) {
      var s = "";
      if(str.length == 0) return "";
      s = str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\'/g, "&#39;").replace(/\"/g, "&quot;");
      return s;
    }
  var AUtoAvatar = function(AU){
    if(!AU||!currUser.userName){
      return false;
    }
    var _AUPath = AU.split("").join("/");
    var userName = currUser.userName&&currUser.userName.toLowerCase();
    return "http://avatar.csdn.net/"+_AUPath+"/2_"+userName+".jpg";
  }
  var hasLogin = false;
  var loginMark ="unlogin";
  function checkLogin(callback) {
          currUser.userNick = getCookie("UserNick") ||currUser.userNick;
          currUser.userName = getCookie("UserName") || currUser.userName;
          currUser.userInfo = getCookie("UserInfo") || currUser.userInfo;
          currUser.avatar = AUtoAvatar(getCookie("AU")) || currUser.avatar;
          currUser.desc = getCookie("UD") || currUser.desc;
          if(getCookie("UD")){
            currUser.desc = HTMLEncode(decodeURIComponent(currUser.desc).replace(/\+/g," "));
          }
          callback(currUser);
    }
  checkLogin(function(currUser){
    if(currUser.userName&&currUser.userInfo){
        hasLogin = true;
    }
    loginMark = hasLogin?"":"unlogin";
  })

  /*
  * init pord logo
  */
  var prodJSON = {
      "blog" : "blog-icon",
      "download" : "down-icon",
      "bbs" : "bbs-icon",
      "my" :"space-icon",
      "code" : "code-icon",
      "share" : "share-icon",
      "tag" : "tag-icon",
      "dashboard":"dashboard-icon",
      "news" : "news-icon",
      "tag" : "tag-icon",
      "ask" : "ask-icon",
      "notify" : "notify-icon"
  }
  if(prodJSON[$oScriptTag.attr("prod")]){
    prodLogo=prodJSON[$oScriptTag.attr("prod")]||$oScriptTag.attr("prod");
  }

  var tpl ='\<div class="csdn-toolbar'+skin+fixed+'">\
        <div class="container row center-block ">\
          <div class="col-md-3 pull-left logo clearfix"><a href="http://www.csdn.net?ref=toolbar" title="CSDN首页" target="_blank" class="icon"></a><a title="频道首页" href="'+prodIndex+'" target="_blank" class="img '+prodLogo+'"></a></div>\
          <div class="pull-right login-wrap '+loginMark+'">\
            <ul class="btns">\
              <li class="loginlink"><a href="https://passport.csdn.net/account/login?ref=toolbar" target="_top">登录&nbsp;</a>|<a  target="_top" href="https://passport.csdn.net/account/register?ref=toolbar">&nbsp;注册</a></li>\              
              <li class="apps">\
                <div class="icon on-apps-icon">\
                  <div class="wrap clearfix">\
                    <div class="curr-icon-wrap">\
                      <div class="curr-icon"></div>\
                    </div>\
                  <div class="detail">\
                    <dl>\
                      <dt>\
                        <h5>社区</h5>\
                      </dt>\
                      <dd> <a href="http://blog.csdn.net?ref=toolbar" target="_blank">博客</a></dd>\
                      <dd> <a href="http://bbs.csdn.net?ref=toolbar" target="_blank">论坛</a></dd>\
                      <dd> <a href="http://download.csdn.net?ref=toolbar" target="_blank">下载</a></dd>\
                      <dd><a href="http://share.csdn.net?ref=toolbar" target="_blank">Share</a></dd>\
                      <dd><a href="http://geek.csdn.net?ref=toolbar" target="_blank">极客头条</a></dd>\
                    </dl>\
                  </div>\
                  <div class="detail">\
                    <dl>\
                      <dt>\
                        <h5>服务</h5>\
                      </dt>\
                      <dd> <a href="https://code.csdn.net?ref=toolbar" target="_blank">CODE</a></dd>\
                      <dd> <a href="http://hero.csdn.net?ref=toolbar" target="_blank">英雄会</a></dd>\
                      <dd> <a href="http://huiyi.csdn.net/?ref=toolbar" target="_blank">活动</a></dd>\
                      <dd> <a href="http://www.csto.com?ref=toolbar" target="_blank">CSTO</a></dd>\
                    </dl>\
                  </div>\
                  <div class="detail last">\
                    <dl>\
                      <dt>\
                        <h5>俱乐部</h5>\
                      </dt>\
                      <dd> <a href="http://cto.csdn.net?ref=toolbar" target="_blank">CTO俱乐部</a></dd>\
                      <dd> <a href="http://student.csdn.net?ref=toolbar" target="_blank">高校俱乐部</a></dd>\
                    </dl>\
                  </div>\
                </div>\
              </div>\
            </li>\
            </ul>\
          </div>\
        </div>\
    </div>';
  $(document.body).append($(tpl));
})();
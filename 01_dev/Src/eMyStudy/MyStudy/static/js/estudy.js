/**
* eStudy global js file
*/

var DEF_NAV_URL = 'static/js/estudy_nav.html';


/*-------------------------------------------------------*/
/*  页面注入导航条　　　　                                 */
/*                                                       */
/*-------------------------------------------------------*/
//function creNavigation() {
//    var p_Url = arguments[0] ? arguments[0] : DEF_NAV_URL;
//    var p_NavId = arguments[1] ? arguments[1] : '';

//    $("#Navigation").empty();

//    $.ajax({
//        type: "get",//用POST方式传输
//        dataType: "html",//数据格式:HTML
//        url: p_Url,//目标地址
//        async: false,//同步
//        success: function (data) {
//            $("#Navigation").html(data);
//        }
//    });
//    //
//    if (p_NavId != '') {
//        //alert(p_NavId);
//        $("#Navigation").find("a").each(function () {
//            //alert($(this).data("navid"));
//            if ($(this).data("navid") == p_NavId) {
//                $(this).addClass("current");
//            }
//        });
//    }
//}

/*-------------------------------------------------------*/
/*  jQuery页面注入导航条　　　　                           */
/*                                                       */
/*-------------------------------------------------------*/
(function ($) {
    $.fn.extend({
        creNavigation: function () {
            if (!$(this).is("div")) return;
            var CUR_OBJ = $(this);

            //获取参数
            var p_Url = arguments[0] ? arguments[0] : DEF_NAV_URL;
            var p_NavId = arguments[1] ? arguments[1] : '';

            CUR_OBJ.empty();

            //获取导航页面
            $.ajax({
                type: "get",//用POST方式传输
                dataType: "html",//数据格式:HTML
                url: p_Url,//目标地址
                async: false,//同步
                success: function (data) {
                    CUR_OBJ.html(data);
                }
            });
            //调整指定导航栏CSS式样
            if (p_NavId != '') {
                CUR_OBJ.find("a").each(function () {
                    //alert($(this).data("navid"));
                    if ($(this).data("navid") == p_NavId) {
                        $(this).addClass("current");
                    }
                });
            }

        }
    });
})(jQuery);
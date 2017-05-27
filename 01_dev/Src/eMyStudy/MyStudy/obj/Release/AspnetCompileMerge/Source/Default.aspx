<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="MyStudy._Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>eStudy - 课程表</title>
    <link href="static/css/front.css" media="screen" rel="stylesheet" type="text/css" />
    <link href="static/css/top-toolbar.css" media="screen" rel="stylesheet" type="text/css" />
    <link href="static/js/pagination.css" rel="stylesheet" type="text/css" />
    <script src="static/js/jquery-1.7.1.min.js" type="text/javascript"></script>
    <script src="static/js/jquery.pagination.js" type="text/javascript"></script>
    <script src="static/js/estudy.js" type="text/javascript"></script>
     <script type="text/javascript">


         //var orderby = "";
         //var v_nav_url = "static/js/estudy_nav.html";

         $().ready(function () {
             //creNavigation('', 'NAVS_HEAD');
             $("#Navigation").creNavigation('', 'NAVS_HEAD');

             InitData();
             InitUserPara();
             //$("#pageTheme").change(function(){
             //    $("#Pagination").attr('class',$(this).val());
             //});
         });

         function InitUserPara() {
             $.ajax({
                 tpye: "POST",
                 dataType: "json",
                 url: 'Handler/UserParameterHandler.ashx',
                 data: "UserCd=*",
                 success: function (data) {
                     var UserParaData = data.UserPara;
                     $.each(UserParaData, function (i, n) {
                         if (n.ParaKeys == "TimeTalbeName") {
                             $("#lesson_name").text("");
                             $("#lesson_name").append(n.ParaValues + "课程表");
                         }
                         if (n.ParaKeys == "TotalWeeks") {
                             $("#lesson_weekno").text("");
                             $("#lesson_weekno").append("共" + n.ParaValues + "周");
                         }
                         if (n.ParaKeys == "CurWeekDay") {
                             switch (n.ParaValues) {
                                 case "1":
                                     $("#mon").addClass("curweekday");
                                     break;
                                 case "2":
                                     $("#tue").addClass("curweekday");
                                     break;
                                 case "3":
                                     $("#wed").addClass("curweekday");
                                     break;
                                 case "4":
                                     $("#thu").attr("class", "curweekday");
                                     break;
                                 case "5":
                                     $("#fri").addClass("curweekday");
                                     break;
                                 default:
                                     break;
                             }

                         }
                     });
                 }
             });
         }
         function InitData() {
             var tbody = "";

             $.ajax({
                 type: "POST",//用POST方式传输
                 dataType: "json",//数据格式:JSON
                 url: 'Handler/TimeTableHandler.ashx',//目标地址
                 data: "UserCd=*",
                 beforeSend: function () { $("#divload").show(); $("#lessonlist").hide(); },//发送数据之前
                 complete: function () { $("#divload").hide(); $("#lessonlist").show() },//接收数据完毕
                 success: function (data) {
                     $("#UserTimeTable tr:gt(0)").remove();
                     var jsonData = data.Curriculum;
                     $.each(jsonData, function (i, n) {
                         var trs = "";
                         trs += "<tr><td>" + n.Interval + "</td><td>" + n.LessonNo + "</td><td>" +
                              n.Mon + "</td><td>" + n.Tue + "</td><td>" + n.Wed + "</td><td>" +
                              n.Thu + "</td><td>" + n.Fri + "</td></tr>";

                         tbody += trs;
                     });

                     $("#UserTimeTable").append(tbody);

                     $("#UserTimeTable tr:gt(0):odd").attr("class", "odd");
                     $("#UserTimeTable tr:gt(0):even").attr("class", "enen");


                     $("#UserTimeTable tr:gt(0)").hover(function () {
                         $(this).addClass('mouseover');
                     }, function () {
                         $(this).removeClass('mouseover');
                     });
                 }
             });
         }

    </script>
    <style type="text/css">
        /*table{ width:600px; background-color:#ffffff}
      table th{ height:24px; background-color:#037E12; color:White;}
            5FD66C BCF5C4*/
      /*.odd{ background-color:#f7f7f7}
      .enen{ background-color:#e8f5fe}
      .mouseover{ background-color:#f2fddb;}
      .curweekday{background-color:#ffffdd;}*/
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div class="top-toolbar top-toolbar-skin-black ">
        <div class="container row center-block ">
            <div class="col-md-3 pull-left logo clearfix">
                <a href="." title="eStudy首页" target="_blank" class="icon"></a>
            </div>
        </div>
    </div>
        <!--Navigation-->
        <div id="Navigation"></div>

    <div id="Content">
        <div id="divload"></div>

        <div id="lesson_name"></div>
        <div id="lesson_weekno"></div>
        <!--ID, Interval, LessonNo, Mon, Tue, Wed, Thu, Fri-->
        <div id="lessonlist">
            <table width=650 id="UserTimeTable">
            <tr>
                <th id="interval" style="width:80px;">时段</th>
                <th id="lessonno" style="width:100px;">节次</th>
                <th id="mon" style="width:90px;">周一</th>
                <th id="tue" style="width:90px;">周二</th>
                <th id="wed" style="width:90px;">周三</th>
                <th id="thu" style="width:90px;">周四</th>
                <th id="fri" style="width:90px;">周五</th>
            </tr>
        </table>
        </div>
        
    </div>
    </form>
</body>
</html>

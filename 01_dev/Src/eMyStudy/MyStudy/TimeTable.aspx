<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TimeTable.aspx.cs" Inherits="MyStudy.TimeTable" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>eStudy - 课程表</title>
    <link href="static/css/front.css" media="screen" rel="stylesheet" type="text/css" />
    <link href="static/css/top-toolbar.css" media="screen" rel="stylesheet" type="text/css" />
    <link href="static/js/pagination.css" rel="stylesheet" type="text/css" />
    <script src="static/js/jquery-1.7.1.min.js" type="text/javascript"></script>
    <script src="static/js/jquery.pagination.js" type="text/javascript"></script>
     <script type="text/javascript">
        
      
         var orderby="";
        
         $().ready(function() {
             InitData(0);
             InitUserPara();
             //$("#pageTheme").change(function(){
             //    $("#Pagination").attr('class',$(this).val());
             //});
         });
        
         //function pageselectCallback(page_id, jq) {
         //    //  alert(page_id);
         //    InitData(page_id);
         //}
        
         function InitUserPara() {
             $.ajax({
                 tpye: "POST",
                 dataType: "json",
                 url: 'Handler/UserParameterHandler.ashx',
                 success: function (data) {
                     var UserParaData = data.UserPara;
                     $.each(UserParaData, function (i, n) {
                         if (n.ParaKeys == "TimeTalbeName") {
                             $("#lesson_name").text("");
                             $("#lesson_name").append(n.ParaValues+"课程表");
                         }
                         if (n.ParaKeys == "TotalWeeks") {
                             $("#lesson_weekno").text("");
                             $("#lesson_weekno").append("共"+n.ParaValues + "周");
                         }
                         if (n.ParaKeys == "CurWeekDay") {
                             //alert(n.ParaValues);
                             switch(n.ParaValues)
                             {
                                 case "1":
                                     //$("#mon").addClass("curweekday");
                                     $("#mon").css("background-color", "#ffffdd");
                                     break;
                                 case "2":
                                     //$("#tue").addClass("curweekday");
                                     $("#tue").css("background-color","#ffffdd");
                                     //$("#tue").text("");
                                     break;
                                 case "3":
                                     //$("#wed").addClass("curweekday");
                                     $("#wed").css("background-color", "#ffffdd");
                                     break;
                                 case "4":
                                     //$("#thu").attr("class", "curweekday");
                                     $("#thu").css("background-color", "#ffffdd");
                                     break;
                                 case "5":
                                     //$("#fri").attr("class", "curweekday");
                                     $("#fri").css("background-color", "#ffffdd");
                                     break;
                                 default:
                                     break;
                             }

                         }
                     });
                 }
             });
         }
         function InitData(pageindx)
         {
             var tbody = "";
           
             $.ajax({
                 type: "POST",//用POST方式传输
                 dataType: "json",//数据格式:JSON
                 url: 'Handler/TimeTableHandler.ashx',//目标地址
                 //data:"p="+(pageindx+1)+"&orderby="+orderby,
                 beforeSend: function () { $("#divload").show(); $("#lessonlist").hide(); },//发送数据之前
                 complete: function () { $("#divload").hide(); $("#lessonlist").show() },//接收数据完毕
                 success: function (data) {
                     $("#UserTimeTable tr:gt(0)").remove();
                     var CurriculumData = data.Curriculum;
                     $.each(CurriculumData, function (i, n) {
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
                     },function(){
                         $(this).removeClass('mouseover');
                     });
                 }});
        }
        
    </script>
    <style type="text/css">
        /*table{ width:600px; background-color:#ffffff}
      table th{ height:24px; background-color:#037E12; color:White;}
            5FD66C BCF5C4*/
      .odd{ background-color:#f7f7f7}
      .enen{ background-color:#e8f5fe}
      .mouseover{ background-color:#f2fddb;}
      .curweekday{background-color:#ffffdd;}
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div class="top-toolbar top-toolbar-skin-black ">
        <div class="container row center-block ">
            <div class="col-md-3 pull-left logo clearfix">
                <a href="/" title="eStudy首页" target="_blank" class="icon"></a>
            </div>
        </div>
    </div>

    <div class="navigation">
        <div class="container">
            <div class="nav-bar">
                <a href="." class="current">首页</a>

                <span class="dropdown">
                    <a href="javascript:void(0);">单词抽查</a>
                    <span class="caret"></span>
                    <div class="dropdown-menu">
                            <a node-type="click-ele" data-key="NAVS_DISK" class="li wenzhang" hidefocus="hideFocus" href="EnWordsExam.aspx" target="_self">
                                <span class="icon"></span>
                                <span class="text">单词拼读</span>
                            </a>
                            <a node-type="click-ele" data-key="NAVS_TONGXUNLU" class="li note" hidefocus="hideFocus" href="EnWordsExam.aspx?Iswt=Y" target="_self">
                                <span class="icon"></span>
                                <span class="text">单词拼写</span>
                            </a>
                    </div>
                            
                </span>

                <a href="EnWordsList.aspx" class="">单词列表</a>

                <span class="dropdown">
                    <a href="javascript:void(0);">试题抽查</a>
                    <span class="caret"></span>
                    <div class="dropdown-menu">
                        <a node-type="click-ele" data-key="NAVS_DISK" class="li wenzhang" hidefocus="hideFocus" href="QuestionsExam.aspx?Subj=CN" target="_self">
                            <span class="icon"></span>
                            <span class="text">语文抽查</span>
                        </a>
                        <a node-type="click-ele" data-key="NAVS_TONGXUNLU" class="li note" hidefocus="hideFocus" href="QuestionsExam.aspx?Subj=SX" target="_self">
                            <span class="icon"></span>
                            <span class="text">数学抽查</span>
                        </a>
                        <a node-type="click-ele" data-key="NAVS_TONGXUNLU" class="li wenzhang" hidefocus="hideFocus" href="QuestionsExam.aspx?Subj=EN" target="_self">
                            <span class="icon"></span>
                            <span class="text">英语抽查</span>
                        </a>
                    </div>
                </span>

                <span class="dropdown">
                    <a href="javascript:void(0);">试题列表</a>
                    <span class="caret"></span>
                    <div class="dropdown-menu">
                        <a node-type="click-ele" data-key="NAVS_DISK" class="li wenzhang" hidefocus="hideFocus" href="ExamQuestionsList.aspx?Subj=CN" target="_self">
                            <span class="icon"></span>
                            <span class="text">语文试题</span>
                        </a>
                        <a node-type="click-ele" data-key="NAVS_TONGXUNLU" class="li note" hidefocus="hideFocus" href="ExamQuestionsList.aspx?Subj=SX" target="_self">
                            <span class="icon"></span>
                            <span class="text">数学试题</span>
                        </a>
                        <a node-type="click-ele" data-key="NAVS_TONGXUNLU" class="li wenzhang" hidefocus="hideFocus" href="ExamQuestionsList.aspx?Subj=EN" target="_self">
                            <span class="icon"></span>
                            <span class="text">英语试题</span>
                        </a>
                    </div>
                </span>

            </div>
        </div>
    </div>

    <div class="timetable">
        <div id="divload" style="top:50%; right:60%;position:absolute; padding:0px; margin:0px; z-index:999">
        <img src="static/img/spinner3-greenie.gif" /></div>

        <div id="lesson_name" style="width:650px;text-align:center;padding:10px;font-weight:bold;">课程表</div>
        <div id="lesson_weekno" style="width:650px;text-align:right;padding:0 10px 10px 10px;">第x周，共y周</div>
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
        <!--<div id="GridViewMsg" style="padding: 5px;" runat="server">
        </div>-->
    </div>
    </form>
</body>
</html>

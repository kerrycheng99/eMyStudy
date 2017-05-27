<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ExamQuestionsList.aspx.cs" Inherits="MyStudy.ExamQuestionsList" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>eStudy - 试题列表</title>
    <link href="static/css/front.css" media="screen" rel="stylesheet" type="text/css" />
    <link href="static/css/top-toolbar.css" media="screen" rel="stylesheet" type="text/css" />
    <link href="static/js/pagination.css" rel="stylesheet" type="text/css" />
    <script src="static/js/jquery-1.7.1.min.js" type="text/javascript"></script>
    <script src="static/js/jquery.pagination.js" type="text/javascript"></script>
    <script src="static/js/estudy.js" type="text/javascript"></script>
    <script type="text/javascript">
        
        var pageIndex = 0;              //页面索引初始值  
        var pageSize = 10;              //每页显示条数初始化，修改显示条数，修改这里即可  
        var v_prev_text = '< 上一页';   //上一页按钮显示文本
        var v_next_text = '下一页 >';   //下一页按钮显示文本
        var v_num_display_entries = 6;  //连续分页主体部分显示的分页条目数
        var v_num_edge_entries = 2;     //两侧显示的首尾分页的条目数
        var v_subj = '';

        $().ready(function () {
            $("#Navigation").creNavigation('', 'NAVS_QLIST');
            $("#divload").hide();
            if ($.getUrlVar('Subj') != null) {
                v_subj = $.getUrlVar('Subj');
            }

            InitTable(0);    //初始化表格数据，页面索引为0（第一页）
            <%--//var cntInit = <%=pageCount%>; --%>       //总记录数
            var cntInit = getDataRowCount();        //总记录数
            var optInit = setPaginationOptions();   //pagination参数
            $("#Pagination").pagination(cntInit, optInit);//初始化pagination分页
            
        });

        //JQuery获取URL参数扩展函数
        $.extend({
            getUrlVars: function(){
                var vars = [], hash;
                var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                for(var i = 0; i < hashes.length; i++)
                {
                    hash = hashes[i].split('=');
                    vars.push(hash[0]);
                    vars[hash[0]] = hash[1];
                }
                return vars;
            },
            getUrlVar: function(name){
                return $.getUrlVars()[name];
            }
        });

        //翻页调用
        function PageCallback(page_idx, jq) {
            //  alert(page_idx);
            InitTable(page_idx);
            // Prevent click event propagation
            return false;
        }

        // pagination分页参数设置
        function setPaginationOptions() {
            var opt = {
                callback: PageCallback,                     //回调函数,接受两个参数，新一页的id和pagination容器（一个DOM元素）。如果回调函数返回false，则pagination事件停止执行
                prev_text: v_prev_text,                     //“前一页”分页按钮上显示的文字
                next_text: v_next_text,                     //“下一页”分页按钮上显示的文字
                items_per_page: pageSize,                   //每页显示的条目数  
                num_display_entries: v_num_display_entries, //连续分页主体部分显示的分页条目数 
                current_page: pageIndex,                    //当前选中的页面索引
                num_edge_entries: v_num_edge_entries,       //两侧显示的首尾分页的条目数
                link_to: 'javascript:void(0);'              //分页的链接字符串，默认是"#"
            };
            return opt;
        }

        // 获取指定查询条件记录总数
        function getDataRowCount() {
            var dataRowCnt = 0;
            $.ajax({
                type: "POST",//用POST方式传输
                dataType: "json",//数据格式:JSON
                url: 'Handler/ExamQuestionsHandler.ashx',//目标地址
                data:{QryType: "CNT",
                    PageIndex: pageIndex,
                    PageSize: pageSize,
                    Subj: v_subj
                },
                async: false,//同步
                success: function (data) {
                    dataRowCnt = data.DataCnt;
                }
            });
            return dataRowCnt;
        }

        //请求数据
        function InitTable(pageIndex) {
            var tbody = "";
            $.ajax({
                type: "POST",//用POST方式传输
                dataType: "json",//数据格式:JSON
                url: 'Handler/ExamQuestionsHandler.ashx',//目标地址
                data:{QryType: "LST",
                    PageIndex: pageIndex,
                    PageSize: pageSize,
                    Subj: v_subj
                },
                beforeSend: function () { $("#divload").show(); $("#lessonlist").hide(); },//发送数据之前
                complete: function () { $("#divload").hide(); $("#lessonlist").show() },//接收数据完毕
                success: function (data) {
                    $("#DataListTable tr:gt(0)").remove();
                    var jsonData = data.DataList;
                    $.each(jsonData, function (i, n) {
                        var trs = "";
                        trs += "<tr><td>" + n.ID + "</td><td>" + n.Subj + "</td><td>" +
                             n.Grad + "</td><td>" + n.Term + "</td><td>" + n.Qtyp + "</td><td>" + 
                             n.Qbod + "</td><td>" + n.Qopt + "</td><td>" + n.Qans + "</td><td>" + 
                             n.Qlev + "</td></tr>";

                        tbody += trs;
                    });
                    // 每页显示补齐
                    if (jsonData.length < pageSize) {
                        for (var i = 0; i < (pageSize - jsonData.length) ; i++) {
                            var trs = "<tr><td>&nbsp;</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td></tr>";
                            tbody += trs;
                        }
                    }

                    $("#DataListTable").append(tbody);

                    $("#DataListTable tr").each(function () {                
                        $(this).children("td:lt(4)").attr("class", "tc")
                    });
                    $("#DataListTable tr:gt(0):odd").attr("class", "odd");
                    $("#DataListTable tr:gt(0):even").attr("class", "enen");


                    $("#DataListTable tr:gt(0)").hover(function () {
                        $(this).addClass('mouseover');
                    }, function () {
                        $(this).removeClass('mouseover');
                    });
                }
            });

        }

    </script>
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

        <!-- Navigation -->
        <div id="Navigation"></div>

        <div id="Content">
        <div id="divload"></div>
        <!--ID, Interval, LessonNo, Mon, Tue, Wed, Thu, Fri-->
        <div id="wordslist">
            <table width=1000 id="DataListTable">
            <tr>
                <th id="idno" style="width:50px;">ID</th>
                <th id="subj" style="width:50px;">科目</th>
                <th id="grad" style="width:60px;">年级</th>
                <th id="term" style="width:60px;">学期</th>
                <th id="qtyp" style="width:100px;">分类</th>
                <th id="qbod" style="width:300px;">题干</th>
                <th id="qopt" style="width:150px;">选项</th>
                <th id="qans" style="width:80px;">答案</th>
                <th id="qlev" style="width:50px;">等级</th>
            </tr>
            </table>
        </div>
    </div>

        <div id="Pagination" class="tc" ></div>
    </form>
</body>
</html>

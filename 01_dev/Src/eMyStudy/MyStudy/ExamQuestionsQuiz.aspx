<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ExamQuestionsQuiz.aspx.cs" Inherits="MyStudy.ExamQuestionsQuiz" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>eStudy - 试题抽查</title>
    <link href="static/css/front.css" media="screen" rel="stylesheet" type="text/css" />
    <link href="static/css/top-toolbar.css" media="screen" rel="stylesheet" type="text/css" />
    <link href="static/js/pagination.css" rel="stylesheet" type="text/css" />
    <script src="static/js/jquery-1.7.1.min.js" type="text/javascript"></script>
    <script src="static/js/jquery.pagination.js" type="text/javascript"></script>
    <script src="static/js/estudy.js" type="text/javascript"></script>
    <script type="text/javascript">

        var pageIndex = 0;              //页面索引初始值  
        var pageSize = 4;               //每页显示条数初始化，修改显示条数，修改这里即可  
        var v_prev_text = '< 上一组';   //上一页按钮显示文本
        var v_next_text = '下一组 >';   //下一页按钮显示文本
        var v_num_display_entries = 6;  //连续分页主体部分显示的分页条目数
        var v_num_edge_entries = 2;     //两侧显示的首尾分页的条目数
        var v_empty_tip = '哦噢，没有试题啦！';

        $().ready(function () {
            $("#Navigation").creNavigation('', 'NAVS_QEXAM');
            // 页面控件初始化           
            $("#divload").hide();
            $("#Inquiry_Cond select").empty();

            setCondsByDic(); //初始化画面查询条件
            $("#cond_qtyp").empty();
            var CatgCd = 'EXAMTYPE';
            var Keys = $("#cond_subj").val();
            setCondsByDic(CatgCd, Keys);
            if ($.getUrlVar('Subj') != null) {
                $("#cond_subj").val($.getUrlVar('Subj'));
                var CatgCd = 'EXAMTYPE';
                var Keys = $("#cond_subj").val();
                $("#cond_qtyp").empty();
                setCondsByDic(CatgCd, Keys);
                $("#hid_subj_txt").val($("#cond_subj").find("option:selected").text());
            }

            InitTable(0);    //初始化表格数据，页面索引为0（第一页）
            var cntInit = getDataRowCount();        //总记录数
            var optInit = setPaginationOptions();   //pagination参数
            $("#Pagination").pagination(cntInit, optInit);//初始化pagination分页

            // 触发点击[查询]按钮
            $("#Inquiry_Cond select").change(function () {
                $("#btn_qry").click();
            });
            $("#cond_subj").change(function () {
                var CatgCd = 'EXAMTYPE';
                var Keys = $("#cond_subj").val();
                $("#cond_qtyp").empty();
                setCondsByDic(CatgCd, Keys);
                $("#btn_qry").click();
                $("#hid_subj_txt").val($("#cond_subj").find("option:selected").text());
            });

            // 按钮事件处理
            $("#btn_qry").click(function () {
                InitTable(0);

                var cnt = getDataRowCount();
                var opt = setPaginationOptions();

                $("#Pagination").pagination(cnt, opt);  //重新创建pagination分页
            });

            //$(".show_ans").live("click", (function () {
            //    var obj_div = $(this).parent().next("div");
            //    //alert($(obj_div).text());
            //    ($(obj_div).is(":hidden")) ? $(obj_div).show() : $(obj_div).hide();
            //}));
            

        });

        //JQuery扩展函数 : 获取URL参数扩展函数
        $.extend({
            getUrlVars: function () {
                var vars = [], hash;
                var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                for (var i = 0; i < hashes.length; i++) {
                    hash = hashes[i].split('=');
                    vars.push(hash[0]);
                    vars[hash[0]] = hash[1];
                }
                return vars;
            },
            getUrlVar: function (name) {
                return $.getUrlVars()[name];
            }
        });

        // 翻页调用
        function PageCallback(page_idx, jq) {

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

        // 获取页面中输入的查询条件
        function getCondtionsFromForm() {
            //var objs = new Object();
            //objs.cond_subj = $("#cond_subj").attr("value");
            //objs.cond_grad = $("#cond_grad").attr("value");
            //objs.cond_term = $("#cond_term").attr("value");
            //objs.cond_qtyp = $("#cond_qtyp").attr("value");
            //objs.cond_qlev = $("#cond_qlev").attr("value");
            
            var jtxt = '';
            $("#Inquiry_Cond select").each(function () {
                jtxt = jtxt + "\"" + $(this).attr("id") + "\":\"" + $(this).val() + "\",";
            });
            $("#Inquiry_Cond input:checkbox").each(function () {
                jtxt = jtxt + "\"" + $(this).attr("id") + "\":\""
                    + ($(this).attr("checked") ? $(this).val() : '')
                    + "\",";
            });
            jtxt = jtxt.substring(0, jtxt.lastIndexOf(','));
            jtxt = "{" + jtxt + "}";
            var objs = $.parseJSON(jtxt);

            return objs;
        }

        // 初始化画面查询条件
        function setCondsByDic() {
            var p_CatgCd = arguments[0] ? arguments[0] : '';
            var p_Keys = arguments[1] ? arguments[1] : '';
            var p_Keys02 = arguments[2] ? arguments[2] : '';
            var dics = new Object({
                Grad: "GRADE",
                Term: "TERM",
                Subj: "EXAMSUBJ",
                Qlev: "DEGREE",
                ExamType: "EXAMTYPE"
            });

            $.ajax({
                type: "POST",//用POST方式传输
                dataType: "json",//数据格式:JSON
                url: 'Handler/SysDictionaryHandler.ashx',//目标地址
                data:{
                    DicCatgCd: p_CatgCd,
                    DicKeys: p_Keys,
                    DicKeys02: p_Keys02
                },
                async: false,//同步
                success: function (data) {
                    if (p_CatgCd == '') {
                        $("#cond_grad").append("<option value=\"\">---全部---</option>");
                        $("#cond_term").append("<option value=\"\">---全部---</option>");
                        $("#cond_subj").append("<option value=\"\">---全部---</option>");
                        $("#cond_qlev").append("<option value=\"\">---全部---</option>");
                        $("#cond_qtyp").append("<option value=\"\">---全部---</option>");
                    } else if (p_CatgCd == dics.Grad){
                        $("#cond_grad").append("<option value=\"\">---全部---</option>");
                    } else if (p_CatgCd == dics.Term) {
                        $("#cond_term").append("<option value=\"\">---全部---</option>");
                    } else if (p_CatgCd == dics.Subj) {
                        $("#cond_subj").append("<option value=\"\">---全部---</option>");
                    } else if (p_CatgCd == dics.Qlev) {
                        $("#cond_qlev").append("<option value=\"\">---全部---</option>");
                    } else if (p_CatgCd == dics.ExamType) {
                        $("#cond_qtyp").append("<option value=\"\">---全部---</option>");
                    }
                    var jsonData = data.SysDic;
                    $.each(jsonData, function (i, r) {
                        //年级
                        if (r.DicCatgCd == dics.Grad) {
                            $("#cond_grad").append("<option value='" + r.DicKeys + "'>" + r.DicValues + "</option>");
                            if (r.IsDefault == "Y") {
                                $("#cond_grad").val(r.DicKeys);
                            }
                        }
                        //学期
                        if (r.DicCatgCd == dics.Term) {
                            $("#cond_term").append("<option value='" + r.DicKeys + "'>" + r.DicValues + "</option>");
                            if (r.IsDefault == "Y") {
                                $("#cond_term").val(r.DicKeys);
                            }
                        }
                        //科目
                        if (r.DicCatgCd == dics.Subj) {
                            $("#cond_subj").append("<option value='" + r.DicKeys + "'>" + r.DicValues + "</option>");
                            if (r.IsDefault == "Y") {
                                $("#cond_subj").val(r.DicKeys);
                            }
                        }
                        //重要度
                        if (r.DicCatgCd == dics.Qlev) {
                            $("#cond_qlev").append("<option value='" + r.DicKeys + "'>" + r.DicValues + "</option>");
                            if (r.IsDefault == "Y") {
                                $("#cond_qlev").val(r.DicKeys);
                            }
                        }
                        //试题分类
                        if (r.DicCatgCd == dics.ExamType) {
                            $("#cond_qtyp").append("<option value='" + r.DicKeys02 + "'>" + r.DicValues + "</option>");
                            if (r.IsDefault == "Y") {
                                $("#cond_qtyp").val(r.DicKeys02);
                            }
                        }
                    });
                }
            });
        }
        // 获取指定查询条件记录总数
        function getDataRowCount() {
            var conds = getCondtionsFromForm();
            var dataRowCnt = 0;
            $.ajax({
                type: "POST",//用POST方式传输
                dataType: "json",//数据格式:JSON
                url: 'Handler/ExamQuestionsHandler.ashx',//目标地址
                data: {
                    QryType: "CNT",
                    PageIndex: pageIndex,
                    PageSize: pageSize,
                    Subj: conds.cond_subj,
                    Grad: conds.cond_grad,
                    Term: conds.cond_term,
                    Qtyp: conds.cond_qtyp,
                    Qlev:conds.cond_qlev
                },
                async: false,//同步
                success: function (data) {
                    dataRowCnt = data.DataCnt;
                }
            });
            $("#words_total").text("[ 题目共计：" + dataRowCnt + " ]");
            return dataRowCnt;
        }

        // ajax方式请求显示数据 
        function InitTable(pageIndex) {
            var conds = getCondtionsFromForm();
            var newcontent = "";
            $.ajax({
                type: "POST",//用POST方式传输
                dataType: "json",//数据格式:JSON
                url: 'Handler/ExamQuestionsHandler.ashx',//目标地址
                data: {
                    QryType: "LST",
                    PageIndex: pageIndex,
                    PageSize: pageSize,
                    Subj: conds.cond_subj,
                    Grad: conds.cond_grad,
                    Term: conds.cond_term,
                    Qtyp: conds.cond_qtyp,
                    Qlev: conds.cond_qlev
                },
                beforeSend: function () { $("#divload").show(); $("#question_result").hide(); },//发送数据之前
                complete: function () { $("#divload").hide(); $("#question_result").show() },//接收数据完毕
                success: function (data) {
                    var jsonData = data.DataList;
                    $.each(jsonData, function (i, r) {
                        newcontent += "<div class=\"container\">";
                        newcontent += "<div class=\"qbod\">" + (pageIndex * pageSize + i + 1) + "、"
                            + (r.Qopt == '' ? r.Qtyp : r.Qbod)
                            + "</div>";
                        newcontent += "<div class=\"qopt\">" 
                            + (r.Qopt == '' ? r.Qbod : r.Qopt)
                            + "<span class='show_ans'>答案<span class='caret'></span></span>"
                            + "</div>";
                        newcontent += "<div class=\"qans\">" + r.Qans + "</div>";
                        newcontent += "</div>";
                    });
                    // 每页显示补齐
                    if (jsonData.length < pageSize) {
                        for (var i = 0; i < (pageSize - jsonData.length) ; i++) {
                            newcontent += "<div class=\"container\">";
                            newcontent += "<div class=\"qbod\"></div>";
                            newcontent += "<div class=\"qopt\">" + v_empty_tip + "</div>";
                            newcontent += "<div class=\"qans\"></div>";
                            newcontent += "</div>";
                        }
                    }
                    $("#question_result").html(newcontent);

                    $("#question_result").each(function () {
                        $(this).children("div").hover(function () {
                            $(this).children("div").addClass('mouseover');
                        }, function () {
                            $(this).children("div").removeClass('mouseover');
                        });
                    });

                    $(".show_ans").each(function () {
                        $(this).hover(function () {
                            $(this).parent().next("div").show();
                        }, function () {
                            $(this).parent().next("div").hide();
                        });
                    });

                }
            });
        }

    </script>
    <style type="text/css">
        .auto-style1 {
            width: 120px;
        }
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

        <!-- Navigation -->
        <div id="Navigation"></div>

        <div id="Inquiry_Cond">
            <div class="fieldset_cond">    
            <table>
                <tr>
                    <td style="width:100px;"><label for="cond_subj">科目设定</label></td>
                    <td style="width:120px;">
                        <select id="cond_subj" name="cond_subj" style="width:100px;"> 
                            <option value="">---全部---</option> 
                            <option value="CN">语文</option> 
                            <option value="SX">数学</option> 
                            <option value="EN">英语</option> 
                            </select>
                        <input type="hidden" runat="server" name="hid_subj_txt" id="hid_subj_txt" value=""/>
                    </td>
                    <td style="width:100px;"><label for="cond_qtyp">试题分类</label></td>
                    <td style="width:140px;">
                        <select id="cond_qtyp" name="cond_qtyp" style="width:125px;"> 
                            <option value="">---全部---</option> 
                            </select>
                    </td>
                    <td style="width:100px;"><label for="cond_qlev">重要度</label></td>
                    <td class="auto-style1">
                        <select id="cond_qlev" name="cond_qlev" style="width:100px;"> 
                            <option value="">---全部---</option> 
                            <option value="1">一般</option> 
                            <option value="2">重要</option> 
                            <option value="3">非常重要</option> 
                            </select> 
                    </td>
                    <td style="width:auto;"></td>
                </tr>
                <tr>
                    <td style="width:100px;"><label for="cond_grad">年级设定</label></td>
                    <td style="width:120px;">
                        <select id="cond_grad" name="cond_grad" style="width:100px;"> 
                            <option value="">---全部---</option> 
                            <option value="1">一年级</option> 
                            <option value="2">二年级</option> 
                            <option value="3">三年级</option> 
                            <option value="4">四年级</option> 
                            <option value="5">五年级</option> 
                            </select>
                    </td>
                    <td style="width:100px;"><label for="cond_term">学期设定</label></td>
                    <td style="width:140px;">
                        <select id="cond_term" name="cond_term" style="width:125px;"> 
                            <option value="">---全部---</option> 
                            <option value="A">上学期</option> 
                            <option value="B">下学期</option> 
                            </select> 
                        
                    </td>
                    <td style="width:100px;">
                        <!--<a href="javascript:void(0);" id="btn_qry" class="btn"><span>抽查</span></a>-->
                        <input type="button" id="btn_qry" value="抽查" class="btn"  />
                    </td>
                    <td class="auto-style1">
                        <asp:Button ID="btn_csv" runat="server" Text="转Excel" class="btn" OnClick="btn_csv_Click" />
                    </td>
                    <td style="width:auto;"><label id="words_total"></label></td>
                </tr>
                <!--<tr>
                    <td style="width:100px;"></td>
                    <td style="width:120px;"></td>
                    <td style="width:100px;"></td>
                    <td style="width:140px;"></td>
                    <td style="width:100px;"></td>
                    <td style="width:120px;"></td>
                    <td style="width:auto;"></td>
                </tr>-->
            </table>
            </div>   
        </div>

        <div id="question_result" >
            <!--<div class="container">
                <div class="qbod">Jim</div>
                <div class="qopt">[dʒɪm]</div>
                <div class="qans">杰姆（人名）</div>
            </div>
            <div class="container">
                <div class="qbod">has</div>
                <div class="qopt">[hæz]</div>
                <div class="qans">有（第三人称单数）</div>
            </div>
            <div class="container">
                <div class="qbod">chopsticks</div>
                <div class="qopt">['tʃɒpstɪks]</div>
                <div class="qans">筷子</div>
            </div>
            <div class="container">
                <div class="qbod">pupil</div>
                <div class="qopt">['pjuːpɪl; -p(ə)l]</div>
                <div class="qans">学生；未成年人</div>
            </div>-->
        </div>

        <div id="divload"></div>

        <div id="Pagination" class="tc"></div>
    </form>
</body>
</html>

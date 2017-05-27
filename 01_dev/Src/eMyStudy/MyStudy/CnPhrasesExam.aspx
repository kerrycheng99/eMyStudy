<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CnPhrasesExam.aspx.cs" Inherits="MyStudy.CnPhrasesExam" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>eStudy - 词语抽查</title>
    <link href="static/css/front.css" media="screen" rel="stylesheet" type="text/css" />
    <link href="static/css/top-toolbar.css" media="screen" rel="stylesheet" type="text/css" />
    <link href="static/js/pagination.css" rel="stylesheet" type="text/css" />
    <script src="static/js/jquery-1.7.1.min.js" type="text/javascript"></script>
    <script src="static/js/jquery.pagination.js" type="text/javascript"></script>
    <script src="static/js/estudy.js" type="text/javascript"></script>
    <script type="text/javascript">
        
        var pageIndex = 0;              //页面索引初始值  
        var pageSize = 8;               //每页显示条数初始化，修改显示条数，修改这里即可  
        var v_prev_text = '< 上一组';   //上一页按钮显示文本
        var v_next_text = '下一组 >';   //下一页按钮显示文本
        var v_num_display_entries = 6;  //连续分页主体部分显示的分页条目数
        var v_num_edge_entries = 2;     //两侧显示的首尾分页的条目数
        var v_empty_tip = '哦噢，没有词语啦！';

        $().ready(function () {
            $("#Navigation").creNavigation('', 'NAVS_CNPRS');
            // 页面控件初始化
            $("#cond_show_phrase").attr("checked", true);
            $("#divload").hide();
            $("#Inquiry_Cond select").empty();
            
            setCondsByDic(); //初始化画面查询条件

            InitTable(0);    //初始化表格数据，页面索引为0（第一页）
            var cntInit = getDataRowCount();        //总记录数
            var optInit = setPaginationOptions();   //pagination参数
            $("#Pagination").pagination(cntInit, optInit);//初始化pagination分页
            
            // 触发点击[查询]按钮
            $("#Inquiry_Cond select").change(function () {
                $("#btn_qry").click();
            });

            // 按钮事件处理
            $("#btn_qry").click(function () {
                InitTable(0);

                var cnt = getDataRowCount();
                var opt = setPaginationOptions();
                
                $("#Pagination").pagination(cnt, opt);  //重新创建pagination分页
            });

        });

        //JQuery扩展函数 : 获取URL参数扩展函数
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
        function getCondtionsFromForm(){
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
                Unit: "CNUNIT"
            });

            $.ajax({
                type: "POST",//用POST方式传输
                dataType: "json",//数据格式:JSON
                url: 'Handler/SysDictionaryHandler.ashx',//目标地址
                data: {
                    DicCatgCd: p_CatgCd,
                    DicKeys: p_Keys,
                    DicKeys02: p_Keys02
                },
                async: false,//同步
                success: function (data) {
                    if (p_CatgCd == '') {
                        $("#cond_grad").append("<option value=\"\">---全部---</option>");
                        $("#cond_term").append("<option value=\"\">---全部---</option>");
                        $("#cond_unit").append("<option value=\"\">---全部---</option>");
                    } else if (p_CatgCd == dics.Grad) {
                        $("#cond_grad").append("<option value=\"\">---全部---</option>");
                    } else if (p_CatgCd == dics.Term) {
                        $("#cond_term").append("<option value=\"\">---全部---</option>");
                    } else if (p_CatgCd == dics.Unit) {
                        $("#cond_unit").append("<option value=\"\">---全部---</option>");
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
                        //语文单元
                        if (r.DicCatgCd == dics.Unit) {
                            $("#cond_unit").append("<option value='" + r.DicKeys + "'>" + r.DicValues + "</option>");
                            if (r.IsDefault == "Y") {
                                $("#cond_unit").val(r.DicKeys);
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
                url: 'Handler/CnPhrasesHandler.ashx',//目标地址
                data:{QryType: "CNT",
                    PageIndex: pageIndex,
                    PageSize: pageSize,
                    Grad: conds.cond_grad,
                    Term: conds.cond_term,
                    Unit: conds.cond_unit,
                    ShowPhrase: conds.cond_show_phrase
                },
                async: false,//同步
                success: function (data) {
                    dataRowCnt = data.DataCnt;
                }
            });
            $("#words_total").text("[ 词语共计：" + dataRowCnt + " ]");
            return dataRowCnt;
        }

        // ajax方式请求显示数据 
        function InitTable(pageIndex) {
            var conds = getCondtionsFromForm();
            var newcontent = "";
            $.ajax({
                type: "POST",//用POST方式传输
                dataType: "json",//数据格式:JSON
                url: 'Handler/CnPhrasesHandler.ashx',//目标地址
                data:{QryType: "LST",
                    PageIndex: pageIndex,
                    PageSize: pageSize,
                    Grad: conds.cond_grad,
                    Term: conds.cond_term,
                    Unit: conds.cond_unit,
                    ShowPhrase: conds.cond_show_phrase
                },
                beforeSend: function () { $("#divload").show(); $("#phrase_result").hide(); },//发送数据之前
                complete: function () { $("#divload").hide(); $("#phrase_result").show(); },//接收数据完毕
                success: function (data) {
                    $("#phrase_result > *").remove();
                    var jsonData = data.DataList;
                    $.each(jsonData, function (i, r) {
                        newcontent += "<div class=\"container fl\">";
                        newcontent += "<div class=\"piny\">"
                            + r.Piny
                            + "<span><a href=\"javascript:void(0);\" title=\"" + r.GradCd + r.TermCd + '  第'+r.UnitCd+'单元 ' + r.LesnCd +'课' + "\">&nbsp</a></span>"
                            + "</div>";

                        if (conds.cond_show_phrase == 'Y') {
                            newcontent += "<div class=\"phrase\">" + r.Word + "</div>";
                        } else {
                            newcontent += "<div class=\"phrase\"> </div>";
                        }
                        newcontent += "</div>";
                    });
                    // 每页显示补齐
                    if (jsonData.length < pageSize) {
                        for (var i = 0; i < (pageSize - jsonData.length) ; i++) {
                            newcontent += "<div class=\"container fl\">";
                            newcontent += "<div class=\"piny\">" + v_empty_tip + "</div>";
                            newcontent += "<div class=\"phrase\"></div>";
                            newcontent += "</div>";
                        }
                    }
                    $("#phrase_result").html(newcontent);

                    $("#phrase_result").each(function () {
                        $(this).children("div").hover(function(){
                            $(this).children("div").addClass('mouseover');
                        }, function(){
                            $(this).children("div").removeClass('mouseover');
                        });
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

        <div id="Inquiry_Cond">
            <div class="fieldset_cond">    
            <table>
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
                    <td style="width:120px;">
                        <select id="cond_term" name="cond_term" style="width:100px;"> 
                            <option value="">---全部---</option> 
                            <option value="A">上学期</option> 
                            <option value="B">下学期</option> 
                            </select> 
                    </td>
                    <td style="width:100px;">
                        <!--<a href="javascript:void(0);" id="btn_qry" class="btn"><span>抽查</span></a>-->
                        <input type="button" id="btn_qry" value="抽查" class="btn"  /></td>
                    <td style="width:120px;"></td>
                    <td style="width:auto;"></td>
                </tr>
                <tr>
                    <td style="width:100px;"><label for="cond_unit">单元设定</label></td>
                    <td style="width:120px;">
                        <select id="cond_unit" name="cond_unit" style="width:100px;"> 
                            <option value="">---全部---</option> 
                            <option value="1">单元1</option> 
                            <option value="2">单元2</option> 
                            <option value="3">单元3</option> 
                            </select> 
                    </td>
                    <td style="width:100px;"><input type="checkbox" id="cond_show_phrase" name="cond_show_phrase" value="Y"/>显示中文</td>
                    <td style="width:120px;">
                        
                    </td>
                    <!--<td style="width:100px;"></td>
                    <td style="width:120px;"></td>-->
                    <td colspan="3" style="width:auto;"><label id="words_total"></label></td>
                </tr>
                <!--<tr>
                    <td style="width:100px;"></td>
                    <td style="width:120px;"></td>
                    <td style="width:100px;"></td>
                    <td style="width:120px;"></td>
                    <td style="width:100px;"></td>
                    <td style="width:120px;"></td>
                    <td style="width:auto;"></td>
                </tr>-->
            </table>
            </div>   
        </div>

        <div id="phrase_result" >
            <!--<div class="container fl">
                <div class="piny">(xiě  zì)</div>
                <div class="phrase">写字</div>
            </div>
            <div class="container fl">
                <div class="piny">(hǎi  shang)</div>
                <div class="phrase">海上</div>
            </div>
            <div class="container fl">
                <div class="piny">(mì  fēng)</div>
                <div class="phrase">蜜蜂</div>
            </div>
            <div class="container fl">
                <div class="piny">(fēng  ping  làng  jìng)</div>
                <div class="phrase">风平浪静</div>
            </div>-->
        </div>

        <div id="divload"></div>

        <div id="Pagination" class="tc"></div>
    </form>
</body>
</html>

<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="EnWordsExam.aspx.cs" Inherits="MyStudy.EnWordsExam" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>eStudy - 单词抽查</title>
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
        var v_empty_tip = '哦噢，没有单词啦！';
        var v_youdao_url = "http://dict.youdao.com/dictvoice?audio=";//有道网址
        var v_youdao_opt = "&amp;type=1";//有道发音 1.英式 2.美式

        $().ready(function () {
            $("#Navigation").creNavigation('', 'NAVS_ENWRD');
            // 页面控件初始化
            $("#cond_show_pron").attr("checked", true);
            $("#cond_show_mean").attr("checked", true);
            $("#cond_rate").attr("disabled", "disabled");
            $("#lbl_rate").css('color', '#999');
            if ($.getUrlVar('Iswt') == 'Y') {
                $("#cond_iswt").attr("checked", true);
                $("#cond_rate").removeAttr("disabled");
                $("#lbl_rate").css('color', '#000');
            }
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
            $("#cond_iswt").change(function () {
                if ($("#cond_iswt").attr("checked")) {
                    $("#cond_rate").removeAttr("disabled");
                    $("#lbl_rate").css('color', '#000');
                } else {
                    $("#cond_rate").attr("disabled", "disabled");
                    $("#lbl_rate").css('color', '#999');
                }
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
            //var objs = new Object();
            //objs.cond_grad = $("#cond_grad").attr("value");
            //objs.cond_term = $("#cond_term").attr("value");
            //objs.cond_modu = $("#cond_modu").attr("value");
            //objs.cond_unit = $("#cond_unit").attr("value");
            //objs.cond_iswt = ($("#cond_iswt").attr("checked")) ? $("#cond_show_pron").attr("value") : '';
            //objs.cond_show_pron = ($("#cond_show_pron").attr("checked")) ? $("#cond_show_pron").attr("value") : '';
            //objs.cond_show_mean = ($("#cond_show_mean").attr("checked")) ? $("#cond_show_mean").attr("value") : '';
            //objs.cond_rate = $("#cond_rate").attr("value");

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
                Modu: "MODULE",
                Unit: "UNIT",
                TipsRate: "TIPSRATE"
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
                        $("#cond_modu").append("<option value=\"\">---全部---</option>");
                        $("#cond_unit").append("<option value=\"\">---全部---</option>");
                    } else if (p_CatgCd == dics.Grad) {
                        $("#cond_grad").append("<option value=\"\">---全部---</option>");
                    } else if (p_CatgCd == dics.Term) {
                        $("#cond_term").append("<option value=\"\">---全部---</option>");
                    } else if (p_CatgCd == dics.Modu) {
                        $("#cond_modu").append("<option value=\"\">---全部---</option>");
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
                        //模组
                        if (r.DicCatgCd == dics.Modu) {
                            $("#cond_modu").append("<option value='" + r.DicKeys + "'>" + r.DicValues + "</option>");
                            if (r.IsDefault == "Y") {
                                $("#cond_modu").val(r.DicKeys);
                            }
                        }
                        //单元
                        if (r.DicCatgCd == dics.Unit) {
                            $("#cond_unit").append("<option value='" + r.DicKeys + "'>" + r.DicValues + "</option>");
                            if (r.IsDefault == "Y") {
                                $("#cond_unit").val(r.DicKeys);
                            }
                        }
                        //字母提示比
                        if (r.DicCatgCd == dics.TipsRate) {
                            $("#cond_rate").append("<option value='" + r.DicKeys + "'>" + r.DicValues + "</option>");
                            if (r.IsDefault == "Y") {
                                $("#cond_rate").val(r.DicKeys);
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
                url: 'Handler/EnWordsExamHandler.ashx',//目标地址
                data:{QryType: "CNT",
                    PageIndex: pageIndex,
                    PageSize: pageSize,
                    Iswt: conds.cond_iswt, 
                    Grad: conds.cond_grad,
                    Term: conds.cond_term,
                    Modu: conds.cond_modu,
                    Unit: conds.cond_unit,
                    ShowPron: conds.cond_show_pron,
                    ShowMean: conds.cond_show_mean
                },
                async: false,//同步
                success: function (data) {
                    dataRowCnt = data.DataCnt;
                }
            });
            $("#words_total").text("[ 单词共计：" + dataRowCnt + " ]");
            return dataRowCnt;
        }

        // ajax方式请求显示数据 
        function InitTable(pageIndex) {
            var conds = getCondtionsFromForm();
            var newcontent = "";
            $.ajax({
                type: "POST",//用POST方式传输
                dataType: "json",//数据格式:JSON
                url: 'Handler/EnWordsExamHandler.ashx',//目标地址
                data:{QryType: "LST",
                    PageIndex: pageIndex,
                    PageSize: pageSize,
                    Iswt: conds.cond_iswt, 
                    Grad: conds.cond_grad,
                    Term: conds.cond_term,
                    Modu: conds.cond_modu,
                    Unit: conds.cond_unit,
                    ShowPron: conds.cond_show_pron,
                    ShowMean: conds.cond_show_mean,
                    TipsRate: conds.cond_rate
                },
                beforeSend: function () { $("#divload").show(); $("#word_result").hide(); },//发送数据之前
                complete: function () { $("#divload").hide(); $("#word_result").show(); },//接收数据完毕
                success: function (data) {
                    $("#word_result > *").remove();
                    var EnWordsData = data.DataList;
                    $.each(EnWordsData, function (i, r) {
                        newcontent += "<div class=\"container fl\">";
                        newcontent += (conds.cond_iswt == "Y" ? "<div class=\"word word_spell\">" : "<div class=\"word\">")
                            + r.Word
                            + "<span><a href=\"javascript:void(0);\" title=\"" + r.WordOrig + "\">&nbsp</a></span>"
                            + "</div>";
                        if (conds.cond_show_pron == 'Y'){
                            newcontent += "<div class=\"pron\">" + r.Pron
                                + "<span><a href=\"javascript:void(0);\" title=\"真人发音(英)\" class=\"dictvoice\" id=\"dictVoice_" + i + "\"></a></span>"
                                + "</div>";
                            tmpAutioHtml = '<div><audio id="AdictVoice_' + i + '" preload="auto" style="display: none" '
                            + 'src="' + v_youdao_url + r.WordOrig + v_youdao_opt + '"></aduio></div>';
                            newcontent += tmpAutioHtml;
                        }else{
                            newcontent += "<div class=\"pron\"></div>";
                        }
                        if (conds.cond_show_mean == 'Y') {
                            newcontent += "<div class=\"mean\">" + r.Mean + "</div>";
                        } else {
                            newcontent += "<div class=\"mean\"> </div>";
                        }
                        newcontent += "</div>";
                    });
                    // 每页显示补齐
                    if (EnWordsData.length < pageSize) {
                        for (var i = 0; i < (pageSize - EnWordsData.length); i++) {
                            newcontent += "<div class=\"container fl\">";
                            newcontent += "<div class=\"word\"></div>";
                            newcontent += "<div class=\"pron\">" + v_empty_tip + "</div>";
                            newcontent += "<div class=\"mean\"></div>";
                            newcontent += "</div>";
                        }
                    }
                    $("#word_result").html(newcontent);

                    $("#word_result").each(function () {                
                        $(this).children("div").hover(function(){
                            $(this).children("div").addClass('mouseover');
                        }, function(){
                            $(this).children("div").removeClass('mouseover');
                        });
                    });

                    $(".dictvoice").each(function () {
                        $(this).hover(function () {
                            var targetId = "#A" + $(this).attr("id");
                            $(targetId)[0].play();//播放
                        }, function () {
                            //var targetId = "#A" + $(this).attr("id");
                            //$(targetId)[0].preload();//
                        });
                        $(this).click(function () {
                            var targetId = "#A" + $(this).attr("id");
                            $(targetId)[0].play();//播放
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
                    <td style="width:100px;"><input type="checkbox" id="cond_iswt" name="cond_iswt" value="Y"/>拼写检查</td>
                    <td style="width:120px;"></td>
                    <td style="width:auto;"></tr>
                <tr>
                    <td style="width:100px;"><label for="cond_modu">模组设定</label></td>
                    <td style="width:120px;">
                        <select id="cond_modu" name="cond_modu" style="width:100px;"> 
                            <option value="">---全部---</option> 
                            <option value="1">模组1</option> 
                            <option value="2">模组2</option> 
                            <option value="3">模组3</option> 
                            <option value="4">模组4</option> 
                            </select> 
                    </td>
                    <td style="width:100px;"><label for="cond_unit">单元设定</label></td>
                    <td style="width:120px;">
                        <select id="cond_unit" name="cond_unit" style="width:100px;"> 
                            <option value="">---全部---</option> 
                            <option value="1">单元1</option> 
                            <option value="2">单元2</option> 
                            <option value="3">单元3</option> 
                            </select> 
                    </td>
                    <td style="width:100px;"><label for="cond_rate" id="lbl_rate">字母提示比例</label></td>
                    <td style="width:120px;">
                        <select id="cond_rate" name="cond_rate" style="width:100px;"> 
                            <option value="0">0%</option> 
                            <option value="10">10%</option> 
                            <option value="20">20%</option> 
                            <option value="30">30%</option> 
                            
                            </select>
                    </td>
                    <td style="width:auto;">
                        <!--<a href="javascript:void(0);" id="btn_qry" class="btn"><span>抽查</span></a>-->
                        <input type="button" id="btn_qry" value="抽查" class="btn"  />
                    </td>
                </tr>
                <tr>
                    <td style="width:100px;"><input type="checkbox" id="cond_show_pron" name="cond_show_pron" value="Y"/>显示音标</td>
                    <td style="width:120px;"><input type="checkbox" id="cond_show_mean" name="cond_show_mean" value="Y"/>显示中文意思</td>
                    <td style="width:100px;"></td>
                    <td style="width:120px;"></td>
                    <td style="width:100px;"></td>
                    <td style="width:120px;"></td>
                    <td style="width:auto;"><label id="words_total"></label></td>
                </tr>
            </table>
            </div>   
        </div>

        <div id="word_result" >
            <!--<div class="container fl">
                <div class="word">Jim</div>
                <div class="pron">[dʒɪm]</div>
                <div class="mean">杰姆（人名）</div>
            </div>
            <div class="container fl">
                <div class="word">has</div>
                <div class="pron">[hæz]</div>
                <div class="mean">有（第三人称单数）</div>
            </div>
            <div class="container fl">
                <div class="word">chopsticks</div>
                <div class="pron">['tʃɒpstɪks]</div>
                <div class="mean">筷子</div>
            </div>
            <div class="container fl">
                <div class="word">pupil</div>
                <div class="pron">['pjuːpɪl; -p(ə)l]</div>
                <div class="mean">学生；未成年人</div>
            </div>-->
        </div>

        <div id="divload"></div>

        <div id="Pagination" class="tc"></div>
    </form>
</body>
</html>

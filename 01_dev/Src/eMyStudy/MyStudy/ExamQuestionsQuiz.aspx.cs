using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using MyStudyClass;

namespace MyStudy
{
    public partial class ExamQuestionsQuiz : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                //
            }
        }

        protected void btn_csv_Click(object sender, EventArgs e)
        {
            try
            {
                //System.Collections.Specialized.NameValueCollection nc = new System.Collections.Specialized.NameValueCollection(Request.Form);
                //string grad = nc.GetValues("cond_grad")[0].ToString();
                //string term = nc.GetValues("cond_term")[0].ToString();
                //string unit = nc.GetValues("cond_unit")[0].ToString();
                //string iswt = nc.GetValues("cond_show_phrase")[0].ToString();
                string subj = string.Empty;
                if (!string.IsNullOrEmpty(Request["cond_subj"]))
                    subj = Request["cond_subj"].ToString();
                string subj_txt = string.Empty;
                if (!string.IsNullOrEmpty(Request["hid_subj_txt"]))
                    subj_txt = Request["hid_subj_txt"].ToString();

                string grad = string.Empty;
                if (!string.IsNullOrEmpty(Request["cond_grad"]))
                    grad = Request["cond_grad"].ToString();
                string term = string.Empty;
                if (!string.IsNullOrEmpty(Request["cond_term"]))
                    term = Request["cond_term"].ToString();
                string qtyp = string.Empty;
                if (!string.IsNullOrEmpty(Request["cond_qtyp"]))
                    qtyp = Request["cond_qtyp"].ToString();
                int qlev = 0;
                int.TryParse(Request["cond_qlev"], out qlev);

                ExamQuestions cls = new ExamQuestions();
                cls.subj = subj;
                cls.grad = grad;
                cls.term = term;
                cls.qtyp = qtyp;
                cls.qlev = qlev;
                cls.pagesize = 0;
                cls.pageindex = -1;
                DataSet ds = new DataSet();
                ds = cls.GetPageExamQuestionsList();
                //重新编辑相关列
                if (ds != null && ds.Tables[0].Rows.Count > 0)
                {
                    for (int i = 1; i <= ds.Tables[0].Rows.Count; i++)
                    {
                        DataRow dr = ds.Tables[0].Rows[i - 1];
                        dr["ID"] = i;
                        //选项列为空时，题干列、选项列调整
                        if (dr["Qopt"] == null || dr["Qopt"].ToString().Trim() == "")
                        {
                            dr["Qopt"] = dr["Qbod"];
                            dr["Qbod"] = dr["Qtyp"];
                        }
                    }
                    ds.Tables[0].AcceptChanges();
                }

                string strFileName = "{0}{1}试题列表{2}";
                string strGrad = grad;
                string strTerm = term;
                string strSuj = (subj != "") ? " - " + subj_txt : "";
                strFileName = string.Format(strFileName, strGrad, strTerm, strSuj);
                string fontName = System.Web.Configuration.WebConfigurationManager.AppSettings["DefaultFontName"];
                string fontSize = System.Web.Configuration.WebConfigurationManager.AppSettings["DefaultFontSize"];
                string warpLen = System.Web.Configuration.WebConfigurationManager.AppSettings["DefaultWrapLength"];
                string oddeven = System.Web.Configuration.WebConfigurationManager.AppSettings["DefaultOddEvenFlag"];//2016.06.12 add

                EPPlusHelper epp = new EPPlusHelper();
                epp.opener = this;
                epp.dt = CreExamQuestionsPrtTable(ds.Tables[0]);
                epp.filename = strFileName;//2015.06.05 modify
                epp.istitle = false;
                epp.fontname = fontName;  // "微软雅黑","宋体"
                epp.fontsize = int.Parse(fontSize);//12->10
                epp.warplen = int.Parse(warpLen);
                epp.oddevenflag = int.Parse(oddeven);//2016.06.12 add

                int rtn = epp.ExamQuestionsDownloadToExcel2007();

            }
            catch (Exception ex)
            {

                throw;
            }
        }

        #region CreExamQuestionsPrtTable() : 生成报表用资料表
        /// <summary>
        /// 生成报表用资料表
        /// </summary>
        /// <returns></returns>
        private DataTable CreExamQuestionsPrtTable(DataTable dt)
        {
            //dt.DefaultView.Sort = "Subj ASC, Qtyp ASC, Grad ASC, Term ASC, Qlev ASC, ID ASC";    //排序
            DataTable dtTemp = dt.DefaultView.ToTable();
            //重新编辑相关列
            for (int i = 0; i < dtTemp.Rows.Count; i++)
            {
                DataRow dr = dtTemp.Rows[i];

                if (dr["Qbod"].ToString().Trim() == dr["QTyp"].ToString().Trim())
                {
                    dr["Qbod"] = dr["Qopt"];
                    dr["Qopt"] = "";
                }
            }
            dtTemp.AcceptChanges();

            DataTable dtRpt = new DataTable("Rpt");
            dtRpt.Columns.Add("TPNO"); //题目分类&行No
            dtRpt.Columns.Add("QBOD"); //题干&选项
            dtRpt.Columns.Add("QANS"); //答案填写栏

            string prvType = "";
            int TypeNo = 0;
            foreach (DataRow dr in dtTemp.Rows)
            {
                if (dr["QTyp"].ToString() != prvType)
                {
                    DataRow drType = dtRpt.NewRow();
                    drType["TPNO"] = dr["QTyp"].ToString() + "：";
                    //drType["QBOD"] = "";
                    //drType["QANS"] = "";
                    dtRpt.Rows.Add(drType);
                    TypeNo = 0;
                }

                TypeNo++;
                DataRow drBod = dtRpt.NewRow();
                drBod["TPNO"] = TypeNo.ToString() + "、";
                drBod["QBOD"] = dr["QBOD"];
                ////drBod["QANS"] = "(        )";
                //switch (dr["Subj"].ToString().Trim())
                //{
                //    case "语文": drBod["QANS"] = ""; break;
                //    case "数学": drBod["QANS"] = (dr["Qtyp"].ToString() != "判断") ? "" : "(        )"; break;
                //    case "英语": drBod["QANS"] = "(        )"; break;
                //    default: drBod["QANS"] = ""; break;
                //}
                string qtypCd = dr["QtypCd"].ToString().Trim();
                switch (dr["SubjCd"].ToString().Trim().ToUpper())
                {
                    case "CN": drBod["QANS"] = ""; break;
                    case "SX": drBod["QANS"] = (qtypCd == "1") ? "(        )" : ""; break;//数学.判断题
                    case "EN": drBod["QANS"] = (qtypCd == "1" || qtypCd == "2" || qtypCd == "3" || qtypCd == "7") ?
                        "(        )" : ""; break;//英语.选不同类单词、选同类单词、选择题、判断题
                    default: drBod["QANS"] = ""; break;
                }
                dtRpt.Rows.Add(drBod);

                //【选项】栏有值时，将【选项】栏资料作为新行追加
                if (dr["Qopt"].ToString().Trim() != "")
                {
                    DataRow drOpt = dtRpt.NewRow();
                    drOpt["TPNO"] = "";
                    drOpt["QBOD"] = dr["Qopt"];
                    drOpt["QANS"] = "";
                    dtRpt.Rows.Add(drOpt);
                }

                //2016.04.07 DEL
                #region //Delte
                ////语文【拼音写词语】、【连词成句】类题目，追加一空行
                ////获取[QBOD]列资料长度
                //string strQBOD = Convert.ToString(dr["Qbod"]);
                //int intLen = 0;
                //for (int i = 0; i < strQBOD.Length; i++)
                //{
                //    byte[] b = System.Text.Encoding.Default.GetBytes(strQBOD.Substring(i, 1));
                //    if (b.Length > 1)
                //        intLen += 2;
                //    else
                //        intLen += 1;
                //}
                //if (dr["Qtyp"].ToString().Trim() == "拼音写词语" || dr["Qtyp"].ToString().Trim() == "连词成句")
                //{
                //    DataRow drPY = dtRpt.NewRow();
                //    drPY["TPNO"] = "";
                //    drPY["QBOD"] = intLen > 0 ? "".PadRight(intLen, '_') : "";
                //    drPY["QANS"] = "";
                //    dtRpt.Rows.Add(drPY);
                //}

                ////数学【应用题】题目，追加三空行
                //if (dr["Qtyp"].ToString().Trim() == "应用题")
                //{
                //    for (int i = 0; i < 3; i++)
                //    {
                //        DataRow drPY = dtRpt.NewRow();
                //        drPY["TPNO"] = "";
                //        drPY["QBOD"] = "";
                //        drPY["QANS"] = "";
                //        dtRpt.Rows.Add(drPY);
                //    }
                //}
                #endregion
                //2016.04.07 ADD
                //语文【拼音写词语】、【连词成句/改句】；数学【应用题】、【计算】；英语【改写句子】等类题目，追加空行
                if (int.Parse(dr["AddRow"].ToString()) > 0)
                {
                    int addRows = int.Parse(dr["AddRow"].ToString());
                    string addStr = dr["AddChar"].ToString();
                    //获取[QBOD]列资料长度
                    string strQBOD = Convert.ToString(dr["Qbod"]);
                    //int intLen = 0;
                    //for (int i = 0; i < strQBOD.Length; i++)
                    //{
                    //    byte[] b = System.Text.Encoding.Default.GetBytes(strQBOD.Substring(i, 1));
                    //    if (b.Length > 1)
                    //        intLen += 2;
                    //    else
                    //        intLen += 1;
                    //}
                    int intLen = System.Text.Encoding.Default.GetBytes(strQBOD).Length;
                    string warpLen = System.Web.Configuration.WebConfigurationManager.AppSettings["DefaultWrapLength"];//2016.06.12 add
                    if (intLen > int.Parse(warpLen)) intLen = int.Parse(warpLen);//2016.06.12 add
                    for (int i = 0; i < addRows; i++)
                    {
                        DataRow drAppend = dtRpt.NewRow();
                        drAppend["TPNO"] = "";
                        drAppend["QBOD"] = "";
                        if (!string.IsNullOrEmpty(addStr))
                        {
                            drAppend["QBOD"] = intLen > 0 ? "".PadRight(intLen, addStr.ToCharArray()[0]) : "";
                        }
                        drAppend["QANS"] = "";
                        dtRpt.Rows.Add(drAppend);
                    }
                }
                //<---

                prvType = dr["QTyp"].ToString();
            }

            //参考答案作成 2016.04.11
            prvType = "";
            TypeNo = 0;
            string strAns = "";
            DataRow drAns = dtRpt.NewRow();
            drAns["TPNO"] = "参考答案：";
            dtRpt.Rows.Add(drAns);
            DataTable dtAns = dt.DefaultView.ToTable();
            foreach (DataRow dr in dt.Rows)
            {
                if (dr["QTyp"].ToString() == prvType)
                    continue;

                DataRow drType = dtRpt.NewRow();
                drType["TPNO"] = dr["QTyp"].ToString() + "：";
                dtRpt.Rows.Add(drType);

                DataView dv = dt.DefaultView;
                dv.RowFilter = "QTyp = '" + dr["QTyp"].ToString() + "'";
                dtAns = dv.ToTable();
                TypeNo = 0;
                strAns = "";
                for (int i = 0; i < dtAns.Rows.Count; i++)
                {
                    TypeNo++;
                    strAns += TypeNo.ToString() + "、" + dtAns.Rows[i]["Qans"].ToString() + "   ";
                }
                DataRow drBod = dtRpt.NewRow();
                drBod["TPNO"] = "";
                drBod["QBOD"] = strAns;
                drBod["QANS"] = "";
                dtRpt.Rows.Add(drBod);
                prvType = dr["QTyp"].ToString();
            }

            dtRpt.AcceptChanges();

            return dtRpt;
        }
        #endregion
        

    }
}
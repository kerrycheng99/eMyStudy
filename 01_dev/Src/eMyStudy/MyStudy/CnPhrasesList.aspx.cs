using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using MyStudyClass;

namespace MyStudy
{
    public partial class CnPhrasesList : System.Web.UI.Page
    {
        //public string pageCount = string.Empty; //总条目数 
        private int PRT_ROW_ITEMS = 5;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                //string iswt = Request.QueryString["Iswt"];
                //string grad = Request.QueryString["Grad"];
                //string term = Request.QueryString["Term"];
                //string modu = Request.QueryString["Modu"];
                //string unit = Request.QueryString["Unit"];

                //EnWords cls = new EnWords();
                //cls.iswt = iswt;
                //cls.grad = grad;
                //cls.term = term;
                //cls.modu = modu;
                //cls.unit = unit;

                //int cnt = cls.GetEnWordsExamCount();
                //pageCount = cnt.ToString();
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
                string grad = string.Empty;
                if (!string.IsNullOrEmpty(Request["cond_grad"]))
                    grad = Request["cond_grad"].ToString();
                string term = string.Empty;
                if (!string.IsNullOrEmpty(Request["cond_term"]))
                    term = Request["cond_term"].ToString();
                string unit = string.Empty;
                if (!string.IsNullOrEmpty(Request["cond_unit"]))
                    unit = Request["cond_unit"].ToString();
                string iswt = string.Empty;
                if (!string.IsNullOrEmpty(Request["cond_show_phrase"]))
                    iswt = Request["cond_show_phrase"].ToString();

                CnPhrases cls = new CnPhrases();
                cls.grad = grad;
                cls.term = term;
                cls.unit = unit;
                cls.pagesize = 0;
                cls.pageindex = -1;
                DataSet ds = new DataSet();
                ds = cls.GetCnPhrasesToExcelList();

                string strFileName = "{0}{1}语文词语表{2}{3}";
                string strGrad = grad;
                string strTerm = term;
                string strUnit = (!string.IsNullOrEmpty(unit)) ? "-U" + unit : "";
                string strIsWt = (iswt != "Y") ? " - 拼写检查" : "";
                strFileName = string.Format(strFileName, strGrad, strTerm, strUnit, strIsWt);

                EPPlusHelper epp = new EPPlusHelper();
                epp.opener = this;
                epp.dt = CreCnPhrasePrtTable(ds.Tables[0], iswt);//ds.Tables[0];
                //epp.filename = (iswt == "Y") ? "语文词语表" : "语文词语表-拼写检查";
                epp.filename = strFileName;//2015.06.05 modify
                epp.istitle = false;
                epp.fontname = "微软雅黑";  // "宋体";
                epp.fontsize = 12;
                int rtn = epp.CnPhrasesDownloadToExcel2007();
            }
            catch (Exception)
            {
                throw;
            }

        }

        #region CreCnPhrasePrtTable() : 生成语文词语报表用资料表
        /// <summary>
        /// 生成语文词语报表用资料表
        /// </summary>
        /// <returns></returns>
        private DataTable CreCnPhrasePrtTable(DataTable dt, string IsWrite)
        {
            //从数据库查询时已排序
            //dt.DefaultView.Sort = "Grad ASC, Term ASC, Unit ASC, Lesn ASC, ID ASC";    //排序
            //DataTable dtTemp = dt.DefaultView.ToTable();
            DataTable dtTemp = dt;

            DataTable dtRpt = new DataTable("Rpt");
            dtRpt.Columns.Add("PINY1"); //词语拼音1
            dtRpt.Columns.Add("SPLT1");
            dtRpt.Columns.Add("PINY2"); //词语拼音2
            dtRpt.Columns.Add("SPLT2");
            dtRpt.Columns.Add("PINY3"); //词语拼音3
            dtRpt.Columns.Add("SPLT3");
            dtRpt.Columns.Add("PINY4"); //词语拼音4
            dtRpt.Columns.Add("SPLT4");
            dtRpt.Columns.Add("PINY5"); //词语拼音5

            string prvRowDist = "";
            string curRowDist = "";
            for (int i = 0; i < dtTemp.Rows.Count; i++)
            {
                DataRow dr = dtTemp.Rows[i];
                curRowDist = dr["GRAD"].ToString().Trim() + "|" + dr["TERM"].ToString().Trim() + "|" + dr["UNIT"].ToString().Trim();

                //动态计算每行词语数（最多5个）
                int Try_Prt_Row_Items = PRT_ROW_ITEMS;
                for (int y = 0; y < PRT_ROW_ITEMS; y++)
                {
                    if (i + y < dtTemp.Rows.Count)
                    {
                        DataRow Trydr = dtTemp.Rows[i + y];
                        string TryRowDist = Trydr["GRAD"].ToString().Trim() + "|" + Trydr["TERM"].ToString().Trim() + "|" + Trydr["UNIT"].ToString().Trim();
                        if (curRowDist != TryRowDist)
                        {
                            Try_Prt_Row_Items = y;
                            break;
                        }
                    }
                }

                DataRow drPINY = dtRpt.NewRow();
                DataRow drWORD = dtRpt.NewRow();
                string drColPINY = "PINY";
                int ColIdx = 0;
                for (int x = i; x < (i + Try_Prt_Row_Items) && x < dtTemp.Rows.Count; x++)
                {
                    dr = dtTemp.Rows[x];
                    curRowDist = dr["GRAD"].ToString().Trim() + "|" + dr["TERM"].ToString().Trim() + "|" + dr["UNIT"].ToString().Trim();
                    if (curRowDist != prvRowDist)
                    {
                        if (prvRowDist != "")
                        {
                            DataRow drEmpty = dtRpt.NewRow();
                            dtRpt.Rows.Add(drEmpty);
                        }
                        DataRow drBod = dtRpt.NewRow();
                        drBod["PINY3"] = dr["GRAD"].ToString() + dr["TERM"].ToString() + " 第" + dr["UNIT"].ToString() + "单元";
                        dtRpt.Rows.Add(drBod);
                    }

                    ColIdx++;
                    drColPINY = "PINY" + ColIdx.ToString();
                    drPINY[drColPINY] = dtTemp.Rows[x]["PINY"].ToString();
                    if (IsWrite == "Y")
                    {
                        drWORD[drColPINY] = dtTemp.Rows[x]["WORD"].ToString();
                    }
                    else
                    {
                        drWORD[drColPINY] = "______________________";
                    }

                    prvRowDist = curRowDist;
                }
                dtRpt.Rows.Add(drPINY);
                dtRpt.Rows.Add(drWORD);
                i += ColIdx - 1;

            }

            dtRpt.AcceptChanges();

            return dtRpt;
        }
        #endregion

    }
}
using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using MyStudyClass;

namespace MyStudy
{
    public partial class EnWordsList : System.Web.UI.Page
    {
        //public string pageCount = string.Empty; //总条目数 
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                //EnWords cls = new EnWords();
                //int cnt = cls.GetEnWordsCount();
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
                string modu = string.Empty;
                if (!string.IsNullOrEmpty(Request["cond_modu"]))
                    modu = Request["cond_modu"].ToString();
                string unit = string.Empty;
                if (!string.IsNullOrEmpty(Request["cond_unit"]))
                    unit = Request["cond_unit"].ToString();
                string iswt = string.Empty;
                if (!string.IsNullOrEmpty(Request["cond_iswt"]))
                    iswt = Request["cond_iswt"].ToString();
                string enwd = string.Empty;
                if (!string.IsNullOrEmpty(Request["cond_enwd"]))
                    enwd = Request["cond_enwd"].ToString();

                EnWords cls = new EnWords();
                cls.grad = grad;
                cls.term = term;
                cls.modu = modu;
                cls.unit = unit;
                cls.iswt = iswt;
                cls.enwd = enwd;
                cls.pagesize = 0;
                cls.pageindex = -1;
                DataSet ds = new DataSet();
                if (iswt != "Y")
                    ds = cls.GetEnWordsToExcelList();
                else
                    ds = cls.GetEnWordsSpellToExcelList();

                string strFileName = "{0}{1}英语单词列表{2}{3}{4}";
                string strGrad = grad;
                string strTerm = term;
                string strModu = (!string.IsNullOrEmpty(modu)) ? "-M" + modu : "";
                string strUnit = (!string.IsNullOrEmpty(unit)) ? "-U" + unit : "";
                string strIsWt = (iswt == "Y") ? " - 拼写检查" : "";
                strFileName = string.Format(strFileName, strGrad, strTerm, strModu, strUnit, strIsWt);

                EPPlusHelper epp = new EPPlusHelper();
                epp.opener = this;
                epp.dt = ds.Tables[0];
                //epp.filename = (iswt != "Y") ? "英语单词列表" : "英语单词列表-拼写检查";
                epp.filename = strFileName;//2015.06.05 modify
                epp.istitle = true;
                int rtn = epp.EnWordsDownloadToExcel2007();
            }
            catch (Exception ex)
            {

                throw;
            }


        }

    }
}
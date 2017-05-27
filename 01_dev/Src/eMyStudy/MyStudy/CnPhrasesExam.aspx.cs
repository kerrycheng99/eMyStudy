using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using MyStudyClass;

namespace MyStudy
{
    public partial class CnPhrasesExam : System.Web.UI.Page
    {
        //public string pageCount = string.Empty; //总条目数 
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
    }
}
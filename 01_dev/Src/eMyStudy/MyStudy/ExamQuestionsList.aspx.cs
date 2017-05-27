using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using MyStudyClass;

namespace MyStudy
{
    public partial class ExamQuestionsList : System.Web.UI.Page
    {
        //public string pageCount = string.Empty; //总条目数 
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                //string subj = Request.QueryString["Subj"];

                //ExamQuestions cls = new ExamQuestions();
                //cls.subj = subj;//科目
                //int cnt = cls.GetExamQuestionsCount();
                //pageCount = cnt.ToString();
            }
        }
    }
}
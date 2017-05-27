using System;
using System.Collections.Generic;
using System.Web;
using System.Data;
using MyStudyClass;

namespace MyStudy.Handler
{
    /// <summary>
    /// Summary description for ExamQuestionsHandler
    /// </summary>
    public class ExamQuestionsHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            //context.Response.ContentType = "text/plain";
            //context.Response.Write("Hello World");
            //不让浏览器缓存
            context.Response.Buffer = true;
            context.Response.ExpiresAbsolute = DateTime.Now.AddDays(-1);
            context.Response.AddHeader("pragma", "no-cache");
            context.Response.AddHeader("cache-control", "");
            context.Response.CacheControl = "no-cache";
            context.Response.ContentType = "text/plain";

            //查询类别：CNT.记录总数 LST.明细列表
            string qtytype = "LST";
            if (!string.IsNullOrEmpty(context.Request["QryType"]))
                qtytype = context.Request["QryType"].ToString();

            //具体的页面数  
            int pageIndex;
            int.TryParse(context.Request["PageIndex"], out pageIndex);
            //页面显示条数  
            int pageSize = Convert.ToInt32(context.Request["PageSize"]);

            //if (pageIndex == 0) { pageIndex = 1; }
            if (pageSize == 0) { pageSize = 20; }

            string grad = string.Empty;
            if (!string.IsNullOrEmpty(context.Request["Grad"]))
                grad = context.Request["Grad"].ToString();
            string term = string.Empty;
            if (!string.IsNullOrEmpty(context.Request["Term"]))
                term = context.Request["Term"].ToString();
            string subj = string.Empty;
            if (!string.IsNullOrEmpty(context.Request["Subj"]))
                subj = context.Request["Subj"].ToString();
            string qtyp = string.Empty;
            if (!string.IsNullOrEmpty(context.Request["Qtyp"]))
                qtyp = context.Request["Qtyp"].ToString();
            int qlev = 0;
            int.TryParse(context.Request["Qlev"], out qlev);
            string usercd = string.Empty; ;
            if (!string.IsNullOrEmpty(context.Request["UserCd"]))
                usercd = context.Request["UserCd"].ToString();

            ExamQuestions cls = new ExamQuestions();
            cls.subj = subj;
            cls.grad = grad;
            cls.term = term;
            cls.qtyp = qtyp;
            cls.qlev = qlev;
            cls.usercd = usercd;
            cls.pagesize = pageSize;
            cls.pageindex = pageIndex;

            string jsonData = "";
            if (qtytype == "LST")
            {
                DataSet ds = new DataSet();
                ds = cls.GetPageExamQuestionsList();

                //重新编辑相关列
                if (ds != null && ds.Tables[0].Rows.Count > 0)
                {
                    for (int i = 1; i <= ds.Tables[0].Rows.Count; i++)
                    {
                        DataRow dr = ds.Tables[0].Rows[i - 1];
                        dr["ID"] = i + (pageSize * pageIndex);
                        //选项列为空时，题干列、选项列调整
                        if (dr["Qopt"] == null || dr["Qopt"].ToString().Trim() == "")
                        {
                            dr["Qopt"] = dr["Qbod"];
                            dr["Qbod"] = dr["Qtyp"];
                        }
                    }
                    ds.Tables[0].AcceptChanges();
                }

                if (ds == null)
                    jsonData = "";
                else
                    jsonData = JsonHelper.DataTableToJSON(ds.Tables[0], "DataList");
            }
            if (qtytype == "CNT")
            {
                int cnt = cls.GetExamQuestionsCount();
                jsonData = JsonHelper.StringToJSON(cnt.ToString(), "DataCnt");
            }

            context.Response.Write(jsonData);
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}
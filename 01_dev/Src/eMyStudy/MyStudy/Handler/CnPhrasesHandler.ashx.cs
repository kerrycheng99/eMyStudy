using System;
using System.Collections.Generic;
using System.Web;
using System.Data;
using MyStudyClass;

namespace MyStudy.Handler
{
    /// <summary>
    /// Summary description for EnWordsHandler
    /// </summary>
    public class CnPhrasesExamHandler : IHttpHandler
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
            string unit = string.Empty;
            if (!string.IsNullOrEmpty(context.Request["Unit"]))
                unit = context.Request["Unit"].ToString();
            string iswt = string.Empty;
            //if (!string.IsNullOrEmpty(context.Request["Iswt"]))
            //    iswt = context.Request["Iswt"].ToString();
            
            string usercd = string.Empty; ;
            if (!string.IsNullOrEmpty(context.Request["UserCd"]))
                usercd = context.Request["UserCd"].ToString();

            CnPhrases cls = new CnPhrases();
            cls.grad = grad;
            cls.term = term;
            cls.unit = unit;
            cls.usercd = usercd;
            cls.pagesize = pageSize;
            cls.pageindex = pageIndex;
            cls.iswt = iswt;

            string jsonData = "";
            if (qtytype == "LST")
            {
                DataSet ds = new DataSet();
                ds = cls.GetPageCnPhrasesList();

                if (ds == null)
                    jsonData = "";
                else
                    jsonData = JsonHelper.DataTableToJSON(ds.Tables[0], "DataList");
            }
            if (qtytype == "CNT")
            {
                int cnt = cls.GetCnPhrasesCount();
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
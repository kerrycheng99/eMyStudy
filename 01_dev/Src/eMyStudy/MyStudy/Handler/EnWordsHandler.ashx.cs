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
    public class EnWordsHandler : IHttpHandler
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
            string qrytype = "LST";
            if (!string.IsNullOrEmpty(context.Request["QryType"]))
                qrytype = context.Request["QryType"].ToString();

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
            string modu = string.Empty;
            if (!string.IsNullOrEmpty(context.Request["Modu"]))
                modu = context.Request["Modu"].ToString();
            string unit = string.Empty;
            if (!string.IsNullOrEmpty(context.Request["Unit"]))
                unit = context.Request["Unit"].ToString();
            string iswt = string.Empty;
            if (!string.IsNullOrEmpty(context.Request["Iswt"]))
                iswt = context.Request["IsWt"].ToString();
            string usercd = string.Empty; ;
            if (!string.IsNullOrEmpty(context.Request["UserCd"]))
                usercd = context.Request["UserCd"].ToString();
            string enwd = string.Empty;
            if (!string.IsNullOrEmpty(context.Request["EnWd"]))
                enwd = context.Request["EnWd"].ToString();

            EnWords cls = new EnWords();
            cls.grad = grad;
            cls.term = term;
            cls.modu = modu;
            cls.unit = unit;
            cls.iswt = iswt;
            cls.enwd = enwd;
            cls.usercd = usercd;
            cls.pagesize = pageSize;
            cls.pageindex = pageIndex;

            string jsonData = "";
            if (qrytype == "LST")
            {
                DataSet ds = cls.GetPageEnWordsList();
                if (ds == null)
                    jsonData = "";
                else
                    jsonData = JsonHelper.DataTableToJSON(ds.Tables[0], "DataList");
            }
            if (qrytype == "CNT")
            {
                int cnt = cls.GetEnWordsCount();
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
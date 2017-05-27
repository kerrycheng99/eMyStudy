using System;
using System.Collections.Generic;
using System.Web;
using System.Data;
using MyStudyClass;

namespace MyStudy.Handler
{
    /// <summary>
    /// Summary description for TimeTableHandler
    /// </summary>
    public class TimeTableHandler : IHttpHandler
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

            string usercd = string.Empty;
            if (!string.IsNullOrEmpty(context.Request["UserCd"]))
            {
                usercd = context.Request["UserCd"].ToString();
            }
            Curriculum cls = new Curriculum();
            cls.usercd = usercd;

            DataSet ds = cls.GetUserTimeTableList();
            string jsonData = "";
            //if (ds == null || ds.Tables[0].Rows.Count == 0)
            if (ds == null)
                jsonData = "";
            else
                jsonData = JsonHelper.DataTableToJSON(ds.Tables[0], "Curriculum");
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
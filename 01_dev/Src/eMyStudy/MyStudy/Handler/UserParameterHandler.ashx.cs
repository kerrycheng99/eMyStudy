using System;
using System.Collections.Generic;
using System.Web;
using System.Data;
using MyStudyClass;

namespace MyStudy.Handler
{
    /// <summary>
    /// Summary description for UserParameterHandler
    /// </summary>
    public class UserParameterHandler : IHttpHandler
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

            string usercd = string.Empty; ;
            if (!string.IsNullOrEmpty(context.Request["UserCd"]))
            {
                usercd = context.Request["UserCd"].ToString();
            }
            UserParameter cls = new UserParameter();
            cls.usercd = usercd;

            DataSet ds = cls.GetUserParameter();
            string jsonData = "";
            if (ds == null)
                jsonData = "";
            else
                jsonData = JsonHelper.DataTableToJSON(ds.Tables[0], "UserPara");
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
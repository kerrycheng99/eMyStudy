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
    public class SysDictionaryHandler : IHttpHandler
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

            string diccatgcd = string.Empty;
            if (!string.IsNullOrEmpty(context.Request["DicCatgCd"]))
            {
                diccatgcd = context.Request["DicCatgCd"].ToString();
            }
            string dickeys = string.Empty;
            if (!string.IsNullOrEmpty(context.Request["DicKeys"]))
            {
                dickeys = context.Request["DicKeys"].ToString();
            }
            string dickeys02 = string.Empty;
            if (!string.IsNullOrEmpty(context.Request["DicKeys02"]))
            {
                dickeys02 = context.Request["DicKeys02"].ToString();
            }

            SysDictionary cls = new SysDictionary();
            cls.diccatgcd = diccatgcd;
            cls.dickeys = dickeys;
            cls.dickeys02 = dickeys02;

            DataSet ds = cls.GetSysDictionaryList();
            string jsonData = "";
            if (ds == null)
                jsonData = "";
            else
                jsonData = JsonHelper.DataTableToJSON(ds.Tables[0], "SysDic");
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
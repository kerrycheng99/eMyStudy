using System;
using System.Collections.Generic;

using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using System.Text;
using System.Data;
using MyStudyClass;

namespace MyStudy
{
    public partial class TimeTable : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                //BindUserTimeTable();
            }
        }

        
        ///// <summary>
        ///// 绑定用户课程表数据
        ///// </summary>
        //protected void BindUserTimeTable()
        //{
        //    Curriculum cls = new Curriculum();
        //    cls.usercd = "*";

        //    DataSet ds = cls.GetUserTimeTableList();

        //    if (ds == null || ds.Tables[0].Rows.Count == 0)
        //        GridViewMsg.InnerText = "not record";
        //    else
        //        GridViewMsg.InnerText = ds.Tables[0].Rows.Count + " record";

        //    UserList.DataSource = ds;
        //    UserList.DataBind();
        //}

        /// <summary>
        /// 获得用户分组数据列表
        /// </summary>
        /// <param name="strWhere">Where条件</param>
        /// <returns></returns>
        //public DataSet GetUserTimeTableList(string strWhere)
        //{
        //    SQLiteHelper db = new SQLiteHelper();
        //    StringBuilder strSql = new StringBuilder();
        //    strSql.Append("select ID, Interval, LessonNo, Mon, Tue, Wed, Thu, Fri FROM UserTimeTable_V1 ");

        //    if (strWhere.Trim() != "")
        //    {
        //        strSql.Append(" where " + strWhere);
        //    }
        //    strSql.Append(" order by LessonsID");

        //    //return SQLiteHelper.DbDataSet(strSql.ToString(), "tbl");
        //    return db.DbDataSet(strSql.ToString(), "tbl");
        //}

        //protected void UserList_PageIndexChanging(object sender, GridViewPageEventArgs e)
        //{
        //    UserList.PageIndex = e.NewPageIndex;
        //    BindUserTimeTable();
        //}

        //protected void UserList_RowDataBound(object sender, GridViewRowEventArgs e)
        //{
        //    if (e.Row.RowType == DataControlRowType.DataRow)
        //    {
        //        e.Row.Attributes.Add("onmouseover", "currentcolor=this.style.backgroundColor;this.style.backgroundColor='#ffffcd',this.style.fontWeight='';");
        //        e.Row.Attributes.Add("onmouseout", "this.style.backgroundColor=currentcolor,this.style.fontWeight='';");
        //    }
        //}

    }
}
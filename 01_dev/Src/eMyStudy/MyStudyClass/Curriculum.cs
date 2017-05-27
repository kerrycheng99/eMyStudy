using System;
using System.Collections.Generic;
using System.Text;
using System.Data;

namespace MyStudyClass
{
    /// <summary>
    /// 课程表
    /// </summary>
    public class Curriculum
    {

        #region : 构造函数
        /// <summary>     
        /// 构造函数     
        /// </summary>  
        public Curriculum()
        {
            //
        }
        #endregion

        #region : 成员变量
        protected int _id;
        protected string _usercd = string.Empty;
        protected int _lessonsid;
        protected string _mon = string.Empty;
        protected string _tue = string.Empty;
        protected string _wed = string.Empty;
        protected string _thu = string.Empty;
        protected string _fri = string.Empty;
        protected string _sat = string.Empty;
        protected string _sun = string.Empty;
        protected string _strErr;
        protected string _expmsg;
        #endregion

        #region : 成员属性
        public int id { get { return _id; } set { _id = value; } }
        public string usercd { get { return _usercd; } set { _usercd = value; } }
        public int lessonsid { get { return _lessonsid; } set { _lessonsid = value; } }
        public string mon { get { return _mon; } set { _mon = value; } }
        public string tue { get { return _tue; } set { _tue = value; } }
        public string wed { get { return _wed; } set { _wed = value; } }
        public string thu { get { return _thu; } set { _thu = value; } }
        public string fri { get { return _fri; } set { _fri = value; } }
        public string sat { get { return _sat; } set { _sat = value; } }
        public string sun { get { return _sun; } set { _sun = value; } }
        public string strErr { get { return _strErr; } set { _strErr = value; } }
        public string expmsg { get { return _expmsg; } set { _expmsg = value; } }
        #endregion

        #region : 成员方法
        #region : 获得用户课程数据列表
        /// <summary>
        /// 获得用户课程数据列表
        /// </summary>
        /// <returns></returns>
        public DataSet GetUserTimeTableList()
        {
            SQLiteHelper db = new SQLiteHelper();
            StringBuilder strSql = new StringBuilder();
            DataSet ds = new DataSet();
           
            strSql.Append(" select Interval, LessonNo, Mon, Tue, Wed, Thu, Fri ");
            strSql.Append(" from UserTimeTable_V1 ");
            strSql.Append(" where 1 = 1 ");

            db.DbParametersClear();
            if (!string.IsNullOrEmpty(_usercd))
            {
                strSql.Append(" and UserCd = @UserCd ");
                db.DbPsetString("@UserCd", _usercd);
            }
            else
            {
                strSql.Append(" and UserCd = '*' ");
            }

            try
            {
                ds = db.DbDataSet(strSql.ToString(), "TABLE");
                if (ds == null)
                {
                    _strErr = db.strErr;
                }
                if (db.State() == ConnectionState.Open)
                    db.DbClose();
                return ds;
            }
            catch
            {
                _strErr = db.strErr;
                if (db.State() == ConnectionState.Open)
                    db.DbClose();
                return null;
            }

        }
        #endregion

        #endregion

    }
}

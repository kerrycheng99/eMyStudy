using System;
using System.Collections.Generic;
using System.Text;
using System.Data;

namespace MyStudyClass
{
    public class UserParameter
    {
        

        #region : 构造函数
        /// <summary>     
        /// 构造函数     
        /// </summary>  
        public UserParameter()
        {
            //
        }
        #endregion

        #region : 成员变量
        protected string _usercd = string.Empty;
        protected string _parakeys = string.Empty;
        protected string _paravalues = string.Empty;
        protected string _remarks = string.Empty;
        protected string _strErr;
        protected string _expmsg;
        #endregion

        #region : 成员属性
        public string usercd { get { return _usercd; } set { _usercd = value; } }
        public string parakeys { get { return _parakeys; } set { _parakeys = value; } }
        public string paravalues { get { return _paravalues; } set { _paravalues = value; } }
        public string remarks { get { return _remarks; } set { _remarks = value; } }
        public string strErr { get { return _strErr; } set { _strErr = value; } }
        public string expmsg { get { return _expmsg; } set { _expmsg = value; } }
        #endregion

        #region : 成员方法
        #region : 获得用户参数数据列表
        /// <summary>
        /// 获得用户参数数据列表
        /// </summary>
        /// <param name="strWhere">Where条件</param>
        /// <returns></returns>
        public DataSet GetUserParameter()
        {
            SQLiteHelper db = new SQLiteHelper();
            StringBuilder strSql = new StringBuilder();
            DataSet ds = new DataSet();

            strSql.Append(" select UserCd, ParaKeys, ParaValues, Remarks ");
            strSql.Append(" from UserParameter ");
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
            strSql.Append(" union all ");
            strSql.Append(" select 'ALL', 'CurWeekDay', strftime('%w',datetime('now')), '星期几, 0-6 (0是星期天)'");

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

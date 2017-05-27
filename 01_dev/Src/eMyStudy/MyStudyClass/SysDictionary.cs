using System;
using System.Collections.Generic;
using System.Text;
using System.Data;

namespace MyStudyClass
{
    public class SysDictionary
    {
        

        #region : 构造函数
        /// <summary>     
        /// 构造函数     
        /// </summary>  
        public SysDictionary()
        {
            //
        }
        #endregion

        #region : 成员变量
        protected string _diccatgcd = string.Empty;
        protected string _dickeys = string.Empty;
        protected string _dickeys02 = string.Empty;
        protected string _dicvalues = string.Empty;
        protected int _sortindex = 0;
        protected string _isdefault = "N";
        protected string _remarks = string.Empty;

        protected string _strErr;
        protected string _expmsg;
        #endregion

        #region : 成员属性
        public string diccatgcd { get { return _diccatgcd; } set { _diccatgcd = value; } }
        public string dickeys { get { return _dickeys; } set { _dickeys = value; } }
        public string dickeys02 { get { return _dickeys02; } set { _dickeys02 = value; } }
        public string dicvalues { get { return _dicvalues; } set { _dicvalues = value; } }
        public int sortindex { get { return _sortindex; } set { _sortindex = value; } }
        public string isdefault { get { return _isdefault; } set { _isdefault = value; } }
        public string remarks { get { return _remarks; } set { _remarks = value; } }
        public string strErr { get { return _strErr; } set { _strErr = value; } }
        public string expmsg { get { return _expmsg; } set { _expmsg = value; } }
        #endregion

        #region : 成员方法
        #region : 获得系统字典数据列表
        /// <summary>
        /// 获得系统字典数据列表
        /// </summary>
        /// <param name="strWhere">Where条件</param>
        /// <returns></returns>
        public DataSet GetSysDictionaryList()
        {
            SQLiteHelper db = new SQLiteHelper();
            StringBuilder strSql = new StringBuilder();
            DataSet ds = new DataSet();

            strSql.Append(" select DicCatgCd, DicKeys, DicKeys02, DIcvalues, SortIndex, IsDefault, Remarks ");
            strSql.Append(" from SysDictionary ");
            strSql.Append(" where 1 = 1 ");
            
            db.DbParametersClear();
            if (!string.IsNullOrEmpty(_diccatgcd))
            {
                strSql.Append(" and DicCatgCd = @DicCatgCd ");
                db.DbPsetString("@DicCatgCd", _diccatgcd);
            }
            if (!string.IsNullOrEmpty(_dickeys))
            {
                strSql.Append(" and DicKeys = @DicKeys ");
                db.DbPsetString("@DicKeys", _dickeys);
            }
            if (!string.IsNullOrEmpty(_dickeys02))
            {
                strSql.Append(" and DicKeys02 = @DicKeys02 ");
                db.DbPsetString("@DicKeys02", _dickeys02);
            }

            strSql.Append(" order by DicCatgCd, SortIndex, DicKeys, Dickeys02 ");

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

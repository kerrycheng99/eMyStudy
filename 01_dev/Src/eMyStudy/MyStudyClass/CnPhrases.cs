using System;
using System.Collections.Generic;
using System.Text;
using System.Data;

namespace MyStudyClass
{
    public class CnPhrases
    {
       
        #region : 构造函数
        /// <summary>     
        /// 构造函数     
        /// </summary>  
        public CnPhrases()
        {
            //
        }
        #endregion

        #region : 成员变量
        protected int _id;
        protected string _grad = string.Empty;
        protected string _term = string.Empty;
        protected string _unit = string.Empty;
        protected string _word = string.Empty;
        protected string _piny = string.Empty;
        protected string _mean = string.Empty;
        protected string _iswt = string.Empty;
        
        protected string _usercd = string.Empty;
        protected double _tips_rate = 30;

        protected int _pagesize = 10;
        protected int _pageindex = 0;
        protected string _strErr;
        protected string _expmsg;
        #endregion

        #region : 成员属性
        public int ID { get; set; }
        public string grad { get { return _grad; } set { _grad = value; } }
        public string term { get { return _term; } set { _term = value; } }
        public string unit { get { return _unit; } set { _unit = value; } }
        public string word { get { return _word; } set { _word = value; } }
        public string piny { get { return _piny; } set { _piny = value; } }
        public string mean { get { return _mean; } set { _mean = value; } }
        public string iswt { get { return _iswt; } set { _iswt = value; } }
        public string usercd { get { return _usercd; } set { _usercd = value; } }
        public double tips_rate { get { return _tips_rate; } set { _tips_rate = value; } }
        public int pagesize { get { return _pagesize; } set { _pagesize = value; } }
        public int pageindex { get { return _pageindex; } set { _pageindex = value; } }
        public string strErr { get { return _strErr; } set { _strErr = value; } }
        public string expmsg { get { return _expmsg; } set { _expmsg = value; } }
        #endregion

        #region : 成员方法
        #region : 获取词语表（CnPhrases）指定条件的的总记录数
        /// <summary>
        /// 获取词语表（CnPhrases）指定条件的的总记录数
        /// </summary>
        /// <returns></returns>
        public int GetCnPhrasesCount()
        {
            SQLiteHelper db = new SQLiteHelper();
            StringBuilder strSql = new StringBuilder();
            int rtn = 0;

            strSql.Append(" select count(*) ");
            strSql.Append(" from CnPhrases ");
            strSql.Append(" where 1 = 1 ");

            db.DbParametersClear();
            if (!string.IsNullOrEmpty(_grad))
            {
                strSql.Append(" and Grad = @Grad ");
                db.DbPsetString("@Grad", _grad);
            }
            if (!string.IsNullOrEmpty(_term))
            {
                strSql.Append(" and Term = @Term ");
                db.DbPsetString("@Term", _term);
            }
            
            if (!string.IsNullOrEmpty(_unit))
            {
                strSql.Append(" and Unit = @Unit ");
                db.DbPsetString("@Unit", _unit);
            }
            if (!string.IsNullOrEmpty(_iswt) && _iswt == "Y")
            {
                strSql.Append(" and IsWt = @IsWt ");
                db.DbPsetString("@IsWt", _iswt);
            }


            try
            {
                rtn = Convert.ToInt32(db.DbExcuteScalar(strSql.ToString()));
                return rtn;
            }
            catch (Exception ex)
            {
                _strErr = ex.Message;
                return ComConst.FAILED;
            }
            finally
            {
                if (db.State() == ConnectionState.Open)
                    db.DbClose();
            }
            
        }
        #endregion

        #region : 获取词语表（CnPhrases）指定条件及指定页的数据列表
        /// <summary>
        /// 获取词语表（CnPhrases）指定条件及指定页的数据列表。
        /// 当pagesize=0且pageindex=-1时将不分页处理
        /// </summary>
        /// <returns></returns>
        public DataSet GetPageCnPhrasesList()
        {
            SQLiteHelper db = new SQLiteHelper();
            StringBuilder strSql = new StringBuilder();
            DataSet ds = new DataSet();

            strSql.Append(" select ID, Grad, Term, Unit, LesnCd, Word, Piny, Mean, IsWt, ");
            strSql.Append(" GradCd, TermCd, UnitCd ");
            strSql.Append(" from CnPhrases_V1 ");
            strSql.Append(" where 1 = 1 ");

            db.DbParametersClear();
            if (!string.IsNullOrEmpty(_grad))
            {
                strSql.Append(" and GradCd = @Grad ");
                db.DbPsetString("@Grad", _grad);
            }
            if (!string.IsNullOrEmpty(_term))
            {
                strSql.Append(" and TermCd = @Term ");
                db.DbPsetString("@Term", _term);
            }
            if (!string.IsNullOrEmpty(_unit))
            {
                strSql.Append(" and UnitCd = @Unit ");
                db.DbPsetString("@Unit", _unit);
            }
            if (!string.IsNullOrEmpty(_iswt) && _iswt == "Y")
            {
                strSql.Append(" and IsWt = @IsWt ");
                db.DbPsetString("@IsWt", _iswt);
            }
            if (_pagesize > 0 && _pageindex > -1)
            {
                strSql.Append(" limit @PageSize offset @PageSize*@PageIndex ");
                db.DbPsetInt("@PageSize", _pagesize);
                db.DbPsetInt("@PageIndex", _pageindex);
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

        #region : 获取词语表（CnPhrases）指定条件的数据列表,转Excel时使用
        /// <summary>
        /// 获取词语表（CnPhrases）指定条件的数据列表
        /// 转Excel时使用
        /// </summary>
        /// <returns></returns>
        public DataSet GetCnPhrasesToExcelList()
        {
            SQLiteHelper db = new SQLiteHelper();
            StringBuilder strSql = new StringBuilder();
            DataSet ds = new DataSet();

            strSql.Append(" select ");
            strSql.Append(" ID, Grad, Term, Unit, Lesn, ");
            strSql.Append(" Word,  Piny, Mean, IsWt ");
            strSql.Append(" from CnPhrases ");
            strSql.Append(" where 1 = 1 ");

            db.DbParametersClear();
            if (!string.IsNullOrEmpty(_grad))
            {
                strSql.Append(" and Grad = @Grad ");
                db.DbPsetString("@Grad", _grad);
            }
            if (!string.IsNullOrEmpty(_term))
            {
                strSql.Append(" and Term = @Term ");
                db.DbPsetString("@Term", _term);
            }
            if (!string.IsNullOrEmpty(_unit))
            {
                strSql.Append(" and Unit = @Unit ");
                db.DbPsetString("@Unit", _unit);
            }
            if (!string.IsNullOrEmpty(_iswt) && _iswt == "Y")
            {
                strSql.Append(" and IsWt = @IsWt ");
                db.DbPsetString("@IsWt", _iswt);
            }

            strSql.Append(" order by Grad, Term, Unit, CAST(Lesn AS INT), ID ");

            try
            {
                ds = db.DbDataSet(strSql.ToString(), "TABLE");
                if (ds == null)
                {
                    _strErr = db.strErr;
                }
                else
                {
                    ////删除DataTable指定列重复项
                    //ComLibrary.DeleteSameRow(ds.Tables[0], "Words");
                }

                if (db.State() == ConnectionState.Open)
                    db.DbClose();
                return ds;
            }
            catch (Exception ex)
            {
                _strErr = ex.ToString();
                if (db.State() == ConnectionState.Open)
                    db.DbClose();
                return null;
            }

        }
        #endregion

        #endregion
    }
}

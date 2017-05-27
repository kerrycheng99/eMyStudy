using System;
using System.Collections.Generic;
using System.Text;
using System.Data;

namespace MyStudyClass
{
    public class ExamQuestions
    {
        #region : 构造函数
        /// <summary>     
        /// 构造函数     
        /// </summary>  
        public ExamQuestions()
        {
            //
        }
        #endregion

        #region : 成员变量
        protected int _id;
        protected string _grad = string.Empty;
        protected string _term = string.Empty;
        protected string _subj = string.Empty;
        protected string _qtyp = string.Empty;
        protected string _qbod = string.Empty;
        protected string _qopt = string.Empty;
        protected string _qans = string.Empty;
        protected int _qlev = 0;
        
        protected string _usercd = string.Empty;
        protected int _pagesize = 10;
        protected int _pageindex = 0;
        protected string _strErr;
        protected string _expmsg;
        #endregion

        #region : 成员属性
        public int ID { get; set; }
        public string grad { get { return _grad; } set { _grad = value; } }
        public string term { get { return _term; } set { _term = value; } }
        public string subj { get { return _subj; } set { _subj = value; } }
        public string qtyp { get { return _qtyp; } set { _qtyp = value; } }
        public string qbod { get { return _qbod; } set { _qbod = value; } }
        public string qopt { get { return _qopt; } set { _qopt = value; } }
        public string qans { get { return _qans; } set { _qans = value; } }
        public int qlev { get { return _qlev; } set { _qlev = value; } }
        public string usercd { get { return _usercd; } set { _usercd = value; } }
        public int pagesize { get { return _pagesize; } set { _pagesize = value; } }
        public int pageindex { get { return _pageindex; } set { _pageindex = value; } }
        public string strErr { get { return _strErr; } set { _strErr = value; } }
        public string expmsg { get { return _expmsg; } set { _expmsg = value; } }
        #endregion

        #region : 成员方法
        #region : 获取试题表（ExamQuestions）指定条件的的总记录数
        /// <summary>
        /// 获取试题表（ExamQuestions）指定条件的的总记录数
        /// </summary>
        /// <returns></returns>
        public int GetExamQuestionsCount()
        {
            SQLiteHelper db = new SQLiteHelper();
            StringBuilder strSql = new StringBuilder();
            int rtn = 0;

            strSql.Append(" select count(*) ");
            strSql.Append(" from ExamQuestions ");
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
            if (!string.IsNullOrEmpty(_subj))
            {
                strSql.Append(" and Subj = @Subj ");
                db.DbPsetString("@Subj", _subj);
            }
            if (!string.IsNullOrEmpty(_qtyp))
            {
                strSql.Append(" and Qtyp = @Qtyp ");
                db.DbPsetString("@Qtyp", _qtyp);
            }
            if (_qlev > 0)
            {
                strSql.Append(" and Qlev >= @Qlev ");
                db.DbPsetInt("@Qlev", _qlev);
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

        #region : 获取试题表（ExamQuestions）指定条件及指定页的数据列表
        /// <summary>
        /// 获取试题表（ExamQuestions）指定条件及指定页的数据列表
        /// 当pagesize=0且pageindex=-1时将不分页处理
        /// </summary>
        /// <returns></returns>
        public DataSet GetPageExamQuestionsList()
        {
            SQLiteHelper db = new SQLiteHelper();
            StringBuilder strSql = new StringBuilder();
            DataSet ds = new DataSet();

            //2016.04.07 DEL
            //strSql.Append(" select ID, Grad, Term, Subj, Qtyp, Qbod, Qopt, Qans, Qlev ");
            //strSql.Append(" from ExamQuestions_V1 "); 
            //2016.04.07 ADD [AddRow],[AddChar]
            strSql.Append(" select ID, GradCd, TermCd, SubjCd, QtypCd, QlevCd, ");
            strSql.Append(" Grad, Term, Subj, Qtyp, Qbod, Qopt, Qans, Qlev, AddRow, AddChar ");
            strSql.Append(" from ExamQuestions_V2 ");   
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
            if (!string.IsNullOrEmpty(_subj))
            {
                strSql.Append(" and SubjCd = @Subj ");
                db.DbPsetString("@Subj", _subj);
            }
            if (!string.IsNullOrEmpty(_qtyp))
            {
                strSql.Append(" and QtypCd = @Qtyp ");
                db.DbPsetString("@Qtyp", _qtyp);
            }
            if (_qlev > 0)
            {
                strSql.Append(" and QlevCd >= @Qlev ");
                db.DbPsetInt("@Qlev", _qlev);
            }
            strSql.Append(" order by SubjCd, QtypCd, GradCd, TermCd, QlevCd ");

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

        #endregion
    }
}

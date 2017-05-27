using System;
using System.Collections.Generic;
using System.Text;
using System.Data;

namespace ExMyStudy
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
        protected DataTable _upd_dt;

        protected string _usercd = string.Empty;
        protected int _pagesize = 10;
        protected int _pageindex = 0;
        protected string _strErr;
        protected string _expmsg;
        #endregion

        #region : 成员属性
        public int id { get; set; }
        public string grad { get { return _grad; } set { _grad = value; } }
        public string term { get { return _term; } set { _term = value; } }
        public string subj { get { return _subj; } set { _subj = value; } }
        public string qtyp { get { return _qtyp; } set { _qtyp = value; } }
        public string qbod { get { return _qbod; } set { _qbod = value; } }
        public string qopt { get { return _qopt; } set { _qopt = value; } }
        public string qans { get { return _qans; } set { _qans = value; } }
        public int qlev { get { return _qlev; } set { _qlev = value; } }
        public DataTable upd_dt { get { return _upd_dt; } set { _upd_dt = value; } }

        public string usercd { get { return _usercd; } set { _usercd = value; } }
        public int pagesize { get { return _pagesize; } set { _pagesize = value; } }
        public int pageindex { get { return _pageindex; } set { _pageindex = value; } }
        public string strErr { get { return _strErr; } set { _strErr = value; } }
        public string expmsg { get { return _expmsg; } set { _expmsg = value; } }
        #endregion

        #region : 成员方法
        #region ExamQuestionsIsExist() : 判定指定ID的试题表（ExamQuestions）是否存在
        /// <summary>
        /// 判定指定ID的试题表（ExamQuestions）是否存在
        /// </summary>
        /// <returns></returns>
        public object ExamQuestionsIsExist()
        {
            SQLiteHelper db = new SQLiteHelper();
            StringBuilder strSql = new StringBuilder();
            object obj = null;

            strSql.Append(" select ID ");
            strSql.Append(" from ExamQuestions ");
            strSql.Append(" where 1 = 1 ");
            strSql.Append("   and ID = @ID ");

            db.DbParametersClear();
            db.DbPsetInt("@ID", _id);

            try
            {
                //obj = Convert.ToInt32(db.DbExcuteScalar(strSql.ToString()));
                obj = db.DbExcuteScalar(strSql.ToString());
                return obj;
            }
            catch (Exception ex)
            {
                _strErr = ex.Message;
                return null;
            }
            finally
            {
                if (db.State() == ConnectionState.Open)
                    db.DbClose();
            }

        }
        #endregion

        #region UpdExamQuestions()：试题表（ExamQUestions）更新
        /// <summary>
        /// 试题表（ExamQUestions）更新
        /// </summary>
        /// <returns></returns>
        public int UpdExamQuestions()
        {
            SQLiteHelper db = new SQLiteHelper();
            StringBuilder strSql = new StringBuilder();
            int intResult = ComConst.FAILED;

            try
            {
                //事务开始
                db.DbBeginTrans();

                //更新数据
                DataTable dtUpd = _upd_dt;
                for (int i = 0; i < dtUpd.Rows.Count; i++)
                {
                    DataRow dr = dtUpd.Rows[i];
                    _id = Convert.ToInt32(dr["ID"].ToString());
                    //strSql.Clear();
                    //strSql.Append(" select count(ID) cnt ");
                    //strSql.Append(" from ExamQuestions ");
                    //strSql.Append(" where 1 = 1 ");
                    //strSql.Append("   and ID = @ID ");
                    //db.DbParametersClear();
                    //db.DbPsetInt("@ID", _id);
                    //int cnt = Convert.ToInt32(db.DbExcuteScalar(strSql.ToString()));
                    //if (cnt == 0)
                    //判定指定ID的试题表是否存在
                    object objExist = ExamQuestionsIsExist();
                    if (objExist == null)
                    {
                        //新增
                        strSql.Clear();
                        strSql.Append(" INSERT INTO ExamQuestions ( ");
                        strSql.Append(" ID, Grad, Term, Subj, Qtyp, Qbod, Qopt, Qans, Qlev ");
                        strSql.Append(" ) VALUES ( ");
                        strSql.Append(" @ID, @Grad, @Term, @Subj, @Qtyp, @Qbod, @Qopt, @Qans, @Qlev) ");
                    }
                    else
                    {
                        //更新
                        strSql.Clear();
                        strSql.Append(" UPDATE ExamQuestions SET ");
                        strSql.Append("  Grad = @Grad ");
                        strSql.Append(" ,Term = @Term ");
                        strSql.Append(" ,Subj = @Subj ");
                        strSql.Append(" ,Qtyp = @Qtyp ");
                        strSql.Append(" ,Qbod = @Qbod ");
                        strSql.Append(" ,Qopt = @Qopt ");
                        strSql.Append(" ,Qans = @Qans ");
                        strSql.Append(" ,Qlev = @Qlev ");
                        strSql.Append(" WHERE ID = @ID ");
                    }
                    db.DbParametersClear();
                    db.DbPsetInt("@ID", Convert.ToInt32(dr["ID"].ToString()));
                    db.DbPsetString("@Grad", dr["GRAD"].ToString());
                    db.DbPsetString("@Term", dr["TERM"].ToString());
                    db.DbPsetString("@Subj", dr["SUBJ"].ToString());
                    db.DbPsetString("@Qtyp", dr["QTYP"].ToString());
                    db.DbPsetString("@Qbod", dr["QBOD"].ToString());
                    db.DbPsetString("@Qopt", dr["QOPT"].ToString());
                    db.DbPsetString("@Qans", dr["QANS"].ToString());
                    db.DbPsetInt("@Qlev", Convert.ToInt32(dr["QLEV"].ToString()));

                    intResult = db.DbExecute(strSql.ToString());
                    if (intResult != ComConst.SUCCEED)
                        break;
                }
                //
                if (intResult == ComConst.SUCCEED)
                {
                    _strErr = "更新完成。";
                    db.DbCommit();
                }
                else
                {
                    _strErr = "更新失败,请稍后再试。";
                    db.DbRollback();
                }
            }
            catch (Exception ex)
            {
                _strErr = ex.Message;
                db.DbRollback();
                return ComConst.FAILED;
            }

            return intResult;

        }
        #endregion

        #region GetExamQuestionsList() : 获取试题表（ExamQuestions）数据列表(ALL)
        /// <summary>
        /// 获取试题表（ExamQuestions）数据列表(ALL)
        /// </summary>
        /// <returns></returns>
        public DataSet GetExamQuestionsList()
        {
            SQLiteHelper db = new SQLiteHelper();
            StringBuilder strSql = new StringBuilder();
            DataSet ds = new DataSet();

            strSql.Append(" select ID, Grad, Term, Subj, Qtyp, Qbod, Qopt, Qans, Qlev ");
            strSql.Append(" ,'' UPDT ");
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
            strSql.Append(" order by ID ");
            
            try
            {
                ds = db.DbDataSet(strSql.ToString(), "LIST");
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

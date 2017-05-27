using System;
using System.Collections.Generic;
using System.Text;
using System.Data;

namespace ExMyStudy
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
        protected DataTable _upd_dt;
        
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
        public DataTable upd_dt { get { return _upd_dt; } set { _upd_dt = value; } }
        public string usercd { get { return _usercd; } set { _usercd = value; } }
        public double tips_rate { get { return _tips_rate; } set { _tips_rate = value; } }
        public int pagesize { get { return _pagesize; } set { _pagesize = value; } }
        public int pageindex { get { return _pageindex; } set { _pageindex = value; } }
        public string strErr { get { return _strErr; } set { _strErr = value; } }
        public string expmsg { get { return _expmsg; } set { _expmsg = value; } }
        #endregion

        #region : 成员方法
        #region CnPhrasesIsExist() : 判定指定ID的语文词语表（CnPhrases）是否存在
        /// <summary>
        /// 判定指定ID的语文词语表（CnPhrases）是否存在
        /// </summary>
        /// <returns></returns>
        public object CnPhrasesIsExist()
        {
            SQLiteHelper db = new SQLiteHelper();
            StringBuilder strSql = new StringBuilder();
            object obj = null;

            strSql.Append(" select ID ");
            strSql.Append(" from CnPhrases ");
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

        #region UpdCnPhrases()：语文词语表（CnPhrases）更新
        /// <summary>
        /// 语文词语表（CnPhrases）更新
        /// </summary>
        /// <returns></returns>
        public int UpdCnPhrases()
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

                    //判定指定ID的语文词语表是否存在
                    object objExist = CnPhrasesIsExist();
                    if (objExist == null)
                    {
                        //新增
                        strSql.Clear();
                        strSql.Append(" INSERT INTO CnPhrases  ( ");
                        strSql.Append(" ID, Grad, Term, Unit, Lesn, Word, Piny, Mean, IsWt ");
                        strSql.Append(" ) VALUES ( ");
                        strSql.Append(" @ID, @Grad, @Term, @Unit, @Lesn, @Word, @Piny, @Mean, @IsWt) ");
                    }
                    else
                    {
                        //更新
                        strSql.Clear();
                        strSql.Append(" UPDATE CnPhrases  SET ");
                        strSql.Append("  Grad = @Grad ");
                        strSql.Append(" ,Term = @Term ");
                        strSql.Append(" ,Unit = @Unit ");
                        strSql.Append(" ,Lesn = @Lesn ");
                        strSql.Append(" ,Word = @Word ");
                        strSql.Append(" ,Piny = @Piny ");
                        strSql.Append(" ,Mean = @Mean ");
                        strSql.Append(" ,IsWt = @IsWt ");
                        strSql.Append(" WHERE ID = @ID ");
                    }
                    db.DbParametersClear();
                    db.DbPsetInt("@ID", Convert.ToInt32(dr["ID"].ToString()));
                    db.DbPsetString("@Grad", dr["GRAD"].ToString());
                    db.DbPsetString("@Term", dr["TERM"].ToString());
                    db.DbPsetString("@Unit", dr["UNIT"].ToString());
                    db.DbPsetString("@Lesn", dr["LESN"].ToString());
                    db.DbPsetString("@Word", dr["Word"].ToString());
                    db.DbPsetString("@Piny", dr["PINY"].ToString());
                    db.DbPsetString("@Mean", dr["MEAN"].ToString());
                    db.DbPsetString("@IsWt", dr["ISWT"].ToString());

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

        #endregion
    }
}

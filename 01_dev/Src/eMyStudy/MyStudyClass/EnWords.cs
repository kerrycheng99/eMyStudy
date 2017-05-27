using System;
using System.Collections.Generic;
using System.Text;
using System.Data;

namespace MyStudyClass
{
    public class EnWords
    {
       
        #region : 构造函数
        /// <summary>     
        /// 构造函数     
        /// </summary>  
        public EnWords()
        {
            //
        }
        #endregion

        #region : 成员变量
        protected int _id;
        protected string _grad = string.Empty;
        protected string _term = string.Empty;
        protected string _modu = string.Empty;
        protected string _unit = string.Empty;
        protected string _word = string.Empty;
        protected string _pron = string.Empty;
        protected string _mean = string.Empty;
        protected string _catg = string.Empty;
        protected string _iswt = string.Empty;
        protected string _enwd = string.Empty;
        
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
        public string modu { get { return _modu; } set { _modu = value; } }
        public string unit { get { return _unit; } set { _unit = value; } }
        public string word { get { return _word; } set { _word = value; } }
        public string pron { get { return _pron; } set { _pron = value; } }
        public string mean { get { return _mean; } set { _mean = value; } }
        public string catg { get { return _catg; } set { _catg = value; } }
        public string iswt { get { return _iswt; } set { _iswt = value; } }
        public string enwd { get { return _enwd; } set { _enwd = value; } }
        public string usercd { get { return _usercd; } set { _usercd = value; } }
        public double tips_rate { get { return _tips_rate; } set { _tips_rate = value; } }
        public int pagesize { get { return _pagesize; } set { _pagesize = value; } }
        public int pageindex { get { return _pageindex; } set { _pageindex = value; } }
        public string strErr { get { return _strErr; } set { _strErr = value; } }
        public string expmsg { get { return _expmsg; } set { _expmsg = value; } }
        #endregion

        #region : 成员方法
        #region : 获取单词表（EnWords）指定条件的的总记录数
        /// <summary>
        /// 获取单词表（EnWords）指定条件的的总记录数
        /// </summary>
        /// <returns></returns>
        public int GetEnWordsCount()
        {
            SQLiteHelper db = new SQLiteHelper();
            StringBuilder strSql = new StringBuilder();
            int rtn = 0;

            strSql.Append(" select count(*) ");
            strSql.Append(" from EnWords ");
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
            if (!string.IsNullOrEmpty(_modu))
            {
                strSql.Append(" and Modu = @Modu ");
                db.DbPsetString("@Modu", _modu);
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
            if (!string.IsNullOrEmpty(_enwd))
            {
                strSql.Append(" and Word like @Word ");
                db.DbPsetString("@Word", "%" + _enwd + "%");
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

        #region : 获取单词表（EnWords）指定条件及指定页的数据列表
        /// <summary>
        /// 获取单词表（EnWords）指定条件及指定页的数据列表
        /// </summary>
        /// <returns></returns>
        public DataSet GetPageEnWordsList()
        {
            SQLiteHelper db = new SQLiteHelper();
            StringBuilder strSql = new StringBuilder();
            DataSet ds = new DataSet();

            strSql.Append(" select ID, Grad, Term, Modu, Unit, Word, Pron, Mean, IsWt ");
            strSql.Append(" from EnWords_V1 ");
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
            if (!string.IsNullOrEmpty(_modu))
            {
                strSql.Append(" and ModuCd = @Modu ");
                db.DbPsetString("@Modu", _modu);
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
            if (!string.IsNullOrEmpty(_enwd))
            {
                strSql.Append(" and Word like @Word ");
                db.DbPsetString("@Word", "%" + _enwd + "%");
            }

            strSql.Append(" limit @PageSize offset @PageSize*@PageIndex ");
            db.DbPsetInt("@PageSize", _pagesize);
            db.DbPsetInt("@PageIndex", _pageindex);

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

        #region : 获取单词表（EnWords）指定条件的的总记录数（排除重复项单词）
        /// <summary>
        /// 获取单词表（EnWords）指定条件的的总记录数（排除重复项单词）
        /// </summary>
        /// <returns></returns>
        public int GetEnWordsExamCount()
        {
            SQLiteHelper db = new SQLiteHelper();
            StringBuilder strSql = new StringBuilder();
            int rtn = 0;

            strSql.Append(" select count(distinct word|| pron|| mean) ");
            strSql.Append(" from EnWords ");
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
            if (!string.IsNullOrEmpty(_modu))
            {
                strSql.Append(" and Modu = @Modu ");
                db.DbPsetString("@Modu", _modu);
            }
            if (!string.IsNullOrEmpty(_unit))
            {
                strSql.Append(" and Unit = @Unit ");
                db.DbPsetString("@Unit", _unit);
            }
            //2015.04.01 ADD--->
            if (!string.IsNullOrEmpty(_catg))
            {
                strSql.Append(" and Catg = @Catg ");
                db.DbPsetString("@Catg", _catg);
            }
            //<---
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

        #region : 获取单词表（EnWords）指定条件及指定页的数据列表(排除重复项单词)
        /// <summary>
        /// 获取单词表（EnWords）指定条件及指定页的数据列表(排除重复项单词)
        /// </summary>
        /// <returns></returns>
        public DataSet GetPageEnWordsExamList()
        {
            SQLiteHelper db = new SQLiteHelper();
            StringBuilder strSql = new StringBuilder();
            DataSet ds = new DataSet();

            strSql.Append(" select distinct Word, Word AS WordOrig, Pron, Mean ");
            //strSql.Append(" from EnWords_V1 ");   //2015.04.01 DEL
            strSql.Append(" from EnWords_V2 ");     //2015.04.01 ADD
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
            if (!string.IsNullOrEmpty(_modu))
            {
                strSql.Append(" and ModuCd = @Modu ");
                db.DbPsetString("@Modu", _modu);
            }
            if (!string.IsNullOrEmpty(_unit))
            {
                strSql.Append(" and UnitCd = @Unit ");
                db.DbPsetString("@Unit", _unit);
            }
            //2015.04.01 ADD--->
            if (!string.IsNullOrEmpty(_catg))
            {
                strSql.Append(" and CatgCd = @Catg ");
                db.DbPsetString("@Catg", _catg);
            }
            //<---
            if (!string.IsNullOrEmpty(_iswt) && _iswt == "Y")
            {
                strSql.Append(" and IsWt = @IsWt ");
                db.DbPsetString("@IsWt", _iswt);
            }
            strSql.Append(" limit @PageSize offset @PageSize*@PageIndex ");
            db.DbPsetInt("@PageSize", _pagesize);
            db.DbPsetInt("@PageIndex", _pageindex);

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
                    //ComLibrary.DeleteSameRow(ds.Tables[0], "Word");
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

        #region GetPageEnWordsSpellList() ： 设置单词拼写内容
        /// <summary>
        /// 设置单词拼写内容
        /// </summary>
        public DataSet GetPageEnWordsSpellList()
        {
            try
            {
                DataSet ds = GetPageEnWordsExamList();
                
                //单词拼写设定
                //double _TipsRate = 0.3;
                double _TipsRate = _tips_rate / 100;
                int _WordLen = 0;
                int _TipsCnt = 0;
                string newword = string.Empty;
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    string word = dr["Word"].ToString().Trim();
                    _WordLen = word.Length;
                    if (_WordLen > 0)
                    {
                        newword = string.Empty.PadRight(_WordLen, '_');
                        StringBuilder sb = new StringBuilder(newword);

                        //设定单词拼写时提示字母数
                        _TipsCnt = (int)Math.Ceiling(_WordLen * _TipsRate);
                        if (_TipsCnt > _WordLen) _TipsCnt = _WordLen;
                        //设定单词拼写时提示字母位置（数组）
                        int[] arr = ComLibrary.getRandomNum(_TipsCnt, 1, _WordLen);

                        for (int y = 0; y < arr.Length; y++)
                        {
                            sb.Replace("_", word.Substring(arr[y], 1), arr[y], 1);
                        }
                        newword = sb.ToString();

                        dr["Word"] = newword;
                    }
                }
                ds.AcceptChanges();
                return ds;
            }
            catch(Exception ex)
            {
                _strErr = ex.Message;
                return null;
            }
        }
        #endregion

        #region : 获取单词表（EnWords）指定条件的数据列表(排除重复项单词),转Excel时使用
        /// <summary>
        /// 获取单词表（EnWords）指定条件的数据列表(排除重复项单词)
        /// 转Excel时使用
        /// </summary>
        /// <returns></returns>
        public DataSet GetEnWordsToExcelList()
        {
            SQLiteHelper db = new SQLiteHelper();
            StringBuilder strSql = new StringBuilder();
            DataSet ds = new DataSet();

            strSql.Append(" select ");
            strSql.Append(" Grad as [G.], Term as [T.], Modu as [M.], Unit as [U.], ");
            strSql.Append(" Word as [Words],  Pron as [Pronunciation], Mean as [Means], IsWt as [Wrt.] ");
            strSql.Append(" from EnWords ");
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
            if (!string.IsNullOrEmpty(_modu))
            {
                strSql.Append(" and Modu = @Modu ");
                db.DbPsetString("@Modu", _modu);
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
            if (!string.IsNullOrEmpty(_enwd))
            {
                strSql.Append(" and Word like @Word ");
                db.DbPsetString("@Word", "%" + _enwd + "%");
            }
            strSql.Append(" order by Word COLLATE NOCASE, Grad, Term, Modu, Unit ");//[Word]列不区分大小写
            
            try
            {
                ds = db.DbDataSet(strSql.ToString(), "TABLE");
                if (ds == null)
                {
                    _strErr = db.strErr;
                }
                else
                {
                    //删除DataTable指定列重复项
                    ComLibrary.DeleteSameRow(ds.Tables[0], "Words");
                }

                if (db.State() == ConnectionState.Open)
                    db.DbClose();
                return ds;
            }
            catch(Exception ex)
            {
                _strErr = ex.ToString();
                if (db.State() == ConnectionState.Open)
                    db.DbClose();
                return null;
            }

        }
        #endregion

        #region : 获取单词表（EnWords）指定条件的拼写列表(排除重复项单词),转Excel时使用
        /// <summary>
        /// 获取单词表（EnWords）指定条件的拼写列表(排除重复项单词)
        /// 转Excel时使用
        /// </summary>
        /// <returns></returns>
        public DataSet GetEnWordsSpellToExcelList()
        {
            SQLiteHelper db = new SQLiteHelper();
            StringBuilder strSql = new StringBuilder();
            DataSet ds = new DataSet();

            strSql.Append(" select ");
            strSql.Append(" Grad as [G.], Term as [T.], Modu as [M.], Unit as [U.], ");
            strSql.Append(" Mean as [Means],  Pron as [Pronunciation], Word as [Words] ");
            strSql.Append(" from EnWords ");
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
            if (!string.IsNullOrEmpty(_modu))
            {
                strSql.Append(" and Modu = @Modu ");
                db.DbPsetString("@Modu", _modu);
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
            if (!string.IsNullOrEmpty(_enwd))
            {
                strSql.Append(" and Word like @Word ");
                db.DbPsetString("@Word", "%" + _enwd + "%");
            }
            strSql.Append(" order by Word COLLATE NOCASE, Grad, Term, Modu, Unit ");//[Word]列不区分大小写

            try
            {
                ds = db.DbDataSet(strSql.ToString(), "TABLE");
                if (ds == null)
                {
                    _strErr = db.strErr;
                }
                else
                {
                    //删除DataTable指定列重复项
                    ComLibrary.DeleteSameRow(ds.Tables[0], "Words");
                    //将[Words]栏清空
                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {
                        ds.Tables[0].Rows[i]["Words"] = "";
                    }
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

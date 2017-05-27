using System;
using System.Collections;
using System.Collections.Specialized;
using System.Data;
//using System.Configuration;
using System.Web.Configuration;
using System.Data.SQLite;

namespace MyStudyClass
{
    public class SQLiteHelper
    {
        #region : 构造函数
        /// <summary>     
        /// 构造函数     
        /// </summary>  
        public SQLiteHelper()
        {
            //创建数据库连接对象
            _cn = new SQLiteConnection();
            //创建命令对象
            _cm = new SQLiteCommand();
            //从web.config获取连接字符串
            _cn.ConnectionString = "Data Source=" +
             System.Web.HttpContext.Current.Server.MapPath(WebConfigurationManager.AppSettings["SQLString"]);
        }

        /// <summary>     
        /// 构造函数     
        /// </summary>     
        /// <param name="dbPath">SQLite数据库文件路径</param>     
        public SQLiteHelper(string dbPath)
        {
            //创建数据库连接对象
            _cn = new SQLiteConnection();
            //创建命令对象
            _cm = new SQLiteCommand();
            //
            _cn.ConnectionString = "Data Source=" + dbPath;
        }
        #endregion

        #region : 成员变量
        protected SQLiteConnection _cn;
        protected SQLiteCommand _cm;
        protected SQLiteDataReader _dr;
        protected SQLiteDataAdapter _da;
        protected SQLiteTransaction _trans;
        protected string _db_type;
        protected string _db;
        protected string _strErr;
        protected string _expmsg;
        #endregion

        #region : 成员属性
        /*
        public SQLiteConnection cn { get { return _cn; } set { _cn = value; } }
        public SQLiteCommand cm { get { return _cm; } set { _cm = value; } }
        public SQLiteDataReader dr { get { return _dr; } set { _dr = value; } }
        public SQLiteDataAdapter da { get { return _da; } set { _da = value; } }
        */
        public string strErr { get { return _strErr; } set { _strErr = value; } }
        public string expmsg { get { return _expmsg; } set { _expmsg = value; } }
        #endregion

        #region : 成员方法
        //--------------------------------------------------------------
        // 数据库连接相关
        //--------------------------------------------------------------
        #region DbConnection : 数据库连接
        /// <summary>
        /// 数据库连接
        /// 
        /// 未使用
        /// </summary>
        public SQLiteConnection DbConnection()
        {
            try
            {
                _cn.Open();
                return _cn;
            }
            catch (SQLiteException e)
            {
                String strErr;

                strErr = e.ToString();
                System.Console.Out.Write(strErr);
                return _cn;
            }
        }
        #endregion

        #region DbClose : 数据库连接终止
        /// <summary>
        /// 数据库连接终止
        /// </summary>
        public Boolean DbClose()
        {
            try
            {
                if (_trans != null)
                {
                    try
                    {
                        _trans.Rollback();
                    }
                    catch { }
                    _trans = null;
                }
                _cn.Close();
                _cn.Dispose();

                return true;

            }
            catch (SQLiteException e)
            {
                String strErr;

                strErr = e.ToString();
                System.Console.Out.Write(strErr);
                return false;
            }
        }
        #endregion

        #region State : 数据库连接状态
        /// <summary>
        /// 数据库连接状态
        /// </summary>
        public ConnectionState State()
        {
            return _cn.State;
        }
        #endregion

        //--------------------------------------------------------------
        // 事务控制相关
        //--------------------------------------------------------------
        #region DbBeginTrans : 事务开始
        /// <summary>
        /// 事务开始
        /// </summary>
        public void DbBeginTrans()
        {
            try
            {
                if (_cn.State != ConnectionState.Open)
                    _cn.Open();
                _trans = _cn.BeginTransaction(IsolationLevel.ReadCommitted);
                _cm.Transaction = _trans;
            }
            catch (SQLiteException e)
            {
                _expmsg = e.Message;
                _strErr = e.ToString();
            }
        }
        #endregion

        #region DbCommit : 事务提交
        /// <summary>
        /// 事务提交
        /// </summary>
        public void DbCommit()
        {
            try
            {
                _trans.Commit();
                _trans = null;
                _cn.Close();
                _cn.Dispose();
            }
            catch (SQLiteException e)
            {
                string strErr;

                strErr = e.ToString();
                System.Console.Out.Write(strErr);
            }
        }
        #endregion

        #region DbRollback : 事务回滚
        /// <summary>
        /// 事务回滚
        /// </summary>
        public void DbRollback()
        {
            try
            {
                _trans.Rollback();
                _trans = null;
                _cn.Close();
                _cn.Dispose();
            }
            catch (SQLiteException e)
            {
                _expmsg = e.Message;
                _strErr = e.ToString();
            }
        }
        #endregion

        //--------------------------------------------------------------
        // 执行SQL语句相关
        //--------------------------------------------------------------
        #region  DbExecute : 执行简单SQL语句
        /// <summary>
        /// 执行SQL语句，返回影响的记录数
        /// </summary>
        /// <param name="strSql">SQL语句</param>
        /// <returns>影响的记录数</returns>
        public int DbExecute(string strSql)
        {
            _cm.CommandType = CommandType.Text;
            try
            {
                int rtn;
                if (_cn.State != ConnectionState.Open)
                    _cn.Open();

                _cm.Connection = _cn;
                _cm.Transaction = _trans;
                _cm.CommandText = strSql;
                _cm.CommandTimeout = 0;     //无限

                rtn = _cm.ExecuteNonQuery();

                //return rtn;
                return ComConst.SUCCEED;
            }
            catch (SQLiteException e)
            {
                _expmsg = e.Message;
                _strErr = e.ToString();
                return ComConst.FAILED;
            }
        }

        /// <summary>
        /// 执行SQL语句，设置命令的执行等待时间
        /// </summary>
        /// <param name="strSql"></param>
        /// <param name="Times"></param>
        /// <returns></returns>
        public int DbExecuteByTime(string strSql, int Times)
        {
            _cm.CommandType = CommandType.Text;
            try
            {
                int rtn;
                if (_cn.State != ConnectionState.Open)
                    _cn.Open();

                _cm.Connection = _cn;
                _cm.Transaction = _trans;
                _cm.CommandText = strSql;
                _cm.CommandTimeout = Times;

                rtn = _cm.ExecuteNonQuery();

                //return rtn;
                return ComConst.SUCCEED;
            }
            catch (SQLiteException e)
            {
                _expmsg = e.Message;
                _strErr = e.ToString();
                return ComConst.FAILED;
            }
        }

        #endregion
        #region DbExecuteTran : 执行多条SQL语句
        /// <summary>
        /// 执行多条SQL语句，实现数据库事务。
        /// </summary>
        /// <param name="strSqlList">多条SQL语句</param>        
        public void DbExecuteTran(ArrayList strSqlList)
        {
            _cm.CommandType = CommandType.Text;
            try
            {
                //int rtn;
                if (_cn.State != ConnectionState.Open)
                    _cn.Open();

                _cm.Connection = _cn;
                DbBeginTrans();
                for (int n = 0; n < strSqlList.Count; n++)
                {
                    string strsql = strSqlList[n].ToString();
                    if (strsql.Trim().Length > 1)
                    {
                        _cm.Transaction = _trans;
                        _cm.CommandText = strsql;
                        _cm.ExecuteNonQuery();
                    }
                }
                DbCommit();
            }
            catch (SQLiteException e)
            {
                DbRollback();
                _expmsg = e.Message;
                _strErr = e.ToString();
            }
        }
        #endregion
        #region DbExcuteScalar : 执行SQL语句返回单一查询结果（object）
        /// <summary>
        /// 执行SQL语句返回单一查询结果（object）。
        /// </summary>
        /// <param name="strSql">SQL语句</param>
        /// <returns>查询结果（object）</returns>
        public object DbExcuteScalar(string strSql)
        {
            _cm.CommandType = CommandType.Text;
            try
            {
                //int rtn;
                if (_cn.State != ConnectionState.Open)
                    _cn.Open();

                _cm.Connection = _cn;
                _cm.Transaction = _trans;
                _cm.CommandText = strSql;

                object obj = _cm.ExecuteScalar();
                if ((Object.Equals(obj, null)) || (Object.Equals(obj, System.DBNull.Value)))
                {
                    return null;
                }
                else
                {
                    return obj;
                }
            }
            catch (SQLiteException e)
            {
                _expmsg = e.Message;
                _strErr = e.ToString();
                return null;
            }
        }
        #endregion

        //--------------------------------------------------------------
        // 获取数据相关
        //--------------------------------------------------------------
        #region DbExecuteReader : 数据读取器
        /// <summary>
        /// 数据读取器ﾞ
        /// </summary>
        /// <param name="strSql">実行対象のSQL文</param>
        /// <returns>错误时:抛出异常 正常完成:ComConst.SUCCEED或ComConst.NO_MORE_ROWS</returns>
        public int DbExecuteReader(string strSql)
        {
            try
            {
                _expmsg = "";
                _strErr = "";
                if (_cn.State != ConnectionState.Open)
                    _cn.Open();

                _cm.CommandType = CommandType.Text;
                _cm.Connection = _cn;
                _cm.CommandText = strSql;
                _cm.CommandTimeout = 0;     //无限

                _dr = _cm.ExecuteReader();

                if (_dr.Read())
                {
                    return 0;
                }
                else
                {
                    return ComConst.FAILED;
                }
            }
            catch (Exception e)
            {
                _expmsg = e.Message;
                _strErr = e.ToString();
                return -1;
            }
        }
        public string Row(string p_field_name)
        {
            return _dr[p_field_name].ToString();
        }
        public int DbCloseReader()
        {
            try
            {
                _expmsg = "";
                _strErr = "";
                _dr.Close();
            }
            catch
            {
            }
            return 0;
        }
        #endregion

        #region DbExcuteReaderFillDS : 数据读取器填充生成数据集
        /// <summary>
        /// 数据读取器填充生成数据集
        /// </summary>
        /// <param name="strSql">SQL语句</param>
        /// <param name="tblname">数据表名称</param>
        /// <returns>DataSet(错误时抛出异常)</returns>
        public DataSet DbExcuteReaderFillDS(string strSql, string tblname)
        {
            DataSet ds = new DataSet();
            DataTable dt = new DataTable(tblname);

            _expmsg = "";
            _strErr = "";

            try
            {
                _cm.Connection = _cn;
                _cm.CommandText = strSql;
                _cm.CommandType = CommandType.Text;
                _cm.CommandTimeout = 0;     //无限

                _cm.Parameters.Clear();

                _dr = _cm.ExecuteReader();

                for (int i = 0; i < _dr.FieldCount; i++)
                {
                    dt.Columns.Add(_dr.GetName(i), _dr.GetFieldType(i));
                }

                while (_dr.Read())
                {
                    DataRow dr;
                    dr = dt.NewRow();

                    for (int i = 0; i < _dr.FieldCount; i++)
                    {
                        dr[i] = _dr;
                    }

                    dt.Rows.Add(dr);

                }

                _dr.Close();
                _dr.Dispose();

                ds.Tables.Add(dt);

                return ds;

            }
            catch (SQLiteException e)
            {
                if (!_dr.IsClosed)
                {
                    _dr.Close();
                    _dr.Dispose();
                }

                _expmsg = e.Message;
                _strErr = e.ToString();
                return null;
            }
            catch (Exception ex)
            {
                if (!_dr.IsClosed)
                {
                    _dr.Close();
                    _dr.Dispose();
                }

                _expmsg = ex.Message;
                _strErr = ex.ToString();
                return null;
            }

        }
        #endregion

        #region DbDataSet : 创建并返回数据集
        /// <summary>
        /// 创建并返回数据集
        /// </summary>
        /// <param name="strSql">SQL语句</param>
        /// <param name="tblName">资料表名</param>
        /// <returns>DataSet(错误时返回null)</returns>
        public DataSet DbDataSet(string strSql, string tblName)
        {
            try
            {
                DataSet ds = new DataSet();
                _da = new SQLiteDataAdapter();
                _cm.CommandType = CommandType.Text;
                _cm.Connection = _cn;
                _cm.CommandTimeout = 0;     //无限
                _da.SelectCommand = _cm;

                //--- Connection Open
                if (_cn.State != ConnectionState.Open)
                    _cn.Open();

                //'--- Fill
                _cm.CommandText = strSql;
                _da.Fill(ds, tblName);
                _da = null;
                return ds;
            }
            catch (SQLiteException e)
            {
                _expmsg = e.Message;
                _strErr = e.ToString();
                return null;
            }
        }
        #endregion
        #region DbDataSet :创建并返回多个该数据表的数据集
        /// <summary>
        /// 创建并返回多个该数据表的数据集
        /// </summary>
        /// <param name="strSql">SQL语句</param>
        /// <param name="tblName">资料表名</param>
        /// <returns>DataSet(错误时返回null)</returns>
        public DataSet DbDataSet(string[] strSql, string[] tblName)
        {
            DataSet dsRet = new DataSet();
            DataSet ds = new DataSet();
            SQLiteDataAdapter da = new SQLiteDataAdapter(strSql[0], _cn);

            try
            {
                for (int i = 0; i < strSql.Length; i++)
                {
                    da.SelectCommand.CommandText = strSql[i];

                    da.Fill(ds, tblName[i]);

                    dsRet.Tables.Add(ds.Tables[tblName[i]].Copy());
                }

                da = null;

                return dsRet;

            }
            catch (SQLiteException e)
            {
                _expmsg = e.Message;
                _strErr = e.ToString();

                return null;
            }
            catch (Exception ex)
            {
                _expmsg = ex.ToString();
                _strErr = ex.ToString();
                return null;
            }

        }
        #endregion

        //--------------------------------------------------------------
        // 参数设置相关
        //--------------------------------------------------------------
        #region 参数设置相关
        //=====================================================
        // 参数清除
        //=====================================================
        #region DbParametersClear : 参数清除
        /// <summary>
        /// 参数清除
        /// </summary>
        public void DbParametersClear()
        {
            _cm.Parameters.Clear();
        }
        #endregion

        #region _DirectionSet : 参数属性设置
        /// <summary>
        /// 参数属性设置
        /// </summary>
        /// <param name="name">参数名称</param>
        /// <param name="direction">参数属性</param>
        private void _DirectionSet(string name, int direction)
        {
            switch (direction)
            {
                case ComConst.DB_RTN:
                    _cm.Parameters[name].Direction = ParameterDirection.ReturnValue;
                    break;
                case ComConst.DB_IN:
                    _cm.Parameters[name].Direction = ParameterDirection.Input;
                    break;
                case ComConst.DB_INOUT:
                    _cm.Parameters[name].Direction = ParameterDirection.InputOutput;
                    break;
                case ComConst.DB_OUT:
                    _cm.Parameters[name].Direction = ParameterDirection.Output;
                    break;
            }
        }
        #endregion
        //=====================================================
        // 参数设置
        //=====================================================
        #region DbPsetReturn : 参数设置（返回值）
        /// <summary>
        /// 参数设置（返回值）
        /// </summary>
        public void DbPsetReturn()
        {
            _cm.Parameters.Clear();
            _cm.Parameters.Add("rtn", DbType.Int16, 1).Value = 0;
            _DirectionSet("rtn", ComConst.DB_RTN);
        }
        #endregion
        #region DbPsetString : 参数设置(string)
        public void DbPsetString(string name, string val)
        {
            _cm.Parameters.Add(name, DbType.String, 1024).Value = val;
        }
        public void DbPsetString(string name, string val, int direction)
        {
            _cm.Parameters.Add(name, DbType.String, 1024).Value = val;
            _DirectionSet(name, direction);
        }
        #endregion
        #region DbPsetInt : 参数设置(int)
        public void DbPsetInt(string name, int val)
        {
            _cm.Parameters.Add(name, DbType.Int32, 1).Value = val;
        }
        public void DbPsetInt(string name, int val, int direction)
        {
            _cm.Parameters.Add(name, DbType.Int32, 1).Value = val;
            _DirectionSet(name, direction);
        }
        #endregion
        #region DbPsetDouble : 参数设置(double)
        public void DbPsetDouble(string name, double val)
        {
            _cm.Parameters.Add(name, DbType.Double, 1).Value = val;
        }
        public void DbPsetDouble(string name, double val, int direction)
        {
            _cm.Parameters.Add(name, DbType.Double, 1).Value = val;
            _DirectionSet(name, direction);
        }
        #endregion
        #region DbPsetDate : 参数设置(date)
        public void DbPsetDate(string name, DateTime val)
        {
            _cm.Parameters.Add(name, DbType.DateTime, 1).Value = val;
        }
        public void DbPsetDate(string name, DateTime val, int direction)
        {
            _cm.Parameters.Add(name, DbType.DateTime, 1).Value = val;
            _DirectionSet(name, direction);
        }
        #endregion

        //=====================================================
        // 参数取得
        //=====================================================
        #region DbPgetString : 参数取得(string)
        /// <summary>
        /// 参数取得(string)
        /// </summary>
        /// <param name="name">取得的参数名称</param>
        /// <returns>参数値</returns>
        public string DbPgetString(string name)
        {
            string val = "";
            val = _cm.Parameters[name].Value.ToString();
            return val;
        }
        #endregion
        #region DbPgetInt : 参数取得(int)
        public int DbPgetInt(string name)
        {
            int rtn = 0;
            try
            {
                rtn = int.Parse(_cm.Parameters[name].Value.ToString());
            }
            catch { }
            return rtn;
        }
        #endregion
        #region DbPgetDouble : 参数取得(double)
        public double DbPgetDouble(string name)
        {
            double rtn = 0;
            try
            {
                rtn = double.Parse(_cm.Parameters[name].Value.ToString());
            }
            catch { }
            return rtn;
        }
        #endregion

        #endregion


        #endregion


    }
}

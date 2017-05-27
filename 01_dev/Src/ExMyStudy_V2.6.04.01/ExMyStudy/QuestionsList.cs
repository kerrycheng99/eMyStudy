using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Xml.Linq;
//using Microsoft.Office.Tools.Excel;
using Microsoft.VisualStudio.Tools.Applications.Runtime;
using Excel = Microsoft.Office.Interop.Excel;
using Office = Microsoft.Office.Core;

namespace ExMyStudy
{
    public partial class QuestionsList
    {
        private void Sheet5_Startup(object sender, System.EventArgs e)
        {
        }

        private void Sheet5_Shutdown(object sender, System.EventArgs e)
        {
        }

        #region VSTO Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InternalStartup()
        {
            this.btnClose.Click += new System.EventHandler(this.btnClose_Click);
            this.btnUpdSQLite.Click += new System.EventHandler(this.btnUpdSQLite_Click);
            this.btnGetSQLite.Click += new System.EventHandler(this.btnGetSQLite_Click);
            this.Startup += new System.EventHandler(this.Sheet5_Startup);
            this.Shutdown += new System.EventHandler(this.Sheet5_Shutdown);

        }

        #endregion

        private void btnClose_Click(object sender, EventArgs e)
        {
            //2014.05.31 add
            Globals.QuestionsExam.Application.ScreenUpdating = false;
            Globals.QuestionsExam.Activate();
            this.Visible = Microsoft.Office.Interop.Excel.XlSheetVisibility.xlSheetHidden;
            Globals.QuestionsExam.Application.ScreenUpdating = true;
        }

        /// <summary>
        /// 将Excel中的资料更新到SQLite数据库中
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void btnUpdSQLite_Click(object sender, EventArgs e)
        {
            string msg = string.Empty;
            Excel.Range listRange = this.lstEnQuestions.DataBodyRange;
            if (listRange == null || listRange.Rows.Count <= 0) //no new data and no original data
            {
                msg = "无可更新的资料";
                MessageBox.Show(msg, this.Name, MessageBoxButtons.OK, MessageBoxIcon.Exclamation);
                return;
            }

            DataTable dt = new DataTable("List");
            dt.Columns.Add("ID"); //行No
            dt.Columns.Add("GRAD"); //年级
            dt.Columns.Add("TERM"); //学期
            dt.Columns.Add("SUBJ"); //科目
            dt.Columns.Add("QTYP"); //题目分类
            dt.Columns.Add("QBOD"); //题干
            dt.Columns.Add("QOPT"); //选项
            dt.Columns.Add("QANS"); //标准答案
            dt.Columns.Add("QLEV"); //重要度
            dt.Columns.Add("UPDT"); //更新标志
            for (int i = 1; i <= listRange.Rows.Count; i++)
            {
                object[,] objVal = (object[,])((Excel.Range)listRange.Rows[i, missing]).Value2;
                DataRow dr = dt.NewRow();
                dr["ID"] = objVal[1, 1];
                dr["GRAD"] = objVal[1, 2];
                dr["TERM"] = objVal[1, 3];
                dr["SUBJ"] = objVal[1, 4];
                dr["QTYP"] = objVal[1, 5];
                dr["QBOD"] = objVal[1, 6];
                dr["QOPT"] = objVal[1, 7];
                dr["QANS"] = objVal[1, 8];
                dr["QLEV"] = objVal[1, 9];
                dr["UPDT"] = objVal[1, 10]; //更新标志
                dt.Rows.Add(dr);
            }

            //筛选更新部分（UPDT='Y'）
            DataView dv = dt.DefaultView;
            dv.RowFilter = "UPDT = 'Y' OR UPDT = 'y'";
            dt = dv.ToTable();

            //
            //试题分类转换 资料转换
            //
            DataTable dtQTYP = new DataTable("QTYP");
            dtQTYP.Columns.Add("CATE");
            dtQTYP.Columns.Add("CTCD");
            dtQTYP.Columns.Add("CTNM");
            Excel.Range lstQType = Globals.Setting.lstQType.DataBodyRange;
            for (int i = 1; i <= lstQType.Rows.Count; i++)
            {
                object[,] objVal = (object[,])((Excel.Range)lstQType.Rows[i, missing]).Value2;
                DataRow dr = dtQTYP.NewRow();
                dr["CATE"] = "QTYP";
                dr["CTCD"] = objVal[1, 1];
                dr["CTNM"] = objVal[1, 2];
                dtQTYP.Rows.Add(dr);
            }
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                DataRow dr = dt.Rows[i];
                string strQtyp = dr["QTYP"].ToString().Trim();
                for (int y = 0; y < dtQTYP.Rows.Count; y++)
                {
                    if (dtQTYP.Rows[y]["CTNM"].ToString() == strQtyp)
                    {
                        dr["QTYP"] = dtQTYP.Rows[y]["CTCD"];
                        break;
                    }
                }
            }
            dt.AcceptChanges();
            if (dt == null || dt.Rows.Count == 0)
            {
                msg = "无可更新的资料";
                MessageBox.Show(msg, this.Name, MessageBoxButtons.OK, MessageBoxIcon.Exclamation);
                return;
            }

            //確認
            msg = "确定执行SQLite更新吗？";
            DialogResult RetCD = MessageBox.Show(msg, this.Name, MessageBoxButtons.YesNo, MessageBoxIcon.Question, MessageBoxDefaultButton.Button2);
            if (RetCD == DialogResult.No || RetCD == DialogResult.Cancel)
            {
                return;
            }
           
            //SQLite更新处理
            try
            {
                Globals.ThisWorkbook.Application.Cursor = Microsoft.Office.Interop.Excel.XlMousePointer.xlWait;
                this.Application.StatusBar = "SQLite资料更新中...";

                ExamQuestions cls=new ExamQuestions();
                cls.upd_dt = dt;
                int intResult = cls.UpdExamQuestions();
                MessageBox.Show(cls.strErr, this.Name, MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, this.Name, MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }
            finally
            {
                Globals.ThisWorkbook.Application.Cursor = Microsoft.Office.Interop.Excel.XlMousePointer.xlDefault;
                this.Application.StatusBar = "就绪"; //"Ready";
            }
        }

        /// <summary>
        /// 从SQLite获取资料并显示
        /// 再次绑定SQLite数据导致Excel退出，暂不使用。
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void btnGetSQLite_Click(object sender, EventArgs e)
        {
            //string msg = string.Empty;
            ////確認
            //msg = "确定从SQLite抽出数据吗？现有数据将全部被覆盖。";
            //DialogResult RetCD = MessageBox.Show(msg, this.Name, MessageBoxButtons.YesNo, MessageBoxIcon.Question, MessageBoxDefaultButton.Button2);
            //if (RetCD == DialogResult.No || RetCD == DialogResult.Cancel)
            //{
            //    return;
            //}

            ////旧有行解除绑定并删除
            //if (this.lstEnQuestions.IsBinding)
            //    this.lstEnQuestions.Disconnect();
            //if (this.lstEnQuestions.DataBodyRange != null)
            //    this.lstEnQuestions.DataBodyRange.EntireRow.Delete(Excel.XlDeleteShiftDirection.xlShiftUp);

            ////数据一览取得处理
            //try
            //{
            //    Globals.ThisWorkbook.Application.Cursor = Microsoft.Office.Interop.Excel.XlMousePointer.xlWait;
            //    this.Application.StatusBar = "SQLite资料获取中...";
            //    this.Application.ScreenUpdating = false;

            //    ExamQuestions cls = new ExamQuestions();
            //    DataSet ds = cls.GetExamQuestionsList();
            //    if (ds == null)
            //    {
            //        MessageBox.Show(cls.strErr, this.Name, MessageBoxButtons.OK, MessageBoxIcon.Warning);
            //        return;
            //    }
            //    DataTable dt = ds.Tables[0];

            //    //
            //    //试题分类转换 资料转换
            //    //
            //    DataTable dtQTYP = new DataTable("QTYP");
            //    dtQTYP.Columns.Add("CATE");
            //    dtQTYP.Columns.Add("CTCD");
            //    dtQTYP.Columns.Add("CTNM");
            //    Excel.Range lstQType = Globals.Setting.lstQType.DataBodyRange;
            //    for (int i = 1; i <= lstQType.Rows.Count; i++)
            //    {
            //        object[,] objVal = (object[,])((Excel.Range)lstQType.Rows[i, missing]).Value2;
            //        DataRow dr = dtQTYP.NewRow();
            //        dr["CATE"] = "QTYP";
            //        dr["CTCD"] = objVal[1, 1];
            //        dr["CTNM"] = objVal[1, 2];
            //        dtQTYP.Rows.Add(dr);
            //    }
            //    for (int i = 0; i < dt.Rows.Count; i++)
            //    {
            //        DataRow dr = dt.Rows[i];
            //        string strQtyp = dr["QTYP"].ToString().Trim();
            //        for (int y = 0; y < dtQTYP.Rows.Count; y++)
            //        {
            //            if (dtQTYP.Rows[y]["CTCD"].ToString() == strQtyp)
            //            {
            //                dr["QTYP"] = dtQTYP.Rows[y]["CTNM"];
            //                break;
            //            }
            //        }
            //    }
            //    dt.AcceptChanges();

            //    this.Application.StatusBar = "资料绑定中...";
            //    //结果数据绑定
            //    //this.lstEnQuestions.DataSource = dt;
            //    this.lstEnQuestions.SetDataBinding(dt);

            //    //格式化
            //    this.lstEnQuestions.DataBoundFormatSettings =
            //        Microsoft.Office.Tools.Excel.FormatSettings.Border;
            //    this.lstEnQuestions.DataBoundFormat =
            //        Excel.XlRangeAutoFormat.xlRangeAutoFormatLocalFormat3;

            //}
            //catch (Exception ex)
            //{
            //    MessageBox.Show(ex.Message, this.Name, MessageBoxButtons.OK, MessageBoxIcon.Error);
            //    return;
            //}
            //finally
            //{
            //    this.Application.ScreenUpdating = true;
            //    Globals.ThisWorkbook.Application.Cursor = Microsoft.Office.Interop.Excel.XlMousePointer.xlDefault;
            //    this.Application.StatusBar = "就绪"; //"Ready";
            //}
        }

    }
}

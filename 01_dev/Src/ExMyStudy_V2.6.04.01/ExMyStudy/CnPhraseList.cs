using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Xml.Linq;
using Microsoft.Office.Tools.Excel;
using Microsoft.VisualStudio.Tools.Applications.Runtime;
using Excel = Microsoft.Office.Interop.Excel;
using Office = Microsoft.Office.Core;

namespace ExMyStudy
{
    public partial class CnPhraseList
    {
        private void Sheet12_Startup(object sender, System.EventArgs e)
        {
        }

        private void Sheet12_Shutdown(object sender, System.EventArgs e)
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
            this.Startup += new System.EventHandler(this.Sheet12_Startup);
            this.Shutdown += new System.EventHandler(this.Sheet12_Shutdown);

        }

        #endregion

        private void btnClose_Click(object sender, EventArgs e)
        {
            Globals.CnPhraseExam.Application.ScreenUpdating = false;
            Globals.CnPhraseExam.Activate();
            this.Visible = Microsoft.Office.Interop.Excel.XlSheetVisibility.xlSheetHidden;
            Globals.CnPhraseExam.Application.ScreenUpdating = true;

        }

        /// <summary>
        /// 将Excel中的资料更新到SQLite数据库中
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void btnUpdSQLite_Click(object sender, EventArgs e)
        {
            string msg = string.Empty;
            Excel.Range listRange = this.lstCnPhrase.DataBodyRange;
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
            dt.Columns.Add("UNIT"); //单元
            dt.Columns.Add("LESN"); //课次
            dt.Columns.Add("WORD"); //词语
            dt.Columns.Add("PINY"); //拼音
            dt.Columns.Add("MEAN"); //意思
            dt.Columns.Add("ISWT"); //可写
            dt.Columns.Add("UPDT"); //更新标志
            for (int i = 1; i <= listRange.Rows.Count; i++)
            {
                object[,] objVal = (object[,])((Excel.Range)listRange.Rows[i, missing]).Value2;
                DataRow dr = dt.NewRow();
                dr["ID"] = objVal[1, 1];
                dr["GRAD"] = objVal[1, 2];
                dr["TERM"] = objVal[1, 3];
                dr["UNIT"] = objVal[1, 4];
                dr["LESN"] = objVal[1, 5];
                dr["WORD"] = objVal[1, 6];
                dr["PINY"] = objVal[1, 7];
                dr["MEAN"] = objVal[1, 8];
                dr["ISWT"] = objVal[1, 9];
                dr["UPDT"] = objVal[1, 10]; //更新标志
                dt.Rows.Add(dr);
            }

            //筛选更新部分（UPDT='Y'）
            DataView dv = dt.DefaultView;
            dv.RowFilter = "UPDT = 'Y' OR UPDT = 'y'";
            dt = dv.ToTable();
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

                CnPhrases cls = new CnPhrases();
                cls.upd_dt = dt;
                int intResult = cls.UpdCnPhrases();
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

    }
}

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Xml.Linq;
using Microsoft.VisualStudio.Tools.Applications.Runtime;
using Excel = Microsoft.Office.Interop.Excel;
using Office = Microsoft.Office.Core;

namespace ExMyStudy
{
    /// <summary>
    /// 修改履历：
    /// 2015.04.01 新增单词分类列[CATG], SQLite同时新增。
    /// </summary>
    public partial class EnWrordsList
    {
        private void Sheet2_Startup(object sender, System.EventArgs e)
        {
            this.Protect(missing, this.ProtectDrawingObjects,
                        true, this.ProtectScenarios, this.ProtectionMode,
                        this.Protection.AllowFormattingCells,
                        this.Protection.AllowFormattingColumns,
                        this.Protection.AllowFormattingRows,
                        this.Protection.AllowInsertingColumns,
                        this.Protection.AllowInsertingRows,
                        this.Protection.AllowInsertingHyperlinks,
                        this.Protection.AllowDeletingColumns,
                        this.Protection.AllowDeletingRows,
                        this.Protection.AllowSorting,
                        this.Protection.AllowFiltering,
                        this.Protection.AllowUsingPivotTables);
        }

        private void Sheet2_Shutdown(object sender, System.EventArgs e)
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
            this.Startup += new System.EventHandler(this.Sheet2_Startup);
            this.Shutdown += new System.EventHandler(this.Sheet2_Shutdown);

        }

        #endregion

        private void btnClose_Click(object sender, EventArgs e)
        {
            //2014.05.31 add
            Globals.EnWordsExam.Application.ScreenUpdating = false;
            Globals.EnWordsExam.Activate();
            this.Visible = Microsoft.Office.Interop.Excel.XlSheetVisibility.xlSheetHidden;
            Globals.EnWordsExam.Application.ScreenUpdating = true;

        }

        /// <summary>
        /// 将Excel中的资料更新到SQLite数据库中
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void btnUpdSQLite_Click(object sender, EventArgs e)
        {
            string msg = string.Empty;
            Excel.Range listRange = this.lstWords.DataBodyRange;
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
            dt.Columns.Add("MODU"); //模组
            dt.Columns.Add("UNIT"); //单元
            dt.Columns.Add("WORD"); //单词
            dt.Columns.Add("PRON"); //音标
            dt.Columns.Add("MEAN"); //意思
            dt.Columns.Add("CATG"); //分类 2015.04.01 ADD
            dt.Columns.Add("ISWT"); //可写
            dt.Columns.Add("UPDT"); //更新标志
            for (int i = 1; i <= listRange.Rows.Count; i++)
            {
                object[,] objVal = (object[,])((Excel.Range)listRange.Rows[i, missing]).Value2;
                DataRow dr = dt.NewRow();
                dr["ID"] = objVal[1, 1];
                dr["GRAD"] = objVal[1, 2];
                dr["TERM"] = objVal[1, 3];
                dr["MODU"] = objVal[1, 4];
                dr["UNIT"] = objVal[1, 5];
                dr["WORD"] = objVal[1, 6];
                dr["PRON"] = objVal[1, 7];
                dr["MEAN"] = objVal[1, 8];
                dr["CATG"] = objVal[1, 9];  //分类 2015.04.01 ADD
                dr["ISWT"] = objVal[1, 10];
                dr["UPDT"] = objVal[1, 11]; //更新标志
                dt.Rows.Add(dr);
            }

            //筛选更新部分（UPDT='Y'）
            DataView dv = dt.DefaultView;
            dv.RowFilter = "UPDT = 'Y' OR UPDT = 'y'";
            dt = dv.ToTable();
            // 单词分类转换 资料转换 2015.04.01 ADD --> 
            DataTable dtCATG = new DataTable("CATG");
            dtCATG.Columns.Add("CATE");
            dtCATG.Columns.Add("CTCD");
            dtCATG.Columns.Add("CTNM");
            Excel.Range lstCatg = Globals.Setting.lstEnWdCatg.DataBodyRange;
            for (int i = 1; i <= lstCatg.Rows.Count; i++)
            {
                object[,] objVal = (object[,])((Excel.Range)lstCatg.Rows[i, missing]).Value2;
                DataRow dr = dtCATG.NewRow();
                dr["CATE"] = "EnWdCatg";
                dr["CTCD"] = objVal[1, 1];
                dr["CTNM"] = objVal[1, 2];
                dtCATG.Rows.Add(dr);
            }
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                DataRow dr = dt.Rows[i];
                string strCATG = dr["CATG"].ToString().Trim();
                for (int y = 0; y < dtCATG.Rows.Count; y++)
                {
                    if (dtCATG.Rows[y]["CTNM"].ToString() == strCATG)
                    {
                        dr["CATG"] = dtCATG.Rows[y]["CTCD"];
                        break;
                    }
                }
            }
            //<--- ADD END
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

                EnWords cls = new EnWords();
                cls.upd_dt = dt;
                int intResult = cls.UpdEnWords();
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

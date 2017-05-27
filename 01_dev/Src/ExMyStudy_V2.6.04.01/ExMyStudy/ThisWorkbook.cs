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
    /// 抽查方式
    ///1.语文 2.数学 3.英语
    /// </summary>
    public enum Subjects
    {
        CHNS = 1,   //语文
        MATH = 2,   //数学
        ENGL = 3    //英语
    }

    /// <summary>
    /// 抽查方式
    /// 0.顺序抽查 1.随机抽查
    /// </summary>
    public enum SortType
    {
        ORDE = 0,
        RAND = 1
    }
    /// <summary>
    /// 生成时点
    /// 0.初始化 1.下一批
    /// </summary>
    public enum ModeTime
    {
        INIT = 0,
        NEXT = 1
    }

    public partial class ThisWorkbook
    {
        private void ThisWorkbook_Startup(object sender, System.EventArgs e)
        {
            //初始化
            Globals.EnWordsExam.Activate();
            Globals.Setting.Visible = Microsoft.Office.Interop.Excel.XlSheetVisibility.xlSheetHidden;
            Globals.EnWordsFormat.Visible = Microsoft.Office.Interop.Excel.XlSheetVisibility.xlSheetHidden;
            Globals.EnWrordsList.Visible = Microsoft.Office.Interop.Excel.XlSheetVisibility.xlSheetHidden;
            Globals.QuestionsFormat.Visible = Microsoft.Office.Interop.Excel.XlSheetVisibility.xlSheetHidden;
            Globals.QuestionsList.Visible = Microsoft.Office.Interop.Excel.XlSheetVisibility.xlSheetHidden;
            Globals.QuestionsListPrt.Visible = Microsoft.Office.Interop.Excel.XlSheetVisibility.xlSheetHidden;
            Globals.CnPhraseFormat.Visible = Microsoft.Office.Interop.Excel.XlSheetVisibility.xlSheetHidden;
            Globals.CnPhraseList.Visible = Microsoft.Office.Interop.Excel.XlSheetVisibility.xlSheetHidden;
            Globals.CnPhrasePrt.Visible = Microsoft.Office.Interop.Excel.XlSheetVisibility.xlSheetHidden;
            
            #region :查询选择下拉框设定:年级/学期/模组/单元/题目重要度/科目
            Excel.Range listRange;
            DataTable dt = new DataTable("CBO");
            dt.Columns.Add("CATE");
            dt.Columns.Add("CTCD");
            dt.Columns.Add("CTNM");
            DataRow emptydr = dt.NewRow();
            emptydr["CATE"] = "";
            emptydr["CTCD"] = "";
            emptydr["CTNM"] = "---全部---";
            dt.Rows.InsertAt(emptydr, 0);

            listRange = Globals.Setting.lstGrade.DataBodyRange;
            for (int i = 1; i <= listRange.Rows.Count; i++)
            {
                object[,] objVal = (object[,])((Excel.Range)listRange.Rows[i, missing]).Value2;
                DataRow dr = dt.NewRow();
                dr["CATE"] = "GRADE";
                dr["CTCD"] = objVal[1, 1];
                dr["CTNM"] = objVal[1, 2];
                dt.Rows.Add(dr);
            }
            listRange = Globals.Setting.lstTerm.DataBodyRange;
            for (int i = 1; i <= listRange.Rows.Count; i++)
            {
                object[,] objVal = (object[,])((Excel.Range)listRange.Rows[i, missing]).Value2;
                DataRow dr = dt.NewRow();
                dr["CATE"] = "TERM";
                dr["CTCD"] = objVal[1, 1];
                dr["CTNM"] = objVal[1, 2];
                dt.Rows.Add(dr);
            }
            listRange = Globals.Setting.lstModule.DataBodyRange;
            for (int i = 1; i <= listRange.Rows.Count; i++)
            {
                object[,] objVal = (object[,])((Excel.Range)listRange.Rows[i, missing]).Value2;
                DataRow dr = dt.NewRow();
                dr["CATE"] = "MODULE";
                dr["CTCD"] = objVal[1, 1];
                dr["CTNM"] = objVal[1, 2];
                dt.Rows.Add(dr);
            }
            listRange = Globals.Setting.lstUnit.DataBodyRange;
            for (int i = 1; i <= listRange.Rows.Count; i++)
            {
                object[,] objVal = (object[,])((Excel.Range)listRange.Rows[i, missing]).Value2;
                DataRow dr = dt.NewRow();
                dr["CATE"] = "UNIT";
                dr["CTCD"] = objVal[1, 1];
                dr["CTNM"] = objVal[1, 2];
                dt.Rows.Add(dr);
            }
            listRange = Globals.Setting.lstCnUnit.DataBodyRange;
            for (int i = 1; i <= listRange.Rows.Count; i++)
            {
                object[,] objVal = (object[,])((Excel.Range)listRange.Rows[i, missing]).Value2;
                DataRow dr = dt.NewRow();
                dr["CATE"] = "CNUNIT";
                dr["CTCD"] = objVal[1, 1];
                dr["CTNM"] = objVal[1, 2];
                dt.Rows.Add(dr);
            }
            listRange = Globals.Setting.lstLevel.DataBodyRange;
            for (int i = 1; i <= listRange.Rows.Count; i++)
            {
                object[,] objVal = (object[,])((Excel.Range)listRange.Rows[i, missing]).Value2;
                DataRow dr = dt.NewRow();
                dr["CATE"] = "LEVEL";
                dr["CTCD"] = objVal[1, 1];
                dr["CTNM"] = objVal[1, 2];
                dt.Rows.Add(dr);
            }
            listRange = Globals.Setting.lstSubject.DataBodyRange;
            for (int i = 1; i <= listRange.Rows.Count; i++)
            {
                object[,] objVal = (object[,])((Excel.Range)listRange.Rows[i, missing]).Value2;
                DataRow dr = dt.NewRow();
                dr["CATE"] = "SUBJ";
                dr["CTCD"] = objVal[1, 1];
                dr["CTNM"] = objVal[1, 2];
                dt.Rows.Add(dr);
            }
            //--->2015.04.01 ADD
            listRange = Globals.Setting.lstEnWdCatg.DataBodyRange;
            for (int i = 1; i <= listRange.Rows.Count; i++)
            {
                object[,] objVal = (object[,])((Excel.Range)listRange.Rows[i, missing]).Value2;
                DataRow dr = dt.NewRow();
                dr["CATE"] = "EnWdCatg";
                dr["CTCD"] = objVal[1, 1];
                dr["CTNM"] = objVal[1, 2];
                dt.Rows.Add(dr);
            }
            //<---
            //年级下拉框数据绑定
            DataView dv = dt.DefaultView;
            dv.RowFilter = "CATE = '' OR CATE = 'GRADE'";
            Globals.EnWordsExam.cboGrade.DataSource = dv;
            Globals.EnWordsExam.cboGrade.ValueMember = "CTCD";
            Globals.EnWordsExam.cboGrade.DisplayMember = "CTNM";
            Globals.EnWordsExam.cboGrade.SelectedIndex = 0;
            //2014.10.27 add
            Globals.QuestionsExam.cboGrade.DataSource = dv;
            Globals.QuestionsExam.cboGrade.ValueMember = "CTCD";
            Globals.QuestionsExam.cboGrade.DisplayMember = "CTNM";
            Globals.QuestionsExam.cboGrade.SelectedIndex = 0;
            //2014.12.02 add
            Globals.CnPhraseExam.cboGrade.DataSource = dv;
            Globals.CnPhraseExam.cboGrade.ValueMember = "CTCD";
            Globals.CnPhraseExam.cboGrade.DisplayMember = "CTNM";
            Globals.CnPhraseExam.cboGrade.SelectedIndex = 0;
            //学期下拉框数据绑定
            dv = dt.Copy().DefaultView;
            dv.RowFilter = "CATE = '' OR CATE = 'TERM'";
            Globals.EnWordsExam.cboTerm.DataSource = dv;
            Globals.EnWordsExam.cboTerm.ValueMember = "CTCD";
            Globals.EnWordsExam.cboTerm.DisplayMember = "CTNM";
            Globals.EnWordsExam.cboTerm.SelectedIndex = 0;
            //2014.10.27 add
            Globals.QuestionsExam.cboTerm.DataSource = dv;
            Globals.QuestionsExam.cboTerm.ValueMember = "CTCD";
            Globals.QuestionsExam.cboTerm.DisplayMember = "CTNM";
            Globals.QuestionsExam.cboTerm.SelectedIndex = 0;
            //2014.12.02 add
            Globals.CnPhraseExam.cboTerm.DataSource = dv;
            Globals.CnPhraseExam.cboTerm.ValueMember = "CTCD";
            Globals.CnPhraseExam.cboTerm.DisplayMember = "CTNM";
            Globals.CnPhraseExam.cboTerm.SelectedIndex = 0;
            //模组下拉框数据绑定
            dv = dt.Copy().DefaultView;
            dv.RowFilter = "CATE = '' OR CATE = 'MODULE'";
            Globals.EnWordsExam.cboModule.DataSource = dv;
            Globals.EnWordsExam.cboModule.ValueMember = "CTCD";
            Globals.EnWordsExam.cboModule.DisplayMember = "CTNM";
            Globals.EnWordsExam.cboModule.SelectedIndex = 0;
            //单元下拉框数据绑定
            dv = dt.Copy().DefaultView;
            dv.RowFilter = "CATE = '' OR CATE = 'UNIT'";
            Globals.EnWordsExam.cboUnit.DataSource = dv;
            Globals.EnWordsExam.cboUnit.ValueMember = "CTCD";
            Globals.EnWordsExam.cboUnit.DisplayMember = "CTNM";
            Globals.EnWordsExam.cboUnit.SelectedIndex = 0;
            //语文单元下拉框数据绑定 2014.12.02
            dv = dt.Copy().DefaultView;
            dv.RowFilter = "CATE = '' OR CATE = 'CNUNIT'";
            Globals.CnPhraseExam.cboUnit.DataSource = dv;
            Globals.CnPhraseExam.cboUnit.ValueMember = "CTCD";
            Globals.CnPhraseExam.cboUnit.DisplayMember = "CTNM";
            Globals.CnPhraseExam.cboUnit.SelectedIndex = 0;
            //题目重要度下拉框数据绑定
            dv = dt.Copy().DefaultView;
            dv.RowFilter = "CATE = '' OR CATE = 'LEVEL'";
            Globals.QuestionsExam.cboLevel.DataSource = dv;
            Globals.QuestionsExam.cboLevel.ValueMember = "CTCD";
            Globals.QuestionsExam.cboLevel.DisplayMember = "CTNM";
            Globals.QuestionsExam.cboLevel.SelectedIndex = 0;
            //科目下拉框数据绑定
            dv = dt.Copy().DefaultView;
            dv.RowFilter = "CATE = 'SUBJ'";
            Globals.QuestionsExam.cboSubject.DataSource = dv;
            Globals.QuestionsExam.cboSubject.ValueMember = "CTCD";
            Globals.QuestionsExam.cboSubject.DisplayMember = "CTNM";
            Globals.QuestionsExam.cboSubject.SelectedIndex = 2;     //默认选择英语
            //单词分类下拉框绑定 2015.04.01 ADD
            dv = dt.Copy().DefaultView;
            dv.RowFilter = "CATE = '' OR CATE = 'EnWdCatg'";
            Globals.EnWordsExam.cboCatg.DataSource = dv;
            Globals.EnWordsExam.cboCatg.ValueMember = "CTCD";
            Globals.EnWordsExam.cboCatg.DisplayMember = "CTNM";
            Globals.EnWordsExam.cboCatg.SelectedIndex = 0;
            #endregion
        }

        private void ThisWorkbook_Shutdown(object sender, System.EventArgs e)
        {
        }

        #region VSTO Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InternalStartup()
        {
            this.Startup += new System.EventHandler(ThisWorkbook_Startup);
            this.Shutdown += new System.EventHandler(ThisWorkbook_Shutdown);
        }

        #endregion

    }
}

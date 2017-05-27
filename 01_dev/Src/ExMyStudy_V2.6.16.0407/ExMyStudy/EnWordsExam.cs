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
using System.Collections;

namespace ExMyStudy
{
    /// <summary>
    /// 修改履历：
    /// 2015.04.01 追加单词分类列[CATG]
    /// </summary>
    public partial class EnWordsExam
    {
        #region 变量
        private string _strMsg = string.Empty;

        private DataTable _dtExam = new DataTable();
        private bool _blFirst = true;
        private bool _blIsEnd = false;
        //private bool _blIsShowList = true;

        private const int ITEMS = 4;
        private int[] _RowArr = new int[ITEMS] { 0, 0, 0, 0 };
        private int _DtRowCnt = 0;
        private int _RowEnd = 1;

        private double _TipsRate = 0.3;
        private int _WordLen = 0;
        private int _TipsCnt = 0;

        #endregion

        private void Sheet1_Startup(object sender, System.EventArgs e)
        {
            //初始化数据表
            InitDataTable();

            //取得列表
            WordsListToDataTable();
        }

        private void Sheet1_Shutdown(object sender, System.EventArgs e)
        {
        }

        #region VSTO Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InternalStartup()
        {
            this.btnGet.Click += new System.EventHandler(this.btnGet_Click);
            this.cboGrade.SelectionChangeCommitted += new System.EventHandler(this.cbo_SelectionChangeCommitted);
            this.cboTerm.SelectionChangeCommitted += new System.EventHandler(this.cbo_SelectionChangeCommitted);
            this.cboModule.SelectionChangeCommitted += new System.EventHandler(this.cbo_SelectionChangeCommitted);
            this.cboUnit.SelectionChangeCommitted += new System.EventHandler(this.cbo_SelectionChangeCommitted);
            this.rdoOrder.CheckedChanged += new System.EventHandler(this.rdo_CheckedChanged);
            this.rdoRandom.CheckedChanged += new System.EventHandler(this.rdo_CheckedChanged);
            this.chkSpell.CheckedChanged += new System.EventHandler(this.chkSpell_CheckedChanged);
            this.btnCancel.Click += new System.EventHandler(this.btnCancel_Click);
            this.btnShowList.Click += new System.EventHandler(this.btnShowList_Click);
            this.cboCatg.SelectionChangeCommitted += new System.EventHandler(this.cbo_SelectionChangeCommitted);
            this.Startup += new System.EventHandler(this.Sheet1_Startup);
            this.Shutdown += new System.EventHandler(this.Sheet1_Shutdown);

        }

        #endregion

        #region 工作表保护
        /// <summary>
        /// 工作表保护
        /// </summary>
        /// <param name="blnLock">true:保护; false:取消保护</param>
        private void Protect(bool blnLock)
        {
            if (blnLock)
            {
                this.Protect(missing,
                            this.ProtectDrawingObjects,
                            true,
                            this.ProtectScenarios,
                            this.ProtectionMode,
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
            else
            {
                this.Unprotect(missing);
            }
        }
        #endregion

        /// <summary>
        /// 初始化数据表
        /// </summary>
        private void InitDataTable()
        {
            _dtExam = new DataTable();

            //data table column define
            _dtExam.Columns.Add("RWNO"); //行No
            _dtExam.Columns.Add("GRTM"); //学期
            _dtExam.Columns.Add("TYPE"); //题目分类
            _dtExam.Columns.Add("QBOD"); //题干
            _dtExam.Columns.Add("QOPT"); //选项
            _dtExam.Columns.Add("QANS"); //标准答案
            _dtExam.Columns.Add("QLEV"); //重要度
        }

        #region WordsListToDataTable() : 生成抽查所需的数据表
        /// <summary>
        /// 生成抽查所需的Table
        /// </summary>
        private void WordsListToDataTable()
        {
            //保護解除
            Protect(false);

            this.nrTop.Activate();
            _strMsg = "单词检索中......";
            this.nrWordsTotal.Value2 = _strMsg;
            InitDataTable();

            Excel.Range listRange = Globals.EnWrordsList.lstWords.DataBodyRange;
            if (listRange != null && listRange.Rows.Count > 0)
            {
                DataTable dt = new DataTable("List");
                dt.Columns.Add("RWNO");
                dt.Columns.Add("GRAD");
                dt.Columns.Add("TERM");
                dt.Columns.Add("MODU");
                dt.Columns.Add("UNIT");
                dt.Columns.Add("WORD");
                dt.Columns.Add("PRON");
                dt.Columns.Add("MEAN");
                dt.Columns.Add("CATG");//单词分类 2015.04.01 add
                dt.Columns.Add("ISWT");

                for (int i = 1; i <= listRange.Rows.Count; i++)
                {
                    object[,] objVal = (object[,])((Excel.Range)listRange.Rows[i, missing]).Value2;
                    DataRow dr = dt.NewRow();
                    dr["RWNO"] = i;
                    dr["GRAD"] = objVal[1, 2];
                    dr["TERM"] = objVal[1, 3];
                    dr["MODU"] = objVal[1, 4];
                    dr["UNIT"] = objVal[1, 5];
                    dr["WORD"] = objVal[1, 6];
                    dr["PRON"] = objVal[1, 7];
                    dr["MEAN"] = objVal[1, 8];
                    dr["CATG"] = objVal[1, 9];//单词分类 2015.04.01 add
                    dr["ISWT"] = objVal[1, 10];
                    dt.Rows.Add(dr);
                }
                //依选择条件作筛选
                if (cboGrade.SelectedValue.ToString() != "")
                {
                    DataView dv = dt.DefaultView;
                    dv.RowFilter = "GRAD = '' OR GRAD = '" + cboGrade.SelectedValue.ToString() + "'";
                    dt = dv.ToTable();
                }
                if (cboTerm.SelectedValue.ToString() != "")
                {
                    DataView dv = dt.DefaultView;
                    dv.RowFilter = "TERM = '' OR TERM = '" + cboTerm.SelectedValue.ToString() + "'";
                    dt = dv.ToTable();
                }
                if (cboModule.SelectedValue.ToString() != "")
                {
                    DataView dv = dt.DefaultView;
                    dv.RowFilter = "MODU = '' OR MODU = '" + cboModule.SelectedValue.ToString() + "'";
                    dt = dv.ToTable();
                }
                if (cboUnit.SelectedValue.ToString() != "")
                {
                    DataView dv = dt.DefaultView;
                    dv.RowFilter = "UNIT = '' OR UNIT = '" + cboUnit.SelectedValue.ToString() + "'";
                    dt = dv.ToTable();
                }
                //单词分类 2015.04.01 add
                if (cboCatg.SelectedValue.ToString() != "")
                {
                    DataView dv = dt.DefaultView;
                    dv.RowFilter = "CATG = '" + cboCatg.Text.ToString() + "'";
                    dt = dv.ToTable();
                }
                if (chkSpell.Checked)
                {
                    DataView dv = dt.DefaultView;
                    dv.RowFilter = "ISWT = 'Y'";
                    dt = dv.ToTable();
                }
                //去掉[单词]列重复行
                //DataView dv = dt.DefaultView;
                //dt = dv.ToTable(true, new string[] { "WORD" });
                //dt = dv.ToTable();
                dt = ComLibrary.DeleteSameRow(dt, "WORD");
                //重新编辑行No
                for (int i = 1; i <= dt.Rows.Count; i++)
                {
                    DataRow dr = dt.Rows[i - 1];
                    dr["RWNO"] = i;
                }
                dt.AcceptChanges();
                _dtExam = dt;
            }

            _strMsg = " 单词共计：" + _dtExam.Rows.Count.ToString();
            this.nrWordsTotal.Value2 = _strMsg;
            this.nrRowNo.Value2 = "";
            this.numBegNo.Minimum = 1;
            this.numBegNo.Maximum = _dtExam.Rows.Count;
            this.numBegNo.Value = _dtExam.Rows.Count == 0 ? 0 : 1;
            this.numEndNo.Minimum = 1;
            this.numEndNo.Maximum = _dtExam.Rows.Count;
            this.numEndNo.Value = _dtExam.Rows.Count == 0 ? 0 : _dtExam.Rows.Count;

            //行削除
            if (this.nrPaste.Row - this.nrTop.Row > 1)
            {
                this.Range["A" + (this.nrTop.Row + 1).ToString(), "A" + (this.nrPaste.Row - 1).ToString()].EntireRow.Delete(missing);
            }

            //protect
            Protect(true);
        }
        #endregion

        #region SettingRowNo(): 获取需显示的行序号
        /// <summary>
        ///  获取需显示的行序号
        /// </summary>
        /// <param name="SortType"></param>
        /// <param name="Mod"></param>
        private void SettingRowNo(SortType sorttype, ModeTime modetime)
        {
            switch (sorttype)
            {
                case SortType.ORDE:
                    if (modetime == ModeTime.INIT)
                    {
                        for (int i = 0; i < ITEMS; i++)
                        {
                            if (i == 0)
                                _RowArr[i] = (int)this.numBegNo.Value;
                            else
                                _RowArr[i] = _RowArr[i - 1] + 1;
                        }
                    }
                    else
                    {
                        for (int i = 0; i < ITEMS; i++)
                        {
                            if (i == 0)
                                _RowArr[i] = _RowArr[ITEMS - 1] + 1;
                            else
                                _RowArr[i] = _RowArr[i - 1] + 1;
                        }
                    }

                    break;

                case SortType.RAND:
                    int rang = (int)numEndNo.Value - (int)numBegNo.Value;
                    if (rang > 0)
                    {
                        if (rang > 4) rang = 4;
                        int[] arr = ComLibrary.getRandomNum(rang, (int)numBegNo.Value, (int)numEndNo.Value);
                        for (int i = 0; i < rang; i++)
                        {
                            _RowArr[i] = arr[i]; 
                        }
                    }
                    break;

                default: break;
            }

            

        }
        #endregion

        #region SettingReadWords() ： 设置单词显示内容
        /// <summary>
        /// 设置单词显示内容
        /// </summary>
        private void SettingReadWords()
        {
            //
            //数据设定
            //
            //单词
            Globals.EnWordsFormat.nrWORD1.Value2 = (_RowArr[0] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[0] - 1]["WORD"] : "";
            Globals.EnWordsFormat.nrWORD2.Value2 = (_RowArr[1] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[1] - 1]["WORD"] : "";
            Globals.EnWordsFormat.nrWORD3.Value2 = (_RowArr[2] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[2] - 1]["WORD"] : "";
            Globals.EnWordsFormat.nrWORD4.Value2 = (_RowArr[3] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[3] - 1]["WORD"] : "";
            //音标
            if (chkPron.Checked)
            {
                Globals.EnWordsFormat.nrPRON1.Value2 = (_RowArr[0] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[0] - 1]["PRON"] : "";
                Globals.EnWordsFormat.nrPRON2.Value2 = (_RowArr[1] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[1] - 1]["PRON"] : "";
                Globals.EnWordsFormat.nrPRON3.Value2 = (_RowArr[2] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[2] - 1]["PRON"] : "";
                Globals.EnWordsFormat.nrPRON4.Value2 = (_RowArr[3] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[3] - 1]["PRON"] : "";
            }
            else
            {
                Globals.EnWordsFormat.nrPRON1.Value2 = "";
                Globals.EnWordsFormat.nrPRON2.Value2 = "";
                Globals.EnWordsFormat.nrPRON3.Value2 = "";
                Globals.EnWordsFormat.nrPRON4.Value2 = "";
            }
            //单词中文解释
            if (chkMean.Checked)
            {
                Globals.EnWordsFormat.nrMEAN1.Value2 = (_RowArr[0] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[0] - 1]["MEAN"] : "";
                Globals.EnWordsFormat.nrMEAN2.Value2 = (_RowArr[1] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[1] - 1]["MEAN"] : "";
                Globals.EnWordsFormat.nrMEAN3.Value2 = (_RowArr[2] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[2] - 1]["MEAN"] : "";
                Globals.EnWordsFormat.nrMEAN4.Value2 = (_RowArr[3] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[3] - 1]["MEAN"] : "";
            }
            else
            {
                Globals.EnWordsFormat.nrMEAN1.Value2 = "";
                Globals.EnWordsFormat.nrMEAN2.Value2 = "";
                Globals.EnWordsFormat.nrMEAN3.Value2 = "";
                Globals.EnWordsFormat.nrMEAN4.Value2 = "";
            }
        }
        #endregion

        #region SettingSpellWords() ： 设置单词拼写内容
        /// <summary>
        /// 设置单词拼写内容
        /// </summary>
        private void SettingSpellWords()
        {
            //
            //数据设定
            //
            //单词
            string newword = string.Empty;
            for (int i = 0; i < ITEMS; i++)
            {
                string word = (_RowArr[i] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[i] - 1]["WORD"].ToString() : "";
                _WordLen = word.Length;
                if (_WordLen > 0)
                {
                    newword = string.Empty.PadRight(_WordLen, '_');
                    StringBuilder sb = new StringBuilder(newword);

                    //_TipsCnt = (int)(_WordLen * _TipsRate);
                    _TipsCnt = (int)Math.Ceiling(_WordLen * _TipsRate);
                    int[] arr = ComLibrary.getRandomNum(_TipsCnt, 1, _WordLen);

                    for (int y = 0; y < arr.Length; y++)
                    {
                        sb.Replace("_", word.Substring(arr[y], 1), arr[y], 1);
                       //newword.Replace( 
                    }
                    newword = sb.ToString();
                }
                //
                switch (i)
                {
                    case 0: Globals.EnWordsFormat.nrWORD1.Value2 = (_RowArr[0] - 1) < _RowEnd ? newword : ""; break;
                    case 1: Globals.EnWordsFormat.nrWORD2.Value2 = (_RowArr[1] - 1) < _RowEnd ? newword : ""; break;
                    case 2: Globals.EnWordsFormat.nrWORD3.Value2 = (_RowArr[2] - 1) < _RowEnd ? newword : ""; break;
                    case 3: Globals.EnWordsFormat.nrWORD4.Value2 = (_RowArr[3] - 1) < _RowEnd ? newword : ""; break;
                    default: break;
                }
            }
            //音标
            if (chkPron.Checked)
            {
                Globals.EnWordsFormat.nrPRON1.Value2 = (_RowArr[0] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[0] - 1]["PRON"] : "";
                Globals.EnWordsFormat.nrPRON2.Value2 = (_RowArr[1] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[1] - 1]["PRON"] : "";
                Globals.EnWordsFormat.nrPRON3.Value2 = (_RowArr[2] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[2] - 1]["PRON"] : "";
                Globals.EnWordsFormat.nrPRON4.Value2 = (_RowArr[3] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[3] - 1]["PRON"] : "";
            }
            else
            {
                Globals.EnWordsFormat.nrPRON1.Value2 = "";
                Globals.EnWordsFormat.nrPRON2.Value2 = "";
                Globals.EnWordsFormat.nrPRON3.Value2 = "";
                Globals.EnWordsFormat.nrPRON4.Value2 = "";
            }
            //单词中文解释
            Globals.EnWordsFormat.nrMEAN1.Value2 = (_RowArr[0] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[0] - 1]["MEAN"] : "";
            Globals.EnWordsFormat.nrMEAN2.Value2 = (_RowArr[1] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[1] - 1]["MEAN"] : "";
            Globals.EnWordsFormat.nrMEAN3.Value2 = (_RowArr[2] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[2] - 1]["MEAN"] : "";
            Globals.EnWordsFormat.nrMEAN4.Value2 = (_RowArr[3] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[3] - 1]["MEAN"] : "";

        }
        #endregion

        private void btnGet_Click(object sender, EventArgs e)
        {
            if (_dtExam == null || _dtExam.Rows.Count <= 0) return;

            SortType sorttype = SortType.ORDE;
            if (rdoRandom.Checked) sorttype = SortType.RAND;

            if (_blFirst) SettingRowNo(sorttype, ModeTime.INIT);

            if (_blIsEnd) return;
            
            try
            {
                Globals.ThisWorkbook.Application.ScreenUpdating = false;
                Globals.ThisWorkbook.Application.Cursor = Microsoft.Office.Interop.Excel.XlMousePointer.xlWait;

                _DtRowCnt = _dtExam.Rows.Count;
                _RowEnd = ((int)numEndNo.Value < _DtRowCnt) ? (int)numEndNo.Value : _DtRowCnt;
                if (!chkSpell.Checked)
                    SettingReadWords();
                else
                    SettingSpellWords();

                for (int i = 0; i < ITEMS; i++)
                {
                    if (_RowArr[i] >= _RowEnd)
                    {
                        this.btnGet.Text = "结束";
                        _blIsEnd = true;
                    }
                    else
                    {
                        this.btnGet.Text = "下一批(&N)";
                    }
                }

                //保護解除
                Protect(false);

                _strMsg = _RowArr[0].ToString() + "/" + _RowArr[1].ToString() + "/" + _RowArr[2].ToString() + "/" + _RowArr[3].ToString();
                this.nrRowNo.Value2 = _strMsg;

                //行削除
                if (this.nrPaste.Row - this.nrTop.Row > 1)
                {
                    this.Range["A" + (this.nrTop.Row + 1).ToString(), "A" + (this.nrPaste.Row - 1).ToString()].EntireRow.Delete(missing);
                }

                Globals.EnWordsFormat.Range["A1", "A11"].EntireRow.Copy(missing);
                this.nrPaste.Insert(Excel.XlInsertShiftDirection.xlShiftDown, Excel.XlInsertFormatOrigin.xlFormatFromLeftOrAbove);
                this.nrTop.Activate();

                //protect
                Protect(true);

                //获取显示行序号
                SettingRowNo(sorttype, ModeTime.NEXT);
                _blFirst = false;
            }
            catch (Exception ex)
            {
                //MessageBox.Show(ex.Message, this.Name, MessageBoxButtons.OK, MessageBoxIcon.Error);
                _strMsg = "无可显示的资料。\n" + ex.ToString();
                MessageBox.Show(_strMsg, this.Name, MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }
            finally
            {
                Globals.ThisWorkbook.Application.ScreenUpdating = true;
                Globals.ThisWorkbook.Application.Cursor = Microsoft.Office.Interop.Excel.XlMousePointer.xlDefault;
                Clipboard.Clear();
            }

        }

        /// <summary>
        ///  重新设置数据并初始化状态
        /// </summary>
        private void ReSettingStatus()
        {
            WordsListToDataTable();

            for (int i = 0; i < ITEMS; i++)
            {
                _RowArr[i] = 0;
            }
            this.btnGet.Text = "抽查(&Q)";
            
            _blFirst = true;
            _blIsEnd = false;

        }
        #region cbo_SelectionChangeCommitted() : 下拉框值改变时触发事件
        /// <summary>
        /// 下拉框值改变时触发事件
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void cbo_SelectionChangeCommitted(object sender, EventArgs e)
        {
            ReSettingStatus();
        }
        #endregion

        #region chkSpell_CheckedChanged() : 拼写检查选择框值改变时触发事件
        private void chkSpell_CheckedChanged(object sender, EventArgs e)
        {
            ReSettingStatus();
        }
        #endregion

        private void rdo_CheckedChanged(object sender, EventArgs e)
        {
            if (((RadioButton)sender).Checked)
            {
                switch (((RadioButton)sender).Name.ToString())
                {
                    case "rdoOrder":
                        rdoRandom.Checked = false;
                        break;
                    case "rdoRandom":
                       rdoOrder.Checked = false;
                        break;
                    default:
                        break;
                }
            }
        }

        private void btnCancel_Click(object sender, EventArgs e)
        {
            ////保護解除
            //Protect(false);

            //_strMsg = string.Empty;
            //this.nrRowNo.Value2 = _strMsg;

            ////行削除
            //if (this.nrPaste.Row - this.nrTop.Row > 1)
            //{
            //    this.Range["A" + (this.nrTop.Row + 1).ToString(), "A" + (this.nrPaste.Row - 1).ToString()].EntireRow.Delete(missing);
            //}

            ////ReSettingStatus();

            ////protect
            //Protect(true);
            ReSettingStatus();
        }

        /// <summary>
        /// 显示（隐藏）题目列表工作表
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void btnShowList_Click(object sender, EventArgs e)
        {
            //2014.05.31 delete
            ////取消工作表保护
            //Protect(false);

            //if (!_blIsShowList)
            //{
            //    btnShowList.Text = "显示列表(&L)";
            //    Globals.EnWrordsList.Visible = Microsoft.Office.Interop.Excel.XlSheetVisibility.xlSheetHidden;//隐藏
            //}
            //else
            //{
            //    btnShowList.Text = "隐藏列表(&L)";
            //    Globals.EnWrordsList.Visible = Microsoft.Office.Interop.Excel.XlSheetVisibility.xlSheetVisible;//显示
            //    Globals.EnWrordsList.Activate();
            //}

            ////变量更新
            //_blIsShowList = !_blIsShowList;

            ////保护工作表
            //Protect(true);
            //2014.05.31 add
            Globals.EnWrordsList.Application.ScreenUpdating = false;
            Globals.EnWrordsList.Visible = Microsoft.Office.Interop.Excel.XlSheetVisibility.xlSheetVisible;//显示
            Globals.EnWrordsList.Activate();
            Globals.EnWrordsList.Application.ScreenUpdating = true;
        }



    }
}

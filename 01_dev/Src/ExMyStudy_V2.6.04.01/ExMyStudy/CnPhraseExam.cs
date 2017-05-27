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
    public partial class CnPhraseExam
    {
        #region 变量
        private string _strMsg = string.Empty;

        private DataTable _dtExam = new DataTable();
        private bool _blFirst = true;
        private bool _blIsEnd = false;
        //private bool _blIsShowList = true;

        private const int ITEMS = 6;
        private int[] _RowArr = new int[ITEMS] { 0, 0, 0, 0, 0, 0 };
        private int _DtRowCnt = 0;
        private int _RowEnd = 1;

        //private double _TipsRate = 0.3;
        //private int _WordLen = 0;
        //private int _TipsCnt = 0;
        private int PRT_ROW_ITEMS = 5;

        #endregion

        private void Sheet13_Startup(object sender, System.EventArgs e)
        {
            //初始化数据表
            InitDataTable();

            //取得列表
            CnPhraseListToDataTable();
        }

        private void Sheet13_Shutdown(object sender, System.EventArgs e)
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
            this.cboUnit.SelectionChangeCommitted += new System.EventHandler(this.cbo_SelectionChangeCommitted);
            this.rdoOrder.CheckedChanged += new System.EventHandler(this.rdo_CheckedChanged);
            this.rdoRandom.CheckedChanged += new System.EventHandler(this.rdo_CheckedChanged);
            this.btnCancel.Click += new System.EventHandler(this.btnCancel_Click);
            this.btnShowList.Click += new System.EventHandler(this.btnShowList_Click);
            this.btnCreRpt.Click += new System.EventHandler(this.btnCreRpt_Click);
            this.Startup += new System.EventHandler(this.Sheet13_Startup);
            this.Shutdown += new System.EventHandler(this.Sheet13_Shutdown);

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
            _dtExam.Columns.Add("GRAD"); //年级
            _dtExam.Columns.Add("TERM"); //学期
            _dtExam.Columns.Add("UNIT"); //单元
            _dtExam.Columns.Add("LESN"); //第几课
            _dtExam.Columns.Add("WORD"); //词语中文
            _dtExam.Columns.Add("PINY"); //词语拼音
            _dtExam.Columns.Add("MEAN"); //释义
            _dtExam.Columns.Add("ISWT"); //必写
        }

        #region CnPhraseListToDataTable() : 生成抽查所需的数据表
        /// <summary>
        /// 生成抽查所需的Table
        /// </summary>
        private void CnPhraseListToDataTable()
        {
            //保護解除
            Protect(false);

            //this.nrCnPhraseTop.Activate();
            _strMsg = "词语检索中......";
            this.nrCnPhraseTotal.Value2 = _strMsg;
            InitDataTable();

            Excel.Range listRange = Globals.CnPhraseList.lstCnPhrase.DataBodyRange;
            if (listRange != null && listRange.Rows.Count > 0)
            {
                DataTable dt = new DataTable("List");
                dt.Columns.Add("RWNO");
                dt.Columns.Add("GRAD");
                dt.Columns.Add("TERM");
                dt.Columns.Add("UNIT");
                dt.Columns.Add("LESN"); 
                dt.Columns.Add("WORD");
                dt.Columns.Add("PINY");
                dt.Columns.Add("MEAN");
                dt.Columns.Add("ISWT");

                for (int i = 1; i <= listRange.Rows.Count; i++)
                {
                    object[,] objVal = (object[,])((Excel.Range)listRange.Rows[i, missing]).Value2;
                    DataRow dr = dt.NewRow();
                    dr["RWNO"] = i;
                    dr["GRAD"] = objVal[1, 2];
                    dr["TERM"] = objVal[1, 3];
                    dr["UNIT"] = objVal[1, 4];
                    dr["LESN"] = objVal[1, 5];
                    dr["WORD"] = objVal[1, 6];
                    dr["PINY"] = objVal[1, 7];
                    dr["MEAN"] = objVal[1, 8];
                    dr["ISWT"] = objVal[1, 9];
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
                if (cboUnit.SelectedValue.ToString() != "")
                {
                    DataView dv = dt.DefaultView;
                    dv.RowFilter = "UNIT = '' OR UNIT = '" + cboUnit.SelectedValue.ToString() + "'";
                    dt = dv.ToTable();
                }
                ////去掉[词语]列重复行
                ////DataView dv = dt.DefaultView;
                ////dt = dv.ToTable(true, new string[] { "WORD" });
                ////dt = dv.ToTable();
                //dt = ComLibrary.DeleteSameRow(dt, "WORD");
                ////重新编辑行No
                //for (int i = 1; i <= dt.Rows.Count; i++)
                //{
                //    DataRow dr = dt.Rows[i - 1];
                //    dr["RWNO"] = i;
                //}
                dt.AcceptChanges();
                _dtExam = dt;
            }

            _strMsg = " 词语共计：" + _dtExam.Rows.Count.ToString();
            this.nrCnPhraseTotal.Value2 = _strMsg;
            this.nrCnPhraseRowNo.Value2 = "";
            this.numBegNo.Minimum = 1;
            this.numBegNo.Maximum = _dtExam.Rows.Count;
            this.numBegNo.Value = _dtExam.Rows.Count == 0 ? 0 : 1;
            this.numEndNo.Minimum = 1;
            this.numEndNo.Maximum = _dtExam.Rows.Count;
            this.numEndNo.Value = _dtExam.Rows.Count == 0 ? 0 : _dtExam.Rows.Count;

            //行削除
            if (this.nrCnPhrasePaste.Row - this.nrCnPhraseTop.Row > 1)
            {
                this.Range["A" + (this.nrCnPhraseTop.Row + 1).ToString(), "A" + (this.nrCnPhrasePaste.Row - 1).ToString()].EntireRow.Delete(missing);
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

        #region SettingReadWords() ： 设置词语显示内容
        /// <summary>
        /// 设置词语显示内容
        /// </summary>
        private void SettingReadWords()
        {
            //
            //数据设定
            //
            //拼音
            Globals.CnPhraseFormat.nrPINY1.Value2 = (_RowArr[0] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[0] - 1]["PINY"] : "";
            Globals.CnPhraseFormat.nrPINY2.Value2 = (_RowArr[1] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[1] - 1]["PINY"] : "";
            Globals.CnPhraseFormat.nrPINY3.Value2 = (_RowArr[2] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[2] - 1]["PINY"] : "";
            Globals.CnPhraseFormat.nrPINY4.Value2 = (_RowArr[3] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[3] - 1]["PINY"] : "";
            Globals.CnPhraseFormat.nrPINY5.Value2 = (_RowArr[4] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[4] - 1]["PINY"] : "";
            Globals.CnPhraseFormat.nrPINY6.Value2 = (_RowArr[5] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[5] - 1]["PINY"] : "";
            //词语中文
            if (chkWord.Checked)
            {
                Globals.CnPhraseFormat.nrPHRASE1.Value2 = (_RowArr[0] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[0] - 1]["WORD"] : "";
                Globals.CnPhraseFormat.nrPHRASE2.Value2 = (_RowArr[1] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[1] - 1]["WORD"] : "";
                Globals.CnPhraseFormat.nrPHRASE3.Value2 = (_RowArr[2] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[2] - 1]["WORD"] : "";
                Globals.CnPhraseFormat.nrPHRASE4.Value2 = (_RowArr[3] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[3] - 1]["WORD"] : "";
                Globals.CnPhraseFormat.nrPHRASE5.Value2 = (_RowArr[4] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[4] - 1]["WORD"] : "";
                Globals.CnPhraseFormat.nrPHRASE6.Value2 = (_RowArr[5] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[5] - 1]["WORD"] : "";
            }
            else
            {
                Globals.CnPhraseFormat.nrPHRASE1.Value2 = "";
                Globals.CnPhraseFormat.nrPHRASE2.Value2 = "";
                Globals.CnPhraseFormat.nrPHRASE3.Value2 = "";
                Globals.CnPhraseFormat.nrPHRASE4.Value2 = "";
                Globals.CnPhraseFormat.nrPHRASE5.Value2 = "";
                Globals.CnPhraseFormat.nrPHRASE6.Value2 = "";
            }
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

                SettingReadWords();

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

                _strMsg = _RowArr[0].ToString() + "/" + _RowArr[1].ToString() + "/" + _RowArr[2].ToString() + "/" + _RowArr[3].ToString()
                    + "/" + _RowArr[4].ToString() + "/" + _RowArr[5].ToString();
                this.nrCnPhraseRowNo.Value2 = _strMsg;

                //行削除
                if (this.nrCnPhrasePaste.Row - this.nrCnPhraseTop.Row > 1)
                {
                    this.Range["A" + (this.nrCnPhraseTop.Row + 1).ToString(), "A" + (this.nrCnPhrasePaste.Row - 1).ToString()].EntireRow.Delete(missing);
                }

                Globals.CnPhraseFormat.Range["A1", "A11"].EntireRow.Copy(missing);
                this.nrCnPhrasePaste.Insert(Excel.XlInsertShiftDirection.xlShiftDown, Excel.XlInsertFormatOrigin.xlFormatFromLeftOrAbove);
                this.nrCnPhraseTop.Activate();

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
            CnPhraseListToDataTable();

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
            
            ReSettingStatus();
        }

        /// <summary>
        /// 显示（隐藏）题目列表工作表
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void btnShowList_Click(object sender, EventArgs e)
        {

            Globals.CnPhraseList.Application.ScreenUpdating = false;
            Globals.CnPhraseList.Visible = Microsoft.Office.Interop.Excel.XlSheetVisibility.xlSheetVisible;//显示
            Globals.CnPhraseList.Activate();
            Globals.CnPhraseList.Application.ScreenUpdating = true;
        }

        /// <summary>
        /// 将词语列表生成报表以供打印
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void btnCreRpt_Click(object sender, EventArgs e)
        {
            if (_dtExam == null || _dtExam.Rows.Count <= 0) return;

            try
            {
                Globals.ThisWorkbook.Application.Cursor = Microsoft.Office.Interop.Excel.XlMousePointer.xlWait;
                Globals.ThisWorkbook.Application.ScreenUpdating = false;

                //先期报表所需数据列表处理
                DataTable dtRpt = null;
                dtRpt = CreCnPhrasePrtTable();

                //报表所需数据绑定
                Globals.CnPhrasePrt.lstPrt.SetDataBinding(dtRpt);

                Globals.CnPhrasePrt.Visible = Microsoft.Office.Interop.Excel.XlSheetVisibility.xlSheetVisible;
                Globals.CnPhrasePrt.Activate();

            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, this.Name, MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }
            finally
            {
                Globals.ThisWorkbook.Application.Cursor = Microsoft.Office.Interop.Excel.XlMousePointer.xlDefault;
                this.Application.ScreenUpdating = true;
            }

        }

        #region CreCnPhrasePrtTable() : 生成语文词语报表用资料表
        /// <summary>
        /// 生成语文词语报表用资料表
        /// </summary>
        /// <returns></returns>
        private DataTable CreCnPhrasePrtTable()
        {
            _dtExam.DefaultView.Sort = "GRAD ASC, TERM ASC, UNIT ASC, LESN ASC, RWNO ASC";    //排序
            DataTable dtTemp = _dtExam.DefaultView.ToTable();

            DataTable dtRpt = new DataTable("Rpt");
            dtRpt.Columns.Add("PINY1"); //词语拼音1
            dtRpt.Columns.Add("SPLT1");
            dtRpt.Columns.Add("PINY2"); //词语拼音2
            dtRpt.Columns.Add("SPLT2");
            dtRpt.Columns.Add("PINY3"); //词语拼音3
            dtRpt.Columns.Add("SPLT3");
            dtRpt.Columns.Add("PINY4"); //词语拼音4
            dtRpt.Columns.Add("SPLT4");
            dtRpt.Columns.Add("PINY5"); //词语拼音5

            string prvRowDist = "";
            string curRowDist = "";
            for (int i = 0; i < dtTemp.Rows.Count; i++)
            {
                DataRow dr = dtTemp.Rows[i];
                curRowDist = dr["GRAD"].ToString().Trim() + "|" + dr["TERM"].ToString().Trim() + "|" + dr["UNIT"].ToString().Trim();

                //动态计算每行词语数（最多5个）
                int Try_Prt_Row_Items = PRT_ROW_ITEMS;
                for (int y = 0; y < PRT_ROW_ITEMS; y++)
                {
                    if (i + y < dtTemp.Rows.Count)
                    {
                        DataRow Trydr = dtTemp.Rows[i + y];
                        string TryRowDist = Trydr["GRAD"].ToString().Trim() + "|" + Trydr["TERM"].ToString().Trim() + "|" + Trydr["UNIT"].ToString().Trim();
                        if (curRowDist != TryRowDist)
                        {
                            Try_Prt_Row_Items = y;
                            break;
                        }
                    }
                }

                    DataRow drPINY = dtRpt.NewRow();
                    DataRow drWORD = dtRpt.NewRow();
                    string drColPINY = "PINY";
                    int ColIdx = 0;
                    for (int x = i; x < (i + Try_Prt_Row_Items) && x < dtTemp.Rows.Count; x++)
                    {
                        dr = dtTemp.Rows[x];
                        curRowDist = dr["GRAD"].ToString().Trim() + "|" + dr["TERM"].ToString().Trim() + "|" + dr["UNIT"].ToString().Trim();
                        if (curRowDist != prvRowDist)
                        {
                            if (prvRowDist != "")
                            {
                                DataRow drEmpty = dtRpt.NewRow();
                                dtRpt.Rows.Add(drEmpty);
                            }
                            DataRow drBod = dtRpt.NewRow();
                            drBod["PINY3"] = dr["GRAD"].ToString() + dr["TERM"].ToString() + " 第" + dr["UNIT"].ToString() + "单元";
                            dtRpt.Rows.Add(drBod);
                        }

                        ColIdx++;
                        drColPINY = "PINY" + ColIdx.ToString();
                        drPINY[drColPINY] = dtTemp.Rows[x]["PINY"].ToString();
                        if (chkWord.Checked)
                        {
                            drWORD[drColPINY] = dtTemp.Rows[x]["WORD"].ToString();
                        }
                        else
                        {
                            drWORD[drColPINY] = "______________________";
                        }

                        prvRowDist = curRowDist;
                    }
                    dtRpt.Rows.Add(drPINY);
                    dtRpt.Rows.Add(drWORD);
                    i += ColIdx - 1;
                //}

            }

            dtRpt.AcceptChanges();

            return dtRpt;
        }
        #endregion


    }
}

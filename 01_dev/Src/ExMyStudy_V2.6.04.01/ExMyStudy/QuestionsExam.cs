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
    public partial class QuestionsExam
    {
        #region 变量
        private string _strMsg = string.Empty;

        private DataTable _dtExam;
        private bool _blFirst = true;
        private bool _blIsEnd = false;
        private bool _blIsShowAns = true;
        //private bool _blIsShowList = true;

        /// <summary>
        /// 每次显示的题目数量
        /// </summary>
        private const int ITEMS = 5;
        private int[] _RowArr = new int[ITEMS] { 0, 0, 0, 0, 0 };
        private int _DtRowCnt = 0;
        private int _RowEnd = 1;

        #endregion

        private void Sheet7_Startup(object sender, System.EventArgs e)
        {
            //初始化数据表
            InitDataTable();
            
            //取得题目列表
            QuestionsListToDataTable();
        }

        private void Sheet7_Shutdown(object sender, System.EventArgs e)
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
            this.cboSubject.SelectionChangeCommitted += new System.EventHandler(this.cbo_SelectionChangeCommitted);
            this.cboLevel.SelectionChangeCommitted += new System.EventHandler(this.cbo_SelectionChangeCommitted);
            this.rdoOrder.CheckedChanged += new System.EventHandler(this.rdo_CheckedChanged);
            this.rdoRandom.CheckedChanged += new System.EventHandler(this.rdo_CheckedChanged);
            this.btnCancel.Click += new System.EventHandler(this.btnCancel_Click);
            this.btnShowAns.Click += new System.EventHandler(this.btnShowAns_Click);
            this.btnShowList.Click += new System.EventHandler(this.btnShowList_Click);
            this.btnCreRpt.Click += new System.EventHandler(this.btnCreRpt_Click);
            this.Startup += new System.EventHandler(this.Sheet7_Startup);
            this.Shutdown += new System.EventHandler(this.Sheet7_Shutdown);

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
            //dt.Columns.Add("GRTM"); //学期 2014.10.28 Del
            _dtExam.Columns.Add("GRAD"); //年级 2014.10.28 Add
            _dtExam.Columns.Add("TERM"); //学期 2014.10.28 Add
            _dtExam.Columns.Add("SUBJ"); //科目 2014.12.08 Add
            _dtExam.Columns.Add("QTYP"); //题目分类
            _dtExam.Columns.Add("QBOD"); //题干
            _dtExam.Columns.Add("QOPT"); //选项
            _dtExam.Columns.Add("QANS"); //标准答案
            _dtExam.Columns.Add("QLEV"); //重要度
        }

        #region QuestionsListToDataTable() : 生成科目抽查所需的数据表
        /// <summary>
        /// 生成科目抽查所需的Table
        /// </summary>
        private void QuestionsListToDataTable()
        {
            //保護解除
            Protect(false);

            //this.nrTop2.Activate();
            _strMsg = "题目检索中......";
            this.nrEnQuestionsTotal.Value2 = _strMsg;
            InitDataTable();

            Excel.Range listRange = Globals.QuestionsList.lstEnQuestions.DataBodyRange;
            if (listRange != null && listRange.Rows.Count > 0)
            {
                DataTable dt = new DataTable("List");
                dt.Columns.Add("RWNO"); //行No
                //dt.Columns.Add("GRTM"); //学期 2014.10.28 Del
                dt.Columns.Add("GRAD"); //年级 2014.10.28 Add
                dt.Columns.Add("TERM"); //学期 2014.10.28 Add
                dt.Columns.Add("SUBJ"); //科目 2014.12.08 Add
                dt.Columns.Add("QTYP"); //题目分类
                dt.Columns.Add("QBOD"); //题干
                dt.Columns.Add("QOPT"); //选项
                dt.Columns.Add("QANS"); //标准答案
                dt.Columns.Add("QLEV"); //重要度

                for (int i = 1; i <= listRange.Rows.Count; i++)
                {
                    object[,] objVal = (object[,])((Excel.Range)listRange.Rows[i, missing]).Value2;
                    DataRow dr = dt.NewRow();
                    dr["RWNO"] = i;
                    //dr["GRTM"] = objVal[1, 2];
                    dr["GRAD"] = objVal[1, 2];
                    dr["TERM"] = objVal[1, 3];
                    dr["SUBJ"] = objVal[1, 4];
                    dr["QTYP"] = objVal[1, 5];
                    dr["QBOD"] = objVal[1, 6];
                    dr["QOPT"] = objVal[1, 7];
                    dr["QANS"] = objVal[1, 8];
                    dr["QLEV"] = objVal[1, 9];
                    dt.Rows.Add(dr);
                }
                //依选择条件作筛选
                //0.【科目】筛选 2014.12.08 add
                if (cboSubject.SelectedValue.ToString() != "")
                {
                    DataView dv = dt.DefaultView;
                    dv.RowFilter = "SUBJ = '' OR SUBJ = '" + cboSubject.SelectedValue.ToString() + "'";
                    dt = dv.ToTable();
                }
                //1.【重要度】筛选
                if (cboLevel.SelectedValue.ToString() != "")
                {
                    DataView dv = dt.DefaultView;
                    dv.RowFilter = "QLEV = '' OR QLEV >= '" + cboLevel.SelectedValue.ToString() + "'";
                    dt = dv.ToTable();
                }
                //2.【题目类别】筛选  未用
                //if (cboType.SelectedValue.ToString() != "")
                //{
                //    DataView dv = dt.DefaultView;
                //    dv.RowFilter = "TYPE = '' OR TYPE = '" + cboType.SelectedValue.ToString() + "'";
                //    dt = dv.ToTable();
                //}
                ////2014.10.27 ADD 【年级】、【学期】筛选条件
                //string strGRTM = string.Empty;
                //if (cboGrade.SelectedValue.ToString() != "")
                //    strGRTM += cboGrade.SelectedValue.ToString();
                //if (cboTerm.SelectedValue.ToString() != "")
                //    strGRTM += cboTerm.SelectedValue.ToString();
                //DataView dv1 = dt.DefaultView;
                // dv1.RowFilter = "GRTM = '' OR GRTM LIKE '%" + strGRTM + "%'";
                //dt = dv1.ToTable();
                //【年级】筛选 2014.10.28 Add
                if (cboGrade.SelectedValue.ToString() != "")
                {
                    DataView dv = dt.DefaultView;
                    dv.RowFilter = "GRAD = '' OR GRAD = '" + cboGrade.SelectedValue.ToString() + "'";
                    dt = dv.ToTable();
                }
                //【学期】筛选 2014.10.28 Add
                if (cboTerm.SelectedValue.ToString() != "")
                {
                    DataView dv = dt.DefaultView;
                    dv.RowFilter = "TERM = '' OR TERM = '" + cboTerm.SelectedValue.ToString() + "'";
                    dt = dv.ToTable();
                }

                //去掉[题干]列重复行
                //DataView dv = dt.DefaultView;
                //dt = dv.ToTable(true, new string[] { "QBOD" });
                //dt = dv.ToTable();
                dt = ComLibrary.DeleteSameRow(dt, "QBOD");

                //重新编辑相关列
                for (int i = 1; i <= dt.Rows.Count; i++)
                {
                    DataRow dr = dt.Rows[i - 1];
                    dr["RWNO"] = i.ToString() + "、";
                    //选项列为空时，题干列、选项列调整
                    if (dr["QOPT"] == null || dr["QOPT"].ToString().Trim() == "")
                    {
                        dr["QOPT"] = dr["QBOD"];
                        dr["QBOD"] = dr["QTYP"];
                    }
                }
                dt.AcceptChanges();

                //按题目分类及题号排序
                dt.DefaultView.Sort = "QTYP ASC, RWNO ASC";
                DataTable dtTemp = dt.DefaultView.ToTable();

                _dtExam = dtTemp;
            }

            _strMsg = cboSubject.Text +" 题目共计：" + _dtExam.Rows.Count.ToString();
            this.nrEnQuestionsTotal.Value2 = _strMsg;
            //this.nrRowNo.Value2 = "";
            this.numBegNo.Minimum = 1;
            this.numBegNo.Maximum = _dtExam.Rows.Count;
            this.numBegNo.Value = _dtExam.Rows.Count == 0 ? 0 : 1;
            this.numEndNo.Minimum = 1;
            this.numEndNo.Maximum = _dtExam.Rows.Count;
            this.numEndNo.Value = _dtExam.Rows.Count == 0 ? 0 : _dtExam.Rows.Count;

            //Excel显示行削除
            if (this.nrPaste2.Row - this.nrTop2.Row > 1)
            {
                this.Range["A" + (this.nrTop2.Row + 1).ToString(), "A" + (this.nrPaste2.Row - 1).ToString()].EntireRow.Delete(missing);
            }

            //protect
            Protect(true);
        }
        #endregion
       
        #region SettingRowNo(): 获取需显示题目的序号
        /// <summary>
        ///  获取需显示题目的序号
        /// </summary>
        /// <param name="sorttype">抽查方式：ORDER.顺序抽查 RAND.随机抽查</param>
        /// <param name="modetime">0.初始化 1.下一批</param>
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
                        if (rang > 5) rang = 5;
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

        #region SettingDispQuestions() ： 设置题目显示内容
        /// <summary>
        /// 设置题目显示内容
        /// </summary>
        private void SettingDispQuestions()
        {
            //
            //题目设定
            //
            //题号
            Globals.QuestionsFormat.nrNo1.Value2 = (_RowArr[0] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[0] - 1]["RWNO"] : "";
            Globals.QuestionsFormat.nrNo2.Value2 = (_RowArr[1] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[1] - 1]["RWNO"] : "";
            Globals.QuestionsFormat.nrNo3.Value2 = (_RowArr[2] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[2] - 1]["RWNO"] : "";
            Globals.QuestionsFormat.nrNo4.Value2 = (_RowArr[3] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[3] - 1]["RWNO"] : "";
            Globals.QuestionsFormat.nrNo5.Value2 = (_RowArr[4] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[4] - 1]["RWNO"] : "";
            //题干
            Globals.QuestionsFormat.nrStem1.Value2 = (_RowArr[0] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[0] - 1]["QBOD"] : "";
            Globals.QuestionsFormat.nrStem2.Value2 = (_RowArr[1] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[1] - 1]["QBOD"] : "";
            Globals.QuestionsFormat.nrStem3.Value2 = (_RowArr[2] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[2] - 1]["QBOD"] : "";
            Globals.QuestionsFormat.nrStem4.Value2 = (_RowArr[3] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[3] - 1]["QBOD"] : "";
            Globals.QuestionsFormat.nrStem5.Value2 = (_RowArr[4] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[4] - 1]["QBOD"] : "";
            //选项
            Globals.QuestionsFormat.nrOptions1.Value2 = (_RowArr[0] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[0] - 1]["QOPT"] : "";
            Globals.QuestionsFormat.nrOptions2.Value2 = (_RowArr[1] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[1] - 1]["QOPT"] : "";
            Globals.QuestionsFormat.nrOptions3.Value2 = (_RowArr[2] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[2] - 1]["QOPT"] : "";
            Globals.QuestionsFormat.nrOptions4.Value2 = (_RowArr[3] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[3] - 1]["QOPT"] : "";
            Globals.QuestionsFormat.nrOptions5.Value2 = (_RowArr[4] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[4] - 1]["QOPT"] : "";

            //答案
            Globals.QuestionsFormat.nrAns1.Value2 = (_RowArr[0] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[0] - 1]["QANS"] : "";
            Globals.QuestionsFormat.nrAns2.Value2 = (_RowArr[1] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[1] - 1]["QANS"] : "";
            Globals.QuestionsFormat.nrAns3.Value2 = (_RowArr[2] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[2] - 1]["QANS"] : "";
            Globals.QuestionsFormat.nrAns4.Value2 = (_RowArr[3] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[3] - 1]["QANS"] : "";
            Globals.QuestionsFormat.nrAns5.Value2 = (_RowArr[4] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[4] - 1]["QANS"] : "";
            
            //if (chkPron.Checked)
            //{
            //    Globals.EnWordsFormat.nrPRON1.Value2 = (_RowArr[0] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[0] - 1]["PRON"] : "";
            //    Globals.EnWordsFormat.nrPRON2.Value2 = (_RowArr[1] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[1] - 1]["PRON"] : "";
            //    Globals.EnWordsFormat.nrPRON3.Value2 = (_RowArr[2] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[2] - 1]["PRON"] : "";
            //    Globals.EnWordsFormat.nrPRON4.Value2 = (_RowArr[3] - 1) < _RowEnd ? _dtExam.Rows[_RowArr[3] - 1]["PRON"] : "";
            //}
            //else
            //{
            //    Globals.EnWordsFormat.nrPRON1.Value2 = "";
            //    Globals.EnWordsFormat.nrPRON2.Value2 = "";
            //    Globals.EnWordsFormat.nrPRON3.Value2 = "";
            //    Globals.EnWordsFormat.nrPRON4.Value2 = "";
            //}

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

                SettingDispQuestions();

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

                //_strMsg = _RowArr[0].ToString() + "/" + _RowArr[1].ToString() + "/" + _RowArr[2].ToString() + "/" + _RowArr[3].ToString();
                //this.nrRowNo.Value2 = _strMsg;

                //行削除
                if (this.nrPaste2.Row - this.nrTop2.Row > 1)
                {
                    this.Range["A" + (this.nrTop2.Row + 1).ToString(), "A" + (this.nrPaste2.Row - 1).ToString()].EntireRow.Delete(missing);
                }

                //
                

                Globals.QuestionsFormat.Range["A1", "A15"].EntireRow.Copy(missing);
                this.nrPaste2.Insert(Excel.XlInsertShiftDirection.xlShiftDown, Excel.XlInsertFormatOrigin.xlFormatFromLeftOrAbove);
                this.nrTop2.Activate();

                //protect
                Protect(true);

                //获取显示行序号
                SettingRowNo(sorttype, ModeTime.NEXT);
                _blFirst = false;
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, this.Name, MessageBoxButtons.OK, MessageBoxIcon.Error);
                //_strMsg = "无可显示的题目。";
                //MessageBox.Show(_strMsg, this.Name, MessageBoxButtons.OK, MessageBoxIcon.Error);
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
            //取得试题基本数据
            QuestionsListToDataTable();

            for (int i = 0; i < ITEMS; i++)
            {
                _RowArr[i] = 0;
            }
            this.btnGet.Text = "抽查(&Q)";

            _blFirst = true;
            _blIsEnd = false;

        }

        #region cbo_SelectionChangeCommitted() : 题目重要度/科目/年级/学期 下拉框值改变时触发事件
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
        /// 显示题目标准答案
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void btnShowAns_Click(object sender, EventArgs e)
        {
            //取消工作表保护
            Protect(false);

            if (!_blIsShowAns)
            {
                btnShowAns.Text = "显示答案(&S)";
                this.Cells[6, 3].EntireColumn.Hidden = 1;   //隐藏

            }
            else
            {
                btnShowAns.Text = "隐藏答案(&H)";
                this.Cells[6, 3].EntireColumn.Hidden = 0;   //显示
            }

            //变量更新
            _blIsShowAns = !_blIsShowAns;

            //保护工作表
            Protect(true);

        }

        /// <summary>
        /// 显示（隐藏）题目列表工作表
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void btnShowList_Click(object sender, EventArgs e)
        {

            ////保护工作表
            //Protect(true);
            
            Globals.QuestionsList.Application.ScreenUpdating = false;
            Globals.QuestionsList.Visible = Microsoft.Office.Interop.Excel.XlSheetVisibility.xlSheetVisible;
            Globals.QuestionsList.Activate();
            Globals.QuestionsList.Application.ScreenUpdating = true;

        }

        /// <summary>
        /// 将题目列表生成报表以供打印
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
                switch (cboSubject.SelectedValue.ToString())
                {
                    case "CN": dtRpt = CreCnPrtTable(); break;
                    case "SX": dtRpt = CreMathPrtTable(); break;
                    case "EN": dtRpt = CreEnPrtTable(); break;
                    default: dtRpt = CreEnPrtTable(); break;
                }

                //报表所需数据绑定
                Globals.QuestionsListPrt.lstPrt.SetDataBinding(dtRpt);

                Globals.QuestionsListPrt.Visible = Microsoft.Office.Interop.Excel.XlSheetVisibility.xlSheetVisible;
                Globals.QuestionsListPrt.Activate();
                
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

        #region CreEnPrtTable() : 生成英语题目报表用资料表
        /// <summary>
        /// 生成英语报表用资料表
        /// </summary>
        /// <returns></returns>
        private DataTable CreEnPrtTable()
        {
            _dtExam.DefaultView.Sort = "QTYP ASC, RWNO ASC";    //按题目分类及题号排序
            DataTable dtTemp = _dtExam.DefaultView.ToTable();
            //重新编辑相关列
            for (int i = 0; i < dtTemp.Rows.Count; i++)
            {
                DataRow dr = dtTemp.Rows[i];

                if (dr["QBOD"].ToString().Trim() == dr["QTYP"].ToString().Trim())
                {
                    dr["QBOD"] = dr["QOPT"];
                    dr["QOPT"] = "";
                }
            }
            dtTemp.AcceptChanges();

            DataTable dtRpt = new DataTable("Rpt");
            dtRpt.Columns.Add("TPNO"); //题目分类&行No
            dtRpt.Columns.Add("QBOD"); //题干&选项
            dtRpt.Columns.Add("QANS"); //答案填写栏

            string prvType = "";
            int TypeNo = 0;
            foreach (DataRow dr in dtTemp.Rows)
            {
                if (dr["QTYP"].ToString() != prvType)
                {
                    DataRow drType = dtRpt.NewRow();
                    drType["TPNO"] = dr["QTYP"].ToString() + "：";
                    drType["QBOD"] = "";
                    drType["QANS"] = "";
                    dtRpt.Rows.Add(drType);
                    TypeNo = 0;
                }

                TypeNo++;
                DataRow drBod = dtRpt.NewRow();
                drBod["TPNO"] = TypeNo.ToString() + "、";
                drBod["QBOD"] = dr["QBOD"];
                drBod["QANS"] = "(        )";
                dtRpt.Rows.Add(drBod);

                if (dr["QOPT"].ToString().Trim() != "")
                {
                    DataRow drOpt = dtRpt.NewRow();
                    drOpt["TPNO"] = "";
                    drOpt["QBOD"] = dr["QOPT"];
                    drOpt["QANS"] = "";
                    dtRpt.Rows.Add(drOpt);
                }

                prvType = dr["QTYP"].ToString();
            }

            dtRpt.AcceptChanges();

            return dtRpt;
        }
        #endregion

        #region CreCnPrtTable() : 生成语文题目报表用资料表
        /// <summary>
        /// 生成语文题目报表用资料表
        /// </summary>
        /// <returns></returns>
        private DataTable CreCnPrtTable()
        {
            _dtExam.DefaultView.Sort = "QTYP ASC, RWNO ASC";    //按题目分类及题号排序
            DataTable dtTemp = _dtExam.DefaultView.ToTable();
            //重新编辑相关列
            for (int i = 0; i < dtTemp.Rows.Count; i++)
            {
                DataRow dr = dtTemp.Rows[i];

                if (dr["QBOD"].ToString().Trim() == dr["QTYP"].ToString().Trim())
                {
                    dr["QBOD"] = dr["QOPT"];
                    dr["QOPT"] = "";
                }
            }
            dtTemp.AcceptChanges();

            DataTable dtRpt = new DataTable("Rpt");
            dtRpt.Columns.Add("TPNO"); //题目分类&行No
            dtRpt.Columns.Add("QBOD"); //题干&选项
            dtRpt.Columns.Add("QANS"); //答案填写栏

            string prvType = "";
            int TypeNo = 0;
            foreach (DataRow dr in dtTemp.Rows)
            {
                if (dr["QTYP"].ToString() != prvType)
                {
                    DataRow drType = dtRpt.NewRow();
                    drType["TPNO"] = dr["QTYP"].ToString() + "：";
                    drType["QBOD"] = "";
                    drType["QANS"] = "";
                    dtRpt.Rows.Add(drType);
                    TypeNo = 0;
                }

                TypeNo++;
                DataRow drBod = dtRpt.NewRow();
                drBod["TPNO"] = TypeNo.ToString() + "、";
                drBod["QBOD"] = dr["QBOD"];
                drBod["QANS"] = "";
                dtRpt.Rows.Add(drBod);

                //语文【选项】栏有值时，将【选项】栏资料作为新行追加
                if (dr["QOPT"].ToString().Trim() != "")
                {
                    DataRow drOpt = dtRpt.NewRow();
                    drOpt["TPNO"] = "";
                    drOpt["QBOD"] = dr["QOPT"];
                    drOpt["QANS"] = "";
                    dtRpt.Rows.Add(drOpt);
                }

                //语文【拼音写词语】、【连词成句】类题目，追加一空行
                //获取[QBOD]列资料长度
                string strQBOD = Convert.ToString(dr["QBOD"]);
                int intLen = 0;
                for (int i = 0; i < strQBOD.Length; i++)
                {
                    byte[] b = System.Text.Encoding.Default.GetBytes(strQBOD.Substring(i, 1));
                    if (b.Length > 1)
                        intLen += 2;
                    else
                        intLen += 1;
                }

                if (dr["QTYP"].ToString().Trim() == "语-拼音写词语" || dr["QTYP"].ToString().Trim() == "语-连词成句")
                {
                    DataRow drPY = dtRpt.NewRow();
                    drPY["TPNO"] = "";
                    drPY["QBOD"] = intLen > 0 ? "".PadRight(intLen, '_') : "";
                    drPY["QANS"] = "";
                    dtRpt.Rows.Add(drPY);
                }

                prvType = dr["QTYP"].ToString();
            }

            dtRpt.AcceptChanges();

            return dtRpt;
        }
        #endregion

        #region CreMathPrtTable() : 生成数学题目报表用资料表
        /// <summary>
        /// 生成数学题目报表用资料表
        /// </summary>
        /// <returns></returns>
        private DataTable CreMathPrtTable()
        {
            _dtExam.DefaultView.Sort = "QTYP ASC, RWNO ASC";    //按题目分类及题号排序
            DataTable dtTemp = _dtExam.DefaultView.ToTable();
            //重新编辑相关列
            for (int i = 0; i < dtTemp.Rows.Count; i++)
            {
                DataRow dr = dtTemp.Rows[i];

                if (dr["QBOD"].ToString().Trim() == dr["QTYP"].ToString().Trim())
                {
                    dr["QBOD"] = dr["QOPT"];
                    dr["QOPT"] = "";
                }
            }
            dtTemp.AcceptChanges();

            DataTable dtRpt = new DataTable("Rpt");
            dtRpt.Columns.Add("TPNO"); //题目分类&行No
            dtRpt.Columns.Add("QBOD"); //题干&选项
            dtRpt.Columns.Add("QANS"); //答案填写栏

            string prvType = "";
            int TypeNo = 0;
            foreach (DataRow dr in dtTemp.Rows)
            {
                if (dr["QTYP"].ToString() != prvType)
                {
                    DataRow drType = dtRpt.NewRow();
                    drType["TPNO"] = dr["QTYP"].ToString() + "：";
                    drType["QBOD"] = "";
                    drType["QANS"] = "";
                    dtRpt.Rows.Add(drType);
                    TypeNo = 0;
                }

                TypeNo++;
                DataRow drBod = dtRpt.NewRow();
                drBod["TPNO"] = TypeNo.ToString() + "、";
                drBod["QBOD"] = dr["QBOD"];
                drBod["QANS"] = (dr["QTYP"].ToString() != "数-判断") ? "" : "(        )";
                dtRpt.Rows.Add(drBod);

                //数学【选项】栏有值时，将【选项】栏资料作为新行追加
                if (dr["QOPT"].ToString().Trim() != "")
                {
                    DataRow drOpt = dtRpt.NewRow();
                    drOpt["TPNO"] = "";
                    drOpt["QBOD"] = dr["QOPT"];
                    drOpt["QANS"] = "";
                    dtRpt.Rows.Add(drOpt);
                }

                //数学【应用题】题目，追加三空行
                if (dr["QTYP"].ToString().Trim() == "数-应用题")
                {
                    for (int i = 0; i < 3; i++)
                    {
                        DataRow drPY = dtRpt.NewRow();
                        drPY["TPNO"] = "";
                        drPY["QBOD"] = "";
                        drPY["QANS"] = "";
                        dtRpt.Rows.Add(drPY);
                    }
                }

                prvType = dr["QTYP"].ToString();
            }

            dtRpt.AcceptChanges();

            return dtRpt;
        }
        #endregion


    }
}

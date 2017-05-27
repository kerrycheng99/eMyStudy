using System;
using System.Collections.Generic;
using System.Web;
using System.Data;
using System.Text;
using System.IO;

using OfficeOpenXml;
using System.Web.UI;
using System.Drawing;

namespace MyStudyClass
{
    /// <summary>
    ///EPPlusHelper 的摘要说明
    /// </summary>
    public class EPPlusHelper
    {
        #region : 构造函数
        public EPPlusHelper()
        {
            //
            //TODO: 在此处添加构造函数逻辑
            //
        }
        #endregion

        #region : 成员变量
        protected Page _opener;
        protected DataTable _dt;
        protected string _filename = "TABLE";
        protected bool _istitle = true;
        protected string _fontname = "微软雅黑";
        protected int _fontsize = 12;
        protected int _warplen = 65;//转Excel折行字符长度
        protected string _defbg = "";
        protected int _oddevenflag = 0;//奇偶行区分标志 0.不区分 1.区分 2016.06.12 add
        protected string oddbg = "";
        protected string evenbg = "";

        protected string _strErr;
        protected string _expmsg;
        #endregion

        #region : 成员属性
        public Page opener { get { return _opener; } set { _opener = value; } }
        public DataTable dt { get { return _dt; } set { _dt = value; } }
        public string filename { get { return _filename; } set { _filename = value; } }
        public bool istitle { get { return _istitle; } set { _istitle = value; } }
        public string fontname { get { return _fontname; } set { _fontname = value; } }
        public int fontsize { get { return _fontsize; } set { _fontsize = value; } }
        public int warplen { get { return _warplen; } set { _warplen = value; } }
        public int oddevenflag { get { return _oddevenflag; } set { _oddevenflag = value; } }
        public string strErr { get { return _strErr; } set { _strErr = value; } }
        public string expmsg { get { return _expmsg; } set { _expmsg = value; } }
        #endregion

        #region : 成员方法
        #region ：数据表转为Excel2007(及以上版本)文件并自动下载
        /// <summary>
        /// 数据表转为Excel2007(及以上版本)文件并自动下载
        /// </summary>
        /// <param name="dt">数据表</param>
        /// <param name="isHeader">显示标题否</param>
        /// <returns></returns>
        public int DatatableDownloadToExcel2007()
        {
            OfficeOpenXml.ExcelPackage ep = new OfficeOpenXml.ExcelPackage();
            OfficeOpenXml.ExcelWorkbook wb = ep.Workbook;
            //配置文件属性
            //wb.Properties.Category = "类别";
            //wb.Properties.Author = "作者";
            //wb.Properties.Comments = "备注";
            //wb.Properties.Company = "公司";
            //wb.Properties.Keywords = "关键字";
            //wb.Properties.Manager = "管理者";
            //wb.Properties.Status = "内容状态";
            //wb.Properties.Subject = "主题";
            //wb.Properties.Title = "标题";
            //wb.Properties.LastModifiedBy = "最后一次保存者";  
            //配置文件属性  
            wb.Properties.Title = "MyStudy";                //标题
            wb.Properties.Author = "Kerry";                 //作者
            wb.Properties.Company = "Kerry Studio";         //公司
            wb.Properties.Comments = "Design By Kerry";     //备注

            //string tmpFilenm = _dt.TableName + "_" +
            //                   DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString().PadLeft(2, '0') + DateTime.Now.Day.ToString().PadLeft(2, '0') +
            //                   DateTime.Now.Hour.ToString().PadLeft(2, '0') + DateTime.Now.Minute.ToString().PadLeft(2, '0') + DateTime.Now.Second.ToString().PadLeft(2, '0') +
            //                   ".xlsx";
            string tmpFilenm = _filename + ".xlsx";

            string SheetName = string.Empty;

            try
            {
                //--->生成多个Sheet
                //总栏位数
                int ColCnt = _dt.Columns.Count;
                //总记录条数
                int RowCnt = _dt.Rows.Count;
                //每个SHEET的行数
                int SheetMaxRow = (_istitle) ? ushort.MaxValue - 1 : ushort.MaxValue;   //65536 rows
                //计算需多少个SHEET
                int SheetCnt = Convert.ToInt32(Math.Round(Convert.ToDouble(RowCnt / SheetMaxRow))) + 1;
                for (int i = 0; i < SheetCnt; i++)
                {
                    SheetName = _filename;
                    if (i > 0)
                        SheetName = _filename + "(" + i.ToString() + ")";
                    OfficeOpenXml.ExcelWorksheet ws = wb.Worksheets.Add(SheetName);
                    //ws.Cells.Style.Font.Size = 10;
                    ws.Cells.Style.Font.Size = _fontsize;
                    ws.Cells.Style.Font.Name = _fontname;

                    //第一行是否显示表头
                    int r = 1;  //EPPlus第一行索引为1
                    if (_istitle)
                    {
                        for (int col = 1; col <= ColCnt && col <= byte.MaxValue; col++)
                        {
                            ws.Cells[r, col].Value = _dt.Columns[col - 1].Caption;
                        }
                    }

                    for (int y = i * SheetMaxRow; y < RowCnt && y < (i + 1) * SheetMaxRow; y++)
                    {
                        r++;
                        for (int x = 1; x <= ColCnt && x <= byte.MaxValue; x++)
                        {
                            ws.Cells[r, x].Value = _dt.Rows[y][x - 1].ToString();
                        }
                    }
                }

                // download
                _opener.Response.Clear();
                _opener.Response.AddHeader("content-disposition", "attachment;  filename=" + HttpUtility.UrlEncode(tmpFilenm));
                _opener.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                _opener.Response.BinaryWrite(ep.GetAsByteArray());
                _opener.Response.Flush();
                _opener.Response.End();

            }
            catch (Exception ex)
            {
                _strErr = ex.ToString();
                return ComConst.FAILED;
            }

            return ComConst.SUCCEED;
        }
        #endregion

        #region :英语单词列表转为Excel2007(及以上版本)含格式化并自动下载
        /// <summary>
        /// 英语单词列表转为Excel2007(及以上版本)含格式化
        /// 并自动下载
        /// </summary>
        /// <returns></returns>
        public int EnWordsDownloadToExcel2007()
        {
            OfficeOpenXml.ExcelPackage ep = new OfficeOpenXml.ExcelPackage();
            OfficeOpenXml.ExcelWorkbook wb = ep.Workbook; 
            //配置文件属性  
            wb.Properties.Title = _filename;                //标题 //"英语单词表";
            wb.Properties.Author = "Kerry";                 //作者
            wb.Properties.Company = "Kerry Studio";         //公司
            wb.Properties.Comments = "Design By Kerry";     //备注

            string tmpFilenm = _filename + ".xlsx";

            string SheetName = string.Empty;

            try
            {
                //--->生成多个Sheet
                //总栏位数
                int ColCnt = _dt.Columns.Count;
                //总记录条数
                int RowCnt = _dt.Rows.Count;
                //每个SHEET的行数
                int SheetMaxRow = (_istitle) ? ushort.MaxValue - 1 : ushort.MaxValue;   //65536 rows
                //计算需多少个SHEET
                int SheetCnt = Convert.ToInt32(Math.Round(Convert.ToDouble(RowCnt / SheetMaxRow))) + 1;
                for (int i = 0; i < SheetCnt; i++)
                {
                    SheetName = _filename;
                    if (i > 0)
                        SheetName = _filename + "(" + i.ToString() + ")";
                    OfficeOpenXml.ExcelWorksheet ws = wb.Worksheets.Add(SheetName);
                    ws.Cells.Style.Font.Size = _fontsize;
                    ws.Cells.Style.Font.Name = _fontname;
                    //ws.Cells.Style.ShrinkToFit = true;//单元格自动适应大小
                    ws.HeaderFooter.differentFirst = false;
                    ws.HeaderFooter.differentOddEven = false;
                    ws.HeaderFooter.FirstHeader.CenteredText = _filename;
                    ws.HeaderFooter.OddHeader.CenteredText = _filename;
                    ws.HeaderFooter.EvenHeader.CenteredText = _filename;
                    ws.HeaderFooter.FirstFooter.CenteredText = "第 " + OfficeOpenXml.ExcelHeaderFooter.PageNumber +
                        " 页，共 " + OfficeOpenXml.ExcelHeaderFooter.NumberOfPages + " 页";
                    ws.HeaderFooter.OddFooter.CenteredText = ws.HeaderFooter.FirstFooter.CenteredText;
                    ws.HeaderFooter.EvenFooter.CenteredText = ws.HeaderFooter.FirstFooter.CenteredText;
                    ws.HeaderFooter.FirstFooter.RightAlignedText = OfficeOpenXml.ExcelHeaderFooter.CurrentDate + " " +
                        OfficeOpenXml.ExcelHeaderFooter.CurrentTime;
                    ws.HeaderFooter.OddFooter.RightAlignedText = ws.HeaderFooter.FirstFooter.RightAlignedText;
                    ws.HeaderFooter.EvenFooter.RightAlignedText = ws.HeaderFooter.FirstFooter.RightAlignedText;

                    ws.PrinterSettings.PaperSize = OfficeOpenXml.ePaperSize.A4;             // 设置页面大小为A4 
                    ws.PrinterSettings.Orientation = OfficeOpenXml.eOrientation.Portrait;   // 设置垂直版面
                    ws.PrinterSettings.HeaderMargin = 0.196850393700787m;   // 设置页眉边距 0.5cm
                    ws.PrinterSettings.FooterMargin = 0.196850393700787m;   // 设置页脚边距 0.5cm
                    ws.PrinterSettings.LeftMargin = 0.354330708661417m;     // 设置左边距  0.9cm
                    ws.PrinterSettings.RightMargin = 0.354330708661417m;    // 设置右边距  0.9cm
                    ws.PrinterSettings.TopMargin = 0.393700787401575m;      // 设置上边距  1cm
                    ws.PrinterSettings.BottomMargin = 0.393700787401575m;   // 设置下边距  1cm
                    ws.PrinterSettings.HorizontalCentered = true;           // 设置水平居中
                    ws.PrinterSettings.RepeatRows = new OfficeOpenXml.ExcelAddress("1:1");  // 顶端标题行
                    ws.View.FreezePanes(2, 1);//冻结窗格
                    ws.View.ShowGridLines = false;

                    int r = 0;  //EPPlus第一行索引为1
                    //第一行是否显示表头
                    if (_istitle)
                    {
                        r++;
                        for (int col = 1; col <= ColCnt && col <= byte.MaxValue; col++)
                        {
                            ws.Cells[r, col].Value = _dt.Columns[col - 1].Caption;
                            ws.Cells[r, col].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Hair);//设置单元格所有边框
                        }
                        ws.Cells[r, 1, r, ColCnt].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                        ws.Cells[r, 1, r, ColCnt].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(141, 180, 226));//设置背景色79, 129, 189
                        ws.Cells[r, 1, r, ColCnt].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;//文字水平居中
                        ws.Row(r).Height = 19.50;       //设置行高
                        ws.Row(r).CustomHeight = true;  //不自动调整行高
                    }

                    for (int y = i * SheetMaxRow; y < RowCnt && y < (i + 1) * SheetMaxRow; y++)
                    {
                        r++;
                        for (int x = 1; x <= ColCnt && x <= byte.MaxValue; x++)
                        {
                            ws.Cells[r, x].Value = _dt.Rows[y][x - 1].ToString();
                            ws.Cells[r, x].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Hair);//设置单元格所有边框
                        }
                        //偶数行背景色
                        if (r % 2 == 0)
                        {
                            ws.Cells[r, 1, r, ColCnt].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                            ws.Cells[r, 1, r, ColCnt].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(220, 230, 241));//设置背景色
                        }
                        ws.Row(r).Height = 19.50;       //设置行高
                        ws.Row(r).CustomHeight = true;  //不自动调整行高
                    }

                    //设置Excel格式
                    for (int col = 1; col <= ColCnt && col <= byte.MaxValue; col++)
                    {
                        //设置列宽
                        if (col <= 4)
                        {
                            ws.Column(col).Width = 3.50;
                            ws.Column(col).Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;//文字水平居中
                        }
                        if (col == 5 || col == 7)
                            ws.Column(col).Width = 25.00;
                        if (col == 6)
                            ws.Column(col).Width = 22.00;
                        if (col == 8)
                        {
                            ws.Column(col).Width = 5.00;
                            ws.Column(col).Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;//文字水平居中
                        }
                    }
                }

                // download
                _opener.Response.Clear();
                //_opener.Response.AddHeader("content-disposition", "attachment;  filename=" + HttpUtility.UrlEncode(tmpFilenm));
                _opener.Response.AddHeader("content-disposition", "attachment;  filename=" + HttpUtility.UrlEncode(tmpFilenm).Replace("+", "%20"));
                _opener.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                _opener.Response.BinaryWrite(ep.GetAsByteArray());
                _opener.Response.Flush();
                _opener.Response.End();

            }
            catch (Exception ex)
            {
                _strErr = ex.ToString();
                return ComConst.FAILED;
            }

            return ComConst.SUCCEED;
        }
        #endregion

        #region :语文词语列表转为Excel2007(及以上版本)含格式化并自动下载
        /// <summary>
        /// 语文词语列表转为Excel2007(及以上版本)含格式化
        /// 并自动下载
        /// </summary>
        /// <returns></returns>
        public int CnPhrasesDownloadToExcel2007()
        {
            int WORKSHEET_ROWS_COUNT = 42;//每页行数

            OfficeOpenXml.ExcelPackage ep = new OfficeOpenXml.ExcelPackage();
            OfficeOpenXml.ExcelWorkbook wb = ep.Workbook;
            //配置文件属性  
            wb.Properties.Title = _filename;                //标题    //"语文词语表"
            wb.Properties.Author = "Kerry";                 //作者
            wb.Properties.Company = "Kerry Studio";         //公司
            wb.Properties.Comments = "Design By Kerry";     //备注

            string tmpFilenm = _filename + ".xlsx";

            string SheetName = string.Empty;

            try
            {
                //--->生成多个Sheet
                //总栏位数
                int ColCnt = _dt.Columns.Count;
                //总记录条数
                int RowCnt = _dt.Rows.Count;
                //每个SHEET的行数
                int SheetMaxRow = (_istitle) ? ushort.MaxValue - 1 : ushort.MaxValue;   //65536 rows
                //计算需多少个SHEET
                int SheetCnt = Convert.ToInt32(Math.Round(Convert.ToDouble(RowCnt / SheetMaxRow))) + 1;
                for (int i = 0; i < SheetCnt; i++)
                {
                    SheetName = _filename;
                    if (i > 0)
                        SheetName = _filename + "(" + i.ToString() + ")";
                    OfficeOpenXml.ExcelWorksheet ws = wb.Worksheets.Add(SheetName);
                    ws.Cells.Style.Font.Size = _fontsize;
                    ws.Cells.Style.Font.Name = _fontname;
                    //ws.Cells.Style.ShrinkToFit = true;//单元格自动适应大小
                    ws.HeaderFooter.differentFirst = false;
                    ws.HeaderFooter.differentOddEven = false;
                    ws.HeaderFooter.FirstHeader.CenteredText = _filename;
                    ws.HeaderFooter.OddHeader.CenteredText = _filename;
                    ws.HeaderFooter.EvenHeader.CenteredText = _filename;
                    ws.HeaderFooter.FirstFooter.CenteredText = "第 " + OfficeOpenXml.ExcelHeaderFooter.PageNumber +
                        " 页，共 " + OfficeOpenXml.ExcelHeaderFooter.NumberOfPages + " 页";
                    ws.HeaderFooter.OddFooter.CenteredText = ws.HeaderFooter.FirstFooter.CenteredText;
                    ws.HeaderFooter.EvenFooter.CenteredText = ws.HeaderFooter.FirstFooter.CenteredText;

                    ws.PrinterSettings.PaperSize = OfficeOpenXml.ePaperSize.A4;             // 设置页面大小为A4 
                    ws.PrinterSettings.Orientation = OfficeOpenXml.eOrientation.Portrait;   // 设置垂直版面
                    ws.PrinterSettings.HeaderMargin = 0.196850393700787m;   // 设置页眉边距 0.5cm
                    ws.PrinterSettings.FooterMargin = 0.196850393700787m;   // 设置页脚边距 0.5cm
                    ws.PrinterSettings.LeftMargin = 0.354330708661417m;     // 设置左边距  0.9cm
                    ws.PrinterSettings.RightMargin = 0.354330708661417m;    // 设置右边距  0.9cm
                    ws.PrinterSettings.TopMargin = 0.354330708661417m;      // 设置上边距  0.9cm
                    ws.PrinterSettings.BottomMargin = 0.354330708661417m;   // 设置下边距  0.9cm
                    ws.PrinterSettings.HorizontalCentered = true;           // 设置水平居中
                    //ws.PrinterSettings.RepeatRows = new OfficeOpenXml.ExcelAddress("1:1");  // 顶端标题行
                    ws.PrinterSettings.FitToPage = true;
                    ws.PrinterSettings.FitToWidth = 1;
                    ws.PrinterSettings.FitToHeight = 0;
                    //ws.View.FreezePanes(2, 1);//冻结窗格
                    ws.View.ShowGridLines = false;

                    int r = 0;  //EPPlus第一行索引为1
                    int page_break_row_no = 0;
                    //第一行是否显示表头
                    if (_istitle)
                    {
                        r++;
                        page_break_row_no++;
                        for (int col = 1; col <= ColCnt && col <= byte.MaxValue; col++)
                        {
                            ws.Cells[r, col].Value = _dt.Columns[col - 1].Caption;
                            ws.Cells[r, col].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Hair);//设置单元格所有边框
                        }
                        ws.Cells[r, 1, r, ColCnt].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                        ws.Cells[r, 1, r, ColCnt].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(141, 180, 226));//设置背景色79, 129, 189
                        ws.Cells[r, 1, r, ColCnt].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;//文字水平居中
                        ws.Row(r).Height = 30.00;       //设置行高
                        ws.Row(r).CustomHeight = true;  //不自动调整行高
                    }

                    for (int y = i * SheetMaxRow; y < RowCnt && y < (i + 1) * SheetMaxRow; y++)
                    {
                        r++;
                        page_break_row_no++;
                        for (int x = 1; x <= ColCnt && x <= byte.MaxValue; x++)
                        {
                            ws.Cells[r, x].Value = _dt.Rows[y][x - 1].ToString();
                        }
                        //手工重新分页,让页末拼音和词语保持在同一页
                        ws.Row(r).PageBreak = false;
                        if (page_break_row_no == (WORKSHEET_ROWS_COUNT - 1) &&
                            (y + 1) < RowCnt &&
                            _dt.Rows[y + 1][0].ToString().Trim().IndexOf("(") == 0)
                        {
                            page_break_row_no++;
                        }
                        if (page_break_row_no == WORKSHEET_ROWS_COUNT)
                        {
                            ws.Row(r).PageBreak = true;
                            page_break_row_no = 0;
                        }
                        
                        ws.Row(r).Height = 30.00;       //设置行高
                        ws.Row(r).CustomHeight = true;  //不自动调整行高
                    }

                    //设置Excel格式
                    for (int col = 1; col <= ColCnt && col <= byte.MaxValue; col++)
                    {
                        //设置列宽
                        if (col % 2 == 0)
                        {
                            ws.Column(col).Width = 2.30;//1.63
                        }
                        else
                        {
                            ws.Column(col).Width = 28.03;//27.38
                            ws.Column(col).Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;//文字水平居中
                        }
                    }
                    
                }

                // download
                _opener.Response.Clear();
                //_opener.Response.AddHeader("content-disposition", "attachment;  filename=" + HttpUtility.UrlEncode(tmpFilenm));
                _opener.Response.AddHeader("content-disposition", "attachment;  filename=" + HttpUtility.UrlEncode(tmpFilenm).Replace("+", "%20"));
                _opener.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                _opener.Response.BinaryWrite(ep.GetAsByteArray());
                _opener.Response.Flush();
                _opener.Response.End();

            }
            catch (Exception ex)
            {
                _strErr = ex.ToString();
                return ComConst.FAILED;
            }

            return ComConst.SUCCEED;
        }
        #endregion

        #region :试题列表转为Excel2007(及以上版本)含格式化并自动下载
        /// <summary>
        /// 试题列表转为Excel2007(及以上版本)含格式化
        /// 并自动下载
        /// </summary>
        /// <returns></returns>
        public int ExamQuestionsDownloadToExcel2007()
        {
            //int WORKSHEET_ROWS_COUNT = 42;//每页行数

            OfficeOpenXml.ExcelPackage ep = new OfficeOpenXml.ExcelPackage();
            OfficeOpenXml.ExcelWorkbook wb = ep.Workbook;
            //配置文件属性  
            wb.Properties.Title = _filename;                //标题    //"试题列表"
            wb.Properties.Author = "Kerry";                 //作者
            wb.Properties.Company = "Kerry Studio";         //公司
            wb.Properties.Comments = "Design By Kerry";     //备注

            string tmpFilenm = _filename + ".xlsx";

            string SheetName = string.Empty;

            try
            {
                //--->生成多个Sheet
                //总栏位数
                int ColCnt = _dt.Columns.Count;
                //总记录条数
                int RowCnt = _dt.Rows.Count;
                //每个SHEET的行数
                int SheetMaxRow = (_istitle) ? ushort.MaxValue - 1 : ushort.MaxValue;   //65536 rows
                //计算需多少个SHEET
                int SheetCnt = Convert.ToInt32(Math.Round(Convert.ToDouble(RowCnt / SheetMaxRow))) + 1;
                for (int i = 0; i < SheetCnt; i++)
                {
                    SheetName = _filename;
                    if (i > 0)
                        SheetName = _filename + "(" + i.ToString() + ")";
                    OfficeOpenXml.ExcelWorksheet ws = wb.Worksheets.Add(SheetName);
                    ws.Cells.Style.Font.Size = _fontsize;
                    ws.Cells.Style.Font.Name = _fontname;
                    //ws.Cells.Style.ShrinkToFit = true;//单元格自动适应大小
                    ws.HeaderFooter.differentFirst = false;
                    ws.HeaderFooter.differentOddEven = false;
                    ws.HeaderFooter.FirstHeader.CenteredText = _filename;
                    ws.HeaderFooter.OddHeader.CenteredText = _filename;
                    ws.HeaderFooter.EvenHeader.CenteredText = _filename;
                    ws.HeaderFooter.FirstFooter.CenteredText = "第 " + OfficeOpenXml.ExcelHeaderFooter.PageNumber +
                        " 页，共 " + OfficeOpenXml.ExcelHeaderFooter.NumberOfPages + " 页";
                    ws.HeaderFooter.OddFooter.CenteredText = ws.HeaderFooter.FirstFooter.CenteredText;
                    ws.HeaderFooter.EvenFooter.CenteredText = ws.HeaderFooter.FirstFooter.CenteredText;

                    ws.PrinterSettings.PaperSize = OfficeOpenXml.ePaperSize.A4;             // 设置页面大小为A4 
                    ws.PrinterSettings.Orientation = OfficeOpenXml.eOrientation.Portrait;   // 设置垂直版面
                    ws.PrinterSettings.HeaderMargin = 0.196850393700787m;   // 设置页眉边距 0.5cm
                    ws.PrinterSettings.FooterMargin = 0.196850393700787m;   // 设置页脚边距 0.5cm
                    ws.PrinterSettings.LeftMargin = 0.354330708661417m;     // 设置左边距  0.9cm
                    ws.PrinterSettings.RightMargin = 0.354330708661417m;    // 设置右边距  0.9cm
                    ws.PrinterSettings.TopMargin = 0.393700787401575m;      // 设置上边距  1cm
                    ws.PrinterSettings.BottomMargin = 0.393700787401575m;   // 设置下边距  1cm
                    ws.PrinterSettings.HorizontalCentered = true;           // 设置水平居中
                    //ws.PrinterSettings.RepeatRows = new OfficeOpenXml.ExcelAddress("1:1");  // 顶端标题行
                    ws.PrinterSettings.FitToPage = true;
                    ws.PrinterSettings.FitToWidth = 1;
                    ws.PrinterSettings.FitToHeight = 0;
                    //ws.View.FreezePanes(2, 1);//冻结窗格
                    ws.View.ShowGridLines = false;
                    //ws.DefaultRowHeight = 19.50;//默认行高

                    int r = 0;  //EPPlus第一行索引为1
                    int page_break_row_no = 0;
                    //第一行是否显示表头
                    if (_istitle)
                    {
                        r++;
                        page_break_row_no++;
                        for (int col = 1; col <= ColCnt && col <= byte.MaxValue; col++)
                        {
                            ws.Cells[r, col].Value = _dt.Columns[col - 1].Caption;
                            //ws.Cells[r, col].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Hair);//设置单元格所有边框
                        }
                        ws.Cells[r, 1, r, ColCnt].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                        ws.Cells[r, 1, r, ColCnt].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(141, 180, 226));//设置背景色79, 129, 189
                        ws.Cells[r, 1, r, ColCnt].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;//文字水平居中
                        ws.Row(r).Height = 15.05;        //设置行高 //2016.06.12 19.50->15.0
                        ws.Row(r).CustomHeight = false;  //自动调整行高
                    }

                    for (int y = i * SheetMaxRow; y < RowCnt && y < (i + 1) * SheetMaxRow; y++)
                    {
                        r++;
                        page_break_row_no++;
                        for (int x = 1; x <= ColCnt && x <= byte.MaxValue; x++)
                        {
                            ws.Cells[r, x].Value = _dt.Rows[y][x - 1].ToString();
                            //第1列为试题类别则合并之
                            if (x == 1 && _dt.Rows[y][x - 1].ToString().Trim().IndexOf("：") >= 0)
                            {
                                ws.Cells[r, x].Style.Font.Bold = true;
                                ws.Cells[r, x, r, x + 2].Merge = true;
                                if (_dt.Rows[y][x - 1].ToString().IndexOf("参考答案") >= 0)//第1列以“参考答案”开头则跳页
                                    ws.Row(r - 1).PageBreak = true;
                                break;
                            }

                            ////最后一列为空时合并之,会导致自动调整行高失效
                            //if (x == ColCnt && _dt.Rows[y][x - 1].ToString().Trim() == "")
                            //{
                            //    ws.Cells[r, x - 1, r, x].Merge = true;
                            //}

                            ////单元格文字靠上对齐
                            ////if (x == 1)
                            //    ws.Cells[r, x].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Top;
                        }

                        //偶数行背景色
                        if (r % 2 == 0 && _oddevenflag == 1)
                        {
                            ws.Cells[r, 1, r, ColCnt].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                            ws.Cells[r, 1, r, ColCnt].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(248, 248, 248));//设置背景色
                        }

                        //获取[QBOD]列资料长度
                        string strQBOD = Convert.ToString(_dt.Rows[y][1]);
                        int intLen = System.Text.Encoding.Default.GetBytes(strQBOD).Length;
                        //ws.Cells[r, ColCnt].Value = "Len:"+intLen.ToString(); //debug;

                        if (intLen <= _warplen)//default 65 charts
                            ws.Row(r).Height = 15.05;        //设置行高 //2016.06.12 19.50->15.0
                        else
                            ws.Row(r).CustomHeight = false;  //自动调整行高
                    }

                    //单元格文字靠上对齐
                    ws.Cells[1, 1, r, ColCnt].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Top;

                    //设置Excel格式
                    for (int col = 1; col <= ColCnt && col <= byte.MaxValue; col++)
                    {
                        //设置列宽
                        if (col == 1)
                        {
                            ws.Column(col).Width = 6.38;
                            ws.Column(col).Style.WrapText = false;
                        }
                        else if (col == 2)
                        {
                            ws.Column(col).Width = 76.00;
                            ws.Column(col).Style.WrapText = true;
                        }
                        else if (col == 3)
                        {
                            ws.Column(col).Width = 12.00;
                        }
                        
                    }

                }

                // download
                _opener.Response.Clear();
                _opener.Response.AddHeader("content-disposition", "attachment;  filename=" + HttpUtility.UrlEncode(tmpFilenm).Replace("+", "%20"));
                _opener.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                _opener.Response.BinaryWrite(ep.GetAsByteArray());
                _opener.Response.Flush();
                _opener.Response.End();

            }
            catch (Exception ex)
            {
                _strErr = ex.ToString();
                return ComConst.FAILED;
            }

            return ComConst.SUCCEED;
        }
        #endregion

        #endregion

    }
}
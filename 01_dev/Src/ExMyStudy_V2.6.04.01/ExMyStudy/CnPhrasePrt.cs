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
    public partial class CnPhrasePrt
    {
        private void Sheet14_Startup(object sender, System.EventArgs e)
        {
        }

        private void Sheet14_Shutdown(object sender, System.EventArgs e)
        {
        }

        #region VSTO Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InternalStartup()
        {
            this.btnPrt.Click += new System.EventHandler(this.btnPrt_Click);
            this.btnClose.Click += new System.EventHandler(this.btnClose_Click);
            this.Startup += new System.EventHandler(this.Sheet14_Startup);
            this.Shutdown += new System.EventHandler(this.Sheet14_Shutdown);

        }

        #endregion

        private void btnClose_Click(object sender, EventArgs e)
        {
            //解除
            if (this.lstPrt.IsBinding)
                this.lstPrt.Disconnect();

            if (this.lstPrt.DataBodyRange != null)
                this.lstPrt.DataBodyRange.EntireRow.Delete(Excel.XlDeleteShiftDirection.xlShiftUp);

            Globals.CnPhraseExam.Activate();
            Globals.CnPhrasePrt.Visible = Microsoft.Office.Interop.Excel.XlSheetVisibility.xlSheetHidden;
        }

        private void btnPrt_Click(object sender, EventArgs e)
        {
            Excel.Range listRange = this.lstPrt.DataBodyRange;
            if (listRange == null || listRange.Rows.Count <= 0)
            {
                MessageBox.Show("没有资料可供打印。", this.Name, MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            string RptTitle = "语文词语表";

            int intRowBeg = this.lstPrt.DataBodyRange.Row;
            int intColBeg = this.lstPrt.DataBodyRange.Column;
            int intRowEnd = this.lstPrt.DataBodyRange.Row + listRange.Rows.Count - 1;
            int intColEnd = this.lstPrt.DataBodyRange.Column + listRange.Columns.Count - 1;
            Excel.Range PrtRang = this.Range[this.Cells[intRowBeg, intColBeg], this.Cells[intRowEnd, intColEnd]];
            //
            //打印设置
            //
            this.PageSetup.PaperSize = Excel.XlPaperSize.xlPaperA4;           //Ａ４
            this.PageSetup.Orientation = Excel.XlPageOrientation.xlPortrait; //纵向
            this.PageSetup.CenterHorizontally = true;   //水平居中
            this.PageSetup.CenterHeader = RptTitle;
            this.PageSetup.PrintArea = PrtRang.get_Address(missing, missing, Excel.XlReferenceStyle.xlA1, missing, missing);//打印范围

            //
            //打印
            //
            string printer;
            using (PrinterForm PrinterF = new PrinterForm())
            {
                if (PrinterF.ShowDialog() == DialogResult.OK)
                {
                    printer = PrinterF.Printer;
                    PrinterF.Close();
                    //this.PrintPreview(true);
                    //this.PrintOut(missing, missing, missing, missing, missing, missing, missing, missing);
                    this.PrintOut(missing, missing, 1, false, printer, false, false, missing);
                }
            }

        }


    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

public partial class PrinterForm : Form
{
    /// <summary>
    /// フィールド
    /// </summary>
    protected string _Printer = string.Empty;   //プリンタ  //ADD 2009/3/2

    #region : プロパティ
    /// <summary>プリンタ</summary>                         //ADD 2009/3/2
    public string Printer
    {
        get { return this._Printer; }
        set { this._Printer = value; }
    }
    #endregion

    public PrinterForm()
    {
        InitializeComponent();
    }
    private void PrinterForm_Load(object sender, EventArgs e)
    {
        //
    }

    private void btnCancel_Click(object sender, EventArgs e)
    {
        this.DialogResult = DialogResult.Cancel;
    }

    private void PrinterForm_Shown(object sender, EventArgs e)
    {
        for (int i = 0; i < System.Drawing.Printing.PrinterSettings.InstalledPrinters.Count; i++)
        {
            cboPrinter.Items.Add(System.Drawing.Printing.PrinterSettings.InstalledPrinters[i].ToString());
        }
        cboPrinter.Text = this._Printer;                    //ADD 2009/3/2
    }

    private void btnSelect_Click(object sender, EventArgs e)
    {
        if (cboPrinter.SelectedItem == null)
        {
            MessageBox.Show("请选择打印机。", this.Name, MessageBoxButtons.OK, MessageBoxIcon.Warning);
            cboPrinter.Focus();
            return;
        }
        this._Printer = cboPrinter.Text;                    //ADD 2009/3/2
        this.DialogResult = DialogResult.OK;
    }
}


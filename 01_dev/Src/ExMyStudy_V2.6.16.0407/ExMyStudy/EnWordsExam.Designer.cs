﻿//------------------------------------------------------------------------------
// <auto-generated>
//     此代码由工具生成。
//     运行时版本:4.0.30319.34209
//
//     对此文件的更改可能会导致不正确的行为，并且如果
//     重新生成代码，这些更改将会丢失。
// </auto-generated>
//------------------------------------------------------------------------------

#pragma warning disable 414
namespace ExMyStudy {
    
    
    /// 
    [Microsoft.VisualStudio.Tools.Applications.Runtime.StartupObjectAttribute(1)]
    [global::System.Security.Permissions.PermissionSetAttribute(global::System.Security.Permissions.SecurityAction.Demand, Name="FullTrust")]
    public sealed partial class EnWordsExam : Microsoft.Office.Tools.Excel.WorksheetBase {
        
        internal Microsoft.Office.Tools.Excel.NamedRange nrTop;
        
        internal Microsoft.Office.Tools.Excel.NamedRange nrWordsTotal;
        
        internal Microsoft.Office.Tools.Excel.NamedRange nrPaste;
        
        internal Microsoft.Office.Tools.Excel.NamedRange nrRowNo;
        
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.VisualStudio.Tools.Office.ProgrammingModel.dll", "10.0.0.0")]
        private global::System.Object missing = global::System.Type.Missing;
        
        internal Microsoft.Office.Tools.Excel.Controls.Button btnGet;
        
        internal Microsoft.Office.Tools.Excel.Controls.ComboBox cboGrade;
        
        internal Microsoft.Office.Tools.Excel.Controls.ComboBox cboTerm;
        
        internal Microsoft.Office.Tools.Excel.Controls.ComboBox cboModule;
        
        internal Microsoft.Office.Tools.Excel.Controls.ComboBox cboUnit;
        
        internal Microsoft.Office.Tools.Excel.Controls.RadioButton rdoOrder;
        
        internal Microsoft.Office.Tools.Excel.Controls.RadioButton rdoRandom;
        
        internal Microsoft.Office.Tools.Excel.Controls.CheckBox chkPron;
        
        internal Microsoft.Office.Tools.Excel.Controls.CheckBox chkMean;
        
        internal Microsoft.Office.Tools.Excel.Controls.NumericUpDown numBegNo;
        
        internal Microsoft.Office.Tools.Excel.Controls.NumericUpDown numEndNo;
        
        internal Microsoft.Office.Tools.Excel.Controls.Label label1;
        
        internal Microsoft.Office.Tools.Excel.Controls.CheckBox chkSpell;
        
        internal Microsoft.Office.Tools.Excel.Controls.Button btnCancel;
        
        internal Microsoft.Office.Tools.Excel.Controls.Button btnShowList;
        
        internal Microsoft.Office.Tools.Excel.Controls.ComboBox cboCatg;
        
        /// 
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Never)]
        public EnWordsExam(global::Microsoft.Office.Tools.Excel.Factory factory, global::System.IServiceProvider serviceProvider) : 
                base(factory, serviceProvider, "Sheet1", "Sheet1") {
        }
        
        /// 
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.VisualStudio.Tools.Office.ProgrammingModel.dll", "10.0.0.0")]
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Never)]
        protected override void Initialize() {
            base.Initialize();
            Globals.EnWordsExam = this;
            global::System.Windows.Forms.Application.EnableVisualStyles();
            this.InitializeCachedData();
            this.InitializeControls();
            this.InitializeComponents();
            this.InitializeData();
        }
        
        /// 
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.VisualStudio.Tools.Office.ProgrammingModel.dll", "10.0.0.0")]
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Never)]
        protected override void FinishInitialization() {
            this.InternalStartup();
            this.OnStartup();
        }
        
        /// 
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.VisualStudio.Tools.Office.ProgrammingModel.dll", "10.0.0.0")]
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Never)]
        protected override void InitializeDataBindings() {
            this.BeginInitialization();
            this.BindToData();
            this.EndInitialization();
        }
        
        /// 
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.VisualStudio.Tools.Office.ProgrammingModel.dll", "10.0.0.0")]
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Never)]
        private void InitializeCachedData() {
            if ((this.DataHost == null)) {
                return;
            }
            if (this.DataHost.IsCacheInitialized) {
                this.DataHost.FillCachedData(this);
            }
        }
        
        /// 
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.VisualStudio.Tools.Office.ProgrammingModel.dll", "10.0.0.0")]
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Never)]
        private void InitializeData() {
        }
        
        /// 
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.VisualStudio.Tools.Office.ProgrammingModel.dll", "10.0.0.0")]
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Never)]
        private void BindToData() {
        }
        
        /// 
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        private void StartCaching(string MemberName) {
            this.DataHost.StartCaching(this, MemberName);
        }
        
        /// 
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        private void StopCaching(string MemberName) {
            this.DataHost.StopCaching(this, MemberName);
        }
        
        /// 
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        private bool IsCached(string MemberName) {
            return this.DataHost.IsCached(this, MemberName);
        }
        
        /// 
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.VisualStudio.Tools.Office.ProgrammingModel.dll", "10.0.0.0")]
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Never)]
        private void BeginInitialization() {
            this.BeginInit();
            this.nrTop.BeginInit();
            this.nrWordsTotal.BeginInit();
            this.nrPaste.BeginInit();
            this.nrRowNo.BeginInit();
        }
        
        /// 
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.VisualStudio.Tools.Office.ProgrammingModel.dll", "10.0.0.0")]
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Never)]
        private void EndInitialization() {
            this.nrRowNo.EndInit();
            this.nrPaste.EndInit();
            this.nrWordsTotal.EndInit();
            this.nrTop.EndInit();
            this.EndInit();
        }
        
        /// 
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.VisualStudio.Tools.Office.ProgrammingModel.dll", "10.0.0.0")]
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Never)]
        private void InitializeControls() {
            this.nrTop = Globals.Factory.CreateNamedRange(null, null, "nrTop", "nrTop", this);
            this.nrWordsTotal = Globals.Factory.CreateNamedRange(null, null, "nrWordsTotal", "nrWordsTotal", this);
            this.nrPaste = Globals.Factory.CreateNamedRange(null, null, "nrPaste", "nrPaste", this);
            this.nrRowNo = Globals.Factory.CreateNamedRange(null, null, "nrRowNo", "nrRowNo", this);
            this.btnGet = new Microsoft.Office.Tools.Excel.Controls.Button(Globals.Factory, this.ItemProvider, this.HostContext, "1923498771E6A914ED91A2E71E9D4F49E93521", "1923498771E6A914ED91A2E71E9D4F49E93521", this, "btnGet");
            this.cboGrade = new Microsoft.Office.Tools.Excel.Controls.ComboBox(Globals.Factory, this.ItemProvider, this.HostContext, "25785618B2167B242B62AA8D2DC2177BC78E82", "25785618B2167B242B62AA8D2DC2177BC78E82", this, "cboGrade");
            this.cboTerm = new Microsoft.Office.Tools.Excel.Controls.ComboBox(Globals.Factory, this.ItemProvider, this.HostContext, "37E9043193FA4E349A7396E83FB70737BEE793", "37E9043193FA4E349A7396E83FB70737BEE793", this, "cboTerm");
            this.cboModule = new Microsoft.Office.Tools.Excel.Controls.ComboBox(Globals.Factory, this.ItemProvider, this.HostContext, "4A242F464427CF446594A5C740264F42022F34", "4A242F464427CF446594A5C740264F42022F34", this, "cboModule");
            this.cboUnit = new Microsoft.Office.Tools.Excel.Controls.ComboBox(Globals.Factory, this.ItemProvider, this.HostContext, "59D5695385E61154E0E5B9D653CD59F5F098C5", "59D5695385E61154E0E5B9D653CD59F5F098C5", this, "cboUnit");
            this.rdoOrder = new Microsoft.Office.Tools.Excel.Controls.RadioButton(Globals.Factory, this.ItemProvider, this.HostContext, "6D75D71976F426647ED6892A630B813E1AF8A6", "6D75D71976F426647ED6892A630B813E1AF8A6", this, "rdoOrder");
            this.rdoRandom = new Microsoft.Office.Tools.Excel.Controls.RadioButton(Globals.Factory, this.ItemProvider, this.HostContext, "7C0D543157C7DC741147850E7EF2533F9A41C7", "7C0D543157C7DC741147850E7EF2533F9A41C7", this, "rdoRandom");
            this.chkPron = new Microsoft.Office.Tools.Excel.Controls.CheckBox(Globals.Factory, this.ItemProvider, this.HostContext, "893D9EE2A8F217841BD89E5385417D1E368848", "893D9EE2A8F217841BD89E5385417D1E368848", this, "chkPron");
            this.chkMean = new Microsoft.Office.Tools.Excel.Controls.CheckBox(Globals.Factory, this.ItemProvider, this.HostContext, "9C09E29DB9646A94B2F987719D69143E2D4B29", "9C09E29DB9646A94B2F987719D69143E2D4B29", this, "chkMean");
            this.numBegNo = new Microsoft.Office.Tools.Excel.Controls.NumericUpDown(Globals.Factory, this.ItemProvider, this.HostContext, "19D7C31931535414FFD1A4601D3F63198721C1", "19D7C31931535414FFD1A4601D3F63198721C1", this, "numBegNo");
            this.numEndNo = new Microsoft.Office.Tools.Excel.Controls.NumericUpDown(Globals.Factory, this.ItemProvider, this.HostContext, "11A53334C12E11140C21BCA31410A20F0FCA01", "11A53334C12E11140C21BCA31410A20F0FCA01", this, "numEndNo");
            this.label1 = new Microsoft.Office.Tools.Excel.Controls.Label(Globals.Factory, this.ItemProvider, this.HostContext, "1E2B7685B17E7014B071BCB218E33BCD0E52C1", "1E2B7685B17E7014B071BCB218E33BCD0E52C1", this, "label1");
            this.chkSpell = new Microsoft.Office.Tools.Excel.Controls.CheckBox(Globals.Factory, this.ItemProvider, this.HostContext, "13601F0071248D144F6183601709BBB6CA8771", "13601F0071248D144F6183601709BBB6CA8771", this, "chkSpell");
            this.btnCancel = new Microsoft.Office.Tools.Excel.Controls.Button(Globals.Factory, this.ItemProvider, this.HostContext, "1EB96C0B61CC2A1415819A7D17C3C10A8412B1", "1EB96C0B61CC2A1415819A7D17C3C10A8412B1", this, "btnCancel");
            this.btnShowList = new Microsoft.Office.Tools.Excel.Controls.Button(Globals.Factory, this.ItemProvider, this.HostContext, "14E54C6421228A148FE1B4D21B37DE5E548621", "14E54C6421228A148FE1B4D21B37DE5E548621", this, "btnShowList");
            this.cboCatg = new Microsoft.Office.Tools.Excel.Controls.ComboBox(Globals.Factory, this.ItemProvider, this.HostContext, "1AE025A2B10F6314EED1A08B1A49CC03250DB1", "1AE025A2B10F6314EED1A08B1A49CC03250DB1", this, "cboCatg");
        }
        
        /// 
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.VisualStudio.Tools.Office.ProgrammingModel.dll", "10.0.0.0")]
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Never)]
        private void InitializeComponents() {
            ((System.ComponentModel.ISupportInitialize)(this.numBegNo)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.numEndNo)).BeginInit();
            // 
            // btnGet
            // 
            this.btnGet.BackColor = System.Drawing.SystemColors.Control;
            this.btnGet.Font = new System.Drawing.Font("微软雅黑", 12F);
            this.btnGet.ForeColor = System.Drawing.SystemColors.ControlText;
            this.btnGet.Name = "btnGet";
            this.btnGet.Text = "抽查(&Q)";
            this.btnGet.UseVisualStyleBackColor = false;
            // 
            // cboGrade
            // 
            this.cboGrade.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cboGrade.Font = new System.Drawing.Font("微软雅黑", 11.25F);
            this.cboGrade.Name = "cboGrade";
            // 
            // cboTerm
            // 
            this.cboTerm.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cboTerm.Font = new System.Drawing.Font("微软雅黑", 11.25F);
            this.cboTerm.Name = "cboTerm";
            // 
            // cboModule
            // 
            this.cboModule.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cboModule.Font = new System.Drawing.Font("微软雅黑", 11.25F);
            this.cboModule.Name = "cboModule";
            // 
            // cboUnit
            // 
            this.cboUnit.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cboUnit.Font = new System.Drawing.Font("微软雅黑", 11.25F);
            this.cboUnit.Name = "cboUnit";
            // 
            // rdoOrder
            // 
            this.rdoOrder.AutoSize = true;
            this.rdoOrder.BackColor = System.Drawing.SystemColors.GradientActiveCaption;
            this.rdoOrder.Checked = true;
            this.rdoOrder.Font = new System.Drawing.Font("微软雅黑", 11.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.rdoOrder.Name = "rdoOrder";
            this.rdoOrder.Text = "顺序抽查";
            this.rdoOrder.UseVisualStyleBackColor = false;
            // 
            // rdoRandom
            // 
            this.rdoRandom.AutoSize = true;
            this.rdoRandom.BackColor = System.Drawing.SystemColors.GradientActiveCaption;
            this.rdoRandom.Font = new System.Drawing.Font("微软雅黑", 11F);
            this.rdoRandom.Name = "rdoRandom";
            this.rdoRandom.Text = "随机抽查";
            this.rdoRandom.UseVisualStyleBackColor = false;
            // 
            // chkPron
            // 
            this.chkPron.AutoSize = true;
            this.chkPron.BackColor = System.Drawing.SystemColors.GradientActiveCaption;
            this.chkPron.Checked = true;
            this.chkPron.CheckState = System.Windows.Forms.CheckState.Checked;
            this.chkPron.Font = new System.Drawing.Font("微软雅黑", 11.25F);
            this.chkPron.Name = "chkPron";
            this.chkPron.Text = "显示音标";
            this.chkPron.UseVisualStyleBackColor = false;
            // 
            // chkMean
            // 
            this.chkMean.AutoSize = true;
            this.chkMean.BackColor = System.Drawing.SystemColors.GradientActiveCaption;
            this.chkMean.Checked = true;
            this.chkMean.CheckState = System.Windows.Forms.CheckState.Checked;
            this.chkMean.Font = new System.Drawing.Font("微软雅黑", 11.25F);
            this.chkMean.Name = "chkMean";
            this.chkMean.Text = "显示中文意思";
            this.chkMean.UseVisualStyleBackColor = false;
            // 
            // numBegNo
            // 
            this.numBegNo.Font = new System.Drawing.Font("微软雅黑", 11.25F);
            this.numBegNo.Name = "numBegNo";
            // 
            // numEndNo
            // 
            this.numEndNo.Font = new System.Drawing.Font("微软雅黑", 11.25F);
            this.numEndNo.Name = "numEndNo";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.BackColor = System.Drawing.SystemColors.GradientActiveCaption;
            this.label1.Font = new System.Drawing.Font("微软雅黑", 11.25F);
            this.label1.Name = "label1";
            this.label1.Text = "~";
            // 
            // chkSpell
            // 
            this.chkSpell.AutoSize = true;
            this.chkSpell.BackColor = System.Drawing.SystemColors.GradientActiveCaption;
            this.chkSpell.Font = new System.Drawing.Font("微软雅黑", 11.25F);
            this.chkSpell.Name = "chkSpell";
            this.chkSpell.Text = "拼写检查";
            this.chkSpell.UseVisualStyleBackColor = false;
            // 
            // btnCancel
            // 
            this.btnCancel.BackColor = System.Drawing.SystemColors.Control;
            this.btnCancel.Font = new System.Drawing.Font("微软雅黑", 12F);
            this.btnCancel.ForeColor = System.Drawing.SystemColors.ControlText;
            this.btnCancel.Name = "btnCancel";
            this.btnCancel.Text = "取消(&C)";
            this.btnCancel.UseVisualStyleBackColor = false;
            // 
            // btnShowList
            // 
            this.btnShowList.BackColor = System.Drawing.SystemColors.Control;
            this.btnShowList.Font = new System.Drawing.Font("微软雅黑", 12F);
            this.btnShowList.ForeColor = System.Drawing.SystemColors.ControlText;
            this.btnShowList.Name = "btnShowList";
            this.btnShowList.Text = "显示列表(&L)";
            this.btnShowList.UseVisualStyleBackColor = false;
            // 
            // cboCatg
            // 
            this.cboCatg.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cboCatg.Font = new System.Drawing.Font("微软雅黑", 11.25F);
            this.cboCatg.Name = "cboCatg";
            // 
            // nrTop
            // 
            this.nrTop.DefaultDataSourceUpdateMode = System.Windows.Forms.DataSourceUpdateMode.Never;
            // 
            // nrWordsTotal
            // 
            this.nrWordsTotal.DefaultDataSourceUpdateMode = System.Windows.Forms.DataSourceUpdateMode.Never;
            // 
            // nrPaste
            // 
            this.nrPaste.DefaultDataSourceUpdateMode = System.Windows.Forms.DataSourceUpdateMode.Never;
            // 
            // nrRowNo
            // 
            this.nrRowNo.DefaultDataSourceUpdateMode = System.Windows.Forms.DataSourceUpdateMode.Never;
            // 
            // EnWordsExam
            // 
            ((System.ComponentModel.ISupportInitialize)(this.numBegNo)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.numEndNo)).EndInit();
            this.btnGet.BindingContext = this.BindingContext;
            this.cboGrade.BindingContext = this.BindingContext;
            this.cboTerm.BindingContext = this.BindingContext;
            this.cboModule.BindingContext = this.BindingContext;
            this.cboUnit.BindingContext = this.BindingContext;
            this.rdoOrder.BindingContext = this.BindingContext;
            this.rdoRandom.BindingContext = this.BindingContext;
            this.chkPron.BindingContext = this.BindingContext;
            this.chkMean.BindingContext = this.BindingContext;
            this.numBegNo.BindingContext = this.BindingContext;
            this.numEndNo.BindingContext = this.BindingContext;
            this.label1.BindingContext = this.BindingContext;
            this.chkSpell.BindingContext = this.BindingContext;
            this.btnCancel.BindingContext = this.BindingContext;
            this.btnShowList.BindingContext = this.BindingContext;
            this.cboCatg.BindingContext = this.BindingContext;
        }
        
        /// 
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        private bool NeedsFill(string MemberName) {
            return this.DataHost.NeedsFill(this, MemberName);
        }
        
        /// 
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.VisualStudio.Tools.Office.ProgrammingModel.dll", "10.0.0.0")]
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Never)]
        protected override void OnShutdown() {
            this.nrRowNo.Dispose();
            this.nrPaste.Dispose();
            this.nrWordsTotal.Dispose();
            this.nrTop.Dispose();
            base.OnShutdown();
        }
    }
    
    internal sealed partial class Globals {
        
        private static EnWordsExam _EnWordsExam;
        
        internal static EnWordsExam EnWordsExam {
            get {
                return _EnWordsExam;
            }
            set {
                if ((_EnWordsExam == null)) {
                    _EnWordsExam = value;
                }
                else {
                    throw new System.NotSupportedException();
                }
            }
        }
    }
}

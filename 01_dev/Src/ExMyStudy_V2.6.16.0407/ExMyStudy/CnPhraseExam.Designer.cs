﻿//------------------------------------------------------------------------------
// <auto-generated>
//     此代码由工具生成。
//     运行时版本:4.0.30319.18444
//
//     对此文件的更改可能会导致不正确的行为，并且如果
//     重新生成代码，这些更改将会丢失。
// </auto-generated>
//------------------------------------------------------------------------------

#pragma warning disable 414
namespace ExMyStudy {
    
    
    /// 
    [Microsoft.VisualStudio.Tools.Applications.Runtime.StartupObjectAttribute(4)]
    [global::System.Security.Permissions.PermissionSetAttribute(global::System.Security.Permissions.SecurityAction.Demand, Name="FullTrust")]
    public sealed partial class CnPhraseExam : Microsoft.Office.Tools.Excel.WorksheetBase {
        
        internal Microsoft.Office.Tools.Excel.NamedRange nrCnPhraseTop;
        
        internal Microsoft.Office.Tools.Excel.NamedRange nrCnPhraseTotal;
        
        internal Microsoft.Office.Tools.Excel.NamedRange nrCnPhraseRowNo;
        
        internal Microsoft.Office.Tools.Excel.NamedRange nrCnPhrasePaste;
        
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.VisualStudio.Tools.Office.ProgrammingModel.dll", "10.0.0.0")]
        private global::System.Object missing = global::System.Type.Missing;
        
        internal Microsoft.Office.Tools.Excel.Controls.Button btnGet;
        
        internal Microsoft.Office.Tools.Excel.Controls.ComboBox cboGrade;
        
        internal Microsoft.Office.Tools.Excel.Controls.ComboBox cboTerm;
        
        internal Microsoft.Office.Tools.Excel.Controls.ComboBox cboUnit;
        
        internal Microsoft.Office.Tools.Excel.Controls.RadioButton rdoOrder;
        
        internal Microsoft.Office.Tools.Excel.Controls.RadioButton rdoRandom;
        
        internal Microsoft.Office.Tools.Excel.Controls.CheckBox chkWord;
        
        internal Microsoft.Office.Tools.Excel.Controls.NumericUpDown numBegNo;
        
        internal Microsoft.Office.Tools.Excel.Controls.NumericUpDown numEndNo;
        
        internal Microsoft.Office.Tools.Excel.Controls.Label label1;
        
        internal Microsoft.Office.Tools.Excel.Controls.Button btnCancel;
        
        internal Microsoft.Office.Tools.Excel.Controls.Button btnShowList;
        
        internal Microsoft.Office.Tools.Excel.Controls.Button btnCreRpt;
        
        /// 
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Never)]
        public CnPhraseExam(global::Microsoft.Office.Tools.Excel.Factory factory, global::System.IServiceProvider serviceProvider) : 
                base(factory, serviceProvider, "Sheet13", "Sheet13") {
        }
        
        /// 
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.VisualStudio.Tools.Office.ProgrammingModel.dll", "10.0.0.0")]
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Never)]
        protected override void Initialize() {
            base.Initialize();
            Globals.CnPhraseExam = this;
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
            this.nrCnPhraseTop.BeginInit();
            this.nrCnPhraseTotal.BeginInit();
            this.nrCnPhraseRowNo.BeginInit();
            this.nrCnPhrasePaste.BeginInit();
        }
        
        /// 
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.VisualStudio.Tools.Office.ProgrammingModel.dll", "10.0.0.0")]
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Never)]
        private void EndInitialization() {
            this.nrCnPhrasePaste.EndInit();
            this.nrCnPhraseRowNo.EndInit();
            this.nrCnPhraseTotal.EndInit();
            this.nrCnPhraseTop.EndInit();
            this.EndInit();
        }
        
        /// 
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.VisualStudio.Tools.Office.ProgrammingModel.dll", "10.0.0.0")]
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Never)]
        private void InitializeControls() {
            this.nrCnPhraseTop = Globals.Factory.CreateNamedRange(null, null, "nrCnPhraseTop", "nrCnPhraseTop", this);
            this.nrCnPhraseTotal = Globals.Factory.CreateNamedRange(null, null, "nrCnPhraseTotal", "nrCnPhraseTotal", this);
            this.nrCnPhraseRowNo = Globals.Factory.CreateNamedRange(null, null, "nrCnPhraseRowNo", "nrCnPhraseRowNo", this);
            this.nrCnPhrasePaste = Globals.Factory.CreateNamedRange(null, null, "nrCnPhrasePaste", "nrCnPhrasePaste", this);
            this.btnGet = new Microsoft.Office.Tools.Excel.Controls.Button(Globals.Factory, this.ItemProvider, this.HostContext, "1334545B81CB3D14D8E194EA155B76532428F1", "1334545B81CB3D14D8E194EA155B76532428F1", this, "btnGet");
            this.cboGrade = new Microsoft.Office.Tools.Excel.Controls.ComboBox(Globals.Factory, this.ItemProvider, this.HostContext, "25E0A074F25D6D24A022ACB72842A630B68A82", "25E0A074F25D6D24A022ACB72842A630B68A82", this, "cboGrade");
            this.cboTerm = new Microsoft.Office.Tools.Excel.Controls.ComboBox(Globals.Factory, this.ItemProvider, this.HostContext, "32C023F903357E34F09383973691BBA812EFC3", "32C023F903357E34F09383973691BBA812EFC3", this, "cboTerm");
            this.cboUnit = new Microsoft.Office.Tools.Excel.Controls.ComboBox(Globals.Factory, this.ItemProvider, this.HostContext, "5676B60C95881554AD35A50F544E8119302A65", "5676B60C95881554AD35A50F544E8119302A65", this, "cboUnit");
            this.rdoOrder = new Microsoft.Office.Tools.Excel.Controls.RadioButton(Globals.Factory, this.ItemProvider, this.HostContext, "6752890C16A60064B0D6B41E60F5ABCC988526", "6752890C16A60064B0D6B41E60F5ABCC988526", this, "rdoOrder");
            this.rdoRandom = new Microsoft.Office.Tools.Excel.Controls.RadioButton(Globals.Factory, this.ItemProvider, this.HostContext, "7C43FBCE5730D374E3C78E207FF55C50678217", "7C43FBCE5730D374E3C78E207FF55C50678217", this, "rdoRandom");
            this.chkWord = new Microsoft.Office.Tools.Excel.Controls.CheckBox(Globals.Factory, this.ItemProvider, this.HostContext, "8DD77EC4783DD5843AB8970E8C9EFCFC9B6CE8", "8DD77EC4783DD5843AB8970E8C9EFCFC9B6CE8", this, "chkWord");
            this.numBegNo = new Microsoft.Office.Tools.Excel.Controls.NumericUpDown(Globals.Factory, this.ItemProvider, this.HostContext, "1F75CECD41D25B14DE51B50318E5D105CF78C1", "1F75CECD41D25B14DE51B50318E5D105CF78C1", this, "numBegNo");
            this.numEndNo = new Microsoft.Office.Tools.Excel.Controls.NumericUpDown(Globals.Factory, this.ItemProvider, this.HostContext, "108767A70185AD14AA81905E108044233241F1", "108767A70185AD14AA81905E108044233241F1", this, "numEndNo");
            this.label1 = new Microsoft.Office.Tools.Excel.Controls.Label(Globals.Factory, this.ItemProvider, this.HostContext, "1948600C3164FE143131A91817FD465D6EF8B1", "1948600C3164FE143131A91817FD465D6EF8B1", this, "label1");
            this.btnCancel = new Microsoft.Office.Tools.Excel.Controls.Button(Globals.Factory, this.ItemProvider, this.HostContext, "1071078071ECDE14BAA19CDE12D444DB1596F1", "1071078071ECDE14BAA19CDE12D444DB1596F1", this, "btnCancel");
            this.btnShowList = new Microsoft.Office.Tools.Excel.Controls.Button(Globals.Factory, this.ItemProvider, this.HostContext, "1653D3E5D1BEAA146111BAF5198B5E22E02481", "1653D3E5D1BEAA146111BAF5198B5E22E02481", this, "btnShowList");
            this.btnCreRpt = new Microsoft.Office.Tools.Excel.Controls.Button(Globals.Factory, this.ItemProvider, this.HostContext, "13EFD8A521522D14C8E18B521C96C908DD5531", "13EFD8A521522D14C8E18B521C96C908DD5531", this, "btnCreRpt");
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
            this.rdoOrder.Font = new System.Drawing.Font("微软雅黑", 11.25F);
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
            // chkWord
            // 
            this.chkWord.AutoSize = true;
            this.chkWord.BackColor = System.Drawing.SystemColors.GradientActiveCaption;
            this.chkWord.Checked = true;
            this.chkWord.CheckState = System.Windows.Forms.CheckState.Checked;
            this.chkWord.Font = new System.Drawing.Font("微软雅黑", 11.25F);
            this.chkWord.Name = "chkWord";
            this.chkWord.Text = "显示词语中文";
            this.chkWord.UseVisualStyleBackColor = false;
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
            // btnCreRpt
            // 
            this.btnCreRpt.BackColor = System.Drawing.SystemColors.Control;
            this.btnCreRpt.Font = new System.Drawing.Font("微软雅黑", 12F);
            this.btnCreRpt.Name = "btnCreRpt";
            this.btnCreRpt.Text = "报表(&R)";
            this.btnCreRpt.UseVisualStyleBackColor = false;
            // 
            // nrCnPhraseTop
            // 
            this.nrCnPhraseTop.DefaultDataSourceUpdateMode = System.Windows.Forms.DataSourceUpdateMode.Never;
            // 
            // nrCnPhraseTotal
            // 
            this.nrCnPhraseTotal.DefaultDataSourceUpdateMode = System.Windows.Forms.DataSourceUpdateMode.Never;
            // 
            // nrCnPhraseRowNo
            // 
            this.nrCnPhraseRowNo.DefaultDataSourceUpdateMode = System.Windows.Forms.DataSourceUpdateMode.Never;
            // 
            // nrCnPhrasePaste
            // 
            this.nrCnPhrasePaste.DefaultDataSourceUpdateMode = System.Windows.Forms.DataSourceUpdateMode.Never;
            // 
            // CnPhraseExam
            // 
            ((System.ComponentModel.ISupportInitialize)(this.numBegNo)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.numEndNo)).EndInit();
            this.btnGet.BindingContext = this.BindingContext;
            this.cboGrade.BindingContext = this.BindingContext;
            this.cboTerm.BindingContext = this.BindingContext;
            this.cboUnit.BindingContext = this.BindingContext;
            this.rdoOrder.BindingContext = this.BindingContext;
            this.rdoRandom.BindingContext = this.BindingContext;
            this.chkWord.BindingContext = this.BindingContext;
            this.numBegNo.BindingContext = this.BindingContext;
            this.numEndNo.BindingContext = this.BindingContext;
            this.label1.BindingContext = this.BindingContext;
            this.btnCancel.BindingContext = this.BindingContext;
            this.btnShowList.BindingContext = this.BindingContext;
            this.btnCreRpt.BindingContext = this.BindingContext;
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
            this.nrCnPhrasePaste.Dispose();
            this.nrCnPhraseRowNo.Dispose();
            this.nrCnPhraseTotal.Dispose();
            this.nrCnPhraseTop.Dispose();
            base.OnShutdown();
        }
    }
    
    internal sealed partial class Globals {
        
        private static CnPhraseExam _CnPhraseExam;
        
        internal static CnPhraseExam CnPhraseExam {
            get {
                return _CnPhraseExam;
            }
            set {
                if ((_CnPhraseExam == null)) {
                    _CnPhraseExam = value;
                }
                else {
                    throw new System.NotSupportedException();
                }
            }
        }
    }
}

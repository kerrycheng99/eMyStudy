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
    [Microsoft.VisualStudio.Tools.Applications.Runtime.StartupObjectAttribute(8)]
    [global::System.Security.Permissions.PermissionSetAttribute(global::System.Security.Permissions.SecurityAction.Demand, Name="FullTrust")]
    public sealed partial class QuestionsExam : Microsoft.Office.Tools.Excel.WorksheetBase {
        
        internal Microsoft.Office.Tools.Excel.NamedRange nrTop2;
        
        internal Microsoft.Office.Tools.Excel.NamedRange nrPaste2;
        
        internal Microsoft.Office.Tools.Excel.NamedRange nrEnQuestionsTotal;
        
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.VisualStudio.Tools.Office.ProgrammingModel.dll", "10.0.0.0")]
        private global::System.Object missing = global::System.Type.Missing;
        
        internal Microsoft.Office.Tools.Excel.Controls.ComboBox cboLevel;
        
        internal Microsoft.Office.Tools.Excel.Controls.Button btnGet;
        
        internal Microsoft.Office.Tools.Excel.Controls.RadioButton rdoOrder;
        
        internal Microsoft.Office.Tools.Excel.Controls.RadioButton rdoRandom;
        
        internal Microsoft.Office.Tools.Excel.Controls.NumericUpDown numBegNo;
        
        internal Microsoft.Office.Tools.Excel.Controls.NumericUpDown numEndNo;
        
        internal Microsoft.Office.Tools.Excel.Controls.Label label1;
        
        internal Microsoft.Office.Tools.Excel.Controls.Button btnCancel;
        
        internal Microsoft.Office.Tools.Excel.Controls.Button btnShowAns;
        
        internal Microsoft.Office.Tools.Excel.Controls.Button btnShowList;
        
        internal Microsoft.Office.Tools.Excel.Controls.ComboBox cboSubject;
        
        internal Microsoft.Office.Tools.Excel.Controls.Button btnCreRpt;
        
        internal Microsoft.Office.Tools.Excel.Controls.ComboBox cboTerm;
        
        internal Microsoft.Office.Tools.Excel.Controls.ComboBox cboGrade;
        
        /// 
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Never)]
        public QuestionsExam(global::Microsoft.Office.Tools.Excel.Factory factory, global::System.IServiceProvider serviceProvider) : 
                base(factory, serviceProvider, "Sheet7", "Sheet7") {
        }
        
        /// 
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.VisualStudio.Tools.Office.ProgrammingModel.dll", "10.0.0.0")]
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Never)]
        protected override void Initialize() {
            base.Initialize();
            Globals.QuestionsExam = this;
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
            this.nrTop2.BeginInit();
            this.nrPaste2.BeginInit();
            this.nrEnQuestionsTotal.BeginInit();
        }
        
        /// 
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.VisualStudio.Tools.Office.ProgrammingModel.dll", "10.0.0.0")]
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Never)]
        private void EndInitialization() {
            this.nrEnQuestionsTotal.EndInit();
            this.nrPaste2.EndInit();
            this.nrTop2.EndInit();
            this.EndInit();
        }
        
        /// 
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.VisualStudio.Tools.Office.ProgrammingModel.dll", "10.0.0.0")]
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Never)]
        private void InitializeControls() {
            this.nrTop2 = Globals.Factory.CreateNamedRange(null, null, "nrTop2", "nrTop2", this);
            this.nrPaste2 = Globals.Factory.CreateNamedRange(null, null, "nrPaste2", "nrPaste2", this);
            this.nrEnQuestionsTotal = Globals.Factory.CreateNamedRange(null, null, "nrEnQuestionsTotal", "nrEnQuestionsTotal", this);
            this.cboLevel = new Microsoft.Office.Tools.Excel.Controls.ComboBox(Globals.Factory, this.ItemProvider, this.HostContext, "42CB3269740470448B04B4064CAD7A8C12C4A4", "42CB3269740470448B04B4064CAD7A8C12C4A4", this, "cboLevel");
            this.btnGet = new Microsoft.Office.Tools.Excel.Controls.Button(Globals.Factory, this.ItemProvider, this.HostContext, "1E80B1E301FAD5142B4184191F969BC231DD91", "1E80B1E301FAD5142B4184191F969BC231DD91", this, "btnGet");
            this.rdoOrder = new Microsoft.Office.Tools.Excel.Controls.RadioButton(Globals.Factory, this.ItemProvider, this.HostContext, "1BAEB79A51057E14DE41BB0B13AB9C664FD3B1", "1BAEB79A51057E14DE41BB0B13AB9C664FD3B1", this, "rdoOrder");
            this.rdoRandom = new Microsoft.Office.Tools.Excel.Controls.RadioButton(Globals.Factory, this.ItemProvider, this.HostContext, "186373B7E158861450418F191DE9A7A1E4B421", "186373B7E158861450418F191DE9A7A1E4B421", this, "rdoRandom");
            this.numBegNo = new Microsoft.Office.Tools.Excel.Controls.NumericUpDown(Globals.Factory, this.ItemProvider, this.HostContext, "1E0753D7C1CF16142EF1880E10643465983371", "1E0753D7C1CF16142EF1880E10643465983371", this, "numBegNo");
            this.numEndNo = new Microsoft.Office.Tools.Excel.Controls.NumericUpDown(Globals.Factory, this.ItemProvider, this.HostContext, "1CC5C93BE1D2E0149A41942112B2FE9E061311", "1CC5C93BE1D2E0149A41942112B2FE9E061311", this, "numEndNo");
            this.label1 = new Microsoft.Office.Tools.Excel.Controls.Label(Globals.Factory, this.ItemProvider, this.HostContext, "1B4A567761A5A414F2B1AAA611D92DB5CB8B61", "1B4A567761A5A414F2B1AAA611D92DB5CB8B61", this, "label1");
            this.btnCancel = new Microsoft.Office.Tools.Excel.Controls.Button(Globals.Factory, this.ItemProvider, this.HostContext, "27C4358882E45D2406228DD32B0ECD956E8432", "27C4358882E45D2406228DD32B0ECD956E8432", this, "btnCancel");
            this.btnShowAns = new Microsoft.Office.Tools.Excel.Controls.Button(Globals.Factory, this.ItemProvider, this.HostContext, "2C9A02EE628744240322A2192D98BBA06DCBA2", "2C9A02EE628744240322A2192D98BBA06DCBA2", this, "btnShowAns");
            this.btnShowList = new Microsoft.Office.Tools.Excel.Controls.Button(Globals.Factory, this.ItemProvider, this.HostContext, "2CC32DD712033C244212B14C219B4656E360C2", "2CC32DD712033C244212B14C219B4656E360C2", this, "btnShowList");
            this.cboSubject = new Microsoft.Office.Tools.Excel.Controls.ComboBox(Globals.Factory, this.ItemProvider, this.HostContext, "25D9660842BA1124DAF2AAB22D919AE2DC2EE2", "25D9660842BA1124DAF2AAB22D919AE2DC2EE2", this, "cboSubject");
            this.btnCreRpt = new Microsoft.Office.Tools.Excel.Controls.Button(Globals.Factory, this.ItemProvider, this.HostContext, "25C7372402A9CF24F2528C892D516AEDB98AA2", "25C7372402A9CF24F2528C892D516AEDB98AA2", this, "btnCreRpt");
            this.cboTerm = new Microsoft.Office.Tools.Excel.Controls.ComboBox(Globals.Factory, this.ItemProvider, this.HostContext, "245AA8DD5254F524A532956B27ABBC78C492B2", "245AA8DD5254F524A532956B27ABBC78C492B2", this, "cboTerm");
            this.cboGrade = new Microsoft.Office.Tools.Excel.Controls.ComboBox(Globals.Factory, this.ItemProvider, this.HostContext, "2E7C3EE422DFD4246532A2CB249841D3C02042", "2E7C3EE422DFD4246532A2CB249841D3C02042", this, "cboGrade");
        }
        
        /// 
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.VisualStudio.Tools.Office.ProgrammingModel.dll", "10.0.0.0")]
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Never)]
        private void InitializeComponents() {
            ((System.ComponentModel.ISupportInitialize)(this.numBegNo)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.numEndNo)).BeginInit();
            // 
            // cboLevel
            // 
            this.cboLevel.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cboLevel.Font = new System.Drawing.Font("微软雅黑", 11.25F);
            this.cboLevel.Name = "cboLevel";
            // 
            // btnGet
            // 
            this.btnGet.BackColor = System.Drawing.SystemColors.Control;
            this.btnGet.Font = new System.Drawing.Font("微软雅黑", 12F);
            this.btnGet.Name = "btnGet";
            this.btnGet.Text = "抽查(&Q)";
            this.btnGet.UseVisualStyleBackColor = false;
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
            this.rdoRandom.Font = new System.Drawing.Font("微软雅黑", 11.25F);
            this.rdoRandom.Name = "rdoRandom";
            this.rdoRandom.Text = "随机抽查";
            this.rdoRandom.UseVisualStyleBackColor = false;
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
            // btnShowAns
            // 
            this.btnShowAns.BackColor = System.Drawing.SystemColors.Control;
            this.btnShowAns.Font = new System.Drawing.Font("微软雅黑", 12F);
            this.btnShowAns.ForeColor = System.Drawing.SystemColors.ControlText;
            this.btnShowAns.Name = "btnShowAns";
            this.btnShowAns.Text = "显示答案(&S)";
            this.btnShowAns.UseVisualStyleBackColor = false;
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
            // cboSubject
            // 
            this.cboSubject.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cboSubject.Font = new System.Drawing.Font("微软雅黑", 11.25F);
            this.cboSubject.Name = "cboSubject";
            // 
            // btnCreRpt
            // 
            this.btnCreRpt.BackColor = System.Drawing.SystemColors.Control;
            this.btnCreRpt.Font = new System.Drawing.Font("微软雅黑", 12F);
            this.btnCreRpt.Name = "btnCreRpt";
            this.btnCreRpt.Text = "报表(&R)";
            this.btnCreRpt.UseVisualStyleBackColor = false;
            // 
            // nrTop2
            // 
            this.nrTop2.DefaultDataSourceUpdateMode = System.Windows.Forms.DataSourceUpdateMode.Never;
            // 
            // nrPaste2
            // 
            this.nrPaste2.DefaultDataSourceUpdateMode = System.Windows.Forms.DataSourceUpdateMode.Never;
            // 
            // nrEnQuestionsTotal
            // 
            this.nrEnQuestionsTotal.DefaultDataSourceUpdateMode = System.Windows.Forms.DataSourceUpdateMode.Never;
            // 
            // cboTerm
            // 
            this.cboTerm.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cboTerm.Font = new System.Drawing.Font("微软雅黑", 11.25F);
            this.cboTerm.Name = "cboTerm";
            // 
            // cboGrade
            // 
            this.cboGrade.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cboGrade.Font = new System.Drawing.Font("微软雅黑", 11.25F);
            this.cboGrade.Name = "cboGrade";
            // 
            // QuestionsExam
            // 
            ((System.ComponentModel.ISupportInitialize)(this.numBegNo)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.numEndNo)).EndInit();
            this.cboLevel.BindingContext = this.BindingContext;
            this.btnGet.BindingContext = this.BindingContext;
            this.rdoOrder.BindingContext = this.BindingContext;
            this.rdoRandom.BindingContext = this.BindingContext;
            this.numBegNo.BindingContext = this.BindingContext;
            this.numEndNo.BindingContext = this.BindingContext;
            this.label1.BindingContext = this.BindingContext;
            this.btnCancel.BindingContext = this.BindingContext;
            this.btnShowAns.BindingContext = this.BindingContext;
            this.btnShowList.BindingContext = this.BindingContext;
            this.cboSubject.BindingContext = this.BindingContext;
            this.btnCreRpt.BindingContext = this.BindingContext;
            this.cboTerm.BindingContext = this.BindingContext;
            this.cboGrade.BindingContext = this.BindingContext;
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
            this.nrEnQuestionsTotal.Dispose();
            this.nrPaste2.Dispose();
            this.nrTop2.Dispose();
            base.OnShutdown();
        }
    }
    
    internal sealed partial class Globals {
        
        private static QuestionsExam _QuestionsExam;
        
        internal static QuestionsExam QuestionsExam {
            get {
                return _QuestionsExam;
            }
            set {
                if ((_QuestionsExam == null)) {
                    _QuestionsExam = value;
                }
                else {
                    throw new System.NotSupportedException();
                }
            }
        }
    }
}

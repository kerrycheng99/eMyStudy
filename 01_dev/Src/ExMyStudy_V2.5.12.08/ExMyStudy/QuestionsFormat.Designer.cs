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
    [Microsoft.VisualStudio.Tools.Applications.Runtime.StartupObjectAttribute(9)]
    [global::System.Security.Permissions.PermissionSetAttribute(global::System.Security.Permissions.SecurityAction.Demand, Name="FullTrust")]
    public sealed partial class QuestionsFormat : Microsoft.Office.Tools.Excel.WorksheetBase {
        
        internal Microsoft.Office.Tools.Excel.NamedRange nrStem1;
        
        internal Microsoft.Office.Tools.Excel.NamedRange nrOptions1;
        
        internal Microsoft.Office.Tools.Excel.NamedRange nrStem2;
        
        internal Microsoft.Office.Tools.Excel.NamedRange nrOptions2;
        
        internal Microsoft.Office.Tools.Excel.NamedRange nrStem3;
        
        internal Microsoft.Office.Tools.Excel.NamedRange nrOptions3;
        
        internal Microsoft.Office.Tools.Excel.NamedRange nrStem4;
        
        internal Microsoft.Office.Tools.Excel.NamedRange nrOptions4;
        
        internal Microsoft.Office.Tools.Excel.NamedRange nrStem5;
        
        internal Microsoft.Office.Tools.Excel.NamedRange nrOptions5;
        
        internal Microsoft.Office.Tools.Excel.NamedRange nrNo1;
        
        internal Microsoft.Office.Tools.Excel.NamedRange nrNo2;
        
        internal Microsoft.Office.Tools.Excel.NamedRange nrNo3;
        
        internal Microsoft.Office.Tools.Excel.NamedRange nrNo4;
        
        internal Microsoft.Office.Tools.Excel.NamedRange nrNo5;
        
        internal Microsoft.Office.Tools.Excel.NamedRange nrAns1;
        
        internal Microsoft.Office.Tools.Excel.NamedRange nrAns2;
        
        internal Microsoft.Office.Tools.Excel.NamedRange nrAns3;
        
        internal Microsoft.Office.Tools.Excel.NamedRange nrAns4;
        
        internal Microsoft.Office.Tools.Excel.NamedRange nrAns5;
        
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.VisualStudio.Tools.Office.ProgrammingModel.dll", "10.0.0.0")]
        private global::System.Object missing = global::System.Type.Missing;
        
        /// 
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Never)]
        public QuestionsFormat(global::Microsoft.Office.Tools.Excel.Factory factory, global::System.IServiceProvider serviceProvider) : 
                base(factory, serviceProvider, "Sheet6", "Sheet6") {
        }
        
        /// 
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.VisualStudio.Tools.Office.ProgrammingModel.dll", "10.0.0.0")]
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Never)]
        protected override void Initialize() {
            base.Initialize();
            Globals.QuestionsFormat = this;
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
            this.nrStem1.BeginInit();
            this.nrOptions1.BeginInit();
            this.nrStem2.BeginInit();
            this.nrOptions2.BeginInit();
            this.nrStem3.BeginInit();
            this.nrOptions3.BeginInit();
            this.nrStem4.BeginInit();
            this.nrOptions4.BeginInit();
            this.nrStem5.BeginInit();
            this.nrOptions5.BeginInit();
            this.nrNo1.BeginInit();
            this.nrNo2.BeginInit();
            this.nrNo3.BeginInit();
            this.nrNo4.BeginInit();
            this.nrNo5.BeginInit();
            this.nrAns1.BeginInit();
            this.nrAns2.BeginInit();
            this.nrAns3.BeginInit();
            this.nrAns4.BeginInit();
            this.nrAns5.BeginInit();
        }
        
        /// 
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.VisualStudio.Tools.Office.ProgrammingModel.dll", "10.0.0.0")]
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Never)]
        private void EndInitialization() {
            this.nrAns5.EndInit();
            this.nrAns4.EndInit();
            this.nrAns3.EndInit();
            this.nrAns2.EndInit();
            this.nrAns1.EndInit();
            this.nrNo5.EndInit();
            this.nrNo4.EndInit();
            this.nrNo3.EndInit();
            this.nrNo2.EndInit();
            this.nrNo1.EndInit();
            this.nrOptions5.EndInit();
            this.nrStem5.EndInit();
            this.nrOptions4.EndInit();
            this.nrStem4.EndInit();
            this.nrOptions3.EndInit();
            this.nrStem3.EndInit();
            this.nrOptions2.EndInit();
            this.nrStem2.EndInit();
            this.nrOptions1.EndInit();
            this.nrStem1.EndInit();
            this.EndInit();
        }
        
        /// 
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.VisualStudio.Tools.Office.ProgrammingModel.dll", "10.0.0.0")]
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Never)]
        private void InitializeControls() {
            this.nrStem1 = Globals.Factory.CreateNamedRange(null, null, "nrStem1", "nrStem1", this);
            this.nrOptions1 = Globals.Factory.CreateNamedRange(null, null, "nrOptions1", "nrOptions1", this);
            this.nrStem2 = Globals.Factory.CreateNamedRange(null, null, "nrStem2", "nrStem2", this);
            this.nrOptions2 = Globals.Factory.CreateNamedRange(null, null, "nrOptions2", "nrOptions2", this);
            this.nrStem3 = Globals.Factory.CreateNamedRange(null, null, "nrStem3", "nrStem3", this);
            this.nrOptions3 = Globals.Factory.CreateNamedRange(null, null, "nrOptions3", "nrOptions3", this);
            this.nrStem4 = Globals.Factory.CreateNamedRange(null, null, "nrStem4", "nrStem4", this);
            this.nrOptions4 = Globals.Factory.CreateNamedRange(null, null, "nrOptions4", "nrOptions4", this);
            this.nrStem5 = Globals.Factory.CreateNamedRange(null, null, "nrStem5", "nrStem5", this);
            this.nrOptions5 = Globals.Factory.CreateNamedRange(null, null, "nrOptions5", "nrOptions5", this);
            this.nrNo1 = Globals.Factory.CreateNamedRange(null, null, "nrNo1", "nrNo1", this);
            this.nrNo2 = Globals.Factory.CreateNamedRange(null, null, "nrNo2", "nrNo2", this);
            this.nrNo3 = Globals.Factory.CreateNamedRange(null, null, "nrNo3", "nrNo3", this);
            this.nrNo4 = Globals.Factory.CreateNamedRange(null, null, "nrNo4", "nrNo4", this);
            this.nrNo5 = Globals.Factory.CreateNamedRange(null, null, "nrNo5", "nrNo5", this);
            this.nrAns1 = Globals.Factory.CreateNamedRange(null, null, "nrAns1", "nrAns1", this);
            this.nrAns2 = Globals.Factory.CreateNamedRange(null, null, "nrAns2", "nrAns2", this);
            this.nrAns3 = Globals.Factory.CreateNamedRange(null, null, "nrAns3", "nrAns3", this);
            this.nrAns4 = Globals.Factory.CreateNamedRange(null, null, "nrAns4", "nrAns4", this);
            this.nrAns5 = Globals.Factory.CreateNamedRange(null, null, "nrAns5", "nrAns5", this);
        }
        
        /// 
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.VisualStudio.Tools.Office.ProgrammingModel.dll", "10.0.0.0")]
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Never)]
        private void InitializeComponents() {
            // 
            // nrStem1
            // 
            this.nrStem1.DefaultDataSourceUpdateMode = System.Windows.Forms.DataSourceUpdateMode.Never;
            // 
            // nrOptions1
            // 
            this.nrOptions1.DefaultDataSourceUpdateMode = System.Windows.Forms.DataSourceUpdateMode.Never;
            // 
            // nrStem2
            // 
            this.nrStem2.DefaultDataSourceUpdateMode = System.Windows.Forms.DataSourceUpdateMode.Never;
            // 
            // nrOptions2
            // 
            this.nrOptions2.DefaultDataSourceUpdateMode = System.Windows.Forms.DataSourceUpdateMode.Never;
            // 
            // nrStem3
            // 
            this.nrStem3.DefaultDataSourceUpdateMode = System.Windows.Forms.DataSourceUpdateMode.Never;
            // 
            // nrOptions3
            // 
            this.nrOptions3.DefaultDataSourceUpdateMode = System.Windows.Forms.DataSourceUpdateMode.Never;
            // 
            // nrStem4
            // 
            this.nrStem4.DefaultDataSourceUpdateMode = System.Windows.Forms.DataSourceUpdateMode.Never;
            // 
            // nrOptions4
            // 
            this.nrOptions4.DefaultDataSourceUpdateMode = System.Windows.Forms.DataSourceUpdateMode.Never;
            // 
            // nrStem5
            // 
            this.nrStem5.DefaultDataSourceUpdateMode = System.Windows.Forms.DataSourceUpdateMode.Never;
            // 
            // nrOptions5
            // 
            this.nrOptions5.DefaultDataSourceUpdateMode = System.Windows.Forms.DataSourceUpdateMode.Never;
            // 
            // nrNo1
            // 
            this.nrNo1.DefaultDataSourceUpdateMode = System.Windows.Forms.DataSourceUpdateMode.Never;
            // 
            // nrNo2
            // 
            this.nrNo2.DefaultDataSourceUpdateMode = System.Windows.Forms.DataSourceUpdateMode.Never;
            // 
            // nrNo3
            // 
            this.nrNo3.DefaultDataSourceUpdateMode = System.Windows.Forms.DataSourceUpdateMode.Never;
            // 
            // nrNo4
            // 
            this.nrNo4.DefaultDataSourceUpdateMode = System.Windows.Forms.DataSourceUpdateMode.Never;
            // 
            // nrNo5
            // 
            this.nrNo5.DefaultDataSourceUpdateMode = System.Windows.Forms.DataSourceUpdateMode.Never;
            // 
            // nrAns1
            // 
            this.nrAns1.DefaultDataSourceUpdateMode = System.Windows.Forms.DataSourceUpdateMode.Never;
            // 
            // nrAns2
            // 
            this.nrAns2.DefaultDataSourceUpdateMode = System.Windows.Forms.DataSourceUpdateMode.Never;
            // 
            // nrAns3
            // 
            this.nrAns3.DefaultDataSourceUpdateMode = System.Windows.Forms.DataSourceUpdateMode.Never;
            // 
            // nrAns4
            // 
            this.nrAns4.DefaultDataSourceUpdateMode = System.Windows.Forms.DataSourceUpdateMode.Never;
            // 
            // nrAns5
            // 
            this.nrAns5.DefaultDataSourceUpdateMode = System.Windows.Forms.DataSourceUpdateMode.Never;
            // 
            // EnQuestionsFormat
            // 
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
            this.nrAns5.Dispose();
            this.nrAns4.Dispose();
            this.nrAns3.Dispose();
            this.nrAns2.Dispose();
            this.nrAns1.Dispose();
            this.nrNo5.Dispose();
            this.nrNo4.Dispose();
            this.nrNo3.Dispose();
            this.nrNo2.Dispose();
            this.nrNo1.Dispose();
            this.nrOptions5.Dispose();
            this.nrStem5.Dispose();
            this.nrOptions4.Dispose();
            this.nrStem4.Dispose();
            this.nrOptions3.Dispose();
            this.nrStem3.Dispose();
            this.nrOptions2.Dispose();
            this.nrStem2.Dispose();
            this.nrOptions1.Dispose();
            this.nrStem1.Dispose();
            base.OnShutdown();
        }
    }
    
    internal sealed partial class Globals {
        
        private static QuestionsFormat _QuestionsFormat;
        
        internal static QuestionsFormat QuestionsFormat {
            get {
                return _QuestionsFormat;
            }
            set {
                if ((_QuestionsFormat == null)) {
                    _QuestionsFormat = value;
                }
                else {
                    throw new System.NotSupportedException();
                }
            }
        }
    }
}

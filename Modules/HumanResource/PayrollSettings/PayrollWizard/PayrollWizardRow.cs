using HRMSoftware.EmployeeProfile;
using HRMSoftware.OrganisationHierarchy;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace HRMSoftware.PayrollSettings;

[ConnectionKey("Default"), Module("PayrollSettings"), TableName("HumanResourcesPayroll")]
[DisplayName("Payroll Wizard"), InstanceName("Payroll Wizard")]
[ReadPermission("Administration:HumanResources")]
[ModifyPermission("Administration:HumanResources")]
public sealed class PayrollWizardRow : LoggingRow<PayrollWizardRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }
    const string jEmployeeName = nameof(jEmployeeName);

    [DisplayName("Employee Row Id"), Column("EmployeeRowID") ,ForeignKey(typeof(EmployeeProfileRow)), LeftJoin(jEmployeeName), TextualField(nameof(EmployeeName))]
    public int? EmployeeRowId
    {
        get => fields.EmployeeRowId[this];
        set => fields.EmployeeRowId[this] = value;
    }

    [DisplayName("Employee Name"), Expression($"{jEmployeeName}.EmployeeName")]
    public string EmployeeName
    {
        get => fields.EmployeeName[this];
        set => fields.EmployeeName[this] = value;
    }

    [DisplayName("Employee Id"), Column("EmployeeID"), Size(50), QuickSearch, NameProperty]
    public string EmployeeId
    {
        get => fields.EmployeeId[this];
        set => fields.EmployeeId[this] = value;
    }

    [DisplayName("Pay Date")]
    public DateTime? PayDate
    {
        get => fields.PayDate[this];
        set => fields.PayDate[this] = value;
    }

    [DisplayName("Deduction")]
    public double? Deduction
    {
        get => fields.Deduction[this];
        set => fields.Deduction[this] = value;
    }

    [DisplayName("Earnings")]
    public double? Earnings
    {
        get => fields.Earnings[this];
        set => fields.Earnings[this] = value;
    }

    [DisplayName("Nett")]
    public double? Nett
    {
        get => fields.Nett[this];
        set => fields.Nett[this] = value;
    }

 
    [DisplayName("Employee Socso"), Column("EmployeeSOCSO")]
    public double? EmployeeSocso
    {
        get => fields.EmployeeSocso[this];
        set => fields.EmployeeSocso[this] = value;
    }

    [DisplayName("Employee Epf"), Column("EmployeeEPF")]
    public double? EmployeeEpf
    {
        get => fields.EmployeeEpf[this];
        set => fields.EmployeeEpf[this] = value;
    }

    [DisplayName("Employee Eis"), Column("EmployeeEIS")]
    public double? EmployeeEis
    {
        get => fields.EmployeeEis[this];
        set => fields.EmployeeEis[this] = value;
    }

    [DisplayName("Payroll Table")]
    public string PayrollTable
    {
        get => fields.PayrollTable[this];
        set => fields.PayrollTable[this] = value;
    }

    [DisplayName("Remarks")]
    public string Remarks
    {
        get => fields.Remarks[this];
        set => fields.Remarks[this] = value;
    }

    [DisplayName("Employee Pcb"), Column("EmployeePCB")]
    public double? EmployeePcb
    {
        get => fields.EmployeePcb[this];
        set => fields.EmployeePcb[this] = value;
    }

    [DisplayName("Employer Hrdf"), Column("EmployerHRDF")]
    public double? EmployerHrdf
    {
        get => fields.EmployerHrdf[this];
        set => fields.EmployerHrdf[this] = value;
    }

    [DisplayName("Employer Epf"), Column("EmployerEPF")]
    public double? EmployerEpf
    {
        get => fields.EmployerEpf[this];
        set => fields.EmployerEpf[this] = value;
    }

    [DisplayName("Employer Eis"), Column("EmployerEIS")]
    public double? EmployerEis
    {
        get => fields.EmployerEis[this];
        set => fields.EmployerEis[this] = value;
    }

    [DisplayName("Employer Socso"), Column("EmployerSOCSO")]
    public double? EmployerSocso
    {
        get => fields.EmployerSocso[this];
        set => fields.EmployerSocso[this] = value;
    }

    [DisplayName("Employer Table")]
    public string EmployerTable
    {
        get => fields.EmployerTable[this];
        set => fields.EmployerTable[this] = value;
    }

    [DisplayName("Pay Period Start")]
    public DateTime? PayPeriodStart
    {
        get => fields.PayPeriodStart[this];
        set => fields.PayPeriodStart[this] = value;
    }

    [DisplayName("Pay Period End")]
    public DateTime? PayPeriodEnd
    {
        get => fields.PayPeriodEnd[this];
        set => fields.PayPeriodEnd[this] = value;
    }
    [DisplayName("Employee List"),NotMapped,
        LookupEditor(typeof(EmployeeProfileRow), Multiple = true, FilterField = "IsActive", FilterValue = 1)]

    public List<int> EmployeeRowList
    {
        get => fields.EmployeeRowList[this];
        set => fields.EmployeeRowList[this] = value;
    }

    [DisplayName("Employee List Buffer"), NotMapped,HideOnInsert,HideOnUpdate,
      LookupEditor(typeof(EmployeeProfileRow), Multiple = true, FilterField = "IsActive", FilterValue = 1)]

    public List<int> EmployeeRowListBuffer
    {
        get => fields.EmployeeRowListBuffer[this];
        set => fields.EmployeeRowListBuffer[this] = value;
    }

    [DisplayName("Occupation List"), NotMapped,
        LookupEditor(typeof(OccupationRow), Multiple = true, FilterField = "IsActive", FilterValue = 1)]
    public List<int> OccupationList
    {
        get => fields.OccupationList[this];
        set => fields.OccupationList[this] = value;
    }

    [DisplayName("Department List"), NotMapped,
        LookupEditor(typeof(DepartmentRow), Multiple = true, FilterField = "IsActive", FilterValue = 1)]
    public List<int> DepartmentList
    {
        get => fields.DepartmentList[this];
        set => fields.DepartmentList[this] = value;
    }
    [DisplayName("Division List"), NotMapped,
        LookupEditor(typeof(DivisionRow), Multiple = true, FilterField = "IsActive", FilterValue = 1)]
    public List<int> DivisionList
    {
        get => fields.DivisionList[this];
        set => fields.DivisionList[this] = value;
    }
    [DisplayName("Job Grade List"), NotMapped,
        LookupEditor(typeof(JobGradeRow), Multiple = true, FilterField = "IsActive", FilterValue = 1)]
    public List<int> JobGradeList
    {
        get => fields.JobGradeList[this];
        set => fields.JobGradeList[this] = value;
    }

    [DisplayName("Pay Month"), NotMapped,NotNull]
    public string PayMonth
    {
        get => fields.PayMonth[this];
        set => fields.PayMonth[this] = value;
    }

    [DisplayName("Payslip List"), NotMapped, MultipleFileUploadEditor]
    public string PayslipList
    {
        get => fields.PayslipList[this];
        set => fields.PayslipList[this] = value;
    }
    [DisplayName("Section List"), NotMapped,
    LookupEditor(typeof(SectionRow), Multiple = true, FilterField = "IsActive", FilterValue = 1)]
    public List<int> SectionList
    {
        get => fields.SectionList[this];
        set => fields.SectionList[this] = value;
    }


    public class RowFields : LoggingRowFields
    {
        public StringField EmployeeName;

        public ListField<int> EmployeeRowList;
        public ListField<int> EmployeeRowListBuffer;
        public ListField<int> SectionList;

        public ListField<int> OccupationList;
        public ListField<int> DepartmentList;
        public ListField<int> DivisionList;
        public ListField<int> JobGradeList;
        public StringField PayslipList;
        public StringField PayMonth;


        public Int32Field Id;
        public Int32Field EmployeeRowId;
        public StringField EmployeeId;
        public DateTimeField PayDate;
        public DoubleField Deduction;
        public DoubleField Earnings;
        public DoubleField Nett;
        public DoubleField EmployeeSocso;
        public DoubleField EmployeeEpf;
        public DoubleField EmployeeEis;
        public StringField PayrollTable;
        public StringField Remarks;
        public DoubleField EmployeePcb;
        public DoubleField EmployerHrdf;
        public DoubleField EmployerEpf;
        public DoubleField EmployerEis;
        public DoubleField EmployerSocso;
        public StringField EmployerTable;
        public DateTimeField PayPeriodStart;
        public DateTimeField PayPeriodEnd;

    }
}
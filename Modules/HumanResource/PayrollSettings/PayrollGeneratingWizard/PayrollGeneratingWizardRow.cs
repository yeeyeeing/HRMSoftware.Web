using HRMSoftware.EmployeeProfile;
using HRMSoftware.Master;
using HRMSoftware.OrganisationHierarchy;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace HRMSoftware.PayrollSettings;

[ConnectionKey("Default"), Module("PayrollSettings"), TableName("HumanResourcesPayroll")]
[DisplayName("Payroll Generating Wizard"), InstanceName("Payroll Generating Wizard")]
[ReadPermission("Administration:HumanResources")]
[ModifyPermission("Administration:HumanResources")]
public sealed class PayrollGeneratingWizardRow : LoggingRow<PayrollGeneratingWizardRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Employee Row Id"), Column("EmployeeRowID")]
    public int? EmployeeRowId
    {
        get => fields.EmployeeRowId[this];
        set => fields.EmployeeRowId[this] = value;
    }

    [DisplayName("Employee Id"), Column("EmployeeID"), Size(50), QuickSearch, NameProperty]
    public string EmployeeId
    {
        get => fields.EmployeeId[this];
        set => fields.EmployeeId[this] = value;
    }

    [DisplayName("Pay Date"),NotNull]
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

    [DisplayName("Employee Name"), Size(50)]
    public string EmployeeName
    {
        get => fields.EmployeeName[this];
        set => fields.EmployeeName[this] = value;
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

    [DisplayName("Pay Period Start"), NotNull]
    public DateTime? PayPeriodStart
    {
        get => fields.PayPeriodStart[this];
        set => fields.PayPeriodStart[this] = value;
    }

    [DisplayName("Pay Period End"), NotNull]
    public DateTime? PayPeriodEnd
    {
        get => fields.PayPeriodEnd[this];
        set => fields.PayPeriodEnd[this] = value;
    }






    [DisplayName("Employee List"), NotMapped,NotNull,
     LookupEditor(typeof(EmployeeProfileRow), Multiple = true, FilterField = "IsActive", FilterValue = 1)]

    public List<int> EmployeeRowList
    {
        get => fields.EmployeeRowList[this];
        set => fields.EmployeeRowList[this] = value;
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
        LookupEditor(typeof(OrganisationHierarchy.JobGradeRow), Multiple = true, FilterField = "IsActive", FilterValue = 1)]
    public List<int> JobGradeList
    {
        get => fields.JobGradeList[this];
        set => fields.JobGradeList[this] = value;
    }

    [DisplayName("Section List"), NotMapped,
    LookupEditor(typeof(SectionRow), Multiple = true, FilterField = "IsActive", FilterValue = 1)]
    public List<int> SectionList
    {
        get => fields.SectionList[this];
        set => fields.SectionList[this] = value;
    }


    [DisplayName("Payslip List"), NotMapped, MultipleFileUploadEditor]
    public string PayslipList
    {
        get => fields.PayslipList[this];
        set => fields.PayslipList[this] = value;
    }
    [NotMapped]
    public string CompanyRegistrationNumber
    {
        get => fields.CompanyRegistrationNumber[this];
        set => fields.CompanyRegistrationNumber[this] = value;
    }

    


    [DisplayName("Pay Month"), Column("PayMonth"), NotNull]
    public int? PayMonth
    {
        get => fields.PayMonth[this];
        set => fields.PayMonth[this] = value;
    }

    [DisplayName("Pay Year"), Column("PayYear"), NotNull]
    public int? PayYear
    {
        get => fields.PayYear[this];
        set => fields.PayYear[this] = value;
    }

    [DisplayName("Download Payslip"),NotMapped]
    [BooleanEditor]
    public bool? Download 
    {
        get => fields.Download[this];
        set => fields.Download[this] = value;
    }
    [DisplayName("Employee List"), NotMapped, HideOnInsert, HideOnUpdate,
      LookupEditor(typeof(EmployeeProfileRow), Multiple = true, FilterField = "IsActive", FilterValue = 1)]

    public List<int> EmployeeRowListBuffer
    {
        get => fields.EmployeeRowListBuffer[this];
        set => fields.EmployeeRowListBuffer[this] = value;
    }

    [DisplayName("Text Class"), NotMapped,NotNull]
    public TextClass? TextType
    {
        get => fields.TextType[this];
        set => fields.TextType[this] = value;
    }
    [DisplayName("Organisation Name"),NotMapped]
    public string OrganisationName
    {
        get => fields.OrganisationName[this];
        set => fields.OrganisationName[this] = value;
    }
    [DisplayName("All Employee"), NotMapped]
    [BooleanEditor]
    public bool? All
    {
        get => fields.All[this];
        set => fields.All[this] = value;
    }
    [DisplayName("Organisation Code"), NotMapped]
    public string OrganisationCode
    {
        get => fields.OrganisationCode[this];
        set => fields.OrganisationCode[this] = value;
    }
    [DisplayName("Crediting Date"), NotNull]
    public DateTime? CreditingDate
    {
        get => fields.CreditingDate[this];
        set => fields.CreditingDate[this] = value;
    }


    [NotMapped, DisplayName("E-mail address "), NotNull]
    public string Email
    {
        get => fields.Email[this];
        set => fields.Email[this] = value;
    }
    [NotMapped, DisplayName("Phone Number"), NotNull]
    public string PhoneNumber
    {
        get => fields.PhoneNumber[this];
        set => fields.PhoneNumber[this] = value;
    }
    [NotMapped, DisplayName("Contact Person Name"), NotNull]
    public string ContactPerson
    {
        get => fields.ContactPerson[this];
        set => fields.ContactPerson[this] = value;
    }
    [DisplayName("State"), NotNull,NotMapped]
    public int? MasterStateId
    {
        get => fields.MasterStateId[this];
        set => fields.MasterStateId[this] = value;
    }
   
    [DisplayName("EIS/SOCSO Format"), NotNull,NotMapped]
    public TextFormatEisSocso? TextFormatEisSocsoId
    {
        get => fields.TextFormatEisSocsoId[this];
        set => fields.TextFormatEisSocsoId[this] = value;
    }
    [DisplayName("EPF Format"), NotNull, NotMapped]
    public TextFormatEpf? TextFormatEpfId
    {
        get => fields.TextFormatEpfId[this];
        set => fields.TextFormatEpfId[this] = value;
    }
    [DisplayName("Autopay Format"), NotNull, NotMapped]
    public TextFormatAutopay? TextFormatAutopayId
    {
        get => fields.TextFormatAutopayId[this];
        set => fields.TextFormatAutopayId[this] = value;
    }
    [DisplayName("LHDN Format"), NotNull, NotMapped]
    public TextFormatLHDN? TextFormatLhdnId
    {
        get => fields.TextFormatLhdnId[this];
        set => fields.TextFormatLhdnId[this] = value;
    }
    [DisplayName("Testing Mode"), NotNull, NotMapped]
    public TestingMode? TestingMode
    {
        get => fields.TestingMode[this];
        set => fields.TestingMode[this] = value;
    }
    
    public class RowFields : LoggingRowFields
    {
        
        public Int32Field MasterStateId;

        public StringField Email;
        public StringField PhoneNumber;
        public StringField ContactPerson;
        public StringField OrganisationName;
        public StringField OrganisationCode;
        public DateTimeField CreditingDate;

        public EnumField<TextClass> TextType;
        public EnumField<TestingMode> TestingMode;

        public EnumField<TextFormatEisSocso> TextFormatEisSocsoId;
        public EnumField<TextFormatEpf> TextFormatEpfId;
        public EnumField<TextFormatAutopay> TextFormatAutopayId;
        public EnumField<TextFormatLHDN> TextFormatLhdnId;

        public Int32Field PayMonth;
        public Int32Field PayYear;
        public BooleanField Download;


        public ListField<int> EmployeeRowListBuffer;

        public ListField<int> EmployeeRowList;
        public ListField<int> OccupationList;
        public ListField<int> DepartmentList;
        public ListField<int> DivisionList;
        public ListField<int> JobGradeList;
        public ListField<int> SectionList;

        public StringField PayslipList;
        public StringField CompanyRegistrationNumber;
        public BooleanField All;


        public Int32Field Id;
        public Int32Field EmployeeRowId;
        public StringField EmployeeId;
        public DateTimeField PayDate;
        public DoubleField Deduction;
        public DoubleField Earnings;
        public DoubleField Nett;
        public StringField EmployeeName;
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
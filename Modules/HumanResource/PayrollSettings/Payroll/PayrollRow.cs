using HRMSoftware.EmployeeProfile;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;
using HRMSoftware.Common;
using HRMSoftware.Administration;
using HRMSoftware.OrganisationHierarchy;
using System.Collections.Generic;
using HRMSoftware.OTApplication;
using HRMSoftware.MoneyClaimApplication;
using HRMSoftware.EmployeeLate;
using HRMSoftware.EmployeeEarlyLeaving;
using HRMSoftware.PayrollSettings.Columns;
using HRMSoftware.MoneyClaimApplication.Columns;

namespace HRMSoftware.PayrollSettings;

[ConnectionKey("Default"), Module("PayrollSettings"), TableName("HumanResourcesPayroll")]
[DisplayName("Payroll"), InstanceName("Payroll")]
[ReadPermission("*")]
[ModifyPermission("*")]
[LookupScript("Payroll.Payroll", Permission = "*")]

public sealed class PayrollRow : LoggingRow<PayrollRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }
    [DisplayName("Pay Month"), Column("PayMonth"), NotNull, MonthFormatter, NameProperty]
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
    
    const string jEmployeeName = nameof(jEmployeeName);
    const string jOccupationID = nameof(jOccupationID);


    [DisplayName("Employee ID"), Column("EmployeeRowID"), ForeignKey("HumanResourcesEmployee", "ID"), LeftJoin("c")]
    [LookupEditor(typeof(EmployeeProfileRow))]
    public int? EmployeeRowId
    {
        get => fields.EmployeeRowId[this];
        set => fields.EmployeeRowId[this] = value;
    }
    

    [Expression($"c.JobGradeID"),ForeignKey("HumanResourcesJobGrade", "ID"), LeftJoin("o")]
    public int? JobGradeID
    {
        get => fields.JobGradeID[this];
        set => fields.JobGradeID[this] = value;
    }
    [Expression($"o.Name")]
    public string JobGradeName
    {
        get => fields.JobGradeName[this];
        set => fields.JobGradeName[this] = value;
    }
    [Expression($"c.SectionID"), ForeignKey("HumanResourcesSection", "ID"), LeftJoin("section")]
    // [LookupEditor(typeof(JobGradeRow))]
    public int? SectionID
    {
        get => fields.SectionID[this];
        set => fields.SectionID[this] = value;
    }
    [Expression($"section.Name")]
    public string SectionName
    {
        get => fields.SectionName[this];
        set => fields.SectionName[this] = value;
    }

    [Expression($"c.DepartmentID"), ForeignKey("HumanResourcesDepartment", "ID"), LeftJoin("department")]
    // [LookupEditor(typeof(JobGradeRow))]
    public int? DepartmentID
    {
        get => fields.DepartmentID[this];
        set => fields.DepartmentID[this] = value;
    }
    [DisplayName("Department"), Expression($"department.Name")]
    public string DepartmentName
    {
        get => fields.DepartmentName[this];
        set => fields.DepartmentName[this] = value;
    }

    [Expression($"c.DivisionID"), ForeignKey("HumanResourcesDivision", "ID"), LeftJoin("division")]
    // [LookupEditor(typeof(JobGradeRow))]
    public int? DivisionID
    {
        get => fields.DivisionID[this];
        set => fields.DivisionID[this] = value;
    }
    [DisplayName("Division"), Expression($"division.Name")]
    public string DivisionName
    {
        get => fields.DivisionName[this];
        set => fields.DivisionName[this] = value;
    }

    [Expression($"c.OccupationID"), DisplayName("Occupation"), ForeignKey("HumanResourcesOccupation", "ID"), LeftJoin("os")]
    [LookupEditor(typeof(OccupationRow))]
    public int? OccupationID
    {
        get => fields.OccupationID[this];
        set => fields.OccupationID[this] = value;
    }

    [DisplayName("Occupation"), Expression($"os.Name")]
    public string OccupationName
    {
        get => fields.OccupationName[this];
        set => fields.OccupationName[this] = value;
    }
    
    [DisplayName("Employee Name"), Expression($"c.EmployeeName"), QuickSearch]
    public string EmployeeName
    {
        get => fields.EmployeeName[this];
        set => fields.EmployeeName[this] = value;
    }

    [DisplayName("Employee ID"),  Expression($"c.EmployeeID"),QuickSearch]
    public string EmployeeId
    {
        get => fields.EmployeeId[this];
        set => fields.EmployeeId[this] = value;
    }

    [DisplayName("Pay Date"), NotNull]
    public DateTime? PayDate
    {
        get => fields.PayDate[this];
        set => fields.PayDate[this] = value;
    }
    [DisplayName("DOB"), NotNull]
    public DateTime? BirthDay
    {
        get => fields.BirthDay[this];
        set => fields.BirthDay[this] = value;
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
    public double? NPLHourly
    {
        get => fields.NPLHourly[this];
        set => fields.NPLHourly[this] = value;
    }
    public double? NPLDaily
    {
        get => fields.NPLDaily[this];
        set => fields.NPLDaily[this] = value;
    }
    public double? NPLHourlyRate
    {
        get => fields.NPLHourly[this];
        set => fields.NPLHourly[this] = value;
    }
    public double? NPLDailyRate
    {
        get => fields.NPLDaily[this];
        set => fields.NPLDaily[this] = value;
    }
    public double? AbsentDailyRate
    {
        get => fields.AbsentDailyRate[this];
        set => fields.AbsentDailyRate[this] = value;
    }
    public double? AbsentDaily
    {
        get => fields.AbsentDaily[this];
        set => fields.AbsentDaily[this] = value;
    }

    public double? OtOnePointFiveRate
    {
        get => fields.OtOnePointFiveRate[this];
        set => fields.OtOnePointFiveRate[this] = value;
    }

    public double? OtTwoRate
    {
        get => fields.OtTwoRate[this];
        set => fields.OtTwoRate[this] = value;
    }
    public double? FlatOt
    {
        get => fields.FlatOt[this];
        set => fields.FlatOt[this] = value;
    }
    public double? OtOne
    {
        get => fields.OtOne[this];
        set => fields.OtOne[this] = value;
    }
    public double? OtOnePointFive
    {
        get => fields.OtOnePointFive[this];
        set => fields.OtOnePointFive[this] = value;
    }
    public double? OtTwo
    {
        get => fields.OtTwo[this];
        set => fields.OtTwo[this] = value;
    }
    [DisplayName("Child Under Eighteen")]
    public double? ChildrenUnderEighteen
    {
        get => fields.ChildrenUnderEighteen[this];
        set => fields.ChildrenUnderEighteen[this] = value;
    }
    [DisplayName("Child In University")]
    public double? ChildrenInUniversity
    {
        get => fields.ChildrenInUniversity[this];
        set => fields.ChildrenInUniversity[this] = value;
    }
    [DisplayName("Disabled Child In University")]
    public double? DisabledChildInUniversity
    {
        get => fields.DisabledChildInUniversity[this];
        set => fields.DisabledChildInUniversity[this] = value;
    }
    [DisplayName("Disabled Child")]
    public double? DisabledChild
    {
        get => fields.DisabledChild[this];
        set => fields.DisabledChild[this] = value;
    }
    [DisplayName("Deductions")]
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

   
    [DisplayName("Payroll Table")]
    public string PayrollTable
    {
        get => fields.PayrollTable[this];
        set => fields.PayrollTable[this] = value;
    }

    [DisplayName("Employer Table")]
    public string EmployerTable
    {
        get => fields.EmployerTable[this];
        set => fields.EmployerTable[this] = value;
    }
    [DisplayName("Remarks")]
    public string Remarks
    {
        get => fields.Remarks[this];
        set => fields.Remarks[this] = value;
    }

    [DisplayName("Basic Pay")]
    public double? BasicPay
    {
        get => fields.BasicPay[this];
        set => fields.BasicPay[this] = value;
    }

    [DisplayName("EmployeeEPF")]
    public double? EmployeeEPF
    {
        get => fields.EmployeeEPF[this];
        set => fields.EmployeeEPF[this] = value;
    }

    [DisplayName("EmployeeEIS")]
    public double? EmployeeEIS
    {
        get => fields.EmployeeEIS[this];
        set => fields.EmployeeEIS[this] = value;
    }

  

    [DisplayName("EmployeeSOCSO")]
    public double? EmployeeSOCSO
    {
        get => fields.EmployeeSOCSO[this];
        set => fields.EmployeeSOCSO[this] = value;
    }
    [DisplayName("EmployeePCB")]
    public double? EmployeePCB
    {
        get => fields.EmployeePCB[this];
        set => fields.EmployeePCB[this] = value;
    }




    
    [DisplayName("EmployerEPF")]
    public double? EmployerEPF
    {
        get => fields.EmployerEPF[this];
        set => fields.EmployerEPF[this] = value;
    }
    
    [DisplayName("EmployerSOCSO")]
    public double? EmployerSOCSO
    {
        get => fields.EmployerSOCSO[this];
        set => fields.EmployerSOCSO[this] = value;
    }


    public double? NumberOfWorkingDays
    {
        get => fields.NumberOfWorkingDays[this];
        set => fields.NumberOfWorkingDays[this] = value;
    }

    [DisplayName("Age")]
    public double? Age
    {
        get => fields.Age[this];
        set => fields.Age[this] = value;
    }


    [DisplayName("EmployerEIS")]
    public double? EmployerEIS
    {
        get => fields.EmployerEIS[this];
        set => fields.EmployerEIS[this] = value;
    }
    [DisplayName("EmployerHRDF")]
    public double? EmployerHRDF
    {
        get => fields.EmployerHRDF[this];
        set => fields.EmployerHRDF[this] = value;
    }

    [Size(1000)]
    public string PayslipPath
    {
        get => fields.PayslipPath[this];
        set => fields.PayslipPath[this] = value;
    }

    [DisplayName("Socso Allowance"),NotMapped]
    public double? SocsoAllowance
    {
        get => fields.SocsoAllowance[this];
        set => fields.SocsoAllowance[this] = value;
    }
    [DisplayName("Eis Allowance"), NotMapped]
    public double? EisAllowance
    {
        get => fields.EisAllowance[this];
        set => fields.EisAllowance[this] = value;
    }
    [DisplayName("Epf Allowance"), NotMapped]
    public double? EpfAllowance
    {
        get => fields.EpfAllowance[this];
        set => fields.EpfAllowance[this] = value;
    }
    [DisplayName("Hrdf Allowance"), NotMapped]
    public double? HrdfAllowance
    {
        get => fields.HrdfAllowance[this];
        set => fields.HrdfAllowance[this] = value;
    }
    [DisplayName("Pcb Allowance"), NotMapped]
    public double? PcbAllowance
    {
        get => fields.PcbAllowance[this];
        set => fields.PcbAllowance[this] = value;
    }
    [Expression($"c.CostCentreID"), ForeignKey("MasterCostCentre", "ID"), LeftJoin("CostCentre")]
    // [LookupEditor(typeof(JobGradeRow))]
    public int? CostCentreID
    {
        get => fields.CostCentreID[this];
        set => fields.CostCentreID[this] = value;
    }
    [Expression($"CostCentre.Name")]
    public string CostCentreName
    {
        get => fields.CostCentreName[this];
        set => fields.CostCentreName[this] = value;
    }

    /*
    [ LookupEditor(typeof(OTApplicationRow), Multiple = true, FilterField = "IsActive", FilterValue = 1), NotMapped]
    [LinkingSetRelation(typeof(PayslipPaidOtRow), nameof(PayslipPaidOtRow.PayslipId), nameof(PayslipPaidOtRow.OtId))]
    public List<int> PaidOtList
    {
        get => fields.PaidOtList[this];
        set => fields.PaidOtList[this] = value;
    }
 

    [ LookupEditor(typeof(EmployeeLateRow), Multiple = true), NotMapped]
    [LinkingSetRelation(typeof(PayslipDeductedLateArrivalRow), nameof(PayslipDeductedLateArrivalRow.PayslipId), nameof(PayslipDeductedLateArrivalRow.LateArrivalId))]
    public List<int> DeductedLateArrivalList
    {
        get => fields.DeductedLateArrivalList[this];
        set => fields.DeductedLateArrivalList[this] = value;
    }
    [LookupEditor(typeof(NoPaidLeaveRow), Multiple = true), NotMapped]
    [LinkingSetRelation(typeof(PayslipDeductedNoPaidLeaveRow), nameof(PayslipDeductedNoPaidLeaveRow.PayslipId), nameof(PayslipDeductedNoPaidLeaveRow.NoPaidLeaveId))]
    public List<int> DeductedNoPaidLeaveList
    {
        get => fields.DeductedNoPaidLeaveList[this];
        set => fields.DeductedNoPaidLeaveList[this] = value;
    }
    [LookupEditor(typeof(EmployeeEarlyLeavingRow), Multiple = true), NotMapped]
    [LinkingSetRelation(typeof(PayslipDeductedEarlyLeavingRow), nameof(PayslipDeductedEarlyLeavingRow.PayslipId), nameof(PayslipDeductedEarlyLeavingRow.EarlyLeavingId))]
    public List<int> DeductedEarlyLeavingList
    {
        get => fields.DeductedEarlyLeavingList[this];
        set => fields.DeductedEarlyLeavingList[this] = value;
    }
        [LookupEditor(typeof(MoneyClaimApplicationRow), Multiple = true, FilterField = "IsActive", FilterValue = 1), NotMapped]
    [LinkingSetRelation(typeof(PayslipPaidMoneyClaimingRow), nameof(PayslipPaidMoneyClaimingRow.PayslipId), nameof(PayslipPaidMoneyClaimingRow.MoneyClaimingId))]
    public List<int> PaidMoneyClaimingList
    {
        get => fields.PaidMoneyClaimingList[this];
        set => fields.PaidMoneyClaimingList[this] = value;
    }
    */
    //[LookupEditor(typeof(EmployeeAllowanceRow), Multiple = true), NotMapped]
    //[LinkingSetRelation(typeof(PayslipPaidOneTimeAllowanceRow), nameof(PayslipPaidOneTimeAllowanceRow.PayslipId), nameof(PayslipPaidOneTimeAllowanceRow.AllowanceId))]
    [MasterDetailRelation(foreignKey: nameof(PayslipPaidOneTimeAllowanceRow.PayslipId), ColumnsType = typeof(PayslipPaidOneTimeAllowanceColumns)), NotMapped]
    public List<PayslipPaidOneTimeAllowanceRow> AllowanceList
    {
        get => fields.AllowanceList[this];
        set => fields.AllowanceList[this] = value;
    }
    //[LookupEditor(typeof(FixedDeductionRow), Multiple = true), NotMapped]
    // [LinkingSetRelation(typeof(PayslipDeductedOneTimeDeductionsRow), nameof(PayslipDeductedOneTimeDeductionsRow.PayslipId), nameof(PayslipDeductedOneTimeDeductionsRow.DeductionId))]
    [MasterDetailRelation(foreignKey: nameof(PayslipDeductedOneTimeDeductionsRow.PayslipId), ColumnsType = typeof(PayslipDeductedOneTimeDeductionsColumns)), NotMapped]
    public List<PayslipDeductedOneTimeDeductionsRow> DeductionList
    {
        get => fields.DeductionList[this];
        set => fields.DeductionList[this] = value;
    }
    [MasterDetailRelation(foreignKey: nameof(PayslipPaidMoneyClaimingRow.PayslipId), ColumnsType = typeof(PayslipPaidMoneyClaimingColumns)), NotMapped]
    public List<PayslipPaidMoneyClaimingRow> PaidMoneyClaimingList
    {
        get => fields.PaidMoneyClaimingList[this];
        set => fields.PaidMoneyClaimingList[this] = value;
    }



    [MasterDetailRelation(foreignKey: nameof(PayrollEarningsRow.PayslipId), ColumnsType = typeof(PayrollEarningsColumns)),NotMapped]
    public List<PayrollEarningsRow> PayrollEarnings
    {
        get => fields.PayrollEarnings[this];
        set => fields.PayrollEarnings[this] = value;
    }

    [MasterDetailRelation(foreignKey: nameof(PayrollDeductionsRow.PayslipId), ColumnsType = typeof(PayrollDeductionsColumns)), NotMapped]
    public List<PayrollDeductionsRow> PayrollDeductions
    {
        get => fields.PayrollDeductions[this];
        set => fields.PayrollDeductions[this] = value;
    }
    /*
    [MasterDetailRelation(foreignKey: nameof(EmployerContributionsRow.PayslipId), ColumnsType = typeof(EmployerContributionsColumns)), NotMapped]
    public List<EmployerContributionsRow> EmployerContributions
    {
        get => fields.EmployerContributions[this];
        set => fields.EmployerContributions[this] = value;
    }
    */
    [DisplayName("Days Worked")]
    public double? DaysWorked
    {
        get => fields.DaysWorked[this];
        set => fields.DaysWorked[this] = value;
    }

    [DisplayName("Daily Rate")]
    public double? DailyRate
    {
        get => fields.DailyRate[this];
        set => fields.DailyRate[this] = value;
    }

    [DisplayName("Hourly Rate")]
    public double? HourlyRate
    {
        get => fields.HourlyRate[this];
        set => fields.HourlyRate[this] = value;
    }

    [DisplayName("EPF Class")]
    public EPFClass? EpfClass
    {
        get => fields.EpfClass[this];
        set => fields.EpfClass[this] = value;
    }
    [DisplayName("Socso Class")]
    public SOCSOClass? SocsoClass
    {
        get => fields.SocsoClass[this];
        set => fields.SocsoClass[this] = value;
    }

    [DisplayName("EIS Class")]
    public EISClass? EisClass
    {
        get => fields.EisClass[this];
        set => fields.EisClass[this] = value;
    }

    [DisplayName("Tax Class")]
    public int? TaxClass
    {
        get => fields.TaxClass[this];
        set => fields.TaxClass[this] = value;
    }

    [DisplayName("Working Spouse"), BooleanEditor]
    public bool? WorkingSpouse
    {
        get => fields.WorkingSpouse[this];
        set => fields.WorkingSpouse[this] = value;
    }
    [ BooleanEditor]
    public bool? OtSubjectEpf
    {
        get => fields.OtSubjectEpf[this];
        set => fields.OtSubjectEpf[this] = value;
    }
    [BooleanEditor]
    public bool? OtSubjectEis
    {
        get => fields.OtSubjectEis[this];
        set => fields.OtSubjectEis[this] = value;
    }
    [BooleanEditor]
    public bool? OtSubjectPcb
    {
        get => fields.OtSubjectPcb[this];
        set => fields.OtSubjectPcb[this] = value;
    }
    [BooleanEditor]
    public bool? OtSubjectSocso
    {
        get => fields.OtSubjectSocso[this];
        set => fields.OtSubjectSocso[this] = value;
    }
    [BooleanEditor]
    public bool? OtSubjectHrdf
    {
        get => fields.OtSubjectHrdf[this];
        set => fields.OtSubjectHrdf[this] = value;
    }





    [DisplayName("Marital Status")]
    public MaritalStatus? MaritalStatus
    {
        get => fields.MaritalStatus[this];
        set => fields.MaritalStatus[this] = value;
    }
    public double? EarlyLeaving
    {
        get => fields.EarlyLeaving[this];
        set => fields.EarlyLeaving[this] = value;
    }
    public double? EarlyLeavingRate
    {
        get => fields.EarlyLeavingRate[this];
        set => fields.EarlyLeavingRate[this] = value;
    }
    public double? LateArrival
    {
        get => fields.LateArrival[this];
        set => fields.LateArrival[this] = value;
    }
    public double? LateArrivalRate
    {
        get => fields.LateArrivalRate[this];
        set => fields.LateArrivalRate[this] = value;
    }
    /*
    public double? EisWage
    {
        get => fields.EisWage[this];
        set => fields.EisWage[this] = value;
    }
    public double? SocsoWage
    {
        get => fields.SocsoWage[this];
        set => fields.SocsoWage[this] = value;
    }
    public double? HrdfWage
    {
        get => fields.HrdfWage[this];
        set => fields.HrdfWage[this] = value;
    }
    public double? EpfWage
    {
        get => fields.EpfWage[this];
        set => fields.EpfWage[this] = value;
    }
    public double? TotalDeduction
    {
        get => fields.TotalDeduction[this];
        set => fields.TotalDeduction[this] = value;
    }
    public double? TotalAllowance
    {
        get => fields.TotalAllowance[this];
        set => fields.TotalAllowance[this] = value;
    }
    public double? TotalTaxableWage
    {
        get => fields.TotalTaxableWage[this];
        set => fields.TotalTaxableWage[this] = value;
    }
    public double? GrossWage
    {
        get => fields.GrossWage[this];
        set => fields.GrossWage[this] = value;
    }
    public double? NettWage
    {
        get => fields.NettWage[this];
        set => fields.NettWage[this] = value;
    }
    */
    public class RowFields : LoggingRowFields
    {
        /*
        public DoubleField TotalAllowance;
        public DoubleField TotalDeduction;
        public DoubleField EpfWage;
        public DoubleField HrdfWage;
        public DoubleField SocsoWage;
        public DoubleField EisWage;
        public DoubleField TotalTaxableWage;
        public DoubleField GrossWage;
        public DoubleField NettWage;
        */


        public DoubleField NPLHourlyRate;
        public DoubleField NPLDailyRate;

        public DoubleField NPLHourly;
        public DoubleField NPLDaily;
        public DoubleField AbsentDaily;
        public DoubleField AbsentDailyRate;

        public DoubleField EarlyLeavingRate;
        public DoubleField LateArrivalRate;

        public DoubleField EarlyLeaving;
        public DoubleField LateArrival;

        public DoubleField FlatOt;
        public DoubleField OtOne;
        public DoubleField OtOnePointFive;
        public DoubleField OtTwo;

        public DoubleField ChildrenUnderEighteen;
        public DoubleField ChildrenInUniversity;
        public DoubleField DisabledChildInUniversity;
        public DoubleField DisabledChild;
        public BooleanField WorkingSpouse;
        public EnumField<MaritalStatus> MaritalStatus;

        public BooleanField OtSubjectEpf;
        public BooleanField OtSubjectEis;
        public BooleanField OtSubjectPcb;
        public BooleanField OtSubjectSocso;
        public BooleanField OtSubjectHrdf;



        public EnumField<EPFClass> EpfClass;
        public EnumField<SOCSOClass> SocsoClass;
        public EnumField<EISClass> EisClass;
        public Int32Field TaxClass;




        public DoubleField DaysWorked;
        public DoubleField DailyRate;
        public DoubleField HourlyRate;



        public RowListField<PayrollEarningsRow> PayrollEarnings;
        public RowListField<PayrollDeductionsRow> PayrollDeductions;
        public RowListField<PayslipDeductedOneTimeDeductionsRow> DeductionList;
        public RowListField<PayslipPaidOneTimeAllowanceRow> AllowanceList;

        //public ListField<EmployerContributionsRow> EmployerContributions;
        public RowListField<PayslipPaidMoneyClaimingRow> PaidMoneyClaimingList;

        /*
        public ListField<int> PaidOtList;
        public ListField<int> DeductedLateArrivalList;
        public ListField<int> DeductedNoPaidLeaveList;
        public ListField<int> DeductedEarlyLeavingList;
        */


        public DoubleField BasicPay;
        public DoubleField SocsoAllowance;
        public DoubleField EisAllowance;
        public DoubleField EpfAllowance;
        public DoubleField HrdfAllowance;
        public DoubleField PcbAllowance;

        public Int32Field Id;
        public Int32Field PayMonth;
        public Int32Field PayYear;

        public Int32Field CostCentreID;
        public StringField CostCentreName;
        public Int32Field DepartmentID;
        public StringField DepartmentName;
        public Int32Field DivisionID;
        public StringField DivisionName;
        public Int32Field OccupationID;
        public StringField OccupationName;
        public Int32Field JobGradeID;
        public StringField JobGradeName;
        public Int32Field SectionID;
        public StringField SectionName;

        public StringField PayslipPath;


        public Int32Field EmployeeRowId;
        public StringField EmployeeName;

        public StringField EmployeeId;
        public StringField PayrollTable;
        public DateTimeField BirthDay;
        public DoubleField Age;


        public DateTimeField PayDate;
        public DateTimeField PayPeriodStart;
        public DateTimeField PayPeriodEnd;

        public DoubleField Deduction;
        public DoubleField Earnings;
        public DoubleField Nett;

        public DoubleField EmployeeEPF;
        public DoubleField EmployeeEIS;
        public DoubleField EmployeeSOCSO;
        public DoubleField EmployeePCB;

        public DoubleField EmployerHRDF;
        public DoubleField EmployerEPF;
        public DoubleField EmployerEIS;
        public DoubleField EmployerSOCSO;
        public DoubleField NumberOfWorkingDays;
        public DoubleField OtOnePointFiveRate;
        public DoubleField OtTwoRate;

        public StringField Remarks;
        public StringField EmployerTable;
    }
}
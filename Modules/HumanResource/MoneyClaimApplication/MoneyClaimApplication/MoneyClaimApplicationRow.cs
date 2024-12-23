using HRMSoftware.Administration;
using HRMSoftware.EmployeeProfile;
using HRMSoftware.OTApplication;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using Serenity.Extensions.Entities;
using System;
using System.ComponentModel;

namespace HRMSoftware.MoneyClaimApplication;

[ConnectionKey("Default"), Module("MoneyClaimApplication"), TableName("HumanResourcesMoneyClaiming")]
[DisplayName("Money Claim Application"), InstanceName("Money Claim Application")]
[ReadPermission(PermissionKeys.Employee)]
[ModifyPermission(PermissionKeys.Employee)]
[LookupScript("MoneyClaimApplication.MoneyClaimApplication", Permission = "*")]
public sealed class MoneyClaimApplicationRow : LoggingRow<MoneyClaimApplicationRow.RowFields>, IIdRow, INameRow
{
    const string jClaimReason = nameof(jClaimReason);
    [DisplayName("Subjection To Eis"), BooleanEditor, StatusFormatter]
    public bool? SubjectionEis
    {
        get => fields.SubjectionEis[this];
        set => fields.SubjectionEis[this] = value;
    }
    [DisplayName("Subjection To Epf"), BooleanEditor, StatusFormatter]
    public bool? SubjectionEpf
    {
        get => fields.SubjectionEpf[this];
        set => fields.SubjectionEpf[this] = value;
    }
    [DisplayName("Subjection To HRDF"), BooleanEditor, StatusFormatter]
    public bool? SubjectionHrdf
    {
        get => fields.SubjectionHrdf[this];
        set => fields.SubjectionHrdf[this] = value;
    }
    [DisplayName("Subjection To Socso"), BooleanEditor, StatusFormatter]
    public bool? SubjectionSocso
    {
        get => fields.SubjectionSocso[this];
        set => fields.SubjectionSocso[this] = value;
    }
    [DisplayName("Subjection To Pcb"), BooleanEditor, StatusFormatter]
    public bool? SubjectionPcb
    {
        get => fields.SubjectionPcb[this];
        set => fields.SubjectionPcb[this] = value;
    }
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Claim Amount"),NotNull]
    public double? ClaimAmount
    {
        get => fields.ClaimAmount[this];
        set => fields.ClaimAmount[this] = value;
    }
    const string jEmployeeName = nameof(jEmployeeName);
    [DisplayName("Employee ID"), Column("EmployeeRowID"), ForeignKey(typeof(EmployeeProfileRow)), LeftJoin("c"),NameProperty]
    [LookupEditor(typeof(EmployeeProfileRow))]
    public int? EmployeeRowId
    {
        get => fields.EmployeeRowId[this];
        set => fields.EmployeeRowId[this] = value;
    }

    [DisplayName("Employee Name"), Expression($"c.EmployeeName"), QuickSearch]
    public string EmployeeName
    {
        get => fields.EmployeeName[this];
        set => fields.EmployeeName[this] = value;
    }


    [DisplayName("Claim Reason"), Column("ClaimReasonID"), ForeignKey("HumanResourcesClaimReason", "ID"), LeftJoin(jClaimReason), TextualField(nameof(ClaimReason)), NotNull]
    [LookupEditor(typeof(MoneyClaimApplication.MoneyClaimReasonRow))]
    public int? ClaimReasonId
    {
        get => fields.ClaimReasonId[this];
        set => fields.ClaimReasonId[this] = value;
    }
   

    [DisplayName("Description"),NotNull]
    public string Description
    {
        get => fields.Description[this];
        set => fields.Description[this] = value;
    }

    [DisplayName("Claim Reason"), Expression($"{jClaimReason}.[ClaimReason]")]
    public string ClaimReason
    {
        get => fields.ClaimReason[this];
        set => fields.ClaimReason[this] = value;
    }

    [DisplayName("Supporting Document"), Column("SupportingDocument"), Size(2147483647),NotNull]
    [MultipleFileUploadEditor]
    public string SupportingDocument
    {
        get => fields.SupportingDocument[this];
        set => fields.SupportingDocument[this] = value;
    }


    [DisplayName("Claiming Date"), Column("ClaimingDate"), NotNull]
    public DateTime? ClaimingDate
    {
        get => fields.ClaimingDate[this];
        set => fields.ClaimingDate[this] = value;
    }

    [DisplayName("Status"), Column("Status"), ApplicationStatusFormatter]
    public MoneyClaimingStatus? Status
    {
        get => fields.Status[this];
        set => fields.Status[this] = value;
    }

    const string jApproveEmployeeName = nameof(jApproveEmployeeName);

    [DisplayName("Approved By"), Column("ApprovedBy"), ForeignKey(typeof(EmployeeProfileRow)), LeftJoin(jApproveEmployeeName)]
    [LookupEditor(typeof(EmployeeProfileRow))]
    public int? ApprovedBy
    {
        get => fields.ApprovedBy[this];
        set => fields.ApprovedBy[this] = value;
    }
    [DisplayName("Approved By"), Expression($"{jApproveEmployeeName}.EmployeeName")]
    public string ApproveEmployeeName
    {
        get => fields.ApproveEmployeeName[this];
        set => fields.ApproveEmployeeName[this] = value;
    }

    const string jRejectedEmployeeName = nameof(jRejectedEmployeeName);

    [DisplayName("Rejected By"), Column("RejectedBy"), ForeignKey(typeof(EmployeeProfileRow)), LeftJoin(jRejectedEmployeeName)]
    [LookupEditor(typeof(EmployeeProfileRow))]
    public int? RejectedBy
    {
        get => fields.RejectedBy[this];
        set => fields.RejectedBy[this] = value;
    }
    [DisplayName("Rejected By"), Expression($"{jRejectedEmployeeName}.EmployeeName")]
    public string RejectedEmployeeName
    {
        get => fields.RejectedEmployeeName[this];
        set => fields.RejectedEmployeeName[this] = value;
    }
    [DisplayName("Employee ID"), Expression($"c.EmployeeID"),QuickSearch]
    public string EmployeeID
    {
        get => fields.EmployeeID[this];
        set => fields.EmployeeID[this] = value;
    }
    [DisplayName("Claiming Category"),NotNull]
    public string ClaimingCategory
    {
        get => fields.ClaimingCategory[this];
        set => fields.ClaimingCategory[this] = value;
    }
    
    [DisplayName("Paid"), Column("Paid")]
    public int? Paid
    {
        get => fields.Paid[this];
        set => fields.Paid[this] = value;
    }

    [DisplayName("Payroll ID"), Column("PayrollID")]
    public int? PayrollID
    { 
        get => fields.PayrollID[this];
        set => fields.PayrollID[this] = value;
    }

    [Expression($"c.JobGradeID"), ForeignKey("HumanResourcesJobGrade", "ID"), LeftJoin("o")]
    // [LookupEditor(typeof(JobGradeRow))]
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


    [DisplayName("Superior")]
    public MoneyClaimingStatus? EmployeeStatus
    {
        get => fields.EmployeeStatus[this];
        set => fields.EmployeeStatus[this] = value;
    }
    [DisplayName("Updated Superior"), ForeignKey(typeof(EmployeeProfileRow)), LeftJoin("UpdatedSuperior")]
    [LookupEditor(typeof(EmployeeProfileRow))]
    public int? EmployeeUpdated
    {
        get => fields.EmployeeUpdated[this];
        set => fields.EmployeeUpdated[this] = value;
    }
    [DisplayName("Updated Superior"), Expression($"UpdatedSuperior.EmployeeName")]
    public string EmployeeUpdatedName
    {
        get => fields.HrUpdatedName[this];
        set => fields.HrUpdatedName[this] = value;
    }
    [DisplayName("Updated HR"),  ForeignKey(typeof(EmployeeProfileRow)), LeftJoin("UpdatedHR")]
    [LookupEditor(typeof(EmployeeProfileRow))]
    public int? HrUpdated
    {
        get => fields.HrUpdated[this];
        set => fields.HrUpdated[this] = value;
    }
    [DisplayName("Updated HR"), Expression($"UpdatedHR.EmployeeName")]
    public string HrUpdatedName
    {
        get => fields.HrUpdatedName[this];
        set => fields.HrUpdatedName[this] = value;
    }
    [DisplayName("HR")]
    public MoneyClaimingStatus? HrStatus
    {
        get => fields.HrStatus[this];
        set => fields.HrStatus[this] = value;
    }
    public class RowFields : LoggingRowFields
    {
        public BooleanField SubjectionEis;
        public BooleanField SubjectionEpf;
        public BooleanField SubjectionHrdf;
        public BooleanField SubjectionSocso;
        public BooleanField SubjectionPcb;

        public Int32Field EmployeeUpdated;
        public Int32Field HrUpdated;
        public StringField EmployeeUpdatedName;
        public StringField HrUpdatedName;
        public EnumField<MoneyClaimingStatus> EmployeeStatus;
        public EnumField<MoneyClaimingStatus> HrStatus;





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



        public Int32Field Id;
        public Int32Field Paid;
        public Int32Field PayrollID;
        public EnumField<MoneyClaimingStatus> Status;
        public Int32Field RejectedBy;
        public StringField RejectedEmployeeName;

        public DoubleField ClaimAmount;
        public Int32Field EmployeeRowId;
        public StringField EmployeeName;
        public Int32Field ClaimReasonId;
        public StringField Description;
        public StringField ClaimingCategory;
        public StringField ApproveEmployeeName;
        public Int32Field ApprovedBy;


        public StringField ClaimReason;
        public StringField SupportingDocument;
        public DateTimeField ClaimingDate;
        public StringField EmployeeID;

    }
}
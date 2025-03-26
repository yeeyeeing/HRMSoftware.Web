using HRMSoftware.EmployeeProfile;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.LeaveApplication;

[ConnectionKey("Default"), Module("LeaveApplication"), TableName("HumanResourcesLeaveApplication")]
[DisplayName("Leave Application"), InstanceName("Leave Application")]
[ReadPermission("*")]
[ModifyPermission("*")]

public sealed class LeaveApplicationRow : LoggingRow<LeaveApplicationRow.RowFields>, IIdRow, INameRow
{
    const string jLeaveReason = nameof(jLeaveReason);

    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }


    const string jApproveEmployeeName = nameof(jApproveEmployeeName);

    [DisplayName("Approved By"),Column("ApprovedBy") ,ForeignKey(typeof(EmployeeProfileRow)), LeftJoin(jApproveEmployeeName)]
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


    [DisplayName("Leave Description"), Column("LeaveDescription"), NotNull]
    public string LeaveDescriptions
    {
        get => fields.LeaveDescriptions[this];
        set => fields.LeaveDescriptions[this] = value;
    }

    const string jEmployeeName = nameof(jEmployeeName);
    [DisplayName("Employee ID"), Column("EmployeeRowID"), ForeignKey(typeof(EmployeeProfileRow)), LeftJoin("c")]
    [LookupEditor(typeof(EmployeeProfileRow))]
    public int? EmployeeRowId
    {
        get => fields.EmployeeRowId[this];
        set => fields.EmployeeRowId[this] = value;
    }

    [DisplayName("Employee Name"), Expression($"c.EmployeeName"),QuickFilter]
    public string EmployeeName
    {
        get => fields.EmployeeName[this];
        set => fields.EmployeeName[this] = value;
    }


    [DisplayName("Type"), Column("HalfDay")]
    public LeaveTypes? HalfDay
    {
        get => fields.HalfDay[this];
        set => fields.HalfDay[this] = value;
    }

    [DisplayName("Status"), Column("Status"),ApplicationStatusFormatter]
    public LeaveStatus? Status
    {
        get => fields.Status[this];
        set => fields.Status[this] = value;
    }

    [DisplayName("Category"), Column("LeaveReasonID"), ForeignKey("HumanResourcesLeaveReason", "ID"), LeftJoin(jLeaveReason), TextualField(nameof(LeaveReason)),NotNull]
    [LookupEditor(typeof(LeaveApplication.LeaveReasonRow))]
    public int? LeaveReasonId
    {
        get => fields.LeaveReasonId[this];
        set => fields.LeaveReasonId[this] = value;
    }

    [DisplayName("Category"), Expression($"{jLeaveReason}.[LeaveReason]")]
    public string LeaveReason
    {
        get => fields.LeaveReason[this];
        set => fields.LeaveReason[this] = value;
    }


    const string jLeaveDescription = nameof(jLeaveDescription);


    [DisplayName("Leave Reason"), Column("LeaveDescriptionID"), ForeignKey("HumanResourcesLeaveDescription", "ID"), LeftJoin(jLeaveDescription), TextualField(nameof(LeaveDesc)), NotNull]
    [LookupEditor("LeaveDescription.LeaveDescription")]
    public int? LeaveDescriptionID
    {
        get => fields.LeaveDescriptionID[this];
        set => fields.LeaveDescriptionID[this] = value;
    }

    [DisplayName("Leave Reason"), Expression($"{jLeaveDescription}.[Name]")]
    public string LeaveDesc
    {
        get => fields.LeaveDesc[this];
        set => fields.LeaveDesc[this] = value;
    }



    [DisplayName("Balance"), Column("BalanceLeave")]
    public double? BalanceLeave
    {
        get => fields.BalanceLeave[this];
        set => fields.BalanceLeave[this] = value;
    }

    [DisplayName("Eligible Days"), Column("EligibleDay")]
    public double? EligibleDay
    {
        get => fields.EligibleDay[this];
        set => fields.EligibleDay[this] = value;
    }


    [DisplayName("Taken Leave"), Column("LeaveTaken")]
    public double? LeaveTaken
    {
        get => fields.LeaveTaken[this];
        set => fields.LeaveTaken[this] = value;
    }


    [DisplayName("Supporting Document"), Column("SupportingDocument"), Size(2147483647)]
    [MultipleFileUploadEditor]
    public string SupportingDocument
    {
        get => fields.SupportingDocument[this];
        set => fields.SupportingDocument[this] = value;
    }
    

    [DisplayName("Start Date"), Column("StartDate"), QuickSearch, NotNull,NameProperty]
    public DateTime? StartDate
    {
        get => fields.StartDate[this];
        set => fields.StartDate[this] = value;
    }

    [DisplayName("End Date"), Column("EndDate"),NotNull]
    public DateTime? EndDate
    {
        get => fields.EndDate[this];
        set => fields.EndDate[this] = value;
    }

    [DisplayName("Employee ID"), Expression($"c.EmployeeID")]
    public string EmployeeID
    {
        get => fields.EmployeeID[this];
        set => fields.EmployeeID[this] = value;
    }

    [DisplayName("Morning Session"), Column("MorningSession")]
    [BooleanEditor]
    public bool? MorningSession
    {
        get => fields.MorningSession[this];
        set => fields.MorningSession[this] = value;
    }
    [DisplayName("Afternoon Session"), Column("AfternoonSession")]
    [BooleanEditor]
    public bool? AfternoonSession
    {
        get => fields.AfternoonSession[this];
        set => fields.AfternoonSession[this] = value;
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


    [Expression($"c.DepartmentID"), ForeignKey("HumanResourcesDepartment", "ID"), LeftJoin("department"), LookupEditor(typeof(OrganisationHierarchy.DepartmentRow), Multiple = true)]
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


    [NotMapped]
    public int? LeaveToTake
    {
        get => fields.LeaveToTake[this];
        set => fields.LeaveToTake[this] = value;
    }


    [DisplayName("Superior")]
    public LeaveStatus? EmployeeStatus
    {
        get => fields.EmployeeStatus[this];
        set => fields.EmployeeStatus[this] = value;
    }
    [DisplayName("HR")]
    public LeaveStatus? HrStatus
    {
        get => fields.HrStatus[this];
        set => fields.HrStatus[this] = value;
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
    [DisplayName("Updated HR"), ForeignKey(typeof(EmployeeProfileRow)), LeftJoin("UpdatedHR")]
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
    [NotMapped]
    public string WeekdaysList
    {
        get => fields.WeekdaysList[this];
        set => fields.WeekdaysList[this] = value;
    }
    [DisplayName("Superior Reject Reason")]
    public string SuperiorRejectReason
    {
        get => fields.SuperiorRejectReason[this];
        set => fields.SuperiorRejectReason[this] = value;
    }
    [DisplayName("HR Reject Reason")]
    public string HrRejectReason
    {
        get => fields.HrRejectReason[this];
        set => fields.HrRejectReason[this] = value;
    }

    public class RowFields : LoggingRowFields
    {
        public StringField SuperiorRejectReason;
        public StringField HrRejectReason;

        public StringField EmployeeUpdatedName;
        public StringField HrUpdatedName;
        public Int32Field EmployeeUpdated;
        public Int32Field HrUpdated;

        public EnumField<LeaveStatus> EmployeeStatus;
        public EnumField<LeaveStatus> HrStatus;
        public StringField WeekdaysList;









        public Int32Field LeaveToTake;
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

        public DateTimeField StartDate;
        public DateTimeField EndDate;
        public Int32Field ApprovedBy;
        public BooleanField MorningSession;
        public BooleanField AfternoonSession;

        public Int32Field RejectedBy;
        public StringField RejectedEmployeeName;

        public Int32Field Id;
        public Int32Field LeaveDescriptionID;
        public StringField LeaveDescriptions;

        public StringField ApproveEmployeeName;

        public StringField LeaveDesc;
        public Int32Field EmployeeRowId;
        public StringField EmployeeName;

        public Int32Field LeaveReasonId;
        public EnumField<LeaveTypes> HalfDay;
        public EnumField<LeaveStatus> Status;

        public StringField LeaveReason;
        public StringField SupportingDocument;
        public DoubleField BalanceLeave;
        public DoubleField EligibleDay;
        public DoubleField LeaveTaken;
        public StringField EmployeeID;

    }
}
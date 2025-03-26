using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;
using HRMSoftware.Administration;
using HRMSoftware.EmployeeProfile;

namespace HRMSoftware.OTApplication;

[ConnectionKey("Default"), Module("OTApplication"), TableName("HumanResourcesOT")]
[DisplayName("OT Application"), InstanceName("Ot Application")]
[ReadPermission('*')]
[ModifyPermission('*')]
[LookupScript("OtApplication.OtApplication", Permission = "*")]

public sealed class OTApplicationRow : LoggingRow<OTApplicationRow.RowFields>, IIdRow, INameRow
{
    const string jOtReason = nameof(jOtReason);

    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }


    const string jEmployeeName = nameof(jEmployeeName);
    [DisplayName("Employee ID"), Column("EmployeeRowID"), ForeignKey(typeof(EmployeeProfileRow)), LeftJoin("c")]
    [LookupEditor(typeof(EmployeeProfileRow))]
    public int? EmployeeRowId
    {
        get => fields.EmployeeRowId[this];
        set => fields.EmployeeRowId[this] = value;
    }




    [DisplayName("Employee Name"), Expression($"c.EmployeeName"), NameProperty, QuickSearch]
    public string EmployeeName
    {
        get => fields.EmployeeName[this];
        set => fields.EmployeeName[this] = value;
    }


    [DisplayName("OT Description"), Column("OTDescription")]
    public string OTDescription
    {
        get => fields.OTDescription[this];
        set => fields.OTDescription[this] = value;
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


    [DisplayName("Employee ID"), Expression($"c.EmployeeID"), QuickSearch]
    public string EmployeeID
    {
        get => fields.EmployeeID[this];
        set => fields.EmployeeID[this] = value;
    }


    [DisplayName("Ot Reason"), Column("OTReasonID"), ForeignKey("HumanResourcesOTReason", "ID"), LeftJoin(jOtReason), TextualField(nameof(OtReason))]
    [LookupEditor(typeof(OTApplication.OTReasonRow)),NotNull]
    public int? OtReasonId
    {
        get => fields.OtReasonId[this];
        set => fields.OtReasonId[this] = value;
    }

    [DisplayName("Ot Date"), Column("OTDate"), NotNull]
    public DateTime? OtDate
    {
        get => fields.OtDate[this];
        set => fields.OtDate[this] = value;
    }

    [DisplayName("Starting Hour")]
    public int? StartingHour
    {
        get => fields.StartingHour[this];
        set => fields.StartingHour[this] = value;
    }

    [DisplayName("Starting Minute")]
    public int? StartingMinute
    {
        get => fields.StartingMinute[this];
        set => fields.StartingMinute[this] = value;
    }

    [DisplayName("Ending Hour")]
    public int? EndingHour
    {
        get => fields.EndingHour[this];
        set => fields.EndingHour[this] = value;
    }

    [DisplayName("Ending Minute")]
    public int? EndingMinute
    {
        get => fields.EndingMinute[this];
        set => fields.EndingMinute[this] = value;
    }

    [DisplayName("OT Hour"), NotNull,NotMapped]
    public double? OtHourBuffer
    {
        get => fields.OtHourBuffer[this];
        set => fields.OtHourBuffer[this] = value;
    }
    [DisplayName("Subtotal"), NotNull, NotMapped]
    public double? OtPayBuffer
    {
        get => fields.OtPayBuffer[this];
        set => fields.OtPayBuffer[this] = value;
    }

    [DisplayName("OT Rate"),NotNull]
    public double? OtRate
    {
        get => fields.OtRate[this];
        set => fields.OtRate[this] = value;
    }
    [DisplayName("Total Ot Pay")]
    public double? TotalOtPay
    {
        get => fields.TotalOtPay[this];
        set => fields.TotalOtPay[this] = value;
    }


    


    [DisplayName("Starting Time"), Size(10)]
    public DateTime? StartingTime
    {
        get => fields.StartingTime[this];
        set => fields.StartingTime[this] = value;
    }

    [DisplayName("Ending Time"), Size(10)]
    public DateTime? EndingTime
    {
        get => fields.EndingTime[this];
        set => fields.EndingTime[this] = value;
    }

    [DisplayName("Ot Reason"), Expression($"{jOtReason}.[OTReason]")]
    public string OtReason
    {
        get => fields.OtReason[this];
        set => fields.OtReason[this] = value;
    }
    [DisplayName("Status"), Column("Status"),ApplicationStatusFormatter]
    public OTApplicationStatus? Status
    {
        get => fields.Status[this];
        set => fields.Status[this] = value;
    }

    [DisplayName("Paid"), StatusFormatter]
    public int? Paid
    {
        get => fields.Paid[this];
        set => fields.Paid[this] = value;
    }

    [DisplayName("Ot Minute")]
    public int? OtMinute
    {
        get => fields.OtMinute[this];
        set => fields.OtMinute[this] = value;
    }

    [DisplayName("Starting At"), NotNull]
    public string StartingAt
    {
        get => fields.StartingAt[this];
        set => fields.StartingAt[this] = value;
    }

    [DisplayName("Ending At"), NotNull]
    public string EndingAt
    {
        get => fields.EndingAt[this];
        set => fields.EndingAt[this] = value;
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
    public OTApplicationStatus? EmployeeStatus
    {
        get => fields.EmployeeStatus[this];
        set => fields.EmployeeStatus[this] = value;
    }
  
    [DisplayName("HR")]
    public OTApplicationStatus? HrStatus
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
    public double? OtRateWeekend
    {
        get => fields.OtRateWeekend[this];
        set => fields.OtRateWeekend[this] = value;
    }
    [NotMapped]
    public double? OtRateWeekday
    {
        get => fields.OtRateWeekday[this];
        set => fields.OtRateWeekday[this] = value;
    }
    [DisplayName("Weekend Ot"), BooleanEditor]
    public bool? WeekendOt
    {
        get => fields.WeekendOt[this];
        set => fields.WeekendOt[this] = value;
    }
    [DisplayName("Public Holiday Ot"),BooleanEditor]
    public bool? PublicHolidayOt
    {
        get => fields.PublicHolidayOt[this];
        set => fields.PublicHolidayOt[this] = value;
    }
    [DisplayName("Weekday Ot"), BooleanEditor]
    public bool? WeekdayOt
    {
        get => fields.WeekdayOt[this];
        set => fields.WeekdayOt[this] = value;
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
        public BooleanField WeekendOt;
        public BooleanField PublicHolidayOt;
        public BooleanField WeekdayOt;


        public DoubleField OtRateWeekday;
        public DoubleField OtRateWeekend;

        public StringField EmployeeUpdatedName;
        public StringField HrUpdatedName;
        public Int32Field EmployeeUpdated;
        public Int32Field HrUpdated;

        public EnumField<OTApplicationStatus> EmployeeStatus;
        public EnumField<OTApplicationStatus> HrStatus;
        
        public DoubleField OtHourBuffer;

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

        public Int32Field Paid;
        public Int32Field OtMinute;


        public Int32Field Id;
        public Int32Field EmployeeRowId;
        public StringField EmployeeName;
        public Int32Field ApprovedBy;
        public StringField ApproveEmployeeName;


        public Int32Field RejectedBy;
        public StringField RejectedEmployeeName;

        public StringField StartingAt;
        public StringField EndingAt;

        
        public Int32Field OtReasonId;
        public DateTimeField OtDate;
        public Int32Field StartingHour;
        public Int32Field StartingMinute;
        public Int32Field EndingHour;
        public Int32Field EndingMinute;
        public DateTimeField StartingTime;
        public DateTimeField EndingTime;
        public EnumField<OTApplicationStatus> Status;
        public DoubleField OtRate;
        public DoubleField TotalOtPay;
        public DoubleField OtPayBuffer;

        public StringField EmployeeID;

        public StringField OtReason;
        public StringField OTDescription;
    }
}
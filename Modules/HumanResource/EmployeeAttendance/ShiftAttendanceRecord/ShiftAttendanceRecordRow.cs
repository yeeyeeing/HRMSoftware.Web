using HRMSoftware.EmployeeProfile;
using HRMSoftware.EmployeeGroup;
using HRMSoftware.EmployeeGroup.Columns;
using HRMSoftware.Shift;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeAttendance;

[ConnectionKey("Default"), Module("EmployeeAttendance"), TableName("HumanResourcesShiftAttendanceRecord")]
[DisplayName("Shift Attendance Record"), InstanceName("Shift Attendance Record")]
[ReadPermission("Administration:Employee")]
[ModifyPermission("Administration:Employee")]
public sealed class ShiftAttendanceRecordRow : Row<ShiftAttendanceRecordRow.RowFields>, IIdRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Employee ID"), Column("EmployeeRowID"), ForeignKey(typeof(EmployeeProfileRow)), LeftJoin("c"), NameProperty]
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

    [DisplayName("Employee ID"), Expression($"c.EmployeeID"), QuickSearch]
    public string EmployeeID
    {
        get => fields.EmployeeID[this];
        set => fields.EmployeeID[this] = value;
    }
    [DisplayName("Clock In Time"), ShiftTimeToHours, NotNull]
    public DateTime? TimeIn
    {
        get => fields.TimeIn[this];
        set => fields.TimeIn[this] = value;
    }

    [DisplayName("Clock Out Time"), ShiftTimeToHours, NotNull]
    public DateTime? TimeOut
    {
        get => fields.TimeOut[this];
        set => fields.TimeOut[this] = value;
    }

    [DisplayName("Shift Name"), ForeignKey("HumanResourcesShiftPattern", "ID"), LeftJoin("ShiftName")]
    [LookupEditor(typeof(ShiftRow))]
    public int? ShiftId
    {
        get => fields.ShiftId[this];
        set => fields.ShiftId[this] = value;
    }
    [DisplayName("Shift Name")]
    [Expression($"ShiftName.ShiftName")]
    public string ShiftName
    {
        get => fields.ShiftName[this];
        set => fields.ShiftName[this] = value;
    }
    [DisplayName("Late In"),StatusFormatter]
    public int? LateIn
    {
        get => fields.LateIn[this];
        set => fields.LateIn[this] = value;
    }

    [DisplayName("Ot"), Column("OT"), StatusFormatter]
    public int? Ot
    {
        get => fields.Ot[this];
        set => fields.Ot[this] = value;
    }

    [DisplayName("Early Leave"), StatusFormatter]
    public int? EarlyLeave
    {
        get => fields.EarlyLeave[this];
        set => fields.EarlyLeave[this] = value;
    }

    [DisplayName("Time In Row Id")]
    public int? TimeInRowId
    {
        get => fields.TimeInRowId[this];
        set => fields.TimeInRowId[this] = value;
    }

    [DisplayName("Time Out Row Id")]
    public int? TimeOutRowId
    {
        get => fields.TimeOutRowId[this];
        set => fields.TimeOutRowId[this] = value;
    }

    [DisplayName("Shift Date")]
    public DateTime? ShiftDate
    {
        get => fields.ShiftDate[this];
        set => fields.ShiftDate[this] = value;
    }

    [DisplayName("Shift Start Time"), ShiftTimeToHours,NotNull]
    public DateTime? ShiftStartTime
    {
        get => fields.ShiftStartTime[this];
        set => fields.ShiftStartTime[this] = value;
    }
    [DisplayName("Shift End Time"), ShiftTimeToHours, NotNull]
    public DateTime? ShiftEndTime
    {
        get => fields.ShiftEndTime[this];
        set => fields.ShiftEndTime[this] = value;
    }
    [DisplayName("Time"), NotMapped, NotNull]
    public string ShiftStartTimeHour
    {
        get => fields.ShiftStartTimeHour[this];
        set => fields.ShiftStartTimeHour[this] = value;
    }
    [DisplayName("Time"), NotMapped, NotNull]
    public string ShiftEndTimeHour
    {
        get => fields.ShiftEndTimeHour[this];
        set => fields.ShiftEndTimeHour[this] = value;
    }
    [DisplayName("Time"), NotMapped, NotNull]
    public string TimeInHour
    {
        get => fields.TimeInHour[this];
        set => fields.TimeInHour[this] = value;
    }
    [DisplayName("Time"), NotMapped, NotNull]
    public string TimeOutHour
    {
        get => fields.TimeOutHour[this];
        set => fields.TimeOutHour[this] = value;
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
    

    public class RowFields : RowFieldsBase
    {
        public Int32Field Id;
        public Int32Field EmployeeRowId;
        public DateTimeField TimeIn;
        public DateTimeField TimeOut;
        public StringField TimeInHour;
        public StringField TimeOutHour;

        public Int32Field ShiftId;
        public StringField ShiftName;
     




        public Int32Field LateIn;
        public Int32Field Ot;
        public Int32Field EarlyLeave;
        public Int32Field TimeInRowId;
        public Int32Field TimeOutRowId;
        public DateTimeField ShiftDate;
        public DateTimeField ShiftStartTime;
        public DateTimeField ShiftEndTime;
        public StringField ShiftStartTimeHour;
        public StringField ShiftEndTimeHour;




        public StringField EmployeeID;
        public StringField EmployeeName;

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


    }
}
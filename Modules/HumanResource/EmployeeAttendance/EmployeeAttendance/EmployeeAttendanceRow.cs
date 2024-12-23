using HRMSoftware.EmployeeProfile;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeAttendance;

[ConnectionKey("Default"), Module("EmployeeAttendance"), TableName("HumanResourcesAttendance")]
[DisplayName("Attendance Record"), InstanceName("Attendance Record")]
[ReadPermission("*")]
[ModifyPermission("Administration:HumanResources")]
public sealed class EmployeeAttendanceRow : LoggingRow<EmployeeAttendanceRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Time"), NotNull]
    public TimeSpan? AuthenticationTime
    {
        get => fields.AuthenticationTime[this];
        set => fields.AuthenticationTime[this] = value;
    }

    [DisplayName("Authentication Date Time"), NameProperty]
    public DateTime? AuthenticationDateTime
    {
        get => fields.AuthenticationDateTime[this];
        set => fields.AuthenticationDateTime[this] = value;
    }
    [DisplayName("Authentication Second"), Column("AuthenticationSecond"), NotNull]
    public int? AuthenticationSecond
    {
        get => fields.AuthenticationSecond[this];
        set => fields.AuthenticationSecond[this] = value;
    }


    [DisplayName("Date"), NotNull]
    public DateTime? AuthenticationDate
    {
        get => fields.AuthenticationDate[this];
        set => fields.AuthenticationDate[this] = value;
    }

    [DisplayName("Device Name")]
    public string DeviceName
    {
        get => fields.DeviceName[this];
        set => fields.DeviceName[this] = value;
    }

    [DisplayName("Device Serial")]
    public string DeviceSerial
    {
        get => fields.DeviceSerial[this];
        set => fields.DeviceSerial[this] = value;
    }

    [DisplayName("Employee Name")]
    public string PersonName
    {
        get => fields.PersonName[this];
        set => fields.PersonName[this] = value;
    }

    [DisplayName("Card No")]
    public string CardNo
    {
        get => fields.CardNo[this];
        set => fields.CardNo[this] = value;
    }

    [DisplayName("Direction")]
    public string Direction
    {
        get => fields.Direction[this];
        set => fields.Direction[this] = value;
    }

    [DisplayName("Late In")]
    public int? LateIn
    {
        get => fields.LateIn[this];
        set => fields.LateIn[this] = value;
    }

    [DisplayName("Ot"), Column("OT")]
    public int? Ot
    {
        get => fields.Ot[this];
        set => fields.Ot[this] = value;
    }

    [DisplayName("Processed")]
    public int? Processed
    {
        get => fields.Processed[this];
        set => fields.Processed[this] = value;
    }

    [DisplayName("Employee Name"), Expression($"c.EmployeeName"), QuickSearch]
    public string EmployeeName
    {
        get => fields.EmployeeName[this];
        set => fields.EmployeeName[this] = value;
    }

    [DisplayName("Employee ID"), Expression($"c.EmployeeID"), QuickSearch]
    public string EmployeeId
    {
        get => fields.EmployeeId[this];
        set => fields.EmployeeId[this] = value;
    }

    [DisplayName("Early Leave")]
    public int? EarlyLeave
    {
        get => fields.EarlyLeave[this];
        set => fields.EarlyLeave[this] = value;
    }

    [DisplayName("Employee Name"), Column("EmployeeRowID"), ForeignKey("HumanResourcesEmployee", "ID"), LeftJoin("c")]
    [LookupEditor(typeof(EmployeeProfileRow))]
    public int? EmployeeRowID
    {
        get => fields.EmployeeRowID[this];
        set => fields.EmployeeRowID[this] = value;
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
    [LookupEditor(typeof(OrganisationHierarchy.OccupationRow))]
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
    public class RowFields : LoggingRowFields
    {

        public Int32Field DepartmentID;
        public StringField DepartmentName;
        public Int32Field DivisionID;
        public StringField DivisionName;
        public Int32Field OccupationID;
        public StringField OccupationName;
        public Int32Field JobGradeID;
        public StringField JobGradeName;


        public Int32Field Id;
        public TimeSpanField AuthenticationTime;
        public DateTimeField AuthenticationDateTime;
        public DateTimeField AuthenticationDate;
        public StringField DeviceName;
        public StringField DeviceSerial;
        public StringField CardNo;
        public StringField Direction;
        public Int32Field LateIn;
        public Int32Field Ot;
        public Int32Field Processed;
        public StringField EmployeeId;

        public StringField EmployeeName;
        public Int32Field EmployeeRowID;
        public StringField PersonName;

        public Int32Field EarlyLeave;
        public Int32Field AuthenticationSecond;
    }
}
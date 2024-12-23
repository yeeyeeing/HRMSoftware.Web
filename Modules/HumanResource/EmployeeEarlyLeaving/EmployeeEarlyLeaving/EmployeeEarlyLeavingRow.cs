using HRMSoftware.Administration;
using HRMSoftware.EmployeeProfile;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeEarlyLeaving;

[ConnectionKey("Default"), Module("EmployeeEarlyLeaving"), TableName("HumanResourcesEarlyLeaving")]
[DisplayName("Employee Early Leaving"), InstanceName("Employee Early Leaving")]
[ReadPermission(PermissionKeys.HumanResources)]
[ModifyPermission(PermissionKeys.HumanResources)]
[LookupScript("EmployeeEarlyLeaving.EmployeeEarlyLeaving", Permission = "*")]
public sealed class EmployeeEarlyLeavingRow : Row<EmployeeEarlyLeavingRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    const string jEmployeeName = nameof(jEmployeeName);
    [DisplayName("Employee Name"), Column("EmployeeRowID"), ForeignKey(typeof(EmployeeProfileRow)), LeftJoin("c")]
    [LookupEditor(typeof(EmployeeProfileRow))]
    public int? EmployeeRowId
    {
        get => fields.EmployeeRowId[this];
        set => fields.EmployeeRowId[this] = value;
    }

    [DisplayName("Date")]
    public DateTime? Date
    {
        get => fields.Date[this];
        set => fields.Date[this] = value;
    }

    [DisplayName("Early Mins")]
    public int? EarlyMins
    {
        get => fields.EarlyMins[this];
        set => fields.EarlyMins[this] = value;
    }
    [DisplayName("Deducted")]
    public int? Deducted
    {
        get => fields.Deducted[this];
        set => fields.Deducted[this] = value;
    }
    
    [DisplayName("Processed"),StatusFormatter]
    public int? Processed
    {
        get => fields.Processed[this];
        set => fields.Processed[this] = value;
    }
    [DisplayName("Employee Id")]
    public string EmployeeId
    {
        get => fields.EmployeeId[this];
        set => fields.EmployeeId[this] = value;
    }

    [DisplayName("Employee Name"), NameProperty]
    public string EmployeeName
    {
        get => fields.EmployeeName[this];
        set => fields.EmployeeName[this] = value;
    }

    [DisplayName("Deductions")]
    public double? Deductions
    {
        get => fields.Deductions[this];
        set => fields.Deductions[this] = value;
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
    public class RowFields : RowFieldsBase
    {

        public Int32Field DepartmentID;
        public StringField DepartmentName;
        public Int32Field DivisionID;
        public StringField DivisionName;
        public Int32Field OccupationID;
        public StringField OccupationName;
        public Int32Field JobGradeID;
        public StringField JobGradeName;



        public StringField EmployeeId;
        public StringField EmployeeName;
        public Int32Field Deducted;
        public DoubleField Deductions;

        public Int32Field Id;
        public Int32Field EmployeeRowId;
        public DateTimeField Date;
        public Int32Field EarlyMins;
        public Int32Field Processed;

    }
}
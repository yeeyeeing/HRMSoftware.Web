using HRMSoftware.EmployeeProfile;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.EntitledLeave;

[ConnectionKey("Default"), Module("EntitledLeave"), TableName("HumanResourcesEntitledLeave")]
[DisplayName("Entitled Leave"), InstanceName("Entitled Leave")]
[ReadPermission("*")]
[ModifyPermission("Administration:HumanResources")]
public sealed class EntitledLeaveRow : LoggingRow<EntitledLeaveRow.RowFields>, IIdRow, INameRow
{
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




    [DisplayName("Employee Name"), Expression($"c.EmployeeName")]
    public string EmployeeName
    {
        get => fields.EmployeeName[this];
        set => fields.EmployeeName[this] = value;
    }


    [DisplayName("Employee ID"), Expression($"c.EmployeeID")]
    public string EmployeeID
    {
        get => fields.EmployeeID[this];
        set => fields.EmployeeID[this] = value;
    }

    [DisplayName("Current Policy End Date")]
    public DateTime? CurrentPolicyEndDate
    {
        get => fields.CurrentPolicyEndDate[this];
        set => fields.CurrentPolicyEndDate[this] = value;
    }



    [DisplayName("Hospitalisation")]
    public int? EntitledHospitalisationLeave
    {
        get => fields.EntitledHospitalisationLeave[this];
        set => fields.EntitledHospitalisationLeave[this] = value;
    }

    [DisplayName("Marriage")]
    public int? EntitledMarriageLeave
    {
        get => fields.EntitledMarriageLeave[this];
        set => fields.EntitledMarriageLeave[this] = value;
    }

    [DisplayName("Maternity")]
    public int? EntitledMaternityLeave
    {
        get => fields.EntitledMaternityLeave[this];
        set => fields.EntitledMaternityLeave[this] = value;
    }

    [DisplayName("Paternity")]
    public int? EntitledPaternityLeave
    {
        get => fields.EntitledPaternityLeave[this];
        set => fields.EntitledPaternityLeave[this] = value;
    }

    [DisplayName("Sick")]
    public int? EntitledSickLeave
    {
        get => fields.EntitledSickLeave[this];
        set => fields.EntitledSickLeave[this] = value;
    }


    [DisplayName("Bring Forward")]
    public int? BringForward
    {
        get => fields.BringForward[this];
        set => fields.BringForward[this] = value;
    }


    [DisplayName("Compassionate")]
    public int? EntitledCompassionateLeave
    {
        get => fields.EntitledCompassionateLeave[this];
        set => fields.EntitledCompassionateLeave[this] = value;
    }


    [DisplayName("Annual"), Size(10), QuickSearch, NameProperty]
    public double? EntitledAnnualLeave
    {
        get => fields.EntitledAnnualLeave[this];
        set => fields.EntitledAnnualLeave[this] = value;
    }


    [DisplayName("Next Entitlement Date")]
    public DateTime? NextEntitlementDate
    {
        get => fields.NextEntitlementDate[this];
        set => fields.NextEntitlementDate[this] = value;
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
        public Int32Field BringForward;

        public Int32Field EmployeeRowId;
        public StringField EmployeeName;
        public StringField EmployeeID;

        
        public DateTimeField CurrentPolicyEndDate;
        public Int32Field EntitledHospitalisationLeave;
        public Int32Field EntitledMarriageLeave;
        public Int32Field EntitledMaternityLeave;
        public Int32Field EntitledPaternityLeave;
        public Int32Field EntitledSickLeave;
        public DoubleField EntitledAnnualLeave;
        public DateTimeField NextEntitlementDate;
        public Int32Field EntitledCompassionateLeave; 


    }
}
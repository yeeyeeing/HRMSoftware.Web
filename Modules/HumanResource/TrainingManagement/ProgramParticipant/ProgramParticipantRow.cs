using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;
using HRMSoftware.Administration;
using HRMSoftware.EmployeeProfile;
using JetBrains.Annotations;

namespace HRMSoftware.TrainingManagement;

[ConnectionKey("Default"), Module("TrainingManagement"), TableName("TrainingManagementProgramParticipant")]
[DisplayName("Program Participant"), InstanceName("Program Participant")]
[ReadPermission("*")]
[ModifyPermission("*")]
[LookupScript("TrainingManagement.ProgramParticipant", Permission = "*")]

public sealed class ProgramParticipantRow : LoggingRow<ProgramParticipantRow.RowFields>, IIdRow
{
    const string jEmployee = nameof(jEmployee);
    
    [DisplayName("Id"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Program Id"), Serenity.Data.Mapping.NotNull]
    public int? ProgramId
    {
        get => fields.ProgramId[this];
        set => fields.ProgramId[this] = value;
    }

    [DisplayName("Employee Row Id"), Serenity.Data.Mapping.NotNull, ForeignKey(typeof(EmployeeProfileRow)), LeftJoin(jEmployee)]
    [LookupEditor(typeof(EmployeeProfileRow))]
    public int? EmployeeRowId
    {
        get => fields.EmployeeRowId[this];
        set => fields.EmployeeRowId[this] = value;
    }
    
    [DisplayName("Employee Name"), Origin(jEmployee, nameof(EmployeeProfileRow.EmployeeName))]
    public string EmployeeName
    {
        get => fields.EmployeeName[this];
        set => fields.EmployeeName[this] = value;
    }
    
    [DisplayName("Employee Id"), Origin(jEmployee,  nameof(EmployeeProfileRow.EmployeeID))]
    public string EmployeeId
    {
        get => fields.EmployeeId[this];
        set => fields.EmployeeId[this] = value;
    }

    [DisplayName("Trainee")]
    public bool? Trainee
    {
        get => fields.Trainee[this];
        set => fields.Trainee[this] = value;
    }
    
    [DisplayName("Staff")]
    public bool? Staff
    {
        get => fields.Staff[this];
        set => fields.Staff[this] = value;
    }
    
    [DisplayName("Extra Field1"), NotMapped]
    public string ExtraField1
    {
        get => fields.ExtraField1[this];
        set => fields.ExtraField1[this] = value;
    }
    
    [DisplayName("Extra Field2"), NotMapped]
    public string ExtraField2
    {
        get => fields.ExtraField2[this];
        set => fields.ExtraField2[this] = value;
    }
    
    [DisplayName("Extra Field3"), NotMapped]
    public string ExtraField3
    {
        get => fields.ExtraField3[this];
        set => fields.ExtraField3[this] = value;
    }
    
    [DisplayName("Extra Field4"), NotMapped]
    public string ExtraField4
    {
        get => fields.ExtraField4[this];
        set => fields.ExtraField4[this] = value;
    }
    
    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public Int32Field ProgramId;
        public Int32Field EmployeeRowId;
        public StringField EmployeeId;
        public StringField EmployeeName;
        public BooleanField Trainee;
        public BooleanField Staff;
        public StringField ExtraField1;
        public StringField ExtraField2;
        public StringField ExtraField3;
        public StringField ExtraField4;
        
    }
}
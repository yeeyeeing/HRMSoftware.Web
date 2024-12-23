using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;
using HRMSoftware.Administration;

namespace HRMSoftware.TrainingManagement;

[ConnectionKey("Default"), Module("TrainingManagement"), TableName("TrainingManagementProgramDepartment")]
[DisplayName("Program Department"), InstanceName("Program Department")]
[ReadPermission("*")]
[ModifyPermission("*")]
public sealed class ProgramDepartmentRow : LoggingRow<ProgramDepartmentRow.RowFields>, IIdRow
{
    [DisplayName("Id"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Master Program Id")]
    public int? MasterProgramId
    {
        get => fields.MasterProgramId[this];
        set => fields.MasterProgramId[this] = value;
    }
    
    [DisplayName("Program Id")]
    public int? ProgramId
    {
        get => fields.ProgramId[this];
        set => fields.ProgramId[this] = value;
    }

    [DisplayName("Department Id"), NotNull]
    public int? DepartmentId
    {
        get => fields.DepartmentId[this];
        set => fields.DepartmentId[this] = value;
    }

    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public Int32Field MasterProgramId;
        public Int32Field ProgramId;
        public Int32Field DepartmentId;
    }
}
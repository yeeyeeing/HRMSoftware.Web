using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeGroup;

[ConnectionKey("Default"), Module("EmployeeGroup"), TableName("HumanResourcesEmployeeGroupEmployeeRowID")]
[DisplayName("Employee Groupings"), InstanceName("Employee Groupings")]
[ReadPermission("*")]
[ModifyPermission("Administration:HumanResources")]
public sealed class EmployeeGroupingsRow : LoggingRow<EmployeeGroupingsRow.RowFields>, IIdRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Employee Row Id"), Column("EmployeeRowID")]
    public int? EmployeeRowId
    {
        get => fields.EmployeeRowId[this];
        set => fields.EmployeeRowId[this] = value;
    }

    [DisplayName("Employee Group Id"), Column("EmployeeGroupID")]
    public int? EmployeeGroupId
    {
        get => fields.EmployeeGroupId[this];
        set => fields.EmployeeGroupId[this] = value;
    }
    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public Int32Field EmployeeRowId;
        public Int32Field EmployeeGroupId;
    }
}
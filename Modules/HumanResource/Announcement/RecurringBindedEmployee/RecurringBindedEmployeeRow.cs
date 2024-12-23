using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System.ComponentModel;

namespace HRMSoftware.Announcement;

[ConnectionKey("Default"), Module("Announcement"), TableName("HumanResourcesAnnouncementBindedEmployee")]
[DisplayName("Recurring Binded Employee"), InstanceName("Recurring Binded Employee")]
[ReadPermission("Administration:HumanResources")]
[ModifyPermission("Administration:HumanResources")]
public sealed class RecurringBindedEmployeeRow : Row<RecurringBindedEmployeeRow.RowFields>, IIdRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Employee Row Id")]
    public int? EmployeeRowId
    {
        get => fields.EmployeeRowId[this];
        set => fields.EmployeeRowId[this] = value;
    }

    [DisplayName("Recurring Id")]
    public int? RecurringId
    {
        get => fields.RecurringId[this];
        set => fields.RecurringId[this] = value;
    }
    
    public class RowFields : RowFieldsBase
    {
        public Int32Field Id;
        public Int32Field EmployeeRowId;
        public Int32Field RecurringId;

    }
}
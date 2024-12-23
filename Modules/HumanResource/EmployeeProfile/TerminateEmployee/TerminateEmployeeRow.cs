using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeProfile;

[ConnectionKey("Default"), Module("EmployeeProfile"), TableName("HumanResourcesEmployee")]
[DisplayName("Terminate Employee"), InstanceName("Terminate Employee")]
[ReadPermission("*")]
[ModifyPermission("*")]
public sealed class TerminateEmployeeRow : Row<TerminateEmployeeRow.RowFields>, IIdRow
{

    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Notice Period")]
    public int? NoticePeriod
    {
        get => fields.NoticePeriod[this];
        set => fields.NoticePeriod[this] = value;
    }
    [DisplayName("Terminate Date")]
    public DateTime? TerminateDate
    {
        get => fields.TerminateDate[this];
        set => fields.TerminateDate[this] = value;
    }


    [DisplayName("Terminate Leave Date")]
    public DateTime? TerminateLeaveDate
    {
        get => fields.TerminateLeaveDate[this];
        set => fields.TerminateLeaveDate[this] = value;
    }

    public class RowFields : RowFieldsBase
    {
        public Int32Field Id;
        public DateTimeField TerminateDate;
        public DateTimeField TerminateLeaveDate;
        public Int32Field NoticePeriod;
        
    }
}
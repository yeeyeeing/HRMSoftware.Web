using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeProfile;

[ConnectionKey("Default"), Module("EmployeeProfile"), TableName("HumanResourcesEmployee")]
[DisplayName("Employee Resign"), InstanceName("Employee Resign")]
[ReadPermission("*")]
[ModifyPermission("*")]
public sealed class EmployeeResignRow : Row<EmployeeResignRow.RowFields>, IIdRow
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
    [DisplayName("Resign Date")]
    public DateTime? ResignationDate
    {
        get => fields.ResignationDate[this];
        set => fields.ResignationDate[this] = value;
    }


    [DisplayName("Resign Leave Date")]
    public DateTime? ResignLeaveDate
    {
        get => fields.ResignLeaveDate[this];
        set => fields.ResignLeaveDate[this] = value;
    }
    public class RowFields : RowFieldsBase
    {
        public Int32Field Id;
        public DateTimeField ResignationDate;
        public DateTimeField ResignLeaveDate;
        public Int32Field NoticePeriod;

    }
}
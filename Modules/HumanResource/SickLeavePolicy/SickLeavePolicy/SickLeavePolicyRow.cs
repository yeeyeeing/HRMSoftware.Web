using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.SickLeavePolicy;

[ConnectionKey("Default"), Module("SickLeavePolicy"), TableName("HumanResourcesSickLeavePolicy")]
[DisplayName("Sick Leave Policy"), InstanceName("Sick Leave Policy")]
[ReadPermission("*")]
[ModifyPermission("*")]
[DataAuditLog]
public sealed class SickLeavePolicyRow : LoggingRow<SickLeavePolicyRow.RowFields>, IIdRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Year")]
    public int? Year
    {
        get => fields.Year[this];
        set => fields.Year[this] = value;
    }

    [DisplayName("Service From Year"),NotNull]
    public int? ServiceFromYear
    {
        get => fields.ServiceFromYear[this];
        set => fields.ServiceFromYear[this] = value;
    }

    [DisplayName("Service Until Year"), NotNull]
    public int? ServiceUntilYear
    {
        get => fields.ServiceUntilYear[this];
        set => fields.ServiceUntilYear[this] = value;
    }

    [DisplayName("Eligible Days"), NotNull]
    public int? EligibleDays
    {
        get => fields.EligibleDays[this];
        set => fields.EligibleDays[this] = value;
    }

  
    [DisplayName("Policy Row")]
    public int? PolicyRow
    {
        get => fields.PolicyRow[this];
        set => fields.PolicyRow[this] = value;
    }
    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public Int32Field Year;
        public Int32Field ServiceFromYear;
        public Int32Field ServiceUntilYear;
        public Int32Field EligibleDays;
        public Int32Field PolicyRow;

    }
}
using HRMSoftware.InitYear;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using Serenity.Extensions.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace HRMSoftware.AnnualLeavePolicy;

[ConnectionKey("Default"), Module("AnnualLeavePolicy"), TableName("HumanResourcesAnnualLeavePolicy")]
[DisplayName("Annual Leave Policy"), InstanceName("Annual Leave Policy")]
[ReadPermission("*")]
[ModifyPermission("*")]
[InsertPermission("*")]
[DeletePermission("*")]
[UpdatePermission("*")]

[DataAuditLog]
public sealed class AnnualLeavePolicyRow : LoggingRow<AnnualLeavePolicyRow.RowFields>, IIdRow, INameRow
{
    const string jEligibleDays = nameof(jEligibleDays);
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Year"), ForeignKey(typeof(InitYearRow)), LeftJoin(jEligibleDays), Updatable(false), NameProperty]
    public int? Year
    {
        get => fields.Year[this];
        set => fields.Year[this] = value;
    }

    [DisplayName("Service From Year"), NotNull]
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

  

    [DisplayName("Maximum Accumulated"), NotNull]
    public int? MaximumAccumulated
    {
        get => fields.MaximumAccumulated[this];
        set => fields.MaximumAccumulated[this] = value;
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
        public Int32Field MaximumAccumulated;
        public Int32Field PolicyRow;

    }
}
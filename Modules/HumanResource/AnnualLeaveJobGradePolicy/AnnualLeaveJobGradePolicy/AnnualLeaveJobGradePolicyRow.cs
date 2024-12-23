using HRMSoftware.OrganisationHierarchy;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.AnnualLeaveJobGradePolicy;

[ConnectionKey("Default"), Module("AnnualLeaveJobGradePolicy"), TableName("HumanResourcesAnnualLeaveBasedOnJobGrade")]
[DisplayName("Annual Leave Job Grade Policy"), InstanceName("Annual Leave Job Grade Policy")]
[ReadPermission("Administration:HumanResources")]
[ModifyPermission("Administration:HumanResources")]
public sealed class AnnualLeaveJobGradePolicyRow : LoggingRow<AnnualLeaveJobGradePolicyRow.RowFields>, IIdRow
{
    const string jJobGrade = nameof(jJobGrade);

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



    [DisplayName("Job Grade"), ForeignKey("HumanResourcesJobGrade", "ID"), LeftJoin(jJobGrade), TextualField(nameof(JobGradeName))]
    [LookupEditor(typeof(OrganisationHierarchy.JobGradeRow), Async = true)]
    public int? JobGradeLevel
    {
        get => fields.JobGradeLevel[this];
        set => fields.JobGradeLevel[this] = value;
    }

    [DisplayName("Eligible Days"), NotNull]
    public int? EligibleDays
    {
        get => fields.EligibleDays[this];
        set => fields.EligibleDays[this] = value;
    }

    [DisplayName("Maximum Accumulated"),NotNull]
    public int? MaximumAccumulated
    {
        get => fields.MaximumAccumulated[this];
        set => fields.MaximumAccumulated[this] = value;
    }

    [DisplayName("Company Setting Id")]
    public int? CompanySettingID
    {
        get => fields.CompanySettingID[this];
        set => fields.CompanySettingID[this] = value;
    }

    [DisplayName("Job Grade"), Expression($"{jJobGrade}.[Name]")]
    public string JobGradeName
    {
        get => fields.JobGradeName[this];
        set => fields.JobGradeName[this] = value;
    }


    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public Int32Field Year;
        public Int32Field JobGradeLevel;
        public Int32Field EligibleDays;
        public Int32Field MaximumAccumulated;
        public Int32Field CompanySettingID;
        public StringField JobGradeName;

    }
}
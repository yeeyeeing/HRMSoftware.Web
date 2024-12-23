using HRMSoftware.OrganisationHierarchy;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.OTJobGradeTime;

[ConnectionKey("Default"), Module("OTJobGradeTime"), TableName("HumanResourcesOTJobGradeTime")]
[DisplayName("Ot Job Grade Time"), InstanceName("Ot Job Grade Time")]
[ReadPermission("Administration:HumanResources")]
[ModifyPermission("Administration:HumanResources")]
public sealed class OTJobGradeTimeRow : LoggingRow<OTJobGradeTimeRow.RowFields>, IIdRow
{
    const string jJobGrade = nameof(jJobGrade);

    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Job Grade"), ForeignKey("HumanResourcesJobGrade", "ID"), LeftJoin(jJobGrade), TextualField(nameof(JobGradeName))]
    [LookupEditor(typeof(JobGradeRow), Async = true)]
    public int? JobGradeId
    {
        get => fields.JobGradeId[this];
        set => fields.JobGradeId[this] = value;
    }

 


    [DisplayName("Company Setting Id"), Column("CompanySettingID")]
    public int? CompanySettingId
    {
        get => fields.CompanySettingId[this];
        set => fields.CompanySettingId[this] = value;
    }

    [DisplayName("Maximum Time(Minutes)"), Column("OTMaximumMinutes")]
    public int? OTMaximumMinutes
    {
        get => fields.OTMaximumMinutes[this];
        set => fields.OTMaximumMinutes[this] = value;
    }

  
    [DisplayName("Job Grade Name"), Expression($"{jJobGrade}.[Name]")]
    public string JobGradeName
    {
        get => fields.JobGradeName[this];
        set => fields.JobGradeName[this] = value;
    }

    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public Int32Field JobGradeId;
        public Int32Field CompanySettingId;
        public Int32Field OTMaximumMinutes;

        
        public StringField JobGradeName;
    }
}
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System.ComponentModel;

namespace HRMSoftware.OrganisationChart;

[ConnectionKey("Default"), Module("OrganisationChart"), TableName("HumanResourcesEmployeeAdminRights")]
[DisplayName("Employee Rights"), InstanceName("Employee Rights")]
[ReadPermission("Administration:HumanResources")]
[ModifyPermission("Administration:HumanResources")]
public sealed class EmployeeRightsRow : Row<EmployeeRightsRow.RowFields>, IIdRow
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

    [DisplayName("Appraisal")]
    public bool? Appraisal
    {
        get => fields.Appraisal[this];
        set => fields.Appraisal[this] = value;
    }

    [DisplayName("Leave Approval")]
    public bool? LeaveApproval
    {
        get => fields.LeaveApproval[this];
        set => fields.LeaveApproval[this] = value;
    }

    [DisplayName("Ot Approval")]
    public bool? OtApproval
    {
        get => fields.OtApproval[this];
        set => fields.OtApproval[this] = value;
    }

    [DisplayName("Money Claiming")]
    public bool? MoneyClaiming
    {
        get => fields.MoneyClaiming[this];
        set => fields.MoneyClaiming[this] = value;
    }

    [DisplayName("Training")]
    public bool? Training
    {
        get => fields.Training[this];
        set => fields.Training[this] = value;
    }
    public string NodeId
    {
        get => fields.NodeId[this];
        set => fields.NodeId[this] = value;
    }
    public class RowFields : RowFieldsBase
    {
        public Int32Field Id;
        public Int32Field EmployeeRowId;
        public BooleanField Appraisal;
        public BooleanField LeaveApproval;
        public BooleanField OtApproval;
        public BooleanField MoneyClaiming;
        public BooleanField Training;
        public StringField NodeId;

    }
}
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeProfile;

[ConnectionKey("Default"), Module("EmployeeProfile"), TableName("HumanResourcesMasterAllowance")]
[DisplayName("Master Allowance"), InstanceName("Master Allowance")]
[ReadPermission("Administration:HumanResources")]
[ModifyPermission("Administration:HumanResources")]
[LookupScript("MasterAllowance.MasterAllowance", Permission = "*")]
public sealed class MasterAllowanceRow : LoggingRow<MasterAllowanceRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Allowance Code"), QuickSearch, NameProperty]
    public string AllowanceCode
    {
        get => fields.AllowanceCode[this];
        set => fields.AllowanceCode[this] = value;
    }

    [DisplayName("Amount")]
    public double? Amount
    {
        get => fields.Amount[this];
        set => fields.Amount[this] = value;
    }

    [DisplayName("Eis")]
    [BooleanEditor, StatusFormatter]
    public bool? SubjectionEis
    {
        get => fields.SubjectionEis[this];
        set => fields.SubjectionEis[this] = value;
    }

    [DisplayName("Epf")]
    [BooleanEditor, StatusFormatter]
    public bool? SubjectionEpf
    {
        get => fields.SubjectionEpf[this];
        set => fields.SubjectionEpf[this] = value;
    }

    [DisplayName("Socso")]
    [BooleanEditor, StatusFormatter]
    public bool? SubjectionSocso
    {
        get => fields.SubjectionSocso[this];
        set => fields.SubjectionSocso[this] = value;
    }

    [DisplayName("Pcb")]
    [BooleanEditor, StatusFormatter]
    public bool? SubjectionPcb
    {
        get => fields.SubjectionPcb[this];
        set => fields.SubjectionPcb[this] = value;
    }

    [DisplayName("Hrdf")]
    [BooleanEditor, StatusFormatter]
    public bool? SubjectionHrdf
    {
        get => fields.SubjectionHrdf[this];
        set => fields.SubjectionHrdf[this] = value;
    }

    [DisplayName("Ot")]
    [BooleanEditor, StatusFormatter]
    public bool? SubjectionOt
    {
        get => fields.SubjectionOt[this];
        set => fields.SubjectionOt[this] = value;
    }

    [DisplayName("Description")]
    public string Description
    {
        get => fields.Description[this];
        set => fields.Description[this] = value;
    }


    [DisplayName("Allowance Subjections")]
    [BooleanEditor, StatusFormatter]
    public bool? AllowanceSubjections
    {
        get => fields.AllowanceSubjections[this];
        set => fields.AllowanceSubjections[this] = value;
    }

    [DisplayName("Full Attendance")]
    [BooleanEditor, StatusFormatter]
    public bool? FullAttendance
    {
        get => fields.FullAttendance[this];
        set => fields.FullAttendance[this] = value;
    }

    [DisplayName("Recurring")]
    [BooleanEditor, StatusFormatter]
    public bool? Recurring
    {
        get => fields.Recurring[this];
        set => fields.Recurring[this] = value;
    }

    [DisplayName("One Time")]
    [BooleanEditor, StatusFormatter]
    public bool? OneTime
    {
        get => fields.OneTime[this];
        set => fields.OneTime[this] = value;
    }

    

    [DisplayName("No Late")]
    [BooleanEditor, StatusFormatter]
    public bool? NoLate
    {
        get => fields.NoLate[this];
        set => fields.NoLate[this] = value;
    }

    [DisplayName("No Absence")]
    [BooleanEditor, StatusFormatter]
    public bool? NoAbsence
    {
        get => fields.NoAbsence[this];
        set => fields.NoAbsence[this] = value;
    }

    [DisplayName("No Early Leaving")]
    [BooleanEditor, StatusFormatter]
    public bool? NoEarlyLeaving
    {
        get => fields.NoEarlyLeaving[this];
        set => fields.NoEarlyLeaving[this] = value;
    }

    [DisplayName("Exempt Unpaid Leave")]
    [BooleanEditor, StatusFormatter]
    public bool? ExemptUnpaidLeave
    {
        get => fields.ExemptUnpaidLeave[this];
        set => fields.ExemptUnpaidLeave[this] = value;
    }

    [DisplayName("Exempt Hospitalisation Leave")]
    [BooleanEditor, StatusFormatter]
    public bool? ExemptHospitalisationLeave
    {
        get => fields.ExemptHospitalisationLeave[this];
        set => fields.ExemptHospitalisationLeave[this] = value;
    }

    [DisplayName("Exempt Sick Leave")]
    [BooleanEditor, StatusFormatter]
    public bool? ExemptSickLeave
    {
        get => fields.ExemptSickLeave[this];
        set => fields.ExemptSickLeave[this] = value;
    }

    [DisplayName("Exempt Annual Leave")]
    [BooleanEditor, StatusFormatter]
    public bool? ExemptAnnualLeave
    {
        get => fields.ExemptAnnualLeave[this];
        set => fields.ExemptAnnualLeave[this] = value;
    }

    [DisplayName("Exempt Maternity Leave")]
    [BooleanEditor, StatusFormatter]
    public bool? ExemptMaternityLeave
    {
        get => fields.ExemptMaternityLeave[this];
        set => fields.ExemptMaternityLeave[this] = value;
    }

    [DisplayName("Exempt Paternity Leave")]
    [BooleanEditor, StatusFormatter]
    public bool? ExemptPaternityLeave
    {
        get => fields.ExemptPaternityLeave[this];
        set => fields.ExemptPaternityLeave[this] = value;
    }

    [DisplayName("Exempt Marriage Leave")]
    [BooleanEditor, StatusFormatter]
    public bool? ExemptMarriageLeave
    {
        get => fields.ExemptMarriageLeave[this];
        set => fields.ExemptMarriageLeave[this] = value;
    }

    [DisplayName("Exempt Compassionate Leave")]
    [BooleanEditor, StatusFormatter]
    public bool? ExemptCompassionateLeave
    {
        get => fields.ExemptCompassionateLeave[this];
        set => fields.ExemptCompassionateLeave[this] = value;
    }

    [DisplayName("Exempt Emergency Leave")]
    [BooleanEditor, StatusFormatter]
    public bool? ExemptEmergencyLeave
    {
        get => fields.ExemptEmergencyLeave[this];
        set => fields.ExemptEmergencyLeave[this] = value;
    }

    [DisplayName("Exempt Gatepass Leave")]
    [BooleanEditor, StatusFormatter]
    public bool? ExemptGatepassLeave
    {
        get => fields.ExemptGatepassLeave[this];
        set => fields.ExemptGatepassLeave[this] = value;
    }


    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public StringField AllowanceCode;
        public DoubleField Amount;
        public BooleanField SubjectionEis;
        public BooleanField SubjectionEpf;
        public BooleanField SubjectionSocso;
        public BooleanField SubjectionPcb;
        public BooleanField SubjectionHrdf;
        public BooleanField SubjectionOt;
        public StringField Description;
        public BooleanField AllowanceSubjections;
        public BooleanField FullAttendance;
        public BooleanField Recurring;
        public BooleanField OneTime;
        public BooleanField NoLate;
        public BooleanField NoAbsence;
        public BooleanField NoEarlyLeaving;
        public BooleanField ExemptUnpaidLeave;
        public BooleanField ExemptHospitalisationLeave;
        public BooleanField ExemptSickLeave;
        public BooleanField ExemptAnnualLeave;
        public BooleanField ExemptMaternityLeave;
        public BooleanField ExemptPaternityLeave;
        public BooleanField ExemptMarriageLeave;
        public BooleanField ExemptCompassionateLeave;
        public BooleanField ExemptEmergencyLeave;
        public BooleanField ExemptGatepassLeave;

    }
}
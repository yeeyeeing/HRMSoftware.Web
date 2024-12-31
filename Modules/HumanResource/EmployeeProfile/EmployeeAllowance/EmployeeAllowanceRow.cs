using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeProfile;

[ConnectionKey("Default"), Module("EmployeeProfile"), TableName("HumanResourcesEmployeeAllowance")]
[DisplayName("Employee Allowance"), InstanceName("Employee Allowance")]
[ReadPermission("*")]
[ModifyPermission("*")]
[LookupScript("EmployeeAllowance.EmployeeAllowance", Permission = "*")]
public sealed class EmployeeAllowanceRow : LoggingRow<EmployeeAllowanceRow.RowFields>, IIdRow, INameRow
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

    [DisplayName("Description"), QuickSearch, NameProperty, NotNull]
    public string Description
    {
        get => fields.Description[this];
        set => fields.Description[this] = value;
    }

    [DisplayName("Effective Until")]
    public DateTime? EffectiveUntil
    {
        get => fields.EffectiveUntil[this];
        set => fields.EffectiveUntil[this] = value;
    }
    const string jRace = nameof(jRace);

    [DisplayName("Allowance Code"), Column("MasterAllowanceId"), ForeignKey("HumanResourcesMasterAllowance", "ID"), LeftJoin(jRace), TextualField(nameof(Race)), NotNull]
    [LookupEditor("MasterAllowance.MasterAllowance")]
    public int? MasterAllowanceId
    {
        get => fields.MasterAllowanceId[this];
        set => fields.MasterAllowanceId[this] = value;
    }

    public string AllowanceCode
    {
        get => fields.AllowanceCode[this];
        set => fields.AllowanceCode[this] = value;
    }

    [DisplayName("Amount"), NotNull]
    public double? Amount
    {
        get => fields.Amount[this];
        set => fields.Amount[this] = value;
    }

    [DisplayName("Eis"), Column("SubjectionEIS")]
    [BooleanEditor, StatusFormatter]
    public bool? SubjectionEis
    {
        get => fields.SubjectionEis[this];
        set => fields.SubjectionEis[this] = value;
    }

    [DisplayName("Epf"), Column("SubjectionEPF")]
    [BooleanEditor, StatusFormatter]
    public bool? SubjectionEpf
    {
        get => fields.SubjectionEpf[this];
        set => fields.SubjectionEpf[this] = value;
    }

    [DisplayName("Hrdf"), Column("SubjectionHRDF")]
    [BooleanEditor, StatusFormatter]
    public bool? SubjectionHrdf
    {
        get => fields.SubjectionHrdf[this];
        set => fields.SubjectionHrdf[this] = value;
    }

    [DisplayName("Pcb"), Column("SubjectionPCB")]
    [BooleanEditor, StatusFormatter]
    public bool? SubjectionPcb
    {
        get => fields.SubjectionPcb[this];
        set => fields.SubjectionPcb[this] = value;
    }

    [DisplayName("Socso"), Column("SubjectionSOCSO")]
    [BooleanEditor, StatusFormatter]
    public bool? SubjectionSocso
    {
        get => fields.SubjectionSocso[this];
        set => fields.SubjectionSocso[this] = value;
    }
    [DisplayName("OT"), Column("SubjectionOt")]
    [BooleanEditor, StatusFormatter]
    public bool? SubjectionOt
    {
        get => fields.SubjectionOt[this];
        set => fields.SubjectionOt[this] = value;
    }
    [DisplayName("Effective From"),NotNull]
    public DateTime? EffectiveFrom
    {
        get => fields.EffectiveFrom[this];
        set => fields.EffectiveFrom[this] = value;
    }
    [DisplayName("Full Attendance")]
    [BooleanEditor, StatusFormatter]
    public bool? FullAttendance
    {
        get => fields.FullAttendance[this];
        set => fields.FullAttendance[this] = value;
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


    

    [DisplayName("Allowance Subjections")]
    [BooleanEditor, StatusFormatter]
    public bool? AllowanceSubjections
    {
        get => fields.AllowanceSubjections[this];
        set => fields.AllowanceSubjections[this] = value;
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

    [DisplayName("Paid One Time")]
    [BooleanEditor, StatusFormatter]
    public bool? PaidOneTime
    {
        get => fields.PaidOneTime[this];
        set => fields.PaidOneTime[this] = value;
    }
    [DisplayName("Unpaid Leave")]
    [BooleanEditor, StatusFormatter]
    public bool? ExemptUnpaidLeave
    {
        get => fields.ExemptUnpaidLeave[this];
        set => fields.ExemptUnpaidLeave[this] = value;
    }
    [DisplayName("Hospitalisation Leave")]
    [BooleanEditor, StatusFormatter]
    public bool? ExemptHospitalisationLeave
    {
        get => fields.ExemptHospitalisationLeave[this];
        set => fields.ExemptHospitalisationLeave[this] = value;
    }
    [DisplayName("Sick Leave")]
    [BooleanEditor, StatusFormatter]
    public bool? ExemptSickLeave
    {
        get => fields.ExemptSickLeave[this];
        set => fields.ExemptSickLeave[this] = value;
    }
    [DisplayName("Annual Leave")]
    [BooleanEditor, StatusFormatter]
    public bool? ExemptAnnualLeave
    {
        get => fields.ExemptAnnualLeave[this];
        set => fields.ExemptAnnualLeave[this] = value;
    }
    [DisplayName("Maternity Leave")]
    [BooleanEditor, StatusFormatter]
    public bool? ExemptMaternityLeave
    {
        get => fields.ExemptMaternityLeave[this];
        set => fields.ExemptMaternityLeave[this] = value;
    }
    [DisplayName("Paternity Leave")]
    [BooleanEditor, StatusFormatter]
    public bool? ExemptPaternityLeave
    {
        get => fields.ExemptPaternityLeave[this];
        set => fields.ExemptPaternityLeave[this] = value;
    }
    [DisplayName("Marriage Leave")]
    [BooleanEditor, StatusFormatter]
    public bool? ExemptMarriageLeave
    {
        get => fields.ExemptMarriageLeave[this];
        set => fields.ExemptMarriageLeave[this] = value;
    }
    [DisplayName("Compassionate Leave")]
    [BooleanEditor, StatusFormatter]
    public bool? ExemptCompassionateLeave
    {
        get => fields.ExemptCompassionateLeave[this];
        set => fields.ExemptCompassionateLeave[this] = value;
    }

    [DisplayName("Emergency Leave")]
    [BooleanEditor, StatusFormatter]
    public bool? ExemptEmergencyLeave
    {
        get => fields.ExemptEmergencyLeave[this];
        set => fields.ExemptEmergencyLeave[this] = value;
    }

    [DisplayName("Gatepass Leave")]
    [BooleanEditor, StatusFormatter]
    public bool? ExemptGatepassLeave
    {
        get => fields.ExemptGatepassLeave[this];
        set => fields.ExemptGatepassLeave[this] = value;
    }

    public class RowFields : LoggingRowFields
    {
        public BooleanField ExemptUnpaidLeave;
        public BooleanField ExemptHospitalisationLeave;
        public BooleanField ExemptSickLeave;
        public BooleanField ExemptAnnualLeave;
        public BooleanField ExemptMaternityLeave;
        public BooleanField ExemptPaternityLeave;
        public BooleanField ExemptMarriageLeave;
        public BooleanField ExemptEmergencyLeave;
        public BooleanField ExemptCompassionateLeave;
        public BooleanField ExemptGatepassLeave;


        public BooleanField Recurring;
        public BooleanField PaidOneTime;
        public BooleanField OneTime;
        public BooleanField NoLate;
        public BooleanField NoAbsence;
        public BooleanField NoEarlyLeaving;

        

        public Int32Field Id;
        public Int32Field EmployeeRowId;
        public StringField Description;
        public StringField AllowanceCode;
        public Int32Field MasterAllowanceId;



        public DoubleField Amount;
        public BooleanField SubjectionEis;
        public BooleanField SubjectionEpf;
        public BooleanField SubjectionHrdf;
        public BooleanField SubjectionPcb;
        public BooleanField SubjectionSocso;
        public BooleanField SubjectionOt;

        public DateTimeField EffectiveFrom;
        public DateTimeField EffectiveUntil;

        public BooleanField AllowanceSubjections;
        public BooleanField FullAttendance;

    }
}
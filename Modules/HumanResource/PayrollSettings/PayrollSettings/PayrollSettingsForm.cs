using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.PayrollSettings.Forms;

[FormScript("PayrollSettings.PayrollSettings")]
[BasedOnRow(typeof(PayrollSettingsRow), CheckNames = true)]
public class PayrollSettingsForm
{
    /*
    public DateTime EffectiveFrom { get; set; }
    public DateTime EffectiveUntil { get; set; }
    public DateTime InsertDate { get; set; }
    public DateTime UpdateDate { get; set; }
    public DateTime DeleteDate { get; set; }
    public short IsActive { get; set; }
    public int InsertUserId { get; set; }
    public int UpdateUserId { get; set; }
    public int DeleteUserId { get; set; }
    */
    [Category("Seperation Bonus")]
    [QuarterWidth]
    public bool SeperateBonus { get; set; }
    [QuarterWidth]
    public bool AnnualizedBonus { get; set; }
    [Category("Seperation Incentive")]

    [QuarterWidth]
    public bool SeperateIncentive { get; set; }
    [QuarterWidth]
    public bool AnnualizedIncentive { get; set; }

    //[QuarterWidth]
    //public bool SeperateMoneyClaiming { get; set; }
   // [QuarterWidth]
   // public bool SeperateAllowance { get; set; }
    [Category("Bonus Subjections")]
    public bool BonusSubjectEpf { get; set; }
    public bool BonusSubjectSocso { get; set; }
    public bool BonusSubjectEis { get; set; }
    public bool BonusSubjectHrdf { get; set; }
    public bool BonusSubjectPcb { get; set; }

    [Category("Incentive Subjections")]
    public bool IncentiveSubjectEpf { get; set; }
    public bool IncentiveSubjectSocso { get; set; }
    public bool IncentiveSubjectEis { get; set; }
    public bool IncentiveSubjectHrdf { get; set; }
    public bool IncentiveSubjectPcb { get; set; }


}
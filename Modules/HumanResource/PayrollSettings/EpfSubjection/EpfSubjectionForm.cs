using Serenity.ComponentModel;
using System;

namespace HRMSoftware.PayrollSettings.Forms;

[FormScript("PayrollSettings.EpfSubjection")]
[BasedOnRow(typeof(EpfSubjectionRow), CheckNames = true)]
public class EpfSubjectionForm
{
    [QuarterWidth]
    public int BasicSalary { get; set; }
    [QuarterWidth]
    public int PaymentsForUnutilisedAnnualOrMedicalLeaves { get; set; }

    [QuarterWidth]
    public int Bonuses { get; set; }

    [QuarterWidth]
    public int Allowances { get; set; }

    [QuarterWidth]
    public int Commisions { get; set; }

    [QuarterWidth]
    public int Incentives { get; set; }

    [QuarterWidth]
    public int ArrearsOfWages { get; set; }

    [QuarterWidth]
    public int WagesForMaternityLeave { get; set; }

    [QuarterWidth]
    public int WagesForPaternityLeave { get; set; }

    [QuarterWidth]
    public int WagesForStudyLeave { get; set; }

    [QuarterWidth]
    public int ServiceCharges { get; set; }

    [QuarterWidth]
    public int OvertimePayments { get; set; }

    [QuarterWidth]
    public int Gratuity { get; set; }

    [QuarterWidth]
    public int RetirementBenefits { get; set; }

    [QuarterWidth]
    public int TerminationBenefits { get; set; }

    [QuarterWidth]
    public int TravelAllowances { get; set; }

    [QuarterWidth]
    public int PaymentInLieuOfNoticeOfTerminationOfService { get; set; }

    [QuarterWidth]
    public int DirectorFee { get; set; }

    [QuarterWidth]
    public int Gifts { get; set; }

}
using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.PayrollSettings.Columns;

[ColumnsScript("PayrollSettings.EpfSubjection")]
[BasedOnRow(typeof(EpfSubjectionRow), CheckNames = true)]
public class EpfSubjectionColumns
{

    [EditLink, Width(150)]
    public DateTime EffectiveSince { get; set; }
    [Width(150)]
    public DateTime EffectiveUntil { get; set; }
    /*
    [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight]
    public int Id { get; set; }
    public int BasicSalary { get; set; }
    public int PaymentsForUnutilisedAnnualOrMedicalLeaves { get; set; }
    public int Bonuses { get; set; }
    public int Alowances { get; set; }
    public int Commisions { get; set; }
    public int Incentives { get; set; }
    public int ArrearsOfWages { get; set; }
    public int WagesForMaternityLeave { get; set; }
    public int WagesForPaternityLeave { get; set; }
    public int WagesForStudyLeave { get; set; }
    public int ServiceCharges { get; set; }
    public int OvertimePayments { get; set; }
    public int Gratuity { get; set; }
    public int RetirementBenefits { get; set; }
    public int TerminationBenefits { get; set; }
    public int TravelAllowances { get; set; }
    public int PaymentInLieuOfNoticeOfTerminationOfService { get; set; }
    public int DirectorFee { get; set; }
    public int Gifts { get; set; }
    public int IsActive { get; set; }
    public DateTime InsertDate { get; set; }
    public DateTime UpdateDate { get; set; }
    public DateTime DeleteDate { get; set; }
    public int InsertId { get; set; }
    public int UpdateId { get; set; }
    public int DeleteId { get; set; }
    */
}
using HRMSoftware.EmployeeProfile;
using HRMSoftware.MoneyClaimApplication;
using Serenity.ComponentModel;
using System;
using System.Collections.Generic;

namespace HRMSoftware.PayrollSettings.Forms;

[FormScript("PayrollSettings.TextDownloadingWizardForm")]
[BasedOnRow(typeof(PayrollGeneratingWizardRow), CheckNames = true)]
public class TextDownloadingWizardForm
{
    [OneThirdWidth]
    public int PayMonth { get; set; }
    [OneThirdWidth]
    public int PayYear { get; set; }
    [OneThirdWidth]
    public int TextType { get; set; }


    public DateTime CreditingDate { get; set; }
    public string OrganisationName { get; set; }
    public string OrganisationCode { get; set; }




    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public string ContactPerson { get; set; }
    public int StateCodeId { get; set; }
    public int TextFormatEisSocsoId { get; set; }
    public int TextFormatEpfId { get; set; }
    public int TextFormatAutopayId { get; set; }
    public int TextFormatLhdnId { get; set; }



    [HalfWidth]
    public List<int> OccupationList { get; set; }
    [HalfWidth]
    public List<int> DepartmentList { get; set; }
    [HalfWidth]
    public List<int> DivisionList { get; set; }
    [HalfWidth]
    public List<int> JobGradeList { get; set; }
    [HalfWidth]
    public List<int> SectionList { get; set; }


    public List<int> EmployeeRowListBuffer { get; set; }

    [ThreeQuarterWidth]
    public List<int> EmployeeRowList { get; set; }
    [QuarterWidth]
    public bool All { get; set; }






}
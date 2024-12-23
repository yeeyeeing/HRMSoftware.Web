using Serenity.ComponentModel;
using System;
using System.Collections.Generic;

namespace HRMSoftware.PayrollSettings.Forms;

[FormScript("PayrollSettings.PayrollGeneratingWizard")]
[BasedOnRow(typeof(PayrollGeneratingWizardRow), CheckNames = true)]
public class PayrollGeneratingWizardForm
{
    /*
    public int EmployeeRowId { get; set; }
    public string EmployeeId { get; set; }
    public DateTime PayDate { get; set; }
    public double Deduction { get; set; }
    public double Earnings { get; set; }
    public double Nett { get; set; }
    public string EmployeeName { get; set; }
    public double EmployeeSocso { get; set; }
    public double EmployeeEpf { get; set; }
    public double EmployeeEis { get; set; }
    public string PayrollTable { get; set; }
    public string Remarks { get; set; }
    public double EmployeePcb { get; set; }
    public double EmployerHrdf { get; set; }
    public double EmployerEpf { get; set; }
    public double EmployerEis { get; set; }
    public double EmployerSocso { get; set; }
    public string EmployerTable { get; set; }
    */
    [OneThirdWidth]
    public int PayMonth { get; set; }
    [OneThirdWidth]
    public int PayYear { get; set; }
    [OneThirdWidth]
    public DateTime PayDate { get; set; }

    [HalfWidth]
    public DateTime PayPeriodStart { get; set; }
    [HalfWidth]
    public DateTime PayPeriodEnd { get; set; }
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
    public bool Download { get; set; }

}
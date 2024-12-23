using Serenity.ComponentModel;
using System;
using System.Collections.Generic;

namespace HRMSoftware.PayrollSettings.Forms;

[FormScript("PayrollSettings.PayrollWizard")]
[BasedOnRow(typeof(PayrollWizardRow), CheckNames = true)]
public class PayrollWizardForm
{
  //  public int EmployeeRowId { get; set; }
    //public string EmployeeId { get; set; }
    public string PayMonth { get; set; }
    // public double Deduction { get; set; }
    // public double Earnings { get; set; }
    //public double Nett { get; set; }
    // public string EmployeeName { get; set; }
    // public double EmployeeSocso { get; set; }
    //  public double EmployeeEpf { get; set; }
    //  public double EmployeeEis { get; set; }
    // public string PayrollTable { get; set; }
    //  public string Remarks { get; set; }
    //   public double EmployeePcb { get; set; }
    //  public double EmployerHrdf { get; set; }
    //  public double EmployerEpf { get; set; }
    //  public double EmployerEis { get; set; }
    // public double EmployerSocso { get; set; }
    //  public string EmployerTable { get; set; }
    // public DateTime PayPeriodStart { get; set; }
    // public DateTime PayPeriodEnd { get; set; }

    //public string EmployeeId { get; set; }
    // public ListField<int> EmployeeRowList;
    // public ListField<int> OccupationList;
    //  public ListField<int> DepartmentList;
    //  public ListField<int> DivisionList;
    //  public ListField<int> JobGradeList;
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
    public List<int> EmployeeRowList { get; set; }
    public List<int> EmployeeRowListBuffer { get; set; }

    public string PayslipList { get; set; }

    
    // public List<int> EmployeeRowList { get; set; }

}
using Serenity.ComponentModel;
using System;

namespace HRMSoftware.Master.Forms;

[FormScript("Master.MasterPostcode")]
[BasedOnRow(typeof(MasterPostcodeRow), CheckNames = true)]
public class MasterPostcodeForm
{
    public int MasterCity { get; set; }
    public int MasterState { get; set; }
    public string PostCode { get; set; }
}
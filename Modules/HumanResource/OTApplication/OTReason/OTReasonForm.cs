using Serenity.ComponentModel;
using System;

namespace HRMSoftware.OTApplication.Forms;

[FormScript("OTApplication.OTReason")]
[BasedOnRow(typeof(OTReasonRow), CheckNames = true)]
public class OTReasonForm
{
  
    public string OtReason { get; set; }
    public string Description { get; set; }
}
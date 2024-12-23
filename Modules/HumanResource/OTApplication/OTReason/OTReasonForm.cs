using Serenity.ComponentModel;
using System;

namespace HRMSoftware.OTApplication.Forms;

[FormScript("OTApplication.OTReason")]
[BasedOnRow(typeof(OTReasonRow), CheckNames = true)]
public class OTReasonForm
{
    public DateTime InsertDate { get; set; }
    public DateTime UpdateDate { get; set; }
    public DateTime DeleteDate { get; set; }
    public int IsActive { get; set; }
    public int InsertUserId { get; set; }
    public int DeleteUserId { get; set; }
    public int UpdateUserId { get; set; }
    public string OtReason { get; set; }
    public string Description { get; set; }
}
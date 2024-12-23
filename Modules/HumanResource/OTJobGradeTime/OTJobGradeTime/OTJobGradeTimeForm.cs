using Serenity.ComponentModel;
using System;

namespace HRMSoftware.OTJobGradeTime.Forms;

[FormScript("OTJobGradeTime.OTJobGradeTime")]
[BasedOnRow(typeof(OTJobGradeTimeRow), CheckNames = true)]
public class OTJobGradeTimeForm
{
    public int JobGradeId { get; set; }
    public int OTMaximumMinutes { get; set; }


}
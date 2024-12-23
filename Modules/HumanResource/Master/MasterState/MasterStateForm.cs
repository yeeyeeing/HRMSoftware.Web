using Serenity.ComponentModel;
using System;

namespace HRMSoftware.Master.Forms;

[FormScript("Master.MasterState")]
[BasedOnRow(typeof(MasterStateRow), CheckNames = true)]
public class MasterStateForm
{
    public string Name { get; set; }
}
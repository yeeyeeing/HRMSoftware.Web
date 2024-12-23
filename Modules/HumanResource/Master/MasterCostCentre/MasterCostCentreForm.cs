using Serenity.ComponentModel;
using System;

namespace HRMSoftware.Master.Forms;

[FormScript("Master.MasterCostCentre")]
[BasedOnRow(typeof(MasterCostCentreRow), CheckNames = true)]
public class MasterCostCentreForm
{
    public string Name { get; set; }
    public string Description { get; set; }
}
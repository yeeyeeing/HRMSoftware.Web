using Serenity.ComponentModel;
using System;

namespace HRMSoftware.Master.Forms;

[FormScript("Master.MasterCity")]
[BasedOnRow(typeof(MasterCityRow), CheckNames = true)]
public class MasterCityForm
{
    public string Name { get; set; }
}
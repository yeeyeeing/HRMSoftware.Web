using Serenity.ComponentModel;
using System;

namespace HRMSoftware.Master.Forms;

[FormScript("Master.MasterBank")]
[BasedOnRow(typeof(MasterBankRow), CheckNames = true)]
public class MasterBankForm
{
    public string Name { get; set; }
    public string Description { get; set; }
}
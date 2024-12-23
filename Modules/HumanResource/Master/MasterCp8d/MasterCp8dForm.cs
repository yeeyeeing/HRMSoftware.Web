using Serenity.ComponentModel;
using System;

namespace HRMSoftware.Master.Forms;

[FormScript("Master.MasterCp8d")]
[BasedOnRow(typeof(MasterCp8dRow), CheckNames = true)]
public class MasterCp8dForm
{
    public string Name { get; set; }
    public string Description { get; set; }
}
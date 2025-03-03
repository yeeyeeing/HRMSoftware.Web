using Serenity.ComponentModel;
using System;

namespace HRMSoftware.Master.Forms;

[FormScript("Master.Nationality")]
[BasedOnRow(typeof(NationalityRow), CheckNames = true)]
public class NationalityForm
{
    public string Name { get; set; }
    public int CountryId { get; set; }
}
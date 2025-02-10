using Serenity.ComponentModel;
using System;

namespace HRMSoftware.Master.Forms;

[FormScript("Master.MasterCountry")]
[BasedOnRow(typeof(MasterCountryRow), CheckNames = true)]
public class MasterCountryForm
{
    public string Name { get; set; }
    public string CountryCode { get; set; }

}
using Serenity.ComponentModel;
using System;

namespace HRMSoftware.Race.Forms;

[FormScript("Race.Race")]
[BasedOnRow(typeof(RaceRow), CheckNames = true)]
public class RaceForm
{
    public string Race { get; set; }
}
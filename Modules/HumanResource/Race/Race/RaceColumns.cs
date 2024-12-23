using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.Race.Columns;

[ColumnsScript("Race.Race")]
[BasedOnRow(typeof(RaceRow), CheckNames = true)]
public class RaceColumns
{
  //  [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight]
    //public int Id { get; set; }
    [EditLink]
    public string Race { get; set; }
}
using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.Announcement.Columns;

[ColumnsScript("Announcement.AnnouncementDepartmentBinded")]
[BasedOnRow(typeof(AnnouncementDepartmentBindedRow), CheckNames = true)]
public class AnnouncementDepartmentBindedColumns
{



    public int DepartmentId { get; set; }
}
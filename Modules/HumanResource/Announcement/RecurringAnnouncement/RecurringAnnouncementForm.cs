using Serenity.ComponentModel;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace HRMSoftware.Announcement.Forms;

[FormScript("Announcement.RecurringAnnouncement")]
[BasedOnRow(typeof(RecurringAnnouncementRow), CheckNames = true)]
public class RecurringAnnouncementForm
{

    [Tab("Announcement Content")]
    [Category("Content")]

    public string Name { get; set; }
    [TextAreaEditor(Rows = 5)]
    public string AnnouncementContent { get; set; }
    public string UploadDocument { get; set; }



    [Tab("Settings")]

    [Category("Binds")]
    [QuarterWidth]
    public bool BindToOccupation { get; set; }
    [QuarterWidth]
    public bool BindToDepartment { get; set; }
    [QuarterWidth]
    public bool BindToDivision { get; set; }
    [QuarterWidth]
    public bool BindToJobGrade { get; set; }
    [QuarterWidth]
    public bool BindToSection { get; set; }

    [Category("Filters")]

   

    [HalfWidth]
    public List<int> OccupationListActual { get; set; }
    [HalfWidth]
    public List<int> DepartmentListActual { get; set; }
    [HalfWidth]
    public List<int> DivisionListActual { get; set; }
    [HalfWidth]
    public List<int> JobGradeListActual { get; set; }
    [HalfWidth]
    public List<int> SectionListActual { get; set; }
    [ThreeQuarterWidth]
    public List<int> EmployeeListActual { get; set; }
   
    
    [QuarterWidth]
    public int All { get; set; }



    [Tab("Intervals")]


    [HalfWidth]
    public DateTime StartingDateTime { get; set; }
    [HalfWidth]
    public string RecurringTime { get; set; }

    [QuarterWidth]
    public bool DaysOfWeekRecurring { get; set; }
    [QuarterWidth]
    public bool DaysPerRecurring { get; set; }


    [Category("Recurring Days")]
    [QuarterWidth]
    public int IntervalInDays { get; set; }


    [Category("Days of Week")]
    public bool Sunday { get; set; }
    public bool Monday { get; set; }
    public bool Tuesday { get; set; }
    public bool Wednesday { get; set; }
    public bool Thursday { get; set; }
    public bool Friday { get; set; }
    public bool Saturday { get; set; }

    [Category("Remarks")]
    [TextAreaEditor(Rows = 5)]
    public string Remarks { get; set; }



    [Tab("Announcement Generated"), Category(""), IgnoreName, LabelWidth("0"), AnnouncementGeneratedEditor,HideOnInsert]
    public List<AnnouncementGeneratedRow> AnnouncementList { get; set; }

}
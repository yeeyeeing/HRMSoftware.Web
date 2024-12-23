using Serenity.ComponentModel;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace HRMSoftware.Announcement.Forms;

[FormScript("Announcement.AnnouncementWizard")]
[BasedOnRow(typeof(AnnouncementWizardRow), CheckNames = true)]
public class AnnouncementWizardForm
{
    [Tab("Announcement Content")]

    [TextAreaEditor(Rows = 5)]
    public string AnnouncementContent { get; set; }
    public string UploadDocument { get; set; }

    [Tab("Announcement Wizard")]
    [Category("Announce Time")]

    [OneThirdWidth]
    public bool Immediate { get; set; }
    [OneThirdWidth]
    public bool Delayed { get; set; }

    [HalfWidth]
    public DateTime AnnouncementDateTime { get; set; }
    [HalfWidth]
    public string AnnouncementTime { get; set; }

    [Category("Remarks")]
    public string Remarks { get; set; }

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
    public List<int> EmployeeRowList { get; set; }
    [QuarterWidth]
    public int All { get; set; }



    [Tab("Announcement Generated"), IgnoreName, LabelWidth("0"), AnnouncementGeneratedEditor]
    public List<AnnouncementGeneratedRow> AnnouncementList { get; set; }



}
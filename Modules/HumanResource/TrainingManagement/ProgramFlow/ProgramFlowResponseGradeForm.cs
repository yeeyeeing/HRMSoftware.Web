﻿using Serenity.ComponentModel;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace HRMSoftware.TrainingManagement.Forms;

[FormScript("TrainingManagement.ProgramFlowResponseGradeForm")]
[BasedOnRow(typeof(ProgramFlowRow), CheckNames = true)]
public class ProgramFlowResponseGradeForm
{
    [Category("Basic Info")]
    [HalfWidth]
    public string FlowType { get; set; }
    [HalfWidth]
    public string GradeType { get; set; }
    [FormCssClass("line-break-lg col-sm-6")] 
    public DateTime Date { get; set; }
    public string Remark { get; set; }
    [Category("Participant List")]
    [IgnoreName, LabelWidth("0"), ProgramGradeResponseEditor, FormCssClass("GradeTable")]
    public List<int> ParticipantList { get; set; }
}
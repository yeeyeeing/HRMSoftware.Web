﻿using Serenity.ComponentModel;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace HRMSoftware.TrainingManagement.Forms;

[FormScript("TrainingManagement.ProgramFlowFileForm")]
[BasedOnRow(typeof(ProgramFlowRow), CheckNames = true)]
public class ProgramFlowFileForm
{
    [Visible(false), FormCssClass("FileFormId")]
    public int Id { get; set; }
    [Category("Basic Info")]
    [HalfWidth]
    public string FlowType { get; set; }
    [HalfWidth]
    public string GradeType { get; set; }
    [FormCssClass("line-break-lg col-sm-6")] 
    public DateTime Date { get; set; }
    public string Remark { get; set; }
    [Category("Participant List")]
    [IgnoreName, LabelWidth("0"), ProgramFileResponseEditor, FormCssClass("FileTable")]
    public List<int> ParticipantList { get; set; }
    
    // public int InsertUserId { get; set; }
    // public DateTime InsertDate { get; set; }
    // public int UpdateUserId { get; set; }
    // public DateTime UpdateDate { get; set; }
    // public int DeleteUserId { get; set; }
    // public DateTime DeleteDate { get; set; }
}
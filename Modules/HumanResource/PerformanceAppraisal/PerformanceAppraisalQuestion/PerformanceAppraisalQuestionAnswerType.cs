using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.PerformanceAppraisal;

[EnumKey("PerformanceAppraisal.PerformanceAppraisalQuestionAnswerType")]
public enum PerformanceAppraisalQuestionAnswerType
{
    [Description("Answer Type")]
    Type = 1,
    [Description("Text")]
    Text = 2,
    [Description("Rating")]
    Rating = 3
} 
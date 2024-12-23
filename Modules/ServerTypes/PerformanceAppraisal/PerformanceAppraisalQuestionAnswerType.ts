import { Decorators } from "@serenity-is/corelib";

export enum PerformanceAppraisalQuestionAnswerType {
    Type = 1,
    Text = 2,
    Rating = 3
}
Decorators.registerEnumType(PerformanceAppraisalQuestionAnswerType, 'HRMSoftware.PerformanceAppraisal.PerformanceAppraisalQuestionAnswerType', 'PerformanceAppraisal.PerformanceAppraisalQuestionAnswerType');
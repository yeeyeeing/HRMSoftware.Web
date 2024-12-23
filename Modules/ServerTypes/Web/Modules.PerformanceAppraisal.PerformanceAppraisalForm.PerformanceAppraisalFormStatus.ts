import { Decorators } from "@serenity-is/corelib";

export enum PerformanceAppraisalFormStatus {
    Incomplete = 1,
    Completed = 2,
    Draft = 3,
    AwaitingReview = 4,
    PendingEmpDiscussion = 5,
    PendingGmApproval = 6,
    ReviewCompleted = 7
}
Decorators.registerEnumType(PerformanceAppraisalFormStatus, 'HRMSoftware.Web.Modules.PerformanceAppraisal.PerformanceAppraisalForm.PerformanceAppraisalFormStatus', 'PerformanceAppraisal.PerformanceAppraisalFormStatus');
using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalTemplateDepartmentRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalTemplateDepartmentDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalTemplateDepartmentDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IPerformanceAppraisalTemplateDepartmentDeleteHandler
{
    public PerformanceAppraisalTemplateDepartmentDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}
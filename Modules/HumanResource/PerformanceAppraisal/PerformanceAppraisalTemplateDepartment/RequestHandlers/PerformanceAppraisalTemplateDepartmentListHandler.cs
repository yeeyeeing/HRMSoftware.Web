using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.PerformanceAppraisal.PerformanceAppraisalTemplateDepartmentRow>;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalTemplateDepartmentRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalTemplateDepartmentListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalTemplateDepartmentListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IPerformanceAppraisalTemplateDepartmentListHandler
{
    public PerformanceAppraisalTemplateDepartmentListHandler(IRequestContext context)
            : base(context)
    {
    }
}
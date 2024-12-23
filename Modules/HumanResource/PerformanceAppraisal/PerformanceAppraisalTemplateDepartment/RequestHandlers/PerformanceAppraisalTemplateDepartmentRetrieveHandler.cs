using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.PerformanceAppraisal.PerformanceAppraisalTemplateDepartmentRow>;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalTemplateDepartmentRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalTemplateDepartmentRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalTemplateDepartmentRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IPerformanceAppraisalTemplateDepartmentRetrieveHandler
{
    public PerformanceAppraisalTemplateDepartmentRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}
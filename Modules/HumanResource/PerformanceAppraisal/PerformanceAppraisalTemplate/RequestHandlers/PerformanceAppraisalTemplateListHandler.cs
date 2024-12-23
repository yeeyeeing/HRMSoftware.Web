using Serenity.Data;
using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.PerformanceAppraisal.PerformanceAppraisalTemplateRow>;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalTemplateRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalTemplateListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalTemplateListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IPerformanceAppraisalTemplateListHandler
{
    public PerformanceAppraisalTemplateListHandler(IRequestContext context)
            : base(context)
    {
    }
}
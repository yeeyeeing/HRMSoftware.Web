using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalTemplateRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalTemplateDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalTemplateDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IPerformanceAppraisalTemplateDeleteHandler
{
    public PerformanceAppraisalTemplateDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}
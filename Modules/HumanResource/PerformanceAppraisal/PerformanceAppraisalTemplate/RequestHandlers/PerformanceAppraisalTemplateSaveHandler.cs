using System.Linq;
using Serenity.Data;
using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.PerformanceAppraisal.PerformanceAppraisalTemplateRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalTemplateRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalTemplateSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalTemplateSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IPerformanceAppraisalTemplateSaveHandler
{
    public PerformanceAppraisalTemplateSaveHandler(IRequestContext context)
            : base(context)
    {
    }
    
}
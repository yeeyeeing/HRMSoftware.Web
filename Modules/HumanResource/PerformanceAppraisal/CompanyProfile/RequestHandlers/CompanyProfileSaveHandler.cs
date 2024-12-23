using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.PerformanceAppraisal.CompanyProfileRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.PerformanceAppraisal.CompanyProfileRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface ICompanyProfileSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class CompanyProfileSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, ICompanyProfileSaveHandler
{
    public CompanyProfileSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}
using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.PerformanceAppraisal.CompanyProfileRow>;
using MyRow = HRMSoftware.PerformanceAppraisal.CompanyProfileRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface ICompanyProfileRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class CompanyProfileRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, ICompanyProfileRetrieveHandler
{
    public CompanyProfileRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}
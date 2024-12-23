using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.PerformanceAppraisal.CompanyProfileRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface ICompanyProfileDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class CompanyProfileDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, ICompanyProfileDeleteHandler
{
    public CompanyProfileDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}
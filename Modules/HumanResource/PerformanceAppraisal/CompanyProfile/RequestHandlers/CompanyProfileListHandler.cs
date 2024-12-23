using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.PerformanceAppraisal.CompanyProfileRow>;
using MyRow = HRMSoftware.PerformanceAppraisal.CompanyProfileRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface ICompanyProfileListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class CompanyProfileListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, ICompanyProfileListHandler
{
    public CompanyProfileListHandler(IRequestContext context)
            : base(context)
    {
    }
}
using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.PayrollSettings.EmployerContributionsRow>;
using MyRow = HRMSoftware.PayrollSettings.EmployerContributionsRow;

namespace HRMSoftware.PayrollSettings;

public interface IEmployerContributionsListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class EmployerContributionsListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IEmployerContributionsListHandler
{
    public EmployerContributionsListHandler(IRequestContext context)
            : base(context)
    {
    }
}
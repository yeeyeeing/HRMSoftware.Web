using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.PayrollSettings.EmployerContributionsRow>;
using MyRow = HRMSoftware.PayrollSettings.EmployerContributionsRow;

namespace HRMSoftware.PayrollSettings;

public interface IEmployerContributionsRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployerContributionsRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployerContributionsRetrieveHandler
{
    public EmployerContributionsRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}
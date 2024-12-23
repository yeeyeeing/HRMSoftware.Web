using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.PayrollSettings.EmployerContributionsRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.PayrollSettings.EmployerContributionsRow;

namespace HRMSoftware.PayrollSettings;

public interface IEmployerContributionsSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployerContributionsSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployerContributionsSaveHandler
{
    public EmployerContributionsSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}
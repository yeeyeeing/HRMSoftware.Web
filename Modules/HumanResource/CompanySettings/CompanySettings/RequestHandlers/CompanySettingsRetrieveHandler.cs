using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.CompanySettings.CompanySettingsRow>;
using MyRow = HRMSoftware.CompanySettings.CompanySettingsRow;

namespace HRMSoftware.CompanySettings;

public interface ICompanySettingsRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class CompanySettingsRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, ICompanySettingsRetrieveHandler
{
    public CompanySettingsRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}
using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.CompanySettings.CompanySettingsRow>;
using MyRow = HRMSoftware.CompanySettings.CompanySettingsRow;

namespace HRMSoftware.CompanySettings;

public interface ICompanySettingsListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class CompanySettingsListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, ICompanySettingsListHandler
{
    public CompanySettingsListHandler(IRequestContext context)
            : base(context)
    {
    }
}
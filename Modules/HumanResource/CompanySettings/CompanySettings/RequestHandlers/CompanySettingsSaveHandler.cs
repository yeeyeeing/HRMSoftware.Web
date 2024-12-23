using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.CompanySettings.CompanySettingsRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.CompanySettings.CompanySettingsRow;

namespace HRMSoftware.CompanySettings;

public interface ICompanySettingsSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class CompanySettingsSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, ICompanySettingsSaveHandler
{
    public CompanySettingsSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}
using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.CompanySettings.CompanySettingsRow;

namespace HRMSoftware.CompanySettings;

public interface ICompanySettingsDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class CompanySettingsDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, ICompanySettingsDeleteHandler
{
    public CompanySettingsDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}
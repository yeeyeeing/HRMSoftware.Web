using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.Master.MasterCountryRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.Master.MasterCountryRow;

namespace HRMSoftware.Master;

public interface IMasterCountrySaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class MasterCountrySaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IMasterCountrySaveHandler
{
    public MasterCountrySaveHandler(IRequestContext context)
            : base(context)
    {
    }
}
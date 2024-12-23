using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.Master.MasterCityRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.Master.MasterCityRow;

namespace HRMSoftware.Master;

public interface IMasterCitySaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class MasterCitySaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IMasterCitySaveHandler
{
    public MasterCitySaveHandler(IRequestContext context)
            : base(context)
    {
    }
}
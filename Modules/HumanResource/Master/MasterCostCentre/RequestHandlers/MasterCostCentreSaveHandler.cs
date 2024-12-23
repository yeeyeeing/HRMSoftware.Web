using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.Master.MasterCostCentreRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.Master.MasterCostCentreRow;

namespace HRMSoftware.Master;

public interface IMasterCostCentreSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class MasterCostCentreSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IMasterCostCentreSaveHandler
{
    public MasterCostCentreSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}
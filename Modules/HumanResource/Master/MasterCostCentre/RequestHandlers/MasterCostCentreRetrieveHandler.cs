using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.Master.MasterCostCentreRow>;
using MyRow = HRMSoftware.Master.MasterCostCentreRow;

namespace HRMSoftware.Master;

public interface IMasterCostCentreRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class MasterCostCentreRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IMasterCostCentreRetrieveHandler
{
    public MasterCostCentreRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}
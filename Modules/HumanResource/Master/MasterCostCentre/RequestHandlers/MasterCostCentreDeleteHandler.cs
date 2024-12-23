using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.Master.MasterCostCentreRow;

namespace HRMSoftware.Master;

public interface IMasterCostCentreDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class MasterCostCentreDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IMasterCostCentreDeleteHandler
{
    public MasterCostCentreDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}
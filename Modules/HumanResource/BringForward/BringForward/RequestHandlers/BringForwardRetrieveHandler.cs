using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.BringForward.BringForwardRow>;
using MyRow = HRMSoftware.BringForward.BringForwardRow;

namespace HRMSoftware.BringForward;

public interface IBringForwardRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class BringForwardRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IBringForwardRetrieveHandler
{
    public BringForwardRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}
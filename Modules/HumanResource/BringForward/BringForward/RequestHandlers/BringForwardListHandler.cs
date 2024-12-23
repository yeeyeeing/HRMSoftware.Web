using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.BringForward.BringForwardRow>;
using MyRow = HRMSoftware.BringForward.BringForwardRow;

namespace HRMSoftware.BringForward;

public interface IBringForwardListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class BringForwardListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IBringForwardListHandler
{
    public BringForwardListHandler(IRequestContext context)
            : base(context)
    {
    }
}
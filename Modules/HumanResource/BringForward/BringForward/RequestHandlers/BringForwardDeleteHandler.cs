using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.BringForward.BringForwardRow;

namespace HRMSoftware.BringForward;

public interface IBringForwardDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class BringForwardDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IBringForwardDeleteHandler
{
    public BringForwardDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}
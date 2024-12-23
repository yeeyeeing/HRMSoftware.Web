using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.BringForward.BringForwardRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.BringForward.BringForwardRow;

namespace HRMSoftware.BringForward;

public interface IBringForwardSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class BringForwardSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IBringForwardSaveHandler
{
    public BringForwardSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}
using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.Master.MasterStateRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.Master.MasterStateRow;

namespace HRMSoftware.Master;

public interface IMasterStateSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class MasterStateSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IMasterStateSaveHandler
{
    public MasterStateSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}
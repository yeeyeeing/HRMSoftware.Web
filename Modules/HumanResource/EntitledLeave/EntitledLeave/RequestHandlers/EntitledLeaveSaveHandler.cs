using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.EntitledLeave.EntitledLeaveRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.EntitledLeave.EntitledLeaveRow;

namespace HRMSoftware.EntitledLeave;

public interface IEntitledLeaveSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class EntitledLeaveSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IEntitledLeaveSaveHandler
{
    public EntitledLeaveSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}
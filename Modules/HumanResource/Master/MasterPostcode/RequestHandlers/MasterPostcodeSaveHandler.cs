using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.Master.MasterPostcodeRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.Master.MasterPostcodeRow;

namespace HRMSoftware.Master;

public interface IMasterPostcodeSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class MasterPostcodeSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IMasterPostcodeSaveHandler
{
    public MasterPostcodeSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}
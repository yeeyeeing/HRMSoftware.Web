using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.Master.MasterBankRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.Master.MasterBankRow;

namespace HRMSoftware.Master;

public interface IMasterBankSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class MasterBankSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IMasterBankSaveHandler
{
    public MasterBankSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}
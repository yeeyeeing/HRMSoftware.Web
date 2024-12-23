using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.Master.MasterCp8dRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.Master.MasterCp8dRow;

namespace HRMSoftware.Master;

public interface IMasterCp8dSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class MasterCp8dSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IMasterCp8dSaveHandler
{
    public MasterCp8dSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}
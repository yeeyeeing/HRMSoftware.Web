using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.Master.MasterCp8dRow>;
using MyRow = HRMSoftware.Master.MasterCp8dRow;

namespace HRMSoftware.Master;

public interface IMasterCp8dRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class MasterCp8dRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IMasterCp8dRetrieveHandler
{
    public MasterCp8dRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}
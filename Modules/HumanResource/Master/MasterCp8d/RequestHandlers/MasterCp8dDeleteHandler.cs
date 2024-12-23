using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.Master.MasterCp8dRow;

namespace HRMSoftware.Master;

public interface IMasterCp8dDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class MasterCp8dDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IMasterCp8dDeleteHandler
{
    public MasterCp8dDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}
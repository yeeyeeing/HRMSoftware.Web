using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.Master.MasterCityRow;

namespace HRMSoftware.Master;

public interface IMasterCityDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class MasterCityDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IMasterCityDeleteHandler
{
    public MasterCityDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}
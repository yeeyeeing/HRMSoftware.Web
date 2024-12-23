using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.Master.MasterCountryRow;

namespace HRMSoftware.Master;

public interface IMasterCountryDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class MasterCountryDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IMasterCountryDeleteHandler
{
    public MasterCountryDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}
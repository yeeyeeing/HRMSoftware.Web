using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.OTApplication.OTApplicationRow;

namespace HRMSoftware.OTApplication;

public interface IOTApplicationDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class OTApplicationDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IOTApplicationDeleteHandler
{
    public OTApplicationDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}
using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.OTApplication.OTReasonRow;

namespace HRMSoftware.OTApplication;

public interface IOTReasonDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class OTReasonDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IOTReasonDeleteHandler
{
    public OTReasonDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}
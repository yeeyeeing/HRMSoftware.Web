using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.OTApplication.OTReasonRow>;
using MyRow = HRMSoftware.OTApplication.OTReasonRow;

namespace HRMSoftware.OTApplication;

public interface IOTReasonRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class OTReasonRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IOTReasonRetrieveHandler
{
    public OTReasonRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}
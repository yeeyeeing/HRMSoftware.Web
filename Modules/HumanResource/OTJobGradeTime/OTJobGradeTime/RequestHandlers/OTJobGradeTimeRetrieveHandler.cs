using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.OTJobGradeTime.OTJobGradeTimeRow>;
using MyRow = HRMSoftware.OTJobGradeTime.OTJobGradeTimeRow;

namespace HRMSoftware.OTJobGradeTime;

public interface IOTJobGradeTimeRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class OTJobGradeTimeRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IOTJobGradeTimeRetrieveHandler
{
    public OTJobGradeTimeRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}
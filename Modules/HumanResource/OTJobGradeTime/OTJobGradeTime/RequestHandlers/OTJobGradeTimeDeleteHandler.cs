using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.OTJobGradeTime.OTJobGradeTimeRow;

namespace HRMSoftware.OTJobGradeTime;

public interface IOTJobGradeTimeDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class OTJobGradeTimeDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IOTJobGradeTimeDeleteHandler
{
    public OTJobGradeTimeDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}
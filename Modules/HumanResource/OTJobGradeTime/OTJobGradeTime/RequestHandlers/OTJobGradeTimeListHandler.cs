using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.OTJobGradeTime.OTJobGradeTimeRow>;
using MyRow = HRMSoftware.OTJobGradeTime.OTJobGradeTimeRow;

namespace HRMSoftware.OTJobGradeTime;

public interface IOTJobGradeTimeListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class OTJobGradeTimeListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IOTJobGradeTimeListHandler
{
    public OTJobGradeTimeListHandler(IRequestContext context)
            : base(context)
    {
    }
}
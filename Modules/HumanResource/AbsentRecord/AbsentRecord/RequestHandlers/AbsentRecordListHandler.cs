using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.AbsentRecord.AbsentRecordRow>;
using MyRow = HRMSoftware.AbsentRecord.AbsentRecordRow;

namespace HRMSoftware.AbsentRecord;

public interface IAbsentRecordListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class AbsentRecordListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IAbsentRecordListHandler
{
    public AbsentRecordListHandler(IRequestContext context)
            : base(context)
    {
    }
}
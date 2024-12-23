using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.AbsentRecord.AbsentRecordRow;

namespace HRMSoftware.AbsentRecord;

public interface IAbsentRecordDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class AbsentRecordDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IAbsentRecordDeleteHandler
{
    public AbsentRecordDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}
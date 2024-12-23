using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.AbsentRecord.AbsentRecordRow>;
using MyRow = HRMSoftware.AbsentRecord.AbsentRecordRow;

namespace HRMSoftware.AbsentRecord;

public interface IAbsentRecordRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class AbsentRecordRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IAbsentRecordRetrieveHandler
{
    public AbsentRecordRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}
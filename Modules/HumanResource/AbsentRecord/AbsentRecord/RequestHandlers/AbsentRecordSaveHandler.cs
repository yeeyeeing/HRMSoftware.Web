using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.AbsentRecord.AbsentRecordRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.AbsentRecord.AbsentRecordRow;

namespace HRMSoftware.AbsentRecord;

public interface IAbsentRecordSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class AbsentRecordSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IAbsentRecordSaveHandler
{
    public AbsentRecordSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}
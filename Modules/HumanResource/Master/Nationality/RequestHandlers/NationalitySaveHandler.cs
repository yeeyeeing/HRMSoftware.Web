using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.Master.NationalityRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.Master.NationalityRow;

namespace HRMSoftware.Master;

public interface INationalitySaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class NationalitySaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, INationalitySaveHandler
{
    public NationalitySaveHandler(IRequestContext context)
            : base(context)
    {
    }
}
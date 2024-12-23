using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.InitYear.InitYearRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.InitYear.InitYearRow;

namespace HRMSoftware.InitYear;

public interface IInitYearSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class InitYearSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IInitYearSaveHandler
{
    public InitYearSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}
using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.PublicHoliday.PublicHolidayRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.PublicHoliday.PublicHolidayRow;

namespace HRMSoftware.PublicHoliday;

public interface IPublicHolidaySaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class PublicHolidaySaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IPublicHolidaySaveHandler
{
    public PublicHolidaySaveHandler(IRequestContext context)
            : base(context)
    {
    }
}
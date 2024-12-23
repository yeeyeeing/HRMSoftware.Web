using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.PublicHoliday.PublicHolidayRow>;
using MyRow = HRMSoftware.PublicHoliday.PublicHolidayRow;

namespace HRMSoftware.PublicHoliday;

public interface IPublicHolidayRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class PublicHolidayRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IPublicHolidayRetrieveHandler
{
    public PublicHolidayRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}
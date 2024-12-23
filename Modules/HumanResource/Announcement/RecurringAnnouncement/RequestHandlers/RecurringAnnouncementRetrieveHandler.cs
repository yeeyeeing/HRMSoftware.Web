using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.Announcement.RecurringAnnouncementRow>;
using MyRow = HRMSoftware.Announcement.RecurringAnnouncementRow;

namespace HRMSoftware.Announcement;

public interface IRecurringAnnouncementRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class RecurringAnnouncementRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IRecurringAnnouncementRetrieveHandler
{
    public RecurringAnnouncementRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}
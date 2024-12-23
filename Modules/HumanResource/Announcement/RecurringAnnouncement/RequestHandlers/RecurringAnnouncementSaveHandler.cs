using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.Announcement.RecurringAnnouncementRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.Announcement.RecurringAnnouncementRow;

namespace HRMSoftware.Announcement;

public interface IRecurringAnnouncementSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class RecurringAnnouncementSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IRecurringAnnouncementSaveHandler
{
    public RecurringAnnouncementSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}
using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.Announcement.AnnouncementRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.Announcement.AnnouncementRow;

namespace HRMSoftware.Announcement;

public interface IAnnouncementSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class AnnouncementSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IAnnouncementSaveHandler
{
    public AnnouncementSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}
using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.Announcement.AnnouncementSectionBindedRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.Announcement.AnnouncementSectionBindedRow;

namespace HRMSoftware.Announcement;

public interface IAnnouncementSectionBindedSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class AnnouncementSectionBindedSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IAnnouncementSectionBindedSaveHandler
{
    public AnnouncementSectionBindedSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}
using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.Announcement.AnnouncementOccupationBindedRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.Announcement.AnnouncementOccupationBindedRow;

namespace HRMSoftware.Announcement;

public interface IAnnouncementOccupationBindedSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class AnnouncementOccupationBindedSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IAnnouncementOccupationBindedSaveHandler
{
    public AnnouncementOccupationBindedSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}
using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.Announcement.AnnouncementDivisionBindedRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.Announcement.AnnouncementDivisionBindedRow;

namespace HRMSoftware.Announcement;

public interface IAnnouncementDivisionBindedSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class AnnouncementDivisionBindedSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IAnnouncementDivisionBindedSaveHandler
{
    public AnnouncementDivisionBindedSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}
using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.Announcement.AnnouncementJobGradeBindedRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.Announcement.AnnouncementJobGradeBindedRow;

namespace HRMSoftware.Announcement;

public interface IAnnouncementJobGradeBindedSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class AnnouncementJobGradeBindedSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IAnnouncementJobGradeBindedSaveHandler
{
    public AnnouncementJobGradeBindedSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}
using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.Announcement.AnnouncementGeneratedRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.Announcement.AnnouncementGeneratedRow;

namespace HRMSoftware.Announcement;

public interface IAnnouncementGeneratedSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class AnnouncementGeneratedSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IAnnouncementGeneratedSaveHandler
{
    public AnnouncementGeneratedSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}
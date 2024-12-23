using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.Announcement.AnnouncementWizardRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.Announcement.AnnouncementWizardRow;

namespace HRMSoftware.Announcement;

public interface IAnnouncementWizardSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class AnnouncementWizardSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IAnnouncementWizardSaveHandler
{
    public AnnouncementWizardSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}
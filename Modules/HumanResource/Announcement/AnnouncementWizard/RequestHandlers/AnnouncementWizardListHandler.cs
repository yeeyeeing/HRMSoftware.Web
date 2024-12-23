using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.Announcement.AnnouncementWizardRow>;
using MyRow = HRMSoftware.Announcement.AnnouncementWizardRow;

namespace HRMSoftware.Announcement;

public interface IAnnouncementWizardListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class AnnouncementWizardListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IAnnouncementWizardListHandler
{
    public AnnouncementWizardListHandler(IRequestContext context)
            : base(context)
    {
    }
}
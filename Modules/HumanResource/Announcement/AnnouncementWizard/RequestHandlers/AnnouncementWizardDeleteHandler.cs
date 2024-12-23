using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.Announcement.AnnouncementWizardRow;

namespace HRMSoftware.Announcement;

public interface IAnnouncementWizardDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class AnnouncementWizardDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IAnnouncementWizardDeleteHandler
{
    public AnnouncementWizardDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}
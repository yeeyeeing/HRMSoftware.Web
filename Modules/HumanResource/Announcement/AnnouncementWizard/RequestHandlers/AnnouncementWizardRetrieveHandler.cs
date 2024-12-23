using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.Announcement.AnnouncementWizardRow>;
using MyRow = HRMSoftware.Announcement.AnnouncementWizardRow;

namespace HRMSoftware.Announcement;

public interface IAnnouncementWizardRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class AnnouncementWizardRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IAnnouncementWizardRetrieveHandler
{
    public AnnouncementWizardRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}
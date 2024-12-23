using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.Announcement.AnnouncementRow>;
using MyRow = HRMSoftware.Announcement.AnnouncementRow;

namespace HRMSoftware.Announcement;

public interface IAnnouncementRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class AnnouncementRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IAnnouncementRetrieveHandler
{
    public AnnouncementRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}
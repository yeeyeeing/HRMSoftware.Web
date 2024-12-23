using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.Announcement.AnnouncementSectionBindedRow>;
using MyRow = HRMSoftware.Announcement.AnnouncementSectionBindedRow;

namespace HRMSoftware.Announcement;

public interface IAnnouncementSectionBindedRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class AnnouncementSectionBindedRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IAnnouncementSectionBindedRetrieveHandler
{
    public AnnouncementSectionBindedRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}
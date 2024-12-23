using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.Announcement.AnnouncementDivisionBindedRow>;
using MyRow = HRMSoftware.Announcement.AnnouncementDivisionBindedRow;

namespace HRMSoftware.Announcement;

public interface IAnnouncementDivisionBindedRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class AnnouncementDivisionBindedRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IAnnouncementDivisionBindedRetrieveHandler
{
    public AnnouncementDivisionBindedRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}
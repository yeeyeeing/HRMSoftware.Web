using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.Announcement.AnnouncementOccupationBindedRow>;
using MyRow = HRMSoftware.Announcement.AnnouncementOccupationBindedRow;

namespace HRMSoftware.Announcement;

public interface IAnnouncementOccupationBindedRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class AnnouncementOccupationBindedRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IAnnouncementOccupationBindedRetrieveHandler
{
    public AnnouncementOccupationBindedRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}
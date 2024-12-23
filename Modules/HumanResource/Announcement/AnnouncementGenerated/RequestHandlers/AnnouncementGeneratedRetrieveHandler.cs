using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.Announcement.AnnouncementGeneratedRow>;
using MyRow = HRMSoftware.Announcement.AnnouncementGeneratedRow;

namespace HRMSoftware.Announcement;

public interface IAnnouncementGeneratedRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class AnnouncementGeneratedRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IAnnouncementGeneratedRetrieveHandler
{
    public AnnouncementGeneratedRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}
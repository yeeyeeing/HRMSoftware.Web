using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.Announcement.AnnouncementJobGradeBindedRow>;
using MyRow = HRMSoftware.Announcement.AnnouncementJobGradeBindedRow;

namespace HRMSoftware.Announcement;

public interface IAnnouncementJobGradeBindedRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class AnnouncementJobGradeBindedRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IAnnouncementJobGradeBindedRetrieveHandler
{
    public AnnouncementJobGradeBindedRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}
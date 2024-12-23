using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.Announcement.RecurringBindedEmployeeRow>;
using MyRow = HRMSoftware.Announcement.RecurringBindedEmployeeRow;

namespace HRMSoftware.Announcement;

public interface IRecurringBindedEmployeeRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class RecurringBindedEmployeeRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IRecurringBindedEmployeeRetrieveHandler
{
    public RecurringBindedEmployeeRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}
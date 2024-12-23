using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.Announcement.RecurringBindedEmployeeRow;

namespace HRMSoftware.Announcement;

public interface IRecurringBindedEmployeeDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class RecurringBindedEmployeeDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IRecurringBindedEmployeeDeleteHandler
{
    public RecurringBindedEmployeeDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}
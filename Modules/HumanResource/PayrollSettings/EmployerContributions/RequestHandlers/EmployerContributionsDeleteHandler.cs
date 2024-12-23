using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.PayrollSettings.EmployerContributionsRow;

namespace HRMSoftware.PayrollSettings;

public interface IEmployerContributionsDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class EmployerContributionsDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IEmployerContributionsDeleteHandler
{
    public EmployerContributionsDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}
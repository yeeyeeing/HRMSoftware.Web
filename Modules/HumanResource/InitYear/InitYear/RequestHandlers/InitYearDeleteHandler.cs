using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.InitYear.InitYearRow;

namespace HRMSoftware.InitYear;

public interface IInitYearDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class InitYearDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IInitYearDeleteHandler
{
    public InitYearDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}
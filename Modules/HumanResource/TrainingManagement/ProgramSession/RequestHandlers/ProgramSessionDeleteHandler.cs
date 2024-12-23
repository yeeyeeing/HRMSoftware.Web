using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.TrainingManagement.ProgramSessionRow;

namespace HRMSoftware.TrainingManagement;

public interface IProgramSessionDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class ProgramSessionDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IProgramSessionDeleteHandler
{
    public ProgramSessionDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}
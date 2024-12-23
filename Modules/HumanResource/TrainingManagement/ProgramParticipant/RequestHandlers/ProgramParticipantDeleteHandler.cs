using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.TrainingManagement.ProgramParticipantRow;

namespace HRMSoftware.TrainingManagement;

public interface IProgramParticipantDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class ProgramParticipantDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IProgramParticipantDeleteHandler
{
    public ProgramParticipantDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}
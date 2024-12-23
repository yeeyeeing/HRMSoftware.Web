using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.TrainingManagement.ProgramParticipantRow>;
using MyRow = HRMSoftware.TrainingManagement.ProgramParticipantRow;

namespace HRMSoftware.TrainingManagement;

public interface IProgramParticipantRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class ProgramParticipantRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IProgramParticipantRetrieveHandler
{
    public ProgramParticipantRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}
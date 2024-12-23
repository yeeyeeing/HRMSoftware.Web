using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.TrainingManagement.ProgramParticipantRow>;
using MyRow = HRMSoftware.TrainingManagement.ProgramParticipantRow;

namespace HRMSoftware.TrainingManagement;

public interface IProgramParticipantListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class ProgramParticipantListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IProgramParticipantListHandler
{
    public ProgramParticipantListHandler(IRequestContext context)
            : base(context)
    {
    }
}
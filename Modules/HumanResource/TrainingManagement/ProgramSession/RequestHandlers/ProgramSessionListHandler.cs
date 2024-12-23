using System.Collections.Generic;
using HRMSoftware.Administration;
using OpenIddict.Abstractions;
using Serenity;
using Serenity.Data;
using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.TrainingManagement.ProgramSessionRow>;
using MyRow = HRMSoftware.TrainingManagement.ProgramSessionRow;
using ParticipantRow = HRMSoftware.TrainingManagement.ProgramParticipantRow;

namespace HRMSoftware.TrainingManagement;

public interface IProgramSessionListHandler : IListHandler<MyRow, MyRequest, MyResponse>
{
}

public class ProgramSessionListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IProgramSessionListHandler
{
    public ProgramSessionListHandler(IRequestContext context)
        : base(context)
    {
    }

    protected override void ApplyFilters(SqlQuery query)
    {
        base.ApplyFilters(query);

        if (Permissions.HasPermission(PermissionKeys.HumanResources))
            return;

        ListResponse<ParticipantRow> latest = new ListResponse<ParticipantRow>();
        latest.Entities = (List<ParticipantRow>)base.Connection.Query<ParticipantRow>(
            "dbo.RetrieveEmployeeRowIDBasedOnUserID",
            param: new
            {
                @UserID = User.GetIdentifier()
            },
            commandType: System.Data.CommandType.StoredProcedure);
        
        query.Join(new InnerJoin(ParticipantRow.Fields.TableName, "participant", new Criteria("participant.ProgramId") == new Criteria(MyRow.Fields.Id)));
        query.Where(new Criteria("participant.EmployeeRowId") == latest.Entities[0].EmployeeRowId.Value);
    }
}
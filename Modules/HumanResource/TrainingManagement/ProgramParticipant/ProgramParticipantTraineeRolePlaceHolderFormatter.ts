import { Decorators, Formatter, Lookup} from "@serenity-is/corelib";
import { FormatterContext } from "@serenity-is/sleekgrid";

@Decorators.registerFormatter('HRMSoftware.TrainingManagement.ProgramParticipantTraineeRolePlaceHolderFormatter')
export class ProgramParticipantTraineeRolePlaceHolderFormatter implements Formatter {

    format(ctx: FormatterContext) {
        let employeeId = ctx.item.EmployeeRowId | 0;
        
        return '<div><form employeeId='+ employeeId +' id="trainee_checkbox"><input type="checkbox"></form></div> ';
    }
}
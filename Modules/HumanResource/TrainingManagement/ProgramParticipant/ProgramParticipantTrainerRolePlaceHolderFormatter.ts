import { Decorators, Formatter, Lookup} from "@serenity-is/corelib";
import { FormatterContext } from "@serenity-is/sleekgrid";

@Decorators.registerFormatter('HRMSoftware.TrainingManagement.ProgramParticipantTrainerRolePlaceHolderFormatter')
export class ProgramParticipantTrainerRolePlaceHolderFormatter implements Formatter {

    format(ctx: FormatterContext) {
        let employeeId = ctx.item.EmployeeRowId | 0;
        
        return '<div><form employeeId='+ employeeId +' id="trainer_checkbox"><input type="checkbox"></form></div> ';
    }
}
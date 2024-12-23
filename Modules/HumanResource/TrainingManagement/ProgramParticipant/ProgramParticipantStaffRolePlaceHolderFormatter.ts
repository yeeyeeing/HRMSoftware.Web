import { Decorators, Formatter, Lookup} from "@serenity-is/corelib";
import { FormatterContext } from "@serenity-is/sleekgrid";

@Decorators.registerFormatter('HRMSoftware.TrainingManagement.ProgramParticipantStaffRolePlaceHolderFormatter')
export class ProgramParticipantStaffRolePlaceHolderFormatter implements Formatter {

    format(ctx: FormatterContext) {
        let employeeId = ctx.item.EmployeeRowId | 0;
        
        return '<div><form employeeId='+ employeeId +' id="staff_checkbox" ><input type="checkbox"></form></div> ';
    }
}
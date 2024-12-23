import { Decorators, Formatter, Lookup} from "@serenity-is/corelib";
import { FormatterContext } from "@serenity-is/sleekgrid";

@Decorators.registerFormatter('HRMSoftware.TrainingManagement.ProgramAttendanceResponsePlaceHolderFormatter')
export class ProgramAttendanceResponsePlaceHolderFormatter implements Formatter {

    format(ctx: FormatterContext) {
        let employeeId = ctx.item.EmployeeRowId | 0;
        
        return '<div><form participantId='+ employeeId +'><input type="checkbox"></form></div> ';
    }
}
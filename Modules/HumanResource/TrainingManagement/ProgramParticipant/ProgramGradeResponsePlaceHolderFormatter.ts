import { Decorators, Formatter, Lookup} from "@serenity-is/corelib";
import { FormatterContext } from "@serenity-is/sleekgrid";

@Decorators.registerFormatter('HRMSoftware.TrainingManagement.ProgramGradeResponsePlaceHolderFormatter')
export class ProgramGradeResponsePlaceHolderFormatter implements Formatter {

    format(ctx: FormatterContext) {
        let employeeId = ctx.item.EmployeeRowId | 0;

        return '<div><form participantId='+ employeeId +'></form></div>';
    }
}
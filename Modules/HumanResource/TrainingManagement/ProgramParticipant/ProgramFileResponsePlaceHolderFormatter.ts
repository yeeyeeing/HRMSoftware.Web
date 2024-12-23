import { Decorators, Formatter, Lookup} from "@serenity-is/corelib";
import { FormatterContext } from "@serenity-is/sleekgrid";

@Decorators.registerFormatter('HRMSoftware.TrainingManagement.ProgramFileResponsePlaceHolderFormatter')
export class ProgramFileResponsePlaceHolderFormatter implements Formatter {

    format(ctx: FormatterContext) {
        // console.log(ctx);
        // let id = ctx.item.Id | 0;
        //
        // return '<div><form id="file_'+ id +'" participantId='+ id +'><input type="checkbox"></form></div> ';

        let employeeId = ctx.item.EmployeeRowId | 0;

        // return employeeId;
        return '<div><form participantId='+ employeeId +'></form></div> ';
    }
}
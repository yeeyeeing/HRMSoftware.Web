import { Decorators, Formatter, Lookup } from "@serenity-is/corelib";
import { FormatterContext } from "@serenity-is/sleekgrid";

@Decorators.registerFormatter('HRMSoftware.StatusFormatter')
export class StatusFormatter implements Formatter {

    format(ctx: FormatterContext) {

        let state = ctx.value;
        if (state == false)
            return `<i class="fa fa-times" style="color:red"></i>`;
        else if (state == true)
            return `<i class="fa fa-check" style="color:green"></i>`
       
    }
}
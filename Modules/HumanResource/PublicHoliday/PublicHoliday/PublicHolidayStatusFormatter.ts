import { Decorators, Formatter, Lookup } from "@serenity-is/corelib";
import { FormatterContext } from "@serenity-is/sleekgrid";

@Decorators.registerFormatter('HRMSoftware.PublicHolidayStatusFormatter')
export class PublicHolidayStatusFormatter implements Formatter {

    format(ctx: FormatterContext) {

        let state = ctx.value as number;
        if (state == -1)
            return `<input type='checkbox' class="select-row-checkbox"></input>`;

        else if (state == 1)
            return `<input type='checkbox' class="select-row-checkbox  " checked></input>`

    }
}
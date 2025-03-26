import { Decorators, Formatter, Lookup } from "@serenity-is/corelib";
import { FormatterContext } from "@serenity-is/sleekgrid";
import { Authorization, isEmptyOrNull } from '@serenity-is/corelib/q';

@Decorators.registerFormatter('HRMSoftware.ShiftTimeToHours')
export class ShiftTimeToHours implements Formatter {

    format(ctx: FormatterContext) {

        if (!isEmptyOrNull(ctx.value))
            return ctx.value.substring(0, 19).replace('T',' ')

        return
    }
}
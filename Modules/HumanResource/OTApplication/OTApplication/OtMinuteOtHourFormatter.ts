import { Decorators, Formatter, Lookup } from "@serenity-is/corelib";
import { FormatterContext } from "@serenity-is/sleekgrid";

@Decorators.registerFormatter('HRMSoftware.OtMinuteOtHourFormatter')
export class OtMinuteOtHourFormatter implements Formatter {

    format(ctx: FormatterContext) {

        let minute = ctx.value as number;
        let hour = minute / 60.0


        return `<p>${hour.toFixed(2) }</p>`;


    }
}
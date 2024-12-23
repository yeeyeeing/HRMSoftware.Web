import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { EisSubjectionService, EpfSubjectionService, HrdfSubjectionService, PcbSubjectionService, SocsoSubjectionService } from '../../ServerTypes/PayrollSettings';
import { EisSubjectionGrid } from '../EisSubjection/EisSubjectionGrid';
import { EpfSubjectionGrid } from '../EpfSubjection/EpfSubjectionGrid';
import { HrdfSubjectionGrid } from '../HrdfSubjection/HrdfSubjectionGrid';
import { PcbSubjectionGrid } from '../PcbSubjection/PcbSubjectionGrid';
import { SocsoSubjectionGrid } from '../SocsoSubjection/SocsoSubjectionGrid';
import { PayrollGrid } from './PayrollGrid';
function CompleteSetting(string)
{
    const mainElement = document.createElement("main");;
    mainElement.id = "main-content";
    mainElement.className = "main-container";
    mainElement.innerHTML = "<h1>This page is used to create Employee Payrolls</h1><p>Please initialise " + string+" to start using this feature.</p>";
    $('#GridDiv').append(mainElement)
}

export default function pageInit()
{
    /*
    PcbSubjectionService.List({
    }, response => {
        if (response.TotalCount)
            EpfSubjectionService.List({
            }, response => {
                if (response.TotalCount)
                    EisSubjectionService.List({
                    }, response => {
                        if (response.TotalCount)
                            HrdfSubjectionService.List({
                            }, response => {
                                if (response.TotalCount) 
                                    SocsoSubjectionService.List({
                                    }, response => {
                                        if (response.TotalCount) 
                                            initFullHeightGridPage(new PayrollGrid($('#GridDiv')).element);

                                        else
                                            initFullHeightGridPage(new SocsoSubjectionGrid($('#GridDiv')).element);

                                    })
                                else
                                    initFullHeightGridPage(new HrdfSubjectionGrid($('#GridDiv')).element);

                            })
                        else
                            initFullHeightGridPage(new EisSubjectionGrid($('#GridDiv')).element);
                    })
                else
                    initFullHeightGridPage(new EpfSubjectionGrid($('#GridDiv')).element);
            })
        else
            initFullHeightGridPage(new PcbSubjectionGrid($('#GridDiv')).element);
    })
*/

    initFullHeightGridPage(new PayrollGrid($('#GridDiv')).element);

}
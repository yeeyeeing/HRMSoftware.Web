import {  Decorators, EntityGrid, ListResponse, RetrieveResponse } from '@serenity-is/corelib';
import { PublicHolidayColumns, PublicHolidayRow, PublicHolidayService } from '../../../ServerTypes/PublicHoliday';
import { PublicHolidayDialog } from './PublicHolidayDialog';
import Holidays from 'date-holidays'
import { EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';
import { confirm,serviceCall } from '@serenity-is/corelib/q';
import { InitYearService } from '../../../ServerTypes/InitYear';
import { CompanySettingsService } from '../../../ServerTypes/CompanySettings';

@Decorators.registerClass('HRMSoftware.PublicHoliday.PublicHolidayGrid')
export class PublicHolidayGrid extends EntityGrid<PublicHolidayRow, any> {
    protected getColumnsKey() { return PublicHolidayColumns.columnsKey; }
    protected getDialogType() { return PublicHolidayDialog; }
    protected getRowDefinition() { return PublicHolidayRow; }
    protected getService() { return PublicHolidayService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }

    protected getButtons() {
        var buttons = super.getButtons();
        var self = this
     

        buttons.push({
            title: 'Renew Public Holiday',
            cssClass: 'apply-changes-button',
            onClick: e => {
                confirm(
                    "Do you sure you want to renew the public holiday",
                    async () => {
                        try {
                            let country: string | undefined;
                            const companySettings = await new Promise<any[]>((resolve, reject) => {
                                CompanySettingsService.List({}, response => {
                                    resolve(response.Entities);
                                }, error => reject(error));
                            });
                            for (const res of companySettings) {
                                if (res.IsActive === 1) {
                                    country = res.BasedCountry;
                                    break;
                                }
                            }
                            if (!country) 
                                return;
                            
                            // Get all years from InitYearService
                            const years = await new Promise<any[]>((resolve, reject) => {
                                InitYearService.List({}, response => {
                                    resolve(response.Entities);
                                }, error => reject(error));
                            });
                            // Store promises for all service calls
                            const servicePromises: Promise<any>[] = [];
                            for (const yearEntry of years) {
                                const hd = new Holidays(country);
                                const year = yearEntry.Year;
                                const current_year_holidays = hd.getHolidays(year);
                                console.log(hd);
                                console.log(current_year_holidays);

                                for (const current_holiday of current_year_holidays) {
                                    const date = current_holiday.date.substring(0, 10);
                                    const dateObj = new Date(date);

                                    // Format date to YYYY-MM-DD
                                    const formattedDate = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')}`;
                                    const HolidayName = current_holiday.name;
                                    
                                    console.log(HolidayName);
                                    console.log(formattedDate);
                                    console.log(country);
                                    
                                    // Store each service call in the promises array
                                    const serviceCallPromise = new Promise<void>((resolve, reject) => {
                                        serviceCall<RetrieveResponse<any>>({
                                            service: EmployeeProfileService.baseUrl + '/CreatePublicHolidayRecord',
                                            data: {
                                                'HolidayName': HolidayName,
                                                'Date': formattedDate,
                                                'CountryCode': country
                                            },
                                            method: "GET",
                                            async: false,
                                            onSuccess: () => resolve(),
                                            onError: (error) => {
                                                console.log(error.Error);
                                                reject(error);
                                            }
                                        });
                                    });

                                    servicePromises.push(serviceCallPromise);
                                }
                            }
                            // Wait for all service calls to complete
                            await Promise.all(servicePromises);
                            self.refresh()
                        } catch (error) {
                            console.error("Error processing holidays:", error);
                        }
                    }
                );
            },
            separator: true
        });

        return buttons;
    }

    protected onViewProcessData(response: ListResponse<PublicHolidayRow>) {
        response = super.onViewProcessData(response);
        this.toolbar.findButton("column-picker-button").toggle(false);
        return response;

    }


    protected onClick(e: JQueryEventObject, row: number, cell: number) {
        super.onClick(e, row, cell);
        if (e.isDefaultPrevented())
            return;
        // get reference to current item
        var item = this.itemAt(row);
        // get reference to clicked element
        var target = $(e.target);
        var value = target[0].checked == true ? 1 : -1
        PublicHolidayService.Update({
            EntityId: item.Id,
            Entity:
            {
                "IsActive": value
            },
        });
    }
}
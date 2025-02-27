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

     

        buttons.push({
            title: 'Renew Public Holiday',
            cssClass: 'apply-changes-button',
            onClick: e => {
                confirm(
                    "Do you sure you want to renew the public holiday",
                    () => {
                        var country
                       
                        CompanySettingsService.List({
                        }, response => {
                            country = response.Entities[0].BasedCountry
                            console.log(country)

                            InitYearService.List({
                            }, response => {

                                for (var index in response.Entities) {
                                    var hd = new Holidays(country)
                                    var year = response.Entities[index].Year
                                    var current_year_holidays = hd.getHolidays(year)
                                    for (var current_holiday in current_year_holidays) {
                                        var date = current_year_holidays[current_holiday].date.substring(0, 10);

                                        var dateObj = new Date(date);

                                        // Extract year, month, and day from the date object
                                        var year = dateObj.getFullYear();
                                        var month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
                                        var day = dateObj.getDate().toString().padStart(2, '0');

                                        // Generate the YYYY-MM-DD format string
                                        var formattedDate = `${year}-${month}-${day}`;
                                        var HolidayName = current_year_holidays[current_holiday].name;

                                        serviceCall<RetrieveResponse<any>>({
                                            service: EmployeeProfileService.baseUrl + '/CreatePublicHolidayRecord',
                                            data: {
                                                'HolidayName': HolidayName,
                                                'Date': formattedDate,
                                                'CountryCode': country
                                            },
                                            method: "GET",
                                            async: false,
                                            onSuccess: (response) => {
                                            },
                                            onError: (error) => {
                                                console.log(error.Error);
                                            }
                                        });

                                    }

                                }

                                location.reload()



                            });





                        });

                    
                    }

                )

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
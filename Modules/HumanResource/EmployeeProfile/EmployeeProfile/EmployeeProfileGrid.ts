import {  DataGrid, Decorators, EntityGrid, first, GridRowSelectionMixin, LookupEditor, QuickSearchField, RetrieveResponse } from '@serenity-is/corelib';
import { EmployeeProfileColumns, EmployeeProfileRow, EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';
import { EmployeeProfileDialog } from './EmployeeProfileDialog';
import { EmployeeDialog } from './EmployeeDialog';
import { ShiftForm, ShiftRow, ShiftService } from '../../../ServerTypes/Shift';
import Holidays from 'date-holidays'
import { ViewShiftHistoryDialog } from '../../ViewShiftHistory/ViewShiftHistory/ViewShiftHistoryDialog';
import { serviceCall, ListResponse, confirm, Authorization } from '@serenity-is/corelib/q';
import { PublicHolidayService } from '../../../ServerTypes/PublicHoliday';
import { EntitledLeaveService } from '../../../ServerTypes/EntitledLeave';
import { AnnualLeavePolicyService } from '../../../ServerTypes/AnnualLeavePolicy';
import { SickLeavePolicyService } from '../../../ServerTypes/SickLeavePolicy';
import { InitYearService } from '../../../ServerTypes/InitYear';
import { EntitledLeaveDialog } from '../../EntitledLeave/EntitledLeave/EntitledLeaveDialog';
import { CompanySettingsService } from '../../../ServerTypes/CompanySettings';
import { EmployeeEditHistoryDialog } from '../../EmployeeEditHistory/EmployeeEditHistory/EmployeeEditHistoryDialog';
import { EmployeeBasicDataDialog } from '../../EmployeeBasicData/EmployeeBasicData/EmployeeBasicDataDialog';
import { PermissionKeys, UserService } from '../../../ServerTypes/Administration';
import { UserCreationDialog } from '../UserCreation/UserCreationDialog';
@Decorators.filterable()
@Decorators.registerClass('HRMSoftware.EmployeeProfile.EmployeeProfileGrid')
export class EmployeeProfileGrid extends EntityGrid<EmployeeProfileRow, any>
{
    protected getColumnsKey() { return EmployeeProfileColumns.columnsKey; }
    protected getDialogType() { return EmployeeProfileDialog; }
    protected getRowDefinition() { return EmployeeProfileRow; }
    protected getService() { return EmployeeProfileService.baseUrl; }
    private rowSelection: GridRowSelectionMixin;
 
    public RowIdWithInitialisedLeave: number[] = [];
    public RowIdOfEmployees: number[] = [];



    public AnnualLeaveStartingRange: number[] = [];
    public SickLeaveStartingRange: number[] = [];
    public AnnualLeaveEndingRange: number[] = [];
    public SickLeaveEndingRange: number[] = [];
    public EntitledAnnualLeave: number[] = [];
    public EntitledSickLeave: number[] = [];
    public MaternalLeave: number;
    public PaternalLeave: number;
    public CompassionateLeave: number;
    public MarriageLeave: number;
    public HospitalisationLeave: number;




    public PrevYearAnnualLeaveStartingRange: number[] = [];
    public PrevYearSickLeaveStartingRange: number[] = [];
    public PrevYearAnnualLeaveEndingRange: number[] = [];
    public PrevYearSickLeaveEndingRange: number[] = [];
    public PrevYearEntitledAnnualLeave: number[] = [];
    public PrevYearEntitledSickLeave: number[] = [];
    public PrevYearMaternalLeave: number;
    public PrevYearPaternalLeave: number;
    public PrevYearCompassionateLeave: number;
    public PrevYearMarriageLeave: number;
    public PrevYearHospitalisationLeave: number;





    public RenewCompanySettings: boolean;
    public LeaveRefreshDate:string;

    public DynamicList: any[] = [];
    public LeaveRenewMethod: number;
    public LeaveEntitlementMethod: number;

    public UserID: number[] = [];
    public EmployeeRowID: number[] = [];
    protected getAddButtonCaption() {
        return "Create Employee Profile";
    }
    constructor(container: JQuery)
    {

        super(container);
        /*
        interface MyInterface
        {
            EmployeeRowID: number;
            CurrentEntitlement: number;
            Next_renewal_date: string;
            Policy_end_date: string;
            Policy_start_date: string;
        }

        let dynamicList: MyInterface[] = [];

        EntitledLeaveService.List({
        }, response => {

            for (var index in response.Entities)
            {
                this.RowIdWithInitialisedLeave.push(response.Entities[index].EmployeeRowId)
                var PolicyStartDate = new Date(response.Entities[index].CurrentPolicyEndDate.substring(0, 10))
                PolicyStartDate.setFullYear(PolicyStartDate.getFullYear() - 1)
                const year = PolicyStartDate.getFullYear();
                const month = PolicyStartDate.getMonth() + 1; // Note: January is 0, so we add 1
                const day = PolicyStartDate.getDate();

                var PolicyStartDateString = `${year}-${month}-${day}`



                dynamicList.push({
                    EmployeeRowID: response.Entities[index].EmployeeRowId,
                    Next_renewal_date: response.Entities[index].NextEntitlementDate.substring(0, 10),
                    CurrentEntitlement: response.Entities[index].EntitledAnnualLeave,
                    Policy_end_date: response.Entities[index].CurrentPolicyEndDate.substring(0, 10),
                    Policy_start_date: PolicyStartDateString
                });

            }

            this.DynamicList = dynamicList

        });

        AnnualLeavePolicyService.List({
        }, response => {
            console.log(response)
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const PrevYear = currentYear - 1;

            for (var index in response.Entities)
            {
                if (response.Entities[index].Year == currentYear)
                {aaa

                    this.AnnualLeaveStartingRange.push(response.Entities[index].ServiceFromYear)
                    this.AnnualLeaveEndingRange.push(response.Entities[index].ServiceUntilYear)
                    this.EntitledAnnualLeave.push(response.Entities[index].EligibleDays)
                }
                else if (response.Entities[index].Year == PrevYear) {

                    this.PrevYearAnnualLeaveStartingRange.push(response.Entities[index].ServiceFromYear)
                    this.PrevYearAnnualLeaveEndingRange.push(response.Entities[index].ServiceUntilYear)
                    this.PrevYearEntitledAnnualLeave.push(response.Entities[index].EligibleDays)
                }
            }


        });

        SickLeavePolicyService.List({
        }, response => {
            console.log(response)
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const PrevYear = currentYear - 1;

            for (var index in response.Entities)
            {
                if (response.Entities[index].Year == currentYear) {


                    this.SickLeaveStartingRange.push(response.Entities[index].ServiceFromYear)
                    this.SickLeaveEndingRange.push(response.Entities[index].ServiceUntilYear)
                    this.EntitledSickLeave.push(response.Entities[index].EligibleDays)


                }
                else if (response.Entities[index].Year == PrevYear) {

                    this.PrevYearSickLeaveStartingRange.push(response.Entities[index].ServiceFromYear)
                    this.PrevYearSickLeaveEndingRange.push(response.Entities[index].ServiceUntilYear)
                    this.PrevYearEntitledSickLeave.push(response.Entities[index].EligibleDays)
                }
            }

        });

        InitYearService.List({
        }, response => {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const PrevYear = currentYear - 1;

            for (var index in response.Entities)
            {
                if (response.Entities[index].Year == currentYear)
                {
                    this.MaternalLeave = response.Entities[index].MaternityLeave
                    this.PaternalLeave = response.Entities[index].PaternityLeave
                    this.CompassionateLeave = response.Entities[index].CompassionateLeave
                    this.MarriageLeave = response.Entities[index].MarriageLeave
                    this.HospitalisationLeave = response.Entities[index].HospitalisationLeave
                }

                else if (response.Entities[index].Year == PrevYear) {
                    this.PrevYearMaternalLeave = response.Entities[index].MaternityLeave
                    this.PrevYearPaternalLeave = response.Entities[index].PaternityLeave
                    this.PrevYearCompassionateLeave = response.Entities[index].CompassionateLeave
                    this.PrevYearMarriageLeave = response.Entities[index].MarriageLeave
                    this.PrevYearHospitalisationLeave = response.Entities[index].HospitalisationLeave
                }
            }
        });

        CompanySettingsService.List({
        }, response => {

            if (response.Entities[0].RefreshLeaveOnSpecificDate == true)
                this.LeaveRenewMethod = 1

            else if (response.Entities[0].RefreshLeaveOnYearOfService == true)
                this.LeaveRenewMethod = 2








            if (response.Entities[0].MonthlyEntitlementAnnualLeave == true)
                this.LeaveEntitlementMethod = 1

            else if (response.Entities[0].OneOffEntitlementAnnualLeave == true)
                this.LeaveEntitlementMethod = 2

       

            var LeaveRefresh = new Date(response.Entities[0].LeaveRefreshDate)
            var LeaveRefreshYear = LeaveRefresh.getFullYear()
            const today = new Date();
            const todayYear = today.getFullYear();

            if (LeaveRefreshYear != todayYear || today > LeaveRefresh )
            {

                LeaveRefresh.setFullYear(todayYear)
                if (today > LeaveRefresh)
                    LeaveRefresh.setFullYear(LeaveRefresh.getFullYear() + 1)

                this.RenewCompanySettings = true;

                const year = LeaveRefresh.getFullYear();
                const month = LeaveRefresh.getMonth() + 1; // Note: January is 0, so we add 1
                const day = LeaveRefresh.getDate();

                this.LeaveRefreshDate = `${year}-${month}-${day}`

            }

            else
            {
                const year = LeaveRefresh.getFullYear();
                const month = LeaveRefresh.getMonth() + 1; // Note: January is 0, so we add 1
                const day = LeaveRefresh.getDate();

                this.LeaveRefreshDate = `${year}-${month}-${day}`

            }
        });
        */



    }
    protected getQuickFilters() {
        let items = super.getQuickFilters();
        return items;
    }
    



    protected onViewProcessData(response: ListResponse<EmployeeProfileRow>)
    {
        response = super.onViewProcessData(response);
        this.toolbar.findButton("column-picker-button").toggle(false);
        var EmployeeProfileData = response.Entities
        /*
        for (var index in EmployeeProfileData) {
            var IdRow = EmployeeProfileData[index].Id
            EmployeeProfileService.Retrieve({
                EntityId: IdRow
            }, response => {
                var Today = new Date()
                var Birthday = new Date(response.Entity.Birthday)
                var age = Today.getFullYear() - Birthday.getFullYear() - ((Today.getMonth() < Birthday.getMonth() ||
                    (Today.getMonth() === Birthday.getMonth() && Today.getDate() < Birthday.getDate())) ? 1 : 0);
                if (age != EmployeeProfileData[index].Age)
                    EmployeeProfileService.Update({
                        EntityId: IdRow,
                        Entity:
                        {
                            "Age": age
                        },
                    });
            })
        }
        */
        this.RowIdOfEmployees.length = 0
        /*
       
        //convert to sql
        function isLeapYear(year: number): boolean {
            return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        }

        function getDifference(list1: number[], list2: number[]): number[]
        {
            return list1.filter(item => !list2.includes(item));
        }
        //convert to sql
        function calculateYearsOfService(recruitmentDate: Date, currentDate: Date): number {
            const YearOfService = currentDate.getFullYear() - recruitmentDate.getFullYear();
            const recruitmentMonth = recruitmentDate.getMonth();
            const currentMonth = currentDate.getMonth();
            const recruitmentDay = recruitmentDate.getDate();
            const currentDay = currentDate.getDate();

            // Check if the current date is before the recruitment date
            if (currentMonth < recruitmentMonth || (currentMonth === recruitmentMonth && currentDay < recruitmentDay)) {
                return YearOfService - 1; // Adjust the years if necessary
            }

            return YearOfService;
        }
        //convert to sql
        function create_record(Current_entitled_leave,ResponseEntities, recruitmentdate, LeaveRenewMethod, LeaveRefreshDate, LeaveEntitlementMethod
            , AnnualLeaveStartingRange, SickLeaveStartingRange, AnnualLeaveEndingRange, ListOfEntitledAnnualLeave,
            ListOfEntitledSickLeave, SickLeaveEndingRange, MarriageLeave, MaternalLeave, HospitalisationLeave, PaternalLeave,CompassionateLeave)
        {
            //LeaveEntitlementMethod
            //1:monthly
            //2:all at once
            var Today = new Date()
            var next_year_flag = false
            var year = Today.getFullYear()
            var RecruitmentDate = new Date(recruitmentdate)
            var NextEntitlementDate
            var NextEntitlementDateString
            if (LeaveRenewMethod == 1)//Specific date
            {
                var buffer = new Date(LeaveRefreshDate)
                if (Today > buffer)
                    buffer.setFullYear(buffer.getFullYear() + 1)
                var ProjectedRenewalDate = buffer
                const ProjectedRenewalDateYear = buffer.getFullYear();
                const ProjectedRenewalDateMonth = buffer.getMonth() + 1; // Note: January is 0, so we add 1
                const ProjectedRenewalDateDay = buffer.getDate();
                var ProjectedRenewalDateString = `${ProjectedRenewalDateYear}-${ProjectedRenewalDateMonth}-${ProjectedRenewalDateDay}`;
            }
            else if (LeaveRenewMethod == 2)//Year of service // now
            {
                var ProjectedRenewalDate = new Date(recruitmentdate)
                var YearDiff = year - ProjectedRenewalDate.getFullYear()
                ProjectedRenewalDate.setFullYear(ProjectedRenewalDate.getFullYear() + YearDiff)
                if (Today > ProjectedRenewalDate)
                {
                    ProjectedRenewalDate.setFullYear(ProjectedRenewalDate.getFullYear() + 1)
                    next_year_flag = true
                }
                const ProjectedRenewalDateYear = ProjectedRenewalDate.getFullYear();
                const ProjectedRenewalDateMonth = ProjectedRenewalDate.getMonth() + 1; // Note: January is 0, so we add 1
                const ProjectedRenewalDateDay = ProjectedRenewalDate.getDate();
                var ProjectedRenewalDateString = `${ProjectedRenewalDateYear}-${ProjectedRenewalDateMonth}-${ProjectedRenewalDateDay}`;
            }
            var yearsOfService = calculateYearsOfService(RecruitmentDate, Today);
            var EntitledAnnualLeave = 0
            var EntitledSickLeave = 0
            for (var x in AnnualLeaveStartingRange)
            {
                if (yearsOfService >= AnnualLeaveStartingRange[x] && yearsOfService <= AnnualLeaveEndingRange[x]) {
                    EntitledAnnualLeave = ListOfEntitledAnnualLeave[x]
                    break
                }
            }
            for (var y in SickLeaveStartingRange)
            {
                if (yearsOfService >= SickLeaveStartingRange[y] && yearsOfService <= SickLeaveEndingRange[y]) {
                    EntitledSickLeave = ListOfEntitledSickLeave[y]
                    break
                }
            }
            if (LeaveEntitlementMethod == 1)//monthly
            {
                var PolicyStartingDate = new Date(ProjectedRenewalDate)
                PolicyStartingDate.setFullYear(PolicyStartingDate.getFullYear() - 1)
                var monthsPassed = (Today.getMonth() - PolicyStartingDate.getMonth());
                PolicyStartingDate.setMonth(PolicyStartingDate.getMonth() + monthsPassed)
                if (Today > PolicyStartingDate)
                {
                    PolicyStartingDate.setMonth(PolicyStartingDate.getMonth() + 1)
                    monthsPassed = monthsPassed + 1
                }
                NextEntitlementDate = PolicyStartingDate
                const NextEntitlementDateYear = NextEntitlementDate.getFullYear();
                const NextEntitlementDateMonth = NextEntitlementDate.getMonth(); // Note: January is 0, so we add 1
                const NextEntitlementDateDay = NextEntitlementDate.getDate();
                NextEntitlementDateString = `${NextEntitlementDateYear}-${NextEntitlementDateMonth}-${NextEntitlementDateDay}`;
                
                var LeapYear = isLeapYear(PolicyStartingDate.getFullYear())
           
                if (next_year_flag == true
                    && ((monthsPassed == 1 && LeapYear == false) || (monthsPassed == 2 && LeapYear == true)))// last entitlement for year
                    monthsPassed = 13

                else if ((monthsPassed == 2 && LeapYear==false) || (LeapYear == true && monthsPassed == 1)) // first entitlement every year
                {
                    EntitledAnnualLeave = EntitledAnnualLeave / 12.0 

                    serviceCall<RetrieveResponse<any>>({
                        service: EntitledLeaveService.baseUrl + '/CalculateCarryForward',
                        data: {
                            'EmployeeID': ResponseEntities.ID
                        },
                        method: "GET",
                        async: false,
                        onSuccess: (response) => {
                            console.log(response)
                        },
                        onError: (error) => {
                            console.log(error.Error);
                        }
                    });


                }

                else
                
                    EntitledAnnualLeave = Current_entitled_leave + EntitledAnnualLeave / 12.0 


            }

            else
            {
                const NextEntitlementDateYear = NextEntitlementDate.getFullYear();
                const NextEntitlementDateMonth = NextEntitlementDate.getMonth() + 1; // Note: January is 0, so we add 1
                const NextEntitlementDateDay = NextEntitlementDate.getDate();
                NextEntitlementDateString = `${NextEntitlementDateYear}-${NextEntitlementDateMonth}-${NextEntitlementDateDay}`;
            }


            if (EntitledAnnualLeave > 0)
            {
                if (ResponseEntities.MaritalStatus == 1)//if married, entitle maternity or paternity leave
                {

                    if (ResponseEntities.Sex == 1)//male  
                    {
                        EntitledLeaveService.Create({
                            Entity:
                            {
                                "EmployeeRowId": ResponseEntities.Id,
                                "EntitledMarriageLeave": MarriageLeave,
                                "EntitledMaternityLeave": MaternalLeave,
                                "EntitledHospitalisationLeave": HospitalisationLeave,
                                "EntitledSickLeave": EntitledSickLeave,
                                "EntitledAnnualLeave": EntitledAnnualLeave,
                                "CurrentPolicyEndDate": ProjectedRenewalDateString,
                                "NextEntitlementDate": NextEntitlementDate,
                                "EntitledCompassionateLeave": CompassionateLeave
                            },
                        });
                    }

                    else {

                        EntitledLeaveService.Create({
                            Entity:
                            {
                                "EmployeeRowId": ResponseEntities.Id,
                                "EntitledMarriageLeave": MarriageLeave,
                                "EntitledPaternityLeave": PaternalLeave,
                                "EntitledHospitalisationLeave": HospitalisationLeave,
                                "EntitledSickLeave": EntitledSickLeave,
                                "EntitledAnnualLeave": EntitledAnnualLeave,
                                "CurrentPolicyEndDate": ProjectedRenewalDateString,
                                "NextEntitlementDate": NextEntitlementDate,
                                "EntitledCompassionateLeave": CompassionateLeave

                            },
                        });

                    }




                }

                else {
                    EntitledLeaveService.Create({
                        Entity:
                        {
                            "EmployeeRowId": ResponseEntities.Id,
                            "EntitledMarriageLeave": MarriageLeave,
                            "EntitledHospitalisationLeave": HospitalisationLeave,
                            "EntitledSickLeave": EntitledSickLeave,
                            "EntitledAnnualLeave": EntitledAnnualLeave,
                            "CurrentPolicyEndDate": ProjectedRenewalDateString,
                            "NextEntitlementDate": NextEntitlementDate,
                            "EntitledCompassionateLeave": CompassionateLeave

                        },
                    });


                }
            }
            


        }
    
        var differenceList: number[] = getDifference(this.RowIdOfEmployees, this.RowIdWithInitialisedLeave);
        var newlyCreatedList: number[] = []
        for (var index in response.Entities)//create leave entitlement record for those who still dont have
        {
            const today = new Date();
            const year = today.getFullYear();

            if (differenceList.includes(response.Entities[index].Id)) 
            {

                newlyCreatedList.push(response.Entities[index].Id)
                if (this.LeaveRenewMethod == 1)//Specific date
                {
                    var buffer = new Date(this.LeaveRefreshDate)
                    if (today > buffer)
                    {
                        create_record(null,response.Entities[index], response.Entities[index].RecruitmentDate.substring(0, 10), this.LeaveRenewMethod, this.LeaveRefreshDate, this.LeaveEntitlementMethod,
                            this.AnnualLeaveStartingRange, this.SickLeaveStartingRange, this.AnnualLeaveEndingRange, this.EntitledAnnualLeave, this.EntitledSickLeave,
                            this.SickLeaveEndingRange, this.MarriageLeave, this.MaternalLeave, this.HospitalisationLeave, this.PaternalLeave, this.CompassionateLeave)
                    }
                    else
                    {
                        create_record(null, response.Entities[index], response.Entities[index].RecruitmentDate.substring(0, 10), this.LeaveRenewMethod, this.LeaveRefreshDate, this.LeaveEntitlementMethod,
                            this.PrevYearAnnualLeaveStartingRange, this.PrevYearSickLeaveStartingRange, this.PrevYearAnnualLeaveEndingRange, this.PrevYearEntitledAnnualLeave, this.PrevYearEntitledSickLeave,
                            this.PrevYearSickLeaveEndingRange, this.PrevYearMarriageLeave, this.PrevYearMaternalLeave, this.PrevYearHospitalisationLeave, this.PrevYearPaternalLeave, this.PrevYearCompassionateLeave)
                    }
                }
                else if (this.LeaveRenewMethod == 2)//Year of service // now
                {
                    var ProjectedRenewalDate = new Date(response.Entities[index].RecruitmentDate.substring(0, 10))
                    var YearDiff = year - ProjectedRenewalDate.getFullYear()
                    if (today > ProjectedRenewalDate)
                    {
                        create_record(null,response.Entities[index], response.Entities[index].RecruitmentDate.substring(0, 10), this.LeaveRenewMethod, this.LeaveRefreshDate, this.LeaveEntitlementMethod,
                            this.AnnualLeaveStartingRange, this.SickLeaveStartingRange, this.AnnualLeaveEndingRange, this.EntitledAnnualLeave, this.EntitledSickLeave,
                            this.SickLeaveEndingRange, this.MarriageLeave, this.MaternalLeave, this.HospitalisationLeave, this.PaternalLeave, this.CompassionateLeave)
                    }
                    else
                    {
                        create_record(null, response.Entities[index], response.Entities[index].RecruitmentDate.substring(0, 10), this.LeaveRenewMethod, this.LeaveRefreshDate, this.LeaveEntitlementMethod,
                            this.PrevYearAnnualLeaveStartingRange, this.PrevYearSickLeaveStartingRange, this.PrevYearAnnualLeaveEndingRange, this.PrevYearEntitledAnnualLeave, this.PrevYearEntitledSickLeave,
                            this.PrevYearSickLeaveEndingRange, this.PrevYearMarriageLeave, this.PrevYearMaternalLeave, this.PrevYearHospitalisationLeave, this.PrevYearPaternalLeave, this.PrevYearCompassionateLeave)
                    }
                }
            }
        }
        */
        return response;
    }
    protected createToolbarExtensions() { //creates the selector
        super.createToolbarExtensions();
        this.rowSelection = new GridRowSelectionMixin(this, {
            selectable: (item: EmployeeProfileRow) => {
                return true;
            }
        });
    }
    protected getColumns() {
        DataGrid.defaultRowHeight = 100;
        var columns = super.getColumns();
        columns.splice(0, 0, {
            field: 'Employee Leave',
            name: '',
            format: ctx => {
                var button = '<a class="inline-action leave-application" title="leave"><i class="fa fa-plane"></i></a>'
                    + '<br>'
                    + '<a class="inline-action employee-post" title="employee profile edit history"><i class="fa fa-wrench"></i></a>';
                return button

            },
            width: 12,
            minWidth: 12,
            maxWidth: 12
        });

        columns.splice(0, 0, {
            field: 'Employee Shift History',
            name: '',
            format: ctx => {
                var button = '<a class="inline-action shift-history" title="shift history"><i class="fa fa-book"></i></a>'
                    + '<br>'
                    + '<a class="inline-action basic-info" title="basic info"> <i class="fa fa-user-tie"></i></a>';
                return button
            },
            width: 12,
            minWidth: 12,
            maxWidth: 12
        });
        /*
        columns.splice(0, 0, {
            field: 'Employee Leave',
            name: '',
            format: ctx => {
                var button = '<a class="inline-action leave-application" title="leave"><i class="fa fa-plane"></i></a>'
                    + '<br>'
                    + '<a class="inline-action money-claiming" title="money claiming"><i class="fa fa-money-bill-wave"></i></a>';
                return button
            },
            width: 12,
            minWidth: 12,
            maxWidth: 12
        });
        columns.splice(0, 0, {
            field: 'Employee Shift History',
            name: '',
            format: ctx => {
                var button = '<a class="inline-action shift-history" title="shift history"><i class="fa fa-book"></i></a>'
                    + '<br>'
                    + '<a class="inline-action basic-info" title="basic info"> <i class="fa fa-user-tie"></i></a>';
                return button
            },
            width: 12,
            minWidth: 12,
            maxWidth: 12
        });
        columns.splice(0, 0, {
            field: 'Employee Accounts',
            name: '',
            format: ctx => {
                var button = '<a class="inline-action payment-accounts" title="payment & accounts"> <i class="fa fa-dollar-sign"></i></a>'
                    + '<br>'
                    + '<a class="inline-action employee-post" title="employee profile edit history"><i class="fa fa-wrench"></i></a>';
                return button
            },
            width: 12,
            minWidth: 12,
            maxWidth: 12
        });
        */

      /*
        columns.splice(0, 0, {
            field: 'Employee Basic Info',
            name: '',
            format: ctx => {
                var button = '<a class="inline-action basic-info" title="basic info"> <i class="fa fa-user-tie"></i></a>';
                return button
            },
            width: 12,
            minWidth: 12,
            maxWidth: 12
        });
        */
        return columns;
    }
    protected getButtons() {
        var buttons = super.getButtons();
        var self = this;
        if (Authorization.hasPermission(PermissionKeys.HumanResources)) {
            buttons.push({
                title: 'Batch User Creation',
                cssClass: 'apply-changes-button',
                onClick: e => {
                    confirm(
                        "Do you want to create users in batch?",
                        () => {
                            var CreateUserDialog = new UserCreationDialog()
                            CreateUserDialog.dialogOpen()
                            CreateUserDialog.element.on("dialogclose", function () {
                                self.internalRefresh();
                            })


                        }
                    )
                },
                separator: true
            });
        }
        return buttons;
    }

    protected onClick(e: JQueryEventObject, row: number, cell: number) {
        super.onClick(e, row, cell);
        if (e.isDefaultPrevented())
            return;
        // get reference to current item
        var item = this.itemAt(row);
        // get reference to clicked element
        var target = $(e.target);
        if (target.parent().hasClass('inline-action'))
            target = target.parent();

        if (target.hasClass('basic-info')) {
            confirm("Do you want to view basic employee data?", () =>
            {
                var dlg = new EmployeeBasicDataDialog(item.Id)
                dlg.loadByIdAndOpenDialog(item.Id)
                dlg.set_readOnly(true);
                dlg.element.on("dialogopen", function () {
                })

            });
        }
        if (target.hasClass('employee-post')) {
            confirm("Do you want to view employee profile edit history?", () =>
            {
                var dlg = new EmployeeEditHistoryDialog(item.Id)
                //dlg.set_readOnly(true);
                dlg.dialogOpen();

            });
        }
        /*
        if (target.hasClass('payment-accounts')) {
            confirm("Do you want to view employee payment and accounts?", () =>
            {

            });
        }

        if (target.hasClass('money-claiming')) {
            confirm("Do you want to view money claiming details?", () =>
            {

            });
        }
        */
        if (target.hasClass('leave-application')) {
            confirm("Do you want to view leave details?", () =>
            {
                EntitledLeaveService.List({
                }, response => {
                    var ListBuffer = response.Entities.filter(buffer => buffer.EmployeeRowId === item.Id);
                    ListBuffer.sort((a, b) => {
                        const dateA = new Date(a.NextEntitlementDate).getTime();
                        const dateB = new Date(b.NextEntitlementDate).getTime();
                        return dateA - dateB;
                    });
                    var dlg = new EntitledLeaveDialog(item.Id);
                    dlg.loadByIdAndOpenDialog(ListBuffer[ListBuffer.length - 1].Id);
                });
            });
        }
        if (target.hasClass('shift-history')) {
            confirm("Do you want to view the shift history?", () => {
                var dlg = new ViewShiftHistoryDialog(item.EmployeeID,item.Id);
                dlg.dialogOpen();

            });
        }

    }

}
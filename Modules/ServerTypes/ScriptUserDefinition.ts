export interface ScriptUserDefinition {
    Username?: string;
    DisplayName?: string;
    IsAdmin?: boolean;
    EmployeeRowID?: number;
    UserId?: number;
    Permissions?: { [key: string]: boolean };
}
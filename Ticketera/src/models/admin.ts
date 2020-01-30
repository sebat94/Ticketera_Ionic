import { IUser } from "./user";

export interface IAdmin {
    id: number;
    fk_admin_user?: number;
}

export interface IAdminComplete {
    id: number;
    fk_admin_user?: IUser;
}
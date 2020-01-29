export interface IUser {
    id?: number,
    name: string,
    email: string,
    password?: string,
    repeatPassword?: string,
    avatar?: string,
    lat?: number,
    lng?: number,
    id_google?: string,
    id_facebook?: string
}
export interface IUser {
    id?: number,
    name?: string,
    lastname?: string,
    email: string,
    gender?: number,
    birthdate?: string,
    active?: number,
    dni?: string,
    image?: string,

    password?: string,
    repeatPassword?: string,
    
    /* INTRODUCIR CAMPOS EN BBDD
    id_google?: string,
    id_facebook?: string*/
}
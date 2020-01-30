import { IUser } from './user';
import { IEvent } from './event';
import { ITypeTicket } from './type_ticket';
import { IBuilding } from './building';

export interface OkResponse {
  ok: boolean,
  errorMessage?: string,
  result?: any
}

// User
export interface ResponseUser extends OkResponse {
    user: IUser;
}
export interface ResponseUsers extends OkResponse {
    users: IUser[];
}

// Event
export interface ResponseEvent extends OkResponse {
    event: IEvent;
}
export interface ResponseEvents extends OkResponse {
    events: IEvent[];
}

// TypeTicket
export interface ResponseTypeTicket extends OkResponse {
    ticket: ITypeTicket;
}
export interface ResponseTypeTickets extends OkResponse {
    tickets: ITypeTicket[];
}

/*--      JAVA         --*/

export interface OkResponseEvent {
    code: number,
    eventsWithImages: IEventWithImages
}
export interface IEventWithImages {
    event: IEvent,
    eventImages: {
        id?: number,
        image?: string,
        /*date?: string,
        dateToString?: string,
        building?: IBuilding*/
    }
}

export interface OkResponseLogin {
    code?: number,  // Opcional para setear los datos del usuario con la interfaz desde el storage sin el 'code'
    authtoken: string,
    id: number
    email: string,
    rol: string
}

export interface IUserLogged {
    code: number,
    message?: string,
    user: IUser
}

export interface IBasicResponse {
    code: number,
    message?: string
}

// FILTERS - opcionales para poder asignar a objeto vacío la variable con esta interfaz y también porque no necesariamente se enviarán todos los filtros(TODO)
export interface IFiltersResponse {
    minPrice?: number,
    maxPrice?: number
    dateMin?: string,
    dateMax?: string
}

// HEADER
export interface IHeaderInfo {
    title: string,
    isLogged: boolean,
    rol: string,
    canGoBack: boolean
}
import { IUser } from './user';
import { IEvent } from './event';

export interface OkResponse {
  error: boolean,
  errorMessage?: string,
  result?: any
}


export interface ResponseUser extends OkResponse {
    user: IUser;
}

export interface ResponseUsers extends OkResponse {
    users: IUser[];
}

export interface ResponseEvent extends OkResponse {
    event: IEvent;
}

export interface ResponseEvents extends OkResponse {
    events: IEvent[];
}
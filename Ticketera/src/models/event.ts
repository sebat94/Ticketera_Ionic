import { IBuilding } from './building';
import { DateTime } from "ionic-angular";

export interface IEvent {
    id: number;
    name?: string;
    date?: DateTime;
    finishDate?: DateTime;
    dateToString?: string;
    imagePdf?: string;
    building?: IBuilding;
}

// Events page (home)
export interface IEventHome {
    id: number;
    date?: DateTime;
    date_to_string?: string;
    name?: string;
    fk_event_building?: IBuilding;  // Necesito el nombre del building, no la fk, ej: pachá
}


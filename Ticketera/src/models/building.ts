import { ICity } from "./city";
import { ICompany } from "./company";

export interface IBuilding {
    id: number;
    name?: string;
    address?: string;
    lat: number;
    lon: number;
    company?: ICompany;
    city?: ICity;
    image?: string;
    active?: boolean;
    type?: string;
    direccion?: string;
}
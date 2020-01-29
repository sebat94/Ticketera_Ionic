export interface IEvent {
    id?: number;
    //creator: ICreator;
    creator?: number;
    title: string;
    description: string;
    date: string;
    price: number;
    lat?: number;
    lng?: number;
    address?: string;
    image: string;
    numAttend?: number;
    mine?: boolean;
    assist?: number;
    distance?: number;
}
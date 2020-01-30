export interface ITypeTicket {
    id: number;
    amount_sold: number;
    name?: string;
    price?: number;
    total_amount: number;
    fk_typeticket_event?: number;
}
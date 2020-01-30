export interface ticket {
    id: number;
    active: number;
    fk_ticket_rrpp_seller?: number;
    fk_ticket_typeticket?: number;
    fk_ticket_user?: number;
}
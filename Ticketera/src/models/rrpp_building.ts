export interface IRrppBuilding {
    id: number;
    active?: number;
    comission: number;
    fk_rrppbuilding_building?: number;
    fk_rrppbuilding_rrpp?: number;
}
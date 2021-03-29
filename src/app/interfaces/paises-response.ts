export interface PaisesResponse {
    status:        string;
    statusCode:    number;
    version:       string;
    total:         number;
    limit:         number;
    offset:        number;
    access:        string;
    data:          DataPaises;
}

export interface DataPaises {
    DZ: Pais;
    AO: Pais;
    BJ: Pais;
    BW: Pais;
    BF: Pais;
    BI: Pais;
    CV: Pais;
    CM: Pais;
    CF: Pais;
    TD: Pais;
}

export interface Pais {
    country: string;
    region:  Region;
}

export enum Region {
    Africa = "Africa",
}


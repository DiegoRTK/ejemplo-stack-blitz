import { ZoneProps } from "./zone";
export interface LocationPropsObj {
    locationName: string;
    address:      string;
    addressNro:   string;
    fullAddress:  string;
    zoneId:       number;
}

export interface LocationProps {
    locationId?:   number;
    locationName: string;
    address:      string;
    addressNro:   string;
    fullAddress:  string;
    createdAt?:    Date;
    zone:         ZoneProps;
}
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { ApiResources } from "../helpers/api.resources";
import { LocationProps, LocationPropsObj } from "../models/location";

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    constructor(private baseService: BaseService) {}

    public createLocation(location: LocationPropsObj): Observable<LocationProps> {
        return this.baseService.httpPost(ApiResources.location.base, location)
    }

    public getLocations(): Observable<Array<LocationProps>> {
        return this.baseService.httpGet(ApiResources.location.base)
    }

    public getAddress(address: string): Observable<Array<{address:string}>> {
        return this.baseService.httpGet(ApiResources.addres.byAddress(address))
    }

    public deleteLocation(locationId: number): Observable<LocationProps> {
        return this.baseService.httpDelete(ApiResources.location.byId(locationId))
    }

    public updateLocation(locationId: number, location:LocationPropsObj): Observable<LocationProps> {
        return this.baseService.httpPut(ApiResources.location.byId(locationId), location)
    }

}
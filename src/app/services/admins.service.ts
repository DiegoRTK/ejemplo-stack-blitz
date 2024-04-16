import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { ApiResources } from "../helpers/api.resources";
import { AccountProps } from "../models/account";

@Injectable({
    providedIn: 'root'
})
export class AdminsService {

    constructor(private baseService: BaseService) {}

    public createAdministrador(user: AccountProps): Observable<AccountProps> {
        return this.baseService.httpPost(ApiResources.account.signupAdmin, user)
    }

    public createAgent(user: AccountProps): Observable<AccountProps> {
        return this.baseService.httpPost(ApiResources.account.signupAgent, user)
    }

    public getUsers(): Observable<Array<AccountProps>> {
        return this.baseService.httpGet(ApiResources.account.base)
    }
}
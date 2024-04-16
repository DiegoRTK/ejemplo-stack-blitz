import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppointmentsHomeComponent } from "./appointments-home/appointments-home.component";

const routes: Routes = [
    {
        path: '',
        component: AppointmentsHomeComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
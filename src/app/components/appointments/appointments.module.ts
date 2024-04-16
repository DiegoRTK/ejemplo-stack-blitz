import { NgModule } from "@angular/core";
import { AppointmentsHomeComponent } from "./appointments-home/appointments-home.component";
import { SharedModule } from "src/app/shared/shared.module";
import { AppointmentsListComponent } from './appointments-list/appointments-list.component';

@NgModule({
    declarations: [
        AppointmentsHomeComponent,
        AppointmentsListComponent
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        AppointmentsListComponent
    ]
})
export class AppointmentsModule { }
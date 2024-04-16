import { NgModule } from "@angular/core";
import { ConfigurationAgentsHomeComponent } from './configuration-agents/configuration-agents-home/configuration-agents-home.component';
import { SharedModule } from "src/app/shared/shared.module";
import { ConfigurationAppointmentsTypeComponent } from './configuration-appointments-type/configuration-appointments-type.component';
import { ConfigurationAttentionCentersComponent } from './configuration-attention-centers/configuration-attention-centers.component';
import { ConfigurationAdministratorsComponent } from './configuration-administrators/configuration-administrators.component';

@NgModule({
    declarations: [
    ConfigurationAgentsHomeComponent,
    ConfigurationAppointmentsTypeComponent,
    ConfigurationAttentionCentersComponent,
    ConfigurationAdministratorsComponent
  ],
    imports: [
      SharedModule
    ],
    exports: []
})
export class ConfigurationModule { }
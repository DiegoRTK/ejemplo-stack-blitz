import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConfigurationAgentsHomeComponent } from "./configuration-agents/configuration-agents-home/configuration-agents-home.component";
import { ConfigurationAppointmentsTypeComponent } from "./configuration-appointments-type/configuration-appointments-type.component";
import { ConfigurationAttentionCentersComponent } from "./configuration-attention-centers/configuration-attention-centers.component";
import { ConfigurationAdministratorsComponent } from "./configuration-administrators/configuration-administrators.component";

const routes: Routes = [
    {
        path: 'agentes',
        component: ConfigurationAgentsHomeComponent
    },
    {
        path: 'citas',
        component: ConfigurationAppointmentsTypeComponent
    },
    {
        path: 'centros-atencion',
        component: ConfigurationAttentionCentersComponent
    },
    {
        path: 'administradores',
        component: ConfigurationAdministratorsComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
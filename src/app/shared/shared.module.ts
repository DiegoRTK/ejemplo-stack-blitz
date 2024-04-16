import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { NgbModule, NgbCollapseModule, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './sidebar/sidebar.component';
import { IconsModule } from './icons.module';
import { BaseComponent } from './base/base.component';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './button/button.component';
import { DatatableComponent } from './datatable/datatable.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SelectComponent } from './select/select.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LoadingComponent } from './loading/loading.component';
import { ModalComponent } from './modal/modal.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { HasRoleDirective } from '../directives/has-role.directive';
import { CheckboxComponent } from './checkbox/checkbox.component';

@NgModule({
  declarations: [
    SidebarComponent,
    BaseComponent,
    InputComponent,
    ButtonComponent,
    DatatableComponent,
    SelectComponent,
    LoadingComponent,
    ModalComponent,
    AutocompleteComponent,
    HasRoleDirective,
    CheckboxComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgbCollapseModule,
    IconsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgbDatepickerModule,
    NgbDatepickerModule,
    JsonPipe
  ],
  exports: [
    CommonModule,
    NgbModule,
    NgbCollapseModule,
    SidebarComponent,
    IconsModule,
    InputComponent,
    ButtonComponent,
    DatatableComponent,
    SelectComponent,
    LoadingComponent,
    ModalComponent,
    AutocompleteComponent,
    HasRoleDirective,
    CheckboxComponent
  ]
})
export class SharedModule { }

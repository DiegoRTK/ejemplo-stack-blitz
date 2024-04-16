import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent {
  @Input() control: FormControl = new FormControl();
  @Input() options: { label: string; value: any }[] = [];
  @Output() optionSelected = new EventEmitter<any>();

  public filteredOptions: { label: string; value: any }[] = [];

  constructor() {}

  filterOptions(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredOptions = this.options.filter(option =>
      option.label.toLowerCase().includes(searchValue)
    );
  }

  selectOption(option: any): void {
    this.optionSelected.emit(option);
    this.control.setValue(option.label); // Establecer el valor del control con la etiqueta seleccionada
    this.filteredOptions = []; // Limpiar las opciones filtradas después de seleccionar
  }
}

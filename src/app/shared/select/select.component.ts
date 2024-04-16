import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, AfterContentChecked {

  @Input() control: AbstractControl = new FormControl();
  @Input() label: string | undefined;
  @Input() options: Record<string | number, string | number>[] = [];
  @Input() placeholder: string = '';
  @Input() multiple: boolean = false;
  @Input() showLabel = true;

  public dropdownSettings: IDropdownSettings = {};
  public selectedItems: Record<string | number, string | number>[] = [];

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: !this.multiple,
      idField: 'value',
      textField: 'label',
      selectAllText: 'Seleccionar todos',
      unSelectAllText: 'Limpiar selección',
      itemsShowLimit: 4,
      allowSearchFilter: true,
      searchPlaceholderText: 'Buscar...',
      noFilteredDataAvailablePlaceholderText: 'Sin coincidencias...',
      noDataAvailablePlaceholderText: 'No hay opciones disponibles'
    };
  }

  ngAfterContentChecked(): void {
    this.updateSelectedItems();
    this.control.valueChanges.subscribe(() => {
      this.updateSelectedItems();
    });
  }

  private updateSelectedItems(): void {
    const selectedValue = this.control.value;
    const selectedOption = this.options.find(option => option['value'] === selectedValue);
    if (selectedOption) {
      this.selectedItems = [selectedOption];
      this.transformControl.setValue(this.selectedItems)
    } else {
      this.selectedItems = [];
    }
  }

  onItemDeSelect(item: any) {
    this.control.setValue(null);
  }

  onSelectAll(items: any) {
    // No es relevante para un solo elemento seleccionable
  }

  onDeSelectAll(items: any) {
    this.control.setValue(null);
  }

  get transformControl(): FormControl {
    return this.control as FormControl;
  }

}

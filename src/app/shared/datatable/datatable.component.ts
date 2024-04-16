import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ColumnMode, SelectionType, TableColumn } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent {

  @Input() rows: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() pagination: boolean = false;
  @Input() pageSize: number = 10;
  @Input() selectableMultiple = false;
  @Input() newColumnName: string = ''; // Nuevo nombre de la columna
  @Input() newColumnWidth: number = 100; // Ancho de la nueva columna
  @Input() tableButtons: Array<{ label: string, action: string, buttonClass: string, icon: string}> = []
  @Output() rowSelected = new EventEmitter<any[]>();
  @Output() performAction = new EventEmitter<{ button: any, item: any }>()

  selected: any[] = [];

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  onSelect({ selected }: any) {
    this.selected = [...selected];
    this.rowSelected.emit(selected);
  }

  onActivate(event: any) {
  }

  add() {
    this.selected.push(this.rows[1], this.rows[3]);
  }

  update() {
    this.selected = [this.rows[1], this.rows[3]];
  }

  remove() {
    this.selected = [];
  }

  displayCheck(row: any) {
    return row.name !== 'Ethel Price';
  }

  getDefaultValue(value: any, defaultValue: any): any {
    return typeof value !== 'undefined' ? value : defaultValue;
  }

  addNewColumn() {
    const newColumn: TableColumn = {
      name: this.newColumnName, // Nombre de la nueva columna
      prop: '', // Propiedad de los datos asociada (debes definir la propiedad correcta)
      width: this.newColumnWidth, // Ancho de la nueva columna
      sortable: true, // Puedes ajustar esta propiedad según tus necesidades
      canAutoResize: true,
      draggable: true,
      resizeable: true,
      checkboxable: false
    };

    this.columns.push(newColumn);
  }

  performActionFn(button: any, row: any) {
    this.performAction.emit({ button, item: row })
  }
}

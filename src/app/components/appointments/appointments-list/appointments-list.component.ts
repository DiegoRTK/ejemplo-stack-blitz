import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.scss']
})
export class AppointmentsListComponent implements OnInit {
  public rows = [
  ];

  public columns = [
    { name: 'Horario', prop: 'name' },
    { name: 'Agente', prop: 'age' },
    { name: 'Tipo de cita', prop: 'age' },
    { name: 'Nombre', prop: 'age' },
    { name: 'Código', prop: 'age' }
  ];

  public pagination = true;

  public pageSize = 0;

  public totalItems = 0;

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
}

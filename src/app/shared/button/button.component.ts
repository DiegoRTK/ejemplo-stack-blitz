import { Component, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core'; // Importa IconProp

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() label = '';
  @Input() icon: IconProp | null = null; // Usa IconProp en lugar de string
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() rounded = false;
  @Input() type: 'primary' | 'secondary' | 'delete' | 'edit' | 'create' = 'primary';
  @Input() outline: boolean = false; // Nuevo input para el estilo de contorno
  @Input() contentPosition = '';
  @Input() border = true;

  get classes(): string {
    let buttonClasses = `${this.contentPosition} btn`;
    buttonClasses = this.border ? buttonClasses : buttonClasses + ' no-border';
    if (!this.outline) { // Si no es de contorno, añade las clases de color primario
      if (this.type === 'primary') {
        buttonClasses += ' btn-primary';
      } else if (this.type === 'secondary') {
        buttonClasses += ' btn-secondary';
      } else if (this.type === 'delete') {
        buttonClasses += ' btn-danger';
      } else if (this.type === 'edit') {
        buttonClasses += ' btn-warning';
      } else if (this.type === 'create') {
        buttonClasses += ' btn-success';
      }
    } else { // Si es de contorno, añade la clase de contorno correspondiente
      buttonClasses += ' btn-outline-' + this.type;
    }
    if (this.rounded) {
      buttonClasses += ' btn-rounded';
    }
    return buttonClasses;
  }
}

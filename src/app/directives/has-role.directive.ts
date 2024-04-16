import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { ROLES_ENUM } from '../enum/roles.enum';
import { selectRole } from '../store/app.selectors';
import { AppStateProps } from '../store/app.state';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole!: ROLES_ENUM;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private store: Store<AppStateProps>,
  ) {}

  ngOnInit(): void {
    this.store.select(selectRole).subscribe(userRole => {
      console.log(this.appHasRole, userRole)
      if (userRole === this.appHasRole) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }
}

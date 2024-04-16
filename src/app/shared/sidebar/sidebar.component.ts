import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROLES_ENUM } from 'src/app/enum/roles.enum';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private router: Router) { }

  public isSidebarOpen = true;

  public selectedButton: number = 0;

  public selectedSubIndex: number = 0;

  public ROLES = ROLES_ENUM

  public toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  public shouldShowSidebar(): boolean {
    const currentRoute = this.router.url;
    const routesToHideSidebar = ['/login', '/reset-password'];
    return !routesToHideSidebar.includes(currentRoute);
  }

  public selectButton(index: number): void {
    this.selectedButton = index;
    this.navigate(index);
  }

  public selectSubIndex(index: number): void {
    this.selectedSubIndex = index
    this.navigate(3);
  }

  private navigate(index: number): void {
    switch (index) {
      case 0:
        this.router.navigateByUrl('/citas')
        break;
      case 3:
        if (this.selectedSubIndex === 0) {
          this.router.navigateByUrl('/configuracion/agentes')
        }
        if (this.selectedSubIndex === 1) {
          this.router.navigateByUrl('/configuracion/citas')
        }
        if (this.selectedSubIndex === 2) {
          this.router.navigateByUrl('/configuracion/centros-atencion')
        }
        if (this.selectedSubIndex === 3) {
          this.router.navigateByUrl('/configuracion/administradores')
        }
        break;
      default:
        break;
    }
  }
}

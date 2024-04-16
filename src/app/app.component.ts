import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'citas-app';

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.router.url.includes('login')) {
      this.router.navigateByUrl('/login');
    } else {
      this.router.navigateByUrl('/appointments');
    }
  }

  isLoginPage(): boolean {
    return this.router.url.includes('/login');
  }  
}

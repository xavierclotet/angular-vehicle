import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from './shared';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BreadcrumbComponent],
  template: `
  <app-breadcrumb></app-breadcrumb>
  <router-outlet />
  `,
})
export class AppComponent {
}

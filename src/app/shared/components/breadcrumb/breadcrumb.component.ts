import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router, RouterModule, ActivatedRoute } from '@angular/router'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

// SIMPLIFIED BREADCRUMB TOOLBAR TO GO BACK TO BRANDS WHEN WE ARE ON DETAILS BRAND

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
     <mat-toolbar>
        @if (router.url !== '/brands') {
          <button mat-icon-button (click)="router.navigate(['/brands'])">
            <mat-icon>arrow_back</mat-icon>
          </button>
        } 
        <span>{{ getCurrentTitle() }}</span>
    </mat-toolbar>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      mat-toolbar {
        background: transparent;
        button {
          margin-right: 0.5rem;
        }
        span {
          font-size: 1.2rem;
        }
      }
    `,
  ],
})
export class BreadcrumbComponent {
  protected router = inject(Router);
  private route = inject(ActivatedRoute);

  getCurrentTitle(): string {
    let route = this.route;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.snapshot.title as string;
  }
}
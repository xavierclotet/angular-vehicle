import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar class="breadcrumb">
      <a mat-button routerLink="/brands" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
        <mat-icon>home</mat-icon>
        Brands
      </a>
      @if (isDetailsRoute()) {
        <mat-icon>chevron_right</mat-icon>
        <span>Brand Details</span>
      }
    </mat-toolbar>
  `,
  styles: [`
    .breadcrumb {
      background: transparent;
      height: 48px;
      margin-bottom: 16px;
    }
    .active {
      background: rgba(0,0,0,.04);
    }
    mat-icon {
      margin-right: 4px;
      opacity: 0.7;
    }
    span {
      opacity: 0.7;
    }
  `]
})
export class BreadcrumbComponent {
  isDetailsRoute(): boolean {
    return window.location.pathname.includes('/brands/');
  }
}
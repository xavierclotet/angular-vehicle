import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { VehicleService } from '@app/core/services';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Store } from '@ngrx/store';
import { selectBrands, selectFilteredBrands, selectLoading } from '@app/store/brands/brands.selectors';
import { BrandsActions } from '@app/store/brands/brands.actions';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-brands',
  imports: [
    CommonModule, 
    MatInputModule, 
    MatListModule, 
    ScrollingModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {
  private store = inject(Store);
  private router = inject(Router);

  brands$ = this.store.select(selectBrands);
  loading$ = this.store.select(selectLoading);

  filteredBrands$ = this.store.select(selectFilteredBrands);

  constructor() {
    this.store.dispatch(BrandsActions.loadBrands());
  }
  
  filterBrands(event: Event) {
    const term = (event.target as HTMLInputElement).value;
    this.store.dispatch(BrandsActions.setSearchTerm({ term }));
  }

  selectBrand(brand: number) {
    this.router.navigate(['/brands', brand])
  }

}



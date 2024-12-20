import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { VehicleService } from '@app/core/services';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Store } from '@ngrx/store';
import { selectBrands, selectFilteredBrands, selectLoading, selectSearchTerm } from '@app/store/brands/brands.selectors';
import { BrandsActions } from '@app/store/brands/brands.actions';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, take, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-brands',
  imports: [
    CommonModule, 
    MatInputModule, 
    MatListModule, 
    ScrollingModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  private store = inject(Store);
  private router = inject(Router);
  private searchSubject = new Subject<string>();
  brands$ = this.store.select(selectBrands);
  loading$ = this.store.select(selectLoading);
  searchTerm$ = this.store.select(selectSearchTerm);
  filteredBrands$ = this.store.select(selectFilteredBrands);

  constructor() {
    this.loadBrands();
    this.manageSearchInput();
  }

  brandChanged(term: string): void {
    this.searchSubject.next(term);
  }
  
  selectBrand(brand: number): void {
    this.router.navigate(['/brands', brand])
  }

  private loadBrands(): void {
    // Solo cargar las marcas si no hay datos
    this.brands$.pipe(
      take(1)
    ).subscribe(brands => {
      if (!brands?.length) {
        this.store.dispatch(BrandsActions.loadBrands())
      }
    });
  }

  private manageSearchInput(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntilDestroyed(),
      tap(term => this.store.dispatch(BrandsActions.setSearchTerm({ term })))
    ).subscribe();
  }

}



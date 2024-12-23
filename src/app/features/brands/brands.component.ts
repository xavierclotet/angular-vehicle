import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal, viewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { Store } from '@ngrx/store';
import { selectBrands, selectError, selectFilteredBrands, selectLoading, selectSearchTerm } from '@app/store/brands/brands.selectors';
import { BrandsActions } from '@app/store/brands/brands.actions';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, Subject, take, tap } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { Brand } from '@models/brands.model';
import { APP_CONSTANTS } from '@core/constants';

@Component({
  selector: 'app-brands',
  imports: [CommonModule, MatInputModule, MatListModule, ScrollingModule, MatProgressSpinnerModule, FormsModule, MatFormFieldModule, MatCardModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrandsComponent {
  viewport = viewChild.required(CdkVirtualScrollViewport);
  visibleItems = signal<Brand[]>([]);
  private store = inject(Store);
  private router = inject(Router);
  private searchSubject = new Subject<string>();
  readonly brands$ = this.store.select(selectBrands);
  readonly loading$ = this.store.select(selectLoading);
  readonly error$ = this.store.select(selectError);
  readonly searchTerm$ = this.store.select(selectSearchTerm);
  private allBrands = toSignal(this.store.select(selectFilteredBrands), { initialValue: [] });

  constructor() {
    this.loadBrands();
    this.manageSearchInput();
    this.setupInitialItems();
  }

  /**
   * Handles the scroll event for the virtual scroll viewport.
   * This function is called when the user scrolls the list of brands.
   */
  onScroll(): void {
    // Get the native element of the viewport
    const element = this.viewport().elementRef.nativeElement;
    // Check if the user has scrolled near the bottom (95% of the total height)
    const isNearBottom = element.scrollTop + element.clientHeight >= (element.scrollHeight * APP_CONSTANTS.SCROLL_THRESHOLD);
    
    if (isNearBottom) {
      // Get the current list of all brands and visible items
      const allBrands = this.allBrands();
      const currentLength = this.visibleItems().length;
      
      // If there are more brands to load, add the next page of items
      if (currentLength < allBrands.length) {
        // Update the visibleItems signal with the next batch of brands
        this.visibleItems.set(allBrands.slice(0, currentLength + APP_CONSTANTS.PAGE_SIZE));
      }
    }
  }

  brandChanged(term: string): void {
    this.searchSubject.next(term);
    if (this.viewport()) {
      this.viewport().scrollToIndex(0);
    }
  }

  selectBrand(brand: number): void {
    this.router.navigate(['/brands', brand]);
  }

  private loadBrands(): void {
    this.brands$.pipe(
      take(1),
      filter(brands => !brands?.length),
      tap(() => this.store.dispatch(BrandsActions.loadBrands()))
    ).subscribe();
  }

  private manageSearchInput(): void {
    this.searchSubject
      .pipe(
        debounceTime(APP_CONSTANTS.DEBOUNCE_TIME),
        distinctUntilChanged(),
        takeUntilDestroyed(),
        tap(term => this.store.dispatch(BrandsActions.setSearchTerm({ term })))
      ).subscribe();
  }

  private setupInitialItems(): void {
    effect(() => {
      const brands = this.allBrands();
      this.visibleItems.set(brands.slice(0, APP_CONSTANTS.PAGE_SIZE));
    })
  }
}

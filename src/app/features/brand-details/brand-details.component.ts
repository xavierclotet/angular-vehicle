import { Component, inject, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { selectBrandModelsResults, selectBrandTypesResults, selectError, selectLoading, selectSelectedBrandModels, selectSelectedBrandTypes } from '@app/store/brands/brands.selectors';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { BrandsActions } from '@app/store/brands/brands.actions';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-brand-details',
  imports: [CommonModule, MatCardModule, MatListModule, MatDividerModule, MatProgressSpinnerModule, MatFormFieldModule],
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.scss'
})
export class BrandDetailsComponent implements OnInit {
  protected brandId = input.required<number>();
  private store = inject(Store);
  
  types$ = this.store.select(selectBrandTypesResults);
  models$ = this.store.select(selectBrandModelsResults);
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);

  ngOnInit(): void {
    this.store.dispatch(BrandsActions.loadBrandDetails({ brand: this.brandId() }));
  }
  
}

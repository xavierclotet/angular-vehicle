import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
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
export class BrandDetailsComponent implements OnInit  {
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  // TODO: use signal input for brandId?
  types$ = this.store.select(selectBrandTypesResults);
  models$ = this.store.select(selectBrandModelsResults);
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);

  ngOnInit() {
    const brandId = Number(this.route.snapshot.paramMap.get('brandId'));
    if (brandId) {
      this.store.dispatch(BrandsActions.loadBrandDetails({ brand: brandId }));
    }
  }
}

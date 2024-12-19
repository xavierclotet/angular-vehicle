import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectBrandModelsResults, selectBrandTypesResults, selectSelectedBrandModels, selectSelectedBrandTypes } from '@app/store/brands/brands.selectors';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { map } from 'rxjs';
import { BrandsActions } from '@app/store/brands/brands.actions';

@Component({
  selector: 'app-brand-details',
  imports: [CommonModule, MatCardModule, MatListModule, MatDividerModule],
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.scss'
})
export class BrandDetailsComponent implements OnInit  {
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  // TODO: use signal input for brandId?
  types$ = this.store.select(selectBrandTypesResults);
  models$ = this.store.select(selectBrandModelsResults);

  ngOnInit() {
    const brandId = Number(this.route.snapshot.paramMap.get('brandId'));
    if (brandId) {
      this.store.dispatch(BrandsActions.loadBrandDetails({ brand: brandId }));
    }
  }
}

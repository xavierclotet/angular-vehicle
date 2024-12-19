import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BrandsState } from './brands.reducer';

export const selectBrandsState = createFeatureSelector<BrandsState>('brands');

export const selectBrands = createSelector(selectBrandsState, (state) => state.brands);

export const selectLoading = createSelector(selectBrandsState, (state) => state.loading);

export const selectError = createSelector(selectBrandsState, (state) => state.error);

export const selectSelectedBrandModels = createSelector(selectBrandsState, (state) => state.selectedBrandModels);

export const selectSelectedBrandTypes = createSelector(selectBrandsState, (state) => state.selectedBrandTypes);

export const selectSearchTerm = createSelector(selectBrandsState, (state) => state.searchTerm);


export const selectFilteredBrands = createSelector(
  selectBrands,
  selectSearchTerm,
  (brands, term) => {
    const searchTerm = (term || '').toLowerCase();
    return searchTerm ? brands.filter((brand) => brand.Make_Name.toLowerCase().includes(searchTerm)) : brands;
  }
);

export const selectBrandModelsResults = createSelector(
    selectSelectedBrandModels,
    (models) => models?.Results || []
  );
  
  export const selectBrandTypesResults = createSelector(
    selectSelectedBrandTypes,
    (types) => types?.Results || []
  );
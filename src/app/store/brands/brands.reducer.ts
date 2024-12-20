import { createReducer, on } from '@ngrx/store'
import { BrandsActions } from './brands.actions'
import { Brand, ModelsResponse, VehicleTypesResponse } from '@models/brands.model'

export interface BrandsState {
  brands: Brand[];
  selectedBrandModels: ModelsResponse | null;
  selectedBrandTypes: VehicleTypesResponse | null;
  loading: boolean;
  error: string;
  searchTerm: string;
}

export const initialState: BrandsState = {
  brands: [],
  selectedBrandModels: null,
  selectedBrandTypes: null,
  loading: false,
  error: '',
  searchTerm: ''
}

export const brandsReducer = createReducer(
  initialState,
  on(BrandsActions.loadBrands, (state) => ({ ...state, loading: true })),
  on(BrandsActions.loadBrandDetails, (state) => ({ ...state, loading: true })),
  on(BrandsActions.loadBrandsSuccess, (state, { brands }) => ({ ...state, brands, loading: false })),
  on(BrandsActions.loadBrandsFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(BrandsActions.loadBrandModelsSuccess, (state, { models }) => ({ ...state, selectedBrandModels: models, loading: false })),
  on(BrandsActions.loadBrandTypesSuccess, (state, { types }) => ({ ...state, selectedBrandTypes: types, loading: false })),
  on(BrandsActions.loadBrandModelsFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(BrandsActions.loadBrandTypesFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(BrandsActions.setSearchTerm, (state, { term }) => ({
    ...state,
    searchTerm: term,
  })),
)
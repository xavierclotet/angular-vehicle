import { BrandsActions } from './brands.actions';
import { brandsReducer, initialState } from './brands.reducer';
import { Brand, ModelsResponse, VehicleTypesResponse } from '@models/brands.model';

describe('Brands Reducer', () => {
  describe('Load Brands', () => {
    it('should set loading to true on loadBrands', () => {
      const action = BrandsActions.loadBrands();
      const state = brandsReducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBe('');
    });

    it('should update state with brands on loadBrandsSuccess', () => {
      const brands: Brand[] = [
        { Make_ID: 1, Make_Name: 'Toyota' },
        { Make_ID: 2, Make_Name: 'Honda' }
      ];
      const action = BrandsActions.loadBrandsSuccess({ brands });
      const state = brandsReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.brands).toEqual(brands);
      expect(state.error).toBe('');
    });

    it('should update error state on loadBrandsFailure', () => {
      const error = 'Error loading brands';
      const action = BrandsActions.loadBrandsFailure({ error });
      const state = brandsReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(error);
      expect(state.brands).toEqual([]);
    });
  });

  describe('Load Brand Details', () => {
    it('should set loading to true on loadBrandDetails', () => {
      const action = BrandsActions.loadBrandDetails({ brand: 123 });
      const state = brandsReducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBe('');
    });

    it('should update state with models on loadBrandModelsSuccess', () => {
      const models: ModelsResponse = {
        Count: 2,
        Message: 'Success',
        Results: [
          { Make_ID: 1, Make_Name: 'Toyota', Model_ID: 1, Model_Name: 'Camry' },
          { Make_ID: 1, Make_Name: 'Toyota', Model_ID: 2, Model_Name: 'Corolla' }
        ]
      };
      const action = BrandsActions.loadBrandModelsSuccess({ models });
      const state = brandsReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.selectedBrandModels).toEqual(models);
      expect(state.error).toBe('');
    });

    it('should update state with types on loadBrandTypesSuccess', () => {
      const types: VehicleTypesResponse = {
        Count: 2,
        Message: 'Success',
        Results: [
          { MakeId: 1, MakeName: 'Toyota', VehicleTypeId: 1, VehicleTypeName: 'Passenger Car' },
          { MakeId: 1, MakeName: 'Toyota', VehicleTypeId: 2, VehicleTypeName: 'Truck' }
        ]
      };
      const action = BrandsActions.loadBrandTypesSuccess({ types });
      const state = brandsReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.selectedBrandTypes).toEqual(types);
      expect(state.error).toBe('');
    });

    it('should update error state on loadBrandModelsFailure', () => {
      const error = 'Error loading models';
      const action = BrandsActions.loadBrandModelsFailure({ error });
      const state = brandsReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(error);
      expect(state.selectedBrandModels).toBeNull();
    });

    it('should update error state on loadBrandTypesFailure', () => {
      const error = 'Error loading types';
      const action = BrandsActions.loadBrandTypesFailure({ error });
      const state = brandsReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(error);
      expect(state.selectedBrandTypes).toBeNull();
    });
  });

  describe('Search', () => {
    it('should update searchTerm on setSearchTerm', () => {
      const term = 'toyota';
      const action = BrandsActions.setSearchTerm({ term });
      const state = brandsReducer(initialState, action);

      expect(state.searchTerm).toBe(term);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('');
    });
  });

  describe('Unknown Action', () => {
    it('should return the previous state', () => {
      const action = {
        type: 'Unknown'
      };
      const state = brandsReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });
});

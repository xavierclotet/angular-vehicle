import { BrandsActions } from './brands.actions';
import { Brand, ModelsResponse, VehicleTypesResponse } from '@models/brands.model';

describe('Brands Actions', () => {
  describe('Load Brands', () => {
    it('should create loadBrands action', () => {
      const action = BrandsActions.loadBrands();
      expect(action.type).toBe('[Brands] Load Brands');
    });

    it('should create loadBrandsSuccess action', () => {
      const brands: Brand[] = [
        { Make_ID: 1, Make_Name: 'Toyota' },
        { Make_ID: 2, Make_Name: 'Honda' }
      ];
      const action = BrandsActions.loadBrandsSuccess({ brands });
      expect(action.type).toBe('[Brands] Load Brands Success');
      expect(action.brands).toEqual(brands);
    });

    it('should create loadBrandsFailure action', () => {
      const error = 'Error loading brands';
      const action = BrandsActions.loadBrandsFailure({ error });
      expect(action.type).toBe('[Brands] Load Brands Failure');
      expect(action.error).toBe(error);
    });
  });

  describe('Load Brand Details', () => {
    it('should create loadBrandDetails action', () => {
      const brand = 123;
      const action = BrandsActions.loadBrandDetails({ brand });
      expect(action.type).toBe('[Brands] Load Brand Details');
      expect(action.brand).toBe(brand);
    });

    it('should create loadBrandModelsSuccess action', () => {
      const models: ModelsResponse = {
        Count: 2,
        Message: 'Success',
        Results: [
          { Make_ID: 1, Make_Name: 'Toyota', Model_ID: 1, Model_Name: 'Camry' },
          { Make_ID: 1, Make_Name: 'Toyota', Model_ID: 2, Model_Name: 'Corolla' }
        ]
      };
      const action = BrandsActions.loadBrandModelsSuccess({ models });
      expect(action.type).toBe('[Brands] Load Brand Models Success');
      expect(action.models).toEqual(models);
    });

    it('should create loadBrandModelsFailure action', () => {
      const error = 'Error loading models';
      const action = BrandsActions.loadBrandModelsFailure({ error });
      expect(action.type).toBe('[Brands] Load Brand Models Failure');
      expect(action.error).toBe(error);
    });

    it('should create loadBrandTypesSuccess action', () => {
      const types: VehicleTypesResponse = {
        Count: 2,
        Message: 'Success',
        Results: [
          { MakeId: 1, MakeName: 'Toyota', VehicleTypeId: 1, VehicleTypeName: 'Passenger Car' },
          { MakeId: 1, MakeName: 'Toyota', VehicleTypeId: 2, VehicleTypeName: 'Truck' }
        ]
      };
      const action = BrandsActions.loadBrandTypesSuccess({ types });
      expect(action.type).toBe('[Brands] Load Brand Types Success');
      expect(action.types).toEqual(types);
    });

    it('should create loadBrandTypesFailure action', () => {
      const error = 'Error loading types';
      const action = BrandsActions.loadBrandTypesFailure({ error });
      expect(action.type).toBe('[Brands] Load Brand Types Failure');
      expect(action.error).toBe(error);
    });
  });

  describe('Search', () => {
    it('should create setSearchTerm action', () => {
      const term = 'toyota';
      const action = BrandsActions.setSearchTerm({ term });
      expect(action.type).toBe('[Brands] Set Search Term');
      expect(action.term).toBe(term);
    });
  });
});

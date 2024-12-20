import {
  selectBrands,
  selectLoading,
  selectError,
  selectSelectedBrandModels,
  selectSelectedBrandTypes,
  selectSearchTerm,
  selectFilteredBrands,
  selectBrandModelsResults,
  selectBrandTypesResults
} from './brands.selectors';
import { Brand, ModelsResponse, VehicleTypesResponse } from '@models/brands.model';
import { BrandsState } from './brands.reducer';

describe('Brands Selectors', () => {
  const brands: Brand[] = [
    { Make_ID: 1, Make_Name: 'Toyota' },
    { Make_ID: 2, Make_Name: 'Honda' },
    { Make_ID: 3, Make_Name: 'Tesla' }
  ];

  const modelsResponse: ModelsResponse = {
    Count: 2,
    Message: 'Success',
    Results: [
      { Make_ID: 1, Make_Name: 'Toyota', Model_ID: 1, Model_Name: 'Camry' },
      { Make_ID: 1, Make_Name: 'Toyota', Model_ID: 2, Model_Name: 'Corolla' }
    ]
  };

  const typesResponse: VehicleTypesResponse = {
    Count: 2,
    Message: 'Success',
    Results: [
      { MakeId: 1, MakeName: 'Toyota', VehicleTypeId: 1, VehicleTypeName: 'Passenger Car' },
      { MakeId: 1, MakeName: 'Toyota', VehicleTypeId: 2, VehicleTypeName: 'Truck' }
    ]
  };

  const initialState: BrandsState = {
    brands,
    selectedBrandModels: modelsResponse,
    selectedBrandTypes: typesResponse,
    loading: false,
    error: '',
    searchTerm: ''
  };

  describe('Basic Selectors', () => {
    it('should select brands', () => {
      const result = selectBrands.projector(initialState);
      expect(result).toBe(brands);
    });

    it('should select loading state', () => {
      const result = selectLoading.projector(initialState);
      expect(result).toBe(false);
    });

    it('should select error state', () => {
      const result = selectError.projector(initialState);
      expect(result).toBe('');
    });

    it('should select selected brand models', () => {
      const result = selectSelectedBrandModels.projector(initialState);
      expect(result).toBe(modelsResponse);
    });

    it('should select selected brand types', () => {
      const result = selectSelectedBrandTypes.projector(initialState);
      expect(result).toBe(typesResponse);
    });

    it('should select search term', () => {
      const result = selectSearchTerm.projector(initialState);
      expect(result).toBe('');
    });
  });

  describe('selectFilteredBrands', () => {
    it('should return all brands when search term is empty', () => {
      const result = selectFilteredBrands.projector(brands, '');
      expect(result).toEqual(brands);
    });

    it('should filter brands by search term case-insensitive', () => {
      const result = selectFilteredBrands.projector(brands, 'toy');
      expect(result).toEqual([brands[0]]);
    });

    it('should return empty array when no brands match search term', () => {
      const result = selectFilteredBrands.projector(brands, 'xyz');
      expect(result).toEqual([]);
    });

    it('should handle null search term', () => {
      const result = selectFilteredBrands.projector(brands, '');
      expect(result).toEqual(brands);
    });
  });

  describe('Results Selectors', () => {
    it('should select brand models results', () => {
      const result = selectBrandModelsResults.projector(modelsResponse);
      expect(result).toEqual(modelsResponse.Results);
    });

    it('should return empty array when models response is null', () => {
      const result = selectBrandModelsResults.projector(null);
      expect(result).toEqual([]);
    });

    it('should select brand types results', () => {
      const result = selectBrandTypesResults.projector(typesResponse);
      expect(result).toEqual(typesResponse.Results);
    });

    it('should return empty array when types response is null', () => {
      const result = selectBrandTypesResults.projector(null);
      expect(result).toEqual([]);
    });
  });
});

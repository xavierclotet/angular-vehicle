import { TestBed } from '@angular/core/testing';
import { VehicleService } from './vehicle.service';
import { HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BrandsResponse, VehicleTypesResponse, ModelsResponse } from '@models/brands.model';

describe('VehicleService', () => {
  let service: VehicleService;
  let httpTestingController: HttpTestingController;
  const baseUrl = 'https://vpic.nhtsa.dot.gov/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(VehicleService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllBrands', () => {
    it('should return brands data', () => {
      const mockBrandsResponse: BrandsResponse = {
        Count: 2,
        Message: 'Response returned successfully',
        Results: [
          { Make_ID: 1, Make_Name: 'Honda' },
          { Make_ID: 2, Make_Name: 'Toyota' }
        ]
      };

      service.getAllBrands().subscribe(response => {
        expect(response).toEqual(mockBrandsResponse);
      });

      const req = httpTestingController.expectOne(
        `${baseUrl}/vehicles/GetAllMakes?format=json`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockBrandsResponse);
    });
  });

  describe('getVehicleTypesByBrandId', () => {
    it('should return vehicle types for a specific brand', () => {
      const brandId = 123;
      const mockVehicleTypesResponse: VehicleTypesResponse = {
        Count: 2,
        Message: 'Response returned successfully',
        Results: [
          { 
            MakeId: brandId,
            MakeName: 'Honda',
            VehicleTypeId: 1,
            VehicleTypeName: 'Passenger Car'
          },
          {
            MakeId: brandId,
            MakeName: 'Honda',
            VehicleTypeId: 2,
            VehicleTypeName: 'Truck'
          }
        ]
      };

      service.getVehicleTypesByBrandId(brandId).subscribe(response => {
        expect(response).toEqual(mockVehicleTypesResponse);
      });

      const req = httpTestingController.expectOne(
        `${baseUrl}/vehicles/GetVehicleTypesForMakeId/${brandId}?format=json`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockVehicleTypesResponse);
    });
  });

  describe('getModelsByBrandId', () => {
    it('should return models for a specific brand', () => {
      const brandId = 123;
      const mockModelsResponse: ModelsResponse = {
        Count: 2,
        Message: 'Response returned successfully',
        Results: [
          {
            Make_ID: brandId,
            Make_Name: 'Honda',
            Model_ID: 1,
            Model_Name: 'Civic'
          },
          {
            Make_ID: brandId,
            Make_Name: 'Honda',
            Model_ID: 2,
            Model_Name: 'Accord'
          }
        ]
      };

      service.getModelsByBrandId(brandId).subscribe(response => {
        expect(response).toEqual(mockModelsResponse);
      });

      const req = httpTestingController.expectOne(
        `${baseUrl}/vehicles/GetModelsForMakeId/${brandId}?format=json`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockModelsResponse);
    });
  });
});
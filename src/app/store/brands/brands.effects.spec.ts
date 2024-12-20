import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { VehicleService } from '@app/core/services';
import { BrandsActions } from './brands.actions';
import * as BrandsEffects from './brands.effects';
import { Brand, ModelsResponse, VehicleTypesResponse } from '@models/brands.model';

describe('BrandsEffects', () => {
  let actions$: Observable<Action>;
  let vehicleService: jasmine.SpyObj<VehicleService>;

  beforeEach(() => {
    vehicleService = jasmine.createSpyObj('VehicleService', [
      'getAllBrands',
      'getModelsByBrandId',
      'getVehicleTypesByBrandId'
    ]);

    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        { provide: VehicleService, useValue: vehicleService }
      ]
    });
  });

  describe('loadBrands$', () => {
    it('should return loadBrandsSuccess action on successful load', (done) => {
      const brands: Brand[] = [
        { Make_ID: 1, Make_Name: 'Toyota' },
        { Make_ID: 2, Make_Name: 'Honda' }
      ];
      const response = { Count: 2, Message: 'Success', Results: brands };
      
      vehicleService.getAllBrands.and.returnValue(of(response));
      actions$ = of(BrandsActions.loadBrands());

      BrandsEffects.loadBrands(actions$, vehicleService).subscribe(action => {
        expect(action).toEqual(BrandsActions.loadBrandsSuccess({ brands }));
        done();
      });
    });

    it('should return loadBrandsFailure action on error', (done) => {
      const error = new Error('Test error');
      vehicleService.getAllBrands.and.returnValue(throwError(() => error));
      actions$ = of(BrandsActions.loadBrands());

      BrandsEffects.loadBrands(actions$, vehicleService).subscribe(action => {
        expect(action).toEqual(BrandsActions.loadBrandsFailure({ error: error.message }));
        done();
      });
    });
  });

  describe('loadBrandDetails$', () => {
    const brandId = 123;
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

    it('should return both success actions when both API calls succeed', (done) => {
      vehicleService.getModelsByBrandId.and.returnValue(of(modelsResponse));
      vehicleService.getVehicleTypesByBrandId.and.returnValue(of(typesResponse));
      actions$ = of(BrandsActions.loadBrandDetails({ brand: brandId }));

      const expectedActions = [
        BrandsActions.loadBrandModelsSuccess({ models: modelsResponse }),
        BrandsActions.loadBrandTypesSuccess({ types: typesResponse })
      ];

      let actionCount = 0;
      BrandsEffects.loadBrandDetails(actions$, vehicleService).subscribe(action => {
        expect(action).toEqual(expectedActions[actionCount]);
        actionCount++;
        if (actionCount === expectedActions.length) {
          done();
        }
      });
    });

    it('should return failure action when models API call fails', (done) => {
      const error = new Error('Models API error');
      vehicleService.getModelsByBrandId.and.returnValue(throwError(() => error));
      actions$ = of(BrandsActions.loadBrandDetails({ brand: brandId }));

      BrandsEffects.loadBrandDetails(actions$, vehicleService).subscribe(action => {
        expect(action).toEqual(BrandsActions.loadBrandTypesFailure({ error: error.message }));
        done();
      });
    });

    it('should return failure action when types API call fails', (done) => {
      const error = new Error('Types API error');
      vehicleService.getModelsByBrandId.and.returnValue(of(modelsResponse));
      vehicleService.getVehicleTypesByBrandId.and.returnValue(throwError(() => error));
      actions$ = of(BrandsActions.loadBrandDetails({ brand: brandId }));

      BrandsEffects.loadBrandDetails(actions$, vehicleService).subscribe(action => {
        expect(action).toEqual(BrandsActions.loadBrandModelsFailure({ error: error.message }));
        done();
      });
    });
  });
});

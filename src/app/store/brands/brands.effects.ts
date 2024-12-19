import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap, of } from 'rxjs'
import { VehicleService } from '@app/core/services'
import { BrandsActions } from './brands.actions'

export const loadBrands = createEffect(
  (actions$ = inject(Actions), vehicleService = inject(VehicleService)) => {
    return actions$.pipe(
      ofType(BrandsActions.loadBrands),
      mergeMap(() =>
        vehicleService.getAllBrands().pipe(
          map((response) => BrandsActions.loadBrandsSuccess({ brands: response.Results })),
          catchError((error) => of(BrandsActions.loadBrandsFailure({ error: error.message }))),
        ),
      ),
    )
  },
  { functional: true },
)

export const loadBrandDetails = createEffect(
    (actions$ = inject(Actions), vehicleService = inject(VehicleService)) => {
      return actions$.pipe(
        ofType(BrandsActions.loadBrandDetails),
        mergeMap(({ brand }) =>
          vehicleService.getModelsByBrandId(brand).pipe(
            mergeMap((models) =>
              vehicleService.getVehicleTypesByBrandId(brand).pipe(
                mergeMap((types) => [
                  BrandsActions.loadBrandModelsSuccess({ models }),
                  BrandsActions.loadBrandTypesSuccess({ types }),
                ]),
              ),
            ),
          ),
        ),
      )
    },
    { functional: true },
  )
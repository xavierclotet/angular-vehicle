import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { Brand, ModelsResponse, VehicleTypesResponse } from '@models/brands.model'

export const BrandsActions = createActionGroup({
  source: 'Brands',
  events: {
    'Load Brands': emptyProps(),
    'Load Brands Success': props<{ brands: Brand[] }>(),
    'Load Brands Failure': props<{ error: string }>(),
    'Load Brand Details': props<{ brand: number }>(),
    'Load Brand Models Success': props<{ models: ModelsResponse }>(),
    'Load Brand Models Failure': props<{ error: string }>(),
    'Load Brand Types Success': props<{ types: VehicleTypesResponse }>(),
    'Load Brand Types Failure':props<{ error: string }>(),
    'Set Search Term': props<{ term: string }>(),
  },
})
import { Routes } from '@angular/router';
import { BrandDetailsComponent, BrandsComponent } from './features';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: '/brands', 
        pathMatch: 'full' 
    },
    { 
        path: 'brands', 
        title: 'Vehicle Brands',
        component: BrandsComponent
      },
      { 
        path: 'brands/:brandId', 
        title: 'Brand Details',
        component: BrandDetailsComponent
      } 
];

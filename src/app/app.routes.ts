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
        loadComponent: () => import('./features/brands/brands.component').then(m => m.BrandsComponent)
    },
    { 
        path: 'brands/:brandId', 
        title: 'Brand Details',
        loadComponent: () => import('./features/brand-details/brand-details.component').then(m => m.BrandDetailsComponent)
    } 
];

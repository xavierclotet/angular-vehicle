import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      redirectTo: '/brands',
      pathMatch: 'full',
    },
    {
      path: 'brands',
      children: [
        {
          path: '',
          title: 'Vehicle Brands',
          loadComponent: () => import('./features/brands/brands.component').then(m => m.BrandsComponent),
        },
        {
          path: ':brandId',
          title: 'Brand Details',
          loadComponent: () => import('./features/brand-details/brand-details.component').then(m => m.BrandDetailsComponent),
        },
      ],
    },
    {
        path: '**',
        redirectTo: '/brands',
        pathMatch: 'full',
    },
  ];
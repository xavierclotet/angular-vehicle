import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BrandsResponse, ModelsResponse, VehicleTypesResponse } from '@models/brands.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private baseUrl = 'https://vpic.nhtsa.dot.gov/api';
  http = inject(HttpClient);

  // Get all makes/brands
  getAllBrands(): Observable<BrandsResponse> {
    return this.http.get<BrandsResponse>(`${this.baseUrl}/vehicles/GetAllMakes?format=json`);
  }

  // Get vehicle types for a specific brandId
  getVehicleTypesByBrandId(brandId: number): Observable<VehicleTypesResponse>  {
    return this.http.get<VehicleTypesResponse>(`${this.baseUrl}/vehicles/GetVehicleTypesForMakeId/${brandId}?format=json`)
  }

  // Get models for a specific brandId
  getModelsByBrandId(brandId: number): Observable<ModelsResponse> {
    return this.http.get<ModelsResponse>(`${this.baseUrl}/vehicles/GetModelsForMakeId/${brandId}?format=json`)
  }
}

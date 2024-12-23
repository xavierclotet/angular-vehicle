import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BrandsResponse, ModelsResponse, VehicleTypesResponse } from '@models/brands.model';
import { Observable } from 'rxjs';
import { API_CONSTANTS } from '@core/constants';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  http = inject(HttpClient);

  // Get all makes/brands
  getAllBrands(): Observable<BrandsResponse> {
    return this.http.get<BrandsResponse>(`${API_CONSTANTS.BASE_URL}/vehicles/GetAllMakes?format=json`);
  }

  // Get vehicle types for a specific brandId
  getVehicleTypesByBrandId(brandId: number): Observable<VehicleTypesResponse>  {
    return this.http.get<VehicleTypesResponse>(`${API_CONSTANTS.BASE_URL}/vehicles/GetVehicleTypesForMakeId/${brandId}?format=json`)
  }

  // Get models for a specific brandId
  getModelsByBrandId(brandId: number): Observable<ModelsResponse> {
    return this.http.get<ModelsResponse>(`${API_CONSTANTS.BASE_URL}/vehicles/GetModelsForMakeId/${brandId}?format=json`)
  }
}

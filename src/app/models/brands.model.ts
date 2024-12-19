export interface Response<T> {
    Count: number;
    Message: string;
    Results: T[];
}

export interface Brand {
    Make_ID: number;
    Make_Name: string;
}
  
interface VehicleType {
    MakeId: number;
    MakeName: string;
    VehicleTypeId: number;
    VehicleTypeName: string;
}
  
interface Model {
    Make_ID: number;
    Make_Name: string;
    Model_ID: number;
    Model_Name: string;
}
  
export type BrandsResponse = Response<Brand>;
export type VehicleTypesResponse = Response<VehicleType>;
export type ModelsResponse = Response<Model>;
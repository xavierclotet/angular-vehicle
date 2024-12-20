import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrandDetailsComponent } from './brand-details.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { BrandsActions } from '@app/store/brands/brands.actions';
import { Model, VehicleType } from '@models/brands.model';
import { selectBrandModelsResults, selectBrandTypesResults, selectError, selectLoading } from '@app/store/brands/brands.selectors';
import { input, signal } from '@angular/core';



describe('BrandDetailsComponent', () => {
  let component: BrandDetailsComponent;
  let fixture: ComponentFixture<BrandDetailsComponent>;
  let store: MockStore;

  const mockVehicleTypes: VehicleType[] = [
    { MakeId: 123, MakeName: 'Honda', VehicleTypeId: 1, VehicleTypeName: 'Passenger Car' },
    { MakeId: 123, MakeName: 'Honda', VehicleTypeId: 2, VehicleTypeName: 'Truck' }
  ];

  const mockModels: Model[] = [
    { Make_ID: 123, Make_Name: 'Honda', Model_ID: 1, Model_Name: 'Civic' },
    { Make_ID: 123, Make_Name: 'Honda', Model_ID: 2, Model_Name: 'Accord' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandDetailsComponent, NoopAnimationsModule],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectBrandTypesResults, value: [] },
            { selector: selectBrandModelsResults, value: [] },
            { selector: selectLoading, value: false },
            { selector: selectError, value: null }
          ]
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(BrandDetailsComponent);
    fixture.componentRef.setInput('brandId', 123);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadBrandDetails action on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(
      BrandsActions.loadBrandDetails({ brand: 123 })
    );
  });

  it('should show loading spinner when loading', () => {
    store.overrideSelector(selectLoading, true);
    store.refreshState();
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('mat-progress-spinner'));
    expect(spinner).toBeTruthy();
  });

  it('should show error message when there is an error', () => {
    const errorMessage = 'Failed to load brand details';
    store.overrideSelector(selectError, errorMessage);
    store.refreshState();
    fixture.detectChanges();

    const error = fixture.debugElement.query(By.css('mat-error'));
    expect(error.nativeElement.textContent.trim()).toBe(errorMessage);
  });

  describe('when data is loaded', () => {
    beforeEach(() => {
      store.overrideSelector(selectBrandTypesResults, mockVehicleTypes);
      store.overrideSelector(selectBrandModelsResults, mockModels);
      store.overrideSelector(selectLoading, false);
      store.overrideSelector(selectError, '');
      store.refreshState();
      fixture.detectChanges();
    });

    it('should display vehicle types', () => {
      const typeItems = fixture.debugElement.queryAll(By.css('mat-card:first-of-type mat-list-item'));
      expect(typeItems.length).toBe(2);
      expect(typeItems[0].nativeElement.textContent.trim()).toBe('Passenger Car');
      expect(typeItems[1].nativeElement.textContent.trim()).toBe('Truck');
    });

    it('should display models', () => {
      const modelItems = fixture.debugElement.queryAll(By.css('mat-card:last-of-type mat-list-item'));
      expect(modelItems.length).toBe(2);
      expect(modelItems[0].nativeElement.textContent.trim()).toBe('Civic');
      expect(modelItems[1].nativeElement.textContent.trim()).toBe('Accord');
    });

    it('should show correct count in titles', () => {
      const cardTitles = fixture.debugElement.queryAll(By.css('mat-card-title'));
      expect(cardTitles[0].nativeElement.textContent).toContain('Vehicle Types (2)');
      expect(cardTitles[1].nativeElement.textContent).toContain('Available Models (2)');
    });
  });
});
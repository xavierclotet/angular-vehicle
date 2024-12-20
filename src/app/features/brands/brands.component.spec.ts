import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BrandsComponent } from './brands.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BrandsActions } from '@app/store/brands/brands.actions';
import { Brand } from '@models/brands.model';
import { selectBrands, selectError, selectFilteredBrands, selectLoading, selectSearchTerm } from '@app/store/brands/brands.selectors';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Action } from '@ngrx/store';
import { By } from '@angular/platform-browser';

describe('BrandsComponent', () => {
  let component: BrandsComponent;
  let fixture: ComponentFixture<BrandsComponent>;
  let store: MockStore;
  let actions$: Observable<Action>;
  let router: jasmine.SpyObj<Router>;

  const initialState = {
    brands: {
      brands: [],
      loading: false,
      error: null,
      searchTerm: ''
    }
  };

  const mockBrands: Brand[] = [
    { Make_ID: 1, Make_Name: 'Honda' },
    { Make_ID: 2, Make_Name: 'Toyota' }
  ];

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [BrandsComponent, NoopAnimationsModule],
      
      providers: [
        provideMockStore({ 
          initialState,
          selectors: [
            { selector: selectBrands, value: [] },
            { selector: selectLoading, value: false },
            { selector: selectError, value: null },
            { selector: selectSearchTerm, value: '' },
            { selector: selectFilteredBrands, value: [] }
          ]
        }),
        provideMockActions(() => actions$),
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture = TestBed.createComponent(BrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadBrands action if no brands exist', fakeAsync(() => {
    const dispatchSpy = spyOn(store, 'dispatch');
    
    store.overrideSelector(selectBrands, []);
    store.refreshState();
    
    fixture = TestBed.createComponent(BrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    tick(); // Wait for the async operation to complete
    
    expect(dispatchSpy).toHaveBeenCalledWith(BrandsActions.loadBrands());
  }));
 
  it('should not dispatch loadBrands action if brands exist', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    
    store.overrideSelector(selectBrands, mockBrands);
    store.refreshState();
    fixture.detectChanges();

    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('should navigate to brand details when selectBrand is called', () => {
    const brandId = 123;
    component.selectBrand(brandId);
    expect(router.navigate).toHaveBeenCalledWith(['/brands', brandId]);
  });

  it('should dispatch setSearchTerm action when search term changes', fakeAsync(() => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const searchTerm = 'Honda';

    component.brandChanged(searchTerm);

    tick(300); // Wait for debounceTime
    expect(dispatchSpy).toHaveBeenCalledWith(
      BrandsActions.setSearchTerm({ term: searchTerm })
    );
  }));

  describe('Search and Display Functionality', () => {
    beforeEach(() => {
      store.overrideSelector(selectBrands, mockBrands);
      store.overrideSelector(selectFilteredBrands, mockBrands);
      store.refreshState();
      fixture.detectChanges();
    });


    it('should display search input field', () => {
      const searchInput = fixture.debugElement.query(By.css('input[matInput]'));
      expect(searchInput).toBeTruthy();
      expect(searchInput.attributes['placeholder']).toBe('Search Brands');
    });

    it('should update search when user types', fakeAsync(() => {
      const dispatchSpy = spyOn(store, 'dispatch');
      const searchTerm = 'Honda';
      
      component.brandChanged(searchTerm);
      tick(300); // Wait for debounceTime

      expect(dispatchSpy).toHaveBeenCalledWith(
        BrandsActions.setSearchTerm({ term: searchTerm })
      );
    }));

    it('should display brands in virtual scroll', () => {
      const listItems = fixture.debugElement.queryAll(By.css('mat-list-item'));
      expect(listItems.length).toBe(2);
      expect(listItems[0].nativeElement.textContent.trim()).toBe('Honda');
      expect(listItems[1].nativeElement.textContent.trim()).toBe('Toyota');
    });

    it('should show loading spinner when loading', () => {
      store.overrideSelector(selectLoading, true);
      store.refreshState();
      fixture.detectChanges();

      const spinner = fixture.debugElement.query(By.css('mat-progress-spinner'));
      expect(spinner).toBeTruthy();
    });

    it('should show error message when there is an error', () => {
      const errorMessage = 'Failed to load brands';
      store.overrideSelector(selectError, errorMessage);
      store.refreshState();
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('mat-error'));
      expect(error.nativeElement.textContent.trim()).toBe(errorMessage);
    });

    it('should filter brands based on search term', () => {
      const filteredBrands = [mockBrands[0]]; // Only Honda
      store.overrideSelector(selectFilteredBrands, filteredBrands);
      store.refreshState();
      fixture.detectChanges();

      const listItems = fixture.debugElement.queryAll(By.css('mat-list-item'));
      expect(listItems.length).toBe(1);
      expect(listItems[0].nativeElement.textContent.trim()).toBe('Honda');
    });

    it('should handle brand selection from list', () => {
      const listItems = fixture.debugElement.queryAll(By.css('mat-list-item'));
      listItems[0].nativeElement.click();
      
      expect(router.navigate).toHaveBeenCalledWith(['/brands', mockBrands[0].Make_ID]);
    });
  });
});
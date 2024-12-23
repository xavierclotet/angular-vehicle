import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BreadcrumbComponent } from './breadcrumb.component';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Component({
  template: '',
  standalone: true
})
class MockComponent {}

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;
  let router: Router;
  let mockRoute: any;

  const routes = [
    { 
      path: 'brands',
      component: MockComponent
    },
    { 
      path: 'brands/:brandId',
      component: MockComponent
    }
  ];

  beforeEach(async () => {
    mockRoute = {
      snapshot: { title: 'Vehicle Brands' },
      firstChild: null
    };

    await TestBed.configureTestingModule({
      imports: [BreadcrumbComponent],
      providers: [
        provideRouter(routes),
        { provide: ActivatedRoute, useValue: mockRoute }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show back button only on brand details page', fakeAsync(async () => {
    // On brands page
    await router.navigate(['/brands']);
    tick();
    fixture.detectChanges();
    let backButton = fixture.debugElement.query(By.css('button'));
    expect(backButton).toBeFalsy();

    // On brand details page
    await router.navigate(['/brands/1']);
    tick();
    fixture.detectChanges();
    backButton = fixture.debugElement.query(By.css('button'));
    expect(backButton).toBeTruthy();
  }));

  it('should navigate to brands when back button is clicked', fakeAsync(async () => {
    await router.navigate(['/brands/1']);
    tick();
    fixture.detectChanges();
    
    const backButton = fixture.debugElement.query(By.css('button'));
    backButton.triggerEventHandler('click', null);
    tick();
    
    expect(router.url).toBe('/brands');
  }));

  it('should display correct title based on route', fakeAsync(async () => {
    // Test brands page title
    await router.navigate(['/brands']);
    mockRoute.snapshot.title = 'Vehicle Brands';
    mockRoute.firstChild = null;
    tick();
    fixture.detectChanges();
    let titleElement = fixture.debugElement.query(By.css('span'));
    expect(titleElement.nativeElement.textContent.trim()).toBe('Vehicle Brands');

  }));
});
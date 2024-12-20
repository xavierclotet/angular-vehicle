import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbComponent } from './breadcrumb.component';
import { provideRouter, Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { RouterTestingHarness } from '@angular/router/testing';
import { Component } from '@angular/core';

@Component({
  template: ''
})
class MockComponent {}

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    router = jasmine.createSpyObj('Router', [], {
      url: '/brands/123'
    });

    await TestBed.configureTestingModule({
      imports: [BreadcrumbComponent],
      providers: [
        provideRouter([
          { path: 'brands', component: MockComponent },
          { path: 'brands/:brandId', component: MockComponent }
        ])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
     
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a home link that points to brands', () => {
    const homeLink = fixture.debugElement.query(By.css('a[routerLink="/brands"]'));
    expect(homeLink).toBeTruthy();
    expect(homeLink.nativeElement.textContent).toContain('Brands');
  });

  describe('isDetailsRoute', () => {
    it('is true when route is /brands/:id', async () => {
      const harness = await RouterTestingHarness.create();
      await harness.navigateByUrl('/brands/123');
      harness.detectChanges();
      fixture.detectChanges();
      const expectedValue = component.isDetailsRoute();
      expect(expectedValue).toBeTrue();
    });

    it('is false when route is /brands', async () => {
      const harness = await RouterTestingHarness.create();
      await harness.navigateByUrl('/brands');
      harness.detectChanges();
      fixture.detectChanges();
      const expectedValue = component.isDetailsRoute();
      expect(expectedValue).toBeFalsy();
    });
  }); 
  

 
});
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HomeComponent} from './home.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {By} from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  /**
   * Vérifie si le composant HomeComponent est créé correctement.
   */
  it('devrait être créé', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Vérifie si la méthode goToUsers() navigue vers '/users'.
   */
  it('devrait naviguer vers /users avec goToUsers()', () => {
    const navigateSpy = spyOn(router, 'navigate').and.callThrough();

    component.goToUsers();

    expect(navigateSpy).toHaveBeenCalledWith(['/users']);
  });

  /**
   * Vérifie si un message de succès est logué après une navigation réussie.
   */
  it('devrait enregistrer un message de succès après la navigation', async () => {
    const consoleSpy = spyOn(console, 'log');

    component.goToUsers();

    expect(consoleSpy).toHaveBeenCalledWith('Navigation vers /users terminée');
  });

  /**
   * Vérifie si un message d'erreur est logué en cas d'échec de la navigation.
   */
  it('devrait enregistrer un message d\'erreur si la navigation échoue', async () => {
    const error = new Error('Erreur de navigation');
    spyOn(router, 'navigate').and.returnValue(Promise.reject(error));
    const consoleErrorSpy = spyOn(console, 'error');

    component.goToUsers();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Erreur lors de la navigation vers /users :', error);
  });

  /**
   * Vérifie si le bouton déclenche la navigation vers '/users' lorsqu'il est cliqué.
   */
  it('devrait naviguer vers /users lors du clic sur le bouton', () => {
    const navigateSpy = spyOn(router, 'navigate').and.callThrough();
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);

    expect(navigateSpy).toHaveBeenCalledWith(['/users']);
  });

  /**
   * Vérifie si le titre affiché dans le composant est correct.
   */
  it('devrait afficher le titre correctement', () => {
    const titleElement = fixture.debugElement.query(By.css('h1'));
    expect(titleElement.nativeElement.textContent).toContain('SLIMANI Ilyass');
  });
});

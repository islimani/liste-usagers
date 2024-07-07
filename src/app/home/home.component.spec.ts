import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { of, throwError } from 'rxjs';
import { NgZone } from '@angular/core';

/**
 * Tests unitaires pour le composant HomeComponent.
 *
 * Cette suite de tests vérifie le bon fonctionnement du composant HomeComponent
 * et sa gestion des appels de service et de navigation.
 */
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let router: Router;
  let ngZone: NgZone;

  /**
   * Initialisation du composant et des services nécessaires avant chaque test.
   */
  beforeEach(waitForAsync(() => {
    // Création d'un espion pour UserService
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers']);

    // Configuration du module de test
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule.withRoutes([])], // Utilisation de routes fictives pour éviter la navigation réelle
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ]
    }).compileComponents();

    // Création du composant
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router);
    ngZone = TestBed.inject(NgZone);
  }));

  /**
   * Test pour vérifier que le composant est créé correctement.
   */
  it('devrait être créé', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Test pour vérifier la navigation vers '/users' lors de l'appel à la méthode `goToUsers`.
   */
  it('devrait naviguer vers users lors de l\'appel à goToUsers()', fakeAsync(() => {
    userService.getUsers.and.returnValue(of([]));

    const navigateSpy = spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    // Utilisation de ngZone.run() pour s'assurer que la navigation est dans la zone Angular
    ngZone.run(() => {
      component.goToUsers();
    });

    // Avancer le temps pour laisser les opérations asynchrones s'exécuter
    tick();

    // Vérifier les attentes
    expect(component.isLoading).toBe(false); // Vérifier que isLoading est revenu à false après la navigation
    expect(navigateSpy).toHaveBeenCalledWith(['/users']); // Vérifier que navigate a été appelé avec ['/users']
  }));

  /**
   * Test pour vérifier la gestion des erreurs lors de l'appel au service `getUsers`.
   */
  it('devrait gérer l\'erreur du service lors de l\'appel à goToUsers()', fakeAsync(() => {
    // Utilisation de la nouvelle fonction throwError pour émettre une erreur
    userService.getUsers.and.returnValue(throwError(() => new Error('Test error')));

    const consoleErrorSpy = spyOn(console, 'error');

    ngZone.run(() => {
      component.goToUsers();
    });

    // Avancer le temps pour laisser les opérations asynchrones s'exécuter
    tick();

    expect(component.isLoading).toBe(false); // Vérifier que isLoading est revenu à false après la gestion de l'erreur
    expect(consoleErrorSpy).toHaveBeenCalledWith('Erreur lors de la récupération des utilisateurs :', new Error('Test error'));
  }));
});

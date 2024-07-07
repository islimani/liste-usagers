import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {User, UserService} from './user.service';
import {Router} from '@angular/router';

/**
 * Tests unitaires pour le service `UserService`.
 */
describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let router: Router;

  /**
   * Configuration du module de test avant chaque test.
   */
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  /**
   * Vérifie que le service est créé.
   */
  it('devrait être créé', () => {
    expect(service).toBeTruthy();
  });

  /**
   * Teste la récupération des utilisateurs depuis l'API.
   */
  it('devrait récupérer les utilisateurs depuis l\'API', () => {
    const mockUsers: User[] = [
      {id: 1, name: 'User 1', email: 'user1@example.com', gender: 'male', status: 'active'},
      {id: 2, name: 'User 2', email: 'user2@example.com', gender: 'female', status: 'inactive'}
    ];

    service.getUsers().subscribe((users) => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  /**
   * Teste la navigation vers la page d'accueil.
   */
  it('devrait rediriger vers la page d\'accueil', () => {
    const navigateSpy = spyOn(router, 'navigate');

    service.goHome();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  /**
   * Nettoie les requêtes HTTP après chaque test.
   */
  afterEach(() => {
    httpMock.verify();
  });
});

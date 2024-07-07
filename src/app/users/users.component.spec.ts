import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {UsersComponent} from './users.component';
import {UserService} from '../user.service';
import {of, throwError} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

/**
 * Suite de tests pour le composant UsersComponent.
 * Cette suite de tests vérifie le bon fonctionnement des méthodes fetchUsers et goBack.
 */
describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let userService: jasmine.SpyObj<UserService>;

  /**
   * Configuration du module de test avant chaque test.
   */
  beforeEach(waitForAsync(() => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers', 'goHome']);

    TestBed.configureTestingModule({
      imports: [MatTableModule, NoopAnimationsModule], // Ajoutez les modules nécessaires ici
      declarations: [UsersComponent],
      providers: [
        {provide: UserService, useValue: userServiceSpy}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  }));

  /**
   * Test pour vérifier que le composant est créé correctement.
   */
  it('devrait être créé', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Test pour vérifier la récupération des utilisateurs avec fetchUsers.
   */
  it('devrait récupérer les utilisateurs avec fetchUsers', () => {
    const mockUsers = [
      {id: 1, name: 'User 1', email: 'user1@example.com', gender: 'male', status: 'active'},
      {id: 2, name: 'User 2', email: 'user2@example.com', gender: 'female', status: 'inactive'}
    ];

    userService.getUsers.and.returnValue(of(mockUsers));

    component.fetchUsers();
    fixture.detectChanges();

    expect(component.dataSource.data).toEqual(mockUsers);
    if (component.sort) {
      expect(component.dataSource.sort).toBe(component.sort);
    }
  });

  /**
   * Test pour vérifier la gestion des erreurs lors de la récupération des utilisateurs.
   */
  it('devrait gérer l\'erreur lors de la récupération des utilisateurs avec fetchUsers', () => {
    const errorMessage = 'Erreur de récupération';
    const consoleErrorSpy = spyOn(console, 'error');

    userService.getUsers.and.returnValue(throwError(() => new Error(errorMessage)));

    component.fetchUsers();
    fixture.detectChanges();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Erreur dans le fetchUsers:', new Error(errorMessage));
  });

  /**
   * Test pour vérifier que le tableau est initialisé correctement.
   */
  it('devrait initialiser le tableau avec MatTableDataSource', () => {
    expect(component.dataSource).toBeInstanceOf(MatTableDataSource);
    expect(component.dataSource.data).toEqual([]);
  });

  /**
   * Test pour vérifier que le composant est initialisé avec les colonnes appropriées.
   */
  it('devrait initialiser les colonnes du tableau correctement', () => {
    expect(component.displayedColumns).toEqual(['id', 'name', 'email', 'gender', 'status']);
  });

  /**
   * Test pour vérifier l'appel de fetchUsers lors de l'initialisation du composant.
   */
  it('devrait appeler fetchUsers lors de ngOnInit', () => {
    spyOn(component, 'fetchUsers');

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.fetchUsers).toHaveBeenCalled();
  });
});

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

// Interface représentant la structure d'un usager
export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

/**
 * Service `UserService` pour la gestion des utilisateurs.
 * Ce service gère les opérations liées aux utilisateurs, telles que la récupération depuis une API.
 */
@Injectable({
  providedIn: 'root'  // Déclaration du service en tant que singleton disponible globalement
})
export class UserService {

  private apiUrl = 'https://gorest.co.in/public/v2/users';  // URL de l'API pour les usagers

  /**
   * Constructeur du service `UserService`.
   * @param http Client HTTP pour effectuer des requêtes HTTP
   * @param router Service de routage pour la navigation entre les pages
   */
  constructor(private http: HttpClient, private router: Router) {
  }

  /**
   * Récupère la liste des utilisateurs depuis l'API.
   * @returns Observable<User[]> Un Observable qui émet un tableau d'utilisateurs
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  /**
   * Redirige l'utilisateur vers la page d'accueil.
   */
  goHome(): void {
    this.router.navigate(['/']);  // Navigation vers la route '/'
  }
}

import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  isLoading = false;

  /**
   * Constructeur du composant HomeComponent.
   * @param router Service de routage Angular pour la navigation entre les pages.
   * @param userService
   */
  constructor(private router: Router, private userService: UserService) {
  }

  /**
   * Méthode appelée lors du clic sur le bouton "Consulter usagers".
   * Redirige l'utilisateur vers la page des utilisateurs (/users).
   */
  goToUsers(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: () => {
        this.router.navigate(['/users']).then(() => {
          console.log('Navigation vers /users terminée');
        }).catch(err => {
          console.error('Erreur lors de la navigation vers /users :', err);
        });
      },
      complete: () => {
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des utilisateurs :', err);
        this.isLoading = false;
      }
    });
  }

}

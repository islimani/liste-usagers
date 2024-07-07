import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  /**
   * Constructeur du composant HomeComponent.
   * @param router Service de routage Angular pour la navigation entre les pages.
   */
  constructor(private router: Router) {
  }

  /**
   * Méthode appelée lors du clic sur le bouton "Consulter usagers".
   * Redirige l'utilisateur vers la page des utilisateurs (/users).
   */
  goToUsers(): void {
    this.router.navigate(['/users']).then(() => {
      console.log('Navigation vers /users terminée');
    }).catch(err => {
      console.error('Erreur lors de la navigation vers /users :', err);
    });
  }

}

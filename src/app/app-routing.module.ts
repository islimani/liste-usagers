import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UsersComponent} from './users/users.component';

// Définition des routes de l'application
const routes: Routes = [
  {path: '', component: HomeComponent},   // Route pour la page d'accueil, composant HomeComponent
  {path: 'users', component: UsersComponent}  // Route pour la page des usagers, composant UsersComponent
];

/**
 * Le module `AppRoutingModule` gère le routage de l'application Angular.
 * Il déclare les routes principales de l'application et les configure avec le `RouterModule`.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configuration du RouterModule avec les routes définies
  exports: [RouterModule]  // Export du RouterModule pour que les routes soient disponibles dans l'application
})
export class AppRoutingModule {
}

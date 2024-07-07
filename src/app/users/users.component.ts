import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {User, UserService} from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  // Colonnes affichées dans le tableau
  displayedColumns: string[] = ['id', 'name', 'email', 'gender', 'status'];

  // Source de données du tableau avec le type MatTableDataSource
  dataSource: MatTableDataSource<User> = new MatTableDataSource();

  // Référence au composant de tri MatSort
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private userService: UserService) {
  }

  /**
   * Méthode appelée lors de l'initialisation du composant.
   * Initialise et charge les utilisateurs au démarrage.
   */
  ngOnInit(): void {
    this.fetchUsers();
  }

  /**
   * Récupère la liste des utilisateurs depuis le service UserService.
   * Souscrit à l'observable pour mettre à jour la source de données du tableau et gérer le tri si possible.
   */
  fetchUsers(): void {
    this.userService.getUsers().subscribe(
      users => {
        this.dataSource.data = users;
        if (this.sort) {
          this.dataSource.sort = this.sort;
        }
      },
      error => {
        console.error('Erreur dans le fetchUsers:', error);
      }
    );
  }

  /**
   * Navigue vers la page d'accueil à l'aide du service UserService.
   */
  goBack(): void {
    this.userService.goHome();
  }
}

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatSortModule} from '@angular/material/sort';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HomeComponent} from './home/home.component';
import {UsersComponent} from './users/users.component';

/**
 * AppModule est la racine du module de l'application Angular.
 */
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule, // Module pour exécuter l'application dans un navigateur
    AppRoutingModule, // Module de routage pour l'application
    HttpClientModule, // Module pour les requêtes HTTP
    BrowserAnimationsModule, // Module pour les animations Angular
    MatTableModule, // Module pour les tables Angular Material
    MatButtonModule, // Module pour les boutons Angular Material
    MatSortModule, // Module pour le tri des tables Angular Material
    FlexLayoutModule // Module pour le layout flexible
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}


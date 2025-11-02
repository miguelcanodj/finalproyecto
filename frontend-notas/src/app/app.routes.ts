import { Routes } from '@angular/router';
import { MateriasComponent } from './components/materias/materias.component';
import { NotasComponent } from './components/notas/notas.component';

export const routes: Routes = [
  { path: '', redirectTo: 'materias', pathMatch: 'full' },
  { path: 'materias', component: MateriasComponent },
  { path: 'notas', component: NotasComponent },
];

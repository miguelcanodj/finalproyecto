import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MateriasComponent } from './components/materias/materias.component';
import { NotasComponent } from './components/notas/notas.component';

const routes: Routes = [
  { path: '', component: MateriasComponent },
  { path: 'notas', component: NotasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MateriasComponent } from './components/materias/materias.component';
import { NotasComponent } from './components/notas/notas.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    FormsModule,
    MateriasComponent,
    NotasComponent
  ]
})
export class AppComponent {
  title = 'Gestión de Notas';

  // 👇 Lógica del sidebar colapsable
  sidebarCollapsed = false;

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}

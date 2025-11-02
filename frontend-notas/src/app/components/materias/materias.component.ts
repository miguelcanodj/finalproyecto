import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-materias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {
  materias: any[] = [];
  nuevaMateria: string = '';
  cargando = false;
  error = '';

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    await this.cargarMaterias();
  }

  async cargarMaterias() {
    try {
      this.cargando = true;
      this.materias = await this.apiService.getMaterias();
    } catch (err) {
      this.error = 'Error al cargar materias.';
      console.error(err);
    } finally {
      this.cargando = false;
    }
  }

  async agregarMateria() {
    if (!this.nuevaMateria.trim()) return;
    try {
      await this.apiService.addMateria(this.nuevaMateria);
      this.nuevaMateria = '';
      await this.cargarMaterias();
    } catch (err) {
      console.error(err);
    }
  }

  async eliminarMateria(id: string) {
    if (!confirm('¿Seguro que deseas eliminar esta materia?')) return;
    try {
      await this.apiService.deleteMateria(id);
      await this.cargarMaterias();
    } catch (err) {
      console.error(err);
    }
  }
}

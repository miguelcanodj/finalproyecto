import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notas',
  standalone: true,
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css'],
  imports: [CommonModule, FormsModule]
})
export class NotasComponent implements OnInit {
  materias: any[] = [];
  notas: any[] = [];
  selectedMateria: string = '';
  descripcion: string = '';
  calificacion: number | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.cargarMaterias();
  }

  async cargarMaterias() {
    this.materias = await this.api.getMaterias();
  }

  async cargarNotas() {
    if (!this.selectedMateria) return;

    if (this.selectedMateria === 'todas') {
      // Trae todas las notas
      this.notas = await this.api.getNotas();
    } else {
      // Trae notas de la materia seleccionada
      this.notas = await this.api.getNotasPorMateria(this.selectedMateria);
    }
  }


  async agregarNota() {
    if (!this.selectedMateria || !this.descripcion || this.calificacion === null) return;
    await this.api.addNota(this.selectedMateria, this.descripcion, this.calificacion);
    this.descripcion = '';
    this.calificacion = null;
    this.cargarNotas();
  }

  async eliminarNota(id: string) {
    await this.api.deleteNota(id);
    this.cargarNotas();
  }

    // ✅ Esta función DEBE estar dentro de la clase
  notasPorMateria(nombreMateria: string) {
    return this.notas.filter(n => n.materiaId.nombre === nombreMateria);
  }

  calcularPromedio(): number {
    if (!this.notas.length) return 0;
    const suma = this.notas.reduce((acc, n) => acc + n.calificacion, 0);
    return parseFloat((suma / this.notas.length).toFixed(2));
  }
}

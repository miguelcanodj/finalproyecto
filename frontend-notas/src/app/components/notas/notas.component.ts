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
    if (
      !this.selectedMateria ||
      this.selectedMateria === 'todas' || // 🚫 evita usar "todas" como ID
      !this.descripcion ||
      this.calificacion === null
    ) {
      alert('Selecciona una materia específica y completa todos los campos');
      return;
    }

    try {
      await this.api.addNota(
        this.selectedMateria,  // debe ser el ID real
        this.descripcion,
        this.calificacion
      );

      this.descripcion = '';
      this.calificacion = null;
      await this.cargarNotas();

      alert('✅ Nota agregada correctamente');
    } catch (error) {
      console.error('Error al agregar nota:', error);
      alert('❌ Hubo un error al agregar la nota');
    }
  }

  async eliminarNota(id: string) {
    await this.api.deleteNota(id);
    this.cargarNotas();
  }

    // ✅ Esta función DEBE estar dentro de la clase
  notasPorMateria(nombreMateria: string) {
    return this.notas.filter(n => n.materiaId && n.materiaId.nombre === nombreMateria);
  }

  calcularPromedio(): number {
    if (!this.notas.length) return 0;
    const suma = this.notas.reduce((acc, n) => acc + n.calificacion, 0);
    return parseFloat((suma / this.notas.length).toFixed(2));
  }
}

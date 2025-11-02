import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:4000'; // Backend

  async getMaterias() {
    const res = await axios.get(`${this.baseUrl}/materias`);
    return res.data;
  }

  async addMateria(nombre: string) {
    const res = await axios.post(`${this.baseUrl}/materias`, { nombre });
    return res.data;
  }

  async deleteMateria(id: string) {
    const res = await axios.delete(`${this.baseUrl}/materias/${id}`);
    return res.data;
  }

  async getNotas() {
    const res = await axios.get(`${this.baseUrl}/notas`);
    return res.data;
  }

  async getNotasPorMateria(materiaId: string) {
    const res = await axios.get(`${this.baseUrl}/notas/materia/${materiaId}`);
    return res.data;
  }

  async addNota(materiaId: string, descripcion: string, calificacion: number) {
    const res = await axios.post(`${this.baseUrl}/notas`, {
      materiaId,
      descripcion,
      calificacion
    });
    return res.data;
  }

  async deleteNota(id: string) {
    const res = await axios.delete(`${this.baseUrl}/notas/${id}`);
    return res.data;
  }
}

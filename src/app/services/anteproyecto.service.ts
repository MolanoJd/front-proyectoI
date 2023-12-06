import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class AnteproyectoService {

  constructor(private httpClient: HttpClient) { }

  // Agregar un anteproyecto
  public crearAnteproyecto(anteproyecto: any) {
    return this.httpClient.post(`${baserUrl}/anteproyectos/`, anteproyecto);
  }

  // Obtener una lista de anteproyectos
  public listarAnteproyectos() {
    return this.httpClient.get(`${baserUrl}/anteproyectos/`);
  }

// Obtener anteproyectos por usuario
public listarAnteproyectosPorUsuario(email: string) {
  return this.httpClient.get(`${baserUrl}/anteproyectos/usuario/${email}`);
}
public listarAnteproyectosPorUsuarioID(userID: number) {
  return this.httpClient.get(`${baserUrl}/anteproyectos/usuario/id/${userID}`);
}

  // Obtener un anteproyecto por su ID
  public obtenerAnteproyectoPorId(anteproyectoId: number) {
    return this.httpClient.get(`${baserUrl}/anteproyectos/${anteproyectoId}`);
  }

  // Actualizar un anteproyecto
  public actualizarAnteproyecto(anteproyectoId: number, anteproyecto: any) {
    return this.httpClient.put(`${baserUrl}/anteproyectos/${anteproyectoId}`, anteproyecto);
  }

  // Eliminar un anteproyecto por su ID
  public eliminarAnteproyecto(anteproyectoId: number) {
    return this.httpClient.delete(`${baserUrl}/anteproyectos/${anteproyectoId}`);
  }

  
}

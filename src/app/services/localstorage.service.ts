import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  guardarNotificacion(email: string, mensaje: string) {
    localStorage.setItem(`notificacion_${email}`, mensaje);
  }

  obtenerNotificacion(email: string): string | null {
    return localStorage.getItem(`notificacion_${email}`);
  }

  limpiarNotificacion(email: string) {
    localStorage.removeItem(`notificacion_${email}`);
  }
}

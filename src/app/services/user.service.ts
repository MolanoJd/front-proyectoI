import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import baserUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {



    constructor(private httpClient: HttpClient) { }

    public añadirUsuario(user: any, rol: string) {
      const params = new HttpParams().set('rol', rol);
      return this.httpClient.post(`${baserUrl}/usuarios/`, user, { params: params });
  }
  
  public actualizarUsuario(email: string, usuarioDTO: any, rol: string): Observable<any> {
    const params = new HttpParams().set('rol', rol);
    return this.httpClient.put(`${baserUrl}/usuarios/${email}/actualizar/`, usuarioDTO,{ params: params });
}
  public obtenerUsuario(username:any){
    return this.httpClient.get(`${baserUrl}/usuarios/${username}`);
  }
  /*public addProject(userId:any,anteproyectoId:any){
    return this.httpClient.put(`${baserUrl}/usuarios/`,userId);
  }*/
  public addProject(username: string, atrTitulo: string) {
    const params = new HttpParams().set('atrTitulo', atrTitulo); // Configurar parámetros de solicitud
    console.log('Entrando a addProject');
    return this.httpClient.put(`${baserUrl}/usuarios/${username}`, null, { params: params });
  }
  
  public addFileToAnteproyecto(userId: number, atrTitulo: string, archivoAdjunto: File) {
    const formData = new FormData();
    formData.append('archivoAdjunto', archivoAdjunto);

    return this.httpClient.put(`${baserUrl}/usuarios/${userId}/addFileToAnteproyecto?atrTitulo=${atrTitulo}`, formData);
}
      public eliminarUsuario(UsuarioId:any){
        return this.httpClient.delete(`${baserUrl}/usuarios/${UsuarioId}`);
      }
    public listarUsuarios() {
      return this.httpClient.get(`${baserUrl}/usuarios/`);
    }
    public addCommentToAnteproyecto(username: string, atrTitulo: string, comentario: string) {
      const body = {comentario};
      return this.httpClient.put(`${baserUrl}/usuarios/${username}/agregarComentario?atrTitulo=${atrTitulo}`, body);
    }
    descargarArchivo(tituloAnteproyecto: string, nombreArchivo: string): Observable<Blob> {
      return this.httpClient.get(`${baserUrl}/usuarios/${tituloAnteproyecto}/descargar/${nombreArchivo}`, { responseType: 'blob' });
    }

}

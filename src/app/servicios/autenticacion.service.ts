import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { NuevoUsuario } from '../interfaces/nuevo-usuario';
import { JwtDto } from '../interfaces/jwt-dto';
import { LoginUsuario } from '../interfaces/login-usuario';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  autenticacionURL = 'https://argproyecto.herokuapp.com/auth/';
  usuario: BehaviorSubject<any>;

  constructor(private httpClient: HttpClient) {
    console.log("El servicio de autenticación está corriendo.");
    this.usuario = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('token') || '{}'));
  }

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(this.autenticacionURL + 'nuevo', nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDto> {
    return this.httpClient.post<JwtDto>(this.autenticacionURL + 'login', loginUsuario);
  }
  


  token(){
    console.log("Archivo Autenticacion Service, token(): ", sessionStorage.getItem('token') );
    return  sessionStorage.getItem('token');
  }

  setToken(token:string): void {
    sessionStorage.setItem('token', token);
  }

  removeToken(): void {
    sessionStorage.removeItem('token');
    console.log("Token removido, desde archivo autentication service", sessionStorage.getItem('token'));
  }

}
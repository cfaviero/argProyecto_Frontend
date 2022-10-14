import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAcerca_De } from '../interfaces/iacerca-de';
import { IEducacion } from '../interfaces/ieducacion';
import { IExperiencia } from '../interfaces/iexperiencia';
import { Ipersona } from '../interfaces/ipersona';
import { IProyectos } from '../interfaces/iproyectos';
import { ISkills } from '../interfaces/iskills';

@Injectable({
  providedIn: 'root'
})
export class PorfolioService {
  url:string="http://localhost:8080/api/";

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'});


  constructor(private httpClient:HttpClient) { }

  /* METODOS GET ALL */

  obtenerDatosPersonas():Observable<any> {
    return this.httpClient.get<any>( this.url + 'personas' );
  }

  obtenerDatosAcercaDe():Observable<IAcerca_De> {
    return this.httpClient.get<IAcerca_De>( this.url + 'acerca_de');
  }

  obtenerDatosExperiencias():Observable<IExperiencia> {
    return this.httpClient.get<IExperiencia>( this.url + 'experiencias');
  }

  obtenerDatosEducaciones():Observable<IEducacion> {
    return this.httpClient.get<IEducacion>( this.url + 'educaciones');
  }

  obtenerDatosProyectos():Observable<IProyectos> {
    return this.httpClient.get<IProyectos>( this.url + 'proyectos');
  }

  obtenerDatosConocimientos():Observable<ISkills> {
    return this.httpClient.get<ISkills>( this.url + 'conocimientos');
  }


  /* METODOS GET ONE */
  
  obtenerDatoPersona(id: number):Observable<Ipersona>{
    return this.httpClient.get<Ipersona>( this.url + 'persona/' + id);
  }

  obtenerDatoAcercaDe(id: number):Observable<IAcerca_De> {
    return this.httpClient.get<IAcerca_De>( this.url + 'acerca_de/' + id);
  }

  obtenerDatoExperiencia(id: number):Observable<IExperiencia> {
    return this.httpClient.get<IExperiencia>( this.url + 'experiencia/' + id);
  }

  obtenerDatoEducacion(id: number):Observable<IEducacion> {
    return this.httpClient.get<IEducacion>( this.url + 'educacion/' + id);
  }

  obtenerDatoProyecto(id: number):Observable<IProyectos> {
    return this.httpClient.get<IProyectos>( this.url + 'proyectos/' + id);
  }

  obtenerDatoConocimiento(id: number):Observable<ISkills> {
    return this.httpClient.get<ISkills>( this.url + 'conocimiento/' + id);
  }



  /*POST*/

  postPersona( Persona: any ):Observable<any> {
    let PersonaJSON = JSON.stringify(Persona);
    return this.httpClient.post<any>( this.url + 'persona', PersonaJSON , { headers: this.headers} );
  }
  
  postAcercaDe( Acerca_De: any ):Observable<any> {
    let Acerca_DeJSON = JSON.stringify(Acerca_De);
    return this.httpClient.post<any>( this.url + 'acerca_de', Acerca_DeJSON , { headers: this.headers} );
  }

  postExperiencia( Experiencia: IExperiencia ):Observable<IExperiencia> {
    return this.httpClient.post<IExperiencia>( this.url + 'experiencia', Experiencia , { headers: this.headers} );
  }

  postEducacion( Educacion: IEducacion ):Observable<IEducacion> {
    return this.httpClient.post<IEducacion>( this.url + 'educacion', Educacion , { headers: this.headers} );
  }

  postProyecto( Proyecto: IProyectos ):Observable<IProyectos> {
    return this.httpClient.post<IProyectos>( this.url + 'proyecto', Proyecto , { headers: this.headers} );
  }

  postConocimiento( Skill: ISkills ):Observable<ISkills> {
    return this.httpClient.post<ISkills>( this.url + 'conocimiento', Skill , { headers: this.headers} );
  }



  /*PUT*/

  putPersona( Persona: any, id: Number ):Observable<any> {
    return this.httpClient.put<any>( this.url + 'persona/' + id, Persona , { headers: this.headers} );
  }

  putAcercaDe( Acerca_De: any, id: Number ):Observable<any> {
    return this.httpClient.put<any>( this.url + 'acerca_de/' + id, Acerca_De , { headers: this.headers} );
  }

  putExperiencia( Experiencia: IExperiencia, id: Number  ):Observable<IExperiencia> {
    return this.httpClient.put<IExperiencia>( this.url + 'experiencia/' + id, Experiencia , { headers: this.headers} );
  }

  putEducacion(Educacion: IEducacion, id: Number):Observable<IEducacion> {
    return this.httpClient.put<IEducacion>( this.url + 'educacion/' + id, Educacion , { headers: this.headers} );
  }

  putProyecto( Proyecto: IProyectos, id: Number  ):Observable<IProyectos> {
    return this.httpClient.put<IProyectos>( this.url + 'proyecto/' + id, Proyecto , { headers: this.headers} );
  }

  putConocimiento( Skill: ISkills, id: Number  ):Observable<ISkills> {
    return this.httpClient.put<ISkills>( this.url + 'conocimiento/' + id, Skill , { headers: this.headers} );
  }



  /* DELETE */
  deletePersona( id: Number ):Observable<any> {
    return this.httpClient.delete<any>( this.url + 'persona/' + id , { headers: this.headers} );
  }
  
  deleteAcercaDe( id: Number ):Observable<any> {
    return this.httpClient.delete<any>( this.url + 'acerca_de/' + id , { headers: this.headers} );
  }

  deleteEducacion( id: Number ):Observable<IEducacion> {
    return this.httpClient.delete<IEducacion>( this.url + 'educacion/' + id , { headers: this.headers} );
  }

  deleteExperiencia( id: Number ):Observable<IExperiencia> {
    return this.httpClient.delete<IExperiencia>( this.url + 'experiencia/' + id ,  { headers: this.headers} );
  }

  deleteProyecto( id: Number ):Observable<IProyectos> {
    return this.httpClient.delete<IProyectos>( this.url + 'proyecto/' + id ,  { headers: this.headers} );
  }

  deleteConocimiento( id: Number ):Observable<ISkills> {
    return this.httpClient.delete<ISkills>( this.url + 'conocimiento/' + id ,  { headers: this.headers} );
  }


}

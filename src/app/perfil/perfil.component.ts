import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PorfolioService } from '../servicios/porfolio.service';
import { TokenService } from '../servicios/token.service.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  perfil: any = [];
  form: FormGroup;
  show: boolean = false;
  edicion: boolean = false;
  roles!: String[];
  esAdmin: boolean = false;

  constructor(private datosPorfolio:PorfolioService,
    private formBuilder: FormBuilder,
    private tokenService : TokenService) {
      this.form= new FormGroup({
        nombre: new FormControl([ '', [Validators.required, Validators.minLength(2)]]),
        apellido: new FormControl([ '', [Validators.required, Validators.minLength(2)]]),
        descripcion: new FormControl([ '', [Validators.required, Validators.minLength(2)]]),
        foto_perfil: new FormControl([ '', [Validators.required, Validators.minLength(2)]]),
        foto_banner: new FormControl([ '', [Validators.required, Validators.minLength(2)]]),
        url_instagram: new FormControl([ '', [Validators.required, Validators.minLength(2)]]),
        url_twitter: new FormControl([ '', [Validators.required, Validators.minLength(2)]]),
        url_facebook: new FormControl([ '', [Validators.required, Validators.minLength(2)]]),
    })
  }

  ngOnInit(): void {

      this.datosPorfolio.obtenerDatosPersonas().subscribe(data => {
        this.perfil=data[0];
        console.log("mi porta", this.perfil)
      })

      this.roles = this.tokenService.getAuthorities();
      this.roles.forEach(rol => {
        if (rol === 'ROLE_ADMIN'){
          this.esAdmin = true;
        }
      })

  }


  onEdit(id: any, event: Event) {
    
    console.log("this.form.value: " , this.form.value);
    console.log("id: " , id);
    
    this.form.patchValue({
      nombre: this.perfil.nombre,
      apellido: this.perfil.apellido,
      descripcion: this.perfil.descripcion,
      foto_perfil: this.perfil.foto_perfil,
      foto_banner: this.perfil.foto_banner,
      url_instagram: this.perfil.url_instagram,
      url_twitter: this.perfil.url_twitter,
      url_facebook: this.perfil.url_facebook      
    });

    console.log("this.form.value: " , this.form.value);

    this.edicion = true;
  }

  onSaveEdit( id: any, event: Event ){
    event.preventDefault;
    this.datosPorfolio.putPersona(this.form.value, id).subscribe(data => {

      console.log("this.form.value: " , this.form.value);
      console.log("PERSONA PUT Data", data);

      this.datosPorfolio.obtenerDatosPersonas().subscribe(data => {
        this.perfil=data[0];
      });

    this.edicion = false;
    });
  }

  

}
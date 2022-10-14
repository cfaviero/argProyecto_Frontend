import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PorfolioService } from 'src/app/servicios/porfolio.service';
import { TokenService } from 'src/app/servicios/token.service.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

idEdit!: number;
i!: number;
experiencias:any;
form: FormGroup;
show : boolean = false;
roles!: String[];
esAdmin: boolean = false;


  constructor(private datosPorfolio : PorfolioService, private formBuilder : FormBuilder, private tokenService : TokenService) {
    this.form = new FormGroup({
      nombreEmpresa: new FormControl([ '', [Validators.required, Validators.minLength(2)]]),
      fechaInicio: new FormControl([ '', [Validators.required, Validators.minLength(2)]]),
      esTrabajoActual: new FormControl([ '', [Validators.required, Validators.minLength(2)]]),
      descripcion: new FormControl([ '', [Validators.required, Validators.minLength(2)]]),
      imagen: new FormControl([ '', [Validators.required, Validators.minLength(2)]])
    })
  }

  ngOnInit(): void {

    this.datosPorfolio.obtenerDatosExperiencias().subscribe(data => {
      this.experiencias=data;
      })

      this.roles = this.tokenService.getAuthorities();
      this.roles.forEach(rol => {
        if (rol === 'ROLE_ADMIN'){
          this.esAdmin = true;
        }
      })

  }

  onEdit(id: any, i: number, event: Event) {
    this.idEdit! = id;
    this.i = i;

    this.form.setValue({
      nombreEmpresa: this.experiencias[i].nombreEmpresa,
      fechaInicio: this.experiencias[i].fechaInicio,
      esTrabajoActual: this.experiencias[i].esTrabajoActual,
      descripcion: this.experiencias[i].descripcion,
      imagen: this.experiencias[i].imagen
    });

  }

  onSaveEdit(event: Event){
    event.preventDefault;
    this.datosPorfolio.putExperiencia(this.form.value, this.idEdit).subscribe(data => {
      console.log("this.form.value: " , this.form.value);
      console.log("id: " , this.idEdit);
      console.log("EXPERIENCIA method PUT Data Editada", data);
      this.datosPorfolio.obtenerDatoExperiencia(this.idEdit).subscribe(data => {
        console.log("Dato: " + JSON.stringify(data));
        this.experiencias[this.i]=data;
        console.log("experiencias[i : ", this.experiencias[this.i]);
      });

    });
  }


  onCrear(event: Event){
    let objForm = this.form.controls;
    let keysForms =  Object.keys(objForm);
    let valueForms = Object.values(objForm);

    valueForms[0].setValue('');
    valueForms[1].setValue('');
    valueForms[2].setValue('');
    valueForms[3].setValue('');
    valueForms[4].setValue('');

  }


  onDelete(i:number, event: Event){
    this.i = i;
    event.preventDefault;
        this.datosPorfolio.deleteExperiencia(this.experiencias[i].id).subscribe(data => {
          console.log("Borrando registro", data);
          this.datosPorfolio.obtenerDatosExperiencias().subscribe(data => {
            this.experiencias=data;
          });

          });
      }
  
  onSaveNuevo(event: Event){
    event.preventDefault;
    this.datosPorfolio.postExperiencia(this.form.value).subscribe(data => {
    
        this.datosPorfolio.obtenerDatosExperiencias().subscribe(data => {
          this.experiencias=data;
          });
        });
      }
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PorfolioService } from 'src/app/servicios/porfolio.service';
import { TokenService } from 'src/app/servicios/token.service.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

idEdit!: number;
i!: number;
educaciones:any;
form: FormGroup;
show: boolean = false;
roles!: String[];
esAdmin: boolean = false;

  constructor(private datosPorfolio:PorfolioService,private formBuilder : FormBuilder, private tokenService : TokenService) {
    this.form = new FormGroup({
      carrera_curso: new FormControl(''),
      instituto: new FormControl(''),
      fecha_inicio: new FormControl(''),
      estado_actual: new FormControl(''),
      descripcion: new FormControl(''),
      url_imagen: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.datosPorfolio.obtenerDatosEducaciones().subscribe(data => {
      this.educaciones=data;
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
    
    console.log("i", i);
    console.log("idEdit", this.idEdit);
    console.log("this.form.value: " , this.form.value);
    console.log("id: " , id);

    this.form.setValue({
      carrera_curso: this.educaciones[i].carrera_curso,
      instituto: this.educaciones[i].instituto,
      fecha_inicio: this.educaciones[i].fecha_inicio,
      estado_actual: this.educaciones[i].estado_actual,
      descripcion: this.educaciones[i].descripcion,
      url_imagen: this.educaciones[i].url_imagen
    });

  }

  onSaveEdit(event: Event){
    event.preventDefault;
    this.datosPorfolio.putEducacion(this.form.value, this.idEdit).subscribe(data => {

      console.log("this.form.value: " , this.form.value);
      console.log("id: " , this.idEdit);
      console.log("EDUCACIÓN method PUT Data Editada", data);

      this.datosPorfolio.obtenerDatoEducacion(this.idEdit).subscribe(data => {
        console.log("Dato: " + JSON.stringify(data));
        this.educaciones[this.i]=data;
        console.log("miPortafolio[i : ", this.educaciones[this.i]);
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
    valueForms[5].setValue('');

  }


  onDelete(i:number, event: Event){
    this.i = i;
    event.preventDefault;
    this.datosPorfolio.deleteEducacion(this.educaciones[i].id).subscribe(data => {
      console.log("Borrando registro", data);
      this.datosPorfolio.obtenerDatosEducaciones().subscribe(data => {
        this.educaciones=data;
        });

    });
  }

  onSaveNuevo(event: Event){
    event.preventDefault;
    this.datosPorfolio.postEducacion(this.form.value).subscribe(data => {
    
      this.datosPorfolio.obtenerDatosEducaciones().subscribe(data => {
        this.educaciones=data;
        });
    });
  }

}

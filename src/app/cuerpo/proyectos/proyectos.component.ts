import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PorfolioService } from 'src/app/servicios/porfolio.service';
import { TokenService } from 'src/app/servicios/token.service.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})

export class ProyectosComponent implements OnInit {

  idEditar!: number;
  i!: number;
  proyectos:any;
  form: FormGroup;
  show: boolean = false;
  roles!: String[];
  esAdmin: boolean = false;


  constructor(private datosPorfolio : PorfolioService,
    private formBuilder : FormBuilder, private tokenService : TokenService) {

      this.form = new FormGroup({
        nombreProyecto: new FormControl(''),
        descripcion: new FormControl(''),
        url_proyecto: new FormControl('')
    })
  }


  ngOnInit(): void {
    
    this.datosPorfolio.obtenerDatosProyectos().subscribe(data => {
      this.proyectos=data;
    })

    this.roles = this.tokenService.getAuthorities();
      this.roles.forEach(rol => {
        if (rol === 'ROLE_ADMIN'){
          this.esAdmin = true;
        }
      })

  }


  onEdit(id: any, i: number, event: Event) {
    this.idEditar! = id;
    this.i = i;
    
    console.log("i", i);
    console.log("idEdit", this.idEditar);
    console.log("this.form.value: " , this.form.value);
    console.log("id: " , id);

    this.form.setValue({
      nombreProyecto: this.proyectos[i].nombreProyecto,
      descripcion: this.proyectos[i].descripcion,
      url_proyecto: this.proyectos[i].url_proyecto,
    });

  }

  onSaveEdit(event: Event){
    event.preventDefault;
    this.datosPorfolio.putProyecto(this.form.value, this.idEditar).subscribe(data => {

      console.log("this.form.value: " , this.form.value);
      console.log("id: " , this.idEditar);
      console.log("PROYECTO method PUT Data Editada", data);

      this.datosPorfolio.obtenerDatoProyecto(this.idEditar).subscribe(data => {
        console.log("Dato: " + JSON.stringify(data));
        this.proyectos[this.i]=data;
        console.log("miPortafolio[i : ", this.proyectos[this.i]);
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

  }


  onDelete(i:number, event: Event){
    this.i = i;
    event.preventDefault;
    this.datosPorfolio.deleteProyecto(this.proyectos[i].id).subscribe(data => {
      console.log("Borrando registro", data);
      this.datosPorfolio.obtenerDatosProyectos().subscribe(data => {
        this.proyectos=data;
        });

    });
  }

  onSaveNuevo(event: Event){
    event.preventDefault;
    this.datosPorfolio.postProyecto(this.form.value).subscribe(data => {
    
      this.datosPorfolio.obtenerDatosProyectos().subscribe(data => {
        this.proyectos=data;
        });
    });
  }


}
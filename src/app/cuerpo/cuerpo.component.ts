import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PorfolioService } from '../servicios/porfolio.service';
import { TokenService } from '../servicios/token.service.service';


@Component({
  selector: 'app-cuerpo',
  templateUrl: './cuerpo.component.html',
  styleUrls: ['./cuerpo.component.css']
})


export class CuerpoComponent implements OnInit {

  edit! : number;
  acercade : any  = [];
  form : FormGroup;
  show : boolean = false;
  edicion : boolean = false;
  roles!: String[];
  esAdmin: boolean = false;

  constructor(public datosPorfolio : PorfolioService, private formBuilder : FormBuilder, private tokenService : TokenService) {

        this.form = new FormGroup({
          descripcion: new FormControl('')

      })
  
  
  }

  ngOnInit(): void {

    this.datosPorfolio.obtenerDatoAcercaDe(1).subscribe(data => {
      this.acercade=data;
      console.log("NGONINIT ", this.acercade)
    })

    this.roles = this.tokenService.getAuthorities();
      this.roles.forEach(rol => {
        if (rol === 'ROLE_ADMIN'){
          this.esAdmin = true;
        }
      })
  }


  onEdit(id: any, event: Event) {
    this.edit! = id;
    console.log("this.form.value: " , this.form.value);
    console.log("edit: " , this.edit);

    this.form.patchValue({
      descripcion: this.acercade.descripcion
    });

  }

  onSaveEdit(event: Event){
    event.preventDefault;
    this.datosPorfolio.putAcercaDe(this.form.value, this.edit).subscribe(data => {

      console.log("this.form.value: " , this.form.value);
      console.log("AcErCaDe method PUT Data Editada", data);

      this.datosPorfolio.obtenerDatoAcercaDe(this.edit).subscribe(data => {
        console.log("Dato: " + JSON.stringify(data));
        this.acercade=data;
        console.log("miPortafolio[i : ", this.acercade);
      });

    });
  }



}
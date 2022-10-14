import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PorfolioService } from 'src/app/servicios/porfolio.service';
import { TokenService } from 'src/app/servicios/token.service.service';

@Component({
  selector: 'app-conocimientos',
  templateUrl: './conocimientos.component.html',
  styleUrls: ['./conocimientos.component.css']
})
export class ConocimientosComponent implements OnInit {

i! : number;
skills: any;
form: FormGroup;
show: boolean = false;
mostrar: boolean = false;
roles!: String[];
esAdmin: boolean = false;

  constructor(
    private datosPorfolio:PorfolioService, private formBuilder:FormBuilder, private tokenService : TokenService) {
      this.form = new FormGroup({
        nombreCono: new FormControl([ '', [Validators.required, Validators.minLength(2)]]),
        nivelCono: new FormControl([ '', [Validators.required, Validators.minLength(2)]])
      })
    }

  ngOnInit(): void {

    this.datosPorfolio.obtenerDatosConocimientos().subscribe(data => {
      this.skills=data;
      console.log("ngOnInit", this.skills)
    })

    this.roles = this.tokenService.getAuthorities();
      this.roles.forEach(rol => {
        if (rol === 'ROLE_ADMIN'){
          this.esAdmin = true;
        }
      })
  }


  onCrear(event: Event){
    let objForm = this.form.controls;
    let keysForms =  Object.keys(objForm);
    console.log("keysForm: ", keysForms);
    let valueForms = Object.values(objForm);
    console.log("valuesForm: ", valueForms);

    valueForms[0].setValue('');
    valueForms[1].setValue('');

  }


  onSave(event: Event ){
    event.preventDefault;
    this.datosPorfolio.postConocimiento(this.form.value).subscribe(data => {
      console.log("this.form.value: " , this.form.value);
      console.log("AcercaDe method post Data", data);

      this.datosPorfolio.obtenerDatosConocimientos().subscribe(data => {
        this.skills=data;
      });
    });
  }

  onDelete(i:number, event: Event){
    this.i = i;
    event.preventDefault;
        this.datosPorfolio.deleteConocimiento(this.skills[i].id).subscribe(data => {
          console.log("Borrando registro", data);

          this.datosPorfolio.obtenerDatosConocimientos().subscribe(data => {
            this.skills=data;
          });

          });
      }





}
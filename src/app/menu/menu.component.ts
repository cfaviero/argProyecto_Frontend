import { Component, OnInit } from '@angular/core';
import { PorfolioService } from '../servicios/porfolio.service';
import { TokenService } from '../servicios/token.service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  redPerfil: any = [];
  isLogged = false;

  constructor(private tokenService: TokenService,
              private datosPorfolio:PorfolioService) { }

  ngOnInit() {
        this.datosPorfolio.obtenerDatoPersona(1).subscribe(data => {
          this.redPerfil=data;
          console.log("ngoninit-menu ", this.redPerfil);
        }) 

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    } 
  }

  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }

}
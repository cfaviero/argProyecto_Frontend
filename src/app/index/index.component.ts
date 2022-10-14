import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../servicios/token.service.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isLogged = false;
  nombreUsuario = '';

  constructor(private tokenService: TokenService,
              private router: Router) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.nombreUsuario = this.tokenService.getUserName();

      setTimeout(() => {
        this.router.navigate(['porfolio']);
    }, 2000);
      
    } else {
      this.isLogged = false;
      this.nombreUsuario = '';

      setTimeout(() => {
        this.router.navigate(['login']);
    }, 2000);

    }

    

  }

}
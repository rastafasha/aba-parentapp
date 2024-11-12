import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express-serve-static-core';
import { of, delay } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {

  // public cargando: boolean = true;
  
  user:any;
  usuario:any;
  
  parent:any;
  documents_pending:any = [];

  constructor(
    public authService:AuthService,
   
    public userService:UserService,
    public activatedRoute:ActivatedRoute,
  ) { 
    this.user = this.authService.user;
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.authService.getLocalStorage();
    this.authService.closeMenu();

    let USER = localStorage.getItem("user");
    this.user = JSON.parse(USER ? USER: '');
    this.usuario = this.user;
    this.getInfoUser();

    
  }
  
  

  getInfoUser(){
    // this.cargando = true;
    this.userService.showParentProfile(this.usuario.id).subscribe((resp:any)=>{
      // this.cargando = false;
      // console.log(resp);
      this.parent = resp.parent;
      this.documents_pending = resp.parent.documents_pending;

      let jsonObj1 = JSON.parse(this.documents_pending) || '';
      this.documents_pending = jsonObj1;
      // console.log(this.documents_pending);
    })
  }

  



}

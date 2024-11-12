import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { of, delay } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // @Input() usuario:any;
  public cargando: boolean = true;
  
  
  user:any;
  usuario:any;
  patient_id:number;
  patient:any = [];
  appointments:any;
  num_appointment:any;
  money_of_appointments:any;
  num_appointment_pendings:any;
  patient_selected:any;
  appointment_pendings:any;
  parent:any;

  constructor(
    public authService:AuthService,
   
    public userService:UserService,
    public activatedRoute:ActivatedRoute,
    private router: Router,
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
    this.cargando = true;
    this.userService.showParentProfile(this.usuario.id).subscribe((resp:any)=>{
      this.cargando = false;
      // console.log(resp);
      this.parent = resp.parent;
      // this.getPatient();
    })
  }

  getPatient(){
    this.userService.showPatientProfile(this.patient_id).subscribe((resp:any)=>{
      // console.log(resp);
      this.patient_selected= resp.patient;
    })
  }

}

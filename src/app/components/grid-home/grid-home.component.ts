import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { of, delay } from 'rxjs';
import { User } from 'src/app/models/user';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-grid-home',
  templateUrl: './grid-home.component.html',
  styleUrls: ['./grid-home.component.css']
})
export class GridHomeComponent implements OnInit {

  // @Input() childMessage:any=[]; //recibe la data
  // @Output() userV: EventEmitter<any>  = new EventEmitter();// envia la data
  public cargando: boolean = true;

  
  user:any;
  usuario:any;
  patient:any = [];
  notesRbt:any ;
  notesBCBA:any ;

  settting:any = [];
  parent:User;
  name:User;
  patient_identifier:string;

  imagenSerUrl = environment.url_media;

  constructor(
    public authService:AuthService,
    public userService:UserService,
    public configService:ConfigService,
    public appoitmentService:AppointmentService,
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
    
    // this.getConfig();
    
  }

  getInfoUser(){
    this.cargando = true;
    this.userService.showParentProfile(this.usuario.id).subscribe((resp:any)=>{
      this.cargando = false;
      console.log(resp);
      this.parent = resp.parent;
      this.name = resp.parent.name;
      this.patient_identifier = this.parent.patient_identifier;
      this.getRbtNoteRecent();
      this.getBcbaNoteRecent();
      this.getInfoPatient();
    })
  }
  getRbtNoteRecent(){
    this.userService.showNoteRbtRecent(this.parent.id, this.patient_identifier).subscribe((resp:any)=>{
      // console.log(resp);
      this.notesRbt = resp.notesRbt;
    })
  }
  getBcbaNoteRecent(){
    this.userService.showNoteBCBARecent(this.parent.id, this.patient_identifier).subscribe((resp:any)=>{
      // console.log(resp);
      this.notesBCBA = resp.notesBcba;
    })
  }

  getInfoPatient(){
    this.cargando = true;
    this.userService.showParentPatientProfile(this.parent.id, this.patient_identifier).subscribe((resp:any)=>{
      this.cargando = false;
      this.patient = resp.patient;
    })
  }

  getConfig(){
    this.configService.getAllConfig().subscribe((resp:any)=>{
      // console.log(resp);
      this.settting = resp.settings.data[0]
      // console.log(this.settting);
    })
  }

  

  

   openOrange(){

    var modalcart = document.getElementsByClassName("div-restaurant");
      for (var i = 0; i<modalcart.length; i++) {
         modalcart[i].classList.toggle("div-restaurant-activo");
         var modalcart = document.getElementsByClassName("datoscita");
         modalcart[i].classList.toggle("datoscita_mostrar");
         

      }
  }

   openGreen(){

    var modalcart = document.getElementsByClassName("div-mercados");
    for (var i = 0; i<modalcart.length; i++) {
        modalcart[i].classList.toggle("div-mercados-activo");
        var modalcart = document.getElementsByClassName("oculto");
         modalcart[i].classList.toggle("mostrar");
        var modalcart = document.getElementsByClassName("perfil-home");
         modalcart[i].classList.toggle("perfil-home-acc");
         
        }
    }
    
  //    openBlue(){
        
  //       var modalcart = document.getElementsByClassName("div-farmacia");
  //       var textoinicial = document.getElementsByClassName("mostrar");
  //       for (var i = 0; i<modalcart.length; i++) {
  //           modalcart[i].classList.toggle("div-farmacia-activa");
  //           var modalcart = document.getElementsByClassName("datosmedicinas-oculto");
  //            modalcart[i].classList.toggle("datosmedicinas");

  //            textoinicial[i].classList.add("ocultar");
  //            textoinicial[i].classList.remove("mostrar");

  //     }
  // }

  openBlue() {
    var modalcart = document.getElementsByClassName("div-farmacia");
    var textoinicial = document.getElementsByClassName("texto-inicial");
    
    for (var i = 0; i < modalcart.length; i++) {
        // Alternar la clase para el modal
        modalcart[i].classList.toggle("div-farmacia-activa");
        textoinicial[i].classList.toggle("texto-inicial-oculto");
        
        // Alternar la clase para los datos de medicinas
        var modalcartDatos = document.getElementsByClassName("datosmedicinas-oculto");
        modalcartDatos[i].classList.toggle("datosmedicinas");

        
    }
}

   

 

}

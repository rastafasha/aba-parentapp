import { Component, OnInit } from '@angular/core';
import { of, delay } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  loading:boolean;
  obs$ = of(1).pipe(delay(500));
  
  

  user:any;
  usuario:any;
  patient:any;
  appointments:any;
  patient_id:number;
  num_appointment:any;
  money_of_appointments:any;
  num_appointment_pendings:any;
  appointment_attention:any;
  patient_selected:any;
  appointment_pendings:any;
  parent:any;

  public name: string = '';
  public surname: string = '';
  public phone: any;
  public email: string = '';
  public password: string = '';
  public password_confirmation: string = '';
  public birth_date: string = '';
  public gender: number = 1;
  public education: string = '';
  public designation: string = '';
  public address: string = '';

  public FILE_AVATAR:any;
  public IMAGE_PREVISUALIZA:any = 'assets/img/user-06.jpg';

  valid_form:boolean = false;
  valid_form_success:boolean = false;

  public text_success:string = '';
  public text_validation:string = '';
  public locations_selected: number[] = [];

  imagenSerUrl = environment.url_media;

  constructor(
    public authService:AuthService,
    public userService:UserService,
  ) { 
    this.user = this.authService.user;
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.authService.closeMenu();

    let USER = localStorage.getItem("user");
    this.user = JSON.parse(USER ? USER: '');
    this.usuario = this.user;

    this.getInfoUser();
    
  }

  getInfoUser(){
    this.userService.showParentProfile(this.usuario.id).subscribe((resp:any)=>{
      console.log(resp);
      this.parent = resp.parent;

      this.name = this.parent.name;
      this.surname = this.parent.surname;
      this.phone = this.parent.phone;
      this.email = this.parent.email;
      this.education = this.parent.education;
      this.designation = this.parent.designation;
      this.gender = this.parent.gender;
      this.address = this.parent.address;
      this.IMAGE_PREVISUALIZA = this.parent.avatar;
      
    })
  }

  loadFile($event:any){
    if($event.target.files[0].type.indexOf("image")){
      this.text_validation = 'Solamente pueden ser archivos de tipo imagen';
      return;
    }
    this.text_validation = '';
    this.FILE_AVATAR = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.FILE_AVATAR);
    reader.onloadend = ()=> this.IMAGE_PREVISUALIZA = reader.result;
  }

  save(){
    this.text_validation = '';
    this.text_success = '';
    if(!this.name||!this.email ||!this.surname ){
      this.text_validation = 'Los campos con * son obligatorios';
      return;
    }

    if(this.password ){
      if(this.password != this.password_confirmation  ){
        this.text_validation = 'Las contraseña debe ser igual';
        return;
      }
    }

    let formData = new FormData();
    formData.append('name', this.name);
    formData.append('surname', this.surname);
    formData.append('phone', this.phone);
    formData.append('email', this.email);
    formData.append('birth_date', this.birth_date);
    formData.append('gender', this.gender+'');

    if(this.FILE_AVATAR ){
      formData.append('imagen', this.FILE_AVATAR);
    }
    
    if(this.address ){
      formData.append('address', this.address);
    }
    
    
    
    this.userService.editParient(formData, this.usuario.id).subscribe((resp:any)=>{
      if(resp.message == 403){
        this.text_validation = resp.message_text;
      }else{
        // this.text_success = 'El usuario ha sido actualizado correctamente';
        Swal.fire('Updated', ` Employee Has updated`, 'success');
        this.ngOnInit();
      }
    })


  }


}

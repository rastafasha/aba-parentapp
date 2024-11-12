import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Platform } from '@angular/cdk/platform';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, map } from 'rxjs';
import { LocationsService } from 'src/app/services/locations.service';
declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
  name = new FormControl();
  surname = new FormControl();
  email = new FormControl();
  password = new FormControl();
  remember = new FormControl();
  patient_id = new FormControl();
  location_id = new FormControl();

  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  loginError: string;
  error = null;

  public auth2: any;

  user: User;

  public locations: any= [];

  // Registro
  public formSumitted = false;
  public registerForm = this.fb.group({
    name: ['', Validators.required],
    email: [ '', [Validators.required] ],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    patient_id: ['', Validators.required],
    location_id: ['', Validators.required],
    // role: ['GUEST'],
    // terminos: [false, Validators.required],

  }, {
    validators: this.passwordsIguales('password', 'password2')

  });
  // Registro

  errors:any = null;

  

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private usuarioService: UserService,
    private locationService: LocationsService,
    
  ) {
   
  }
  username: FormControl<any>;
ngOnInit(){
  this.getLocation();

  this.loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email] ],
    password: ['', Validators.required],
    remember: [false]

  });
  this.authService.getLocalStorage();
  
}

getLocation(){
  this.usuarioService.getLocations().subscribe((resp:any)=>{
    console.log(resp);
    this.locations = resp.locations.data;
  })
}




login(){
  if(!this.loginForm){
    return;
  }

  this.authService.login(
    this.loginForm.value.email ? this.loginForm.value.email : '' ,
    this.loginForm.value.password ? this.loginForm.value.password: ''

  ).subscribe(
    (resp:any) =>{
      if(this.loginForm.get('remember').value){
        localStorage.setItem('email', this.loginForm.get('email').value);
        // document.location.reload();
        
      }else{
        localStorage.removeItem('email');
      }
      this.authService.getLocalStorage();
      if(localStorage.getItem('user')){
        setTimeout(()=>{
          this.router.navigateByUrl('/app');
        },500)

      }
      
    },(error) => {
      Swal.fire('Error', error.error.msg, 'error');
      this.errors = error.error;
    }
    )
    // console.log(this.user)
}




// Registro
crearUsuario(){
  this.formSumitted = true;
  // if(this.registerForm.invalid){
  //   return;
  // }

  this.authService.crearUsuario(this.registerForm.value).subscribe(
    resp =>{
      Swal.fire('Registrado!', `Ya puedes ingresar`, 'success');
      this.ngOnInit();
    },(error) => {
      Swal.fire('Error', error.error.msg, 'error');
      this.errors = error.error;
    }
  );
  return false;
}

campoNoValido(campo: string): boolean {
  if(this.registerForm.get(campo).invalid && this.formSumitted){
    return true;
  }else{
    return false;
  }
}

aceptaTerminos(){
  return !this.registerForm.get('terminos').value && this.formSumitted;
}

passwordNoValido(){
  const pass1 = this.registerForm.get('password').value;
  const pass2 = this.registerForm.get('password2').value;

  if((pass1 !== pass2) && this.formSumitted){
    return true;
  }else{
    return false;
  }
}

passwordsIguales(pass1Name: string, pass2Name: string){
  return (formGroup: FormGroup) =>{
    const pass1Control = formGroup.get(pass1Name);
    const pass2Control = formGroup.get(pass2Name);

    if(pass1Control.value === pass2Control.value){
      pass2Control.setErrors(null)
    }else{
      pass2Control.setErrors({noEsIgual: true});
    }
  }
}
// Registro



}

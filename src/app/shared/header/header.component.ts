import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  year: number = new Date().getFullYear();
  user:any;
  patient:any = [];
  usuario:any = [];
  public settings:any;
  public setting_selectedId:any;
  public avatar_setting:any;
  public name_setting:any;
  public parent:any;

  imagenSerUrl = environment.url_media;

  constructor(
    public authService:AuthService,
    public userService:UserService,
    public configService:ConfigService,
    private router: Router,
    
  ) {
    this.user = this.authService.user;
   }

  ngOnInit(): void {
    
    this.authService.getLocalStorage();

    let USER = localStorage.getItem("user");
    this.user = JSON.parse(USER ? USER: '');
    this.usuario = this.user;
    this.getInfoUser();
    // this.getSettings()
    this.authService.getLocalDarkMode();
  }

  getInfoUser(){
    this.userService.showParentProfile(this.usuario.id).subscribe((resp:any)=>{
      // console.log(resp);
      this.parent = resp.parent;
    })
  }

//   getSettings(){
//     this.configService.getAllSettings().subscribe((resp:any)=>{
//       // console.log(resp);
//       this.settings= resp.settings.data;
//       this.setting_selectedId= resp.settings.data[0].id;
//       this.avatar_setting= resp.settings.data[0].avatar;
//       this.name_setting= resp.settings.data[0].name;
//     })
// }

  openMenu(){
    var menuLateral = document.getElementsByClassName("sidemenu ");
    for (var i = 0; i<menuLateral.length; i++) {
       menuLateral[i].classList.add("active");

    }
  }
  closeMenu(){
    this.authService.closeMenu();
  }

  logout(){
    this.authService.logout();
  }

  darkMode(dark:string){
    var element = document.body;

    const classExists = document.getElementsByClassName(
      'darkmode'
     ).length > 0;

    var dayNight = document.getElementsByClassName("site");
      for (var i = 0; i<dayNight.length; i++) {
        // dayNight[i].classList.toggle("darkmode");
        element.classList.toggle("darkmode");

      }
      // localStorage.setItem('dark', dark);

      if (classExists) {
        localStorage.removeItem('darkmode');
        // console.log('✅ class exists on page, removido');
      } else {
        localStorage.setItem('darkmode', dark);
        // console.log('⛔️ class does NOT exist on page, agregado');
      }
      // console.log('Pulsado');
  }
}

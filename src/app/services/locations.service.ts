import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
declare var $:any;
const url_servicios = environment.url_servicios;

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(
    public http: HttpClient,
    public authService: AuthService,

  ) { }
  
  getLocations(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/location";
    return this.http.get(URL, {headers:headers});
  }

}

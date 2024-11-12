import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
declare var $:any;
const url_servicios = environment.url_servicios;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public http: HttpClient,
    public authService: AuthService,

  ) { }

  getLocations(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/parents-locations";
    return this.http.get(URL, {headers:headers});
  }

  showPatientByNdoc(n_doc:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/user/show/ndoc/'+n_doc;
    return this.http.get(URL, {headers:headers});
  }

  showPatientProfile(user_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/patients/profile/"+user_id;
    return this.http.get(URL,{headers:headers});
  }
  // parent 
  showParentProfile(parent_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/parent/show/"+parent_id;
    return this.http.get(URL,{headers:headers});
  }

  showParentPatientProfile(parent_id:any, patient_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/parent/show-withpatient/"+parent_id+'/'+patient_id;
    return this.http.get(URL,{headers:headers});
  }

  editParient(data:any, parent_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/parent/update/"+parent_id;
    return this.http.post(URL,data,{headers:headers});
  }

  showNoteRbtRecent(parent_id:any, patient_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/parent/show-withpatient-rbtnote-recent/"+parent_id+'/'+patient_id;
    return this.http.get(URL,{headers:headers});
  }
  showNoteBCBARecent(parent_id:any, patient_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/parent/show-withpatient-bcbanote-recent/"+parent_id+'/'+patient_id;
    return this.http.get(URL,{headers:headers});
  }
  

}

import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import {User,User_login} from "src/app/models/user"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  loginUser(user: User){
    // return this.http.post('http://suhaibali.pythonanywhere.com/users/', user)
     return this.http.post('http://suhaibali.pythonanywhere.com/users/', user)
  }

  getUser(username:string){
    return this.http.get(`http://suhaibali.pythonanywhere.com/users/filter_user/?username=${username}`)
  }
  

  login(data: User_login): Observable<any> {
    return this.http.post('http://suhaibali.pythonanywhere.com/api/token/', data);
  }
  
  user_info(id: any){
    return this.http.get(`http://suhaibali.pythonanywhere.com/users/${id}/`)
  }

  create_job(data:any) : Observable<any> {
    return this.http.post('http://suhaibali.pythonanywhere.com/postjob/', data=data)
  }
  get_job_by_userId(id:any): Observable<any> {
    return this.http.get(`http://suhaibali.pythonanywhere.com/postjob/user/${id}/`)
  }

  get_all_job(): Observable<any> {
    return this.http.get(`http://suhaibali.pythonanywhere.com/postjob/`)
  }


  get_all_appliedjob(): Observable<any> {
    return this.http.get('http://suhaibali.pythonanywhere.com/applyjob/')
  }

  create_apply_job(data:any) : Observable<any> {
    return this.http.post('http://suhaibali.pythonanywhere.com/applyjob/', data=data)
  }

  get_filtered_appliedjob(id:any): Observable<any> {
    return this.http.get(`http://suhaibali.pythonanywhere.com/applyjob/job/${id}/`)
    
  }

}

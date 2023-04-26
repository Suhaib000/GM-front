import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import {User,User_login} from "src/app/models/user"
import { Observable } from 'rxjs';
import axios from 'axios';

// axies 

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://suhaibali.pythonanywhere.com/api/token/';
  constructor(private http: HttpClient) { }


  loginUser(user: User){
     return this.http.post('https://suhaibali.pythonanywhere.com/users/', user)
  }

  getUser(username:string){
    return this.http.get(`https://suhaibali.pythonanywhere.com/users/filter_user/?username=${username}`)
  }
  

  login_ax(data: User_login): Promise<string> {
    // return this.http.post('http://suhaibali.pythonanywhere.com/api/token/', data);
    return axios.post(this.apiUrl, data)
      .then(response => response.data.access_token)
      .catch(error => {
        console.error('Error getting token:', error);
        throw error;
      });
      }
  

  login(data: User_login): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
  
  user_info(id: any){
    return this.http.get(`https://suhaibali.pythonanywhere.com/users/${id}/`)
  }

  create_job(data:any) : Observable<any> {
    return this.http.post('https://suhaibali.pythonanywhere.com/postjob/', data=data)
  }
  get_job_by_userId(id:any): Observable<any> {
    return this.http.get(`https://suhaibali.pythonanywhere.com/postjob/user/${id}/`)
  }

  get_all_job(): Observable<any> {
    return this.http.get(`https://suhaibali.pythonanywhere.com/postjob/`)
  }


  get_all_appliedjob(): Observable<any> {
    return this.http.get('https://suhaibali.pythonanywhere.com/applyjob/')
  }

  create_apply_job(data:any) : Observable<any> {
    return this.http.post('https://suhaibali.pythonanywhere.com/applyjob/', data=data)
  }

  get_filtered_appliedjob(id:any): Observable<any> {
    return this.http.get(`https://suhaibali.pythonanywhere.com/applyjob/job/${id}/`)
    
  }

}

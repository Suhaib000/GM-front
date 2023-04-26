import { Component } from '@angular/core';
import {ApiService} from "src/app/service/api.service"
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {LoginResponseInterface,User_login,User} from "src/app/models/user"
import {CookieService} from 'ngx-cookie-service';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import axios from 'axios';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: User_login = {username: "", password: "",usertype:""};
  loading: boolean = false;
  loginForm: FormGroup;
  errorMessage = '';
  isError: boolean = false;
  user_type:any

  constructor(public api:ApiService ,private router:Router,private cookiesService: CookieService,private http: HttpClient){ 
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      usertype: new FormControl('', Validators.required),
    });}


    login(){
      this.loading = true;
      this.user = this.loginForm.getRawValue();
      this.isError = false;

      console.log(this.user)
      this.api.login(this.user).subscribe(
        (res: LoginResponseInterface) => {
          this.cookiesService.set("access", res.access);
          this.cookiesService.set("refresh", res.refresh);
          this.cookiesService.set("username", this.loginForm.value.username);

          this.api.getUser(this.loginForm.value.username).subscribe(
        (user_res: any) => {
          console.log('user_info',user_res)
          this.user_type = user_res[0].profile.usertype
          console.log('user_res[0].profile.usertype',this.user_type)

          this.cookiesService.set("id", user_res[0].id);
        
          if(this.user_type=='student'){
            console.log('user_type SS',this.user_type)
            this.router.navigate(['/MainPage']).then();
          }
          else{
            console.log('user_type EEE',this.user_type)

            this.router.navigate(['/MainPageEm']).then();
          }

        }
          
          
          )

          
          console.log('trewe====>',this.cookiesService.get("id"))

        }, (err:any)=>{
          console.log(err);
          this.isError = true;
        }
      )
    
    }


    // login(){
    //   this.loading = true;
    //   this.isError = false;
    //   console.log(this.loginForm.getRawValue())
    //   axios.post('http://suhaibali.pythonanywhere.com/api/token/', this.loginForm.getRawValue())
    //     .then(token => {
    //       console.log('Token:', token);
    //       this.cookiesService.set("access", token.data.access);
    //       this.cookiesService.set("refresh", token.data.refresh);
    //       this.cookiesService.set("username", this.loginForm.value.username);

    //   axios.get(`http://suhaibali.pythonanywhere.com/users/filter_user/?username=${this.loginForm.value.username}`)
    //   .then(response => {
    //     console.log('response get user',response.data[0].profile.usertype)
    //     this.user_type = response.data[0].profile.usertype
    //       console.log('user_res[0].profile.usertype',this.user_type)

    //       this.cookiesService.set("id", response.data[0].id);
        
    //       if(this.user_type=='student'){
    //         console.log('user_type SS',this.user_type)
    //         this.router.navigate(['/MainPage']).then();
    //       }
    //       else{
    //         console.log('user_type EEE',this.user_type)

    //         this.router.navigate(['/MainPageEm']).then();
    //       }
      
    //   })
      
    //   .catch(error => {
    //     console.error('Error getting token:', error);
    //     this.isError = true;
    //   });


    //     })
    //     .catch(error => {
    //       console.error('Error getting token:', error);
    //       this.isError = true;
    //     });
    // }

    
}

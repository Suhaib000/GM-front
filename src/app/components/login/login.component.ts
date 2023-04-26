import { Component } from '@angular/core';
import {ApiService} from "src/app/service/api.service"
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {LoginResponseInterface,User_login} from "src/app/models/user"
import {CookieService} from 'ngx-cookie-service';


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

  constructor(public api:ApiService ,private router:Router,private cookiesService: CookieService,){ 
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
      // this.api.login(this.user).subscribe(
      //   (response:any) => {
      //     console.log(response.message)
      //     if (response.message == 'Login successful') {
      //       if(response.usertype == 'student'){
      //         this.router.navigate(['/MainPage'])
      //       }
      //       else{
      //         this.router.navigate(['/MainPageEm'])
      //       }
            
      //     } else {
      //       // this.errorMessage = response.message;
      //       Swal.fire({
      //         position: 'top-end',
      //         text: response.message,
      //         showConfirmButton: false,
      //         timer: 2000
      //       })
      //       this.loading = false
      //     }
      //   },
      //   (err)=>{
      //     Swal.fire({
      //       position: 'top-end',
      //       text: 'Username or Password is incorrect.',
      //       showConfirmButton: false,
      //       timer: 2000
      //     })
      //     this.loading = false
      //   }
      
      // )
  
    }
}

import { Component } from '@angular/core';
import {ApiService} from "src/app/service/api.service"
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {User} from "src/app/models/user"
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  user: User = {username: "", password: "",profile: {usertype:"",about_you:''},Email:''};
  loading: boolean = false;
  route:string="signup"
  loginForm: FormGroup;
  res:any;
  constructor(public api:ApiService ,private router:Router){ 
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      usertype: new FormControl('', Validators.required),
      about_you: new FormControl('', Validators.required),
      Email: new FormControl('', Validators.required),

    });
  }


  signup(){
    this.loading = true;
    // this.user = this.loginForm.getRawValue();
    this.user.Email=this.loginForm.value.Email
    this.user.username=this.loginForm.value.username
    this.user.password=this.loginForm.value.password
    this.user.profile.usertype=this.loginForm.value.usertype
    this.user.profile.about_you=this.loginForm.value.about_you
    console.log(this.user)
    // this.api.loginUser(this.user).subscribe((response)=>{
      this.api.loginUser(this.user).subscribe((response)=>{
      this.res = response as any;
      console.log(response)
      this.loading = false
      // this.route = "login"
      this.router.navigate(['/login'])
      Swal.fire({
        position: 'top-end',
        text: 'Username has been created Successfully!!!.',
        showConfirmButton: false,
        timer: 2000
      })
      
    },
    (err:any)=>{
      console.log(err)
      Swal.fire({
        position: 'top-end',
        text: "Please try again ..",
        showConfirmButton: false,
        timer: 2000
      })
      this.loading = false
    })
  }

}

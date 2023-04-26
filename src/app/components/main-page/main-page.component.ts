import { Component } from '@angular/core';
import {ApiService} from "src/app/service/api.service"
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent {
hideDiv = true
jobs:any;
filteredJob:any
myForm!: FormGroup;
job_obj:any
constructor(private api: ApiService, private cookiesService: CookieService ) { }
ngOnInit() {

  this.myForm = new FormGroup({
    student_username: new FormControl('', [Validators.required]),
    user: new FormControl('', [Validators.required]),
    proposal: new FormControl('', [Validators.required]),
    job: new FormControl('', [Validators.required])
  });



 this.api.get_all_job()
   .subscribe(response => {
     this.jobs = response;
     console.log(this.jobs);
   });
   
this.api.get_all_appliedjob().subscribe(response => {
  console.log('===========',response);
})


console.log('===========',localStorage.getItem('currentUser'));


}




Job_name(job:any){
this.job_obj = job
this.myForm.setValue({
    student_username: this.cookiesService.get("username"),
    user:this.cookiesService.get("id"),
    proposal:'',
    job:job.id,
  });

}


sort_job(job:string){
 
  var filter_job = this.jobs.filter((item:any) => item.job_type === job);

  this.filteredJob = [];
    
  filter_job.forEach((item: any) => {

    const timestamp = item.created_at;
    const date = new Date(Date.parse(timestamp));
    const now = new Date();
    const diffInMillis = now.getTime() - date.getTime();

    const diffInMinutes = Math.floor(diffInMillis / (1000 * 60)); // 1 minute = 1000 ms * 60 sec
    const diffInHours = Math.floor(diffInMinutes / 60); // 1 hour = 60 min
    const diffInDays = Math.floor(diffInHours / 24);

    let displayText = '';
    if (diffInDays >= 1) {
      displayText = `${diffInDays} days`;
    } else if (diffInHours >= 1) {
      displayText = `${diffInHours} hours`;
    } else {
      displayText = `${diffInMinutes} minutes`;
    }

    item["created_time"] = displayText
    this.filteredJob.push(item)
});
console.log('this.filteredJob ==>',this.filteredJob)
}


apply_job(job:any){

  this.myForm.setValue({
    student_username: this.cookiesService.get("username"),
    user:this.cookiesService.get("id"),
    proposal:'.',
    job:job.id
  });

  if (this.myForm.valid) {
    console.log('valid',this.myForm.value)
    
 this.api.create_apply_job(this.myForm.value)
 .subscribe(response => {
  Swal.fire({
    position: 'top-end',
    text:"Job applied Successfully",
    showConfirmButton: false,
    timer: 2000,
  })
 },
 err => {
   console.log(err);
   Swal.fire({
     position: 'top-end',
     text:"Job Didn't apply",
     showConfirmButton: false,
     timer: 2000,
   })
 }
 
 );
  }

}


getFullName(){
  return this.cookiesService.get("username")
}

}

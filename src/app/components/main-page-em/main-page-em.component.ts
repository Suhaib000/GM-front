import { Component } from '@angular/core';
import { ApiService } from "src/app/service/api.service"
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-main-page-em',
  templateUrl: './main-page-em.component.html',
  styleUrls: ['./main-page-em.component.scss']
})
export class MainPageEmComponent {
  hideDiv = true
  applaied_job:any
  all_job: any;
  term_unremoved: boolean = false;
  myForm!: FormGroup;
  jobs: any;
  edit_jobs: Array<any> = [];
  apply_number:any

  constructor(private api: ApiService, private cookiesService: CookieService) { }


  ngOnInit() {
    this.myForm = new FormGroup({
      jop_name: new FormControl('', Validators.required),
      jop_discription: new FormControl('', [Validators.required]),
      user: new FormControl(this.cookiesService.get("id"), [Validators.required]),
      job_type: new FormControl("", [Validators.required]),
      job_pay_type: new FormControl("", [Validators.required]),
      student_skills: new FormControl('', [Validators.required])

    });

    this.api.get_job_by_userId(this.cookiesService.get("id")).subscribe(response => {
        this.jobs = response;
        console.log('this.jobs==>',response);
        this.filter_jobs()
      });
      

      // this.get_filtered_appliedjob(1)

    //  console.log('User ==>', this.get_login_user())

  }


  craete_job() {

    if (this.myForm.valid) {
      console.log(this.myForm.value)
      // submit the form data
    }
    this.api.create_job(this.myForm.value)
      .subscribe(response => {
        console.log(response);

        Swal.fire({
          position: 'top-end',
          text: "Job added Successfully",
          showConfirmButton: false,
          timer: 2000,
        })

      },
        err => {
          console.log(err);
          Swal.fire({
            position: 'top-end',
            text: "Job Didn't add",
            showConfirmButton: false,
            timer: 2000,
          })
        }


      );
  }

  // to filter people apply to specific job by job id
  sort_proposal(id: any) {
    this.applaied_job=[]
    let proposal
    this.api.get_filtered_appliedjob(id)
      .subscribe(response => {

        proposal = response
        console.log('filtered_appliedjob ==> ', response);
         this.applaied_job = this.time_diif(proposal , this.applaied_job)
      });

     

  }



  filter_jobs() {
    this.edit_jobs = [];
    this.edit_jobs = this.time_diif(this.jobs , this.edit_jobs)

    // let  ids =this.edit_jobs.map((job:any)=>job.id)
    // ids.forEach((id: any) => {
    //   this.api.get_filtered_appliedjob(id)
    //   .subscribe(response => {
    //     this.apply_number = response.length
    //     console.log('====IDS of jobs======>',this.apply_number)
    //       });

    // })
    
  }





  time_diif(main_arry:any , new_array:any){
    main_arry.forEach((item: any) => {

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

      
      // console.log(`The difference between ${timestamp} and now is ${displayText}.`);
      item["created_time"] = displayText

      this.api.get_filtered_appliedjob(item.id)
      .subscribe(response => {
        let num  = response.length
        item["proposal_num"] = num
          });

      
      new_array.push(item)

    });

    return new_array
  }

}

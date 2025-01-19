import { Component } from '@angular/core';
import { HomeService } from '../services/home.service';
import { ActivatedRoute } from '@angular/router';
import { userProfile } from '../dto/userProfileDTO';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-others-resume',
  templateUrl: './others-resume.component.html',
  styleUrls: ['./others-resume.component.css']
})
export class OthersResumeComponent {
   editMode: boolean = false;
     userId : number|undefined ;
     userProfile: userProfile | null = null;
  
  constructor(public home :HomeService,private route: ActivatedRoute,private toastr:ToastrService){}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('id')!;
      this.getUserPersonalData()
      this.home.getAllUserExperienceById(this.userId)
      this.home.GetUserSkillByUserId(this.userId)
      this.home.GetUserProjectById(this.userId)
      this.home.GetUserEducationById(this.userId)
    });
  }
  isCVEmpty(): boolean {
    return !(
      (this.userProfile?.firstName ||
        this.userProfile?.lastName ||
        this.userProfile?.jobTitle ||
        this.userProfile?.phoneNumber ||
        this.userProfile?.userName ||
        this.userProfile?.address) ||
      (this.home.UserExperienceById && this.home.UserExperienceById.length > 0) ||
      (this.home.UserProjectById && this.home.UserProjectById.length > 0) ||
      (this.home.UserSkillByUserId && this.home.UserSkillByUserId.length > 0) ||
      (this.home.UserEducationById && this.home.UserEducationById.length > 0)
    );
  }
  
  getUserPersonalData(){
    this.home.getUserPersonalData(this.userId!).subscribe((result:any)=>{
      if(result){
        this.userProfile= result
      }
    },error=>{
      this.toastr.error("Something wrong in user data please refresh")
    })
  }
}

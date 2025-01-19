import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators ,FormControl } from '@angular/forms';
import { HomeService } from '../services/home.service';
import { ToastrService } from 'ngx-toastr';
import { userProfile } from '../dto/userProfileDTO';
@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {
  profilePic: string | null = null; 
  coverPic: string | null = null;  
  profilePicUpload: File | null = null; 
  coverPicUpload: File | null = null;   
  editPasswordForm : FormGroup = new FormGroup({
    newPassword : new FormControl('',[Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_-]).*$/)]),
    oldPassword : new FormControl('',[Validators.required]),
    confirmPassword : new FormControl('',[Validators.required]),

  });
  confirmPass : string ='';
  userId : number =0
  showOldPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  userProfile : userProfile = new userProfile();
  userProfileForm:FormGroup =  new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', Validators.required),
    jobTitle: new FormControl(''),
    company: new FormControl(''),
    address: new FormControl(this.userProfile.address),
    brief: new FormControl(this.userProfile.brif)
  });

 
  constructor(private homeService : HomeService, private toastr :ToastrService) {
    
  }
  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId'))
    this.getUserData()
   }
  // Function to preview Profile Picture
  previewProfilePic(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePic = e.target.result;
        this.profilePicUpload =file;
      };
      reader.readAsDataURL(file);
    }
  }

  // Function to remove Profile Picture
  removeProfilePic(): void {
    this.profilePic = '';
    this.profilePicUpload =null;

  }

  // Function to preview Cover Picture
  previewCoverPic(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.coverPic = e.target.result;
        this.coverPicUpload = file
      };
      reader.readAsDataURL(file);
    }
  }

  // Function to remove Cover Picture
  removeCoverPic(): void {
    this.coverPic = ''; 
    this.coverPicUpload = null
  }

  checkPassword(): boolean{
    if(this.editPasswordForm.get('confirmPassword')?.value === this.editPasswordForm.get('newPassword')?.value){
      return true;
    }
    else
    return false;
  }

  changePassword(){
    if(this.checkPassword()){
      this.homeService.updateUserPassword(this.editPasswordForm.value,this.userId).subscribe((resulte:any)=>{
        this.toastr.success('Password Updated successfully!');
        this.editPasswordForm.get('newPassword')?.setValue('')
        this.editPasswordForm.get('oldPassword')?.setValue('')
        this.confirmPass=''
  
      },error=>{
        this.toastr.error('The old password is not correct!')
      })
    }
    else{
      this.toastr.error('Password and confirmation must be equal')
    }
    

    
  }
  toggleOldPasswordVisibility() {
    this.showOldPassword = !this.showOldPassword;
  }

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  getUserData(){
    this.homeService.getUserPersonalData(this.userId).subscribe((result:any)=>{

      this.userProfile = result
      this.userProfileForm.setValue({
        firstName: this.userProfile.firstName,
        lastName: this.userProfile.lastName,
        email: this.userProfile.userName,
        phoneNumber: this.userProfile.phoneNumber,
        jobTitle: this.userProfile.jobTitle,
        company: this.userProfile.company,
        address: this.userProfile.address,
        brief: this.userProfile.brif
      });
      this.coverPic =this.userProfile.headerImagePath!;
      this.profilePic = this.userProfile.personalImagePath!;
     
    },error=>{

    })
  }

  updateUserProfile(): void {
    this.homeService.updateUserProfile( this.userProfileForm.value , this.userId , this.profilePicUpload , this.coverPicUpload).subscribe(
      (response :any) => {
        this.toastr.success('User profile updated successfully:');
      },
      error  => {
        this.toastr.error('Error updating user profile:');
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { userProfile } from 'src/app/dto/userProfileDTO';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css']
})
export class AdminprofileComponent implements OnInit {

  userId: number = 0
  userProfile: userProfile = new userProfile();
  updateData: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl(''),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    image: new FormControl(''),
  });
  showPassword = false;
  selectedImage: string | null = null;
  constructor(private homeService: HomeService, private toastr: ToastrService) {
  }
  ngOnInit(): void {
    this.userId = Number(localStorage.getItem("userId"));

    this.getUserData()
  }
  editMode = false;


  saveProfile() {
    const formData = new FormData();
  
  formData.append('UserName', this.updateData.get('userName')?.value || '');
  formData.append('FirstName', this.updateData.get('firstName')?.value || '');
  formData.append('LastName', this.updateData.get('lastName')?.value || '');
  formData.append('Password', this.updateData.get('password')?.value || '');
  formData.append('PhoneNumber', this.updateData.get('phoneNumber')?.value || '');
  formData.append('userId', this.userId.toString());
  
  const imageFile = this.updateData.get('image')?.value;
  if (imageFile) {
    formData.append('image', imageFile);
  }
    this.homeService.updateUser(formData).subscribe((result:any)=>{
      this.toastr.success("Profile updated succssefully!")
      this.editMode = false;
      window.location.reload();
    },error=>{
      this.toastr.error("Something Wronge!!!")
    })
  }
  getUserData() {
    this.homeService.getUserPersonalData(this.userId).subscribe((resulte: any) => {
      this.userProfile = resulte;
    }, error => {
      this.toastr.error("Something Wronge!!!")
    })
  }

  EditMode(isEditMode: boolean) {
    this.editMode = isEditMode
    if (isEditMode) {
      this.updateData.patchValue({
        userName: this.userProfile.userName,
        password: this.userProfile.password,
        phoneNumber: this.userProfile.phoneNumber,
        firstName: this.userProfile.firstName,
        lastName: this.userProfile.lastName,
      });
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.updateData.get('image')?.setValue(file);
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  clearImage() {
    this.selectedImage = null;
    this.updateData.get('image')?.setValue(null);
  }

}

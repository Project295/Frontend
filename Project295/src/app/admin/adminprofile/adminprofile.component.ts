import { Component } from '@angular/core';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css']
})
export class AdminprofileComponent {
  editMode = false;

  user = {
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    role: 'Admin',
    profileImage: 'assets/user-profile.jpg' // Default profile image
  };

  saveProfile() {
    this.editMode = false;
    console.log('Profile updated:', this.user);
  }
}

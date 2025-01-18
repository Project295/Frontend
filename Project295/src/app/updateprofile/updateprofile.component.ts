import { Component } from '@angular/core';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent {
  profilePic: string | null = null;  // Profile picture (initially null)
  coverPic: string | null = null;    // Cover picture (initially null)

  // Function to preview Profile Picture
  previewProfilePic(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePic = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Function to remove Profile Picture
  removeProfilePic(): void {
    this.profilePic = null;  // Remove the profile picture (set to null)
  }

  // Function to preview Cover Picture
  previewCoverPic(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.coverPic = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Function to remove Cover Picture
  removeCoverPic(): void {
    this.coverPic = null;  // Remove the cover picture (set to null)
  }
}

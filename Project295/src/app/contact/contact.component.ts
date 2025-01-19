import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
/**
 *
 */
constructor(private toastr :ToastrService, private homeService : HomeService) {
  
}

  successMessage = false;
  firstName : string =''
  lastName : string =''
  email : string = ''
  message : string =''

  onSubmit() {
    if(this.firstName !=='' && this.lastName !=='' && this.email !=='' && this.message !==''){
      const name = this.firstName+" "+this.lastName
     this.homeService.addContact(this.message, name, this.email).subscribe((result:any)=>{
      this.toastr.success('Your message sent successfull the admin will replay soon!')
      this.firstName='';
      this.lastName='';
      this.email='';
      this.message='';
    },error=>{
      this.toastr.error('Something wrong please try again!')
    })
    }
    else{
      this.toastr.error('Please fill all fields');
    }
   
  }
}

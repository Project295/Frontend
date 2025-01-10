import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 constructor(private toastr : ToastrService , private authService : AuthService) {
  
 }
  registerForm : FormGroup = new FormGroup({
    FirstName : new FormControl('',[Validators.required]),
    LastName : new FormControl('',[Validators.required]),
    Email : new FormControl('',[Validators.required, Validators.email]),
    MobileNumber : new FormControl('',[Validators.required, Validators.pattern(/^\d{10}$/)]),
    Password : new FormControl('',[Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_-]).*$/)]),
  });
  passwordVisible : boolean = false

  ngOnInit(): void {
   // this.showSuccess()
  }
  showSuccess() {
    this.toastr.success('Hello world!', 'Success');
  }
  togglePasswordVisibility(){
    this.passwordVisible = ! this.passwordVisible;
  }
  submit(){
    if(this.registerForm.valid)
    {
       this.authService.register(this.registerForm.value)
    }
    else{
      this.registerForm.markAllAsTouched();
    }
  }

}

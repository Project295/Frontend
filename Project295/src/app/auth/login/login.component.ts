import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService : AuthService, private router : Router, private toastr : ToastrService) {
  }
  loginForm : FormGroup = new FormGroup({
    Email : new FormControl('',[Validators.required, Validators.email]),
    Password : new FormControl('',[Validators.required]),
  });
  passwordVisible :boolean =false;

  togglePasswordVisibility(){
    this.passwordVisible =!this.passwordVisible
  }
  login(){
    if(this.loginForm.valid){
      localStorage.clear();
      this.authService.login(this.loginForm.value).subscribe((result:any)=>{
       if(result){
        this.toastr.success(result.message)
        localStorage.setItem('userId', result.userId);
        localStorage.setItem('roleId', result.roleId);
        if(result.roleId ===1){
          this.router.navigate(['/admin']);

        }
        else if(result.roleId ===2){
          this.router.navigate(['/profile']);
        }
       }
      },err=>{
          this.toastr.error('Error '+err.error.message);
      });
    }
    else{
      this.loginForm.markAllAsTouched()
    }
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { ToastrService } from 'ngx-toastr';
import { userProfile } from 'src/app/dto/userProfileDTO';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router , private homeService : HomeService, private toastr:ToastrService) { }

  userId : number|undefined ;
  userProfile: userProfile | null = null;
  
  ngOnInit(): void {
    this.userId = Number(localStorage.getItem("userId"));
    if(this.userId){
      this.getUserPersonalData()
    }  
  }
  getUserPersonalData(){
    this.homeService.getUserPersonalData(this.userId!).subscribe((result:any)=>{
      if(result){
        this.userProfile= result
      }
    },error=>{
      this.toastr.error("Something wrong in user data please refresh")
    })
  }

  isDropdownVisible: boolean = false;
  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }
  logout() {
    localStorage.clear(); 
    this.router.navigate(['/security/sign-in']);
  }
}

import { Component, OnInit } from '@angular/core';
import { userProfile } from 'src/app/dto/userProfileDTO';
import { HomeService } from 'src/app/services/home.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
 userId: number = 0
 userProfile : userProfile = new userProfile();
constructor(private router: Router , private homeService : HomeService, private toastr:ToastrService) { }  
  ngOnInit(): void {
    this.userId = Number(localStorage.getItem("userId")); 
    this.getUserData();

  }

  getUserData(){
    this.homeService.getUserPersonalData(this.userId).subscribe((resulte:any)=>{
      this.userProfile = resulte;
    })
  }

  logout() {
    localStorage.clear(); 
    this.router.navigate(['/security/sign-in']);
  }
}

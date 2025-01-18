import { Component, OnInit } from '@angular/core';
import { userProfile } from 'src/app/dto/userProfileDTO';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
 userId: number = 0
 userProfile : userProfile = new userProfile();

 constructor(private homeService : HomeService) {
  
 }
  ngOnInit(): void {
    this.userId = Number(localStorage.getItem("userId"));
    this.getUserData();

  }

  getUserData(){
    this.homeService.getUserPersonalData(this.userId).subscribe((resulte:any)=>{
      this.userProfile = resulte;
    })
  }

}

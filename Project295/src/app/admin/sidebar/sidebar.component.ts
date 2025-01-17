import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
    constructor(private router: Router , private homeService : HomeService, private toastr:ToastrService) { }
  
    userId : number|undefined ;
    userProfile: any | null = null;
    
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
  logout() {
    localStorage.clear(); 
    this.router.navigate(['/security/sign-in']);
  }
}

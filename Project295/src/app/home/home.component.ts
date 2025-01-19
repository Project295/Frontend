import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HomeService } from '../services/home.service';
import { ToastrService } from 'ngx-toastr';
import { homePostDTO } from '../dto/homePosts';
import { MatDialog } from '@angular/material/dialog';
import { postStatusDTO } from '../dto/postTypeDTO';
import { postCatigories } from '../dto/postCategoryDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homePosts: homePostDTO[] = [];
  complaintDescription: string = '';
  ReportedPostId: number =0;
   @ViewChild('reportTemplate') reportTemplate!: TemplateRef<any>;
   postCategory : postCatigories [] = []
   postType : postStatusDTO [] = []
   userId : number =0;
   nameForSearch : string = '';
   userNameForSearch : string = '';
   categoryForSearch : number  = 0
   PostTypeForSearch : number  = 0
   SData: homePostDTO[] = [];


  constructor(private homeService: HomeService, private toastr: ToastrService, private dialog: MatDialog, private route : Router) {

  }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem("userId"));
    this.getAllPosts();
    this.getPostCategories();
    this.getPostStatus()
  }

  getAllPosts(): void {
    this.homeService.getAllPosts().subscribe(
      (result: any) => {
        if (result && Array.isArray(result)) {
          this.homePosts = result.sort((a: any, b: any) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        } else {
          this.toastr.warning('No posts available at the moment.');
          this.homePosts = [];
        }
      },
      (error) => {
        this.toastr.error('Failed to fetch posts. Please try again later.');
      }
    );
  }
  
  timeAgo(dateString: string): string {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInMs = now.getTime() - postDate.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInWeeks = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));
    const diffInYears = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7 * 48));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
    } else if (diffInWeeks < 48) {
      return `${diffInWeeks} week${diffInWeeks === 1 ? '' : 's'} ago`;
    } else {
      return `${diffInYears} year${diffInYears === 1 ? '' : 's'} ago`;
    }
  }
  openReport(postId : number){
    this.ReportedPostId = postId;
    const dialogRef = this.dialog.open(this.reportTemplate, {
      width: '400px',
    });
  }
  sendReport() {
    if (this.complaintDescription.trim()) {
      {
        this.homeService.addComplain(this.complaintDescription.trim() ,this.ReportedPostId , this.userId).subscribe((resulte:any)=>{
          this.toastr.success('Complain added successfully!')
          this.dialog.closeAll();
        },error=>{
          this.toastr.error('Something wronge!')

        })
       }
    } else {
      alert('Please enter a description for your complaint.');
    }
  }

  cancelReport() {
    this.ReportedPostId = 0;
    this.complaintDescription = ''; 
    this.dialog.closeAll();
  }

  getPostCategories(){
    this.homeService.getPostCategories().subscribe((result:any)=>{
      if(result){
        this.postCategory=result;
      }
    },error=>{
      this.toastr.error("Failed to get categories")

    })
  }
  getPostStatus(){
    this.homeService.getPostStatus().subscribe((result:any)=>{
      if(result){
        this.postType=result;
      }
    },error=>{
      this.toastr.error("Failed to get post Types")

    })
  }
  resetSearch() {
    this.nameForSearch = '';
    this.userNameForSearch = '';
    this.categoryForSearch = 0;
    this.PostTypeForSearch = 0;
    this.search()
  }

  // Perform search
  search() {
    if(this.SData.length ===0){
      this.SData = this.homePosts;
    }
    if(this.nameForSearch !=='' || this.userNameForSearch !=='' || this.PostTypeForSearch!==0 || this.categoryForSearch !==0){
      this.homePosts = this.SData.filter((x: any) => {
        const fullName = `${x.firstName ?? ""} ${x.lastName ?? ""}`.toLowerCase(); // Combine firstName and lastName safely
      
        return (
          // Check if fullName contains the search value (case-insensitive)
          (this.nameForSearch ? fullName.includes(this.nameForSearch.toLowerCase()) : true) &&
          // Check if userName contains the search value (case-insensitive)
          (this.userNameForSearch ? x.userName?.toLowerCase().includes(this.userNameForSearch.toLowerCase()) : true) &&
          // Match exact categoryId if not 0
          (this.categoryForSearch !== 0 ? x.categoryId.toString() === this.categoryForSearch : true) &&
          // Match exact postStatusId if not 0
          (this.PostTypeForSearch !== 0 ? x.postStatusId.toString() === this.PostTypeForSearch : true)
        );
      });
      
      
    }
    else{
      this.homePosts = this.SData;
    }
}
redirectToProfile(postUserId : number){
  if(this.userId == postUserId)
  {
    this.route.navigate(['/profile']);
  }
  else{
    this.route.navigate([`/profile/${postUserId}`]);
  }
}

}
